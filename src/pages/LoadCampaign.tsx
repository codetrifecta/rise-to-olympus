import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ICampaign } from '../types';
import clsx from 'clsx';
import { useCampaignStore } from '../stores/campaign';
import { Button } from '../components/Button';
import { isCampaign } from '../utils/campaign';

export const LoadCampaign = () => {
  const { campaigns, selectedCampaign, setSelectedCampaign, deleteCampaign } =
    useCampaignStore();

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch campaigns from local storage
    // If no campaigns, navigate to home page
    if (campaigns.length === 0) {
      navigate('/');
    } else {
      setSelectedCampaign(campaigns[0]);
    }
  }, []);

  useEffect(() => {
    if (campaigns.length === 0) {
      navigate('/');
    }
  }, [campaigns.length]);

  const handleLoadCampaign = (campaign: ICampaign | null) => {
    if (campaign) {
      // Check if the campaign is valid
      if (isCampaign(campaign) === false) {
        console.log('Campaign is not valid');
        navigate('/load');
        return;
      }

      navigate(`/game?campaignId=${campaign.id}`);
    }
  };

  const handleDeleteCampaign = (campaign: ICampaign | null) => {
    if (campaign) {
      const newCampaigns = deleteCampaign(campaign);
      setSelectedCampaign(newCampaigns[0]);
    }
  };

  return (
    <div
      className="absolute top-[50%] left-[50%] flex flex-col justify-center items-center py-16"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <header className="mb-20 pointer-events-none">
        <h1 className="uppercase font-bold text-7xl text-shadow">
          L<span className="text-5xl">oad</span> C
          <span className="text-5xl">ampaign</span>
        </h1>
      </header>
      <div className="flex max-h-[50vh] mb-5">
        <div className="flex flex-col items-center gap-4 px-10 overflow-y-scroll max-h-[35vh] mr-10">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              onClick={() => setSelectedCampaign(campaign)}
              className={clsx(
                'border bg-neutral-900 px-10 py-5 cursor-pointer',
                { 'border-yellow-500': selectedCampaign?.id === campaign.id },
                {
                  'border-neutral-900 hover:border-white':
                    selectedCampaign?.id !== campaign.id,
                }
              )}
            >
              <h2 className="text-white">{campaign.campaignName}</h2>

              <p className="text-white">{campaign.playerName}</p>

              <p className="text-white">Deaths: {campaign.numberOfDeaths}</p>

              <p className="text-white">Created: {campaign.createdAt}</p>
            </div>
          ))}
        </div>

        <div className="bg-neutral-900 px-10 py-5">
          <h2 className="text-white">
            {selectedCampaign ? selectedCampaign.campaignName : 'No campaign'}
          </h2>
          <p className="text-white">
            {selectedCampaign
              ? 'Player Name: ' + selectedCampaign.playerName
              : 'No player'}
          </p>
          <p className="text-white">
            {selectedCampaign
              ? 'Deaths: ' + selectedCampaign.numberOfDeaths
              : 'No deaths'}
          </p>
          <p className="text-white">
            {selectedCampaign ? selectedCampaign.createdAt : 'No created date'}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <Button
          className="w-[350px] hover:border-yellow-500 mb-5 text-white bg-unset text-2xl"
          disabled={selectedCampaign === null}
          onClick={() => handleLoadCampaign(selectedCampaign)}
        >
          Load Campaign
        </Button>

        <Button
          className="w-[350px] hover:border-yellow-500 mb-5 text-white bg-unset text-2xl"
          disabled={selectedCampaign === null}
          onClick={() => handleDeleteCampaign(selectedCampaign)}
        >
          Delete Campaign
        </Button>
        <Link to={'/'} className="w-[350px]">
          <Button className="w-full hover:border-yellow-500 mb-5 text-white bg-unset text-2xl">
            Back
          </Button>
        </Link>
      </div>
    </div>
  );
};
