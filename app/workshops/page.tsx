import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import BreadCrumbs from "../../components/BreadCrumbs";
import Search from "../../components/Search";
import Link from "next/link";
import tracer from "tracer";

const logger = tracer.colorConsole();

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

export default async function WorkshopsPage() {
  const workshops = await getWorkshops();

  return (
    <div>
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      <div className="album ">
        <div className="container">
          <Search />

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {workshops?.map((workshop) => {
              return (
                <div className="col" key={workshop.Id}>
                  <WorkshopCard workshop={workshop} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const imageStyle = {
  height: "250px",
  width: "100%",
}

function WorkshopCard({ workshop }: any) {
  const { Id, Name, Image } = workshop;

  return (
    <Link href={`/workshops/${Id}`}>
      <div className="card shadow-sm">
        <img
          src={Image} className="card-img-top" style={imageStyle}  
          alt="Workshop Image"
        />
        <div className="card-body">
          <h5 className="card-title">{Name}</h5>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
