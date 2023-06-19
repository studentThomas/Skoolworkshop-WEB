import React, { useEffect, useRef, useState } from "react";
import "../css/Color.css";

export default function ModalProductUpdate({
  isVisible,
  onClose,
  categoryId: initialCategoryId,
  name: initialName,
  description: initialDescription,
  code: initialCode,
  image: initialImage,
  reusable: initialReusable,
  minStock: initialMinStock,
  productId,
  updateProduct,
}: any) {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [code, setCode] = useState(initialCode);
  const [image, setImage] = useState(initialImage);
  const [reusable, setReusable] = useState(Boolean(initialReusable));
  const [minStock, setMinStock] = useState(initialMinStock);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://skoolworkshop.up.railway.app/api/categories");
        const data = await response.json();
        if (response.ok) {
          setCategories(data.data);
          setCategoryId(initialCategoryId);
        } else {
          throw new Error(data.message || "Something went wrong");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(
        `https://skoolworkshop.up.railway.app/api/product/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryId,
            name,
            description,
            code,
            image,
            reusable: Number(reusable),
            minStock,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const updatedProduct = {
        Id: productId,
        CategoryId: categoryId,
        Name: name,
        Description: description,
        Code: code,
        Image: image,
        Reusable: reusable,
        MinStock: minStock,
      };
      updateProduct(updatedProduct);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal modal-sheet d-flex align-items-center justify-content-center bg-opacity-20 backdrop-blur-sm">
      <div className="modal-dialog" ref={modalRef}>
        <div className="modal-content rounded-4 shadow" style={{ width: "400px" }}>
          <div className="modal-header border-bottom-0">
            <h1 className="modal-title fs-5">{name}</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body py-0">
            <div className="mb-4 d-flex flex-column">
              <p>
                <strong>Naam:</strong>
              </p>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4 d-flex flex-column">
              <p>
                <strong>Beschrijving:</strong>
              </p>
              <input
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4 d-flex flex-column">
              <p>
                <strong>Code:</strong>
              </p>
              <input
                type="number"
                value={code}
                onChange={(event) => setCode(Number(event.target.value))}
                required
                className="px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4 d-flex flex-column">
              <p>
                <strong>URL van afbeelding:</strong>
              </p>
              <input
                type="text"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              />
            </div>
            <div className="mt-4 d-flex flex-column">
              <p>
                <strong>Herbruikbaar:</strong>
              </p>
              <div className="d-flex">
                <p>Ja</p>
                <input
                  type="checkbox"
                  checked={reusable}
                  onChange={(event) => setReusable(event.target.checked)}
                  className="px-2 py-1 border rounded mb-4 ms-2"
                />
              </div>
            </div>
            <div className="mb-4 d-flex flex-column">
              <p>
                <strong>Minimale voorraad:</strong>
              </p>
              <input
                type="number"
                value={minStock}
                onChange={(event) => setMinStock(Number(event.target.value))}
                required
                className="px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4 d-flex flex-column">
              <p>
                <strong>Categorie:</strong>
              </p>
              <select
                value={categoryId}
                onChange={(event) => setCategoryId(Number(event.target.value))}
                required
                className="px-2 py-1 border rounded"
              >
                {categories.map((category: any) => (
                  <option key={category.Id} value={category.Id}>
                    {category.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
            <button
              type="button"
              className="btn btn-lg btn-color"
              onClick={handleUpdateProduct}
            >
              Opslaan
            </button>
            <button
              type="button"
              className="btn btn-lg btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Sluiten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
