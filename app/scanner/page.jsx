"use client"

import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function Scanner() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 500,
        height: 500,
      },
      fps: 5,
    });

    scanner.render(succes, error);

    function succes(result) {
      scanner.clear();
      setScanResult(result);
    }

    function error(err) {
      console.log(err);
    }

  }, []);

  return (
    <div>
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