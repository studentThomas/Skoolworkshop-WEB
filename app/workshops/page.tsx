"use client";

import React, { useState, useEffect } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import Nav from "@/components/Nav";
import Link from "next/link";
import ModalWorkshopDelete from "../../components/ModalWorkshopDelete";
import ModalWorkshopUpdate from "../../components/ModalWorkshopUpdate";
import "../../css/workshop.css";
import "../../css/Color.css"
import { useRouter } from "next/navigation";

async function getWorkshops() {
  const response = await fetch(
    "https://skoolworkshop.up.railway.app/api/workshop"
  );
  const data = await response.json();
  const workshops = data?.data as any[];
  return workshops;
}


export default  function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState<any[]>([]);
  const [role, setRole] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem('role'); // Get the role from localStorage

    if(storedRole === 'Gebruiker') {
      router.push('/scanner');
    }
  
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

  // if(role !== 'admin') {
  //   router.push('/forbidden');
  // }
  
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
      <div style={{ marginTop:15}}/>
    <div className="">
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
          <div className="">
          <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-pencil btn-color2"
                viewBox="0 0 16 16"
                onClick={() =>
                  setShowModalProduct(true)
                }
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
          <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-trash text-danger mx-2"
                  viewBox="0 0 16 16"
                  onClick={() =>
                    setShowModal(true)
                  }
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg>
      
          </div>
        </div>
      </div>
    </div>
  );
}
