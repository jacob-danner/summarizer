import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { UploadPage } from "./Upload/UploadPage"
import { LandingPage } from "./LandingPage"
import { AboutPage } from "./AboutPage"
import { Navbar } from "./Navbar"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  )
}

export default App
