import { useState } from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import Footer from "../footer/footer";
import "./pagelayout.css";


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

        if (currentPage === "account") {
             return "My Account";
        }

        if (currentPage === "settings") {
            return "Settings";
        }

        if(currentPage=== "my-dependents"){
            return "My Dependents"
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