import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';

const Home = () => {
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUser"));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        handleSuccess("User Logged Out");
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8080/products";
            const headers = {
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            };
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result[0]);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
            <div className="w-full max-w-5xl px-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold">Welcome, {loggedInUser}</h1>
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        Log Out
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.length > 0 ? (
                        products.map((item, i) => (
                            <div key={i} className="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-2xl transition">
                                <h2 className="text-xl font-bold">{item.name}</h2>
                                <p className="text-gray-300 mt-1">Price: <span className="text-blue-400">${item.price}</span></p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center col-span-full">No products available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
