import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { SCRIPT_SHOP, SCRIPT_SHOP_TUTORIAL } from '../../constants/scripts';
import { StartRoomEscModalOverlay } from '../../overlays/StartRoomEscModalOverlay';
import { useCampaignStore } from '../../stores/campaign';
import { useScriptStore } from '../../stores/script';

export const StartRoom = () => {
  const { setCurrentScript } = useScriptStore();
  const { selectedCampaign } = useCampaignStore();

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

  if (!selectedCampaign) return null;

  return (
    <>
      {escModalOpen && (
        <StartRoomEscModalOverlay onClose={() => setEscModalOpen(false)} />
      )}
      <h1>Start Room</h1>
      <p>Will be a small room where player starts a run</p>
      <Button
        onClick={() => {
          if (selectedCampaign.scriptsCompleted.shopTutorial === false) {
            setCurrentScript(SCRIPT_SHOP_TUTORIAL);
          } else {
            setCurrentScript(SCRIPT_SHOP);
          }
        }}
      >
        Shopkeeper
      </Button>
    </>
  );
};
