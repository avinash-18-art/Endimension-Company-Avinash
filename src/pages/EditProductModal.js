import React from 'react'
import {Modal, Form, Input, Select, Button} from 'antd'
import {useProductContext} from '../context/ProductContext'

const {Option} = Select

const EditProductModal = ({visible, product, onClose}) => {
  const {updateProduct} = useProductContext()
  const [form] = Form.useForm()

  const onFinish = values => {
    updateProduct({...product, ...values})
    onClose()
  }

  return (
    <Modal
      visible={visible}
      title="Edit Product"
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={product}
        onFinish={onFinish}
      >
        <Form.Item
          name="category"
          label="Category"
          rules={[{required: true, message: 'Please select a category'}]}
        >
          <Select>
            <Option value="Category1">Category1</Option>
            <Option value="Category2">Category2</Option>
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
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditProductModal
