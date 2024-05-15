import React, {createContext, useContext, useState, useEffect} from 'react'

const ProductContext = createContext()

export const useProductContext = () => {
  return useContext(ProductContext)
}

export const ProductProvider = ({children}) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const storedProducts = localStorage.getItem('products')
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    }
  }, [])

  const saveToLocalStorage = products => {
    localStorage.setItem('products', JSON.stringify(products))
  }

  const addProduct = product => {
    const newProducts = [...products, product]
    setProducts(newProducts)
    saveToLocalStorage(newProducts)
  }

  const updateProduct = updatedProduct => {
    const newProducts = products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product,
    )
    setProducts(newProducts)
    saveToLocalStorage(newProducts)
  }

  const deleteProduct = id => {
    const newProducts = products.filter(product => product.id !== id)
    setProducts(newProducts)
    saveToLocalStorage(newProducts)
  }

  return (
    <ProductContext.Provider
      value={{products, addProduct, updateProduct, deleteProduct}}
    >
      {children}
    </ProductContext.Provider>
  )
}
