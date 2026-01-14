// "use client"
// import Image from "next/image";
// import { usePathname } from "next/navigation";

// export default function Navbar() {
//     const pathname = usePathname();
//     // ONLY landing "/" and home "/home"
//     const isLandingOrHome =
//         pathname === "/lp" || pathname === "/home";

//     return (
//         <section
//             className={`navbar-section  ${isLandingOrHome ? "detail-nav" : ""
//                 }`}
//         >
//             <div className="container">
//                 <div className="row justify-content-between">
//                     <div className="col-3">
//                         <Image
//                             src="/images/logo-white.png"
//                             width={202.67}
//                             height={76.1}
//                             style={{ objectFit: "contain" }}
//                             alt=""
//                         />
//                     </div>
//                     <div className="col-3 text-end">
//                         <button className="hero-btn mt-3">
//                             Download App →
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
    const pathname = usePathname();

    const isLandingPage = pathname === "/lp";
    const isHomePage = pathname === "/home";

    return (
        <section className={`navbar-section ${isLandingPage || isHomePage ? "detail-nav" : ""}`}>
            <div className="container">
                <div className="row align-items-center justify-content-between">

                    {/* LOGO */}
                    <div className="col-3">
                        <Link href="/home">
                            <Image
                                src="/images/logo-white.png"
                                width={202.67}
                                height={76.1}
                                alt="WIG Out"
                            />
                        </Link>
                    </div>

                    {/* MENU LINKS (ALWAYS VISIBLE) */}
                    {!isLandingPage && (
                        <div className="col-6 text-center">
                            <ul className="nav-menu">
                                <li><Link href="/home">HOME</Link></li>
                                <li><Link href="#!">DISCOVER</Link></li>
                                <li><Link href="#!">MY JOURNAL</Link></li>
                                <li><Link href="/lists">LISTS</Link></li>
                                <li><Link href="#!">HELP ME</Link></li>
                            </ul>
                        </div>
                    )}
                    {/* BUTTON (ONLY ON LP) */}
                    {isLandingPage && (
                        <div className="col-3 text-end">
                            <button className="hero-btn">
                                Download App →
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
