import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { FC } from 'react';

export const StartRoomEscModalOverlay: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed w-full h-full z-[100] flex justify-center items-center">
      <div
        className="absolute top-0 left-0 w-screen h-screen bg-black opacity-10"
        onClick={onClose}
      ></div>
      <div className="z-10 bg-neutral-900 p-10 flex flex-col">
        <Button
          onClick={() => {
            navigate('/');
          }}
        >
          Back to Main Menu
        </Button>
        <Button
          onClick={() => {
            onClose();
          }}
        >
          Back to Game
        </Button>
      </div>
    </div>
  );
};
