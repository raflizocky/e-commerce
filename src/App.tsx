import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Footer from "./components/Footer"
import Featured from "./pages/Featured"
import Recommended from "./pages/Recommended"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/featured" element={<Featured />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
