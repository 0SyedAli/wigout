import Link from "next/link";

const items = Array(8).fill(0);

export default function DiscoverNearby() {
  return (
    <section className="py-5 bg-light">
      <div className="container">

        <h2 className="section-title mb-4">Discover Nearby</h2>

        <div className="row">
          {items.map((_, i) => (
            <div className="col-md-4 col-xl-3 mb-4" key={i}>
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
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
