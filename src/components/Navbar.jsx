import {Link,useNavigate} from 'react-router-dom';
import { HandCoins, Github } from 'lucide-react';

export default function Navbar(){
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    return(
    <nav className=" bg-orange-500 text-white px-4 py-3 flex justify-between items-center font-display">
      <h1 className="text-3xl py-2 flex items-center gap-2">
        <HandCoins className="w-10 h-10 text-white" />
        <Link to="/dashboard" className="text-inherit">BudgetBase</Link>
      </h1>

      <div className="flex items-center space-x-4 text-white">
        <a 
            href="https://github.com/Garuna-A/Finman-backend" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-orange-300 transition-colors"
        >
            <Github className="w-8 h-8" />
        </a>

        <Link to="/dashboard" className="hover:underline hover:text-orange-300 transition-colors">
            Dashboard
        </Link>

        <Link to="/add" className="hover:underline hover:text-orange-300 transition-colors">
            Add Transaction
        </Link>

        {isLoggedIn && (
            <button
            onClick={handleLogout}
            className="bg-white text-orange-600 px-3 py-1 rounded hover:bg-orange-100 transition-colors"
            >
            Logout
            </button>
        )}
       </div>

    </nav>
    )
}