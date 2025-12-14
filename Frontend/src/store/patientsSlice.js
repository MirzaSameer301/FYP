import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

const initialState = {
  loading: false,
  patientsData: [],
  selectedPatient: null,
  detectionResults: {},
  error: null,
};


export const detectLesions = createAsyncThunk(
  "patients/detectLesions",
  async ({ imageURL, types }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/detect", {
        imageURL,
        types, // "streaks" or ["streaks", "globules"] or "all"
      });
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Detection failed");
    }
  }
);


export const createPatientWithLesions = createAsyncThunk(
  "patients/createPatientWithLesions",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/patient/create", formData);
      return response.data.patient;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to save patient");
    }
  }
);


export const getPatients = createAsyncThunk(
  "patients/getPatients",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/patient/${userID}`);
      return response.data.patients;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load patients");
    }
  }
);

export const getPatientById= createAsyncThunk(
  "patients/getPatientById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/patient/getPatient/${id}`);
      return response.data.patient;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load patient");
    }
  }
);

export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/patient/update/${id}`, data);
      return response.data.patient;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);


export const deletePatient = createAsyncThunk(
  "patients/deletePatient",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/patient/${id}`);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);


const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    clearDetectionResults: (state) => {
      state.detectionResults = {};
    },
    clearSelectedPatient: (state) => {
      state.selectedPatient = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ───── DETECTION ─────────────────
      .addCase(detectLesions.pending, (state) => {
        state.loading = true;
      })
      .addCase(detectLesions.fulfilled, (state, action) => {
        state.loading = false;
        state.detectionResults = action.payload;
      })
      .addCase(detectLesions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ───── CREATE PATIENT ────────────
      .addCase(createPatientWithLesions.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPatientWithLesions.fulfilled, (state, action) => {
        state.loading = false;
        state.patientsData.push(action.payload);
      })
      .addCase(createPatientWithLesions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ───── GET PATIENTS ──────────────
      .addCase(getPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patientsData = action.payload;
      })
      .addCase(getPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ───── GET PATIENT BY ID ─────────
      .addCase(getPatientById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPatientById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPatient = action.payload;
      })
      .addCase(getPatientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ───── DELETE PATIENT ─────────────
      .addCase(deletePatient.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const {
  clearDetectionResults,
  clearSelectedPatient,
} = patientsSlice.actions;

export default patientsSlice.reducer;
