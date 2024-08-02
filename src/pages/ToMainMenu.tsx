import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ToMainMenu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  });

  return <></>;
};
