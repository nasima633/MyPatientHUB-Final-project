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
} from "recharts";

export default function Dashboard() {

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
     <Cell
     key={`cell-${index}`}
     fill={item.color}
     />
     ))}
     </Pie>
     </PieChart>
     </ResponsiveContainer>
     </div>
    );

 const PromotionCard = ({ data }) => (
     <div className="chart-card-content">

     <div className="chart-side">
     <DonutChart data={data} />

     <button className="more-details">
     MORE DETAILS
     </button>
     </div>

     <div className="promotion-list">
         {data.map((item) => (
          <p key={item.name}>

      <span
         className="color-dot"
          style={{ backgroundColor: item.color }}>
          </span>

                       
     <span className="promotion-name">
          {item.name}
     </span>

     <strong>{item.value}%</strong>
     </p>
     ))}
     </div>

     </div>
    );

 return (
 <>
     <section className="dashboard-section">
                
         <h2 id="dashboard-welcome-txt">
         Welcome to MyPatientHUB!
         </h2>

     <div className="dashboard-cards">

     <div className="cards">
     <h3>Promotion by Clinics</h3>

     <PromotionCard data={clinicsData} />
     </div>

     <div className="cards">
     <h3>Promotion by Pharmacies</h3>

     <PromotionCard data={pharmaciesData} />
     </div>

     <div className="cards">
     <h3>Smart Market Usage by app</h3>

     <PromotionCard data={smartMarketData} />
     </div>

     <div className="cards health-card">
     <h3>Health Index</h3>

     <div className="health-content">

     <div className="health-title">
     <span>Health Index</span>

     <div className="health-value">
     <strong>70%</strong>
     <small>+3%</small>
     </div>
     </div>

     <div className="health-chart">
          <ResponsiveContainer
     width="100%"
     height="100%">

     <LineChart
         data={healthData}
             margin={{
             top: 10,
             right: 5,
             left: -30,
             bottom: 0,
             }} >

     <XAxis
         dataKey="month"
          hide />

     <YAxis
         domain={[50, 75]}
          hide />

         <Line
             type="monotone"
             dataKey="value"
              stroke="#4169e1"
             strokeWidth={2}
             dot={false}
             activeDot={false} />

 </LineChart>
 </ResponsiveContainer>
 </div>

 </div>
 </div>

 </div>
 </section>
 </>
 );
 }