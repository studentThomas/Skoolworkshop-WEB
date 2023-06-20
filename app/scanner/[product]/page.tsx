'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BreadCrumbs from "@/components/BreadCrumbs";
import Nav from "@/components/Nav";
import "../../../css/workshop.css";
import { updateQuantity } from "../../../components/UpdateQuantity";
import Barcode from "react-barcode";

async function getProduct(productId: string) {
  const response = await fetch(
    `https://skoolworkshop.up.railway.app/api/product/${productId}`,
    { cache: "no-store" }
  );

  const data = await response.json();
  const product = data.data;

  return product;
}

export default function updateProduct({ params }: any) {
  const breadCrumbs = [
    { name: "Home", url: "/" },
    { name: "Scanner", url: "/scanner" },
    { name: "Product", url: `/scanner/${params.product}` },
  ];
  const [product, setProduct] = useState<any>({});
  const [quantity, setQuantity] = useState<number>(0);
  const [notification, setNotification] = useState<string>("");
  const [tempQuantity, setTempQuantity] =
    useState<number>(0);

  const handleDecrease = () => {
    setTempQuantity(
      (prevQuantity) => prevQuantity - 1
    );
  };

  const handleIncrease = () => {
    setTempQuantity(
      (prevQuantity) => prevQuantity + 1
    );
  };

  useEffect(() => {
    console.log(notification);
  }, [notification]);

  useEffect(() => {
    console.log(quantity);
  }, [quantity]);

  useEffect(() => {
    async function fetchData() {
      const fetchedProduct = await getProduct(params.product);
      setProduct(fetchedProduct);
      setQuantity(fetchedProduct.Quantity);
    }

    fetchData();
  }, [params.product]);

  const router = useRouter();

  const create = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const newQuantity = product.Quantity + tempQuantity;
  
    setProduct((prevProduct: any) => ({
      ...prevProduct, 
      Quantity: newQuantity,
    }));
  
    // Assuming the updateQuantity function updates the quantity of the product
    await updateQuantity(product.Id, newQuantity);
  
    setQuantity(0);
    setTempQuantity(0);
    setNotification("De voorraad is succesvol bijgewerkt tot " + newQuantity + " stuks.");
  
    router.refresh();
  };

  return (
    <div>
    <Nav />
    <form onSubmit={create}>
    <div className="container text-center my-5">
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <h1 style={{ color: "orange" }}>Product</h1>
      <div className="my-4 div-style">
        <h2>{product.Name}</h2>
        <Barcode value={product.Code} />
        <p>{product.Description}</p>
     
        <img
          src={product.Image}
          alt={product.Name}
          className="product-detailimage"
        />
        <p>Herbruikbaar: {product.Reusable ? "Ja" : "Nee"}</p>
        <p>Voorraad: {product.Quantity}</p>
        <div className="input-container">
              <button
                type="button"
                onClick={handleDecrease}
                className="button-quantity"
              >
                -
              </button>
              <span className="quantity-span">{tempQuantity}</span>
              <button
                type="button"
                onClick={handleIncrease}
                className="button-quantity"
              >
                +
              </button>
            </div>
        <button className="button-quantity">Voorraad bijwerken</button>
        <p>{notification}</p>
      </div>
    </div>
  </form>
  </div>
  );
}