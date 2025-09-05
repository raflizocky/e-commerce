import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Settings from "./pages/Settings"
import Footer from "./components/Footer"
import Featured from "./pages/Featured"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/featured" element={<Featured />} />
          <Route path="/recommended" element={<Settings />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
