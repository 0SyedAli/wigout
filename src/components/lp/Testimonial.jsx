"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Alex Charles",
    role: "Chief Branding Producer",
    image: "/images/testi-user1.png",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Sophia Miller",
    role: "UX Designer",
    image: "/images/testi-user1.png",
    text:
      "m ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Daniel Roberts",
    role: "Product Manager",
    image: "/images/testi-user1.png",
    text:
      "m ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

export default function Testimonial() {
  return (
    <section className="testimonial-section">
      <div className="testimonial-bg"></div>

      <div className="container position-relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".testimonial-next",
            prevEl: ".testimonial-prev",
          }}
          slidesPerView={1}
          loop
          autoplay
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="row align-items-center">
                
                {/* Image */}
                <div className="col-md-4 text-center">
                  <div className="testimonial-image ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="col-md-7 testimonial-content">
                  <h3 className="testimonial-name">{item.name}</h3>
                  <div className="testimonial-role">{item.role}</div>
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-text">{item.text}</p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrows */}
        <div className="testimonial-arrow testimonial-prev">←</div>
        <div className="testimonial-arrow testimonial-next">→</div>
      </div>
    </section>
  );
}
