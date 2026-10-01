
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./findclinic.css";

//this part is taken from AI
// Fix Leaflet marker icons in React/Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


const clinics = [
    {
        id: 1,
        name: "Kabul Medical Clinic",
        type: "General Clinic",
        location: "Kabul, Afghanistan",
        services: "General Medicine",
        rating: 4.7,
        hours: "8:00 AM - 8:00 PM",
        latitude: 34.5553,
        longitude: 69.2075,
    },
    {
        id: 2,
        name: "Shifa Specialized Clinic",
        type: "Specialized Clinic",
        location: "Kabul, Afghanistan",
        services: "Specialist Consultation",
        rating: 4.8,
        hours: "9:00 AM - 7:00 PM",
        latitude: 34.5325,
        longitude: 69.1767,
    },
    {
        id: 3,
        name: "Rahman Health Clinic",
        type: "Family Clinic",
        location: "Kabul, Afghanistan",
        services: "Family Healthcare",
        rating: 4.6,
        hours: "8:00 AM - 6:00 PM",
        latitude: 34.5689,
        longitude: 69.1823,
    },
    {
        id: 4,
        name: "Mina Women's Clinic",
        type: "Women's Clinic",
        location: "Kabul, Afghanistan",
        services: "Women's Healthcare",
        rating: 4.9,
        hours: "8:00 AM - 7:00 PM",
        latitude: 34.5466,
        longitude: 69.1944,
    },
];


export default function FindClinic() {

    const [search, setSearch] = useState("");
    const [clinicType, setClinicType] = useState("All Clinic Types");
    const [selectedClinic, setSelectedClinic] =useState(null);
    const clinicTypes = [
        "All Clinic Types",
        "General Clinic",
        "Specialized Clinic",
        "Family Clinic",
        "Women's Clinic",
    ];
    const filteredClinics = clinics.filter((clinic) => {
    const matchesSearch = 
            clinic.name.toLowerCase().includes(search.toLowerCase()) ||
            clinic.type.toLowerCase() .includes(search.toLowerCase()) ||
            clinic.location .toLowerCase() .includes(search.toLowerCase()) ||
            clinic.services .toLowerCase() .includes(search.toLowerCase());

    const matchesType = clinicType === "All Clinic Types" || clinic.type === clinicType;

        return matchesSearch && matchesType;
    });

    function handleViewClinic(clinic) {
        setSelectedClinic(clinic);
    }

    function handleBookAppointment(clinic) {
        alert(`Appointment booking for ${clinic.name} will be added in the future.`);
    }


    return (

        <main className="find-clinic-page">
            <section className="clinic-page-heading">
                <div>
                    <h2>Find Clinic</h2>
                    <p> Find healthcare clinics near you.</p>
                </div>
            </section>

            <section className="clinic-search-panel">
                <div className="clinic-search-field">
                    <label htmlFor="clinic-search">Search Clinic</label>

                    <div className="clinic-input-wrapper">
                        <span className="clinic-search-icon">
                            🔎
                        </span>
                        <input
                            id="clinic-search"
                            type="search"
                            placeholder="Search by clinic, service or location..."
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />
                    </div>
                </div>


                <div className="clinic-filter-field">

                    <label htmlFor="clinic-type-filter">
                        Clinic Type
                    </label>

                    <select
                        id="clinic-type-filter"
                        value={clinicType}
                        onChange={(event) =>
                            setClinicType(event.target.value)
                        }
                    >

                        {clinicTypes.map((type) => (
                            <option
                                key={type}
                                value={type}
                            >
                                {type}
                            </option>
                        ))}

                    </select>

                </div>


                <button
                    type="button"
                    className="clinic-search-button"
                    onClick={() => {}}
                >
                    Search
                </button>

            </section>


            <section className="clinic-content">

                <div className="clinic-results">

                    <div className="clinic-results-header">

                        <div>

                            <h3>Available Clinics</h3>

                            <p>
                                {filteredClinics.length} clinics found
                            </p>

                        </div>

                    </div>


                    {filteredClinics.length === 0 ? (

                        <div className="no-clinics">

                            <span>🔎</span>

                            <h3>No clinics found</h3>

                            <p>
                                Try changing your search or clinic type.
                            </p>

                        </div>

                    ) : (

                        filteredClinics.map((clinic) => (

                            <article
                                className={`clinic-card ${
                                    selectedClinic?.id === clinic.id
                                        ? "selected"
                                        : ""
                                }`}
                                key={clinic.id}
                            >

                                <div className="clinic-icon">
                                    🏥
                                </div>


                                <div className="clinic-information">

                                    <h3>{clinic.name}</h3>

                                    <p className="clinic-type">
                                        {clinic.type}
                                    </p>

                                    <p className="clinic-location">
                                        📍 {clinic.location}
                                    </p>

                                    <p className="clinic-services">
                                        {clinic.services}
                                    </p>


                                    <div className="clinic-meta">

                                        <span>
                                            ⭐ {clinic.rating}
                                        </span>

                                        <span>
                                            🕐 {clinic.hours}
                                        </span>

                                    </div>


                                    <div className="clinic-actions">

                                        <button
                                            type="button"
                                            className="view-clinic-button"
                                            onClick={() =>
                                                handleViewClinic(clinic)
                                            }
                                        >
                                            View Clinic
                                        </button>

                                        <button
                                            type="button"
                                            className="book-clinic-button"
                                            onClick={() =>
                                                handleBookAppointment(
                                                    clinic
                                                )
                                            }
                                        >
                                            Book Appointment
                                        </button>

                                    </div>

                                </div>

                            </article>

                        ))

                    )}

                </div>


                <div className="clinic-map-container">

                    <div className="clinic-map-heading">

                        <div>

                            <h3>Clinics Near You</h3>

                            <p>
                                Explore clinics on the map
                            </p>

                        </div>

                    </div>

{/* this part is taken from AI  */}
                    <div className="clinic-map">

                        <MapContainer
                            center={[34.5553, 69.2075]}
                            zoom={12}
                            scrollWheelZoom={true}
                            className="leaflet-map"
                        >

                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />


                            {filteredClinics.map((clinic) => (

                                <Marker
                                    key={clinic.id}
                                    position={[
                                        clinic.latitude,
                                        clinic.longitude,
                                    ]}
                                >

                                    <Popup>

                                        <div className="clinic-map-popup">

                                            <strong>
                                                {clinic.name}
                                            </strong>

                                            <span>
                                                {clinic.type}
                                            </span>

                                            <small>
                                                ⭐ {clinic.rating}
                                            </small>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleViewClinic(
                                                        clinic
                                                    )
                                                }
                                            >
                                                View Clinic
                                            </button>

                                        </div>

                                    </Popup>

                                </Marker>

                            ))}

                        </MapContainer>

                    </div>

                </div>

            </section>

        </main>
    );
}
