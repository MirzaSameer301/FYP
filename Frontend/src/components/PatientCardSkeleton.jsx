import React from 'react'

const PatientCardSkeleton = () => {
  return (
    <div className="bg-background rounded-2xl shadow-lg border border-tertiary/20 p-4 animate-pulse">
      <div className="h-48 md:h-56 bg-secondary/30 rounded-xl mb-4"></div>

      <div className="h-4 bg-secondary/30 rounded w-2/3 mb-2"></div>
      <div className="h-3 bg-secondary/20 rounded w-1/3 mb-4"></div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-secondary/30 rounded-lg p-4"></div>
        <div className="bg-secondary/30 rounded-lg p-4"></div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-5 w-16 bg-secondary/30 rounded-full"></div>
        <div className="h-5 w-20 bg-secondary/30 rounded-full"></div>
      </div>

      <div className="h-10 bg-secondary/40 rounded-lg"></div>
    </div>
  );
}

export default PatientCardSkeleton


