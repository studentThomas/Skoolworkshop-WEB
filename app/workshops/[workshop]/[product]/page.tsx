'use client';

import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/navigation';
import BreadCrumbs from '@/components/BreadCrumbs';
import '../../../../css/workshop.css';
import '../../../../css/Colors.css';
import { updateQuantity } from '../../../../components/UpdateQuantity';
import Barcode from 'react-barcode';
import Nav from '@/components/Nav';

async function getProduct(productId: string) {
  const response = await fetch(
    `https://skoolworkshop.up.railway.app/api/product/${productId}`,
    { cache: 'no-store' }
  );

  const data = await response.json();
  const product = data.data;

  return product;
}

export default function updateProduct({
  params
}: any) {
  const [workshopName, setWorkshopName] =
    useState('');
  const [productName, setProductName] =
    useState('');

  useEffect(() => {
    async function fetchWorkshopDetails() {
      try {
        const response = await fetch(
          `https://skoolworkshop.up.railway.app/api/workshop/${params.workshop}`,
          { cache: 'no-store' }
        );
        const data = await response.json();
        const workshopName =
          data?.data?.Name || '';
        setWorkshopName(workshopName);
      } catch (error) {
        console.error(
          'Error fetching workshop details:',
          error
        );
      }
    }

    fetchWorkshopDetails();
  }, [params.workshop]);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const product = await getProduct(
          params.product
        );
        setProductName(product?.Name || '');
      } catch (error) {
        console.error(
          'Error fetching product details:',
          error
        );
      }
    }

    fetchProductDetails();
  }, [params.product]);

  const breadCrumbs = [
    { name: 'Workshops', url: '/workshops' },
    {
      name: workshopName,
      url: `/workshops/${params.workshop}`
    },
    {
      name: productName,
      url: `/workshops/${params.workshop}/${params.product}`
    }
  ];

  const [product, setProduct] = useState<any>({});
  const [tempQuantity, setTempQuantity] =
    useState<number>(0);
  const [notification, setNotification] =
    useState<string>('');

  useEffect(() => {
    async function fetchData() {
      const fetchedProduct = await getProduct(
        params.product
      );
      setProduct(fetchedProduct);
      setTempQuantity(0);
    }

    fetchData();
  }, [params.product]);

  const handleDecrease = () => {
    setTempQuantity(
      (prevQuantity) => prevQuantity - 1
    );
  };

  const handleIncrease = () => {
    setTempQuantity(
      (prevQuantity) => prevQuantity + 1
    );
  };

  const router = useRouter();

  const create = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const newQuantity =
      product.Quantity + tempQuantity;

    setProduct((prevProduct: any) => ({
      ...prevProduct,
      Quantity: newQuantity
    }));

    await updateQuantity(
      product.Id,
      tempQuantity
    );

    setTempQuantity(0);

    setNotification(
      () =>
        'De voorraad is succesvol bijgewerkt tot ' +
        newQuantity +
        ' stuks.'
    );

    router.refresh();
  };

  const barcodeRef = useRef<any>(null);

  const handlePrint = useReactToPrint({
    content: () => barcodeRef.current
  });

  return (
    <div>
      <Nav />
      <form onSubmit={create}>
        <div className="container text-center my-5">
          <BreadCrumbs
            breadCrumbs={breadCrumbs}
          />
          <h1 className="btn-color2">Product</h1>
          <div className="my-4 div-style">
            <h2>{product.Name}</h2>
            <Barcode
              value={product.Code}
              ref={barcodeRef}
            />
            <p>{product.Description}</p>
            <img
              src={product.Image}
              alt="Product Image"
              className="product-detailimage"
            />
            <p>
              Herbruikbaar:{' '}
              {product.Reusable ? 'Ja' : 'Nee'}
            </p>
            <p>Voorraad: {product.Quantity}</p>
            <div className="input-container">
              <button
                type="button"
                onClick={handleDecrease}
                className="button-quantity"
              >
                -
              </button>
              <span className='quantity-span'>{tempQuantity}</span>
              <button
                type="button"
                onClick={handleIncrease}
                className="button-quantity"
              >
                +
              </button>
            </div>
            <button
              type="submit"
              className="button-quantity"
            >
              Voorraad bijwerken
            </button>
            <button
              onClick={handlePrint}
              className="button-quantity"
            >
              Print Barcode
            </button>
            <p>{notification}</p>
          </div>
        </div>
      </form>
    </div>
  );
}
