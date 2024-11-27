import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Message component that displays a message.
 * 
 * @component
 */
export const Message: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('message') || '';
  const type = queryParams.get('type') || 'info';

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`message-template message-${type}`}>
      <p>{message}</p>
    </div>
  );
};