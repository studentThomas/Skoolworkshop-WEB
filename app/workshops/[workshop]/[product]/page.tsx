import BreadCrumbs from "../../../../components/BreadCrumbs";
import { useRouter } from "next/router";
import tracer from "tracer";

const logger = tracer.colorConsole();

async function getProduct(productId: string) {
  const response = await fetch(
    `https://skoolworkshop.up.railway.app/api/product/${productId}`,
    { cache: "no-store" }
  );

  const data = await response.json();
  const product = data.data;

  return product;
}
export default async function ProductPage({ params }: any) {
  const breadCrumbs = [
    { name: "Home", url: "/" },
    { name: "Workshops", url: "/workshops" },
    { name: "Workshop", url: `/workshops/${params.workshop}` },
    { name: "Product", url: `/workshops/${params.workshop}/${params.product}` },
  ];
  const product = await getProduct(params.product);
  logger.info("Workshop" + params.workshop);
  return (
    <div className="container text-center my-5">
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <h1 style={{ color: "blue" }}>Product</h1>
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
        className="my-4"
      >
        <h2>{product.Name}</h2>
        <p>{product.Description}</p>
        <p style={{ color: "gray" }}>Code: {product.Code}</p>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUuBcu-brx5Q2pbCDTBxf2KahL5AjhCnHKgTPX36ZXvkBTWsYBEflCD9xetjG31sSgQS0&usqp=CAU"
          alt="Product Image"
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "10%",
            marginTop: "20px",
          }}
        />
        <p>Reusable: {product.Reusable ? "Yes" : "No"}</p>
        <p>Quantity: {product.Quantity}</p>
      </div>
    </div>
  );
}
