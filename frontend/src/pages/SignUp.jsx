import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';

const SignUp = () => {
    const navigate = useNavigate()

    const [signup, setSignup] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e)=>{
        const {name, value} = e.target;
        console.log(name, value);
        const copyLoginInfo = {...signup};
        copyLoginInfo[name] = value;
        setSignup(copyLoginInfo);
    }

    const handleSignup = async (e)=>{
        e.preventDefault();
        const {name, email, password} = signup;
        if(!name || !email || ! password){
            return handleError("All fields are required")
        }
        try {
            const url = "http://localhost:8080/auth/signup";
            const res = await fetch(url, {
                method: "Post",
                headers: {
                   "Content-Type": "application/json" 
                },
                body: JSON.stringify(signup)
            })
            const result = await res.json();
            const {success, message, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
                },1000)
            }else if (error){
                const details = error?.details[0].message;
                handleError(details);
            }
        } catch (error) {
           handleError(err) 
        }
    }

  console.log("Login Info--->" , signup)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Username</label>
            <input 
              type="text" 
              name="name"
              value={signup.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input 
              type="email" 
              name="email"
              value={signup.email}
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
              value={signup.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit" 
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-300 mt-4">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Log in</Link>
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
};

export default SignUp;
