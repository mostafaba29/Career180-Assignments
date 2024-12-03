import React from "react";
import Header from "./shared/header/Header";
import Footer from "./shared/footer/Footer";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import PostDetailPage from "./pages/post/page";
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <div className="App">
       <Header />
       <Footer />
    </div>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/post/:id" element={<PostDetailPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
