import { FC } from 'react';
import { useFloorStore } from '../../stores/floor';
import { Button } from './Button';
import { useGameStateStore } from '../../stores/game';
import { FLOOR_ID, FLOOR_TARTARUS_CAMP } from '../../constants/floor';
import { ICampaign, IFloor } from '../../types';
import { useCampaignStore } from '../../stores/campaign';

export const ProceedToNextFloor: FC = () => {
  const { currentRoom, floor, setFloor } = useFloorStore();
  const { setIsFloorCleared } = useGameStateStore();
  const { selectedCampaign, campaigns, setCampaigns, setSelectedCampaign } =
    useCampaignStore();

  const handleProceedButtonClick = () => {
    if (!currentRoom) {
      console.error('ProceedToNextFloor: No current room');
      return;
    }

    if (!floor.nextFloorID) {
      console.error('ProceedToNextFloor: No next floor');
      return;
    }

    let nextFloor: IFloor | null = null;

    // Set next floor based on next floor ID
    switch (floor.nextFloorID) {
      case FLOOR_ID.TARTARUS_CAMP:
        // setFloor(FLOOR_TARTARUS_CAMP);
        nextFloor = FLOOR_TARTARUS_CAMP;
        break;
      default:
        console.error('ProceedToNextFloor: Unknown next floor ID');
        break;
    }

    if (!nextFloor) {
      console.error('ProceedToNextFloor: No next floor');
      return;
    }

    // Set the campaign's completed scripts
    // TODO: Make this dynamic and instead of calling it scripts, call it checkpoints or 'completedEvents'
    if (selectedCampaign === null) {
      console.error('ProceedToNextFloor: No selected campaign');
      return;
    }

    const newSelectedCampaign: ICampaign | null = {
      ...selectedCampaign,
    };

    if (!newSelectedCampaign.scriptsCompleted) {
      console.error('ProceedToNextFloor: No scripts completed');
      return;
    }
    switch (floor.nextFloorID) {
      case 'TUTORIAL':
        // setFloor(FLOOR_TUTORIAL);
        break;
      case 'TARTARUS_CAMP':
        // setFloor(FLOOR_TARTARUS_CAMP);
        newSelectedCampaign.scriptsCompleted.tutorial = true;
        break;
      default:
        console.error('ProceedToNextFloor: Unknown next floor ID');
        break;
    }

    console.log(
      'ProceedToNextFloor: newSelectedCampaign:',
      newSelectedCampaign
    );
    setSelectedCampaign(newSelectedCampaign);
    setCampaigns(
      campaigns.map((c) =>
        c.id === newSelectedCampaign.id ? newSelectedCampaign : c
      )
    );

    setFloor(nextFloor);
    setIsFloorCleared(false);
  };

  return (
    <Button onClick={handleProceedButtonClick}>Proceed to Next Floor</Button>
  );
};
