"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  FaUserCircle,
  FaUsers,
  FaClipboardList,
  FaChartLine,
  FaSignOutAlt,
  FaBars,
  FaChevronLeft,
} from "react-icons/fa";
import { signOut } from "next-auth/react";
import { useSidebar } from "./SidebarContext";

const navSections = [
  {
    title: "MAIN",
    items: [
      { label: "Overview", icon: <FaChartLine />, href: "/dashboard" },
      { label: "Clients", icon: <FaUsers />, href: "/clients" },
      { label: "Mandates", icon: <FaClipboardList />, href: "/mandates" },
      { label: "Candidates", icon: <FaUsers />, href: "/candidates" },
    ],
  },
];

export default function Sidebar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { collapsed, setCollapsed } = useSidebar();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  return (
    <aside
      className={`h-screen bg-white border-r flex flex-col justify-between fixed left-0 top-0 z-30 transition-all duration-200 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      <div>
        {/* Logo and Collapse Button */}
        <div className="flex items-center px-6 py-4 border-b justify-between">
          <div className="flex items-center">
            <span className="font-bold text-xl text-blue-700">x</span>
            {!collapsed && (
              <>
                <span className="ml-2 font-bold text-xl text-blue-700">
                  to10x
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  Hiring Platform
                </span>
              </>
            )}
          </div>
          <button
            className="ml-2 text-gray-400 hover:text-blue-600 focus:outline-none"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <FaBars size={20} /> : <FaChevronLeft size={20} />}
          </button>
        </div>
        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          {navSections.map((section) => (
            <div key={section.title} className="mb-6">
              {!collapsed && (
                <div className="text-xs font-semibold text-gray-400 px-2 mb-2">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors mb-1 ${
                      collapsed ? "justify-center" : ""
                    }`}
                    tabIndex={0}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {!collapsed && (
                      <span className="ml-3 text-sm font-medium">
                        {item.label}
                      </span>
                    )}
                  </Link>
                  {collapsed && (
                    <span className="pointer-events-none absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-50 shadow-lg">
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>
      </div>
      {/* User Info & Logout Dropdown */}
      <div
        className={`px-6 py-4 border-t flex items-center relative ${
          collapsed ? "justify-center px-0" : ""
        }`}
      >
        <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-3">
          <span className="text-gray-600 font-bold">US</span>
        </div>
        {!collapsed && (
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">Demo User</div>
            <div className="text-xs text-gray-500">Senior Recruiter</div>
          </div>
        )}
        <button
          ref={userButtonRef}
          className="ml-2 text-gray-400 hover:text-blue-600 focus:outline-none"
          onClick={() => setDropdownOpen((open) => !open)}
        >
          <FaUserCircle size={20} />
        </button>
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className={`absolute ${
              collapsed ? "left-full ml-2 bottom-0" : "right-0 bottom-14"
            } w-40 bg-white border rounded shadow-lg z-40`}
          >
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => signOut()}
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
