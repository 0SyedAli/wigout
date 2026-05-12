export default function HomeHero() {
  return (
    <section className="home-hero d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">

<div className="col-md-6" data-aos="fade-left">
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

          <div className="col-md-6 text-center" data-aos="fade-right">
            <div className="position-relative">
              <div className="shape-blob" style={{ top: '-10%', left: '-10%', background: 'rgba(255, 255, 255, 0.1)' }}></div>
              <img
                src="/images/home-img1.png"
                className="img-fluid animate-float-horizontal"
                alt="Hero"
              />
            </div>
          </div>

          

        </div>
      </div>
    </section>
  );
}
