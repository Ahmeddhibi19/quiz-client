import Image from "next/image";
import HomePage from "@/components/homePage";
import GetStarted from "@/components/getStarted";
import Footer from "@/components/footer";
import Navbar from "@/components/navBar";
import HowItWorks from "@/components/howItWorks";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className=" gradient-background w-full overflow-hidden font-poppins">
      <header className="paddingX flexCenter">
        <nav className="boxWidth">
          <Navbar />
        </nav>
      </header>
      <section className=" gradient-background flexStart">
        <section className="boxWidth">
          <HomePage/>
          <section className="boxWidth paddingX">
            <HowItWorks/>
          </section>
          <section className="boxWidth paddingX">
          <GetStarted/>
          </section>
          <section className="boxWidth">
          <Testimonials/>
          </section>
          <section className="bg-black-gradient-2 px-10">
          <Footer/>
          </section>
         
        </section>
      </section>
    </main>
  );
}
