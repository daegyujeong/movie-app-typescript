import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import NowPlaying from "./pages/NowPlaying";
import Header from "./components/Header";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/now-playing" element={<NowPlaying />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default Router;