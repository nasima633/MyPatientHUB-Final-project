import React, { useRef, useState } from "react";
import "./settings.css";

const Settings = ({ onLogout }) => {
  const [invisible, setInvisible] = useState(false);

  const profileRef = useRef(null);
  const basicInfoRef = useRef(null);
  const changePasswordRef = useRef(null);
  const twoFARef = useRef(null);
  const sessionsRef = useRef(null);
  const deleteAccountRef = useRef(null);

  const menuItems = [
    { id: "profile", icon: "🚀", label: "Profile", ref: profileRef },
    { id: "basic-info", icon: "▤", label: "Basic Info", ref: basicInfoRef },
    { id: "change-password", icon: "⬢", label: "Change Password", ref: changePasswordRef },
    { id: "2fa", icon: "▦", label: "2FA", ref: twoFARef },
    { id: "sessions", icon: "✂", label: "Sessions", ref: sessionsRef },
    { id: "delete-account", icon: "▭", label: "Delete Account", ref: deleteAccountRef },
  ];

  const sessions = [
    {
      device: "Bucharest 68.133.163.201",
      sub: "Your current session",
      region: "EU",
      active: true,
    },
    { device: "Chrome on macOS", sub: "", region: "US", active: false },
    { device: "Safari on iPhone", sub: "", region: "US", active: false },
  ];

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure? This will log you out and delete your account."
    );
    if (confirmed && onLogout) {
      onLogout();
    }
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-body">
        <aside className="settings-sidebar">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="settings-menu-item"
              onClick={() => scrollToSection(item.ref)}
            >
              <span className="settings-menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </aside>

        <main className="settings-content">
          <div
            className={`settings-profile-card ${
              invisible ? "invisible-mode" : ""
            }`}
            ref={profileRef}
          >
            <div className="settings-profile-left">
              <div className="settings-avatar">
                {invisible ? "👻" : "👩"}
              </div>
              <div>
                <p className="settings-username">
                  {invisible ? "●●●●● ●●●●●" : "Bahar Ahmadi"}
                </p>
                <p className="settings-role">
                  {invisible ? "Hidden" : "Patient"}
                  {invisible && (
                    <span className="invisible-badge">INVISIBLE</span>
                  )}
                </p>
              </div>
            </div>

            <div className="settings-profile-right">
              <span className="settings-invisible-label">
                Switch to invisible
              </span>
              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={invisible}
                  onChange={() => setInvisible(!invisible)}
                />
                <span className="settings-slider" />
              </label>
            </div>
          </div>

          <section className="settings-section" ref={basicInfoRef}>
            <h2 className="settings-section-title">Basic Info</h2>

            <div className="settings-grid-2">
              <div className="settings-field">
                <label>First Name</label>
                <input type="text" placeholder="Bahar" />
              </div>
              <div className="settings-field">
                <label>Last Name</label>
                <input type="text" placeholder="Ahmadi" />
              </div>

              <div className="settings-field">
                <label>I'm</label>
                <select defaultValue="Female">
                  <option>Female</option>
                  <option>Male</option>
                </select>
              </div>
              <div className="settings-field">
                <label>Birth Date</label>
                <div className="settings-date-row">
                  <select defaultValue="February">
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                  </select>
                  <select defaultValue="1">
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <select defaultValue="2021">
                    {Array.from({ length: 86 }, (_, i) => (
                      <option key={1945 + i}>{1945 + i}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="settings-field">
                <label>Email</label>
                <input type="email" placeholder="bahar@email.com" />
              </div>
              <div className="settings-field">
                <label>Blood Group</label>
                <input type="text" placeholder="A+" />
              </div>

              <div className="settings-field">
                <label>Your Location</label>
                <input type="text" placeholder="Kabul, AF" />
              </div>
              <div className="settings-field">
                <label>Phone Number</label>
                <input type="text" placeholder="+93 700 000 000" />
              </div>

              <div className="settings-field">
                <label>Height</label>
                <input type="text" placeholder="Height" />
              </div>
              <div className="settings-field">
                <label>Weight</label>
                <input type="text" placeholder="Weight" />
              </div>
            </div>
          </section>

          <section className="settings-section" ref={changePasswordRef}>
            <h2 className="settings-section-title">Change Password</h2>

            <div className="settings-full-field">
              <label>Current Password</label>
              <input type="password" placeholder="Current Password" />
            </div>
            <div className="settings-full-field">
              <label>New Password</label>
              <input type="password" placeholder="New Password" />
            </div>
            <div className="settings-full-field">
              <label>Confirm New Password</label>
              <input type="password" placeholder="Confirm Password" />
            </div>

            <div className="settings-password-req">
              <h3>Password requirements</h3>
              <p>Please follow this guide for a strong password</p>
              <ul>
                <li>One special characters</li>
                <li>Min 6 characters</li>
                <li>One number (2 are recommended)</li>
                <li>Change it often</li>
              </ul>
              <button className="settings-update-btn">UPDATE PASSWORD</button>
            </div>
          </section>

          <section className="settings-section" ref={twoFARef}>
            <div className="settings-section-header">
              <h2 className="settings-section-title">
                Two-factor authentication
              </h2>
              <span className="settings-enabled-badge">ENABLED</span>
            </div>

            <div className="settings-row">
              <span>Security keys</span>
              <div className="settings-row-right">
                <span className="settings-muted">No Security keys</span>
                <button className="settings-outline-btn">ADD</button>
              </div>
            </div>

            <div className="settings-row">
              <span>SMS number</span>
              <div className="settings-row-right">
                <span className="settings-muted">+3012374423</span>
                <button className="settings-outline-btn">EDIT</button>
              </div>
            </div>

            <div className="settings-row">
              <span>Authenticator app</span>
              <div className="settings-row-right">
                <span className="settings-muted">Not Configured</span>
                <button className="settings-outline-btn">SET UP</button>
              </div>
            </div>
          </section>

          <section className="settings-section" ref={sessionsRef}>
            <h2 className="settings-section-title">Sessions</h2>
            <p className="settings-desc">
              This is a list of devices that have logged into your account.
              Remove those that you do not recognize.
            </p>

            {sessions.map((s, i) => (
              <div key={i} className="settings-row settings-row-session">
                <div className="settings-session-left">
                  <span className="settings-device-icon">🖥</span>
                  <div>
                    <p className="settings-device-name">{s.device}</p>
                    {s.sub && <p className="settings-device-sub">{s.sub}</p>}
                  </div>
                </div>

                <div className="settings-session-right">
                  {s.active && (
                    <span className="settings-active-badge">ACTIVE</span>
                  )}
                  <span className="settings-region">{s.region}</span>
                  <span className="settings-see-more">See more →</span>
                </div>
              </div>
            ))}
          </section>

          <section className="settings-section" ref={deleteAccountRef}>
            <h2 className="settings-section-title">Delete Account</h2>
            <p className="settings-desc">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>

            <div className="settings-delete-row">
              <div className="settings-delete-left">
                <label className="settings-switch">
                  <input type="checkbox" />
                  <span className="settings-slider" />
                </label>
                <div>
                  <p className="settings-delete-title">Confirm</p>
                  <p className="settings-delete-sub">
                    I want to delete my account.
                  </p>
                </div>
              </div>

              <div className="settings-delete-btns">
                <button className="settings-outline-btn">DEACTIVATE</button>
                <button
                  className="settings-danger-btn"
                  onClick={handleDeleteAccount}
                >
                  DELETE ACCOUNT
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Settings;