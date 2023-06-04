import 'bootstrap/dist/css/bootstrap.min.css';

export default function Search() {
  return (
    <header className=" mb-4">
          <form className="w-full " role="search" >
            <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
          </form>
    </header>
  );
}
