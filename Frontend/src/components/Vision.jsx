import React from 'react'
import { Heart, Shield, CheckCircle } from 'lucide-react';

const stats = [
  { id: 1, value: "5", label: "Key Structures",  },
  { id: 2, value: "AI", label: "Deep Learning" },
  { id: 3, value: "Fast", label: "Analysis",  },
  { id: 4, value: "24/7", label: "Accessible", }
];

const Vision = () => {
  return (
    <section>
      <div className="bg-light py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT SIDE */} 
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-light rounded-3xl blur-2xl opacity-20" />
                <div className="relative bg-background rounded-3xl p-8  border border-tertiary/20">
                  
                  {/* USING MAP HERE */}
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((item) => (
                      <div
                        key={item.id}
                        className="text-center p-6 bg-gradient-to-br from-light to-background rounded-2xl border border-tertiary/20"
                      >
                        <div className={`text-4xl font-bold mb-2 text-secondary`}>
                          {item.value}
                        </div>
                        <p className="text-sm text-light font-medium">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6">
                Our Vision
              </h2>

              <p className="text-lg text-primary leading-relaxed mb-6">
                We aim to make skin-health awareness accessible for everyone through the power of AI. 
                By combining cutting-edge deep learning with real dermoscopic knowledge, LesionVision 
                supports early detection and encourages users to stay proactive about their skin health.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full shadow-md border border-tertiary/20">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-semibold text-light">Patient-Centered</span>
                </div>

                <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full shadow-md border border-tertiary/20">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-light">Secure & Private</span>
                </div>

                <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full shadow-md border border-tertiary/20">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-semibold text-light">Clinically Inspired</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Vision;
