import Image from "next/image";
import { GrLocation } from "react-icons/gr";
import { FiPhone } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">

          <div className="col-md-4">
            <Image
              src="/images/logo-white.png"
              width={202.67}
              height={76.1}
              style={{ objectFit: "contain", marginBottom: "25px" }}
              alt=""
            />
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit
              voluptatem accusantium doloremque.
            </p>
          </div>

          <div className="col-md-2 my-4">
            <h6>OTHER LINKS</h6>
            <a href="#">Home</a><br />
            <a href="#">About Us</a><br />
            <a href="#">Events</a><br />
            <a href="#">Testimonials</a>
          </div>

          <div className="col-md-3 my-4">
            <h6>MORE</h6>
            <a href="#">Established here</a><br />
            <a href="#">Lorem ipsum</a><br />
            <a href="#">Accusantium</a>
          </div>

          <div className="col-md-3 my-4">
            <h6>CONTACT US</h6>
            <a href="#"><GrLocation /> Office Address12345 Thems is Ct, United States, California</a> <br />
            <a href="#"><FiPhone /> (123) 345-67890</a><br />
            <a href="#"><IoMailOutline /> info@wigout.com</a>
          </div>

        </div>

        <div className="footer-bottom d-flex justify-content-between mt-4">
          <span>©2025 | <Link href="/home" className="fw-bold">WIG OUT</Link> | All Rights Reserved</span>
          <span><Link href="/terms-and-condition">Terms and Conditions</Link> | <Link href="/privacy-policy">Privacy Policy</Link></span>
        </div>

      </div>
    </footer>
  );
}
