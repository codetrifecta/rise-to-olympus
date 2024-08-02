import { useNavigate, useSearchParams } from 'react-router-dom';
import { ScriptTextOverlay } from '../overlays/ScriptTextOverlay';
import { IScriptItem } from '../types';
import { useEffect, useState } from 'react';
import { SCRIPT_TUTORIAL } from '../constants/scripts';
import { useCampaignStore } from '../stores/campaign';

export const Game = () => {
  // Get tutorial query parameter
  const [textOverlayScript, setTextOverlayScript] = useState<IScriptItem[]>([]);

  const { campaigns, selectedCampaign, setCampaigns, setSelectedCampaign } =
    useCampaignStore();

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
      setTextOverlayScript(SCRIPT_TUTORIAL);
      console.log('Showing tutorial');
    }
  }, [searchParams, campaigns]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <div
        className="fixed bottom-0 z-50 bottom-0 transition duration-500 ease-in-out"
        style={{
          transform:
            textOverlayScript.length > 0 ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        <ScriptTextOverlay
          script={textOverlayScript}
          endScript={() => {
            setTextOverlayScript([]);

            if (!selectedCampaign) return;

            const editedCampaign = {
              ...selectedCampaign,
              scriptsCompleted: {
                ...selectedCampaign.scriptsCompleted,
                tutorial: true,
              },
            };

            const newCampaigns = campaigns.map((c) =>
              c.id === editedCampaign.id ? editedCampaign : c
            );

            setSelectedCampaign(editedCampaign);
            setCampaigns(newCampaigns);
          }}
        />
      </div>

      <h1 className="text-4xl font-bold mb-5">Game</h1>
      <p className="mb-5">
        This is the game page. It is used to display the game.
      </p>
    </div>
  );
};
