'use client';

import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import { useState, useEffect } from "react";
import BreadCrumbs from "../../../components/BreadCrumbs";
import Link from "next/link";
import '../../css/workshop.css'
import { defaultMaxListeners } from "events";
import Search from "@/components/Search";

async function getOrders() {
    const response = await fetch(
      "https://skoolworkshop.up.railway.app/api/order"
    );
  
    const data = await response.json();
    const orders = (data?.data as any[]) || [];

    return orders;
  }
  function Order({ orderData, params }: any) {
    const { OrderWorkshopId, ProductId, Quantity} = orderData;
    const orderId = params.order;
  
    return (
        <div
          className={`card shadow-sm border-3 border-red-500 ${
            Quantity < 0 ? 'border-danger' : ''
          }`}
        >
          <div className="card-body">
            <h5 className="card-title">Workshop bestelling Id: {OrderWorkshopId}</h5>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className={` ${Quantity < 0 ? 'text-danger' : ''}`}>
                Product ID: {ProductId}
                Hoeveelheid besteld: {Quantity}
              </h5>
            </div>
          </div>
        </div>
    );
  }
  
  export default function ProductsPage({ params }: any) {
    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const breadCrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Workshops', url: '/workshops' },
      { name: 'Workshop', url: `/workshops/${params.order}` },
    ];
  
    useEffect(() => {
      async function fetchData() {
        const data = await getOrders(params.order);
        setProducts(data);
        setFilteredProducts(data);
      }
  
      fetchData();
    }, [params.workshop]);
  
    const handleSearch = (value: string) => {
      const filtered = products.filter((order) =>
        order.Name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    };
  
    return (
      <div>
        <BreadCrumbs breadCrumbs={breadCrumbs} />
  
        <div className="album">
          <div className="container">
            <Search onSearch={handleSearch} />
  
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {filteredProducts.map((order) => (
                <div className="col" key={order.OrderWorkshopId}>
                  <Order order={order} params={params} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
