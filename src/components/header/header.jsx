import "./header.css";


export default function Header({ pageTitle,onMenuClick,searchText, onSearchChange,onLogout}) {

    function handleNotifications() {

        alert(
            "This feature will be added in the future."
        );

    }

    function handleSettings() {

        alert(
            "Settings will be added in future!"
        );

    }

    function handleLogout() {

        const confirmLogOut = confirm(
            "ARE YOU SURE TO LOG OUT ?"
        );


        if (confirmLogOut) {
             onLogout();
        }
    }

    return (

        <header className="dashboard-header"id="dashboard-header" >

            <div className="header-left" id="header-left" >

                <div className="info-left-header"id="info-left-header" >

                    <span id="info-home"> ⌂ </span>

                    <span id="info-separator">/ </span>

                    <span id="info-current"> {pageTitle}  </span>
                 </div>

                    <h1 id="dashboard-title">{pageTitle} </h1>
            </div>

            <button
                id="menu-button"
                className="menu-button"
                type="button"
                aria-label="Toggle sidebar"
                onClick={onMenuClick}
            > ☰ </button>


            <div className="header-right"id="header-right" >
                <div  className="search-box"id="search-box" >
                    <span id="search-icon">🔎 </span>

                    <input
                        type="search"
                        id="search-input"
                        className="search-input"
                        placeholder="Type here..."
                        aria-label="Search navigation"
                        value={searchText}
                        onChange={(event) =>
                            onSearchChange(event.target.value)} />
                </div>

                <button
                    id="logout-button"
                    className="header-button"
                    type="button"
                    onClick={handleLogout}> 👤 Log out </button>

                <button
                    id="header-settings-button"
                    className="icon-button"
                    type="button"
                    aria-label="Settings"
                    onClick={handleSettings}
                >
                    ⚙
                </button>


                <button
                    id="notifications-button"
                    className="icon-button"
                    type="button"
                    aria-label="Notifications"
                    onClick={handleNotifications}
                >
                    🔔
                </button>

            </div>

        </header>
    );
}


