import React from "react";
import Image from "next/image";
import menuBurger from "../../assets/menu_burger.svg";
import homeIcon from "../../assets/home.svg";
import noteIcon from "../../assets/note.svg";

const Sidebar = () => {
  return (
    <div className="w-[117px] bg-white h-screen flex flex-col items-center drop-shadow-2xl">
      <div className="py-[50px] mb-[44px]">
        <Image src={menuBurger} alt="burger_svg" />
      </div>

      <div className="flex flex-col gap-y-[45px]">
        <Image src={homeIcon} alt="home_icon" />
        <Image src={noteIcon} alt="note_icon" />
      </div>
    </div>
  );
};

export default Sidebar;
