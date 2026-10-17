# 🏥 MyPatientHUB — Healthcare Web Application

A multi-page healthcare web application developed with **React** as part of the HBC Web Development Program. The application brings together healthcare-related interfaces, including doctor and clinic discovery, dependent management, user authentication interfaces, pharmacy services, and a healthcare marketplace.

The project demonstrates practical frontend development, reusable React components, responsive interface design, and collaborative software development using Git and GitHub.

---

## 🌐 Project Links

* **GitHub Repository:** [MyPatientHUB Final Project](https://github.com/nasima633/MyPatientHUB-Final-project)
* **Live Demo:** *Add your deployed website URL here.*

---

## 📌 Project Overview

MyPatientHUB is a frontend web application inspired by the existing MyPatientHUB healthcare platform.

The application provides a unified interface for accessing different healthcare-related services. Its pages are organized into reusable React components to maintain a consistent layout and improve code maintainability.

The project was developed collaboratively by **Nasima Alizada and Asma** as part of the HBC Web Development Program.

### Project Objectives

* Develop a multi-page application using React.
* Build reusable components and shared layouts.
* Create user-friendly healthcare-related interfaces.
* Implement login and sign-up forms.
* Practice responsive web design.
* Manage source code using Git and GitHub.
* Collaborate on development and integrate components created by different team members.

---

## ✨ Features and Application Pages

### 1. Login

Provides a login interface for users accessing the application.

**Features:**

* Welcome message and introductory text.
* Login form interface.
* Structured and user-friendly layout.

### 2. Sign Up

Provides a registration interface for new users.

**Features:**

* User registration form.
* Input fields for collecting user information.
* Form interface designed to support the registration process.

*Note: Backend authentication, account creation, and database integration depend on the actual implementation.*

### 3. Dashboard

Provides a central interface for accessing the application's healthcare services.

**Features:**

* Dashboard interface.
* Organized application layout.
* Navigation to different application sections.

### 4. Find Doctor

Provides an interface for discovering doctors.

**Features:**

* Doctor discovery interface.
* Organized presentation of doctor-related information.
* Map-related functionality for location-based discovery.

### 5. Find Clinic

Provides an interface for discovering clinics.

**Features:**

* Clinic discovery interface.
* Organized presentation of clinic-related information.
* Map-related functionality for location-based discovery.

### 6. My Dependents

Provides a multi-step interface for entering and managing dependent information.

**Features:**

* Dependent Registration.
* Contact & Guardian.
* Health Information.
* Care Plan & Insurance.
* Structured multi-step form interface.

### 7. Find Marketplace

Provides the marketplace interface for healthcare-related products and services.

**Features:**

* Marketplace page layout.
* Organized presentation of marketplace content.

### 8. Find Pharmacy

Provides the pharmacy section of the application.

**Features:**

* Pharmacy page interface.
* Organized layout for pharmacy-related content.

### 9. My Account

Provides an interface for accessing user account information and related account features.

### 10. Settings

Provides an interface for application settings and user preferences.

### 11. Shared Application Components

The application uses reusable components to maintain a consistent structure across pages.

**Components include:**

* **Header:** Main header area.
* **Sidebar:** Navigation menu for accessing application sections.
* **PageLayout:** Shared layout structure for application pages.
* **Footer:** Footer section.
* **App.jsx:** Main application component responsible for integrating pages and managing application-level navigation.

*Note: The descriptions above reflect the intended purpose of each interface. Actual functionality depends on the implementation in the source code.*

---

## 🛠️ Technologies Used

| Technology        | Purpose                                    |
| ----------------- | ------------------------------------------ |
| HTML5             | Web page structure                         |
| CSS3              | Styling and responsive layouts             |
| JavaScript (ES6+) | Application logic and interactivity        |
| React             | Component-based user interface development |
| Vite              | Development server and build tooling       |
| React Leaflet     | React integration for interactive maps     |
| Leaflet           | Map functionality                          |
| Recharts          | Data visualization where implemented       |
| Git               | Version control                            |
| GitHub            | Source code hosting and collaboration      |
| npm               | Dependency management                      |

---

## 📁 Project Structure

The project follows a component-based React architecture, separating shared components from individual application pages.

```text
MyPatientHUB-Final-Project/
├── public/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── Footer/
│   │   └── pageLayout/
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── FindDoctor/
│   │   ├── FindClinic/
│   │   ├── FindMarketPlace/
│   │   ├── FindPharmacy/
│   │   ├── MyDependence/
│   │   ├── MyAccount/
│   │   ├── Settings/
│   │   ├── login/
│   │   └── signup/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

*Note: This directory structure is illustrative. Update the folder names to match the actual repository.*

---

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### Prerequisites

Install the following tools:

* [Node.js](https://nodejs.org/)
* npm, included with Node.js
* [Git](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/nasima633/MyPatientHUB-Final-project.git
```

### Step 2: Navigate to the Project Directory

```bash
cd MyPatientHUB-Final-project
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

### Step 5: Open the Application

Open the local address displayed in the terminal. With the default Vite configuration, it is usually:

```text
http://localhost:5173
```

---

## 👩‍💻 Development Team and Contributions

The project was developed collaboratively by **Nasima Alizada and Asma** as part of the HBC Web Development Program.

Development responsibilities were divided between application pages, reusable components, and the main application structure.

### 1. Nasima Alizada

**Role:** Frontend Developer

#### Pages Developed

| Page          | Description                                             |
| ------------- | ------------------------------------------------------- |
| Login         | Developed the login form and its user interface.        |
| Sign Up       | Developed the registration form and its user interface. |
| Find Doctor   | Developed the interface for discovering doctors.        |
| Find Clinic   | Developed the interface for discovering clinics.        |
| My Dependents | Developed the multi-step dependent information form.    |

#### Components and Application Structure

| Component or File | Contribution                                                               |
| ----------------- | -------------------------------------------------------------------------- |
| Header            | Developed the main header component.                                       |
| PageLayout        | Developed the shared page layout component.                                |
| App.jsx           | Developed the main application component and integrated application pages. |

#### Key Responsibilities

* Developing login and sign-up form interfaces.
* Building doctor and clinic discovery pages.
* Developing the My Dependents multi-step form.
* Creating reusable application layout components.
* Integrating pages into the main React application.
* Organizing application-level rendering and navigation.
* Working with React, JavaScript, and CSS.

**GitHub Profile:** [@nasima633](https://github.com/nasima633)

### 2. Asma

**Role:** Frontend Developer

#### Pages Developed

| Page             | Description                                   |
| ---------------- | --------------------------------------------- |
| Dashboard        | Developed the main dashboard interface.       |
| Find Marketplace | Developed the marketplace interface.          |
| Find Pharmacy    | Developed the pharmacy interface.             |
| My Account       | Developed the user account interface.         |
| Settings         | Developed the application settings interface. |

#### Components Developed

| Component | Contribution                                                      |
| --------- | ----------------------------------------------------------------- |
| Sidebar   | Developed the navigation sidebar for accessing application pages. |
| Footer    | Developed the footer component.                                   |

#### Key Responsibilities

* Developing the dashboard interface.
* Building the marketplace and pharmacy pages.
* Developing account and settings interfaces.
* Creating the sidebar navigation component.
* Creating the footer component.
* Collaborating on component integration within the React application.

---

## 🤝 Team Collaboration and Version Control

Git and GitHub were used to manage source code and coordinate development between team members.

The collaboration process included:

* Dividing development tasks between team members.
* Developing pages and components in separate branches.
* Fetching changes from remote branches.
* Integrating independently developed components.
* Merging changes into the shared project.
* Identifying and resolving merge conflicts.
* Maintaining the project in a shared GitHub repository.

This workflow provided practical experience with version control, collaborative coding, component integration, and team-based software development.

---

## 🤖 Use of AI Tools

AI-assisted tools were used as supplementary resources during development.

Potential areas of AI assistance included:

* Understanding React concepts and component architecture.
* Troubleshooting coding errors.
* Understanding CSS styling and layout issues.
* Learning Git commands and resolving merge conflicts.
* Reviewing implementation approaches.
* Improving code structure and readability.

AI tools served as development and learning aids. Their suggestions were reviewed and adapted to the project's requirements.

**Transparency note:** The exact tools used and the specific code sections developed with AI assistance should be documented according to the team's actual development process.

---

## 🎯 Learning Outcomes

Through this project, the development team gained practical experience in the following areas.

### Frontend Development

* Building multi-page applications with React.
* Creating reusable components.
* Developing login and sign-up form interfaces.
* Building structured, multi-step forms.
* Styling interfaces with CSS.
* Organizing application pages and navigation.

### React Development

* Organizing pages into reusable components.
* Importing and integrating components.
* Sharing layout components across pages.
* Managing application-level rendering and navigation.

### Git and GitHub

* Creating and working with Git branches.
* Fetching remote changes.
* Merging contributions from team members.
* Resolving merge conflicts.
* Maintaining a shared project repository.

### Collaboration and Problem-Solving

* Dividing development responsibilities.
* Integrating independently developed code.
* Debugging frontend issues.
* Using technical documentation and AI-assisted resources to support learning.

---

## 📌 Project Status

* **Project Type:** Educational frontend development project
* **Framework:** React
* **Development Tool:** Vite
* **Program:** HBC Web Development Program
* **Year:** 2026

The project demonstrates a multi-page healthcare interface built with React and the integration of reusable components through collaborative development.

---

## ⚠️ Disclaimer

MyPatientHUB is an educational project created for learning and demonstration purposes. It is inspired by an existing healthcare platform and is not intended to replace professional medical advice or serve as a production-ready healthcare management system.

The availability of authentication, backend services, persistent data storage, and other advanced functionality depends on the actual implementation.

---

## 🙏 Acknowledgements

* **HBC Web Development Program** — for providing the opportunity to develop practical web development skills.
* **Project Collaborators** — for their contributions to development and integration.
* **Technical Documentation and Learning Resources** — for supporting learning, implementation, and troubleshooting.

---

**Developed by Nasima Alizada and Asma**
**HBC Web Development Program | 2026**
