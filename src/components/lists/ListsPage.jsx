"use client";

import { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";

const DATA = {
    again: [
        { name: "Restaurant Name", location: "Grand Park, New York" },
        { name: "Beauty Salon", location: "Grand Park, New York" },
    ],
    avoid: [
        { name: "Hotel Name", location: "Grand Park, New York" },
        { name: "Cafe Name", location: "Grand Park, New York" },
    ],
    decide: [
        { name: "Bakery Name", location: "Grand Park, New York" },
        { name: "Restaurant Name", location: "Grand Park, New York" },
    ],
};

export default function ListsPage() {
    const [active, setActive] = useState("again");

    return (
        <>
            <section className="lists-page py-5">
                <div className="container">

                    {/* Title */}
                    <h1 className="rd-title lists-title text-center mb-4">LISTS</h1>

                    {/* Tabs */}
                    <div className="d-flex align-items-center">
                        <div className="lists-tabs mb-4">
                            <button
                                className={`lists-tab ${active === "again" ? "active" : ""}`}
                                onClick={() => setActive("again")}
                            >
                                Go Again
                            </button>

                            <button
                                className={`lists-tab ${active === "avoid" ? "active" : ""}`}
                                onClick={() => setActive("avoid")}
                            >
                                Avoid
                            </button>

                            <button
                                className={`lists-tab ${active === "decide" ? "active" : ""}`}
                                onClick={() => setActive("decide")}
                            >
                                Help Me Decide
                            </button>
                        </div>
                    </div>

                    {/* List */}
                    <div className="lists-wrapper">
                        {DATA[active].map((item, i) => (
                            <div className="list-card" key={i}>

                                <div className="list-left">
                                    <img
                                        src="/images/res-img1.png"
                                        alt={item.name}
                                        className="list-img"
                                    />

                                    <div>
                                        <div className="list-name">{item.name}</div>
                                        <div className="list-location">
                                            <span><HiLocationMarker /></span> {item.location}
                                        </div>
                                    </div>
                                </div>

                                <div className="list-actions">
                                    {active != "decide" && (
                                        <>
                                        <button className="btn btn-edit">Edit</button>
                                        <button className="btn btn-remove">Remove</button>
                                        </>
                                    )}
                                    <button className="btn btn-view">View Details</button>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </>

    );
}
