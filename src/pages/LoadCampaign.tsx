import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ICampaign } from '../types';
import clsx from 'clsx';
import { useCampaignStore } from '../store/campaign';

export const LoadCampaign = () => {
  const { campaigns, deleteCampaign } = useCampaignStore();
  const [selectedCampaign, setSelectedCampaign] = useState<ICampaign | null>(
    null
  );

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

  const handleDeleteCampaign = (campaign: ICampaign | null) => {
    if (campaign) {
      const newCampaigns = deleteCampaign(campaign);
      setSelectedCampaign(newCampaigns[0]);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-16">
      <header className="mb-16">
        <h1 className="uppercase font-bold">
          L<span className="text-4xl">oad</span> C
          <span className="text-4xl">ampaign</span>
        </h1>
      </header>
      <div className="flex max-h-[50vh] mb-5">
        <div className="flex flex-col items-center gap-4 px-10 overflow-y-scroll max-h-[50vh] mr-10">
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
              ? 'Player Name ' + selectedCampaign.playerName
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

      <div>
        <button
          className="w-[300px] hover:border-yellow-500 mb-5 text-white bg-unset mr-5"
          disabled={selectedCampaign === null}
        >
          Load Campaign
        </button>

        <button
          className="w-[300px] hover:border-yellow-500 mb-5 text-white bg-unset"
          disabled={selectedCampaign === null}
          onClick={() => handleDeleteCampaign(selectedCampaign)}
        >
          Delete Campaign
        </button>
      </div>

      <Link to={'/'} className="">
        <button className="w-[300px] hover:border-yellow-500 mb-5 text-white bg-unset">
          Back
        </button>
      </Link>
    </div>
  );
};
