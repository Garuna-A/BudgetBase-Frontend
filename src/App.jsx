import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddTransaction from './pages/AddTransaction'
import NotFound from './pages/NotFound'
import './App.css'

function App(){
  const isLoggedIn = !!localStorage.getItem('token');

  return(
    <Routes>
      <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={isLoggedIn? <Dashboard/>:<Navigate to='/login' />}/>
      <Route path='/add' element={isLoggedIn? <AddTransaction/>:<Navigate to='/login' />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
};
export default App;


