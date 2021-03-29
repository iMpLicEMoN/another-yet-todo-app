import { Alert } from "antd";

const AlertMessage = (
    type:any,
)=>{
    return <Alert 
    style={{
        position: "fixed",
        top: "80px", 
        left: "33%",
        width: "33%"
    }} 
    message="Success"
    type={"success"}
    showIcon={true}
    />
}

export default AlertMessage;