import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const StartRoomEscModalOverlay = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed w-full h-full z-[100] flex justify-center items-center">
      <div className="absolute top-0 left-0 w-screen h-screen bg-black opacity-10"></div>
      <div className="z-10 bg-neutral-900 p-10">
        <Button
          onClick={() => {
            navigate('/');
          }}
        >
          Back to Main Menu
        </Button>
      </div>
    </div>
  );
};
