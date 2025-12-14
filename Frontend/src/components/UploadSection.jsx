// src/components/UploadSection.jsx
import React from "react";
import { Upload } from "lucide-react";

const UploadSection = ({ imagePreview, onChangeFile }) => {
  return (
    <div className="bg-background rounded-2xl md:rounded-3xl shadow-xl border border-tertiary/20 p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-light mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        Upload Image
      </h2>

      <div className="border-2 border-dashed border-tertiary/30 rounded-xl p-6 md:p-8 text-center hover:border-primary transition-colors">
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={onChangeFile}
          className="hidden"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          {imagePreview ? (
            <div className="space-y-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 md:max-h-64 mx-auto rounded-lg shadow-lg"
              />
              <p className="text-primary font-semibold text-sm md:text-base">
                Click to change image
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 md:w-16 md:h-16 mx-auto text-tertiary" />
              <div>
                <p className="text-light font-semibold mb-1 text-sm md:text-base">
                  Click to upload
                </p>
                <p className="text-tertiary text-xs md:text-sm">
                  JPG, PNG or JPEG (MAX. 10MB)
                </p>
              </div>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default UploadSection;
