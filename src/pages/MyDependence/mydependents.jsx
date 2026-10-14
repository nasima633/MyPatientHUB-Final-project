
import React, { useRef, useState } from "react";
import "./mydependents.css";

const MyDependents = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    month: "",
    day: "",
    year: "",
    gender: "",
    relationship: "",
    profilePhoto: null,

    phone: "",
    email: "",
    address: "",
    province: "",
    guardianName: "",
    guardianRelationship: "",
    guardianPhone: "",
    emergencyName: "",
    emergencyPhone: "",

    bloodType: "",
    allergies: "",
    medicalConditions: "",
    medications: "",
    surgeries: "",
    specialNeeds: "",
    vaccinationStatus: "",
    medicalNotes: "",

    primaryDoctor: "",
    preferredClinic: "",
    healthcareNeeds: "",
    specialCare: "",
    insuranceProvider: "",
    insuranceId: "",
    policyNumber: "",
    expiryDate: "",
    additionalNotes: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const validationLock = useRef(false);

  const requiredMessages = {
    firstName: "First name is required.",
    lastName: "Last name is required.",
    month: "Birth month is required.",
    day: "Birth day is required.",
    year: "Birth year is required.",
    gender: "Gender is required.",
    relationship: "Relationship is required.",
    phone: "Phone number is required.",
    address: "Address is required.",
    province: "City / Province is required.",
    guardianName: "Guardian name is required.",
    guardianRelationship: "Guardian relationship is required.",
    guardianPhone: "Guardian phone is required.",
    emergencyName: "Emergency contact name is required.",
    emergencyPhone: "Emergency contact phone is required.",
    bloodType: "Blood type is required.",
    vaccinationStatus: "Vaccination status is required.",
    allergies: "Please enter allergies or write None.",
    medicalConditions: "Please enter medical conditions or write None.",
    medications: "Please enter medications or write None.",
    surgeries: "Please enter previous surgeries or write None.",
    specialNeeds: "Please enter special needs or write None.",
    medicalNotes: "Please enter medical notes or write None.",
    primaryDoctor: "Primary doctor is required.",
    preferredClinic: "Preferred clinic is required.",
    healthcareNeeds: "Healthcare needs are required.",
    specialCare: "Special care information is required.",
    insuranceProvider: "Insurance provider is required.",
    insuranceId: "Insurance ID is required.",
    policyNumber: "Policy number is required.",
    expiryDate: "Expiry date is required.",
    additionalNotes: "Please enter additional notes or write None.",
  };

  const fieldsByStep = {
    1: ["firstName", "lastName", "month", "day", "year", "gender", "relationship", "profilePhoto"],
    2: [
      "phone", "email", "address", "province", "guardianName",
      "guardianRelationship", "guardianPhone", "emergencyName", "emergencyPhone",
    ],
    3: [
      "bloodType", "vaccinationStatus", "allergies", "medicalConditions",
      "medications", "surgeries", "specialNeeds", "medicalNotes",
    ],
    4: [
      "primaryDoctor", "preferredClinic", "healthcareNeeds", "specialCare",
      "insuranceProvider", "insuranceId", "policyNumber", "expiryDate",
      "additionalNotes", "consent",
    ],
  };

  const phoneFields = ["phone", "guardianPhone", "emergencyPhone"];
  const validPhone = (value) => {
    const digits = String(value || "").replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  };

  const validateField = (field, data = formData) => {
    let message = "";
    const value = data[field];

    if (field === "consent") {
      if (!value) {
        message = "You must confirm the authorization before completing.";
      }
    } else if (requiredMessages[field]) {
      if (typeof value === "string" && !value.trim()) {
        message = requiredMessages[field];
      }
    }

    if (!message && phoneFields.includes(field) && String(value || "").trim() && !validPhone(value)) {
      message = "Enter a valid phone number (7–15 digits).";
    }

    if (!message && field === "email" && String(value || "").trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value.trim())) {
        message = "Enter a valid email address.";
      }
    }

    if (!message && ["month", "day", "year"].includes(field)) {
      const { month, day, year } = data;
      if (month && day && year) {
        const monthIndex = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December",
        ].indexOf(month);
        const date = new Date(Number(year), monthIndex, Number(day));
        if (
          monthIndex < 0 ||
          date.getFullYear() !== Number(year) ||
          date.getMonth() !== monthIndex ||
          date.getDate() !== Number(day) ||
          date > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
        ) {
          message = "Enter a valid birth date.";
        }
      }
    }

    if (!message && field === "profilePhoto" && value) {
      if (!value.type?.startsWith("image/")) {
        message = "Choose an image file for the profile photo.";
      } else if (value.size > 5 * 1024 * 1024) {
        message = "The profile photo must be 5 MB or smaller.";
      }
    }

    setErrors((previous) => ({ ...previous, [field]: message }));
    return message;
  };

  const updateField = (field, value) => {
    const nextData = { ...formData, [field]: value };
    setFormData(nextData);

    setErrors((previous) => {
      const nextErrors = { ...previous, [field]: "" };
      if (["month", "day", "year"].includes(field)) {
        nextErrors.month = "";
        nextErrors.day = "";
        nextErrors.year = "";
      }
      return nextErrors;
    });
  };

  const validateStep = () => {
    const newErrors = {};
    const fields = fieldsByStep[currentStep] || [];

    fields.forEach((field) => {
      const value = formData[field];

      if (field === "email" && !String(value || "").trim()) {
        return;
      }

      let message = "";
      if (field === "consent") {
        if (!value) message = "You must confirm the authorization before completing.";
      } else if (requiredMessages[field] && typeof value === "string" && !value.trim()) {
        message = requiredMessages[field];
      }

      if (!message && phoneFields.includes(field) && String(value || "").trim() && !validPhone(value)) {
        message = "Enter a valid phone number (7–15 digits).";
      }

      if (!message && field === "email" && String(value || "").trim()) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          message = "Enter a valid email address.";
        }
      }

      if (!message && ["month", "day", "year"].includes(field)) {
        if (!value) {
          message = requiredMessages[field];
        } else if (formData.month && formData.day && formData.year) {
          const monthIndex = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
          ].indexOf(formData.month);
          const date = new Date(Number(formData.year), monthIndex, Number(formData.day));
          if (
            monthIndex < 0 ||
            date.getFullYear() !== Number(formData.year) ||
            date.getMonth() !== monthIndex ||
            date.getDate() !== Number(formData.day) ||
            date > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
          ) {
            message = "Enter a valid birth date.";
          }
        }
      }

      if (!message && field === "profilePhoto" && value) {
        if (!value.type?.startsWith("image/")) {
          message = "Choose an image file for the profile photo.";
        } else if (value.size > 5 * 1024 * 1024) {
          message = "The profile photo must be 5 MB or smaller.";
        }
      }

      if (message) newErrors[field] = message;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepAsync = async () => {
    if (validationLock.current) return false;
    validationLock.current = true;
    setIsValidating(true);

    try {
      if (!validateStep()) return false;

      // This is a real browser-side asynchronous check: confirm the optional
      // selected photo can be decoded as an image. It does not contact a server.
      if (
        currentStep === 1 &&
        formData.profilePhoto &&
        typeof createImageBitmap === "function"
      ) {
        try {
          const bitmap = await createImageBitmap(formData.profilePhoto);
          bitmap.close();
        } catch {
          setErrors((previous) => ({
            ...previous,
            profilePhoto: "This image could not be opened. Please choose another image.",
          }));
          return false;
        }
      }

      return true;
    } finally {
      validationLock.current = false;
      setIsValidating(false);
    }
  };

  const nextStep = async () => {
    if (!(await validateStepAsync())) {
      return;
    }

    if (currentStep < 4) {
      setCurrentStep((step) => step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setErrors({});
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(await validateStepAsync())) {
      return;
    }

    // The current project has no persistence API; this preserves its existing
    // local completion behavior and does not claim that data was saved remotely.
    console.log("Dependent Information:", formData);
    alert("Validation complete. No backend is connected, so this information has not been saved.");
  };

  return (
    <main className="my-dependents-page">
      {" "}
      <section className="dependents-intro">
        {" "}
        <h1>Build Your Profile</h1>{" "}
        <p>This information will let us know more about your Family. </p>{" "}
      </section>
      <section className="step-progress">
        {[1, 2, 3, 4].map((step, index) => (
          <React.Fragment key={step}>
            <div
              className={`progress-step ${
                currentStep === step ? "active" : ""
              } ${currentStep > step ? "completed" : ""}`}
            >
              <div className="step-circle">
                {currentStep > step ? "✓" : step}
              </div>

              <span className="progress-label">
                {step === 1 && (
                  <>
                    Dependent
                    <br />
                    Registration
                  </>
                )}

                {step === 2 && (
                  <>
                    Contact &
                    <br />
                    Guardian
                  </>
                )}

                {step === 3 && (
                  <>
                    Health
                    <br />
                    Information
                  </>
                )}

                {step === 4 && (
                  <>
                    Care Plan &
                    <br />
                    Insurance
                  </>
                )}
              </span>
            </div>

            {index < 3 && (
              <div
                className={`progress-line ${
                  currentStep > step ? "completed-line" : ""
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </section>
      <section className="dependent-form-card">
        <div className="form-header">
          <span className="step-label">STEP {currentStep} OF 4</span>

          <h2>
            {currentStep === 1 && "Dependent Registration"}
            {currentStep === 2 && "Contact & Guardian"}
            {currentStep === 3 && "Health Information"}
            {currentStep === 4 && "Care Plan & Insurance"}
          </h2>

          <p>
            {currentStep === 1 && "Enter the basic personal information of your dependent."}
            {currentStep === 2 && "Add contact, guardian and emergency information."}
            {currentStep === 3 && "Provide important medical and health information."}
            {currentStep === 4 &&"Complete the care plan, insurance and final confirmation."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          onBlurCapture={(event) => {
            const field = event.target.name;
            if (field) validateField(field);
          }}
        >
          {/* STEP 1 */}

          {currentStep === 1 && (
            <div className="form-content">
              <div className="section-title">
                <h3>Personal Information</h3>
                <p>Basic information about the dependent.</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    First Name <span>*</span>{" "}
                  </label>

                  <input
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    value={formData.firstName}
                    className={errors.firstName ? "input-error" : ""}
                    onChange={(e) => updateField("firstName", e.target.value)}
                  />

                  {errors.firstName && (
                    <span className="error-message">{errors.firstName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Middle Name</label>

                  <input
                    type="text"
                    placeholder="Enter middle name"
                    name="middleName"
                    value={formData.middleName}
                    onChange={(e) => updateField("middleName", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Last Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    value={formData.lastName}
                    className={errors.lastName ? "input-error" : ""}
                    onChange={(e) => updateField("lastName", e.target.value)}
                  />

                  {errors.lastName && (
                    <span className="error-message">{errors.lastName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    Relationship <span>*</span>
                  </label>

                  <select
                    name="relationship"
                    value={formData.relationship}
                    className={errors.relationship ? "input-error" : ""}
                    onChange={(e) =>
                      updateField("relationship", e.target.value)
                    }
                  >
                    <option value="">Select relationship</option>
                    <option>Child</option>
                    <option>Daughter</option>
                    <option>Son</option>
                    <option>Mother</option>
                    <option>Father</option>
                    <option>Brother</option>
                    <option>Sister</option>
                    <option>Spouse</option>
                    <option>Other</option>
                  </select>

                  {errors.relationship && (
                    <span className="error-message">{errors.relationship}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>
                  Birth Date <span>*</span>
                </label>

                <div className="birth-date-fields">
                  <div>
                    <select
                      name="month"
                    value={formData.month}
                      className={errors.month ? "input-error" : ""}
                      onChange={(e) => updateField("month", e.target.value)}
                    >
                      <option value="">Month</option>

                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((month) => (
                        <option key={month}>{month}</option>
                      ))}
                    </select>

                    {errors.month && (
                      <span className="error-message">{errors.month}</span>
                    )}
                  </div>

                  <div>
                    <select
                      name="day"
                    value={formData.day}
                      className={errors.day ? "input-error" : ""}
                      onChange={(e) => updateField("day", e.target.value)}
                    >
                      <option value="">Day</option>

                      {Array.from({ length: 31 }, (_, i) => i + 1).map(
                        (day) => (
                          <option key={day}>{day}</option>
                        ),
                      )}
                    </select>

                    {errors.day && (
                      <span className="error-message">{errors.day}</span>
                    )}
                  </div>

                  <div>
                    <select
                      name="year"
                    value={formData.year}
                      className={errors.year ? "input-error" : ""}
                      onChange={(e) => updateField("year", e.target.value)}
                    >
                      <option value="">Year</option>

                      {Array.from(
                        { length: 100 },
                        (_, i) => new Date().getFullYear() - i,
                      ).map((year) => (
                        <option key={year}>{year}</option>
                      ))}
                    </select>

                    {errors.year && (
                      <span className="error-message">{errors.year}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>
                  Gender <span>*</span>
                </label>

                <select
                  name="gender"
                    value={formData.gender}
                  className={errors.gender ? "input-error" : ""}
                  onChange={(e) => updateField("gender", e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

                {errors.gender && (
                  <span className="error-message">{errors.gender}</span>
                )}
              </div>

              <div className="form-group">
                <label>Profile Photo</label>

                <input
                  type="file"
                  name="profilePhoto"
                  accept="image/*"
                  onChange={(e) =>
                    updateField("profilePhoto", e.target.files[0] || null)
                  }
                />
                {errors.profilePhoto && (
                  <span className="error-message">{errors.profilePhoto}</span>
                )}
              </div>
            </div>
          )}

          {/* STEP 2 */}

          {currentStep === 2 && (
            <div className="form-content">
              <div className="section-title">
                <h3>Contact Information</h3>
                <p>How can this dependent or their guardian be contacted?</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Phone Number <span>*</span>
                  </label>

                  <input
                    type="tel"
                    placeholder="+93 7XX XXX XXX"
                    name="phone"
                    value={formData.phone}
                    className={errors.phone ? "input-error" : ""}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />

                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Email Address</label>

                  <input
                    type="email"
                    placeholder="example@email.com"
                    name="email"
                    value={formData.email}
                    className={errors.email ? "input-error" : ""}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Address <span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter address"
                    name="address"
                    value={formData.address}
                    className={errors.address ? "input-error" : ""}
                    onChange={(e) => updateField("address", e.target.value)}
                  />

                  {errors.address && (
                    <span className="error-message">{errors.address}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    City / Province <span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter city or province"
                    name="province"
                    value={formData.province}
                    className={errors.province ? "input-error" : ""}
                    onChange={(e) => updateField("province", e.target.value)}
                  />

                  {errors.province && (
                    <span className="error-message">{errors.province}</span>
                  )}
                </div>
              </div>

              <div className="section-title secondary">
                <h3>Guardian Information</h3>
                <p>Required especially for children and minors.</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Guardian Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Full name"
                    name="guardianName"
                    value={formData.guardianName}
                    className={errors.guardianName ? "input-error" : ""}
                    onChange={(e) =>
                      updateField("guardianName", e.target.value)
                    }
                  />

                  {errors.guardianName && (
                    <span className="error-message">{errors.guardianName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    Guardian Relationship <span>*</span>
                  </label>

                  <select
                    name="guardianRelationship"
                    value={formData.guardianRelationship}
                    className={errors.guardianRelationship ? "input-error" : ""}
                    onChange={(e) =>
                      updateField("guardianRelationship", e.target.value)
                    }
                  >
                    <option value="">Select relationship</option>
                    <option>Mother</option>
                    <option>Father</option>
                    <option>Legal Guardian</option>
                    <option>Other</option>
                  </select>

                  {errors.guardianRelationship && (
                    <span className="error-message">
                      {errors.guardianRelationship}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>
                  Guardian Phone <span>*</span>
                </label>

                <input
                  type="tel"
                  placeholder="+93 7XX XXX XXX"
                  name="guardianPhone"
                    value={formData.guardianPhone}
                  className={errors.guardianPhone ? "input-error" : ""}
                  onChange={(e) => updateField("guardianPhone", e.target.value)}
                />

                {errors.guardianPhone && (
                  <span className="error-message">{errors.guardianPhone}</span>
                )}
              </div>

              <div className="section-title secondary">
                <h3>Emergency Contact</h3>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Emergency Contact Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Full name"
                    name="emergencyName"
                    value={formData.emergencyName}
                    className={errors.emergencyName ? "input-error" : ""}
                    onChange={(e) =>
                      updateField("emergencyName", e.target.value)
                    }
                  />

                  {errors.emergencyName && (
                    <span className="error-message">
                      {errors.emergencyName}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    Emergency Contact Phone <span>*</span>
                  </label>

                  <input
                    type="tel"
                    placeholder="+93 7XX XXX XXX"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    className={errors.emergencyPhone ? "input-error" : ""}
                    onChange={(e) =>
                      updateField("emergencyPhone", e.target.value)
                    }
                  />

                  {errors.emergencyPhone && (
                    <span className="error-message">
                      {errors.emergencyPhone}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}

          {currentStep === 3 && (
            <div className="form-content">
              <div className="section-title">
                <h3>Medical & Health Records</h3>
                <p>Provide important health information about the dependent.</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Blood Type <span>*</span>
                  </label>

                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    className={errors.bloodType ? "input-error" : ""}
                    onChange={(e) => updateField("bloodType", e.target.value)}
                  >
                    <option value="">Select blood type</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>Unknown</option>
                  </select>

                  {errors.bloodType && (
                    <span className="error-message">{errors.bloodType}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    Vaccination Status <span>*</span>
                  </label>

                  <select
                    name="vaccinationStatus"
                    value={formData.vaccinationStatus}
                    className={errors.vaccinationStatus ? "input-error" : ""}
                    onChange={(e) =>
                      updateField("vaccinationStatus", e.target.value)
                    }
                  >
                    <option value="">Select status</option>
                    <option>Up to date</option>
                    <option>Partially vaccinated</option>
                    <option>Not vaccinated</option>
                    <option>Unknown</option>
                  </select>

                  {errors.vaccinationStatus && (
                    <span className="error-message">
                      {errors.vaccinationStatus}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>
                  Allergies <span>*</span>
                </label>

                <textarea
                  placeholder="List any known allergies or write None"
                  name="allergies"
                    value={formData.allergies}
                  className={errors.allergies ? "input-error" : ""}
                  onChange={(e) => updateField("allergies", e.target.value)}
                />

                {errors.allergies && (
                  <span className="error-message">{errors.allergies}</span>
                )}
              </div>

              <div className="form-group">
                <label>
                  Medical Conditions <span>*</span>
                </label>

                <textarea
                  placeholder="Describe any existing medical conditions"
                  name="medicalConditions"
                    value={formData.medicalConditions}
                  className={errors.medicalConditions ? "input-error" : ""}
                  onChange={(e) =>
                    updateField("medicalConditions", e.target.value)
                  }
                />

                {errors.medicalConditions && (
                  <span className="error-message">
                    {errors.medicalConditions}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>
                  Current Medications <span>*</span>
                </label>

                <textarea
                  placeholder="List current medications or write None"
                  name="medications"
                    value={formData.medications}
                  className={errors.medications ? "input-error" : ""}
                  onChange={(e) => updateField("medications", e.target.value)}
                />

                {errors.medications && (
                  <span className="error-message">{errors.medications}</span>
                )}
              </div>

              <div className="form-group">
                <label>
                  Previous Surgeries <span>*</span>
                </label>

                <textarea
                  placeholder="List previous surgeries if any or write None"
                  name="surgeries"
                    value={formData.surgeries}
                  className={errors.surgeries ? "input-error" : ""}
                  onChange={(e) => updateField("surgeries", e.target.value)}
                />

                {errors.surgeries && (
                  <span className="error-message">{errors.surgeries}</span>
                )}
              </div>

              <div className="form-group">
                <label>
                  Disabilities / Special Needs <span>*</span>
                </label>

                <textarea
                  placeholder="Describe any special needs or write None"
                  name="specialNeeds"
                    value={formData.specialNeeds}
                  className={errors.specialNeeds ? "input-error" : ""}
                  onChange={(e) => updateField("specialNeeds", e.target.value)}
                />

                {errors.specialNeeds && (
                  <span className="error-message">{errors.specialNeeds}</span>
                )}
              </div>

              <div className="form-group">
                <label>
                  Important Medical Notes <span>*</span>
                </label>

                <textarea
                  placeholder="Any additional medical information or write None"
                  name="medicalNotes"
                    value={formData.medicalNotes}
                  className={errors.medicalNotes ? "input-error" : ""}
                  onChange={(e) => updateField("medicalNotes", e.target.value)}
                />

                {errors.medicalNotes && (
                  <span className="error-message">{errors.medicalNotes}</span>
                )}
              </div>
            </div>
          )}

          {/* STEP 4 */}

          {currentStep === 4 && (
            <div className="form-content">
              <div className="section-title">
                <h3>Care Plan</h3>
                <p>Add healthcare preferences and care information.</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Primary Doctor <span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter doctor's name"
                    name="primaryDoctor"
                    value={formData.primaryDoctor}
                    className={errors.primaryDoctor ? "input-error" : ""}
                    onChange={(e) =>
                      updateField("primaryDoctor", e.target.value)
                    }
                  />

                  {errors.primaryDoctor && (
                    <span className="error-message">
                      {errors.primaryDoctor}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    Preferred Clinic <span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter clinic name"
                    name="preferredClinic"
                    value={formData.preferredClinic}
                    className={errors.preferredClinic ? "input-error" : ""}
                    onChange={(e) =>
                      updateField("preferredClinic", e.target.value)
                    }
                  />

                  {errors.preferredClinic && (
                    <span className="error-message">
                      {errors.preferredClinic}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>
                  Healthcare Needs <span>*</span>
                </label>

                <textarea
                  placeholder="Describe regular healthcare needs"
                  name="healthcareNeeds"
                    value={formData.healthcareNeeds}
                  className={errors.healthcareNeeds ? "input-error" : ""}
                  onChange={(e) =>
                    updateField("healthcareNeeds", e.target.value)
                  }
                />

                {errors.healthcareNeeds && (
                  <span className="error-message">
                    {errors.healthcareNeeds}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>
                  Special Care Requirements <span>*</span>
                </label>

                <textarea
                  placeholder="Describe any special care requirements"
                  name="specialCare"
                    value={formData.specialCare}
                  className={errors.specialCare ? "input-error" : ""}
                  onChange={(e) => updateField("specialCare", e.target.value)}
                />

                {errors.specialCare && (
                  <span className="error-message">{errors.specialCare}</span>
                )}
              </div>

              <div className="section-title secondary">
                <h3>Insurance Information</h3>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Insurance Provider <span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Insurance company"
                    name="insuranceProvider"
                    value={formData.insuranceProvider}
                    className={errors.insuranceProvider ? "input-error" : ""}
                    onChange={(e) =>
                      updateField("insuranceProvider", e.target.value)
                    }
                  />

                  {errors.insuranceProvider && (
                    <span className="error-message">
                      {errors.insuranceProvider}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    Insurance ID <span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Insurance ID"
                    name="insuranceId"
                    value={formData.insuranceId}
                    className={errors.insuranceId ? "input-error" : ""}
                    onChange={(e) => updateField("insuranceId", e.target.value)}
                  />

                  {errors.insuranceId && (
                    <span className="error-message">{errors.insuranceId}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Policy Number <span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Policy number"
                    name="policyNumber"
                    value={formData.policyNumber}
                    className={errors.policyNumber ? "input-error" : ""}
                    onChange={(e) =>
                      updateField("policyNumber", e.target.value)
                    }
                  />

                  {errors.policyNumber && (
                    <span className="error-message">{errors.policyNumber}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    Expiry Date <span>*</span>
                  </label>

                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    className={errors.expiryDate ? "input-error" : ""}
                    onChange={(e) => updateField("expiryDate", e.target.value)}
                  />

                  {errors.expiryDate && (
                    <span className="error-message">{errors.expiryDate}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>
                  Additional Notes <span>*</span>
                </label>

                <textarea
                  placeholder="Anything else you would like to add or write None"
                  name="additionalNotes"
                    value={formData.additionalNotes}
                  className={errors.additionalNotes ? "input-error" : ""}
                  onChange={(e) =>
                    updateField("additionalNotes", e.target.value)
                  }
                />

                {errors.additionalNotes && (
                  <span className="error-message">
                    {errors.additionalNotes}
                  </span>
                )}
              </div>

              <div
                className={`consent-box ${
                  errors.consent ? "consent-error" : ""
                }`}
              >
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={(e) => updateField("consent", e.target.checked)}
                />

                <label htmlFor="consent">
                  I confirm that the information provided is accurate and I am
                  authorized to manage this dependent's information.
                </label>

                {errors.consent && (
                  <span className="error-message">{errors.consent}</span>
                )}
              </div>
            </div>
          )}

          <div className="form-navigation">
            <button
              type="button"
              className="back-button"
              onClick={previousStep}
              disabled={currentStep === 1 || isValidating}
            >
              BACK
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                className="next-button"
                onClick={nextStep}
                disabled={isValidating}
              >
                {isValidating ? "VALIDATING..." : "NEXT"}
              </button>
            ) : (
              <button type="submit" className="next-button" disabled={isValidating}>
                {isValidating ? "VALIDATING..." : "COMPLETE"}
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  );
};

export default MyDependents;
