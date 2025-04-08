import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="bg-light border-end p-3" style={{ minHeight: '100vh', width: '200px' }}>
      <h5 className="mb-4">Admin Panel</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/admin" className="nav-link">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="btn btn-outline-primary w-100">Back to Home</Link>
        </li>
        {/* Future links like Users, Reports can go here */}
      </ul>
    </div>
  );
};

export default AdminSidebar;
