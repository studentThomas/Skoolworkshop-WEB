"use client"

import React, { useEffect, useState,  } from 'react';
import { useRouter } from "next/navigation";
import { Html5QrcodeScanner } from 'html5-qrcode';

function Scanner() {
  const [scanResult, setScanResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(succes, error);

    function succes(result) {
      scanner.clear();
      router.push('/scanner/' + result);
      setScanResult(result);
    }

    function error(err) {
      console.log(err);
    }

  }, []);

  return (
    <div className="App">
      <h1>Scanner</h1>
      {scanResult ? (
        <div>
          Succes: <a href={'http://' + scanResult}>{scanResult}</a>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default Scanner;
