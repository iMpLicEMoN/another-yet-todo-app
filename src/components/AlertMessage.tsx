import { useEffect } from 'react';
import { alertAction } from '../store/actions';
import { useDispatch } from 'react-redux';
import { Alert } from 'antd';
import { alertsType } from '../types';

interface AlertMessageType {
    message: string;
    type: alertsType;
    description?: string;
}

const alertStyle:React.CSSProperties = {
  position: 'fixed',
  bottom: '80px',
  left: '33%',
  width: '33%',
};

const AlertMessage: React.FC<AlertMessageType> = ({
  message,
  type,
  description,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(alertAction({ message: '', type: undefined, description: '' }));
    }, 5000);
  }, [dispatch]);
  return <Alert
    style={alertStyle}
    message={message}
    description={description}
    type={type}
    showIcon={true}
  />;
};

export default AlertMessage;