"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BreadCrumbs from "../../../components/BreadCrumbs";
import ModalProductDelete from "../../../components/ModalProductDelete";
import "../../../css/workshop.css";
import ModalProductUpdate from "@/components/ModalProductUpdate";
import Nav from "@/components/Nav";

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
  const [searchValue, setSearchValue] = useState("");

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


  localStorage.setItem('role', 'admin');
  const role = localStorage.getItem('role');

  const breadCrumbs = [
    { name: "Dashboard", url: "/" },
    { name: "Workshops", url: "/workshops" },
    { name: "Workshop", url: `/workshops/${params.workshop}` },
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

  const updateProduct = (updatedProduct: any) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.Id === updatedProduct.Id) {
          return { ...product, ...updatedProduct };
        }
        return product;
      });
      return updatedProducts;
    });
    setFilteredProducts((prevFilteredProducts) => {
      const updatedFilteredProducts = prevFilteredProducts.map((product) => {
        if (product.Id === updatedProduct.Id) {
          return { ...product, ...updatedProduct };
        }
        return product;
      });
      return updatedFilteredProducts;
    });
  };

  const deleteProduct = (deletedProduct: any) => {
    setProducts((prevProducts) => {
      const deletedProducts = prevProducts.filter(
        (product) => product.Id !== deletedProduct.Id
      );
      return deletedProducts;
    });
    setFilteredProducts((prevProducts) => {
      const deletedFilteredProducts = prevProducts.filter(
        (product) => product.Id !== deletedProduct.Id
      );
      return deletedFilteredProducts;
    });
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
                <Product
                  product={product}
                  params={params}
                  deleteProduct={deleteProduct}
                  updateProduct={updateProduct}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Product({ product, params, deleteProduct, updateProduct }: any) {
  const {
    Id,
    Name,
    CategoryId,
    Description,
    Code,
    Quantity,
    Image,
    Reusable,
    MinStock,
  } = product;
  const workshopId = params.workshop;
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  return (
    <div>
      <ModalProductDelete
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        name={Name}
        productId={Id}
        deleteProduct={deleteProduct}
      />
      <ModalProductUpdate
        isVisible={showModalUpdate}
        onClose={() => setShowModalUpdate(false)}
        name={Name}
        categoryId={product.CategoryId}
        description={Description}
        code={Code}
        image={Image}
        reusable={Reusable}
        minStock={MinStock}
        productId={Id}
        updateProduct={updateProduct}
      />
      <div className={`card shadow-sm border-3 border-red-500 ${Quantity <= 0 ? "border-danger" : ""}`}>
        <Link href={`/workshops/${workshopId}/${Id}`}>
          <img src={Image} className="card-img-top product-image" alt={Name} />
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-auto">{Name}</h5>
          <div className="d-flex justify-content-between align-items-start mt-2">
            <div className="d-flex gap-2">
              <button
                onClick={() => setShowModalUpdate(true)}
                className="btn btn-sm btn-outline-secondary"
              >
                Update
              </button>
            </div>
            <h5 className={`text-end ${Quantity <= 0 ? "text-danger" : ""}`}>{Quantity}</h5>
            <div className="d-flex justify-content-end">
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-sm btn-outline-secondary"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}