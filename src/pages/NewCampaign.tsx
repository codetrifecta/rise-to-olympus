import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ICampaign } from '../types';
import { useCampaignStore } from '../stores/campaign';
import { Button } from '../components/Button';
import { BASE_CAMPAIGN } from '../constants/campaign';

export const NewCampaign = () => {
  const [campaignName, setCampaignName] = useState('New Campaign');
  const [playerName, setPlayerName] = useState('Player 1');
  const [skipTutorial, setSkipTutorial] = useState(false);

  const { setCampaigns, setSelectedCampaign } = useCampaignStore();

  const navigate = useNavigate();

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log('campaignName:', campaignName);
    console.log('playerName:', playerName);
    console.log('skipTutorial:', skipTutorial);

    // Create new campaign object
    const newCampaign: ICampaign = {
      ...BASE_CAMPAIGN,
      id: uuidv4(),
      campaignName,
      playerName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Get existing campaigns from local storage
    const existingCampaigns = localStorage.getItem('campaigns');
    let campaigns: ICampaign[] = [];
    if (existingCampaigns) {
      campaigns = JSON.parse(existingCampaigns);
    }

    // Add new campaign to existing campaigns
    campaigns.push(newCampaign);

    // Save campaigns back to local storage
    localStorage.setItem('campaigns', JSON.stringify(campaigns));

    // Save campaigns to store
    setCampaigns(campaigns);

    // Set selected campaign
    setSelectedCampaign(newCampaign);

    // Redirect to home page
    navigate(
      `/game?campaignId=${newCampaign.id}${skipTutorial ? '&skipTutorial=true' : ''}`
    );
  };

  return (
    <div
      className="absolute top-[50%] left-[50%] flex flex-col justify-center items-center"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <header className="mb-20">
        <h1 className="uppercase font-bold text-7xl">
          N<span className="text-5xl">ew</span> C
          <span className="text-5xl">ampaign</span>
        </h1>
      </header>

      <form
        className="flex flex-col items-center w-[350px]"
        onSubmit={(e) => handleOnSubmit(e)}
      >
        <label className="mb-5 w-[350px] grid grid-rows-1 grid-cols-5 items-center text-xl">
          <span className="text-right mr-3 col-span-2">Campaign Name</span>
          <input
            className="border-2 border-black px-3 py-1 col-span-3"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          />
        </label>
        <label className="mb-5 w-[350px] grid grid-rows-1 grid-cols-5 items-center text-xl">
          <span className="text-right mr-3 col-span-2">Player Name</span>
          <input
            className="border-2 border-black px-3 py-1 col-span-3"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </label>
        <label className="mb-5 text-xl">
          <input
            type="checkbox"
            checked={skipTutorial}
            onChange={(e) => setSkipTutorial(e.target.checked)}
            className="mr-2"
          />
          Skip Tutorial
        </label>
      </form>

      <Button
        className="w-full hover:border-yellow-500 mb-5 text-2xl"
        onClick={handleOnSubmit}
      >
        Create
      </Button>
      <Link to={'/'} className="w-full">
        <Button className="w-full hover:border-yellow-500 mb-5 text-white bg-unset text-2xl">
          Back
        </Button>
      </Link>
    </div>
  );
};
