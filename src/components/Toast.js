const key = 'updatable';

export const Message = (messageApi) => {
    messageApi.open({
        key,
        type: 'loading',
        content: 'Loading...',
    });
    setTimeout(() => {
        messageApi.open({
            key,
            type: 'success',
            content: 'Item is Updated!',
            duration: 4,
        });
    }, 1800);
}

function MessageComponent(props) {

    return (
        <>
       { props.contextHolder } 
        </>
    );
}

export default MessageComponent;