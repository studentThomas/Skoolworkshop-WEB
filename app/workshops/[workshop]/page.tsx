'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import BreadCrumbs from '../../../components/BreadCrumbs';
import Modal from "../../../components/Modal";
import '../../../css/workshop.css'
// import '../../../css/Forbidden.css'

async function getProducts(workshopId: string) {
  const response = await fetch(
    `https://skoolworkshop.up.railway.app/api/product?workshopId=${workshopId}`,
    { cache: "no-store" }
  );

  const data = await response.json();
  const products = (data?.data as any[]) || [];

  return products;
}

function Search({ onSearch }: { onSearch: (value: string) => void }) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
}



export default  function ProductsPage({ params }: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);



  const breadCrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Workshops', url: '/workshops' },
    { name: 'Workshop', url: `/workshops/${params.workshop}` },
  ];



  useEffect(() => {
    async function fetchData() {
      const data = await getProducts(params.workshop);
      setProducts(data);
      setFilteredProducts(data);
    }

    fetchData();
  }, [params.workshop]);

  const handleSearch = (value: string) => {
    const filtered = products.filter((product) =>
      product.Name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };



  return (
    <div>
        <Nav />
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      <div className="album">
        <div className="container">
          <Search onSearch={handleSearch} />

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {filteredProducts.map((product) => (
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
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} name={Name} productId={Id} />
      <div className={`card shadow-sm border-3 border-red-500 ${Quantity <= 0 ? 'border-danger' : ''}`}>
        <Link href={`/workshops/${workshopId}/${Id}`}>
          <img
            src={Image}
            className="card-img-top product-image"
            alt={Name}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{Name}</h5>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowModal(true)}
              >
                Delete
              </button>
            </div>
            <h5 className={`${Quantity <= 0 ? 'text-danger' : ''}`}>
              {Quantity}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
  
}