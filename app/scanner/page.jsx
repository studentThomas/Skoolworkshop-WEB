"use client"

import React, { useEffect, useState,  } from 'react';
import { useRouter } from "next/navigation";
import { Html5QrcodeScanner } from 'html5-qrcode';
import Nav from '@/components/Nav';


async function getProducts(barcode) {
  const response = await fetch(
    "https://skoolworkshop.up.railway.app/api/product",
    { cache: "no-store" }
  );

  let result = null;

  const data = await response.json();
  const products = data.data;
  for(const product of products) {
    if(product.Code == barcode) {
      result = product.Id;
    }
  }

  return result;
}

function Scanner() {
  const [scanResult, setScanResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 500,
        height: 500,
      },
      fps: 5,
    });

    scanner.render(succes, error);

    async function succes(result) {
      scanner.clear();

      const id = await getProducts(result);
      router.push('/scanner/' + id);
      setScanResult(id);
    }


    function error(err) {
      console.log(err);
    }

  }, []);

  return (
    <div className="App">
      <Nav />
      {scanResult ? (
        <div>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default Scanner;