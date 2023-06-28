import React from "react";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div>
      <aside className="sidebar">
        <ul>
          <li>
            <a href="/settings">Settings</a>
          </li>
          <li>
            <a href="/Courses">My Courses</a>
          </li>
          <li>
            <a href="/messages">Messages</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
