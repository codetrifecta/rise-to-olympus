import { useNavigate, useSearchParams } from 'react-router-dom';
import { ScriptOverlay } from '../../overlays/ScriptOverlay';
import { useEffect, useState } from 'react';
import { SCRIPT_TUTORIAL_START_ROOM } from '../../constants/scripts';
import { useCampaignStore } from '../../stores/campaign';
// import { StartRoom } from './StartRoom';
import { useScriptStore } from '../../stores/script';
import { GameRoom } from './GameRoom';
import { StartRoomEscModalOverlay } from '../../overlays/StartRoomEscModalOverlay';
import { usePlayerStore } from '../../stores/player';
import { useLogStore } from '../../stores/log';
import { LOG_TUTORIAL_START_ROOM } from '../../constants/log';
import { useFloorStore } from '../../stores/floor';
import { FLOOR_TARTARUS_CAMP, FLOOR_TUTORIAL } from '../../constants/floor';

export const Game = () => {
  const { selectedCampaign, campaigns, setSelectedCampaign, setCampaigns } =
    useCampaignStore();
  const { currentScript, setCurrentScript } = useScriptStore();
  const { player, setPlayer } = usePlayerStore();
  const { setLogs } = useLogStore();
  const { setFloor } = useFloorStore();

  const [escModalOpen, setEscModalOpen] = useState(false);

  // Assign event listerners to the window object
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEscModalOpen(!escModalOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [escModalOpen]);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // When the component mounts, check if there is a campaign ID in the URL,
  // and if so, set the selected campaign to that campaign
  // and set the player name to the campaign's player name
  // and set the floor to the tutorial floor if the tutorial has not been completed
  // and set the current script to the tutorial start room script
  // and set the logs to the tutorial start room logs.
  // If no campaign ID is found, redirect to the home page.
  useEffect(() => {
    const skipTutorial = searchParams.get('skipTutorial');
    const campaignId = searchParams.get('campaignId');

    console.log('skipTutorial:', skipTutorial);
    console.log('campaignId:', campaignId);

    if (!campaignId) {
      console.log('No campaign ID found');
      navigate('/');
      return;
    }

    // Find campaign by ID
    const campaign = campaigns.find((c) => c.id === campaignId);

    if (!campaign) {
      console.log('No campaign found');
      navigate('/');
      return;
    } else {
      setSelectedCampaign(campaign);
      console.log('Selected campaign:', campaign);
    }

    console.log('Campaign:', campaign);

    if (!skipTutorial && !campaign.scriptsCompleted.tutorial) {
      if (!campaign.scriptsCompleted.tutorialStartRoom) {
        setCurrentScript(SCRIPT_TUTORIAL_START_ROOM);
      }
      setLogs(LOG_TUTORIAL_START_ROOM);
      setFloor(FLOOR_TUTORIAL);
      console.log('Showing tutorial');
    } else if (skipTutorial && !campaign.scriptsCompleted.tutorial) {
      // Set campaign's tutorial to completed
      const newCampaigns = campaigns.map((c) =>
        c.id === campaign.id
          ? {
              ...c,
              scriptsCompleted: { ...c.scriptsCompleted, tutorial: true },
            }
          : c
      );
      setCampaigns(newCampaigns);

      setLogs([]);
      setFloor(FLOOR_TARTARUS_CAMP);
      console.log('Skipping tutorial and going to camp');
    } else {
      setLogs([]);
      setFloor(FLOOR_TARTARUS_CAMP);
      console.log('Skipping tutorial and going to camp');
    }

    // Set player
    setPlayer({ ...player, name: campaign.playerName });
  }, [searchParams]);

  if (!selectedCampaign) return null;

  return (
    <>
      <div
        className="fixed bottom-0 z-[500] bottom-0 transition duration-500 ease-in-out"
        style={{
          transform:
            currentScript && currentScript.length > 0
              ? 'translateY(0)'
              : 'translateY(100%)',
        }}
      >
        <ScriptOverlay />
      </div>

      {escModalOpen && (
        <StartRoomEscModalOverlay onClose={() => setEscModalOpen(false)} />
      )}

      <GameRoom />
    </>
  );
};
