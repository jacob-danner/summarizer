import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { UploadPage } from "./Upload/UploadPage"
import { LandingPage } from "./LandingPage"
import { AboutPage } from "./AboutPage"
import { Navbar } from "./Navbar"
import { CanvasPage } from "./CanvasDrawing/CanvasPage"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/draw" element={<CanvasPage />} />
      </Routes>
    </Router>
  )
}

export default App
