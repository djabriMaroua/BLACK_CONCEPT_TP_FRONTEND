import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams to get the ID from URL
import axios from 'axios';

function EditProduct() {
  const { id } = useParams(); // Extract the product ID from the URL
  const navigate = useNavigate();
  const [updatedProduct, setUpdatedProduct] = useState(null);

  useEffect(() => {
    // Fetch product details by ID when the component mounts
    if (id) {
      axios
        .get(`http://127.0.0.1:5000/api/product/${id}`)
        .then(response => {
          setUpdatedProduct(response.data);
        })
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [id]); // Fetch product when 'id' changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:5000/api/product/edit/${id}`, updatedProduct)
      .then(() => {
        alert('Product updated successfully!');
        navigate('/product/list'); // Navigate back to the product list after update
      })
      .catch(error => console.error('Error updating product:', error));
  };

  if (!updatedProduct) {
    return <p>Loading product details...</p>; // Show loading while the product is being fetched
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="name"
          className="border p-2 w-full"
          value={updatedProduct.name || ''}
          onChange={handleChange}
          required
        />
       
        <input
          type="number"
          name="price"
          className="border p-2 w-full"
          value={updatedProduct.price || ''}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
