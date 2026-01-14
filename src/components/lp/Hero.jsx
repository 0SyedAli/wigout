export default function Hero() {
  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-md-6">
            <h1 className="display-5">
              Where Should I Eat,<br />
              Where Should I Sleep?
            </h1>

            <p className="mt-4">
              Sed ut perspiciatis unde omnis iste natus error sit
              voluptatem accusantium doloremque laudantium.
            </p>

            <button className="hero-btn mt-3">
              Get Started →
            </button>
          </div>

          <div className="col-md-6 text-center">
            <img
              src="/images/banner-right-img.png"
              className="img-fluid hero_img"
              alt="App Preview"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
