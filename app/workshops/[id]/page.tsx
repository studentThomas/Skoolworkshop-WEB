
import Link from "next/link";
import BreadCrumbs from '../../../components/BreadCrumbs';
import tracer from 'tracer';

const logger = tracer.colorConsole();


async function getProducts(workshopId: string) {
    const response = await fetch(`https://skoolworkshop.up.railway.app/api/product?workshopId=${workshopId}`,
    {cache: "no-store"});

    const data = await response.json();
    const products = data?.data as any[];
    
    return products;

}

const breadCrumbs = [
    { name: "Home", url: "/" },
    { name: "Workshops", url: "/workshops" },
    { name: "Products", url: "/workshops/[id]" },
];


export default async function ProductsPage({params}: any)  {
    const products = await getProducts(params.id);

    return (
        <div>
        <BreadCrumbs breadCrumbs={breadCrumbs}/>
    

          <div className="album ">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {products?.map((product) => {
                  return (
                    <div className="col" key={product.Id}>
                      <Product product={product} params={params} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
      
}



function Product({ product, params }: any) {
    const { Id, Name, Quantity } = product;

    return (
        <Link href={`/workshops/${params.id}/${Id}`}>
            <div className={`card shadow-sm border-3 border-red-500 ${Quantity < 0 ? 'border-danger' : ''}`}>
            <svg
                className="bd-placeholder-img card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
            >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                Thumbnail
                </text>
            </svg>
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
                <h5 className={` ${Quantity < 0 ? 'text-danger' : ''}`}>
                    {Quantity}
                </h5>
                </div>
            </div>
            </div>
        </Link>
      );
      
      
}
