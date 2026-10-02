import { useState } from "react";
import Header from "../header/header";
import Sidebar from "../../Components/sidebar-temp/sidebar";
import Footer from "../footer/footer";
import "./pageLayout.css";


export default function PageLayout({children, currentPage, onNavigate, onLogout}) {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    function handleMenuClick() {
        setSidebarOpen(!sidebarOpen);
    }

    function handleSearchChange(value) {
        setSearchText(value);
    }

    function handleNavClick() {
        if (window.innerWidth <= 900) {
            setSidebarOpen(false);
        }
    }

    function getPageTitle() {
        if (currentPage === "find-doctor") {
            return "Find Doctor";
        }

        if (currentPage === "find-clinic") {
            return "Find Clinic";
        }

        if (currentPage === "find-marketplace") {
            return "Find MarketPlace";
        }

        return "Dashboard";
    }

    return (
        <div className="page-layout">

            <Header
                pageTitle={getPageTitle()}
                onMenuClick={handleMenuClick}
                searchText={searchText}
                onSearchChange={handleSearchChange}
                onLogout={onLogout}
            />

            <Sidebar
                isOpen={sidebarOpen}
                searchText={searchText}
                currentPage={currentPage}
                onNavClick={handleNavClick}
                onNavigate={onNavigate}
            />

            <main className="page-content"> {children} </main>
            <Footer />
        </div>
    );
}