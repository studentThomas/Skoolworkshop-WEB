'use client';
import tracer from "tracer";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BreadCrumbs from "@/components/BreadCrumbs";
import "../../../../css/workshop.css";
import { updateQuantity } from "../../../../components/UpdateQuantity";

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
    { name: "Workshops", url: "/workshops" },
    { name: "Workshop", url: `/workshops/${params.workshop}` },
    { name: "Product", url: `/workshops/${params.workshop}/${params.product}` },
  ];
  const [product, setProduct] = useState<any>({});
  const [quantity, setQuantity] = useState<number>(0);
  const [notification, setNotification] = useState<string>("");

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

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const router = useRouter();

  const create = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default behavior of the form
    event.preventDefault();

    const newQuantity = quantity + product.Quantity;

    setProduct((prevProduct: any) => ({
      ...prevProduct,
      Quantity: newQuantity,
    }));
  
    await updateQuantity(product.Id, quantity);

    setQuantity(0);
  
    // Use a callback function with useState to ensure the updated state is correctly reflected
    setNotification(() => "De voorraad is succesvol bijgewerkt tot " + newQuantity + " stuks.");
  
    router.refresh();
  };
  

  return (
    <form onSubmit={create}>
      <div className="container text-center my-5">
        <BreadCrumbs breadCrumbs={breadCrumbs} />
        <h1 style={{ color: "orange" }}>Product</h1>
        <div className="my-4 div-style">
          <h2>{product.Name}</h2>
          <p>{product.Description}</p>
          <p style={{ color: "gray" }}>Code: {product.Code}</p>
          <img
            src={product.Image}
            alt="Product Image"
            className="product-detailimage"
          />
          <p>Herbruikbaar: {product.Reusable ? "Ja" : "Nee"}</p>
          <p>Voorraad: {product.Quantity}</p>
          <div className="input-container">
            <input
              type="range"
              min="-100"
              max="100"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <div className="input-space" />
            <input
              type="number"
              min="-100"
              max="100"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <button>Voorraad bijwerken</button>
          <p>{notification}</p>
        </div>
      </div>
    </form>
  );
}
