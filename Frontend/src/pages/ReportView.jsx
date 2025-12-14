import React, { useEffect } from "react";
import { User, Download, X, Edit3, Trash2, FileText } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPatientById } from "../store/patientsSlice.js";
import { deletePatient, clearSelectedPatient } from "../store/patientsSlice.js";
import { toast } from "react-toastify";
import { showConfirmToast } from "../components/showConfirmToast.jsx";

const ReportView = () => {
  const { selectedPatient } = useSelector((state) => state.patients);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading } = useSelector((state) => state.patients);

  const handleDelete = () => {
    showConfirmToast(
      "Are you sure you want to delete this record?",
      async () => {
        const action = await dispatch(deletePatient(selectedPatient._id));

        if (action.meta.requestStatus === "fulfilled") {
          dispatch(clearSelectedPatient());
          toast.success("Patient record deleted");
          navigate("/history");
        } else {
          toast.error("Failed to delete");
        }
      }
    );
  };

  useEffect(() => {
    dispatch(getPatientById(id));
  }, [dispatch]);
console.log(selectedPatient);

  if (!selectedPatient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background py-8 md:py-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-light text-lg">No patient data available</p>
        </div>
      </div>
    );
  }

  const lesionNames = {
    streaks: "Streaks",
    globules: "Globules",
    pigmentNetwork: "Pigment Network",
    negativeNetwork: "Negative Network",
    miliaLikeCysts: "Milia-like Cysts",
  };

  const lesionColors = {
    streaks: "from-red-500 to-orange-500",
    globules: "from-blue-500 to-cyan-500",
    pigmentNetwork: "from-green-500 to-emerald-500",
    negativeNetwork: "from-purple-500 to-pink-500",
    miliaLikeCysts: "from-yellow-500 to-amber-500",
  };

  const detectedLesions = Object.entries(selectedPatient.lesions)
    .filter(([_, data]) => data.status)
    .map(([key, _]) => key);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="bg-background h-screen w-full flex items-center justify-center">
        <div className="loader">Loading...</div>
      </div>
    );
  }
  // --- add this helper right before the return (under detectedLesions or replace it) ---
  const detectedLesionEntries = Object.entries(
    selectedPatient.lesions || {}
  ).filter(([, data]) => data && data.maskImage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background py-8 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Report Box */}
        <div className="bg-background rounded-2xl md:rounded-3xl shadow-2xl border border-tertiary/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-light p-6 md:p-8 text-secondary">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Skin Lesion Analysis Report
                </h2>
                <p className="text-secondary/80 text-sm md:text-base">
                  LesionVision AI-Powered Detection
                </p>
              </div>
              <div className="text-5xl md:text-6xl">🔬</div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-8 space-y-6 md:space-y-8">
            {/* Patient Information */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-light mb-4 flex items-center gap-2">
                <User className="w-5 h-5 md:w-6 md:h-6 text-primary" /> Patient
                Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-secondary p-4 md:p-6 rounded-xl border border-tertiary/20">
                <div>
                  <p className="text-tertiary text-xs md:text-sm">Name</p>
                  <p className="text-light font-semibold">
                    {selectedPatient.patientName}
                  </p>
                </div>

                <div>
                  <p className="text-tertiary text-xs md:text-sm">Age</p>
                  <p className="text-light font-semibold">
                    {selectedPatient.patientAge} years
                  </p>
                </div>

                <div>
                  <p className="text-tertiary text-xs md:text-sm">Gender</p>
                  <p className="text-light font-semibold">
                    {selectedPatient.patientGender || "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-tertiary text-xs md:text-sm">Contact</p>
                  <p className="text-light font-semibold">
                    {selectedPatient.patientPhone}
                  </p>
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="bg-secondary rounded-xl p-4 border border-tertiary/20">
              <p className="text-tertiary text-sm">
                <span className="font-semibold text-light">
                  Report Generated:
                </span>{" "}
                {formatDate(selectedPatient.createdAt)}
              </p>
            </div>
            <p className="text-light font-semibold mb-2">Original Image</p>
            <div className="flex items-center justify-center">
              <img
                src={selectedPatient.patientLesionImage}
                className="rounded-xl h-64 md:h-72 object-contain border border-tertiary/10"
              />
            </div>

            {/* Detection Results */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-light mb-4">
                Detection Results ({detectedLesionEntries.length} Detected)
              </h3>

              {detectedLesionEntries.length === 0 ? (
                <p className="text-tertiary text-sm">
                  No lesion patterns were detected for this image.
                </p>
              ) : (
                <div className="space-y-6">
                  {detectedLesionEntries.map(([key, data]) => (
                    <div
                      key={key}
                      className="border border-tertiary/20 rounded-2xl overflow-hidden"
                    >
                      {/* Lesion Header */}
                      <div className="p-4 bg-secondary flex gap-4 items-center">
                        <div
                          className={`rounded-lg w-12 h-12 flex items-center justify-center bg-gradient-to-br ${lesionColors[key]}`}
                        >
                          <span className="text-white text-lg md:text-xl font-bold">
                            ✓
                          </span>
                        </div>

                        <div className="flex-1">
                          <h4 className="text-light font-bold">
                            {lesionNames[key]}
                          </h4>
                          <p className="text-tertiary text-xs">
                            Detected 
                          </p>
                        </div>

                        <p className="text-primary font-bold text-xl">
                          {data.confidence}%
                          <p className="text-tertiary text-xs">
                            Area Covered
                          </p>
                        </p>
                      </div>

                      {/* Images */}
                      <div className="bg-background border-t border-tertiary/20 p-4 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-light font-semibold mb-2">
                              Mask Output
                            </p>
                            <img src={data.maskImage} className="rounded-xl" />
                          </div>

                          <div>
                            <p className="text-light font-semibold mb-2">
                              Labeled Analysis
                            </p>
                            <img
                              src={data.labeledImage}
                              className="rounded-xl"
                            />
                          </div>

                          <div>
                            <p className="text-light font-semibold mb-2">
                              Heat Map
                            </p>
                            <img
                              src={data.heatmapImage}
                              className="rounded-xl"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ----- ACTION BUTTONS (BOTTOM) ----- */}
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <button
            onClick={() => navigate(`/report-pdf/${selectedPatient._id}`)}
            className="flex-1 bg-light text-secondary px-4 py-3 rounded-xl font-semibold shadow hover:shadow-lg hover:scale-[1.02] transition flex items-center justify-center gap-2"
          >
            <FileText size={18} /> Create PDF
          </button>

          <button
            onClick={() => handleDelete()}
            className="flex-1 bg-red-600 text-white px-4 py-3 rounded-xl font-semibold shadow hover:shadow-lg hover:scale-[1.02] transition flex items-center justify-center gap-2"
          >
            <Trash2 size={18} /> Delete
          </button>

          <Link
            to={"/scan-lesion"}
            className="flex-1 bg-light border border-tertiary/30 text-secondary px-4 py-3 rounded-xl font-semibold shadow hover:bg-tertiary transition flex items-center justify-center gap-2"
          >
            New Analysis
          </Link>

          <Link
            to={"/history"}
            className="flex-1 bg-secondary border border-tertiary/30 text-light px-4 py-3 rounded-xl font-semibold shadow hover:bg-tertiary transition flex items-center justify-center gap-2"
          >
            <X size={18} /> Close Report
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReportView;
