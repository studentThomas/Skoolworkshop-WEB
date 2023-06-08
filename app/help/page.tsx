import BreadCrumbs from "@/components/BreadCrumbs";

const breadCrumbs = [
    { name: "Home", url: "/" },
    { name: "Help", url: "/help" },
];

export default function ProductToevoegenPage() {
    return (
        <div className="container">

        <h2 className="welcome-message">Help</h2>
        
        <div className="outer-container">
        <p>Pagina's en functies:</p>
            <div className="menu-container">

              <div className= "menu-item col-sm-auto my-3">
                <h4 className="title">Workshops</h4>
                <p className="text">Bij Workshops kan je per workshop bekijken welke producten er bischikbaar zijn en heir kan je ook gelijk de hoeveelheid aanpassen.</p>
              </div>

              <div className="menu-item col-sm-auto my-3">
                <h4 className="title">Bestellingen</h4>
                <p className="text">Bij bestellingen kun je terug kijken welke producten je al bij besteld hebt.</p>
              </div>

              <div className="menu-item col-sm-auto my-3">
                <h4 className="title">Scanner</h4>
                <p className="text">Met de scanner kan je direct vanaf elke pagina een product via een barcode openen om de voorraad te zien en aan te passen.  </p>
            </div>

              <div className="menu-item col-sm-auto my-3">
                <h4 className="title">Product Toevoegen</h4>
                <p className="text">Bij Product toevoegen kan je een product toevoegen door alle informatie in te vullen en op te slaan, ook kan je een barcode scannen hier om automatisch de bijbehorende barcode te kunnen gebruiken.</p>
              </div>
              
              <div className="menu-item col-sm-auto my-3">
                <h4 className="title">Notificaties</h4>
                <p className="text">Op de notificaties pagina kun je alle meldingen terug zien die je hebt gehad.</p>
              </div>

              <div className="menu-item col-sm-auto my-3">
                <h4 className="title">Instellingen</h4>
                <p className="text">Op de instellingspagina kan je onder anderen de standaard camera kiezen voor de scanner. In de toekomst komen hier nog instellingen bij.</p>
              </div>
            </div>
          </div>
  </div>
    );
}