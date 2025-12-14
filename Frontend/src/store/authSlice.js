import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
};

// --- Login ---
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// --- Register ---
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// --- Check Auth ---
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await axiosInstance.get("/auth/check-auth", {
        headers: { Authorization: `Bearer ${token}` },
      });     
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Not authenticated");
    }
  }
);

// --- Forgot Password ---
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email,
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send reset email"
      );
    }
  }
);

// --- Reset Password ---
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/reset-password/${token}`, {
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Reset password failed"
      );
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // --- LOGIN ---
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;

        // ✅ Store token in localStorage
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      // --- REGISTER ---
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;

        // ✅ Store token in localStorage
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      // --- CHECK AUTH ---
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("token");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
