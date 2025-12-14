// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import { ArrowLeft, Download } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { getPatientById } from "../store/patientsSlice";
// import ReportDocument from "../components/ReportDocument";
// import { urlToBase64 } from "../lib/urlToBase64";

// const ReportPDF = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [readyPatient, setReadyPatient] = useState(null);

//   const { selectedPatient } = useSelector((state) => state.patients);

//   useEffect(() => {
//     dispatch(getPatientById(id));
//   }, [id]);

//   useEffect(() => {
//     if (!selectedPatient) return;

//     const convertImages = async () => {
//       const patientCopy = JSON.parse(JSON.stringify(selectedPatient));

//       // Convert patient lesion image
//       if (patientCopy.patientLesionImage && !patientCopy.patientLesionImage.startsWith("data:")) {
//         patientCopy.patientLesionImage = await urlToBase64(
//           patientCopy.patientLesionImage
//         );
//       }

//       // Convert all lesion images
//       for (const key in patientCopy.lesions) {
//         const lesion = patientCopy.lesions[key];

//         if (lesion.detectedImage && !lesion.detectedImage.startsWith("data:")) {
//           lesion.detectedImage = await urlToBase64(lesion.detectedImage);
//         }

//         if (lesion.labeledImage && !lesion.labeledImage.startsWith("data:")) {
//           lesion.labeledImage = await urlToBase64(lesion.labeledImage);
//         }
//       }

//       setReadyPatient(patientCopy);
//     };

//     convertImages();
//   }, [selectedPatient]);

//   if (!readyPatient) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-secondary text-xl">
//         Preparing images for PDF...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-4 py-6 bg-gray-100">
      
//       {/* Header */}
//       <div className="flex items-center justify-between max-w-5xl mx-auto mb-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 bg-background text-white px-4 py-2 rounded-lg"
//         >
//           <ArrowLeft size={18} />
//           Back
//         </button>

//         <PDFDownloadLink
//           document={<ReportDocument patient={readyPatient} />}
//           fileName={`LesionVision_Report_${readyPatient.patientName}_${Date.now()}.pdf`}
//         >
//           {({ loading }) => (
//             <button className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg">
//               <Download size={18} />
//               {loading ? "Generating..." : "Download PDF"}
//             </button>
//           )}
//         </PDFDownloadLink>
//       </div>

//       <div className="max-w-5xl mx-auto bg-white shadow-lg p-6 rounded-xl">
//         <h2 className="text-xl font-bold text-secondary">PDF Ready</h2>
//         <p className="text-gray-600">Click download to get your full report.</p>
//       </div>
//     </div>
//   );
// };

// export default ReportPDF;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ArrowLeft, Download } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientById } from "../store/patientsSlice";
import ReportDocument from "../components/ReportDocument";
import { urlToBase64 } from "../lib/urlToBase64";

const ReportPDF = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [readyPatient, setReadyPatient] = useState(null);
  const { selectedPatient } = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(getPatientById(id));
  }, [id]);

  useEffect(() => {
    if (!selectedPatient) return;

    const convertImages = async () => {
      const patientCopy = JSON.parse(JSON.stringify(selectedPatient));

      // Convert patient lesion image
      if (patientCopy.patientLesionImage && !patientCopy.patientLesionImage.startsWith("data:")) {
        patientCopy.patientLesionImage = await urlToBase64(patientCopy.patientLesionImage);
      }

      // Convert all lesion images
      for (const key in patientCopy.lesions) {
        const lesion = patientCopy.lesions[key];

        if (lesion.detectedImage && !lesion.detectedImage.startsWith("data:")) {
          lesion.detectedImage = await urlToBase64(lesion.detectedImage);
        }

        if (lesion.labeledImage && !lesion.labeledImage.startsWith("data:")) {
          lesion.labeledImage = await urlToBase64(lesion.labeledImage);
        }
      }

      setReadyPatient(patientCopy);
    };

    convertImages();
  }, [selectedPatient]);

  if (!readyPatient) {
    return (
      <div className="min-h-screen flex items-center justify-center text-secondary text-xl">
        Preparing images for PDF...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between max-w-5xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-background text-white px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <PDFDownloadLink
          document={<ReportDocument patient={readyPatient} />}
          fileName={`LesionVision_Report_${readyPatient.patientName}_${Date.now()}.pdf`}
        >
          {({ loading }) => (
            <button className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg">
              <Download size={18} />
              {loading ? "Generating..." : "Download PDF"}
            </button>
          )}
        </PDFDownloadLink>
      </div>

      {/* PDF Preview */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg p-6 rounded-xl">
        <h2 className="text-xl font-bold text-secondary mb-4">PDF Preview</h2>
        <PDFViewer width="100%" height="800">
          <ReportDocument patient={readyPatient} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default ReportPDF;
