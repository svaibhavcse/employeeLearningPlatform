import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './styles/login.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSupplier } from './bucket';
import Alert from 'react-bootstrap/Alert';
import backgroundImage from './assets/loginBack.png'
const Login = () => {
  const supplier = useSupplier();
  const  email = supplier.email
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const login =async (e) => {
      e.preventDefault()
      try {      
        const response = await axios.post('http://localhost:5000/login',{email});
        if(response.data ==='No User'){
          toast.error("Invalid User !")
        }
        else{
        if(response.data.login.password === password){
          toast.success("Login Success");
          supplier.setUserId(response.data.login._id)
          supplier.setLogged(true)
          setTimeout(() => {
            if (response.data.role === 'admin') {
              supplier.setAdmin(true)
              navigate('/event');
            } else {
              supplier.setAdmin(false) //false
              navigate(`/user/${response.data.login._id}`);
            }
          }, 2000);
        }
        if (response.data.login.password !== password){
          toast.error("Password does'nt match !")
        }
      }
     
      } catch (error) {
        toast.error("Invalid User !")
        console.log(error);
      }
    };
const forgetPassword = async () => {
  try {
    if(!email) {toast.error('Please enter a valid email id')}
    const response = await axios.post('http://localhost:5000/forgotpassword',{ email : email })
    if(response)
    toast.success("OTP sent to your email")
    setTimeout(()=>{navigate(`/resetpassword/${email}`)},2500)
    
  } catch (error) {
    if(error.response.status === 404){
    toast.error('User not Found !')}
    console.error('Error sending OTP for password reset:', error);
   
  }
}

    return (
      <div className='loginContainer' 
       style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '50%', 
        backgroundRepeat: 'no-repeat',
        backgroundPositionY:'2rem',
        backgroundPositionX:'0rem',
        height: '100vh'
      }}
      >
        <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable theme="colored"/>
       <Alert variant="dark" style={{borderRadius:"50px", margin:"1% 10% 10% 10%",textAlign:"center",backgroundColor:"#495057",color:"white",borderColor:"#6c757d",borderWidth:"5px"}}>Employee Learning Platform</Alert>
       <div className='formContainer'>
        <form onSubmit={login} >
          <input className = 'inputEmail' type="email"  onChange={(e) => supplier.setEmail(e.target.value)} placeholder="Email" required />
          <input className='inputPassword' type="password"  onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <Button variant="dark" className='btnLogin' type="submit" style={{borderRadius:"25px"}} >Login</Button>
          <p onClick={() => {forgetPassword()}}>Forget Password ?</p>
        </form>
        </div>
      </div>
    );
  };

  export default Login;