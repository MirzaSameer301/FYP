// src/components/DetectionButtons.jsx
import React from "react";

const DetectionButtons = ({ imagePreview, lesionTypes, onDetect, onDetectAll, isDetecting }) => {
  return (
    <div className="bg-background rounded-2xl md:rounded-3xl shadow-xl border border-tertiary/20 p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-light mb-4">Detect Lesions</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 mb-4">
        {lesionTypes.map((lesion) => (
          <button
            key={lesion.id}
            onClick={() => onDetect(lesion.id)}
            disabled={!imagePreview || isDetecting}
            className={`w-full bg-gradient-to-r ${lesion.color} text-light px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transform transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-sm md:text-base`}
          >
            {lesion.name}
          </button>
        ))}
      </div>

      <button
        onClick={onDetectAll}
        disabled={!imagePreview || isDetecting}
        className="w-full bg-gradient-to-r from-primary to-light text-secondary px-4 md:px-6 py-3 md:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm md:text-base"
      >
        {isDetecting ? "Detecting..." : "Detect All Lesions"}
      </button>
    </div>
  );
};

export default DetectionButtons;
