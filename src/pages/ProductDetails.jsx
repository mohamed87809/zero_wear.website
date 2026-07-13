// src/pages/ProductDetails.jsx

import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import ProductGallery from '../components/product/ProductGallery.jsx';
import ProductInfo from '../components/product/ProductInfo.jsx';
import ProductTabs from '../components/product/ProductTabs.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import Button from '../components/ui/Button.jsx';
import Loading from '../components/ui/Loading.jsx';

import {
  selectAllProducts,
  selectProductsStatus,
} from '../redux/features/productsSlice.js';
import {
  getProductById,
  getRelatedProducts,
} from '../utils/productHelpers.js';

function ProductDetails() {
  const { id } = useParams();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);

  const product = getProductById(products, id);

  // Products load asynchronously from Firestore now, so a missing product
  // could simply mean the fetch hasn't resolved yet — show a loading state
  // instead of a false "not found" while the initial fetch is in flight.
  if (status === 'loading' && !product) {
    return <Loading label="Loading product..." fullScreen />;
  }

  if (!product) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#111827]">
          Product Not Found
        </h1>
        <p className="max-w-sm text-sm text-[#374151]">
          The product you're looking for doesn't exist or may have been
          removed.
        </p>
        <Link to="/products">
          <Button variant="primary">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(products, product.id, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} productName={product.name} />
        <ProductInfo product={product} />
      </div>

      <div className="mt-14 sm:mt-16 lg:mt-20">
        <ProductTabs product={product} />
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <ProductCard product={relatedProduct} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;