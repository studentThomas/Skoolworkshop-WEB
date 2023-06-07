import Link from "next/link";

import 'bootstrap/dist/css/bootstrap.min.css';
import BreadCrumbs from '../../../components/BreadCrumbs';
import Search from '../../../components/Search';
import tracer from 'tracer';

const logger = tracer.colorConsole();

async function getProducts(workshopId: string) {
  const response = await fetch(
    `https://skoolworkshop.up.railway.app/api/product?workshopId=${workshopId}`,
    { cache: "no-store" }
  );

  const data = await response.json();
  const products = (data?.data as any[]) || [];

  return products;
}

export default async function ProductsPage({ params }: any) {
  const products = await getProducts(params.workshop);
  const breadCrumbs = [
    { name: "Home", url: "/" },
    { name: "Workshops", url: "/workshops" },
    { name: "Workshop", url: `/workshops/${params.workshop}` },
  ];

  return (
    <div>
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      <div className="album">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {products.map((product) => (
              <div className="col" key={product.Id}>
                <Product product={product} params={params} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Product({ product, params }: any) {
  const { Id, Name, Quantity, Image } = product;
  const workshopId = params.workshop;

  const imageStyle: React.CSSProperties = {
    marginTop: "20px",
    objectFit: "contain",
    height: "200px",
    width: "100%",
  };

  return (
    <Link href={`/workshops/${workshopId}/${Id}`}>
      <div
        className={`card shadow-sm border-3 border-red-500 ${
          Quantity < 0 ? "border-danger" : ""
        }`}
      >
        <img
          src={Image}
          className="card-img-top"
          style={imageStyle}
          alt={Name}
        />
        <div className="card-body">
          <h5 className="card-title">{Name}</h5>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Delete
              </button>
            </div>
            <h5 className={` ${Quantity < 0 ? "text-danger" : ""}`}>
              {Quantity}
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
}