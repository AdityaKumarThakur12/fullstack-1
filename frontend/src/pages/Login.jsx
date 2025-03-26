import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';

const Login = () => {
    const navigate = useNavigate()

    const [login, setLogin] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e)=>{
        const {name, value} = e.target;
        // console.log(name, value);
        const copyLoginInfo = {...login};
        copyLoginInfo[name] = value;
        setLogin(copyLoginInfo);
    }

    const handleLogin = async (e)=>{
        e.preventDefault();
        const {email, password} = login;
        if(!email || ! password){
            return handleError("All fields are required")
        }
        try {
            const url = "http://localhost:8080/auth/login";
            const res = await fetch (url, {
                method: "Post",
                headers: {
                   "Content-Type": "application/json" 
                },
                body: JSON.stringify(login)
            })
            const result = await res.json();

            if (!res.ok) {
                throw new Error(result?.message );
            }

            const {success, message, jwtToken, name, error} = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem("token", jwtToken);
                localStorage.setItem("loggedInUser", name)
                setTimeout(()=>{
                    navigate('/Home')
                },1000)
            }else if (error) {
                const details = error?.details?.[0]?.message ;
                console.log(details);
                handleError(details);
            }
        } catch (error) {
           handleError(error.message) 
        }
    }

  console.log("Login Info--->" , login)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input 
              type="email" 
              name="email"
              value={login.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input 
              type="password" 
              name="password"
              value={login.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit" 
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Login 🛡️
          </button>
        </form>
        <p className="text-center text-gray-300 mt-4">
          Already have an account? <Link to="/signup" className="text-blue-400 hover:underline">Sign up</Link>
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
};

export default Login;
