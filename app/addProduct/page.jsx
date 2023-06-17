"use client";
import React from "react";
import ProductForm from "../../components/ProductForm";
import Nav from "../../components/Nav";

function AddProductPage() {
  const handleProductCreated = () => {
    console.log("Product succesvol toegevoegd!");
    // Perform any additional actions or state updates here
  };

  return (
    <div>
      <Nav/>
      <ProductForm onProductCreated={handleProductCreated} />
    </div>
  );
}

export default AddProductPage;
