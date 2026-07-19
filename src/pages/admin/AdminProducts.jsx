// src/pages/admin/AdminProducts.jsx

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react';

import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Modal from '../../components/ui/Modal.jsx';
import Loading, { Spinner } from '../../components/ui/Loading.jsx';
import ImageUploader from '../../components/admin/ImageUploader.jsx';

import {
  fetchProducts,
  createProductThunk,
  updateProductThunk,
  deleteProductThunk,
  selectAllProducts,
  selectProductsStatus,
  selectProductsError,
} from '../../redux/features/productsSlice.js';
import { getColorHex } from '../../utils/colorMap.js';

function formatPrice(value) {
  return `${(value || 0).toLocaleString('en-US')} DZD`;
}

const emptyFormState = {
  name: '',
  category: '',
  price: '',
  oldPrice: '',
  stock: '',
  description: '',
  sizes: '',
  colors: '',
  images: [],
  showStock: true,
};

function productToFormState(product) {
  return {
    name: product.name || '',
    category: product.category || '',
    price: product.price ?? '',
    oldPrice: product.oldPrice ?? '',
    stock: product.stock ?? '',
    description: product.description || '',
    sizes: (product.sizes || []).join(', '),
    colors: (product.colors || []).map((c) => c.name || c).join(', '),
    images: product.images || [],
    showStock: product.showStock !== false,
  };
}

function ProductFormModal({ isOpen, onClose, editingProduct }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState(emptyFormState);
  const [isSaving, setIsSaving] = useState(false);
  const [isImagesUploading, setIsImagesUploading] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setForm(
        editingProduct ? productToFormState(editingProduct) : emptyFormState
      );
      setFormError('');
      setIsImagesUploading(false);
    }
  }, [isOpen, editingProduct]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleImagesChange = (newImages) => {
    setForm((prev) => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (isImagesUploading) {
      setFormError('Please wait for all images to finish uploading.');
      return;
    }

    if (form.images.length === 0) {
      setFormError('Please upload at least one product image.');
      return;
    }

    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      price: Number(form.price) || 0,
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      stock: Number(form.stock) || 0,
      description: form.description.trim(),
      sizes: form.sizes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      colors: form.colors
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean)
        .map((name) => ({ name, hex: getColorHex(name) })),
      images: form.images,
      showStock: form.showStock,
    };

    setIsSaving(true);

    try {
      if (editingProduct) {
        await dispatch(
          updateProductThunk({ id: editingProduct.id, updates: payload })
        ).unwrap();
      } else {
        await dispatch(createProductThunk(payload)).unwrap();
      }
      setIsSaving(false);
      onClose();
    } catch (err) {
      setIsSaving(false);
      setFormError(
        typeof err === 'string' ? err : 'Failed to save product. Please try again.'
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingProduct ? 'Edit Product' : 'Add Product'}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Product Name"
            required
            value={form.name}
            onChange={handleChange('name')}
          />
          <Input
            label="Category"
            required
            value={form.category}
            onChange={handleChange('category')}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input
            label="Price (DZD)"
            type="number"
            required
            value={form.price}
            onChange={handleChange('price')}
          />
          <Input
            label="Old Price (optional)"
            type="number"
            value={form.oldPrice}
            onChange={handleChange('oldPrice')}
          />
          <Input
            label="Stock"
            type="number"
            required
            value={form.stock}
            onChange={handleChange('stock')}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#111827]">
            Description
          </label>
          <textarea
            rows={3}
            value={form.description}
            onChange={handleChange('description')}
            className="w-full resize-none rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          />
        </div>

        <Input
          label="Sizes (comma-separated)"
          placeholder="S, M, L, XL"
          value={form.sizes}
          onChange={handleChange('sizes')}
        />

        <Input
          label="Colors (comma-separated)"
          placeholder="Beige, Taupe, Mocha, Black"
          value={form.colors}
          onChange={handleChange('colors')}
        />

        <ImageUploader
          key={editingProduct?.id || 'new'}
          images={form.images}
          onChange={handleImagesChange}
          onUploadingChange={setIsImagesUploading}
          disabled={isSaving}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#111827] dark:text-white">
            Show Stock Information on Product Page
          </label>
          <div className="inline-flex w-fit rounded-xl border border-[#e5e7eb] p-1 dark:border-white/10">
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, showStock: true }))}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                form.showStock
                  ? 'bg-[#111827] text-white'
                  : 'text-[#374151] hover:bg-[#f9fafb] dark:text-white/70'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, showStock: false }))}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                !form.showStock
                  ? 'bg-[#111827] text-white'
                  : 'text-[#374151] hover:bg-[#f9fafb] dark:text-white/70'
              }`}
            >
              No
            </button>
          </div>
          <p className="text-xs text-[#9ca3af]">
            When disabled, no stock or "low stock" message will be shown to
            customers on this product's page.
          </p>
        </div>

        {formError && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
            {formError}
          </p>
        )}

        <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isSaving}
            disabled={isImagesUploading}
          >
            {isImagesUploading
              ? 'Uploading images...'
              : editingProduct
              ? 'Save Changes'
              : 'Add Product'}
          </Button>
          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
function AdminProducts() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const term = searchTerm.trim().toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    setActionError('');
    setDeletingId(id);
    try {
      await dispatch(deleteProductThunk(id)).unwrap();
    } catch (err) {
      setActionError(
        typeof err === 'string' ? err : 'Failed to delete product.'
      );
    }
    setDeletingId(null);
    setConfirmDeleteId(null);
  };

  const handleRetry = () => {
    dispatch(fetchProducts());
  };

  const isInitialLoading = status === 'loading' && products.length === 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
            Products
          </h1>
          <p className="mt-1 text-sm text-[#374151]">
            {products.length} product{products.length !== 1 ? 's' : ''} in
            catalog
          </p>
        </div>
        <Button variant="primary" onClick={handleAddClick} className="gap-2">
          <Plus size={16} />
          Add Product
        </Button>
      </div>

      {actionError && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertTriangle size={18} className="shrink-0 text-red-600" />
          <p className="text-sm text-red-700">{actionError}</p>
        </div>
      )}

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name or category..."
        className="w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm text-[#111827] placeholder:text-[#374151]/50 focus:outline-none focus:ring-2 focus:ring-[#2563eb] sm:max-w-sm"
      />

      {isInitialLoading ? (
        <Card padding="none" hoverEffect={false} className="overflow-hidden ">
          <Loading label="Loading products..." />
        </Card>
      ) : status === 'failed' && products.length === 0 ? (
        <Card
          padding="lg"
          hoverEffect={false}
          className="flex flex-col items-center gap-4 text-center"
        >
          <AlertTriangle size={32} className="text-red-500" />
          <div>
            <p className="text-base font-semibold text-[#111827]">
              Failed to load products
            </p>
            <p className="mt-1 text-sm text-[#374151]">
              {error || 'Something went wrong. Please try again.'}
            </p>
          </div>
          <Button variant="primary" onClick={handleRetry}>
            Retry
          </Button>
        </Card>
      ) : (
        <Card padding="none" hoverEffect={false} className="overflow-hidden rounded-2xl border border-[#e5e7eb] dark:border-white/10">
          {filteredProducts.length === 0 ? (
            <p className="px-6 py-14 text-center text-sm text-[#374151]">
              No products found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Stock</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const isConfirmingDelete = confirmDeleteId === product.id;
                    const isDeleting = deletingId === product.id;

                    return (
                      <tr
                        key={product.id}
                        className="border-b border-gray-100 text-sm transition-colors hover:bg-gray-50 last:border-0"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[#f9fafb]">
                              {product.images?.[0] && (
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                />
                              )}
                            </div>
                            <span className="line-clamp-1 font-medium text-[#111827]">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[#374151]">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 font-medium text-[#111827]">
                          {formatPrice(product.price)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[#374151]">
                              {product.stock}
                            </span>
                            {product.stock === 0 ? (
                              <Badge variant="danger">Out of Stock</Badge>
                            ) : product.stock <= 10 ? (
                              <Badge variant="default">Low Stock</Badge>
                            ) : null}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {isDeleting ? (
                            <div className="flex items-center justify-end gap-2">
                              <Spinner size="sm" />
                            </div>
                          ) : isConfirmingDelete ? (
                            <div className="flex items-center justify-end gap-2">
                              <span className="text-xs text-[#374151]">
                                Delete?
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDelete(product.id)}
                                className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-700"
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(null)}
                                className="rounded-lg border border-[#e5e7eb] px-2.5 py-1 text-xs font-semibold text-[#111827] hover:bg-[#f9fafb]"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleEditClick(product)}
                                aria-label="Edit product"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#374151] hover:bg-[#f9fafb] hover:text-[#111827]"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(product.id)}
                                aria-label="Delete product"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#374151] hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingProduct={editingProduct}
      />
    </div>
  );
}

export default AdminProducts;