import { useState } from "react";
import Login from "./pages/login/login";
import PageLayout from "./Components/pageLayout/pagelayout";
import Dashboard from "./pages/Dashboard/dashboard";
import FindDoctor from "./pages/FindDoctor/finddoctor";
import FindClinic from "./pages/FindClinic/findclinic";
import FindMarketplace from "./pages/FindMarketPlace/findmarketplace";
import MyDependents from "./pages/MyDependence/mydependents";
import FindPharmacy from "./pages/FindPharmacy/findpharmacy";
import MyAccount from "./pages/MyAccount/myaccount";
import Settings from "./pages/Settings/settings";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState("dashboard");


    function handleLoginSuccess() {
        setLoggedIn(true);
        setCurrentPage("dashboard");
    }


    function handleLogout() {
        setLoggedIn(false);
        setCurrentPage("dashboard");
    }


    function handleNavigate(page) {
        console.log("NAVIGATION:",page);
        setCurrentPage(page);
    }


    function renderCurrentPage() {

        if (currentPage === "find-doctor") {
            return <FindDoctor />;
        }

        if (currentPage === "find-clinic") {
            return <FindClinic />;
        }

        if (currentPage === "find-marketplace") {
            return <FindMarketplace />;
        }

        if(currentPage=== "my-dependents"){
            console.log("page is active")
            return <MyDependents/>
        }

        if (currentPage === "account") {
            return <MyAccount />;
        }

        if (currentPage === "settings") {
            return <Settings />;
        }

        if (currentPage === "find-pharmacy") {
            return <FindPharmacy />;
        }

        return <Dashboard />;
    }


    if (!loggedIn) {
        return (
            <Login onLoginSuccess={handleLoginSuccess} />
        );
    }


    return (
        <PageLayout
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
        >
            {renderCurrentPage()}
        </PageLayout>
    );
}
export default App;