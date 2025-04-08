import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (user) {
      const stored = JSON.parse(localStorage.getItem('cart')) || [];
      const count = stored.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    } else {
      setCartCount(0); // Reset if logged out
    }
  }, [user]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">E-Shop</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          {user?.role === 'admin' && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Admin</Link>
            </li>
          )}

          {/* Cart only shown if user is logged in */}
          {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                🛒 Cart {cartCount > 0 && <span className="badge bg-secondary">{cartCount}</span>}
              </Link>
            </li>
          )}
        </ul>

        <ul className="navbar-nav">
          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-link">{user.role}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-danger btn-sm" onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
