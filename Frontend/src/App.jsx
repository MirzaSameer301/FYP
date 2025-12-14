import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ResetPassworrd from "./pages/ResetPassworrd.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/authSlice.js";
import Home from "./pages/Home.jsx";
import ScanLesion from "./pages/ScanLesion..jsx";
import About from "./pages/About.jsx";
import History from "./pages/History.jsx";
import Header from "./components/Header.jsx";
import ScrollToHashElement from "./components/ScrollToHashElement.jsx";
import Footer from "./components/Footer.jsx";
import ReportView from "./pages/ReportView.jsx";
import ReportPDF from "./pages/ReportPDF.jsx";
function App() {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);


  if (loading) {
    return (
      <div className="bg-background h-screen w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }
  //
  return (
    <>
      {user && isAuthenticated && <Header />}

      <ScrollToHashElement />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={!user ? <Login /> : <Home />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Home />} />
        <Route path="/forget-password" element={!user ? <ForgetPassword /> : <Home />} />
        <Route path="/reset-password/:token" element={!user ? <ResetPassworrd /> : <Home />} />
        <Route path="/scan-lesion" element={user ? <ScanLesion /> : <Login />} />
        <Route path="/history" element={user ? <History /> : <Login />} />
        <Route path="/about-us" element={user ? <About /> : <Login  />} />
        <Route path="/report-pdf/:id" element={user ? <ReportPDF /> : <Login />} />
        <Route path="/view-report/:id" element={user ? <ReportView /> : <Login />} />
        <Route path='*' element={<div className="min-h-screen flex items-center justify-center text-4xl font-semibold bg-background text-light">
          404 Page Not found
        </div>}/>
      </Routes>
      {user && isAuthenticated && <Footer />}
    </>
  );
}

export default App;
