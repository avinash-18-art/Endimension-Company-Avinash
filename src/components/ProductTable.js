import React, {useState, useEffect} from 'react'
import {Table, Button, Input, Select, Modal} from 'antd'
import {useProductContext} from '../context/ProductContext'
import EditProductModal from '../pages/EditProductModal'
import './ProductTable.css'

const {Column} = Table
const {Search} = Input
const {Option} = Select

const ProductTable = () => {
  const {products, deleteProduct} = useProductContext()
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  const showEditModal = product => {
    setSelectedProduct(product)
    setIsEditModalVisible(true)
  }

  const hideEditModal = () => {
    setSelectedProduct(null)
    setIsEditModalVisible(false)
  }

  const confirmDelete = id => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      onOk: () => deleteProduct(id),
    })
  }

  const handleSearch = text => {
    setSearchText(text)
    filterProducts(text, selectedCategory)
  }

  const handleCategoryChange = category => {
    setSelectedCategory(category)
    filterProducts(searchText, category)
  }

  const filterProducts = (text, category) => {
    let filtered = products
    if (text) {
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(text.toLowerCase()) ||
          product.description.toLowerCase().includes(text.toLowerCase()),
      )
    }
    if (category && category !== 'All') {
      filtered = filtered.filter(product => product.category === category)
    }
    setFilteredProducts(filtered)
  }

  return (
    <>
      <div className="product-table-filters">
        <Search
          placeholder="Search by name or description"
          value={searchText}
          onChange={e => handleSearch(e.target.value)}
          style={{width: 200, marginRight: 16}}
        />
        <Select
          placeholder="Select category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{width: 200}}
          allowClear
        >
          <Option value="All">All</Option>
          {[...new Set(products.map(product => product.category))].map(
            category => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ),
          )}
        </Select>
      </div>
      <Table
        dataSource={filteredProducts}
        rowKey="id"
        rowClassName={record => `category-${record.category.toLowerCase()}`}
      >
        <Column title="Category" dataIndex="category" key="category" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="Price" dataIndex="price" key="price" />
        <Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <div className="product-actions">
              <Button onClick={() => showEditModal(record)}>Edit</Button>
              <Button onClick={() => confirmDelete(record.id)} danger>
                Delete
              </Button>
            </div>
          )}
        />
      </Table>
      {selectedProduct && (
        <EditProductModal
          visible={isEditModalVisible}
          product={selectedProduct}
          onClose={hideEditModal}
        />
      )}
    </>
  )
}

export default ProductTable
