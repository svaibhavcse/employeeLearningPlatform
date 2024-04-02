import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import './styles/details.css'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminNavbar } from './adminNavbar';
import { useSupplier } from './bucket';
export const CreateUser = () => {
  const {isAdmin} = useSupplier();
    const [email, setEmail] = useState('');
    const [name,setName] = useState('')
    const password = '0000'
    const role = 'user'
    const createUser = async (e) =>{
        e.preventDefault();
        try {
          const userData = { name, email, password, role };
          const response =  await axios.post('http://localhost:5000/createUser', userData);
          if (response.data.error) {
            toast.error(response.data.error );
          } 
          else {
            toast.success("User created successfully");
          }
        } catch (error) {
          console.error('Error creating user:', error);
        }
    }
  return (
    isAdmin &&(
    <div>
      <AdminNavbar/>
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable theme="colored"/>
      <div style={{padding:"10px"}}>
        <form onSubmit={createUser}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="User Name" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <Button variant="dark" className='btn' type="submit" style={{borderRadius:"25px"}} >Create User</Button>
        </form>     
    </div>
    </div>)
  )
}