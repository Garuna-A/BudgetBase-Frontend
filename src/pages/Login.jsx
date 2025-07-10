import React, { useState } from "react";
import axios from "../api/axiosInstance";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    // const navigate = useNavigate();

    const handleLogin= async(e) =>{
        e.preventDefault();
        setLoading(true);
        try{
            const res = await axios.post('/auth/login', {email,password});
            localStorage.setItem('token', res.data.token);
            window.location.href = '/dashboard';
        }
        catch(err){
            console.error(err);
            alert("Login failed");
        }
        finally{
          setLoading(false);
        }
    }

    return (
      <div>
        <Navbar/>
        {loading? (
          <div className="flex justify-center items-center mt-4">
            <div className="w-6 h-6 border-4 border-white border-t-orange-500 rounded-full animate-spin"></div>
            <span className="ml-2 text-orange-600 font-semibold">Logging in...</span>
          </div>

        ):(
        <div className="min-h-screen flex items-center justify-center bg-orange-100">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="px-4 py-2 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
      
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="px-4 py-2 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
      
              <button
                type="submit"
                className="bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Login
              </button>
            </form>
            <p className="text-sm text-center mt-2">Don't have an account? <a href="/register" className="text-orange-500 font-medium">Register</a></p>
          </div>
        </div>
        )}
      </div>
      );
      
};
