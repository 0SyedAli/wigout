import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-md-6" data-aos="fade-up">
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

          <div className="col-md-6 text-center" data-aos="fade-left">
            <div className="position-relative">
              <div className="shape-blob" style={{ top: '-20%', right: '-10%', background: 'rgba(255, 255, 255, 0.1)' }}></div>
              <Image
                src="/images/banner-right-img.png"
                width={445}
                height={445}
                className="img-fluid hero_img animate-float-slow"
                alt="App Preview"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
