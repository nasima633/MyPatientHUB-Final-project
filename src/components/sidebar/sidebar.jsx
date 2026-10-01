import "./sidebar.css";

 export default function Sidebar({isOpen,searchText, currentPage,onNavClick, onNavigate}) {
    // we take tis part in Arrays becuase it stores many data .
    const navItems = [
        {
            id: "nav-dashboard",
            label: "Dashboard",
            icon: "▣",
            page: "dashboard"
        },
        {
            id: "nav-appointments",
            label: "Appointments",
            icon: "▤",
            page: "appointments"
        },
        {
            id: "nav-find-doctor",
            label: "Find Doctor",
            icon: "♙",
            page: "find-doctor"
        },
        {
            id: "nav-find-clinic",
            label: "Find Clinic",
            icon: "🏥",
            page: "find-clinic"
        },
        {
            id: "nav-chat",
            label: "Chat",
            icon: "▤",
            page: "chat"
        },
        {
            id: "nav-marketplace",
            label: "Find MarketPlace",
            icon: "▤",
            page: "marketplace"
        },
        {
            id: "nav-pharmacy",
            label: "Find Pharmacy",
            icon: "▣",
            page: "pharmacy"
        },
        {
            id: "nav-dependents",
            label: "My Dependents",
            icon: "▤",
            page: "dependents"
        },
        {
            id: "nav-account",
            label: "My Account",
            icon: "⚒",
            page: "account"
        },
        {
            id: "nav-settings",
            label: "Settings",
            icon: "⚙",
            page: "settings"
        }
    ];


    const filteredItems = navItems.filter(

        (item) => item.label.toLowerCase() .includes( searchText.toLowerCase()));


    function handleNavigation( event,page ) {
        event.preventDefault();

        if ( page === "dashboard" || page === "find-doctor" || page === "find-clinic") {onNavigate(page);}

         onNavClick();
    }


    function handleHelp() {

        alert("Help feature will be added in the future.");
    }


    return (
        <nav
            className={`sidebar-navigation ${
                isOpen ? "open" : "" }`}
            id="sidebar-navigation"
            aria-label="Main navigation"
        >

            <div id="sidebar-logo"className="sidebar-logo" >
                <div id="logo-mark" className="logo-mark">
                    M<span>HUB</span>
                </div>

                <span id="brand-name">MyPatientHUB</span>
            </div>

            {/* this part is taken from AI  */}
            {filteredItems.map((item) => (

                <a key={item.id}
                   href={`#${item.page}`}
                   id={item.id}
                    className={`nav-item ${
                        currentPage === item.page
                            ? "active"
                            : ""
                    }`}
                    data-page={item.page}
                    onClick={(event) =>
                        handleNavigation(
                            event,
                            item.page
                        )
                    }
                >

                   <span className="nav-icon"> {item.icon} </span>

                    <span className="nav-label">{item.label}</span>
                 </a>
            ))}

            <button
                id="help-button"
                className="help-button"
                type="button"
                aria-label="Help"
                onClick={handleHelp} >?
            </button>
        </nav>
);
}