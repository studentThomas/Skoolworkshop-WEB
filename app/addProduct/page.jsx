"use client";
import React from "react";
import { useEffect } from "react";
import router from "next/router";
import ProductForm from "../../components/ProductForm";
import Nav from "../../components/Nav";

function AddProductPage() {
  const handleProductCreated = () => {
    console.log("Product succesvol toegevoegd!");
    // Perform any additional actions or state updates here
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('role'); // Get the role from localStorage

    if(storedRole === 'user') {
      router.push('/scanner');
    }
  
  }, []);

  return (
    <div>
      <Nav/>
      <ProductForm onProductCreated={handleProductCreated} />
    </div>
  );
}

export default AddProductPage;
