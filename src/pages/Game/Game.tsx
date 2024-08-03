import { useNavigate, useSearchParams } from 'react-router-dom';
import { ScriptOverlay } from '../../overlays/ScriptOverlay';
import { useEffect } from 'react';
import { SCRIPT_PARENT, SCRIPT_TUTORIAL } from '../../constants/scripts';
import { useCampaignStore } from '../../stores/campaign';
import { StartRoom } from './StartRoom';
import { useScriptStore } from '../../stores/script';

export const Game = () => {
  const { campaigns, setSelectedCampaign } = useCampaignStore();
  const { currentScript, setCurrentScript } = useScriptStore();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

    if (!skipTutorial && !campaign.scriptsCompleted.tutorial) {
      setCurrentScript(SCRIPT_TUTORIAL);
      console.log('Showing tutorial');
    }
  }, [searchParams, campaigns]);

  const renderGameScreen = () => {
    if (
      currentScript !== null &&
      currentScript.length > 0 &&
      currentScript[0].parent === SCRIPT_PARENT.TUTORIAL
    ) {
      return (
        <div>
          <h1 className="text-4xl font-bold mb-5">Game</h1>
          <p className="mb-5">
            This is the game page. It is used to display the game.
          </p>
        </div>
      );
    } else {
      return <StartRoom />;
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <div
        className="fixed bottom-0 z-50 bottom-0 transition duration-500 ease-in-out"
        style={{
          transform:
            currentScript && currentScript.length > 0
              ? 'translateY(0)'
              : 'translateY(100%)',
        }}
      >
        <ScriptOverlay />
      </div>

      {renderGameScreen()}
    </div>
  );
};

// export default Game;
