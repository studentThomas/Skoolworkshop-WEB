import { log } from 'console';
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


export default async function ProductPage({params}: any) {
    const product = await getProduct(params.slug);
    logger.info(product);
    logger.info(params.slug);
    
    return (
        <div>
            <h1>Product</h1>
            <div>
                <h2>{product.Name}</h2>
             
            </div>
        </div>
    );
}


