import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/details.css'
import Button from 'react-bootstrap/Button';
function ResetPassword() {
    const { email } = useParams();
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleResetPassword = async () => {
        console.log(email)
        try {
            const response = await axios.post('http://localhost:5000/resetPassword', {otp,email, newPassword }) // Include userID in the request body
            if (!response.ok) {
                throw new Error('Failed to reset password');
            }
            // Set success message
            setSuccessMessage('Password reset successfully!');
            // Redirect to home route after a brief delay
            setTimeout(() => {
                navigate('/');
            }, 2000); // 2000 milliseconds delay
        } catch (error) {
            console.error('Error resetting password:', error.message);
            setErrorMessage(error.message);
        }
    };
    return (
        
            <form>
                <label>OTP:</label>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />

                <label>New Password:</label>
                <input type="password"  value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

                <Button variant="dark" style={{borderRadius:"25px"}} onClick={handleResetPassword}>Reset Password</Button>
            </form>
    );
}
export default ResetPassword;