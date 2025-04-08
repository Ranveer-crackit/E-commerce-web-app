import { useEffect, useState } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products').then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="row">
      {products.map((product) => (
        <div key={product._id} className="col-md-4 mb-4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default Home;
