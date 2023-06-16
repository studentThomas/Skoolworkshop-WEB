import { useEffect, useState } from "react";
import "../css/Modal.css";

export default function ModalProductUpdate({
  isVisible,
  onClose,
  name: initialName,
  categoryId: initialCategoryId,
  description: initialDescription,
  code: initialCode,
  image: initialImage,
  Reusable: initialReusable,
  minStock: initialMinStock,
  productId,
  updateProduct,
}: any) {
  const [name, setName] = useState(initialName);
  const [categoryId, setCategoryId] = useState(initialCategoryId || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [code, setCode] = useState(initialCode || "");
  const [image, setImage] = useState(initialImage || "");
  const [reusable, setReusable] = useState(initialReusable || "");
  const [minStock, setMinStock] = useState(initialMinStock || "");
  const [categories, setCategories] = useState<any[]>([]); // Explicit type annotation for categories

  useEffect(() => {
    fetch("https://skoolworkshop.up.railway.app/api/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.data)) {
          setCategories(data.data);
          console.log(data.data); // Log the retrieved categories array
        } else {
          console.error("Categories data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  if (!isVisible) return null;

  const reusableValue = reusable === "Yes" ? 1 : 0;

  const handleUpdateProduct = async () => {
    try {
      await fetch(
        `https://skoolworkshop.up.railway.app/api/product/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            categoryId,
            description,
            code,
            image,
            reusable: reusableValue,
            minStock,
          }),
        }
      );

      const updatedProduct = {
        Id: productId,
        Name: name,
        CategoryId: categoryId,
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
      <div className="modal-dialog">
        <div
          className="modal-content rounded-4 shadow"
          style={{ width: "400px" }}
        >
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
                <strong>Bescrhijving:</strong>
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
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4 d-flex flex-column">
              <p>
                <strong>URL plaatje:</strong>
              </p>
              <input
                type="text"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4 d-flex flex-column">
              <p>
                <strong>Categorie:</strong>
              </p>
              {categories.length > 0 && (
                <select
                  value={categoryId}
                  onChange={(event) => setCategoryId(event.target.value)}
                  required
                  className="px-2 py-1 border rounded"
                >
                  <option value="">Selecteer een categorie</option>
                  {categories.map((category) => (
                    <option key={category.Id} value={category.Id}>
                      {category.Name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="d-flex flex-column">
              <p>
                <strong>Minimale voorraad:</strong>
              </p>
              <input
                type="number"
                value={minStock}
                onChange={(event) => setMinStock(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              />
            <div className="mt-4 d-flex flex-column">
              <p>
                <strong>Herbruikbaar:</strong>
              </p>
              <div className="d-flex">
                <p>Ja</p>
                <input
                  type="checkbox"
                  checked={reusableValue === 1}
                  onChange={(event) =>
                    setReusable(event.target.checked ? "Yes" : "No")
                  }
                  className="px-2 py-1 border rounded mb-4 ms-2"
                />
                </div>
            </div>
            </div>
          </div>
          <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
            <button
              type="button"
              className="btn btn-lg btn-warning"
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
