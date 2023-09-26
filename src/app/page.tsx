"use client";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

export default function Home() {
  return (
    <main className="flex flex-row min-h-screen w-full">
      <Sidebar />
      <MainContent />
    </main>
  );
}
