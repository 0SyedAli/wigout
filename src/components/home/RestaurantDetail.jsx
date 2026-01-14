import { GrLocation } from "react-icons/gr";
import { HiLocationMarker } from "react-icons/hi";

export default function RestaurantDetail() {
    return (
        <div className="rd-page">
            {/* Top hero image */}
            <div className="rd-hero">
                <img
                    src="/images/res_d_bg.png"
                    alt="Restaurant"
                    className="rd-hero-img"
                />
            </div>

            <div className="container rd-container">
                {/* Title row */}
                <div className="rd-title-row">
                    <h1 className="rd-title">Restaurant Name</h1>
                    <button className="rd-heart" aria-label="favorite">
                        ♡
                    </button>
                </div>

                <hr className="rd-divider" />

                {/* About */}
                <h3 className="rd-h3">About Events</h3>
                <p className="rd-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <p className="rd-text">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                </p>

                {/* Reviews & Ratings */}
                <div className="rd-reviews-wrap">
                    <div className="rd-left">
                        <h3 className="rd-h3 mb-3">Reviews &amp; Ratings</h3>

                        {/* Bars */}
                        <div className="d-flex align-items-center ">
                            <div className="rd-bars w-100">
                                {[
                                    { star: 5, pct: 100 },
                                    { star: 4, pct: 80 },
                                    { star: 3, pct: 60 },
                                    { star: 2, pct: 40 },
                                    { star: 1, pct: 20 },
                                ].map((b) => (
                                    <div className="rd-bar-row" key={b.star}>
                                        <div className="rd-star">{b.star}</div>
                                        <div className="rd-bar">
                                            <div className="rd-bar-fill" style={{ width: `${b.pct}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="rd-right">
                                <div>
                                    <div className="rd-stat">
                                        <div className="rd-stat-big">
                                            4.5 <span className="rd-gold">★</span>
                                        </div>
                                        <div className="rd-stat-small">273 Reviews</div>
                                    </div>

                                    <div className="rd-stat mt-4">
                                        <div className="rd-stat-big">88%</div>
                                        <div className="rd-stat-small">Recommended</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right stats */}

                </div>

                {/* Location */}
                <h3 className="rd-h3 mt-4">Location</h3>
                <div className="rd-location">
                    <span className="rd-pin"><HiLocationMarker /></span>
                    <span className="rd-location-text">
                        Grand City St. 100, New York, United States
                    </span>
                </div>

                <div className="rd-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96873.57748630887!2d-74.02723587791051!3d40.64533241914208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24416947c2109%3A0x82765c7404007886!2sBrooklyn%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1768326832609!5m2!1sen!2s" width="600" height="450" style={{ border: "0", width: "100%", height: "100%" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                {/* Map mock */}
                {/* <div className="rd-map">
          <div className="rd-map-pin">
            <div className="rd-map-pin-inner">
              <img src="/images/restaurant-thumb.jpg" alt="thumb" />
            </div>
          </div>
        </div> */}

                {/* Add Review */}
                <h3 className="rd-h3 mt-4">Add Review</h3>

                <div className="rd-review-box">
                    <input
                        className="rd-review-input"
                        placeholder="Write your detailed review"
                    />
                    <button className="rd-send" aria-label="send">
                        ➤
                    </button>
                </div>

                <div className="rd-actions">
                    <button className="rd-btn rd-btn-light">Avoid</button>
                    <button className="rd-btn rd-btn-dark">Go Again</button>
                </div>

                <div className="pb-5" />
            </div>
        </div>
    );
}
