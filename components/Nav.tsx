import "bootstrap/dist/css/bootstrap.min.css";

export default function Nav() {
  return (
    
    <header>
      <link rel="shortcut icon" href="/favicon.ico" />
      <div className="px-3  text-bg-dark border-bottom ">
        <div className="d-flex flex-row">
          <a href="/" className="d-flex my-2 my-lg-0 me-lg-auto text-white ">
            <img
              src="/Skool_Workshop_Logo_White.png"
              alt="Skool Workshop Logo"
              width="120"
              height="40"
              className="me-2"
            />
          </a>
        </div>

        <div className="d-flex flex-row align-items-end justify-content-between order-3">
          <ul className="nav col-12 align-items-end justify-content-end my-md-0 text-small justify-content-center">
            <li>
            <a href="/" className="nav-link text-white flex justify-center items-center">
                <svg className="bi d-block mx-auto mb-1" width="20" height="24">
                </svg>
                <div className="d-flex justify-content-center align-items-center">
                  <img src="/icons/home.png"
                    alt="Dashboard icon"
                    width="40"
                    height="40"
                    className="img-fluid"
                  />
                </div>
                Dashboard
              </a>
            </li>
            <li>
              <a href="/workshops" className="nav-link text-white">
                <svg className="bi d-block mx-auto mb-1" width="20" height="24">
                  <use xlinkHref="#table" />
                </svg>
                <div className="d-flex justify-content-center align-items-center">
                  <img src="/icons/voorraad.png"
                    alt="Dashboard icon"
                    width="40"
                    height="40"
                    className="img-fluid"
                  />
                </div>
                Workshops
              </a>
            </li>
            <li>
              <a href="/orders" className="nav-link text-white">
                <svg className="bi d-block mx-auto mb-1" width="20" height="24">
                  <use xlinkHref="#grid" />
                </svg>
                <div className="d-flex justify-content-center align-items-center">
                  <img src="/icons/boekingen.png"
                    alt="Dashboard icon"
                    width="40"
                    height="40"
                    className="img-fluid"
                  />
                </div>
                Bestellingen
              </a>
            </li>
            <li>
              <a href="/scanner" className="nav-link text-white">
                <svg className="bi d-block mx-auto mb-1" width="20" height="24">
                  <use xlinkHref="#people-circle" />
                </svg>
                <div className="d-flex justify-content-center align-items-center">
                  <img src="/icons/barcode-small.png"
                    alt="Dashboard icon"
                    width="40"
                    height="40"
                    className="img-fluid"
                  />
                </div>
                Scanner
              </a>
            </li>
            <li>
              <a href="/productToevoegen" className="nav-link text-white">
                <svg className="bi d-block mx-auto mb-1" width="20" height="24">
                  <use xlinkHref="#people-circle" />
                </svg>
                <div className="d-flex justify-content-center align-items-center">
                  <img src="/icons/new-product.png"
                    alt="Dashboard icon"
                    width="40"
                    height="40"
                    className="img-fluid"
                  />
                </div>
                Product Toevoegen
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}