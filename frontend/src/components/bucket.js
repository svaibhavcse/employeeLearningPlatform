import React, { createContext, useContext, useState } from "react";

const SupplierContext = createContext();

export const Bucket = (props) => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [isAdmin, setAdmin] = useState(false);
  const [logged, setLogged] = useState(false);

  return (
    <SupplierContext.Provider value={{ email, setEmail, userId, setUserId, isAdmin, setAdmin, logged, setLogged }}>
      {props.children}
    </SupplierContext.Provider>
  );
};

export const useSupplier = () => useContext(SupplierContext);