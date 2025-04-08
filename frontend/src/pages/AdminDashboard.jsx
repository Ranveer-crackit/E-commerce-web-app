import { useEffect, useState } from 'react';
import API from '../services/api';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', image: '', category: '' });

  const fetchData = async () => {
    const res1 = await API.get('/products');
    const res2 = await API.get('/orders');
    setProducts(res1.data);
    setOrders(res2.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async () => {
    await API.post('/products', { ...form, price: Number(form.price), stock: Number(form.stock) });
    setForm({ name: '', description: '', price: '', stock: '', image: '', category: '' });
    fetchData();
  };

  const handleDelete = async (id) => {
    await API.delete(`/products/${id}`);
    fetchData();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="d-flex">
        <AdminSidebar />
        <div className="flex-grow-1 p-3">
          <h4>Add New Product</h4>
          <div className="row g-2 mb-3">
            {['name', 'description', 'price', 'stock', 'image', 'category'].map((field) => (
              <div className="col-md-4" key={field}>
                <input
                  className="form-control"
                  name={field}
                  placeholder={field}
                  value={form[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="col-12">
              <button className="btn btn-primary" onClick={handleCreate}>Add Product</button>
            </div>
          </div>
  
          <h4>Product List</h4>
          <ul className="list-group mb-4">
            {products.map((p) => (
              <li className="list-group-item d-flex justify-content-between" key={p._id}>
                {p.name} (${p.price})
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
              </li>
            ))}
          </ul>
  
          <h4>All Orders</h4>
          <ul className="list-group">
            {orders.map((o, i) => (
              <li className="list-group-item" key={i}>
                User: {o.userId?.email || 'N/A'} | Total: ${o.total} | Items: {o.products.length}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
};

export default AdminDashboard;
