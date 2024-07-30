import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

export const NewCampaign = () => {
  const [campaignName, setCampaignName] = useState('New Campaign');
  const [playerName, setPlayerName] = useState('Player 1');
  const [skipTutorial, setSkipTutorial] = useState(false);

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log('campaignName:', campaignName);
    console.log('playerName:', playerName);
    console.log('skipTutorial:', skipTutorial);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <header className="mb-16">
        <h1 className="uppercase font-bold">
          N<span className="text-4xl">ew</span> C
          <span className="text-4xl">ampaign</span>
        </h1>
      </header>

      <form
        className="flex flex-col items-center"
        onSubmit={(e) => handleOnSubmit(e)}
      >
        <label className="mb-5 w-[350px] grid grid-rows-1 grid-cols-3 items-center">
          <span className="text-right mr-3">Campaign Name</span>
          <input
            className="border-2 border-black px-3 py-1 col-span-2"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          />
        </label>
        <label className="mb-5 w-[350px] grid grid-rows-1 grid-cols-3 items-center">
          <span className="text-right mr-3">Player Name</span>
          <input
            className="border-2 border-black px-3 py-1 col-span-2"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </label>
        <label className="mb-5">
          <input
            type="checkbox"
            checked={skipTutorial}
            onChange={(e) => setSkipTutorial(e.target.checked)}
            className="mr-2"
          />
          Skip Tutorial
        </label>
        <button className="w-[300px] hover:border-yellow-500 mb-5">
          Create
        </button>
      </form>
      <Link to={'/'} className="">
        <button className="w-[300px] hover:border-yellow-500 mb-5 text-white bg-unset">
          Back
        </button>
      </Link>
    </div>
  );
};
