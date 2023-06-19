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
    { name: "Home", url: "/" },
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
  <div className="d-flex justify-content-between align-items-starts">
    <div className="d-flex gap-1 mt-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-pencil text-warning"
        viewBox="0 0 16 16"
        onClick={() => setShowModalUpdate(true)}
      >
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-trash text-danger mx-1"
        viewBox="0 0 16 16"
        onClick={() => setShowModal(true)}
      >
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
      </svg>
    </div>
    <h4 className={`text-end ${Quantity <= 0 ? "text-danger" : ""}`}>{Quantity}</h4>
  </div>
</div>
      </div>
    </div>
  );
}