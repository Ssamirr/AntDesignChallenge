import { Button, message, Popconfirm } from 'antd'
import React from 'react'

function Confirm(props) {
    const confirm = () => {
        message.success('Item is deleted');
        props.deleteProduct(props.id)
    };
    const cancel = () => {
        message.error('Item is not deleted');
    };
    return (
        <Popconfirm
            title="Delete the item"
            description="Are you sure to delete this item?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <Button danger> Delete </Button>
        </Popconfirm>
    )
}

export default Confirm