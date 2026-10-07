import React, { useState } from "react";
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
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required.";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required.";
      }
      if (!formData.month) {
        newErrors.month = "Birth month is required.";
      }
      if (!formData.day) {
        newErrors.day = "Birth day is required.";
      }
      if (!formData.year) {
        newErrors.year = "Birth year is required.";
      }
      if (!formData.gender) {
        newErrors.gender = "Gender is required.";
      }
      if (!formData.relationship) {
        newErrors.relationship = "Relationship is required.";
      }
    }
    if (currentStep === 2) {
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required.";
      }
      if (!formData.address.trim()) {
        newErrors.address = "Address is required.";
      }
      if (!formData.province.trim()) {
        newErrors.province = "City / Province is required.";
      }
      if (!formData.guardianName.trim()) {
        newErrors.guardianName = "Guardian name is required.";
      }
      if (!formData.guardianRelationship) {
        newErrors.guardianRelationship = "Guardian relationship is required.";
      }
      if (!formData.guardianPhone.trim()) {
        newErrors.guardianPhone = "Guardian phone is required.";
      }
      if (!formData.emergencyName.trim()) {
        newErrors.emergencyName = "Emergency contact name is required.";
      }
      if (!formData.emergencyPhone.trim()) {
        newErrors.emergencyPhone = "Emergency contact phone is required.";
      }
    }
    if (currentStep === 3) {
      if (!formData.bloodType) {
        newErrors.bloodType = "Blood type is required.";
      }
      if (!formData.vaccinationStatus) {
        newErrors.vaccinationStatus = "Vaccination status is required.";
      }
      if (!formData.allergies.trim()) {
        newErrors.allergies = "Please enter allergies or write None.";
      }
      if (!formData.medicalConditions.trim()) {
        newErrors.medicalConditions =
          "Please enter medical conditions or write None.";
      }
      if (!formData.medications.trim()) {
        newErrors.medications = "Please enter medications or write None.";
      }
      if (!formData.surgeries.trim()) {
        newErrors.surgeries = "Please enter previous surgeries or write None.";
      }
      if (!formData.specialNeeds.trim()) {
        newErrors.specialNeeds = "Please enter special needs or write None.";
      }
      if (!formData.medicalNotes.trim()) {
        newErrors.medicalNotes = "Please enter medical notes or write None.";
      }
    }

    if (currentStep === 4) {
      if (!formData.primaryDoctor.trim()) {
        newErrors.primaryDoctor = "Primary doctor is required.";
      }
      if (!formData.preferredClinic.trim()) {
        newErrors.preferredClinic = "Preferred clinic is required.";
      }
      if (!formData.healthcareNeeds.trim()) {
        newErrors.healthcareNeeds = "Healthcare needs are required.";
      }
      if (!formData.specialCare.trim()) {
        newErrors.specialCare = "Special care information is required.";
      }
      if (!formData.insuranceProvider.trim()) {
        newErrors.insuranceProvider = "Insurance provider is required.";
      }
      if (!formData.insuranceId.trim()) {
        newErrors.insuranceId = "Insurance ID is required.";
      }
      if (!formData.policyNumber.trim()) {
        newErrors.policyNumber = "Policy number is required.";
      }
      if (!formData.expiryDate) {
        newErrors.expiryDate = "Expiry date is required.";
      }
      if (!formData.additionalNotes.trim()) {
        newErrors.additionalNotes =
          "Please enter additional notes or write None.";
      }
      if (!formData.consent) {
        newErrors.consent =
          "You must confirm the authorization before completing.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) {
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateStep()) {
      return;
    }

    console.log("Dependent Information:", formData);
    alert("Dependent added successfully!");
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

        <form onSubmit={handleSubmit}>
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
                  accept="image/*"
                  onChange={(e) =>
                    updateField("profilePhoto", e.target.files[0])
                  }
                />
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
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
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
              disabled={currentStep === 1}
            >
              BACK
            </button>

            {currentStep < 4 ? (
              <button type="button" className="next-button" onClick={nextStep}>
                NEXT
              </button>
            ) : (
              <button type="submit" className="next-button">
                COMPLETE
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  );
};

export default MyDependents;
