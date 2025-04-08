import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const addToCart = () => {
    const existing = JSON.parse(localStorage.getItem('cart')) || [];

    const index = existing.findIndex(item => item._id === product._id);

    if (index !== -1) {
      existing[index].quantity += 1;
    } else {
      existing.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(existing));
    alert('Product added to cart!');
  };

  return (
    <div className="card h-100">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">${product.price}</p>
        </div>
        <div className="mt-3 d-flex justify-content-between">
          <Link to={`/product/${product._id}`} className="btn btn-outline-primary btn-sm">
            View
          </Link>
          <button className="btn btn-success btn-sm" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
