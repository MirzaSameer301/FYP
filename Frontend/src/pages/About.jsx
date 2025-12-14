import React from 'react';
import { Microscope, Heart, Shield, Target, CheckCircle, TrendingUp } from 'lucide-react';
import { detections ,teamMembers} from '../lib/links';
import {Link} from 'react-router-dom';
import Team from '../components/Team';

const About = () => {
  return (
    <section className="min-h-screen bg-light">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-secondary via-background to-secondary text-light py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-light rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-light bg-clip-text text-transparent">
              About Us – LesionVision
            </h1>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p className="text-lg text-tertiary leading-relaxed">
                LesionVision is an AI-powered skin-lesion analysis platform designed to make early skin-health assessment simple, fast, and accessible. Using deep learning and a model trained on high-quality dermoscopic images, LesionVision analyzes uploaded images and identifies five important dermoscopic structures that are commonly used by dermatologists to assess skin lesions.
              </p>
              <p className="text-lg text-tertiary leading-relaxed">
                Our mission is to support early awareness by providing AI-assisted insights that help users understand their skin better and encourage timely medical consultation when needed.
              </p>
            </div>
            
            <div className="relative">
              <div className="relative w-full h-80 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl p-1 shadow-2xl">
                <div className="w-full h-full bg-secondary rounded-3xl flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <Microscope className="w-32 h-32 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold text-light mb-2">AI-Powered Analysis</h3>
                    <p className="text-tertiary">Advanced Deep Learning Technology</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We Detect Section */}
      <div className="max-w-6xl mx-auto py-20 px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            What LesionVision Detects
          </h2>
          <p className="text-lg text-primary max-w-4xl mx-auto leading-relaxed">
            Our deep learning model has been trained using dermoscopic patterns inspired by international dermatology datasets, enabling it to detect five key lesion structures that often appear in both benign and malignant lesions:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {detections.map((detection) => {
            const Icon = detection.icon;
            return (
              <div
                key={detection.id}
                className="bg-background rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-tertiary/20 hover:-translate-y-2"
              >
                <div className={`h-2 bg-gradient-to-r ${detection.color}`} />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${detection.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-tertiary">Structure {detection.id}</span>
                      <h3 className="text-xl font-bold text-light">{detection.name}</h3>
                    </div>
                  </div>
                  <p className="text-tertiary text-sm leading-relaxed">
                    {detection.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Team/>
      {/* CTA Section */}
      <div className="max-w-4xl mx-auto py-10 px-4 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Ready to Analyze Your Skin Health?
        </h3>
        <p className="text-lg text-tertiary mb-8">
          Start your AI-powered skin lesion analysis today
        </p>
        <Link to="/scan-lesion">
        <button className="cursor-pointer bg-gradient-to-r from-primary to-secondary text-light px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          Start Analysis Now →
        </button>
        </Link>
      </div>
    </section>
  );
};

export default About;