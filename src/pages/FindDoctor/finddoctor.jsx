import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import "./finddoctor.css";
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


const doctors = [
    {
        id: 1,
        name: "Dr. Ahmad Rahimi",
        specialty: "Cardiologist",
        location: "Kabul, Afghanistan",
        experience: "10 years experience",
        rating: 4.8,
        fee: "$20",
        latitude: 34.5553,
        longitude: 69.2075,
    },
    {
        id: 2,
        name: "Dr. Sara Ahmad",
        specialty: "Dermatologist",
        location: "Kabul, Afghanistan",
        experience: "8 years experience",
        rating: 4.7,
        fee: "$18",
        latitude: 34.5325,
        longitude: 69.1767,
    },
    {
        id: 3,
        name: "Dr. Mohammad Khan",
        specialty: "General Physician",
        location: "Kabul, Afghanistan",
        experience: "12 years experience",
        rating: 4.9,
        fee: "$15",
        latitude: 34.5689,
        longitude: 69.1823,
    },
    {
        id: 4,
        name: "Dr. Laila Hamidi",
        specialty: "Pediatrician",
        location: "Kabul, Afghanistan",
        experience: "7 years experience",
        rating: 4.6,
        fee: "$17",
        latitude: 34.5466,
        longitude: 69.1944,
    },
];


export default function FindDoctor() {

    const [search, setSearch] = useState("");
    const [specialty, setSpecialty] = useState("All Specialties");
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const specialties = [
        "All Specialties",
        "Cardiologist",
        "Dermatologist",
        "General Physician",
        "Pediatrician",
    ];
    const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
            doctor.name .toLowerCase() .includes(search.toLowerCase()) ||
            doctor.specialty .toLowerCase() .includes(search.toLowerCase()) ||
            doctor.location .toLowerCase() .includes(search.toLowerCase());
    const matchesSpecialty = specialty === "All Specialties" || doctor.specialty === specialty;

        return matchesSearch && matchesSpecialty;
    });


    function handleViewDoctor(doctor) {
        setSelectedDoctor(doctor);
    }


    function handleBookAppointment(doctor) {
        alert(
            `Appointment booking for ${doctor.name} will be added in the future.`
        );
    }


    return (

        <main className="find-doctor-page">

            <section className="doctor-page-heading">

                <div>
                    <h2>Find Doctor</h2>

                    <p>
                        Find the right doctor for your healthcare needs.
                    </p>
                </div>

            </section>


            <section className="doctor-search-panel">

                <div className="doctor-search-field">

                    <label htmlFor="doctor-search">
                        Search Doctor
                    </label>

                    <div className="doctor-input-wrapper">

                        <span className="doctor-search-icon">
                            🔎
                        </span>

                        <input
                            id="doctor-search"
                            type="search"
                            placeholder="Search by doctor, specialty or location..."
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />

                    </div>

                </div>


                <div className="doctor-filter-field">

                    <label htmlFor="specialty-filter">
                        Specialty
                    </label>

                    <select
                        id="specialty-filter"
                        value={specialty}
                        onChange={(event) =>
                            setSpecialty(event.target.value)
                        }
                    >

                        {specialties.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}

                    </select>

                </div>


                <button
                    type="button"
                    className="doctor-search-button"
                    onClick={() => {}}
                >
                    Search
                </button>

            </section>


            <section className="doctor-content">

                <div className="doctor-results">

                    <div className="results-header">

                        <div>
                            <h3>Available Doctors</h3>

                            <p>
                                {filteredDoctors.length} doctors found
                            </p>
                        </div>

                    </div>


                    {filteredDoctors.length === 0 ? (

                        <div className="no-doctors">
                            <span>🔎</span>

                            <h3>No doctors found</h3>

                            <p>
                                Try changing your search or specialty.
                            </p>
                        </div>

                    ) : (

                        filteredDoctors.map((doctor) => (

                            <article
                                className={`doctor-card ${
                                    selectedDoctor?.id === doctor.id
                                        ? "selected"
                                        : ""
                                }`}
                                key={doctor.id}
                            >

                                <div className="doctor-avatar">
                                    {doctor.name
                                        .replace("Dr. ", "")
                                        .charAt(0)}
                                </div>


                                <div className="doctor-information">

                                    <h3>{doctor.name}</h3>

                                    <p className="doctor-specialty">
                                        {doctor.specialty}
                                    </p>

                                    <p className="doctor-location">
                                        📍 {doctor.location}
                                    </p>

                                    <div className="doctor-meta">

                                        <span>
                                            ⭐ {doctor.rating}
                                        </span>

                                        <span>
                                            {doctor.experience}
                                        </span>

                                        <span>
                                            {doctor.fee}
                                        </span>

                                    </div>


                                    <div className="doctor-actions">

                                        <button
                                            type="button"
                                            className="view-doctor-button"
                                            onClick={() =>
                                                handleViewDoctor(doctor)
                                            }
                                        >
                                            View Profile
                                        </button>

                                        <button
                                            type="button"
                                            className="book-doctor-button"
                                            onClick={() =>
                                                handleBookAppointment(
                                                    doctor
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


                <div className="doctor-map-container">

                    <div className="map-heading">

                        <div>
                            <h3>Doctors Near You</h3>

                            <p>
                                Explore doctors on the map
                            </p>
                        </div>

                    </div>

{/* this part is taken from AI */}
                    <div className="doctor-map">

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


                            {filteredDoctors.map((doctor) => (

                                <Marker
                                    key={doctor.id}
                                    position={[
                                        doctor.latitude,
                                        doctor.longitude,
                                    ]}
                                >

                                    <Popup>

                                        <div className="map-popup">

                                            <strong>
                                                {doctor.name}
                                            </strong>

                                            <span>
                                                {doctor.specialty}
                                            </span>

                                            <small>
                                                ⭐ {doctor.rating}
                                            </small>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleViewDoctor(
                                                        doctor
                                                    )
                                                }
                                            >
                                                View Profile
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