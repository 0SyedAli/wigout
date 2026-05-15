"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import api from "@/lib/api";
import { setCookie } from "cookies-next";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin.wigout@yopmail.com");
  const [password, setPassword] = useState("pass12345");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("admin/signin", {
        email,
        password,
      });

      if (response.data && response.data.token) {
        // Save token in cookies
        setCookie("auth_token", response.data.token, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        });
        setCookie("data", response.data.admin, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        });

        // Redirect to home
        router.push("/dashboard");
      } else {
        setError("Invalid login response from server.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "An error occurred during login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-box auth-box-login">
      <h2 className="rd-title">Login</h2>
      <p className="auth-sub">Please Enter Your Details</p>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-danger mt-2" style={{ fontSize: '14px' }}>{error}</p>}

        <label className="remember">
          <input type="checkbox" className="form-check" /> Remember Me
        </label>

        <button
          className="auth-btn mt-3"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Get Started"}
        </button>
      </form>

      <p className="auth-or">Login with</p>

      <button className="social google" type="button">
        <div><FcGoogle /> </div>Sign in with Google
      </button>

      <button className="social facebook" type="button">
        <div><FaFacebook /> </div>Sign in with Facebook
      </button>

      <div className="register_link">
        <h5>
          {"Don't have an account? "}
          <Link href="signup">Sign Up</Link>
        </h5>
      </div>
    </div>
  );
}
