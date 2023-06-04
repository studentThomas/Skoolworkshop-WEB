import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import tracer from 'tracer';

const logger = tracer.colorConsole();


async function getWorkshops() {
    const response = await fetch('https://skoolworkshop.up.railway.app/api/workshop');

    const data = await response.json();
    const workshops = data?.data as any[];
    return workshops;

}

export default async function WorkshopsPage() {
    const workshops = await getWorkshops();

    return (
        <div>
            <h1>Workshops Page</h1>
            <div>
                {workshops?.map((workshop) => {
                    return <Workshop key={workshop.Id} workshop={workshop} />;
                })}
            </div>
        </div>
    );
}



function Workshop({ workshop }: any) {
    const { Id, Name } = workshop;

    // return (
    //     <Link href={`/workshops/${Id}`}>
    //         <div>
    //             <h2>{Name}</h2>
    //         </div>
    //     </Link>
    // );
    return (
        <Link href={`/workshops/${Id}`}>
          <div className="col">
            <div className="card shadow-sm">
              <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
              </svg>
              <div className="card-body">
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                  </div>
                  <small className="text-body-secondary">9 mins</small>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
}
