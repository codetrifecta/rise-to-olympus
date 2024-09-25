import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { FC } from 'react';
import { useFloorStore } from '../stores/floor';
import { useGameStateStore } from '../stores/game';
import { usePlayerStore } from '../stores/player';

export const StartRoomEscModalOverlay: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const navigate = useNavigate();
  const { resetFloorStore } = useFloorStore();
  const { resetGameState } = useGameStateStore();
  const { resetPlayerStore } = usePlayerStore();

  const reset = () => {
    resetPlayerStore();
    resetFloorStore();
    resetGameState();
  };

  return (
    <div className="fixed w-full h-full z-[100] flex justify-center items-center">
      <div
        className="absolute top-0 left-0 w-screen h-screen bg-black opacity-10"
        onClick={onClose}
      ></div>
      <div className="z-10 bg-neutral-900 p-10 flex flex-col">
        <Button
          onClick={() => {
            onClose();
          }}
        >
          Back to Game
        </Button>
        <Button
          onClick={() => {
            reset();
            navigate('/');
          }}
        >
          Back to Main Menu
        </Button>
      </div>
    </div>
  );
};
