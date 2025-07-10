import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddTransaction from './pages/AddTransaction'
import './App.css'

function App(){
  const isLoggedIn = !!localStorage.getItem('token');

  return(
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={isLoggedIn? <Dashboard/>:<Navigate to='/login' />}/>
      <Route path='/add' element={isLoggedIn? <AddTransaction/>:<Navigate to='/login' />}/>
    </Routes>
  )
};
export default App;


