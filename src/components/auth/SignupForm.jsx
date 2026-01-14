"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  return (
    <div className="auth-box">
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

      <button className="auth-btn mt-3" onClick={() => router.push("/home")}>
        Sign up
      </button>
      <div className='register_link'>
        <h5>Already have an account? <Link href="login">Login</Link></h5>
      </div>
    </div>
  );
}
