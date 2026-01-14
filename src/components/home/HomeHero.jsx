export default function HomeHero() {
  return (
    <section className="home-hero d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-md-6">
            <h1>
              Where Should I Eat,<br />
              Where Should I Sleep?
            </h1>

            <p className="mt-4">
              Sed ut perspiciatis unde omnis iste natus error sit volp tatem accusantium veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>

            <button className="hero-btn mt-3">
              Get Started →
            </button>
          </div>

          <div className="col-md-6 text-center">
            <img
              src="/images/home-img1.png"
              className="img-fluid"
              alt="Hero"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
