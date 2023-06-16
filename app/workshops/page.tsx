"use client";

import React, { useState, useEffect } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import Nav from "@/components/Nav";
import Link from "next/link";
import ModalWorkshopDelete from "../../components/ModalWorkshopDelete";
import ModalWorkshopUpdate from "../../components/ModalWorkshopUpdate";
import "../../css/workshop.css";
import LoginPage from "../login/page";

async function getWorkshops() {
  const response = await fetch(
    "https://skoolworkshop.up.railway.app/api/workshop"
  );
  const data = await response.json();
  const workshops = data?.data as any[];
  return workshops;
}

const breadCrumbs = [
  { name: "Home", url: "/" },
  { name: "Workshops", url: "/workshops" },
];

export default  function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState<any[]>([]);
  const [role, setRole] = useState<string | null>(null);


  useEffect(() => {
    const storedRole = localStorage.getItem('role'); // Get the role from localStorage
    setRole(storedRole || null); // Update the role in state with a fallback to null if it's not available
  
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    const workshops = await getWorkshops();
    setWorkshops(workshops);
    setFilteredWorkshops(workshops);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    if (!searchTerm) {
      setFilteredWorkshops(workshops);
      return;
    }

    const filteredWorkshops = workshops.filter((workshop) =>
      workshop.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWorkshops(filteredWorkshops);
  };

  const updateWorkshop = (updatedWorkshop: any) => {
    setWorkshops((prevWorkshops) => {
      const updatedWorkshops = prevWorkshops.map((workshop) => {
        if (workshop.Id === updatedWorkshop.Id) {
          return { ...workshop, ...updatedWorkshop };
        }
        return workshop;
      });
      return updatedWorkshops;
    });
    setFilteredWorkshops((prevFilteredWorkshops) => {
      const updatedFilteredWorkshops = prevFilteredWorkshops.map((workshop) => {
        if (workshop.Id === updatedWorkshop.Id) {
          return { ...workshop, ...updatedWorkshop };
        }
        return workshop;
      });
      return updatedFilteredWorkshops;
    });
  };

  const deleteWorkshop = (deletedWorkshop: any) => {
    setWorkshops((prevWorkshops) => {
      const deletedWorkshops = prevWorkshops.filter(
        (workshop) => workshop.Id !== deletedWorkshop.Id
      );
      return deletedWorkshops;
    });
    setFilteredWorkshops((prevFilteredWorkshops) => {
      const deletedFilteredWorkshops = prevFilteredWorkshops.filter(
        (workshop) => workshop.Id !== deletedWorkshop.Id
      );
      return deletedFilteredWorkshops;
    });
  };
 
  return (
    <div>
      <Nav />
      <h1 className="text-center">{role}</h1>
    <div className="">
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <div className="album ">
        <div className="container">
          <header className="mb-4">
            <form>
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                onChange={handleSearch}
              />
            </form>
          </header>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {filteredWorkshops.map((workshop) => (
              <div className="col" key={workshop.Id}>
                <WorkshopCard
                  workshop={workshop}
                  updateWorkshop={updateWorkshop}
                  deleteWorkshop={deleteWorkshop}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

function WorkshopCard({ workshop, updateWorkshop, deleteWorkshop }: any) {
  const { Id, Name, Image, CategoryName } = workshop;
  const [showModal, setShowModal] = useState(false);
  const [showModalProduct, setShowModalProduct] = useState(false);

  return (
    <div>
      <ModalWorkshopDelete
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        name={Name}
        workshopId={Id}
        deleteWorkshop={deleteWorkshop}
      />
      <ModalWorkshopUpdate
        isVisible={showModalProduct}
        onClose={() => setShowModalProduct(false)}
        name={Name}
        categoryName={CategoryName}
        image={Image}
        workshopId={Id}
        updateWorkshop={updateWorkshop}
      />

      <div className="card workshop-card shadow-sm">
        <div className="workshop-image-container">
          <Link href={`/workshops/${Id}`}>
            <img src={Image} className="workshop-image" alt={Name} />
          </Link>
        </div>
        <div className="card-body">
          <h5 className="card-title">{Name}</h5>
          <p className="card-text">{CategoryName}</p>
          <div className="d-flex justify-content-between align-items-center">
            <button
              onClick={() => setShowModalProduct(true)}
              className="btn btn-sm btn-outline-secondary"
            >
              Aanpassen
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-sm btn-outline-secondary"
            >
              Verwijder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
