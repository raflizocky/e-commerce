import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Footer from "./components/Footer"
import Featured from "./pages/Featured"
import Recommended from "./pages/Recommended"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import UserPage from "./pages/UserPage"
import ProductDetail from "./pages/ProductDetail"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/featured" element={<Featured />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<UserPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
