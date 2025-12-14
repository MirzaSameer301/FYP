import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.jpg";
const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 bg-background text-light">
      <div className="md:w-1/2 flex flex-col gap-6 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Empowering <span className="text-secondary">Early Detection</span>{" "}
          with <span className="text-secondary">AI Precision</span>
        </h1>

        <p className="text-tertiary text-lg leading-relaxed">
          LesionVision leverages cutting-edge AI to help identify and classify
          skin lesions with remarkable accuracy — supporting healthcare
          professionals in early diagnosis and better outcomes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
          <Link
            to="/scan-lesion"
            className="shadow-md shadow-light text-secondary bg-light font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="border border-secondary text-secondary font-semibold px-6 py-3 rounded-lg hover:bg-secondary hover:text-light transition"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="md:w-1/2 flex max-h-[500px] justify-center md:justify-end mt-10 md:mt-0 ">
        <div className="md:w-[80%] border-light border-2 overflow-hidden shadow-secondary shadow-lg rounded-[40%_0_40%_0]">
          <img
            src={heroImage}
            alt="AI Detection Illustration"
            className=" object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
