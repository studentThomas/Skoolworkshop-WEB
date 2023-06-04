
import Link from "next/link";
import tracer from 'tracer';

const logger = tracer.colorConsole();


async function getWorkshops() {
    const response = await fetch('https://skoolworkshop.up.railway.app/api/workshop',
    {cache: "no-store"});

    const data = await response.json();
    const workshops = data?.data as any[];
    return workshops;

}

export default async function WorkshopsPage() {
    const workshops = await getWorkshops();

    return (
        <div>
            <h1>Workshops Page</h1>
            <div>
                {workshops?.map((workshop) => {
                    return <Workshop key={workshop.Id} workshop={workshop} />;
                })}
            </div>
        </div>
    );
}



function Workshop({ workshop }: any) {
    const { Id, Name } = workshop;

    return (
        <Link href={`/workshops/${Id}`}>
            <div>
                <h2>{Name}</h2>
            </div>
        </Link>
    );
}
