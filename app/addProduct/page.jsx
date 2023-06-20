"use client";
import React from "react";
import { useEffect } from "react";
import ProductForm from "../../components/ProductForm";
import Nav from "../../components/Nav";
import { useRouter } from "next/navigation";

function AddProductPage() {
  const handleProductCreated = () => {
    console.log("Product succesvol toegevoegd!");
    // Perform any additional actions or state updates here
  };
  const router = useRouter();

  useEffect(() => {

    const storedRole = localStorage.getItem('role'); // Get the role from localStorage

    if(storedRole === 'Gebruiker') {
      router.push('/forbidden');
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
