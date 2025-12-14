import React, { useState, useEffect } from "react";
import { cards } from "../lib/links.js";
const LesionSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % cards.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPaused, cards.length]);

  const getCardStyle = (index) => {
    const diff = (index - activeIndex + cards.length) % cards.length;

    if (diff === 0) {
      return {
        transform: "translateX(0) scale(1)",
        opacity: 1,
        zIndex: 30,
        filter: "blur(0px)",
      };
    } else if (diff === 1 || diff === cards.length - 1) {
      const isRight = diff === 1;
      return {
        transform: `translateX(${isRight ? "70%" : "-70%"}) scale(0.75)`,
        opacity: 0.5,
        zIndex: 20,
        filter: "blur(2px)",
      };
    } else {
      return {
        transform: "translateX(0) scale(0.5)",
        opacity: 0,
        zIndex: 10,
        filter: "blur(4px)",
      };
    }
  };

  return (
    <section className="min-h-screen bg-light flex items-center justify-center p-8">
      <div className="w-full ">
        <div className="flex flex-col items-center gap-2 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-left text-secondary">
            Skin Lesion Types
          </h2>
          <p className="text-primary text-lg">
            Discover the different skin lesion types our AI can detect and
            analyze.
          </p>
        </div>
        <div className="relative h-[28rem] flex items-center justify-center overflow-hidden">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="absolute transition-all duration-700 ease-in-out"
              style={getCardStyle(index)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="bg-background rounded-[10%_10%_10%_10%] w-80 md:w-96 h-96 md:h-[28rem] shadow-2xl flex flex-col items-center justify-center p-8 border-2 border-light hover:border-secondary cursor-pointer">
                <div className="text-center items-center flex flex-col">
                  <div className="overflow-hidden rounded-4xl border-2 border-secondary mb-6 h-48 md:h-56 w-48 md:w-56 flex items-center justify-center">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-light mb-4">
                    {card.id}. {card.title}
                  </h3>
                  <p className="text-tertiary text-sm ">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-secondary w-8"
                  : "bg-tertiary hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LesionSlider;
