import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react';
import {navLinks} from '../lib/links.js';
const Footer = () => {

  const socialLinks = [
    { icon: Facebook, link: '#', label: 'Facebook' },
    { icon: Twitter, link: '#', label: 'Twitter' },
    { icon: Instagram, link: '#', label: 'Instagram' },
    { icon: Linkedin, link: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gradient-to-br from-secondary via-background to-secondary text-light">
      <div className="mx-auto px-4 pt-12">
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-light to-tertiary rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-light to-primary bg-clip-text text-transparent">
                LesionVision
              </h3>
            </div>
            <p className="text-tertiary text-sm leading-relaxed">
              AI-powered skin lesion detection and analysis platform. Empowering early detection and better healthcare outcomes through advanced technology.
            </p>
          
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-tertiary hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-200" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

  
          <div>
            <h4 className="text-lg font-bold mb-4 text-primary">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-tertiary">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a href="mailto:support@lesionvision.com" className="hover:text-primary transition-colors">
                    support@lesionvision.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-tertiary">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Phone</p>
                  <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-tertiary">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Address</p>
                  <p>123 Health Tech Ave<br />NUML Islamabad, Pakistan </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      
        <div className="border-t border-slate-700 pt-6 mb-6">
          <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-primary">
            <p className="text-xs text-tertiary leading-relaxed">
              <span className="font-bold text-primary">⚠️ Medical Disclaimer:</span> LesionVision is an AI-powered analysis tool designed to assist in skin lesion detection. This platform is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified healthcare provider with any questions regarding a medical condition. Never disregard professional medical advice or delay seeking it because of information provided by this service.
            </p>
          </div>
        </div>

        <div className="border-t pb-4 border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-light">
            © {new Date().getFullYear()} LesionVision. All rights reserved.
          </p>
          <p className="text-sm text-light flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for better healthcare
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;