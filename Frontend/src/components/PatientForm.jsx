// src/components/PatientForm.jsx
import React from "react";
import { User, Phone, Calendar, FileText, Mars } from "lucide-react";

const PatientForm = ({ patientData, onChange, onSaveReport }) => {
  return (
    <div className="bg-background rounded-2xl md:rounded-3xl shadow-xl border border-tertiary/20 p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-light mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        Patient Information
      </h2>

      <div className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-tertiary text-xs md:text-sm font-medium mb-2">Full Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-tertiary" />
            <input
              type="text"
              name="name"
              value={patientData.name}
              onChange={onChange}
              placeholder="Enter patient name"
              className="w-full pl-10 md:pl-11 pr-4 py-2.5 md:py-3 bg-secondary border border-tertiary/20 rounded-xl text-light placeholder-tertiary focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
            />
          </div>
        </div>

        <div>
          <label className="block text-tertiary text-xs md:text-sm font-medium mb-2">Age *</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-tertiary" />
            <input
              type="number"
              name="age"
              value={patientData.age}
              onChange={onChange}
              placeholder="Enter age"
              className="w-full pl-10 md:pl-11 pr-4 py-2.5 md:py-3 bg-secondary border border-tertiary/20 rounded-xl text-light placeholder-tertiary focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
            />
          </div>
        </div>

        <div>
          <label className="block text-tertiary text-xs md:text-sm font-medium mb-2">Contact Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-tertiary" />
            <input
              type="tel"
              name="contact"
              value={patientData.contact}
              onChange={onChange}
              placeholder="Enter contact number"
              className="w-full pl-10 md:pl-11 pr-4 py-2.5 md:py-3 bg-secondary border border-tertiary/20 rounded-xl text-light placeholder-tertiary focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
            />
          </div>
        </div>
        <div>
          <label className="block text-tertiary text-xs md:text-sm font-medium mb-2">Gender *</label>
          <div className="relative">
          <Mars  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-tertiary" />
          <select
            name="gender"
            value={patientData.gender}
            required
            onChange={onChange}
          className="w-full pl-10 md:pl-11 pr-4 py-2.5 md:py-3 bg-secondary border border-tertiary/20 rounded-xl text-tertiary placeholder-tertiary focus:outline-none focus:border-primary transition-colors text-sm md:text-base">
            <option value="" disabled>
              Select gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select> 
          </div>
        </div>

        <button
          onClick={onSaveReport}
          className="w-full bg-gradient-to-r from-light to-tertiary text-secondary px-4 md:px-6 py-3 md:py-4 rounded-xl font-bold shadow-md  hover:shadow-lg cursor-pointer hover:-translate-y-0.5 transform transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base"
        >
          Save Report
        </button>
      </div>
    </div>
  );
};

export default PatientForm;
