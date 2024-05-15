import React from 'react'
import {Form, Input, Select, Button, Layout} from 'antd'
import {useNavigate} from 'react-router-dom'
import {useProductContext} from '../context/ProductContext'
import './AddProduct.css'

const {Content} = Layout
const {Option} = Select

const AddProduct = () => {
  const {addProduct} = useProductContext()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = values => {
    addProduct({id: Date.now(), ...values})
    navigate('/')
  }

  return (
    <Layout>
      <Content style={{padding: '20px'}}>
        <div className="add-product-form">
          <h2>Add Product</h2>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{required: true, message: 'Please select a category'}]}
            >
              <Select>
                <Option value="Clothes">Clothes</Option>
                <Option value="Electronics">Electorincs</Option>
                <Option value="Beauty">Beauty</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              rules={[{required: true, message: 'Please enter a product name'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{required: true, message: 'Please enter a price'}]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Product
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  )
}

export default AddProduct
