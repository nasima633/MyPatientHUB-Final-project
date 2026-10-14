

import React from "react";
import "./myaccount.css";

const MyAccount = () => {
  const invoices = [
    { date: "March, 01, 2020", id: "#MS-415646", price: "$180" },
    { date: "February, 10, 2021", id: "#RV-126749", price: "$250" },
    { date: "April, 05, 2020", id: "#QW-103578", price: "$120" },
    { date: "June, 25, 2019", id: "#MS-415646", price: "$180" },
    { date: "March, 01, 2019", id: "#AR-803481", price: "$300" },
  ];

  const billings = [
    {
      name: "Oliver Liam",
      company: "Viking Burrito",
      email: "oliver@burrito.com",
      vat: "FRB1235476",
    },
    {
      name: "Lucas Harper",
      company: "Stone Tech Zone",
      email: "lucas@stone-tech.com",
      vat: "FRB1235476",
    },
    {
      name: "Ethan James",
      company: "Fiber Notion",
      email: "ethan@fiber.com",
      vat: "FRB1235476",
    },
  ];

  const transactions = [
    {
      group: "NEWEST",
      items: [
        {
          title: "Food",
          date: "27 March 2020, at 12:30 PM",
          amount: "- $ 2,500",
          color: "red",
          icon: "↓",
        },
      ],
    },
    {
      group: "YESTERDAY",
      items: [
        {
          title: "Appointment",
          date: "26 March 2020, at 13:45 PM",
          amount: "+ $ 750",
          color: "green",
          icon: "↑",
        },
        {
          title: "MarketPlace",
          date: "26 March 2020, at 12:30 PM",
          amount: "+ $ 1,000",
          color: "green",
          icon: "↑",
        },
        {
          title: "Pharmacy",
          date: "26 March 2020, at 08:30 AM",
          amount: "+ $ 2,500",
          color: "green",
          icon: "↑",
        },
        {
          title: "Bookings",
          date: "26 March 2020, at 05:00 AM",
          amount: "Pending",
          color: "gray",
          icon: "!",
        },
      ],
    },
  ];

  return (
    <div className="myaccount-wrapper">
      <div className="myaccount-header">
        <div>
          <p className="myaccount-breadcrumb">
            <span>🏠</span> / Myaccount
          </p>
          <h1 className="myaccount-title">My Account</h1>
        </div>

        <div className="myaccount-header-right">
          <div className="myaccount-search">
            <span className="myaccount-search-icon">🔍</span>
            <input type="text" placeholder="Type here..." />
          </div>
          <button className="myaccount-logout">👤 Log out</button>
          <span className="myaccount-iconbtn">⚙️</span>
          <span className="myaccount-iconbtn">🔔</span>
        </div>
      </div>

      <div className="myaccount-top-row">
        <div className="credit-card">
          <div className="credit-card-glow"></div>
          <div className="credit-card-wifi">📶</div>

          <div className="credit-card-number">
            <span>4562</span>
            <span>1122</span>
            <span>4594</span>
            <span>7852</span>
          </div>

          <div className="credit-card-bottom">
            <div className="credit-card-info">
              <div>
                <p className="cc-label">Card Holder</p>
                <p className="cc-value">Jack Peterson</p>
              </div>
              <div>
                <p className="cc-label">Expires</p>
                <p className="cc-value">11/22</p>
              </div>
            </div>

            <div className="cc-logo">
              <span className="cc-circle-red"></span>
              <span className="cc-circle-yellow"></span>
            </div>
          </div>
        </div>

        <div className="invoices-box">
          <div className="invoices-header">
            <h2>Invoices</h2>
            <button className="invoices-viewall">VIEW ALL</button>
          </div>

          <div className="invoices-list">
            {invoices.map((inv, i) => (
              <div key={i} className="invoices-item">
                <div>
                  <p className="inv-date">{inv.date}</p>
                  <p className="inv-id">{inv.id}</p>
                </div>
                <div className="inv-right">
                  <span className="inv-price">{inv.price}</span>
                  <span className="inv-pdf">📄 PDF</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="myaccount-stats-row">
        <div className="stat-box">
          <div className="stat-top">
            <div className="stat-icon">🏦</div>
            <div>
              <p className="stat-title">Account Balance</p>
              <p className="stat-subtitle">Payments</p>
            </div>
          </div>
          <p className="stat-value">+$2000</p>
        </div>

        <div className="stat-box">
          <div className="stat-top">
            <div className="stat-icon">💳</div>
            <div>
              <p className="stat-title">Wallet Bank Card</p>
              <p className="stat-subtitle">Payments</p>
            </div>
          </div>
          <p className="stat-value">$455.00</p>
        </div>
      </div>

      <div className="myaccount-bottom-row">
        <div className="myaccount-bottom-left">
          <div className="payment-box">
            <div className="payment-header">
              <h2>Payment Method</h2>
              <button className="payment-addbtn">+ ADD NEW CARD</button>
            </div>

            <div className="payment-grid">
              <div className="payment-card-item">
                <div className="payment-left">
                  <div className="mc-logo">
                    <span className="mc-red"></span>
                    <span className="mc-yellow"></span>
                  </div>
                  <span className="payment-number">
                    **** **** **** 7852
                  </span>
                </div>
                <button className="payment-edit">✏️</button>
              </div>

              <div className="payment-card-item">
                <div className="payment-left">
                  <span className="visa-logo">VISA</span>
                  <span className="payment-number">
                    **** **** **** 5248
                  </span>
                </div>
                <button className="payment-edit">✏️</button>
              </div>
            </div>
          </div>

          <div className="billing-box">
            <h2 className="billing-title">Billing Information</h2>

            <div className="billing-list">
              {billings.map((b, i) => (
                <div key={i} className="billing-item">
                  <div className="billing-item-header">
                    <h3 className="billing-name">{b.name}</h3>
                    <div className="billing-actions">
                      <button className="billing-delete">
                        🗑️ DELETE
                      </button>
                      <button className="billing-edit">✏️ EDIT</button>
                    </div>
                  </div>

                  <div className="billing-info-grid">
                    <p>
                      Company Name: <span>{b.company}</span>
                    </p>
                    <p>
                      Email Address: <span>{b.email}</span>
                    </p>
                    <p>
                      VAT Number: <span>{b.vat}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="transactions-box">
          <div className="transactions-header">
            <h2>Your Transaction's</h2>
            <span className="transactions-date">
              📅 23 - 30 March 2020
            </span>
          </div>

          <div className="transactions-groups">
            {transactions.map((group, gi) => (
              <div key={gi}>
                <p className="tx-group-label">{group.group}</p>
                <div className="tx-items">
                  {group.items.map((item, i) => (
                    <div key={i} className="tx-item">
                      <div className="tx-left">
                        <div className={`tx-icon ${item.color}`}>
                          {item.icon}
                        </div>
                        <div>
                          <p className="tx-title">{item.title}</p>
                          <p className="tx-date">{item.date}</p>
                        </div>
                      </div>
                      <span className={`tx-amount ${item.color}`}>
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
