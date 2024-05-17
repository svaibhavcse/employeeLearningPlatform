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
        try {
            const response = await axios.post('http://localhost:5000/resetPassword', {otp,email, newPassword })
         toast.success("Password Updated")
            // Redirect to home route after a brief delay
            setTimeout(() => {
                navigate('/');
            }, 2500); 
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