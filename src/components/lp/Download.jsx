export default function Download() {
  return (
    <section className="download-section py-5 mt-5" >
      <div className="container">
        <div className="row align-items-center">

          <div className="col-md-6">
            <h2>
              Download the App<br />& Start Your Journey
            </h2>

            <p className="mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et aliqua.
            </p>

            <div className="d-flex gap-3 mt-4">
              <img src="/images/app-store-icon.png" height="45" />
              <img src="/images/googleplay.png" height="45" />
            </div>
          </div>

          <div className="col-md-4 text-center mt-4 mt-md-0">
            <img
              src="/images/banner-right-img.png"
              className="img-fluid"
              alt="Download"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
