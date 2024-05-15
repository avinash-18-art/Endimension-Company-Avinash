import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {ProductProvider} from './context/ProductContext'
import ProductListPage from './pages/ProductListPage'
import AddProduct from './pages/AddProduct'

const App = () => {
  return (
    <Router>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </ProductProvider>
    </Router>
  )
}

export default App
