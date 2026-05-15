import Image from "next/image";

export default function About() {
  return (
    <section className="about-section py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center mb-4 mb-md-0" data-aos="fade-right">
            <div className="position-relative">
              <div className="shape-blob" style={{ bottom: '-10%', left: '-10%' }}></div>
              <Image
                src="/images/lp-2.jpg"
                width={400}
                height={450}
                className="img-fluid animate-float rounded-4"
                alt="About WIG Out"
              />
            </div>
          </div>

          <div className="col-md-6" data-aos="fade-left">
            <h2>About W.I.G Out</h2>
            <p className="mt-3">
              Hello, my name is Kerrie Dewey, I don't know about you but remembering everywhere my husband and I go is sometimes way more difficult than we would think it is. Which restaurants we've tried and which ones we haven’t. What we ate or did they have my favorite salad dressing? And what was our server’s name at that new place we tried? These questions came up every time we decided to go out and not only restaurants. My husband's job takes him away from home so if we want to see each other throughout the week I get a hotel room nearby. But which hotel was clean and which one had good water pressure? Or all those small cafes, or mini vacation getaways. It’s hard remembering it all. One day I told my husband, “there should be an app that reminds you of where you’ve been and if you liked it or hated it.” And so the idea was born!
            </p>
            <p>
              I am blessed to be married to the most amazing man! His love and support, along with my family’s patients during this stressful and chaotic year are why my idea became a reality, an actual app. Thank you all so much for believing in me! And to all that download this app, thank you and i hope it helps you as much as it is helping us!
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
