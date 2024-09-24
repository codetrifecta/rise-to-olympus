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
import {
  LOGS_TUTORIAL_START_ROOM,
  LOGS_TUTORIAL_TARTARUS_CAMP,
} from '../../constants/log';
import { useFloorStore } from '../../stores/floor';
import {
  FLOOR_TARTARUS_CAMP,
  FLOOR_TUTORIAL,
  FLOOR_TUTORIAL_CHEST_ITEMS,
} from '../../constants/floor';
import { useGameStateStore } from '../../stores/game';
import { CHECKPOINT } from '../../constants/campaign';
import { SKILLS } from '../../constants/skill';
import { isCampaign } from '../../utils/campaign';

export const Game = () => {
  const { selectedCampaign, campaigns, setSelectedCampaign, setCampaigns } =
    useCampaignStore();
  const { currentScript, setCurrentScript } = useScriptStore();
  const { player, setPlayer } = usePlayerStore();
  const { setLogs } = useLogStore();
  const { setFloor, setFloorChestItems } = useFloorStore();
  const { setIsMinimapOpen, setIsGameLogOpen } = useGameStateStore();

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
    const skipTutorial = searchParams.get('skipTutorial') ? true : false;
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
    }

    console.log('Campaign:', campaign);

    if (isCampaign(campaign) === false) {
      console.log('Campaign is not valid');
      navigate('/');
      return;
    }

    // Get skills from campaign and set player
    const playerEquippedSkills = campaign.playerEquippedSkillIDs.map((id) => {
      const skill = SKILLS.find((s) => s.id === id);

      if (!skill) {
        console.error('Game: Skill not found');
        return null;
      }

      return skill;
    });
    const filteredPlayerEquippedSkills = playerEquippedSkills.filter(
      (s) => s !== null
    );

    // Set player
    setPlayer({
      ...player,
      name: campaign.playerName,
      skills: filteredPlayerEquippedSkills,
    });

    // let currentScript = null;
    // let logs = [];
    // let floor = null;
    // let floorChestItems = new Map();
    let newCampaigns = [...campaigns];

    if (
      skipTutorial === false &&
      campaign.scriptsCompleted.tutorial === false
    ) {
      // If no skipping tutorial and tutorial is not completed
      if (!campaign.scriptsCompleted.tutorialStartRoom) {
        // If tutorial start room script is not completed
        setCurrentScript(SCRIPT_TUTORIAL_START_ROOM);
        setIsGameLogOpen(false);
        setIsMinimapOpen(false);
      } else {
        setIsGameLogOpen(true);
        setIsMinimapOpen(true);
      }
      setLogs(LOGS_TUTORIAL_START_ROOM);
      setSelectedCampaign(campaign);
      console.log('Selected campaign:', campaign);
      setFloor(FLOOR_TUTORIAL);
      setFloorChestItems(FLOOR_TUTORIAL_CHEST_ITEMS);
      console.log('Showing tutorial');
    } else if (
      skipTutorial === true &&
      campaign.scriptsCompleted.tutorial === false
    ) {
      // If skipping tutorial and tutorial is not completed,
      // skip tutorial and go to camp
      setCurrentScript(null);

      // Set campaign's tutorial to completed
      newCampaigns = campaigns.map((c) =>
        c.id === campaign.id
          ? {
              ...c,
              scriptsCompleted: {
                ...c.scriptsCompleted,
                tutorial: true,
                tutorialStartRoom: true,
              },
              checkpoint: CHECKPOINT.TARTARUS_CAMP,
            }
          : c
      );
      setCampaigns(newCampaigns);

      // Set selected campaign to the updated campaign
      const newSelectedCampaign = newCampaigns.find(
        (c) => c.id === campaign.id
      );

      if (!newSelectedCampaign) {
        console.error('Game: New selected campaign not found');
        return;
      }

      setSelectedCampaign(newSelectedCampaign);
      console.log(
        'Selected campaign after tutorial is skipped:',
        newSelectedCampaign
      );
      setIsGameLogOpen(true);
      setLogs(LOGS_TUTORIAL_TARTARUS_CAMP);
      setFloor(FLOOR_TARTARUS_CAMP);
      console.log('Skipping tutorial and going to camp');
    } else {
      // The case where the tutorial script is completed
      setSelectedCampaign(campaign);
      console.log('Selected campaign:', campaign);
      setLogs(LOGS_TUTORIAL_TARTARUS_CAMP);
      setFloor(FLOOR_TARTARUS_CAMP);
      setIsGameLogOpen(true);
      setIsMinimapOpen(false);

      console.log('Skipping tutorial and going to camp');
    }
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
