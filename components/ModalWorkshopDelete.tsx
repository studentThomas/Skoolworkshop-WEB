
export default function ModalWorkshopDelete({
  isVisible,
  onClose,
  name,
  workshopId,
  deleteWorkshop,
}: any) {
  if (!isVisible) return null;

  const handleDeleteworkshop = async () => {
    try {
      const response = await fetch(
        `https://skoolworkshop.up.railway.app/api/workshop/${workshopId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const deletedWorkshop = { Id: workshopId };
      deleteWorkshop(deletedWorkshop);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal modal-sheet d-flex align-items-center justify-content-center bg-opacity-20 backdrop-blur-sm">
      <div className="modal-dialog">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header border-bottom-0">
            <h1 className="modal-title fs-5">{name}</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body py-0">
            <p>
              Weet je zeker dat je dit item wilt verwijderen? Het is niet meer
              terug te halen.
            </p>
          </div>
          <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
            <button
              type="button"
              className="btn btn-lg btn-danger"
              onClick={handleDeleteworkshop}
            >
              Verwijderen
            </button>
            <button
              type="button"
              className="btn btn-lg btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Sluiten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
