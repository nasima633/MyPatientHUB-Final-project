import { useState } from "react";
import "./login.css";

import facebookIcon from "../../assets/icons/facebook.png";
import googleIcon from "../../assets/icons/google.png";
import backgroundImage from "../../assets/images/background.png";

function Login({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signupMethod, setSignupMethod] = useState("email");

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupIdNumber, setSignupIdNumber] = useState("");
  const [signupBirthDate, setSignupBirthDate] = useState("");

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email validation
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
  }

  // ID number validation
  function validateIdNumber(idNumber) {
    const cleanedId = idNumber.trim();

    if (!cleanedId) {
      return "ID number is required.";
    }

    if (!/^[a-zA-Z0-9-]{5,25}$/.test(cleanedId)) {
      return "ID number must contain 5–25 letters, numbers, or hyphens.";
    }

    return "";
  }

  // Date of birth validation
  function validateBirthDate(birthDate) {
    if (!birthDate) {
      return "Date of birth is required.";
    }

    const selectedDate = new Date(`${birthDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(selectedDate.getTime())) {
      return "Please enter a valid date of birth.";
    }

    if (selectedDate > today) {
      return "Date of birth cannot be in the future.";
    }

    return "";
  }

  // Phone validation
  function validatePhone(phone) {
    const cleanedPhone = phone.replace(/[\s()-]/g, "");

    return /^\+?[0-9]{7,15}$/.test(cleanedPhone);
  }

  // Password validation
  function validatePassword(value) {
    if (!value) {
      return "Password is required.";
    }

    if (value.length < 8) {
      return "Password must contain at least 8 characters.";
    }

    if (!/[A-Z]/.test(value)) {
      return "Include at least one uppercase letter.";
    }

    if (!/[a-z]/.test(value)) {
      return "Include at least one lowercase letter.";
    }

    if (!/[0-9]/.test(value)) {
      return "Include at least one number.";
    }

    return "";
  }

  // Asynchronous account availability demonstration.
  // This is not a real database check.
  async function checkAccountAvailability(value, method) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    /*
      Replace this demonstration function with a real backend API
      when one becomes available.

      The backend should check for duplicate accounts.
    */

    return {
      available: true,
      message: "",
      method,
      value,
    };
  }

  // Login form submission
  function handleLoginSubmit(event) {
    event.preventDefault();

    setErrors({});
    setMessage("");

    const identifier = emailOrPhone.trim();

    if (!identifier) {
      setErrors({
        emailOrPhone: "Email or phone number is required.",
      });
      return;
    }

    const isEmail = identifier.includes("@");

    if (isEmail && !validateEmail(identifier)) {
      setErrors({
        emailOrPhone: "Please enter a valid email address.",
      });
      return;
    }

    if (!isEmail && !validatePhone(identifier)) {
      setErrors({
        emailOrPhone: "Please enter a valid phone number.",
      });
      return;
    }

    if (!password) {
      setErrors({
        password: "Password is required.",
      });
      return;
    }

    // Existing demonstration login credentials
    if (
      identifier.toLowerCase() === "admin@gmail.com" &&
      password === "123456"
    ) {
      setMessage("Login successful!");

      if (typeof onLoginSuccess === "function") {
        onLoginSuccess();
      }

      return;
    }

    setMessage("Incorrect email, phone number, or password.");
  }

  // Sign-up form submission
  async function handleSignUpSubmit(event) {
    event.preventDefault();

    setErrors({});
    setMessage("");

    const newErrors = {};

    // Validate email or phone number
    if (signupMethod === "email") {
      if (!signupEmail.trim()) {
        newErrors.signupEmail = "Email address is required.";
      } else if (!validateEmail(signupEmail)) {
        newErrors.signupEmail = "Please enter a valid email address.";
      }
    }

    if (signupMethod === "phone") {
      if (!signupPhone.trim()) {
        newErrors.signupPhone = "Phone number is required.";
      } else if (!validatePhone(signupPhone)) {
        newErrors.signupPhone = "Please enter a valid phone number.";
      }
    }

    // Validate ID number
    const idNumberError = validateIdNumber(signupIdNumber);

    if (idNumberError) {
      newErrors.signupIdNumber = idNumberError;
    }

    // Validate date of birth
    const birthDateError = validateBirthDate(signupBirthDate);

    if (birthDateError) {
      newErrors.signupBirthDate = birthDateError;
    }

    // Validate password
    const passwordError = validatePassword(signupPassword);

    if (passwordError) {
      newErrors.signupPassword = passwordError;
    }

    // Stop submission if validation fails
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const accountIdentifier =
        signupMethod === "email"
          ? signupEmail.trim().toLowerCase()
          : signupPhone.replace(/[\s()-]/g, "");

      // Asynchronous validation demonstration
      const availability = await checkAccountAvailability(
        accountIdentifier,
        signupMethod
      );

      if (!availability.available) {
        setErrors({
          [signupMethod === "email" ? "signupEmail" : "signupPhone"]:
            availability.message || "This account already exists.",
        });

        return;
      }

      /*
        Registration is not connected to a backend yet.

        When a backend is available, send the registration data
        securely over HTTPS. The backend must validate the data,
        hash the password securely, and create the account.

        Never store passwords in localStorage.
      */

      setMessage(
        "Your information passed frontend validation. " +
          "Connect a backend API to create your account."
      );
    } catch (error) {
      setMessage(
        "Unable to validate your information. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // Switch to sign-up
  function switchToSignUp() {
    setIsSignUp(true);
    setErrors({});
    setMessage("");
    setSignupMethod("email");
  }

  // Switch to login
  function switchToLogin() {
    setIsSignUp(false);
    setErrors({});
    setMessage("");
  }

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <main>
        <h1 className="login-title">Welcome To MyPatientHUB!</h1>

        <p className="login-subtitle">
          We provide smart healthcare service in your hands
        </p>

        <div className="login-form">
          <form
            className="form-info"
            id="forminfo"
            onSubmit={isSignUp ? handleSignUpSubmit : handleLoginSubmit}
            noValidate
          >
            <p className="login-form-title">
              {isSignUp
                ? "Create Your MyPatientHUB Account"
                : "Sign in to MyPatientHUB"}
            </p>

            <div className="social-login">
              <button
                type="button"
                className="social-btn"
                aria-label="Sign in with Facebook"
              >
                <img src={facebookIcon} alt="Facebook" />
              </button>

              <button
                type="button"
                className="social-btn"
                aria-label="Sign in with Google"
              >
                <img src={googleIcon} alt="Google" />
              </button>
            </div>

            {!isSignUp ? (
              <>
                <label
                  className="field-label"
                  htmlFor="login-identifier"
                >
                  Email or Phone Number
                </label>

                <input
                  id="login-identifier"
                  type="text"
                  placeholder="Email or Phone number"
                  autoComplete="username"
                  className={`email-holder ${
                    errors.emailOrPhone ? "input-error" : ""
                  }`}
                  value={emailOrPhone}
                  onChange={(event) => {
                    setEmailOrPhone(event.target.value);
                    setErrors({});
                    setMessage("");
                  }}
                  aria-invalid={Boolean(errors.emailOrPhone)}
                />

                {errors.emailOrPhone && (
                  <p className="field-error">
                    {errors.emailOrPhone}
                  </p>
                )}

                <label
                  className="field-label"
                  htmlFor="login-password"
                >
                  Password
                </label>

                <input
                  id="login-password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  className={`password-holder ${
                    errors.password ? "input-error" : ""
                  }`}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setErrors({});
                    setMessage("");
                  }}
                  aria-invalid={Boolean(errors.password)}
                />

                {errors.password && (
                  <p className="field-error">{errors.password}</p>
                )}

                <button
                  type="submit"
                  className="sign-in-btn"
                  id="signin-btn"
                >
                  SIGN IN
                </button>

                <a
                  href="#"
                  className="forget-password"
                  onClick={(event) => {
                    event.preventDefault();
                    setMessage(
                      "Password recovery requires a connected backend."
                    );
                  }}
                >
                  Forgot Password?
                </a>

                <label className="remember-me">
                  <input
                    type="checkbox"
                    className="remember-check"
                  />

                  <span className="remember-text">
                    Remember Me
                  </span>
                </label>

                <p className="space-in-up">or</p>

                <button
                  type="button"
                  className="sign-up-btn"
                  id="signup-btn"
                  onClick={switchToSignUp}
                >
                  SIGN UP
                </button>
              </>
            ) : (
              <>
                <p className="signup-description">
                  Create an account using your email address or phone number.
                </p>

                <div
                  className="signup-methods"
                  role="group"
                  aria-label="Choose registration method"
                >
                  <button
                    type="button"
                    className={`method-btn ${
                      signupMethod === "email" ? "active" : ""
                    }`}
                    onClick={() => {
                      setSignupMethod("email");
                      setErrors({});
                      setMessage("");
                    }}
                    aria-pressed={signupMethod === "email"}
                  >
                    Email
                  </button>

                  <button
                    type="button"
                    className={`method-btn ${
                      signupMethod === "phone" ? "active" : ""
                    }`}
                    onClick={() => {
                      setSignupMethod("phone");
                      setErrors({});
                      setMessage("");
                    }}
                    aria-pressed={signupMethod === "phone"}
                  >
                    Phone Number
                  </button>
                </div>

                {/* Email input */}
                {signupMethod === "email" ? (
                  <>
                    <label
                      className="field-label"
                      htmlFor="signup-email"
                    >
                      Email Address
                    </label>

                    <input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email address"
                      autoComplete="email"
                      className={`email-holder ${
                        errors.signupEmail ? "input-error" : ""
                      }`}
                      value={signupEmail}
                      onChange={(event) => {
                        setSignupEmail(event.target.value);
                        setErrors((previous) => ({
                          ...previous,
                          signupEmail: "",
                        }));
                        setMessage("");
                      }}
                      aria-invalid={Boolean(errors.signupEmail)}
                    />

                    {errors.signupEmail && (
                      <p className="field-error">
                        {errors.signupEmail}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    {/* Phone input */}
                    <label
                      className="field-label"
                      htmlFor="signup-phone"
                    >
                      Phone Number
                    </label>

                    <input
                      id="signup-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      className={`email-holder ${
                        errors.signupPhone ? "input-error" : ""
                      }`}
                      value={signupPhone}
                      onChange={(event) => {
                        setSignupPhone(event.target.value);
                        setErrors((previous) => ({
                          ...previous,
                          signupPhone: "",
                        }));
                        setMessage("");
                      }}
                      aria-invalid={Boolean(errors.signupPhone)}
                    />

                    {errors.signupPhone && (
                      <p className="field-error">
                        {errors.signupPhone}
                      </p>
                    )}
                  </>
                )}

                {/* NEW INPUT 1: ID Number */}
                <label
                  className="field-label"
                  htmlFor="signup-id-number"
                >
                  ID Number
                </label>

                <input
                  id="signup-id-number"
                  type="text"
                  placeholder="Enter your ID number"
                  autoComplete="off"
                  className={`email-holder ${
                    errors.signupIdNumber ? "input-error" : ""
                  }`}
                  value={signupIdNumber}
                  onChange={(event) => {
                    setSignupIdNumber(event.target.value);
                    setErrors((previous) => ({
                      ...previous,
                      signupIdNumber: "",
                    }));
                    setMessage("");
                  }}
                  aria-invalid={Boolean(errors.signupIdNumber)}
                  aria-describedby={
                    errors.signupIdNumber
                      ? "signup-id-error"
                      : undefined
                  }
                />

                {errors.signupIdNumber && (
                  <p
                    className="field-error"
                    id="signup-id-error"
                  >
                    {errors.signupIdNumber}
                  </p>
                )}

                {/* NEW INPUT 2: Date of Birth */}
                <label
                  className="field-label"
                  htmlFor="signup-birth-date"
                >
                  Date of Birth
                </label>

                <input
                  id="signup-birth-date"
                  type="date"
                  autoComplete="bday"
                  max={new Date().toLocaleDateString("en-CA")}
                  className={`email-holder ${
                    errors.signupBirthDate ? "input-error" : ""
                  }`}
                  value={signupBirthDate}
                  onChange={(event) => {
                    setSignupBirthDate(event.target.value);
                    setErrors((previous) => ({
                      ...previous,
                      signupBirthDate: "",
                    }));
                    setMessage("");
                  }}
                  aria-invalid={Boolean(errors.signupBirthDate)}
                  aria-describedby={
                    errors.signupBirthDate
                      ? "signup-birth-date-error"
                      : undefined
                  }
                />

                {errors.signupBirthDate && (
                  <p
                    className="field-error"
                    id="signup-birth-date-error"
                  >
                    {errors.signupBirthDate}
                  </p>
                )}

                {/* Password input */}
                <label
                  className="field-label"
                  htmlFor="signup-password"
                >
                  Password
                </label>

                <input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className={`password-holder ${
                    errors.signupPassword ? "input-error" : ""
                  }`}
                  value={signupPassword}
                  onChange={(event) => {
                    setSignupPassword(event.target.value);
                    setErrors((previous) => ({
                      ...previous,
                      signupPassword: "",
                    }));
                    setMessage("");
                  }}
                  aria-invalid={Boolean(errors.signupPassword)}
                />

                {errors.signupPassword && (
                  <p className="field-error">
                    {errors.signupPassword}
                  </p>
                )}

                <p className="password-hint">
                  Use at least 8 characters, including uppercase and lowercase
                  letters and a number.
                </p>

                {message && (
                  <p className="form-message" role="status">
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  className="sign-in-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "PLEASE WAIT..." : "CREATE ACCOUNT"}
                </button>

                <p className="space-in-up">or</p>

                <button
                  type="button"
                  className="sign-up-btn"
                  onClick={switchToLogin}
                >
                  BACK TO SIGN IN
                </button>
              </>
            )}

            {message && !isSignUp && (
              <p className="form-message" role="status">
                {message}
              </p>
            )}
          </form>
        </div>
      </main>

      <footer className="login-footer">
        <ul className="footer-list">
          <li>
            <a href="#" className="footer-txts">
              Google Play Store APP
            </a>
          </li>

          <li>
            <a href="#" className="footer-txts">
              App Store APP
            </a>
          </li>

          <li>
            <a href="#" className="footer-txts">
              About MyPatientHUB
            </a>
          </li>

          <li>
            <a href="#" className="footer-txts">
              About Us
            </a>
          </li>

          <li>
            <a href="#" className="footer-txts">
              Our Blog
            </a>
          </li>
        </ul>

        <p className="copy-right">Copyright © 2022 MyPiHUB</p>
      </footer>
    </div>
  );
}

export default Login;