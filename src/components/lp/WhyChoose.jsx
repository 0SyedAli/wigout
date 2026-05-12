export default function WhyChoose() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-md-6">
            <h2 className="why-title mb-4" data-aos="fade-up">Why Choose W.I.G Out</h2>

            <ul className="why-list list-unstyled">
              <li data-aos="fade-up" data-aos-delay="100">
                <strong>Lorem Ipsum Dummy</strong>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et aliqua.</p>
              </li>
              <li data-aos="fade-up" data-aos-delay="200">
                <strong>Lorem Ipsum Dummy</strong>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et aliqua.</p>
              </li>
              <li data-aos="fade-up" data-aos-delay="300">
                <strong>Lorem Ipsum Dummy</strong>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et aliqua.</p>
              </li>
            </ul>
          </div>

          <div className="col-md-6 text-center" data-aos="fade-left">
            <img
              src="/images/lp-3.png"
              className="img-fluid animate-float-slow"
              alt="Why Choose"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
