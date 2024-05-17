import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/details.css'
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';

function ResetPassword() {
    const { email } = useParams();
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const handleResetPassword = async () => {
<<<<<<< HEAD
        try {
            const response = await axios.post('http://localhost:5000/resetPassword', {otp,email, newPassword })
=======
        console.log(email)
        try {
            const response = await axios.post('http://localhost:5000/resetPassword', {otp,email, newPassword }) // Include userID in the request body
            if (!response.ok) {
                throw new Error('Failed to reset password');
            }
          
>>>>>>> 650dfcbb454291938dab7a45842ee1c5cc041735
         toast.success("Password Updated")
            // Redirect to home route after a brief delay
            setTimeout(() => {
                navigate('/');
<<<<<<< HEAD
            }, 2500); 
=======
            }, 2000); // 2000 milliseconds delay
>>>>>>> 650dfcbb454291938dab7a45842ee1c5cc041735
        } catch (error) {
            console.error('Error resetting password:', error.message);
           
        }
    };
    return (
        
            <form>
                 <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable theme="colored"/>
                <label>OTP:</label>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />

                <label>New Password:</label>
                <input type="password"  value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

                <Button variant="dark" style={{borderRadius:"25px"}} onClick={handleResetPassword}>Reset Password</Button>
            </form>
    );
}
export default ResetPassword;