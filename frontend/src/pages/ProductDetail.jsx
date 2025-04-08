import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/products`).then((res) => {
      const found = res.data.find((p) => p._id === id);
      setProduct(found);
    });
  }, [id]);

  const handleOrder = async () => {
    if (!user) {
      return navigate('/login');
    }

    try {
      const total = product.price * quantity;
      const orderData = {
        products: [{ productId: product._id, quantity }],
        total
      };
      await API.post('/orders', orderData);
      alert('Order placed successfully!');
      navigate('/'); // or to '/orders' if you have an order history page
    } catch (err) {
      console.error(err);
      alert('Failed to place order');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="card">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <h4>${product.price}</h4>

        {user ? (
          <>
            <div className="mb-2">
              <label>Quantity: </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="form-control w-25"
              />
            </div>
            <button className="btn btn-success" onClick={handleOrder}>
              Order Now
            </button>
          </>
        ) : (
          <p>
            <a href="/login">Login</a> to order this product.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
