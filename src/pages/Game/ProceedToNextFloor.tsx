import { FC } from 'react';
import { useFloorStore } from '../../stores/floor';
import { Button } from './Button';
import { useGameStateStore } from '../../stores/game';

export const ProceedToNextFloor: FC = () => {
  const { currentRoom, setFloor } = useFloorStore();
  const { setIsFloorCleared } = useGameStateStore();

  const handleProceedButtonClick = () => {
    if (!currentRoom) {
      console.error('ProceedToNextFloor: No current room');
      return;
    }

    setFloor(currentRoom.nextFloor);
    setIsFloorCleared(false);
  };

  return (
    <Button onClick={handleProceedButtonClick}>Proceed to Next Floor</Button>
  );
};
