import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex pt-16">
        <Sidebar />
        
        <main className="flex-1 p-6 ml-60">
          {children}
        </main>
      </div>
    </div>
  );
}
