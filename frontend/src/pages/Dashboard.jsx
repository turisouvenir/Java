import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import AppServices from '../services';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await AppServices.getProducts();
            if (response.data.success) {
                setProducts(response.data.data);
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to fetch products.');
        }
    };

    const handleBuy = (productId) => {
        // Logic for handling the "Buy" button click
        // You can perform the necessary actions, such as adding the product to the cart or initiating the purchase process
        console.log(`Buy product with ID: ${productId}`);
    };

    const handleAddToCart = (productId) => {
        // Logic for handling the "Add to Cart" button click
        // You can perform the necessary actions, such as adding the product to the shopping cart
        console.log(`Add product with ID: ${productId} to cart`);
    };

    const handleIncrementQuantity = (productId) => {
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === productId) {
                    return { ...product, quantity: product.quantity + 1 };
                }
                return product;
            });
        });
    };

    const handleDecrementQuantity = (productId) => {
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === productId && product.quantity > 0) {
                    return { ...product, quantity: product.quantity - 1 };
                }
                return product;
            });
        });
    };

    return (
        <div className="container mx-auto">
            <div className='nav-bar bg-primary'>
            </div>
            <div className='w-[90%] mx-auto mt-5'>
                <h1 className="text-2xl font-bold mb-4">Available Products</h1>
                <div className="grid grid-cols-3 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white shadow p-4">
                            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                            <p className="mb-4">Price: RWF{product.price}</p>
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <button
                                        className="bg-primary text-main rounded-md px-2 py-1 mr-2"
                                        onClick={() => handleDecrementQuantity(product.id)}
                                    >
                                        -
                                    </button>
                                    <span>0</span> {/* Display the quantity here */}
                                    <button
                                        className="bg-primary text-main rounded-md px-2 py-1 ml-2"
                                        onClick={() => handleIncrementQuantity(product.id)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="bg-primary text-main rounded-md px-4 py-2"
                                    onClick={() => handleAddToCart(product.id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                            <div className="mx-auto">
                                <button
                                    className="bg-primary w-full text-main rounded-md px-4 py-2 mr-2"
                                    onClick={() => handleBuy(product.id)}
                                >
                                    Buy
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductList;
