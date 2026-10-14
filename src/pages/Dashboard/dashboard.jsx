import "./dashboard.css";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  Legend,
  Tooltip,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// فیکس آیکون marker پیش‌فرض leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Dashboard() {
  // ===== داده‌های Donut Chart =====
  const clinicsData = [
    { name: "Klinik Lee Healthcare", value: 19, color: "#f28bb7" },
    { name: "Klinik Bandar Baru Nilai", value: 4, color: "#5b9bd5" },
    { name: "Klinik Mediviron Giant Nilai", value: 10, color: "#c46ab0" },
    { name: "KLINIK NILAI IMPIAN", value: 21, color: "#66b87a" },
    { name: "Klinik Mediviron", value: 2, color: "#8fd3e8" },
  ];

  const pharmaciesData = [
    { name: "ALPRO PHARMACY NILAI", value: 15, color: "#f28bb7" },
    { name: "ALPRO PHARMACY PEKAN NILAI", value: 12, color: "#5b9bd5" },
    { name: "OK PHARMACY", value: 5, color: "#c46ab0" },
    { name: "PHARMART PHARMACY NILAI", value: 9, color: "#66b87a" },
    { name: "Health Lane Family Pharmacy", value: 14, color: "#8fd3e8" },
  ];

  const smartMarketData = [
    { name: "Food Panda", value: 25, color: "#f28bb7" },
    { name: "Grab Food", value: 3, color: "#5b9bd5" },
    { name: "Zomato", value: 12, color: "#c46ab0" },
    { name: "Lazada", value: 7, color: "#66b87a" },
    { name: "Uber Eats", value: 10, color: "#8fd3e8" },
  ];

  // ===== داده‌های Health =====
  const healthData = [
    { month: "Jan", value: 57 },
    { month: "Feb", value: 60 },
    { month: "Mar", value: 58 },
    { month: "Apr", value: 63 },
    { month: "May", value: 61 },
    { month: "Jun", value: 67 },
    { month: "Jul", value: 64 },
    { month: "Aug", value: 68 },
    { month: "Sep", value: 70 },
  ];

  const symptomsData = [
    { month: "Jan", value: 55 },
    { month: "Feb", value: 58 },
    { month: "Mar", value: 62 },
    { month: "Apr", value: 59 },
    { month: "May", value: 65 },
    { month: "Jun", value: 63 },
    { month: "Jul", value: 68 },
    { month: "Aug", value: 66 },
    { month: "Sep", value: 72 },
  ];

  // ===== داده‌های Radar (Chronic Wellness) =====
  const wellnessData = [
    { year: "2017", Malaria: 60, Cold: 30, Typhoid: 45, Cough: 90 },
    { year: "2018", Malaria: 40, Cold: 70, Typhoid: 55, Cough: 60 },
    { year: "2019", Malaria: 50, Cold: 80, Typhoid: 35, Cough: 45 },
    { year: "2020", Malaria: 80, Cold: 50, Typhoid: 65, Cough: 30 },
    { year: "2021", Malaria: 70, Cold: 40, Typhoid: 80, Cough: 55 },
    { year: "2022", Malaria: 55, Cold: 65, Typhoid: 45, Cough: 75 },
  ];

  // ===== داده‌های Appointment (Stacked Bar) =====
  const appointmentData = [
    { month: "Jan", Emergency: 44, Examination: 13, Consultation: 11, Routine: 21 },
    { month: "Feb", Emergency: 55, Examination: 23, Consultation: 17, Routine: 7 },
    { month: "Mar", Emergency: 41, Examination: 20, Consultation: 15, Routine: 25 },
    { month: "Apr", Emergency: 67, Examination: 8, Consultation: 15, Routine: 13 },
    { month: "May", Emergency: 22, Examination: 13, Consultation: 21, Routine: 22 },
    { month: "Jun", Emergency: 43, Examination: 27, Consultation: 14, Routine: 8 },
  ];

  // ===== لیست دکترها =====
  const doctors = [
    { name: "Dr. Mustafa", role: "Emergency", date: "Tuesday, April 5" },
    { name: "DR. KHIRULLAH", role: "consultation", date: "Friday, November 2" },
    { name: "DR. Bilal", role: "Eximination", date: "Monday, March 9" },
  ];

  // ===== جدول دکترها =====
  const doctorsTable = [
    { name: "Dr Ahmad", speciality: "Neurologist", fee: "RM 100", discount: "10%", icon: "👨‍⚕️" },
    { name: "Dr Azam Shah", speciality: "Aurthopedic MD", fee: "RM 130", discount: "20%", icon: "👨‍⚕️" },
    { name: "Dr Hanif", speciality: "Primary Care MD", fee: "RM 200", discount: "20%", icon: "👩‍⚕️" },
    { name: "Dr Affan", speciality: "Cardiologist", fee: "RM 400", discount: "40%", icon: "👩‍⚕️" },
  ];

  // ===== Donut Chart =====
  const DonutChart = ({ data }) => (
    <div className="donut-chart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="62%"
            outerRadius="92%"
            paddingAngle={2}
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            {data.map((item, index) => (
              <Cell key={`cell-${index}`} fill={item.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  // ===== کارت Promotion =====
  const PromotionCard = ({ data, buttonText = "MORE DETAILS" }) => (
    <div className="chart-card-content">
      <div className="chart-side">
        <DonutChart data={data} />
        <button className="more-details">{buttonText}</button>
      </div>

      <div className="promotion-list">
        {data.map((item) => (
          <p key={item.name}>
            <span className="color-dot" style={{ backgroundColor: item.color }}></span>
            <span className="promotion-name">{item.name}</span>
            <strong>{item.value}%</strong>
          </p>
        ))}
      </div>
    </div>
  );

  // ===== کارت هدر با آیکون ! =====
  const CardHeader = ({ title, showAlert = false }) => (
    <div className="card-header">
      <h3>{title}</h3>
      {showAlert && <span className="alert-icon">!</span>}
    </div>
  );

  return (
    <>
      <section className="dashboard-section">
        <h2 id="dashboard-welcome-txt">Welcome to MyPatientHUB!</h2>

        {/* ===== ردیف ۱: Promotion Clinics + Pharmacies ===== */}
        <div className="dashboard-cards">
          <div className="cards">
            <CardHeader title="Promotion by Clinics" showAlert />
            <PromotionCard data={clinicsData} />
          </div>

          <div className="cards">
            <CardHeader title="Promotion by Pharmacies" showAlert />
            <PromotionCard data={pharmaciesData} />
          </div>
        </div>

        {/* ===== ردیف ۲: Smart Market + Health + Symptoms ===== */}
        <div className="dashboard-cards">
          <div className="cards">
            <CardHeader title="Smart Market Usage by app" showAlert />
            <PromotionCard data={smartMarketData} buttonText="SEE ALL REFERRALS" />
          </div>

          <div className="cards health-card">
            <CardHeader title="Health Index" showAlert />
            <div className="health-content">
              <div className="health-title">
                <span>Health Index</span>
                <div className="health-value">
                  <strong>70%</strong>
                  <small>+3%</small>
                </div>
              </div>
              <div className="health-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthData} margin={{ top: 10, right: 5, left: -30, bottom: 0 }}>
                    <XAxis dataKey="month" hide />
                    <YAxis domain={[50, 75]} hide />
                    <Line type="monotone" dataKey="value" stroke="#4169e1" strokeWidth={2} dot={false} activeDot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="health-title" style={{ marginTop: "10px" }}>
                <span>Symptoms</span>
                <div className="health-value">
                  <strong>70%</strong>
                  <small>+3%</small>
                </div>
              </div>
              <div className="health-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={symptomsData} margin={{ top: 10, right: 5, left: -30, bottom: 0 }}>
                    <XAxis dataKey="month" hide />
                    <YAxis domain={[50, 75]} hide />
                    <Line type="monotone" dataKey="value" stroke="#4169e1" strokeWidth={2} dot={false} activeDot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* ===== ردیف ۳: Chronic Wellness + Appointment ===== */}
        <div className="dashboard-cards">
          <div className="cards">
            <CardHeader title="Chronic Wellness Tracker" />
            <div className="radar-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={wellnessData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="year" />
                  <PolarRadiusAxis domain={[0, 120]} />
                  <Radar name="Malaria" dataKey="Malaria" stroke="#5b9bd5" fill="#5b9bd5" fillOpacity={0.4} />
                  <Radar name="Cold" dataKey="Cold" stroke="#66b87a" fill="#66b87a" fillOpacity={0.4} />
                  <Radar name="Typhoid" dataKey="Typhoid" stroke="#f0ad4e" fill="#f0ad4e" fillOpacity={0.4} />
                  <Radar name="Cough" dataKey="Cough" stroke="#e85d75" fill="#e85d75" fillOpacity={0.4} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="cards">
            <CardHeader title="Appointment" />
            <div className="bar-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentData}>
                  <XAxis dataKey="month" fontSize={11} />
                  <YAxis fontSize={11} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Emergency" stackId="a" fill="#4a90c2" />
                  <Bar dataKey="Examination" stackId="a" fill="#66b87a" />
                  <Bar dataKey="Consultation" stackId="a" fill="#f0ad4e" />
                  <Bar dataKey="Routine" stackId="a" fill="#e85d75" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ===== ردیف ۴: Map + Previous Appointments ===== */}
        <div className="dashboard-cards">
          <div className="cards">
            <MapContainer
              center={[34.5553, 69.2075]}
              zoom={11}
              style={{ width: "100%", height: "420px", borderRadius: "10px" }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[34.5553, 69.2075]}>
                <Popup>Kabul, Afghanistan</Popup>
              </Marker>
              <Marker position={[34.5300, 69.1700]}>
                <Popup>Clinic Location</Popup>
              </Marker>
              <Marker position={[34.5800, 69.2500]}>
                <Popup>Pharmacy Location</Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="cards">
            <CardHeader title="Previous Appointments" />
            <div className="appointments-list">
              {doctors.map((doc, i) => (
                <div key={i} className="appointment-item">
                  <div className="appointment-left">
                    <div className="doctor-avatar">👨‍⚕️</div>
                    <div>
                      <p className="doctor-name">{doc.name}</p>
                      <p className="doctor-role">{doc.role}</p>
                    </div>
                  </div>
                  <div className="appointment-right">
                    <span className="appointment-date">{doc.date}</span>
                    <span className="appointment-menu">⋮</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== ردیف ۵: Doctors Table (تمام عرض) ===== */}
        <div className="dashboard-cards">
          <div className="cards full-width-card">
            <CardHeader title="Doctors" />
            <div className="doctors-table">
              <div className="doctors-table-header">
                <span>Name:</span>
                <span>Speciality:</span>
                <span>Consultation_fee:</span>
                <span>Discount:</span>
              </div>
              {doctorsTable.map((doc, i) => (
                <div key={i} className="doctors-table-row">
                  <div className="doctor-cell">
                    <span className="doctor-icon">{doc.icon}</span>
                    <div>
                      <p className="doctor-label">Name:</p>
                      <p className="doctor-name-cell">{doc.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="doctor-label">Speciality:</p>
                    <p className="doctor-value">{doc.speciality}</p>
                  </div>
                  <div>
                    <p className="doctor-label">Consultation_fee:</p>
                    <p className="doctor-value">{doc.fee}</p>
                  </div>
                  <div>
                    <p className="doctor-label">Discount:</p>
                    <p className="doctor-value">{doc.discount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}