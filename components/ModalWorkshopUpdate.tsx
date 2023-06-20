import React, { useEffect, useRef, useState } from "react";
import "../css/Color.css";

export default function ModalWorkshopUpdate({
  isVisible,
  onClose,
  name: initialName,
  categoryName: initialCategoryName,
  image: initialImage,
  workshopId,
  updateWorkshop,
}: any) {
  const [name, setName] = useState(initialName);
  const [categoryName, setCategoryName] = useState(initialCategoryName);
  const [image, setImage] = useState(initialImage);
  const modalRef = useRef<HTMLDivElement | null>(null);

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

  const handleUpdateWorkshop = async () => {
    try {
      const response = await fetch(
        `https://skoolworkshop.up.railway.app/api/workshop/${workshopId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, categoryName, image }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const updatedWorkshop = {
        Id: workshopId,
        Name: name,
        Image: image,
        CategoryName: categoryName,
      };
      updateWorkshop(updatedWorkshop);
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
                <strong>Categorie:</strong>
              </p>
              <input
                type="text"
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
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
          </div>
          <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
            <button
              type="button"
              className="btn btn-lg btn-color"
              onClick={handleUpdateWorkshop}
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
