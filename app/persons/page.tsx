"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {

    const router = useRouter();

    useEffect(() => {
        const storedRole = localStorage.getItem('role'); // Get the role from localStorag
    
        if(storedRole != 'admin') {
          router.push('/forbidden');
        }
      }, []);


    return (
        <div>
            <h1>Personen</h1>
        </div>
    );
}


