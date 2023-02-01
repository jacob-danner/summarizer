import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { UploadPDF } from "./UploadPDF"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPDF />} />
      </Routes>
    </Router>
  )
}

export default App
