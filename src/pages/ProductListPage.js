import React from 'react';
import { Button, Layout } from 'antd';
import ProductStatistics from '../components/ProductStatistics';
import ProductTable from '../components/ProductTable';
import { Link } from 'react-router-dom';
import './ProductListPage.css';

const { Header, Content } = Layout;

const ProductListPage = () => {
    return (
        <Layout>
            <Header>
                <h1>Product Management</h1>
            </Header>
            <Content className="product-list-content">
                <div className="product-list-header">
                    <ProductStatistics />
                </div>
                <ProductTable className="product-table" />
                <Link to="/add-product"><Button type="primary">Add Product</Button></Link>
            </Content>
        </Layout>
    );
};

export default ProductListPage;


