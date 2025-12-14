const axios = require("axios");
// External ML API URLs
const LESION_API = {
  streaks: process.env.STREAKS_API,
  globules: process.env.GLOBULES_API,
  pigmentNetwork: process.env.PIGMENT_API,
  negativeNetwork: process.env.NEGATIVE_API,
  miliaLikeCysts: process.env.MILIA_API,
};

// Detect single lesion
async function detectSingleLesion(lesionType, imageURL) {
  try {
    const apiUrl = LESION_API[lesionType];

    // ❗ ENABLE THIS WHEN EXTERNAL ML SERVER IS READY
    
    const response = await axios.post(apiUrl, {
      image: imageURL,
    });

    return {
      status: response.data.status,
      confidence: response.data.confidence,
      maskImage: response.data.mask_url,
      labeledImage: response.data.labeled_url,
      heatmapImage: response.data.heatmap_url,
    };
    

    // // MOCK RESPONSE FOR TESTING
    // return {
    //   status: true,
    //   confidence: 85,
    //   maskImage: apiUrl ,
    //   labeledImage: apiUrl ,
    //   heatmapImage: apiUrl ,
    // };
  } catch (error) {
    console.error(`Detection error (${lesionType}):`, error.message);

    return {
      status: false,
      confidence: 0,
      maskImage: null,
      labeledImage: null,
      heatmapImage: null,
    };
  }
}
exports.runDetection = async (req, res) => {
  try {
    const { imageURL, types } = req.body;

    if (!imageURL || !types) {
      return res.status(400).json({
        success: false,
        message: "Image and detection types are required",
      });
    }

    let lesionTypes = [];

    if (types === "all") {
      lesionTypes = Object.keys(LESION_API);
    } else if (Array.isArray(types)) {
      lesionTypes = types;
    } else {
      lesionTypes = [types];
    }

    const results = {};

    for (const lesion of lesionTypes) {
      results[lesion] = await detectSingleLesion(lesion, imageURL);
    }

    res.json({
      success: true,
      message: "Detection completed successfully",
      results,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log(error.message);
    
  }
};
