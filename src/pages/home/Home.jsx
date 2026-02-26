import React from "react";
import { Hero } from "../../components/hero/Hero";
import { About } from "../about/About";
import { Services } from "../services/Services";
import { Classes } from "../classes/Classes";
import { Testimonials } from "../testimony/Testimony";
import { FAQ } from "../faq/Faq";
export const Home = () => {
  return (
    <>
      <div className="w-full bg-gradient-to-t from-[#1e4c9c] to-[#1e4c9c] text-white rounded-2xl">
        <Hero />
        <About/>
        <Services/>
        <Classes/>
        <Testimonials/>
        <FAQ/>
      </div>
    </>
  );
};
