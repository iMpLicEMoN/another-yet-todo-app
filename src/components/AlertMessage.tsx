import { useEffect } from "react";
import { alertAction } from '../store/actions'
import { useDispatch } from 'react-redux';
import { Alert } from "antd";

const AlertMessage = ({
    message,
    type,
    description,
}:any)=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        setTimeout(()=>{
            dispatch(alertAction({message: "", status: "", description: ""}))
        }, 5000);
    }, [])
    return <Alert 
    style={{
        position: "fixed",
        bottom: "80px", 
        left: "33%",
        width: "33%"
    }} 
    message={message}
    description={description}
    type={type}
    showIcon={true}
    />
}

export default AlertMessage;