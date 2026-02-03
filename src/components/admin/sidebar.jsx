"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { LuCalendarCheck, LuUserRound } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import { TbNotification } from "react-icons/tb";
import { MdOutlineAnalytics } from "react-icons/md";
import Image from "next/image";
import { FiSettings } from "react-icons/fi";

export default function StudentSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      icon: <AiOutlineHome size={17} />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <LuUserRound size={17} />,
      label: "User Management",
      path: "/dashboard/users",
    },
    {
      icon: <LuCalendarCheck size={17} />,
      label: "Establishments",
      path: "/dashboard/establishments",
    },
    {
      icon: <TbNotification size={17} />,
      label: "Categories",
      path: "/dashboard/categories",
    },
    {
      icon: <MdOutlineAnalytics size={17} />,
      label: "Ratings & Reviews",
      path: "/dashboard/reviews",
    },
    {
      icon: <MdOutlineAnalytics size={17} />,
      label: "Notifications",
      path: "/dashboard/notifications",
    },
    {
      icon: <MdOutlineAnalytics size={17} />,
      label: "Integrations",
      path: "/dashboard/integrations",
    },
    // {
    //   icon: <MdOutlineAnalytics size={17} />,
    //   label: "Analytics",
    //   path: "/dashboard/analytics",
    // },
    {
      icon: <MdOutlineAnalytics size={17} />,
      label: "System Settings",
      path: "/dashboard/settings",
    },
    {
      icon: <MdOutlineAnalytics size={17} />,
      label: "Support",
      path: "/dashboard/support",
    },
  ];

  const userMenuItems = [
    { icon: <IoLogOutOutline size={17} />, label: "Log out", path: "#!" },
  ];

  const isActive = (path) => pathname === path;
  const logout = (router) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // (safe even if not exists)
    }

    router.replace("/auth/login");
  };
  return (
    <div className="sidebar-container px-2">
      <div className="sidebar-header">
        <div className="sidebar-logo text-center">
          <Image src="/images/logo-white.png" width={200} height={150} className="img-fluid" alt="" />
        </div>
      </div>

      <ul className="list-unstyled list-unstyled2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`menu-item ${isActive(item.path) ? "active" : ""}`}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-title mt-2">OTHER</div>
      <ul className="list-unstyled ">
        {userMenuItems.map((item) => (
          <li key={item.path}>
            {/* <Link
              href={item.path}
              className={`menu-item ${isActive(item.path) ? "active" : ""}`}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link> */}

            <div
              className={`menu-item`}
              onClick={() => logout(router)}

            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}