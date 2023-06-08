import BreadCrumbs from "@/components/BreadCrumbs";

const breadCrumbs = [
    { name: "Home", url: "/" },
    { name: "Porduct Toevoegen", url: "/productToevoegen" },
];

export default function ProductToevoegenPage() {
    return (
        <div>
            <div>
        <BreadCrumbs breadCrumbs={breadCrumbs} />
     
     
        <div className="album">
          <div className="container">

            <form>
            <div className="col-sm-auto my-3">
                <label htmlFor="formGroupExampleInput" style={{ margin: '10px' }}>Naam</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Product Naam"></input>
            </div>
            <div className="col-sm-auto my-3">
                <label htmlFor="formGroupExampleInput2" style={{ margin: '10px' }}>Omschrijving</label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Product Omschrijving"></input>
            </div>
            <div className="col-sm-auto my-3">
                <label htmlFor="BarcodeInput" style={{ margin: '10px' }}>Barcode </label>
                <button className="btn btn-warning" type="button" style={{ margin: '10px' }}>Open camera</button>
                <input type="text" className="form-control" id="BarcodeInput" placeholder="Barcode"></input>
            </div>
            
            <div className="col-sm-auto my-3">
                <label htmlFor="hoeveelheidInput" style={{ margin: '10px' }}>Hoeveelheid</label>
                <input type="number" className="form-control" id="hoeveelheidInput" placeholder="Aantal producten"></input>
            </div> 

            <div className="col-sm-auto my-3">
                <label htmlFor="workshopInput" style={{ margin: '10px' }}>Workshop:</label>

                
                <select className="custom-select custom-select-lg mb-3" id="workshopInput" style={{ margin: '10px' }}>
                    <option selected>Maak een keuze..</option>
                    <option value="1">Graffiti</option>
                    <option value="2">StopMotion</option>
                    <option value="3">LightGraffiti</option>
                </select>
            </div>
            
            </form>
        </div>
        </div>
        </div>
        </div>
    );
}