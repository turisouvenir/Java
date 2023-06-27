import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL, config } from '../services';

function Table() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    });

    // Fetch data from the API
    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/reports/purchases`, config);
            setData(response?.data);   //populate the data array with the response data vehicles
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <p className="text-gray-500 text-sm font-semibold">
                    All Purchases Report
                </p>
            </div>
            <div className="overflow-x-auto max-w-full md:mx-auto mt-2">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-[#EDEEF3] h-12 bg-opacity-[3%] border border-gray-200">
                            <th className="text-primary px-4 py-2 text-start">Customer Name</th>
                            <th className="text-primary px-4 py-2 text-start">Date</th>
                            <th className="text-primary px-4 py-2 text-start">Product Id</th>
                            <th className="text-primary px-4 py-2 text-start">Product Name</th>
                            <th className="text-primary px-4 py-2 text-start">Quantity</th>
                            <th className="text-primary px-4 py-2 text-start">Unit Price</th>
                            <th className="text-primary px-4 py-2 text-start">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data
                            .map((item) => (
                                <tr className="bg-[#434343] bg-opacity-[3%] border border-gray-200" key={item._id}>
                                    <td className="px-4 py-2">{item?.customerName || 'Nick'}</td>
                                    <td className="px-4 py-2">{item.date}</td>
                                    <td className="px-4 py-2">{item?.productId}</td>
                                    <td className="px-4 py-2">{item.productName}</td>
                                    <td className="px-4 py-2">{item.quantity}</td>
                                    <td className="px-4 py-2">{item.unitPrice}</td>
                                    <td className="px-4 py-2">{item.totalPrice}</td>
                                </tr>
                            ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default Table;