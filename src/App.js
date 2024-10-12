import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Students from "./students/Students";
import { generateStudents } from "./students/StudentsDB";


import "./index.css"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: generateStudents(),
    };
  }

  render() {
    return (
      <>
        <div className="wrapper">
        <Header/>
        <Routes>
          
          <Route path="/students" element={<Students students={this.state.students}/>} />
        </Routes>
        <Footer />
      </div>
      </>
    );
  }
}

export default App;
