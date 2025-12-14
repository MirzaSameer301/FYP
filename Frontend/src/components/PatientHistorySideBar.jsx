import React from 'react';
import { Search, Filter, X } from 'lucide-react';

const PatientHistorySidebar = ({
  sidebarOpen,
  setSidebarOpen,
  searchTerm,
  setSearchTerm,
  filterAge,
  setFilterAge,
  sortBy,
  setSortBy
}) => {
  return (
    <div
      className={`fixed lg:relative inset-0 lg:inset-auto lg:w-[300px] bg-background border-r border-tertiary/20 z-40 
      transform transition-transform duration-300 
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
      overflow-y-auto`}
    >
      {/* Close Button (Mobile Only) */}
      <div className="lg:hidden flex items-center mt-16 justify-between p-4 border-b border-tertiary/20">
        <h2 className="text-lg font-bold text-light flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          Filters
        </h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-tertiary hover:text-light"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4 md:p-6 space-y-6">
        {/* Search */}
        <div>
          <label className="block text-tertiary text-xs md:text-sm font-medium mb-3">
            Search Patient
          </label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-tertiary" />
            <input
              type="text"
              placeholder="Enter name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 md:pl-11 pr-4 py-2.5 md:py-3 bg-secondary border border-tertiary/20 rounded-xl 
                text-light placeholder-tertiary focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-tertiary/20" />

        {/* Age Filter */}
        <div>
          <label className="block text-tertiary text-xs md:text-sm font-medium mb-3">
            Filter by Age
          </label>
          <input
            type="number"
            placeholder="Enter age"
            value={filterAge}
            onChange={(e) => setFilterAge(e.target.value)}
            className="w-full px-4 py-2.5 md:py-3 bg-secondary border border-tertiary/20 rounded-xl 
              text-light placeholder-tertiary focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-tertiary/20" />

        {/* Sort Options */}
        <div>
          <label className="block text-tertiary text-xs md:text-sm font-medium mb-3">
            Sort By
          </label>

          <div className="space-y-2">
            {[
              { value: 'dateNewest', label: 'Date (Newest)' },
              { value: 'dateOldest', label: 'Date (Oldest)' },
              { value: 'nameAZ', label: 'Name (A-Z)' },
              { value: 'nameZA', label: 'Name (Z-A)' },
              { value: 'ageYoung', label: 'Age (Young)' },
              { value: 'ageOld', label: 'Age (Old)' }
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-light text-sm md:text-base group-hover:text-primary transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-tertiary/20" />

        {/* Reset Button */}
        <button
          onClick={() => {
            setSearchTerm('');
            setFilterAge('');
            setSortBy('dateNewest');
          }}
          className="w-full bg-gradient-to-r from-primary to-light text-secondary px-4 py-2.5 md:py-3 
            rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 
            text-sm md:text-base"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default PatientHistorySidebar;
