import { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(stored);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    try {
      const formatted = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));
      await API.post('/orders', { products: formatted, total });
      setCart([]);
      localStorage.removeItem('cart');
      setMessage('Order placed successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Error placing order');
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>No items in cart.</p> : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item, i) => (
              <li className="list-group-item d-flex justify-content-between" key={i}>
                {item.name} x {item.quantity}
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <h4>Total: ${total}</h4>
          {user ? (
            <button className="btn btn-success" onClick={placeOrder}>Checkout</button>
          ) : (
            <p><a href="/login">Login to checkout</a></p>
          )}
        </>
      )}
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default Cart;
