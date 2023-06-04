
import Link from "next/link";
import tracer from 'tracer';

const logger = tracer.colorConsole();


async function getProducts(workshopId: string) {
    const response = await fetch(`https://skoolworkshop.up.railway.app/api/product?workshopId=${workshopId}`,
    {cache: "no-store"});

    const data = await response.json();
    const products = data?.data as any[];
    
    return products;

}

export default async function ProductsPage({params}: any)  {
    const products = await getProducts(params.id);

    return (
        <div>
            <h1>Products Page</h1>
            <div>
                {products?.map((product) => {
                    return <Product key={product.Id} product={product} />;
                })}
            </div>
        </div>
    );
}



function Product({ product }: any) {
    const { Id, Name } = product;

    return (
        <div>
            <h2>{Name}</h2>
        </div>
           
    );
}
