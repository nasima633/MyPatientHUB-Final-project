import { useEffect, useState } from "react";
//this part is  is taken from AI
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./finddoctor.css";

// Fix Leaflet marker icons AI
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Kabul starting location AI
const KABUL_CENTER = [34.5553, 69.2075];

// Doctor data
const doctors = [
  {
    id: 1,
    name: "Dr. Ahmad Rahimi",
    specialty: "Cardiology",
    location: "Kabul",
    experience: "10 years",
    rating: 4.8,
    fee: "$20",
    service: "Primary Care and Internal",
    coordinates: [34.5553, 69.2075],
  },
  {
    id: 2,
    name: "Dr. Sara Ahmad",
    specialty: "Dermatology",
    location: "Kabul",
    experience: "8 years",
    rating: 4.7,
    fee: "$18",
    service: "Primary Care and Internal",
    coordinates: [34.5325, 69.1767],
  },
  {
    id: 3,
    name: "Dr. Mohammad Khan",
    specialty: "General Physician",
    location: "Kabul",
    experience: "12 years",
    rating: 4.9,
    fee: "$15",
    service: "Urgent Care",
    coordinates: [34.5689, 69.1823],
  },
  {
    id: 4,
    name: "Dr. Laila Hamidi",
    specialty: "Pediatrics",
    location: "Kabul",
    experience: "7 years",
    rating: 4.6,
    fee: "$17",
    service: "Primary Care and Internal",
    coordinates: [34.5466, 69.1944],
  },
  {
    id: 5,
    name: "Dr. Farid Waziri",
    specialty: "Neurology",
    location: "Kabul",
    experience: "9 years",
    rating: 4.8,
    fee: "$22",
    service: "Imaging Services",
    coordinates: [34.5612, 69.2115],
  },
  {
    id: 6,
    name: "Dr. Maryam Safi",
    specialty: "Emergency Medicine",
    location: "Kabul",
    experience: "6 years",
    rating: 4.7,
    fee: "$20",
    service: "Emergency Care",
    coordinates: [34.5418, 69.2032],
  },
];

// Specialty information
const specialtyDescriptions = {
  Anesthesiology: "Doctors specializing in anesthesia and pain management.",
  Dermatology:
    "Doctors who diagnose and treat skin, hair, and nail conditions.",
  "Emergency medicine":
    "Doctors who provide immediate care for urgent and emergency conditions.",
  Neurology: "Doctors specializing in the brain, nerves, and nervous system.",
  Consultation:
    "General medical consultation and professional health guidance.",
  Ophthalmology:
    "Doctors specializing in eye health and vision-related conditions.",
  Cardiology: "Doctors specializing in the heart and cardiovascular system.",
  Pediatrics:
    "Doctors specializing in the health and medical care of children.",
};

// Special services
const services = [
  {
    id: "primary",
    title: "Primary Care and Internal",
    icon: "🩺",
    className: "primary-service",
    filter: "Primary Care and Internal",
  },
  {
    id: "emergency",
    title: "Emergency Care",
    icon: "🚑",
    className: "emergency-service",
    filter: "Emergency Care",
  },
  {
    id: "imaging",
    title: "Imaging Services",
    icon: "🔬",
    className: "imaging-service",
    filter: "Imaging Services",
  },
  {
    id: "urgent",
    title: "Urgent Care",
    icon: "🏥",
    className: "urgent-service",
    filter: "Urgent Care",
  },
];

// Re-center Leaflet map when the selected center changes AI
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 12);
  }, [map, center]);
  return null;
}

function FindDoctor() {
  const [doctorName, setDoctorName] = useState("");
  const [location, setLocation] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [mapCenter, setMapCenter] = useState(KABUL_CENTER);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  // Filter doctors
  const filteredDoctors = doctors.filter((doctor) => {
    const nameSearch = doctorName.toLowerCase().trim();
    const locationSearch = location.toLowerCase().trim();
    const matchesName =
      !nameSearch ||
      doctor.name.toLowerCase().includes(nameSearch) ||
      doctor.specialty.toLowerCase().includes(nameSearch);

    const matchesLocation =
      !locationSearch || doctor.location.toLowerCase().includes(locationSearch);
    const matchesSpecialty =
      !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesService =
      !selectedService || doctor.service === selectedService;

    return matchesName && matchesLocation && matchesSpecialty && matchesService;
  });

  // Search button
  function handleSearch(event) {
    event.preventDefault();

    if (filteredDoctors.length > 0) {
      setSelectedDoctor(filteredDoctors[0]);
      setMapCenter(filteredDoctors[0].coordinates);
    }
  }

  // Current location
  function handleCurrentLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        setMapCenter(userLocation);
        setIsGettingLocation(false);
      },

      () => {
        alert(
          "Unable to get your current location. Please allow location access and try again.",
        );
        setIsGettingLocation(false);
      },
    );
  }
  // Select specialty
  function handleSpecialtyClick(specialty) {
    setSelectedSpecialty(selectedSpecialty === specialty ? "" : specialty);

    setSelectedService("");
    setSelectedDoctor(null);
  }

  // Select service
  function handleServiceClick(service) {
    setSelectedService(selectedService === service ? "" : service);

    setSelectedSpecialty("");
    setSelectedDoctor(null);
  }

  // View doctor profile
  function handleViewProfile(doctor) {
    setSelectedDoctor(doctor);
    setMapCenter(doctor.coordinates);
  }

  // Book appointment
  function handleBookAppointment(doctor) {
    alert(`Appointment request started for ${doctor.name}.`);
  }
  // Clear all filters
  function handleClearFilters() {
    setDoctorName("");
    setLocation("");
    setSelectedSpecialty("");
    setSelectedService("");
    setSelectedDoctor(null);
    setMapCenter(KABUL_CENTER);
  }

  return (
    <main className="find-doctor-main">
      <section className="doctor-hero">
        <div className="doctor-hero-content">
          <h2>Find a Doctor</h2>

          <p>Search Doctors and schedule an appointment </p>

          <form className="doctor-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search a doctor by name, speciality"
              value={doctorName}
              onChange={(event) => setDoctorName(event.target.value)}
            />

            <input
              type="text"
              placeholder="Zip Code or Neighborhood"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />

            <button
              type="button"
              className="current-location-button"
              onClick={handleCurrentLocation}
              disabled={isGettingLocation}
            >
              {isGettingLocation ? "Locating..." : "Current"}
            </button>

            <button type="submit" className="doctor-search-button">
              SEARCH
            </button>
          </form>
        </div>
      </section>

      {/* FIND DOCTORS */}
      <section className="doctor-results-section">
        <div className="results-header">
          <div>
            <h2>Available Doctors</h2>
            <p> Find doctors near you and view their location on the map.</p>
          </div>

          {(doctorName || location || selectedSpecialty || selectedService) && (
            <button
              type="button"
              className="clear-filters-button"
              onClick={handleClearFilters}
            >
              {" "}
              Clear Filters{" "}
            </button>
          )}
        </div>

        <div className="doctor-results-layout">
          {/* Doctor cards AI */}
          <div className="doctor-list">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <article
                  key={doctor.id}
                  className={`doctor-card ${selectedDoctor?.id === doctor.id ? "selected" : ""}`}
                  onClick={() => handleViewProfile(doctor)}
                >
                  <div className="doctor-avatar">
                    {doctor.name
                      .replace("Dr. ", "")
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="doctor-info">
                    <div className="doctor-card-top">
                      <div>
                        <h3> {doctor.name} </h3>
                        <span className="doctor-specialty">
                          {" "}
                          {doctor.specialty}
                        </span>
                      </div>

                      <span className="doctor-rating">★ {doctor.rating}</span>
                    </div>

                    <div className="doctor-details">
                      <span>📍 {doctor.location} </span>
                      <span>💼 {doctor.experience}</span>
                      <span> 💵 {doctor.fee}</span>
                    </div>

                    <div className="doctor-card-actions">
                      <button
                        type="button"
                        className="view-profile-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleViewProfile(doctor);
                        }}
                      >
                        View Profile
                      </button>

                      <button
                        type="button"
                        className="book-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleBookAppointment(doctor);
                        }}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="no-doctors">
                <div className="no-doctors-icon"></div>
                <h3> No doctors found</h3>
                <p>Try changing your search,specialty, or service.</p>

                <button type="button" onClick={handleClearFilters}>
                  Show All Doctors
                </button>
              </div>
            )}
          </div>
          {/* Real map  AI */}
          <div className="doctor-map-container">
            <MapContainer
              center={KABUL_CENTER}
              zoom={12}
              scrollWheelZoom={true}
              className="doctor-map"
            >
              <MapController center={mapCenter} />

              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {filteredDoctors.map((doctor) => (
                <Marker key={doctor.id} position={doctor.coordinates}>
                  <Popup>
                    <div className="doctor-popup">
                      <h3>{doctor.name} </h3>
                      <p>{doctor.specialty}</p>
                      <span>★ {doctor.rating}</span>
                      <br />
                      <span>{doctor.experience} </span>

                      <button
                        type="button"
                        onClick={() => handleBookAppointment(doctor)}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            <div className="map-label"> 📍 Doctor Locations</div>
          </div>
        </div>
      </section>

      {/*  SPECIAL SERVICES */}
      <section className="doctor-section">
        <h2>Special Services</h2>
        <div className="services-grid">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              className={`service-card ${service.className} ${selectedService === service.filter ? "active" : ""}`}
              onClick={() => handleServiceClick(service.filter)}
            >
              <div className="service-icon">{service.icon}</div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>Find doctors providing this service </p>
              </div>
              <span className="service-arrow">→</span>
            </button>
          ))}
        </div>
      </section>

      {/* SPECIALTIES */}
      <section className="specialty-section">
        <h2> Find Doctors By Specialty </h2>
        <p className="specialty-description">
          {" "}
          Search for doctors based on their medical specialty.
        </p>
        <div className="specialty-grid">
          {Object.entries(specialtyDescriptions).map(
            ([specialty, description]) => (
              <button
                key={specialty}
                type="button"
                className={`specialty-card ${selectedSpecialty === specialty ? "active" : ""}`}
                onClick={() => handleSpecialtyClick(specialty)}
              >
                <div>
                  <h3>{specialty}</h3>
                  <p> {description} </p>
                </div>
                <span className="specialty-arrow">→ </span>
              </button>
            ),
          )}
        </div>
      </section>
    </main>
  );
}
export default FindDoctor;
