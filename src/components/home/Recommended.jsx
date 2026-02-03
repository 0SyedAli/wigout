import Link from "next/link";

const items = Array(3).fill(0);

export default function Recommended() {
    return (
        <section className="py-5">
            <div className="container">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="section-title">Recommended</h2>
                    <a href="#" className="see-all">See All</a>
                </div>

                <div className="row">
                    {items.map((_, i) => (
                        <div className="col-md-4 mb-4" key={i}>
                            <Link href="/home/12">
                                <div className="place-card">
                                    <img
                                        src="/images/res-img1.png"
                                        className="img-fluid"
                                    />
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <div className="p-2">
                                            <div className="place-name">Restaurant Name</div>
                                            <div className="place-location">📍 Grand Park, New York</div>
                                        </div>
                                        <div className="heart">♡</div>
                                    </div>
                                </div>
                            </Link >
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
