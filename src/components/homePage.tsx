"use client";
import Image from "next/image";
import datacollection2 from '../../public/datacollection2.webp'
import { motion } from "framer-motion";
import { slideIn } from '@/app/animations';

const HomePage = () => {
  return (
    <section id="home" className="flex md:flex-row flex-col paddingY">
    <motion.div
      className="flex-1 flexStart flex-col xl:px-0 paddingX"
      variants={slideIn("left", "tween", 0.2, 1.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >

      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
          <span className="text-gradient">survey</span>{" "}
        </h1>
        <div className="ss:flex hidden md:mr-4 mr-0">
        </div>
      </div>

      <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
      is now digital
      </h1>
      <p className="paragraph max-w-[470px] mt-5">
      Click and Win is a Tunisian start-up certified for insight data based on technology, so follow us for more information and stay tuned to discover what's new soon...      </p>
    </motion.div>

    <motion.div
      className="flex-1 flexCenter md:my-0 my-10 relative"
      variants={slideIn("right", "tween", 0.2, 1.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <Image
        src={datacollection2}
        alt="logo"
        width={0}
        height={0}
        className="sm:w-[100%] w-[90%] sm:h-[100%] h-[90%] relative z-[5] img"
        priority={true}
      />

      {/* gradient start */}
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
      {/* gradient end */}
    </motion.div>

    <div className="ss:hidden flexCenter">
    </div>

  </section>
  )
}

export default HomePage