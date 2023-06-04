import BreadCrumbs from '../../../../components/BreadCrumbs';
import tracer from 'tracer';

const logger = tracer.colorConsole();

async function getProduct(productId: string) {
    const response = await fetch(`https://skoolworkshop.up.railway.app/api/product/${productId}`,
    {next: {revalidate: 10}}
    );

    const data = await response.json();
    const product = data.data
    
    return product;

}
const breadCrumbs = [
    { name: "Home", url: "/" },
    { name: "Workshops", url: "/workshops" },
    { name: "Products", url: "/workshops/[id]" },
 
];


export default async function ProductPage({params}: any) {
    const product = await getProduct(params.slug);
    
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


