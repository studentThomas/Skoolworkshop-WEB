"use client";

import Nav from "@/components/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import Link from "next/link";


async function getUsers() {
    const response = await fetch(
      "https://skoolworkshop.up.railway.app/api/user"
    );
    const data = await response.json();
    const users = data?.data as any[];
    return users;
  }


export default async function PersonPage() {
    const users = await getUsers();

    return (
        <div>
            <Nav />
            <h2 className="text-center p-2">Personen</h2>
            <div className="container">
                {users.map((user) => (
                    <User user={user} key={user.Id} />
                ))}
            </div>
        </div>
    );
}

async function User({ user }: { user: any }) {


    const handleDeleteClick = () => {
        // Handle delete click logic here
      };
    
      const handleEditClick = () => {
        // Handle edit click logic here
      };

    return (
        <div className="list-group p-1">
            <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                <div className="d-flex gap-2 w-100 justify-content-between align-items-center">
                    <div className="d-flex flex-column">
                        <div className="d-flex align-items-center">
                            <h6 className="mb-0 me-2">{user.FirstName}</h6>
                            <small className="text-nowrap text-warning">{user.Role}</small>
                        </div>
                        <p className="mb-0 opacity-75">{user.EmailAdress}</p>
                    </div>
                    <div>
                        <Link href={`workshops`} className="p-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-trash text-danger"
                                viewBox="0 0 16 16"
                                onClick={handleDeleteClick}
                            >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                <path
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
                                />
                            </svg>
                            </Link>
                        <Link href={`workshops`} className="p-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-pencil text-warning"
                                viewBox="0 0 16 16"
                                onClick={handleEditClick}
                            >
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                                />
                            </svg>
                            </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}





