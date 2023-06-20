import React, { useEffect, useRef, useState } from "react";
import "../css/Modal.css";
import "../css/Color.css";

export default function ModalUserUpdate({
  isVisible,
  onClose,
  email: initialEmail,
  password: initialPassword,
  firstName: initialFirstName,
  phoneNumber: initialPhoneNumber,
  role: initialRole,
  personId,
  updateUser,
}: any) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [firstName, setFirstName] = useState(initialFirstName);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [selectedRole, setSelectedRole] = useState(initialRole);
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

  const handleUpdateUser = async () => {
    try {
      await fetch(`https://skoolworkshop.up.railway.app/api/user/${personId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EmailAdress: email,
          Password: password,
          FirstName: firstName,
          PhoneNumber: phoneNumber,
          Role: selectedRole,
        }),
      });

      const updatedUser = {
        Id: personId,
        EmailAdress: email,
        Password: password,
        FirstName: firstName,
        PhoneNumber: phoneNumber,
        Role: selectedRole,
      };
      updateUser(updatedUser);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const isFormValid = email !== '' && password !== '' && firstName !== '' && phoneNumber !== '' && selectedRole !== '';

  return (
    <div className="modal modal-sheet d-flex align-items-center justify-content-center bg-opacity-20 backdrop-blur-sm">
      <div className="modal-dialog" ref={modalRef}>
        <div className="modal-content rounded-4 shadow" style={{ width: "400px" }}>
          <div className="modal-header border-bottom-0">
            <h1 className="modal-title fs-5">Gebruiker aanpassen</h1>
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
                <strong>E-mailadres:</strong>
              </p>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4 d-flex flex-column">
              <p>
                <strong>Wachtwoord:</strong>
              </p>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4 d-flex flex-column">
              <p>
                <strong>Naam:</strong>
              </p>
              <input
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4 d-flex flex-column">
              <p>
                <strong>Telefoonnummer:</strong>
              </p>
              <input
                type="text"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-4 d-flex flex-column">
              <p>
                <strong>Rol:</strong>
              </p>
              <select
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value)}
                required
                className="px-2 py-1 border rounded"
              >
                <option value="">Selecteer een rol</option>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="Gebruiker">Gebruiker</option>
              </select>
            </div>
          </div>
          <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
            <button
              type="button"
              className="btn btn-lg btn-color"
              onClick={handleUpdateUser}
              disabled={!isFormValid}
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
