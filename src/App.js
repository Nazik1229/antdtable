import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Students from "./students/Students";
import { generateStudents } from "./students/StudentsDB";
import Sidebar from "./components/Sidebar"; 
import "./index.css";

const App = () => {
  return (
    <div className="wrapper" style={{ display: 'flex' }}>
      <Sidebar /> 
      <div style={{ flex: 1 }}>
        <Header />
        <Routes>
          <Route path="/students" element={<Students students={generateStudents()} />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;


