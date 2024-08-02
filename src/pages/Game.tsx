import { useSearchParams } from 'react-router-dom';
import { ScriptTextOverlay } from '../overlays/ScriptTextOverlay';
import { IScriptItem } from '../types';
import { useEffect, useState } from 'react';
import { SCRIPT_TUTORIAL } from '../constants/scripts';
import { useCampaignStore } from '../stores/campaign';

export const Game = () => {
  // Get tutorial query parameter
  const [textOverlayScript, setTextOverlayScript] = useState<IScriptItem[]>([]);

  const { campaigns, setSelectedCampaign } = useCampaignStore();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const skipTutorial = searchParams.get('skipTutorial');
    const campaignId = searchParams.get('campaignId');

    console.log('skipTutorial:', skipTutorial);
    console.log('campaignId:', campaignId);

    if (!campaignId) {
      console.log('No campaign ID found');
      return;
    }

    console.log(campaigns);

    // Find campaign by ID
    const campaign = campaigns.find((c) => c.id === campaignId);

    if (!campaign) {
      console.log('No campaign found');
      return;
    } else {
      setSelectedCampaign(campaign);
    }

    if (skipTutorial === 'false') {
      setTextOverlayScript(SCRIPT_TUTORIAL);
      console.log('Showing tutorial');
    }
  }, [searchParams, campaigns]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      {textOverlayScript.length > 0 && (
        <ScriptTextOverlay script={textOverlayScript} />
      )}
      <h1 className="text-4xl font-bold mb-5">Game</h1>
      <p className="mb-5">
        This is the game page. It is used to display the game.
      </p>
    </div>
  );
};
