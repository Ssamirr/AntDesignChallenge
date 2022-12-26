import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import dayjs from 'dayjs';

const ModalData = (props) => {

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // form
  const onFinish = (values) => {
    console.log('Success:', values);
    props.setUpdatedProduct({
      ...props.item,
      customerId: values.customerId,
      orderDate: values.orderDate.format("YYYY-MM-DD 00:00:00:000"),
      shipVia: values.shipVia
    })
    setIsModalOpen(false);



  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <>
      <Button type="primary" onClick={showModal}>
        {props.text}
      </Button>
      <Modal title="Update Item" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          labelCol={{
            span: 8,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

          <Form.Item
            label="Customer Id"
            name="customerId"
            initialValue={props.item.customerId}
            rules={[
              {
                required: true,
                message: 'Please input your Customer Id!',
                whitespace: true
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Order Date"
            name="orderDate"
            initialValue={dayjs(props.item.orderDate)}
            rules={[
              {
                required: true,
                message: 'Please input your Order Date!',
              },
            ]}
          >
            <DatePicker />

          </Form.Item>

          <Form.Item
            label="Ship Via"
            name="shipVia"
            initialValue={props.item.shipVia}
            rules={[
              {
                required: true,
                message: 'Please input your Ship Via!',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 0, }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};
export default ModalData;