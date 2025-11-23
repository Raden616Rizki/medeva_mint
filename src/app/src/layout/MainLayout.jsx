import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  const showSidebar = false;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex pt-16">
        {showSidebar && <Sidebar />}

        <main className={`flex-1 p-6 transition-all ${showSidebar ? "ml-60" : "ml-0"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
