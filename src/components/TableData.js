import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import Confirm from './Confirm';
import ModalData from './ModalData';

function TableData() {

    const [products, setproducts] = useState([]);
    const [updatedProduct, setUpdatedProduct] = useState({})
    const [skip, Setskip] = useState(false);

    useEffect(() => {
        getProducts();
        Setskip(true);
    }, [])
    const getProducts = () => {
        fetch('https://northwind.vercel.app/api/orders')
            .then(res => res.json())
            .then(data => {
                setproducts(data);
            })
    }

    const deleteProduct = (id) => {
        fetch(`https://northwind.vercel.app/api/orders/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.status === 200)
                    getProducts();
            })
    }

    useEffect(() => {
        skip &&
        fetch(`https://northwind.vercel.app/api/orders/${updatedProduct.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => {
                if (res.status === 200)
                    getProducts();
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatedProduct])


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Customer Id',
            dataIndex: 'customerId',
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            sorter: (a, b) => a?.orderDate?.localeCompare(b?.orderDate)
        },
        {
            title: 'Ship Via',
            dataIndex: 'shipVia',
            sorter: (a, b) => a?.shipVia - b?.shipVia
        },
        {
            title: 'Delete',
            dataIndex: 'id',
            render: (id) => <Confirm deleteProduct={deleteProduct} id={id} />
        },
        {
            title: 'Update',
            dataIndex: 'id',
            render: (id) => <ModalData setUpdatedProduct={setUpdatedProduct} item={products.find(q => q.id === id)} text="Update" />
        }
    ];
    return (
        <>
            <Table
                dataSource={products}
                columns={columns}
                rowKey="id" >
            </Table>
        </>
    )
}

export default TableData