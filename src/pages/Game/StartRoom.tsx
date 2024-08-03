import { Button } from '../../components/Button';
import { SCRIPT_SHOP, SCRIPT_SHOP_TUTORIAL } from '../../constants/scripts';
import { useCampaignStore } from '../../stores/campaign';
import { useScriptStore } from '../../stores/script';

export const StartRoom = () => {
  const { setCurrentScript } = useScriptStore();
  const { selectedCampaign } = useCampaignStore();

  if (!selectedCampaign) return null;

  return (
    <div>
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
    </div>
  );
};
