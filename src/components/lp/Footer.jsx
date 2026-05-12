import Image from "next/image";

export default function Footer() {
    return (
        <section className="footer-section py-4">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-4">
                        <p>©2026 | WIG OUT | All Rights Reserved</p>
                    </div>
                    <div className="col-4 d-flex align-items-center justify-content-center">
                        <Image
                            src="/images/logo.png"
                            width={202.67}
                            height={76.1}
                            style={{ objectFit: "contain" }}
                            alt=""
                        />
                    </div>
                    <div className="col-4 text-end">
                        <p>Terms and Conditions | Privacy Policy</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
