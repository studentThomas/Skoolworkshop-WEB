"use client";
import { useState, useEffect } from "react";
import Modal from "../../../components/ModalWorkshop";
import Nav from "@/components/Nav";
import "../../../css/WorkshopForm.css";

async function getWorkshop(workshopId: string) {
  const response = await fetch(
    `https://skoolworkshop.up.railway.app/api/workshop/${workshopId}`
  );
  const data = await response.json();
  const workshop = data?.data;
  return workshop;
}

async function updateWorkshop(
  workshopId: string,
  updatedWorkshop: { Name: string; CategoryName: string; Image: string}
) {
  const response = await fetch(
    `https://skoolworkshop.up.railway.app/api/workshop/${workshopId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWorkshop),
    }
  );
  const data = await response.json();
  return data;
}

export default function UpdateWorkshopPage() {
  const [workshop, setWorkshop] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const workshopId = urlParams.get("workshop");
    if (workshopId) {
      fetchData(workshopId);
    }
  }, []);

  const fetchData = async (workshopId: string) => {
    const data = await getWorkshop(workshopId);
    setWorkshop(data);
    setName(data.Name);
    setCategoryName(data.CategoryName);
    setImage(data.Image);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!workshop) return;

    const updatedWorkshop = {
      Name: name,
      CategoryName: categoryName,
      Image: image,
    };

    try {
      const response = await updateWorkshop(workshop.Id, updatedWorkshop);
      console.log("API Response:", response);
      if (response.status === 404) {
        console.error("Workshop not found");
        return;
      }
      // Redirect to the workshop page
      window.location.href = `/workshops`;
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  if (!workshop) {
    return <div>Loading...</div>;
  }

  return (
    <div className="workshop-form-container">
            <Nav />
      <div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} name={name} workshopId={workshop} />
        <h2 className="text-center text-2xl font-bold mb-4">
          Update Workshop
        </h2>
        <form onSubmit={handleFormSubmit}>
          <label className="flex flex-col mb-4">
            Name:
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="px-2 py-1 border rounded"
            />
          </label>
          <label className="flex flex-col mb-4">
            Categorie:
            <input
              id="categoryName"
              name="categoryName"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              required
              className="px-2 py-1 border rounded"
            />
          </label>
          <label className="flex flex-col mb-4">
            Image:
            <input
              type="text"
              id="image"
              name="image"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              required
              className="px-2 py-1 border rounded"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-1 px-4 rounded submit"
          >
            Update Workshop
          </button>
        <button
          type="button"
          className="bg-red-500 text-white py-1 px-4 rounded mt-4 submit"
          onClick={() => setShowModal(true)}
          >
          Delete Workshop
        </button>
      </form>
      </div>
    </div>
  );
}
