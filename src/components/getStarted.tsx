"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


const GetStarted: React.FC = () => {
  const waveRefs = useRef<HTMLDivElement[]>([]);
const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (waveRefs.current) {
      waveRefs.current.forEach((wave, i) => {
        const delay = i * 0.2; // stagger the start times
        gsap.to(wave, {
          scale: 1.5,
          opacity: 0,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          delay,
          ease: "power1.inOut",
        });
      });
    }
  }, []);

  return (
    <section className="relative w-full h-[500px] flex justify-center items-center overflow-hidden" id="start">
      {Array(7)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="absolute border-4 border-[#42E3A8] rounded-[20px] shadow-2xl shadow-[#42E3A8] w-11/12 sm:w-5/5 lg:w-5/5 xl:w-2/5"
            ref={(el) => {
              if (el) waveRefs.current[index] = el;
            }}
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "800px",
              maxHeight: "300px",
              boxSizing: "border-box",
              padding: "1rem",
            }}
          />
        ))}
      <section
        className="flexCenter marginY padding sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] parent relative z-10 w-11/12 sm:w-5/5 lg:w-5/5 xl:w-2/5"
        id="getStarted"
        style={{ maxWidth: "900px", minHeight: "200px" }}
      >
        <div className="flex-1 flex flex-col text-center sm:text-left">
          <h2 className="heading2">Let&#8217;s try our service now!</h2>
          <p className="paragraph max-w-[470px] mt-5 mx-auto sm:mx-0">
          At Click & Win share your opinion with the world and earn money for each participation
          </p>
        </div>
        <Link href={`${isAuthenticated?"/quiz":"/login"}`} >

          <div className="flexCenter sm:ml-10 ml-0 sm:mt-0 mt-10">
            <button
              type="button"
              className="py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none mt-10"
            >
              Get Started
            </button>
          </div>
        </Link>
      </section>
    </section>
  );
};

export default GetStarted;
