import React,{useState} from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Register(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegistration = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post('/auth/register',{name,email,password});
            localStorage.getItem('token',res.data.token);
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert("Error registering user");
        }
    }

    return (
      <div>
        <Navbar/>
        <div className="min-h-screen flex items-center justify-center bg-orange-100">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Register</h2>
            <form onSubmit={handleRegistration} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="px-4 py-2 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
      
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
                Register
              </button>
            </form>
            <p className="text-sm text-center mt-2">Already have an account? <a href="/login" className="text-orange-500 font-medium">Login</a></p>
          </div>
        </div>
      </div>
      );
      
}