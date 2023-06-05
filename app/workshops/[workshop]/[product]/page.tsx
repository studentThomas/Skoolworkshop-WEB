
import BreadCrumbs from '../../../../components/BreadCrumbs';
import 'bootstrap/dist/css/bootstrap.min.css';
import tracer from 'tracer';

const logger = tracer.colorConsole();

async function getProduct(productId: string) {
    const response = await fetch(`https://skoolworkshop.up.railway.app/api/product/${productId}`,
    {cache: "no-store"}
    );

    const data = await response.json();
    const product = data.data
    
    return product;

}



export default async function ProductPage({params}: any) {
    const breadCrumbs = [
        { name: "Home", url: "/" },
        { name: "Workshops", url: "/workshops" },
        { name: "Workshop", url: `/workshops/${params.workshop}` },
        { name: "Product", url: `/workshops/${params.workshop}/${params.product}` },
     
    ];
    const product = await getProduct(params.product);
    return (
        <div>
            <BreadCrumbs breadCrumbs={breadCrumbs}/>
            <h1>Product</h1>
            <div>
                <h2>{product.Name}</h2>
             
            </div>
        </div>
    );
}

