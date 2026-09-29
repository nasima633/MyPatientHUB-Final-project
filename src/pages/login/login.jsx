import { useState } from "react";

import "./login.css";

import facebookIcon from "../../assets/icons/facebook.png";

import googleIcon from "../../assets/icons/google.png";

import backgroundImage from "../../assets/images/background.png";


function Login({ onLoginSuccess }) {


    const [emailOrPhone, setEmailOrPhone] =
        useState("");


    const [password, setPassword] =
        useState("");


    function handleSubmit(event) {

        event.preventDefault();


        if (
            emailOrPhone === "admin@gmail.com" &&
            password === "123456"
        ) {

            alert(
                "Login successful!!"
            );

            onLoginSuccess();

        } else {

            alert(
                "Incorrect password or email!"
            );

        }

    }


    return (
        <div
            className="login-page"
            style={{
                backgroundImage:
                    `url(${backgroundImage})`
            }}
        >

            <main>

                <h1 className="login-title">
                    Welcome To MyPatientHUB!
                </h1>


                <p className="login-subtitle">
                    We provide smart healthcare service in your hands.
                </p>


                <div className="login-form">

                    <form
                        className="form-info"
                        id="forminfo"
                        onSubmit={handleSubmit}
                    >

                        <p className="login-form-title">
                            Sign in to MyPatientHUB
                        </p>


                        <div className="social-login">

                            <button
                                type="button"
                                className="social-btn"
                            >

                                <img
                                    src={facebookIcon}
                                    alt="Sign in with Facebook"
                                />

                            </button>


                            <button
                                type="button"
                                className="social-btn"
                            >

                                <img
                                    src={googleIcon}
                                    alt="Sign in with Google"
                                />

                            </button>

                        </div>


                        <input
                            type="text"
                            placeholder="Email or Phone number"
                            required
                            className="email-holder"
                            value={emailOrPhone}
                            onChange={(event) =>
                                setEmailOrPhone(
                                    event.target.value
                                )
                            }
                        />


                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="password-holder"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                        />


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


                        <p className="space-in-up">
                            or
                        </p>


                        <button
                            type="button"
                            className="sign-up-btn"
                            id="signup-btn"
                        >
                            SIGN UP
                        </button>

                    </form>

                </div>

            </main>


            <footer className="login-footer">

                <ul className="footer-list">

                    <li>
                        <a
                            href="#"
                            className="footer-txts"
                        >
                            Google Play Store APP
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className="footer-txts"
                        >
                            App Store APP
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className="footer-txts"
                        >
                            About MyPatientHUB
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className="footer-txts"
                        >
                            About Us
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className="footer-txts"
                        >
                            Our Blog
                        </a>
                    </li>

                </ul>


                <p className="copy-right">
                    Copyright © 2022 MyPiHUB
                </p>

            </footer>

        </div>
    );
}


export default Login;