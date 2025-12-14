import React from "react";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import Logo from "../assets/favicon.svg";

const COLORS = {
  primary: "#969a9d",
  secondary: "#1e4759",
  tertiary: "#c1c5c8",
  background: "#4d6776",
  light: "#e7ebee",
};

const styles = StyleSheet.create({
  page: {
    padding: 25,
    backgroundColor: COLORS.light,
    fontSize: 12,
    color: "#000",
    fontFamily: "Helvetica",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginRight: 12,
  },
  headerTextContainer: {
    flexGrow: 1,
    textAlign: "center",
  },
  headerTitle: {
    color: COLORS.light,
    fontSize: 20,
    fontWeight: 700,
  },
  headerSubtitle: {
    color: COLORS.primary,
    fontSize: 11,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: COLORS.secondary,
    marginBottom: 8,
    marginTop: 10,
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  boxItem: {
    width: "48%",
    marginBottom: 4,
  },
  lesionBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  lesionTitle: {
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 4,
    color: COLORS.secondary,
  },
  row: {
    flexDirection: "row",
    marginTop: 8,
  },
  img: {
    width: 140,
    height: 140,
    borderRadius: 6,
    marginRight: 6,
  },
  footer: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 9,
    color: COLORS.secondary,
    paddingTop: 6,
  },
});

const ReportDocument = ({ patient }) => {
  const lesionNames = {
    streaks: "Streaks",
    globules: "Globules",
    pigmentNetwork: "Pigment Network",
    negativeNetwork: "Negative Network",
    miliaLikeCysts: "Milia-like Cysts",
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // ✅ Only keep lesions that are actually detected and have some data
  const detectedLesions = Object.entries(patient.lesions || {}).filter(
    ([, lesion]) => lesion && lesion.maskImage
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.headerContainer}>
          {/* If you want the logo back: */}
          {/* <Image src={Logo} style={styles.logo} /> */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>
              LesionVision – Detection Report
            </Text>
            <Text style={styles.headerSubtitle}>
              AI-Powered Dermatological Assessment
            </Text>
          </View>
        </View>

        {/* PATIENT INFO */}
        <Text style={styles.sectionTitle}>Patient Information</Text>
        <View style={styles.box}>
          <Text style={styles.boxItem}>Name: {patient.patientName}</Text>
          <Text style={styles.boxItem}>Age: {patient.patientAge}</Text>
          <Text style={styles.boxItem}>Gender: {patient.patientGender}</Text>
          <Text style={styles.boxItem}>Contact: {patient.patientPhone}</Text>
          <Text style={styles.boxItem}>
            Date: {formatDate(patient.createdAt)}
          </Text>
        </View>

        {/* LESION RESULTS */}
        <Text style={styles.sectionTitle}>
          Lesion Analysis ({detectedLesions.length} Detected)
        </Text>

        {detectedLesions.length === 0 ? (
          <View style={styles.lesionBox}>
            <Text>No lesion patterns were detected in this analysis.</Text>
          </View>
        ) : (
          detectedLesions.map(([key, lesion]) => (
            <View key={key} style={styles.lesionBox}>
              <Text style={styles.lesionTitle}>{lesionNames[key]}</Text>
              <Text>Detected</Text>

              {lesion.confidence != null && (
                <Text>Confidence: {lesion.confidence}%</Text>
              )}

              <View style={styles.row}>
                {patient.patientLesionImage && (
                  <Image style={styles.img} src={patient.patientLesionImage} />
                )}
                {lesion.maskImage && (
                  <Image style={styles.img} src={lesion.maskImage} />
                )}
                {lesion.labeledImage && (
                  <Image style={styles.img} src={lesion.labeledImage} />
                )}
                {lesion.heatmapImage && (
                  <Image style={styles.img} src={lesion.heatmapImage} />
                )}
              </View>
            </View>
          ))
        )}

        {/* FOOTER */}
        <Text style={styles.footer}>
          ⚠ AI detection is not a medical diagnosis. Always consult a certified
          dermatologist.
        </Text>
      </Page>
    </Document>
  );
};

export default ReportDocument;
