import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Categories from "./pages/Categories"
import Settings from "./pages/Settings"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/featurd" element={<Categories />} />
          <Route path="/recommended" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
