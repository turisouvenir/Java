import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { API_URL, config } from '../services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Products = () => {
  const [productQuantities, setProductQuantities] = useState({});
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    fetchData();
  });

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`, config);
      setProductsData(response?.data.data);   //populate the data array with the response data vehicles
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle decreasing the quantity of a product in the cart
  const decreaseQuantity = (productId) => {
    setProductQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      const currentQuantity = updatedQuantities[productId] || 0;

      if (currentQuantity > 0) {
        updatedQuantities[productId] = currentQuantity - 1;
      }

      return updatedQuantities;
    });
  };

  // Function to handle increasing the quantity of a product in the cart
  const increaseQuantity = (productId) => {
    setProductQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      const currentQuantity = updatedQuantities[productId] || 0;

      updatedQuantities[productId] = currentQuantity + 1;

      return updatedQuantities;
    });
  };

  // Function to handle adding the item to the cart
  const addToCart = (product) => {
    const quantity = productQuantities[product.id];

    if (!quantity || quantity < 1) {
      toast.error('Quantity cannot be 0.');
      return;
    }

    // Call API to add the items to the cart
    axios
      .post(`${API_URL}/cart/add/${product.id}/${quantity}`,{}, config)
      .then((response) => {
        console.log(response.data, 'response');
        toast.success('Items added to cart successfully!');
      })
      .catch((error) => {
        toast.error( error?.response?.data?.message || 'Failed to add items to cart.');
        console.log('catch err', error);
      });
  };

  return (
    <div>
      <ToastContainer />
      <h2 className="text-xl font-bold text-gray-800">Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {/* Render product cards */}
        {productsData.map((product) => {
          const quantity = productQuantities[product.id] || 0;

          return (
            <div key={product.id} className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600">Product Type: {product.productType}</p>
              <p className="text-gray-600">Product Price: {product.price} Rwf</p>
              <div className="flex items-center mt-4">
                <button
                  className="bg-primary text-main text-sm px-2 py-1 rounded-full"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                <p className="text-gray-600 mx-2">{quantity}</p>
                <button
                  className="bg-primary text-main text-sm px-2 py-1 rounded-full"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
                <button
                  className="bg-primary text-main text-sm px-4 py-2 rounded-full ml-4"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;