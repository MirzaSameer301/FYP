import React from "react";
import { Check, X } from "lucide-react";

const DetectionResults = ({ lesionTypes, detectionResults }) => {
  const keys = Object.keys(detectionResults || {});
  if (keys.length === 0) return null;

  return (
    <div className="bg-background rounded-2xl md:rounded-3xl shadow-xl border border-tertiary/20 p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-light mb-4">
        Detection Results
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
        {lesionTypes.map((lesion) => {
          const res = detectionResults[lesion.id];
          if (!res) return null;
          // console.log(res);

          return (
            <div
              key={lesion.id}
              className="bg-secondary rounded-xl p-3 md:p-4 border border-tertiary/20"
            >
              {/* STATUS + ICON */}
              <div
                className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-lg bg-gradient-to-br 
              ${lesion.color} flex items-center justify-center"
              >
                {res.detected ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <X className="w-5 h-5 text-white" />
                )}
              </div>

              {/* PREVIEWS */}
              <div className="mt-3 space-y-3">
                {/* Mask Preview */}
                <div className="bg-secondary rounded-xl p-4 md:p-6 border border-tertiary/20">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-light font-semibold text-sm md:text-base">
                        {lesion.name}
                      </h4>
                      <p className="text-tertiary text-xs md:text-sm">
                        {res.status ? "Detected" : "Not Detected"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl md:text-2xl font-bold text-primary">
                        {res.confidence?? "-"}%
                      </p>
                      <p className="text-tertiary text-xs">Confidence/Area Covered</p>
                    </div>
                  </div>

                  <div className="flex w-full justify-between items-center gap-6 flex-col lg:flex-row">
                    <div>
                      {res.mask && (
                        <div className="flex flex-col gap-2 items-center mt-2">
                          <h4 className="text-light text-lg">Mask</h4>
                          <div className="h-56 rounded-md md:h-64 md:w-80 overflow-hidden">
                            <img
                              src={res.mask}
                              alt={`${lesion.name} mask`}
                              className="w-full h-full object-fit"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      {res.labeled && (
                        <div className="flex flex-col gap-2 items-center mt-2">
                          <h4 className="text-light text-lg">Labeled</h4>
                          <div className="h-56 rounded-md md:h-64 md:w-80 overflow-hidden">
                            <img
                              src={res.labeled}
                              alt={`${lesion.name} labeled`}
                              className="w-full h-full object-fit"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      {res.heatmap && (
                        <div className="flex flex-col gap-2 items-center mt-2">
                          <h4 className="text-light text-lg">Heatmap</h4>
                          <div className="h-56 rounded-md md:h-64 md:w-80 overflow-hidden">
                          <img
                            src={res.heatmap}
                            alt={`${lesion.name} heatmap`}
                            className="w-full h-full object-fit"
                          />
                        </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetectionResults;
