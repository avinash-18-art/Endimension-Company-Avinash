// src/components/ProductStatistics.js
import React from 'react'
import {Card, Statistic, Row, Col} from 'antd'
import {useProductContext} from '../context/ProductContext'
import './ProductStatistics.css'

const ProductStatistics = () => {
  const {products} = useProductContext()
  const totalProducts = products.length
  const uniqueCategories = new Set(products.map(product => product.category))
    .size

  return (
    <Row gutter={16} className="statistics-row">
      <Col span={12}>
        <Card>
          <Statistic title="Total Products" value={totalProducts} />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic title="Unique Categories" value={uniqueCategories} />
        </Card>
      </Col>
    </Row>
  )
}

export default ProductStatistics
