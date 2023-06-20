import React, { useEffect, useRef, useState } from 'react';
import '../css/Modal.css';
import '../css/Color.css';

export default function ModalUserAdd({
  isVisible,
  onClose,
  AddUser
}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const handleAddUser = async () => {
    try {
      const response = await fetch('https://skoolworkshop.up.railway.app/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emailAdress: email,
          password,
          firstName,
          phoneNumber,
          role: selectedRole
        })
      });

      if (response.ok) {
        const addedUser = {
          emailAdress: email,
          password,
          firstName,
          phoneNumber,
          role: selectedRole
        };
        AddUser(addedUser);
        onClose();
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isFormValid = email !== '' && password !== '' && firstName !== '' && phoneNumber !== '' && selectedRole !== '';

  return (
    <div className="modal modal-sheet d-flex align-items-center justify-content-center bg-opacity-20 backdrop-blur-sm">
      <div className="modal-dialog" ref={modalRef}>
        <div className="modal-content rounded-4 shadow" style={{ width: '400px' }}>
          <div className="modal-header border-bottom-0">
            <h1 className="modal-title fs-5">Gebruiker toevoegen</h1>
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
              onClick={handleAddUser}
              disabled={!isFormValid}
            >
              Toevoegen
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
