"use client";

import { useState } from "react";
import Image from "next/image";

export default function AuthFlip() {
  const [flip, setFlip] = useState(false);

  return (
    <section className="auth-wrapper">
      <div className={`auth-card ${flip ? "flipped" : ""}`}>

        {/* LEFT SIDE (IMAGE / BRAND) */}
        <div className="auth-left">
          <Image
            src="/images/home-img1.png"
            alt="WIG Out"
            fill
            className="auth-bg-img"
          />
        </div>

        {/* RIGHT SIDE (FORMS) */}
        <div className="auth-right">

          {/* SIGN UP */}
          <div className="auth-face auth-front">
            <h2>Sign Up</h2>
            <p className="auth-sub">
              Get started in minutes and transform your business
            </p>

            <div className="row">
              <div className="col-6">
                <input placeholder="First Name" />
              </div>
              <div className="col-6">
                <input placeholder="Last Name" />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <input placeholder="+966" />
              </div>
              <div className="col-8">
                <input placeholder="Phone number" />
              </div>
            </div>

            <select>
              <option>Choose City</option>
            </select>

            <button className="auth-btn">Sign up</button>

            <p className="auth-switch">
              Already have an account?
              <span onClick={() => setFlip(true)}> Login</span>
            </p>
          </div>

          {/* LOGIN */}
          <div className="auth-face auth-back">
            <h2>Login</h2>
            <p className="auth-sub">Please Enter Your Details</p>

            <input placeholder="Username" />
            <input placeholder="Password" type="password" />

            <label className="remember">
              <input type="checkbox" /> Remember Me
            </label>

            <div className="social-login">
              <button className="google">Sign in with Google</button>
              <button className="apple">Sign in with Apple</button>
              <button className="facebook">Sign in with Facebook</button>
            </div>

            <button className="auth-btn">Get Started</button>

            <p className="auth-switch">
              Don’t have an account?
              <span onClick={() => setFlip(false)}> Sign up</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
