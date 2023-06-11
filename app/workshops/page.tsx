'use client';


import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import { useState, useEffect } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import Link from "next/link";
import '../../css/workshop.css'
import Modal from "../../components/Modal";

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

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState<any[]>([]);


  useEffect(() => {
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


  return (
    <div>
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <div className="album">
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
                <WorkshopCard workshop={workshop} />
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
    
  );
}
function WorkshopCard({ workshop }: { workshop: any }) {
  const { Id, Name, Image } = workshop;
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} name={Name} />
      <div className="card shadow-sm">
        <Link href={`/workshops/${Id}`}>
          <img
            src={Image}
            className="card-img-top workshop-image"
            alt={Name}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{Name}</h5>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowModal(true)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

