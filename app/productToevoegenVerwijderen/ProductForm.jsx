"use client";
import React, { useState } from "react";
import "../../css/ProductForm.css";

function ProductForm({ onProductCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [code, setCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [workshopId, setWorkshopId] = useState("");
  const [participantMultiplier, setParticipantMultiplier] = useState("");
  const [addMessage, setAddMessage] = useState("");
  const [deleteProductId, setDeleteProductId] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const handleAddProduct = async (event) => {
    event.preventDefault();

    // Validate Workshop ID
    const workshopIdNumber = parseInt(workshopId, 10);
    if (
      isNaN(workshopIdNumber) ||
      workshopIdNumber < 1 ||
      workshopIdNumber > 31
    ) {
      setAddMessage("Workshop ID moet een nummer tussen 1 en 31 zijn");
      return;
    }

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
        console.log("Product succesvol toegevoegd!");
        setAddMessage("Product succesvol toegevoegd!");
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
        console.error("Er is iets misgegaan met het toevoegen van het product");
        setAddMessage("Er is iets misgegaan met het toevoegen van het product");
      }
    } catch (error) {
      console.error("Error:", error);
      setAddMessage(
        `Er is iets misgegaan met het toevoegen van het product:  ${error.message}`
      );
    }
  };

  const handleDeleteProduct = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://skoolworkshop.up.railway.app/api/product/${deleteProductId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Product succesvol verwijderd!");
        setDeleteMessage("Product succesvol verwijderd!");
        // Reset input field
        setDeleteProductId("");
      } else {
        console.error(
          "Er is iets mis gegaan met het verwijderen van het product. Klopt het ID wel?"
        );
        setDeleteMessage(
          "Er is iets mis gegaan met het verwijderen van het product. Klopt het ID wel?"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setDeleteMessage(
        `Er is iets misgegaan met het verwijderen van het product:  ${error.message}`
      );
    }
  };

  return (
    <div>
      <div className="product-form-container">
        <div>
          <h2>Product toevoegen</h2>
          <form onSubmit={handleAddProduct}>
            <label>
              Naam:
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Beschrijving:
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </label>
            <br />
            <label>
              URL van plaatje:
              <input
                type="text"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Code:
              <input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Voorraad:
              <input
                type="number"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Workshop ID:
              <input
                type="text"
                value={workshopId}
                onChange={(event) => setWorkshopId(event.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Aantal producten per deelnemer:
              <input
                type="number"
                step="0.1"
                value={participantMultiplier}
                onChange={(event) =>
                  setParticipantMultiplier(event.target.value)
                }
                required
              />
            </label>
            <br />
            <button type="submit">Voeg product toe</button>
          </form>
          {addMessage && <p>{addMessage}</p>}
        </div>

        <div>
          <h2>Product verwijderen</h2>
          <form onSubmit={handleDeleteProduct}>
            <label>
              Product ID:
              <input
                type="text"
                value={deleteProductId}
                onChange={(event) => setDeleteProductId(event.target.value)}
                required
              />
            </label>
            <br />
            <button type="submit">Verwijder product</button>
          </form>
          {deleteMessage && <p>{deleteMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
