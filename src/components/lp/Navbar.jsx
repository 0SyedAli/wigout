import Image from "next/image";

export default function Navbar() {
    return (
        <section className="navbar-section pt-3">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-3">
                        <Image
                            src="/images/logo-white.png"
                            width={250.67}
                            height={100}
                            style={{ objectFit: "contain" }}
                            alt=""
                        />
                    </div>
                    <div className="col-3 text-end">
                        <button className="hero-btn mt-3">
                            Download App →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}