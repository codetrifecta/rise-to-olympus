import { Link } from 'react-router-dom';
import { useCampaignStore } from '../stores/campaign';
import { useEffect } from 'react';
import clsx from 'clsx';

export const MainMenu = () => {
  const { campaigns } = useCampaignStore();

  useEffect(() => {
    // Fetch campaigns from local storage
  }, []);

  return (
    <div
      className="absolute top-[50%] left-[50%]"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <header className="mb-16">
        <h1 className="uppercase font-bold ">
          R<span className="text-4xl">eturn</span>{' '}
          <span className="text-4xl">to</span> O
          <span className="text-4xl">lympus</span>
        </h1>
      </header>

      <div className="flex flex-col items-center">
        <Link to="/new">
          <button className="w-[300px] hover:border-yellow-500 mb-5 text-white">
            New Campaign
          </button>
        </Link>
        <Link to={campaigns.length > 0 ? '/load' : '/'}>
          <button
            className={clsx('w-[300px] mb-5 text-white', {
              'hover:border-yellow-500': campaigns.length > 0,
              'opacity-50 cursor-default': campaigns.length <= 0,
            })}
            disabled={campaigns.length <= 0}
          >
            Load Campaign
          </button>
        </Link>
        {/* <button className="w-[300px] hover:border-white">Settings</button> */}
      </div>
    </div>
  );
};
