import { FC } from 'react';
import { useFloorStore } from '../../stores/floor';
import { Button } from './Button';
import { useGameStateStore } from '../../stores/game';
import {
  FLOOR_ID,
  FLOOR_TARTARUS_CAMP,
  FLOOR_TUTORIAL,
  FLOOR_TUTORIAL_CHEST_ITEMS,
} from '../../constants/floor';
import { ICampaign, IFloor } from '../../types';
import { useCampaignStore } from '../../stores/campaign';
import { useLogStore } from '../../stores/log';
import { LOGS_TUTORIAL_TARTARUS_CAMP } from '../../constants/log';
import { usePlayerStore } from '../../stores/player';
import { useScriptStore } from '../../stores/script';

export const ProceedToNextFloor: FC = () => {
  const { currentRoom, floor, setCurrentRoom, setFloor, setFloorChestItems } =
    useFloorStore();
  const {
    isGameOver,
    setIsFloorCleared,
    setIsGameLogOpen,
    setIsMinimapOpen,
    resetGameState,
  } = useGameStateStore();
  const { selectedCampaign, campaigns, setCampaigns, setSelectedCampaign } =
    useCampaignStore();
  const { setLogs } = useLogStore();
  const { player, resetPlayerStore } = usePlayerStore();
  const { resetScriptStore } = useScriptStore();

  const handleProceedButtonClick = () => {
    console.log('Proceed to next floor');

    if (!floor) {
      console.error('Floor not found!');
      return;
    }

    if (!currentRoom) {
      console.error('ProceedToNextFloor: No current room');
      return;
    }

    let nextFloor: IFloor | null = null;

    // Set next floor based on next floor ID
    switch (floor.nextFloorID) {
      case FLOOR_ID.TARTARUS_CAMP:
        // setFloor(FLOOR_TARTARUS_CAMP);
        nextFloor = { ...FLOOR_TARTARUS_CAMP };
        break;
      default:
        console.error('ProceedToNextFloor: Unknown next floor ID');
        break;
    }

    // Check for death in tutorial room
    if (isGameOver && player.health <= 0 && floor.id === FLOOR_ID.TUTORIAL) {
      resetScriptStore();
      resetGameState();
      resetPlayerStore();
      setCurrentRoom(null);
      setFloor({ ...FLOOR_TUTORIAL });
      setFloorChestItems(FLOOR_TUTORIAL_CHEST_ITEMS);
      setIsFloorCleared(false);
      setIsGameLogOpen(true);
      setIsMinimapOpen(true);
      return;
    }

    // If no next floor, then game is won.
    // Reset game state and return to camp
    if (!nextFloor) {
      resetScriptStore();
      setLogs(LOGS_TUTORIAL_TARTARUS_CAMP);
      resetGameState();
      resetPlayerStore();
      setCurrentRoom(null);
      setFloor({ ...FLOOR_TARTARUS_CAMP });
      setIsFloorCleared(false);
      setIsGameLogOpen(true);
      return;
    }

    // Set the campaign's completed scripts
    // TODO: Make this dynamic and instead of calling it scripts, call it checkpoints or 'completedEvents'
    if (selectedCampaign === null) {
      console.error('ProceedToNextFloor: No selected campaign');
      return;
    }

    let newSelectedCampaign: ICampaign | null = {
      ...selectedCampaign,
    };

    if (!newSelectedCampaign.scriptsCompleted) {
      console.error('ProceedToNextFloor: No scripts completed');
      return;
    }
    switch (floor.nextFloorID) {
      case FLOOR_ID.TUTORIAL:
        // setFloor(FLOOR_TUTORIAL);
        newSelectedCampaign = {
          ...newSelectedCampaign,
          scriptsCompleted: {
            ...newSelectedCampaign.scriptsCompleted,
            tutorialStartRoom: true,
          },
        };
        break;
      case FLOOR_ID.TARTARUS_CAMP:
        // setFloor(FLOOR_TARTARUS_CAMP);
        newSelectedCampaign = {
          ...newSelectedCampaign,
          scriptsCompleted: {
            ...newSelectedCampaign.scriptsCompleted,
            tutorial: true,
          },
        };
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

    // Set logs for the next floor
    if (nextFloor.id === FLOOR_ID.TARTARUS_CAMP) {
      setLogs(LOGS_TUTORIAL_TARTARUS_CAMP);
    }

    resetScriptStore();
    resetGameState();
    resetPlayerStore();
    setCurrentRoom(null);
    setFloor(nextFloor);
    setIsFloorCleared(false);
  };

  const renderProceedButtonText = () => {
    if (!floor) {
      console.error('ProceedToNextFloor: No current floor');
      return '';
    } else if (floor?.nextFloorID === FLOOR_ID.TUTORIAL)
      return 'Game over. Going back to start';
    else if (isGameOver && player.health <= 0)
      return 'Game over. Return to the start';
    else if (floor?.nextFloorID === null)
      return 'You have won. Return to Camp.';
    else return 'Proceed to next floor';
  };

  return (
    <Button onClick={handleProceedButtonClick}>
      {renderProceedButtonText()}
    </Button>
  );
};
