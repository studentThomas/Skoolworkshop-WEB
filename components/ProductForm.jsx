"use client";
import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import "../css/ProductForm.css";

function ProductForm({ onProductCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [code, setCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [workshopId, setWorkshopId] = useState("");
  const [participantMultiplier, setParticipantMultiplier] = useState("");
  const [reusable, setReusable] = useState("");
  const [addMessage, setAddMessage] = useState("");
  const [deleteProductId, setDeleteProductId] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [workshops, setWorkshops] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the product data from the API
    fetch("https://skoolworkshop.up.railway.app/api/product")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          console.error("Product data is not an array:", data);
          setAddMessage(
            "Er is iets misgegaan met het ophalen van de producten"
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setAddMessage("Er is iets misgegaan met het ophalen van de producten");
      });
  }, []);

  useEffect(() => {
    // Fetch the workshops data from the API
    fetch("https://skoolworkshop.up.railway.app/api/workshop")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setWorkshops(data.data);
        } else {
          console.error("Workshops data is not an array:", data);
          setAddMessage(
            "Er is iets misgegaan met het ophalen van de workshops"
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching workshops:", error);
        setAddMessage("Er is iets misgegaan met het ophalen van de workshops");
      });
  }, []);

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

    // Map "reusable" value to a number (0 for "No" and 1 for "Yes")
    const reusableValue = reusable === "Yes" ? 1 : 0;

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
            workshopId: workshopIdNumber,
            participantMultiplier,
            reusable: reusableValue,
          }),
        }
      );

      if (response.ok) {
        console.log("Product succesfully added!");
        setAddMessage("Product succesvol toegevoegd!");
        // Reset form fields
        setName("");
        setDescription("");
        setImage("");
        setCode("");
        setQuantity("");
        setWorkshopId("");
        setParticipantMultiplier("");
        setReusable(""); // Reset "reusable" field
        // Trigger callback function
        onProductCreated();
      } else {
        console.error("Error adding the product");
        setAddMessage("Er is iets misgegaan bij het toevoegen van het product");
      }
    } catch (error) {
      console.error("Error:", error);
      setAddMessage(
        `Er is iets misgegaan bij het toevoegen van het product:  ${error.message}`
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
        console.log("Product successfully deleted!");
        setDeleteMessage("Product succesvol verwijderd!");
        // Reset input field
        setDeleteProductId("");
      } else {
        console.error(
          "Error deleting the product. Make sure the ID is correct."
        );
        setDeleteMessage(
          "Er is iets fout gegaan bij het verwijderen van het product. Controleer of het ID correct is."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setDeleteMessage(
        `Er is iets fout gegaan bij het verwijderen van product:  ${error.message}`
      );
    }
  };

  return (
    <div>
      <div className="product-form-container">
        <div>
          <h2 className="text-center text-2xl font-bold mb-4">
            Product toevoegen
          </h2>
          <form onSubmit={handleAddProduct}>
            <label className="flex flex-col mb-4">
              Naam:
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              />
            </label>
            <label className="flex flex-col mb-4">
              Beschrijving:
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              />
            </label>
            <label className="flex flex-col mb-4">
              URL van plaatje:
              <input
                type="text"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              />
            </label>
            <label className="flex flex-col mb-4">
              Code:
              <input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              />
            </label>
            <label className="flex flex-col mb-4">
              Voorraad:
              <input
                type="number"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              />
            </label>
            <label className="flex flex-col mb-4">
              Workshop:
              <select
                value={workshopId}
                onChange={(event) => setWorkshopId(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              >
                <option value="">Selecteer een workshop</option>
                {workshops.map((workshop) => (
                  <option key={workshop.Id} value={workshop.Id}>
                    {workshop.Id} - {workshop.Name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col mb-4">
              Producten per deelnemer:
              <input
                type="number"
                step="0.01"
                value={participantMultiplier}
                onChange={(event) =>
                  setParticipantMultiplier(event.target.value)
                }
                required
                className="px-2 py-1 border rounded"
              />
            </label>
            <label className="flex flex-col mb-4">
              Herbruikbaar:
              <select
                value={reusable}
                onChange={(event) => setReusable(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              >
                <option value="">Selecteer ja of nee</option>
                <option value="Yes">Ja</option>
                <option value="No">Nee</option>
              </select>
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white py-1 px-4 rounded"
            >
              Product toevoegen
            </button>
          </form>
          <p className="text-green-500 mt-2">{addMessage}</p>
        </div>

        <div>
          <h2 className="text-center text-2xl font-bold mb-4">
            Product verwijderen
          </h2>
          <form onSubmit={handleDeleteProduct}>
          <label className="flex flex-col mb-4">
              Product verwijderen:
              <select
                value={deleteProductId}
                onChange={(event) => setDeleteProductId(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              >
                <option value="">Selecteer een product</option>
                {products.map((product) => (
                  <option key={product.Id} value={product.Id}>
                    {product.Id} - {product.Name}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="bg-red-500 text-white py-1 px-4 rounded mt-2"
            >
              Verwijder product
            </button>
          </form>
          <p className="text-green-500 mt-2">{deleteMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
