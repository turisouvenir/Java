import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, config } from '../services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token")
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // redirect to login form when no token found
    if (!token) {
      navigate('/login');
    }
    // Call API to get items in the shopping cart
    axios
      .get(`${API_URL}/cart`, config)
      .then((response) => {
        setCartItems(response.data.items);
      })
      .catch((error) => {
        console.log('catch err', error);
      });
  }, [token]);

  useEffect(() => {
    // Fetch item details for each item in the cart
    const fetchItemDetails = async () => {
      const promises = cartItems.map((item) =>
        axios.get(`${API_URL}/products/${item.productId}`, config)
      );

      try {
        const responses = await Promise.all(promises);
        const updatedCartItems = responses.map((response, index) => ({
          ...cartItems[index],
          name: response.data.name,
        }));
        setCartItems(updatedCartItems);
      } catch (error) {
        console.log('catch err', error);
      }
    };

    if (cartItems.length > 0) {
      fetchItemDetails();
    }
  }, [cartItems]);

  // Function to handle checkout and display the purchased table
  const checkout = () => {
    axios
      .post(`${API_URL}/cart/checkout`, {}, config)
      .then((response) => {
        toast.success('Items checked out successfully!');
        setCartItems([]);
      })
      .catch((error) => {
        toast.error('Failed to check out items.');
        console.log('catch errr', error);
      });
  };

  // Function to handle removing an item from the cart
  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter((i) => i.id !== item.id);
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className='mt-12 w-[90%] mx-auto'>
        <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center mt-4 shadow-md">
              <div className="flex items-center justify-between w-full bg-white rounded-lg p-4">
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">Unit Price: {item.totalPrice / item.quantity} Rwf</p>
                  <p className="text-gray-600">Total Price: {item.totalPrice} Rwf</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <button
                  className="text-main text-sm bg-customRed px-4 py-2 rounded-full"
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length > 0 && (
          <button
            className="bg-primary text-main text-sm px-4 py-2 rounded-full mt-4"
            onClick={checkout}
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;