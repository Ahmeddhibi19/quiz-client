"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { navVariants } from "../app/animations";
import Image from "next/image";
import logo from "../../public/logo.png";
import menu from "../../public/menu.svg";
import close from "../../public/close.svg";
import { navLinks as defaultNavLinks } from "../utils";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { logout } from "@/redux/AuthSlice";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);



  const navLinks = isAuthenticated
    ? [
        ...defaultNavLinks,
        {
          id: "logout",
          title: "Logout",
        },
      ]
    : defaultNavLinks;

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logged out");
    dispatch(logout())
  };

  return (
    <motion.nav
      className="w-full flex py-6 justify-between items-center navbar"
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <Image src={logo} alt="hoobank" width={66} height={66} loading="eager" className="object-contain rounded-lg" />
      <h1 className="font-poppins font-semibold ss:text-[58px] text-[45px] text-white ss:leading-[100.8px] leading-[75px] ml-2 ">
        Click & Win
      </h1>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] hover:text-secondary ${
              active === nav.title ? "text-secondary" : "text-white"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => {
              setActive(nav.title);
              if (nav.id === "logout") {
                handleLogout();
              }
            }}
          >
            <a href={nav.id !== "logout" ? `#${nav.id}` : ""}>{nav.title}</a>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <Image
          src={toggle ? close : menu}
          alt="menu"
          width={28}
          height={28}
          priority={true}
          className="object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-50`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-secondary" : "text-white"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => {
                  setActive(nav.title);
                  if (nav.id === "logout") {
                    handleLogout();
                  }
                }}
              >
                <a href={nav.id !== "logout" ? `#${nav.id}` : "#"}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
