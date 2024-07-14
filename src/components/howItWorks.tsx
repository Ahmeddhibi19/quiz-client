"use client"
import React from 'react'
import { motion } from "framer-motion";
import { slideIn } from '@/app/animations';

const HowItWorks = () => {
  return (
    <section className='w-full h-[700px] lg:h-[400px] flex justify-center items-center overflow-hidden mb-5' id="how">
        <motion.div 
         className="flex-1 flexStart flex-col xl:px-0 paddingX"
         variants={slideIn("left", "tween", 0.2, 1.5)}
         initial="hidden"
         whileInView="show"
         viewport={{ once: true }}
         >
            <h1 className='text-gradient text-[45px] font-poppins font-bold'>
                How it Works ?
            </h1>
        <p className=' paragraph'>
        Polling companies use our private consumer group to examine the needs and opinions of the population. In return, we pay our participants and share a portion of this income with panel members on our Click and Win mobile application. Your winnings are accumulated in your kitty, each survey carried out is paid, and you have the possibility of withdrawing your winnings in the form of a telephone balance or bank transfer. This way, you can generate income daily, all from the comfort of your home. We release new surveys every day, and the more you participate, the more survey opportunities you will have and the more you can earn. For any questions, do not hesitate to contact us.

        </p>
        </motion.div>

    </section>
  )
}

export default HowItWorks