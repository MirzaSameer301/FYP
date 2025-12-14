import React, { useState, useMemo, useEffect } from "react";
import { Search, Filter, Eye, X, Menu } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPatients } from "../store/patientsSlice";
import PatientHistorySidebar from "../components/patientHistorySideBar";
import ReportView from "./ReportView";
import PatientCardSkeleton  from "../components/PatientCardSkeleton";

const PatientHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("dateNewest");
  const [filterAge, setFilterAge] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const { patientsData, loading } = useSelector((state) => state.patients);
  const dispatch = useDispatch();
    //get patient history //
  useEffect(() => {
    dispatch(getPatients(user._id));
  }, [dispatch]);

  // console.log("Patients Data:", patientsData);
  const filteredAndSortedPatients = useMemo(() => {
    let filtered = patientsData.filter((patient) => {
      const nameMatch = patient.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const ageMatch =
        filterAge === "" || patient.patientAge.toString() === filterAge;
      return nameMatch && ageMatch;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "nameAZ":
          return a.patientName.localeCompare(b.patientName);
        case "nameZA":
          return b.patientName.localeCompare(a.patientName);
        case "dateNewest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "dateOldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "ageYoung":
          return a.patientAge - b.patientAge;
        case "ageOld":
          return b.patientAge - a.patientAge;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterAge, sortBy, patientsData]);

  const getDetectedLesions = (lesions) => {
    return Object.entries(lesions)
      .filter(([_, data]) => data.status)
      .map(([key, _]) => key);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-light">
      <div className="flex flex-col lg:flex-row">
        <PatientHistorySidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterAge={filterAge}
          setFilterAge={setFilterAge}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Main Content */}
        <div className="flex-1 py-8 md:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header with Mobile Menu Button */}
            <div className="flex flex-col justify-between gap-4 mb-8 md:mb-12">
              <div className="flex flex-col gap-2 items-center justify-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-2">
                  Patient History
                </h1>
                <p className="text-primary text-base md:text-lg">
                  View and manage patient lesion analysis records
                </p>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden flex items-center gap-2 bg-background border border-tertiary/20 text-light px-4 py-2 rounded-xl hover:bg-secondary transition-colors"
              >
                <Menu className="w-5 h-5" />
                Filters
              </button>
            </div>

            {/* Patient Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <PatientCardSkeleton key={i} />
                  ))
                : filteredAndSortedPatients.map((patient) => {
                    const detectedLesions = getDetectedLesions(patient.lesions);

                    return (
                      <div
                        key={patient._id}
                        className="bg-background rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-tertiary/20 hover:-translate-y-2"
                      >
                        {/* Image Section */}
                        <div className="relative h-48 md:h-56 bg-gradient-to-br from-secondary to-background overflow-hidden">
                          <img
                            src={patient.patientLesionImage}
                            alt={patient.patientName}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-primary/90 px-3 py-1 rounded-full text-xs md:text-sm font-semibold text-white">
                            {detectedLesions.length} Lesions
                          </div>
                        </div>

                        {/* Info Section */}
                        <div className="p-4 md:p-6">
                          <h3 className="text-lg md:text-xl font-bold text-light mb-1 truncate">
                            {patient.patientName}
                          </h3>
                          <p className="text-tertiary text-xs md:text-sm mb-4">
                            {formatDate(patient.createdAt)}
                          </p>

                          {/* Patient Details Grid */}
                          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                            <div className="bg-secondary rounded-lg p-2.5 md:p-3">
                              <p className="text-tertiary text-xs mb-1">Age</p>
                              <p className="text-light font-semibold text-sm md:text-base">
                                {patient.patientAge}
                              </p>
                            </div>
                            <div className="bg-secondary rounded-lg p-2.5 md:p-3">
                              <p className="text-tertiary text-xs mb-1">
                                Gender
                              </p>
                              <p className="text-light font-semibold text-sm md:text-base">
                                {patient.patientGender}
                              </p>
                            </div>
                          </div>

                          {/* Detected Lesions */}
                          <div className="mb-4 min-h-20">
                            <p className="text-tertiary text-xs mb-2">
                              Detected Lesions:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {detectedLesions.length > 0 ? (
                                detectedLesions.map((lesion) => (
                                  <span
                                    key={lesion}
                                    className="bg-primary/20 text-light text-xs px-2 py-1 rounded-full font-medium"
                                  >
                                    {lesion.charAt(0).toUpperCase() +
                                      lesion.slice(1)}
                                  </span>
                                ))
                              ) : (
                                <span className="text-tertiary text-xs italic">
                                  No lesions detected
                                </span>
                              )}
                            </div>
                          </div>

                          <Link
                            to={"/view-report/" + patient._id}
                            className="w-full cursor-pointer bg-gradient-to-r from-primary to-light text-secondary px-4 py-2.5 md:py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                          >
                            <Eye className="w-4 h-4 md:w-5 md:h-5" />
                            View Full Report
                          </Link>
                        </div>
                      </div>
                    );
                  })}
            </div>

            {/* Results Count */}
            <div className="mt-8 text-center">
              <p className="text-primary text-sm md:text-base">
                Showing{" "}
                <span className="text-secondary font-semibold">
                  {filteredAndSortedPatients.length}
                </span>{" "}
                of{" "}
                <span className="text-secondary font-semibold">
                  {patientsData.length}
                </span>{" "}
                patients
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
