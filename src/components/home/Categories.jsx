import { Link } from 'react-router-dom';
import { categories } from '../../data/products.js';

const categoryImages = {
  Birkenstock: '/images/hero1.png',
  Sandals: '/images/hero4.png',
  Crocs: '/images/hero2.png',
  Caps: '/images/hero3.png',
};

function Categories() {
  return (
    <section className="py-16 bg-white ">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${encodeURIComponent(category.slug)}`}
              className="overflow-hidden rounded-2xl"
            >
              <img
                src={categoryImages[category.slug]}
                alt={category.name}
                className="aspect-square w-full object-cover transition hover:scale-105"
              />
              <p className="py-3 text-center font-semibold">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;