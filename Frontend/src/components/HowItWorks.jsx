import React from "react";
import { steps } from "../lib/links.js";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";

const HowItWorks = () => {
  return (
    <section id="work" className="min-h-screen bg-gradient-to-br from-background via-secondary to-background py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-lg text-primary font-medium">
            Simple. Smart. Secure.
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-light mb-2 tracking-tight">
            How It Works
          </h2>
          <div className="w-full max-w-2xl mx-auto h-0.5 bg-gradient-to-r from-transparent via-light to-transparent mt-6" />
        </div>

        <div className="space-y-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isRight = step.position === "right";

            return (
              <div key={step.id} className="relative">
                <div
                  className={`flex ${
                    isRight ? "flex-row" : "flex-row-reverse"
                  } items-center gap-6 mb-12`}
                >
                  <div className="flex-shrink-0">
                    <div className="relative w-28 h-28 md:w-40 lg:w-56 md:h-40 lg:h-56 rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 p-1 shadow-2xl">
                      <div className="w-full h-full rounded-3xl bg-gradient-to-br from-light to-tertiary flex items-center justify-center">
                        <span className="text-4xl md:text-6xl lg:text-8xl font-bold text-secondary">
                          {step.id}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`absolute ${
                            isRight
                              ? "left-14 lg:left-28"
                              : "right-14 lg:right-28"
                          } top-full w-0.5 h-44 lg:h-16 bg-gradient-to-b from-cyan-400 to-blue-500 z-0`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1">
                    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-1 shadow-2xl border-2 border-transparent bg-clip-padding">
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 opacity-50 blur-sm" />
                      <div className="relative bg-secondary rounded-3xl p-3 md:p-6 lg:p-8">
                        <div
                          className={`flex items-center md:items-start gap-4 ${
                            isRight
                              ? "flex-col md:flex-row"
                              : "flex-col md:flex-row-reverse md:text-right"
                          }`}
                        >
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-secondary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold text-light mb-3">
                              {step.title}
                            </h3>
                            <p className="text-tertiary leading-relaxed text-sm">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Link
          to="/scan-lesion"
          className="flex text-lg items-center gap-2 shadow-md shadow-light text-secondary bg-light font-semibold px-6 py-3 rounded-lg hover:bg-tertiary transition"
        >
          Get Started Now <span className="animate-pulse"><MoveRight size={28}/></span>
        </Link>
      </div>
    </section>
  );
};

export default HowItWorks;
