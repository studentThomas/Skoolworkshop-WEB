"use client";
import React, { useState } from "react";

function ProductForm({ onProductCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [code, setCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [workshopId, setWorkshopId] = useState("");
  const [participantMultiplier, setParticipantMultiplier] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://skoolworkshop.up.railway.app/api/product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            image,
            code,
            quantity,
            workshopId,
            participantMultiplier,
          }),
        }
      );

      if (response.ok) {
        console.log("Product added successfully!");
        setMessage("Product added successfully!");
        // Reset form fields
        setName("");
        setDescription("");
        setImage("");
        setCode("");
        setQuantity("");
        setWorkshopId("");
        setParticipantMultiplier("");
        // Trigger callback function
        onProductCreated();
      } else {
        console.error("Failed to add product");
        setMessage("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(
        "An error occurred while adding the product: " + error.message
      );
    }
  };

  return (
    <div>
      <h2>Product toevoegen</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </label>
        <br />
        <label>
          Code:
          <input
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
        </label>
        <br />
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </label>
        <br />
        <label>
          Workshop ID:
          <input
            type="text"
            value={workshopId}
            onChange={(event) => setWorkshopId(event.target.value)}
          />
        </label>
        <br />
        <label>
          Participant Multiplier:
          <input
            type="number"
            step="0.1"
            value={participantMultiplier}
            onChange={(event) => setParticipantMultiplier(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ProductForm;
