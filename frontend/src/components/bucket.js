import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SupplierContext = createContext();

export const Bucket = (props) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [isAdmin, setAdmin] = useState(true);//false
  const [logged, setLogged] = useState(true);//false

  const logout =()=>{
    setEmail('')
    setUserId('')
    setAdmin(false)
    setLogged(false)
    navigate('/')
  }

  // Load state from local storage when component mounts
  useEffect(() => {
    const storedState = localStorage.getItem("supplierState");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setEmail(parsedState.email);
      setUserId(parsedState.userId);
      setAdmin(parsedState.isAdmin);
      setLogged(parsedState.logged);
    }
  }, []);

  // Save state to local storage when component unmounts
  useEffect(() => {
    const stateToStore = JSON.stringify({ email, userId, isAdmin, logged });
    localStorage.setItem("supplierState", stateToStore);
    // Cleanup function
    return () => {
      localStorage.removeItem("supplierState");
    };
  }, [email, userId, isAdmin, logged]);

  return (
    <SupplierContext.Provider value={{ email, setEmail, userId, setUserId, isAdmin, setAdmin, logged, setLogged,logout }}>
      {props.children}
    </SupplierContext.Provider>
  );
};

export const useSupplier = () => useContext(SupplierContext);