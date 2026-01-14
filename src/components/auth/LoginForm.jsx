"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const router = useRouter();
  return (
    <div className="auth-box auth-box-login">
      <h2 className="rd-title">Login</h2 >
      <p className="auth-sub">Please Enter Your Details</p>

      <input placeholder="Username" />
      <input placeholder="Password" type="password" />

      <label className="remember">
        <input type="checkbox" className="form-check" /> Remember Me
      </label>

      <p className="auth-or">Login with</p>

      <button className="social google">
        <div><FcGoogle /> </div>Sign in with Google
      </button>

      <button className="social facebook">
        <div><FaFacebook /> </div>Sign in with Facebook
      </button>

      <button className="auth-btn mt-3" onClick={() => router.push("/home")}>
        Get Started
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
