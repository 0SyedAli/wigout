import Image from "next/image";

export default function HowItWorks() {
  return (
    <section className="py-5 ">
      <div className="container">
        <div className="text-center">
          <h2 className="how-title mb-2">How It Works</h2>
          <p className="text-muted mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>

        <div className="row">
          {["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"].map(
            (item, i) => (
              <div className="col-md-3 mb-4" key={i}>
                <div className="how-card">
                  <Image
                    src="/images/hiw-img1.png"
                    width={56}
                    height={56}
                    alt=""
                  />
                  <h5 >{item}</h5>
                  <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
                  </p>
                </div>
              </div>
            )
          )}
        </div>

      </div>
    </section>
  );
}
