import { log } from 'console';
import Link from 'next/link';
import tracer from 'tracer';
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import Nav from '@/components/Nav';

const logger = tracer.colorConsole();

async function getOrders() {
    const response = await fetch("http://127.0.0.1:3000/api/order",
    { cache: "no-store" });
    const data = await response.json();
    const orders = data?.data as any[];
    return orders;
}

async function getProduct(productId : string) {
    const response = await fetch(`https://skoolworkshop.up.railway.app/api/product/${productId}`);
    const data = await response.json();
    const product = data.data;
    return product;
}

async function getWorkshop(workshopId : string) {
    const response = await fetch(`https://skoolworkshop.up.railway.app/api/workshop/${workshopId}`);
    const data = await response.json();
    const workshop = data.data;
    return workshop;
}

export async function updateQuantity(productId: string, quantity: number) {
  await fetch(`http://127.0.0.1:3000/api/stock/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantity: -quantity
    }),
  });
}

export async function updateStatus(orderWorkshopId: string) {
  await fetch(`http://127.0.0.1:3000/api/order/${orderWorkshopId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}






export default async function OrdersPage() {
    const orders = await getOrders();

      for (const order of orders) {
        if(order.Status == "0"){
          for (const product of order.products) {
            const productId = product.ProductId;
            const quantity = product.Quantity;
            await updateStatus(order.OrderWorkshopId);
            await updateQuantity(productId, quantity);
        
          }
        }
      }
    

    return (

      <div className="album p-3 ">
              <Nav/>
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-3">
            {orders.map((order) => (
              <OrderCard order={order} key={order.OrderWorkshopId} />
            ))}
          </div>
        </div>
      </div>
    );
  }


  async function OrderCard({ order }: { order: any }) {

    const Products = order.products;
    const workshopId = order.WorkshopId;
    const workshop = await getWorkshop(workshopId);


    return (
      <div className="card shadow-sm p-2">
        <div className="card-body">
          <Link href={`/workshops/${workshopId}`}>
            <button type="button" className="btn btn-secondary w-100 mb-2">
              {workshop.Name}
            </button>
          </Link>
    
          <div className="d-flex flex-column flex-md-row">
            <div className="list-group w-100">
              {Products.map((product: any) => (
                <ProductItem key={product.ProductId} product={product} workshopId={workshopId} />
              ))}
            </div>
            
          </div>

        </div>
  
      </div>
    );
    
}

async function ProductItem({ product, workshopId }: { product: any, workshopId: any }) {
        const product2 = await getProduct(product.ProductId);
    
        return (
            <Link href={`/workshops/${workshopId}/${product2.Id}`}>
            <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                <div className="d-flex w-100 justify-content-between">
                    <div>
                         <h6 className="mb-0">{product2.Name}</h6>
                        <p className="mb-0 opacity-75">
                                {product2.Description}
                        </p>
                    </div>
                    <small className="text-nowrap text-danger">-{product.Quantity}</small>
                </div>
             </div>
            </Link>

            );
    }
  
  
  



  