"use client";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Modal from "./components/ui/Modal";

export default function Home() {
  return (
    <main className="flex flex-row min-h-screen w-full max-h-screen">
      <Sidebar />
      <MainContent />
      <Modal />
    </main>
  );
}
