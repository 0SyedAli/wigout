"use client";
import { getCookie } from 'cookies-next';
import { useEffect, useState } from "react";

function getUserFromCookie() {
  const userCookie = getCookie('data');
  if (!userCookie) return null;

  try {
    return JSON.parse(userCookie);
  } catch (err) {
    console.error('Failed to parse user cookie');
    return null;
  }
}


export default function Topbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserFromCookie());
  }, []);

  return (
    <div className="admin-topbar">
      <div className="topbar-left">
        <h5 className="mb-0">
          Welcome Back, {user?.fullName || "User"}{" "}
          <span className="wave">👋</span>
        </h5>
        <small>
          Hello {user?.fullName || "User"}, Hope You Fine
        </small>
      </div>

      {user && (
        <div className="topbar-right">
          <div className="admin-avatar">
            <img
              src={
                user.profile
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${user.profile}`
                  : "/images/chat_avatar.jpg"
              }
              alt="profile"
              className="topbar-avatar"
              onError={(e) => {
                e.currentTarget.src = "/images/chat_avatar.jpg";
              }}
            />

            <div className="avatar-text">
              <h5 className="mb-0">{user.fullName}</h5>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
