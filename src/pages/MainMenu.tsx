import { Link } from 'react-router-dom';
import { useCampaignStore } from '../stores/campaign';
import { useEffect } from 'react';
import clsx from 'clsx';
import { Button } from '../components/Button';

export const MainMenu = () => {
  const { campaigns } = useCampaignStore();

  useEffect(() => {
    // Fetch campaigns from local storage
  }, []);

  return (
    <>
      <div
        className="absolute top-[50%] left-[50%]"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <header className="mb-20 pointer-events-none">
          <h1 className="uppercase font-bold text-7xl text-shadow">
            R<span className="text-5xl">ise</span>{' '}
            <span className="text-5xl">to</span> O
            <span className="text-5xl">lympus</span>
          </h1>
        </header>

        <div className="flex flex-col items-center">
          <Link to="/new">
            <Button className="w-[350px] mb-5 hover:border-yellow-500 text-white text-2xl">
              New Campaign
            </Button>
          </Link>
          <Link to={campaigns.length > 0 ? '/load' : '/'}>
            <Button
              className={clsx('w-[350px] text-white text-2xl', {
                'hover:border-yellow-500': campaigns.length > 0,
                'opacity-50 cursor-default': campaigns.length <= 0,
              })}
              disabled={campaigns.length <= 0}
            >
              Load Campaign
            </Button>
          </Link>
          {/* <button className="w-[300px] hover:border-white">Settings</button> */}
        </div>
      </div>
      <footer
        className="fixed bottom-10 left-[50%] w-full"
        style={{ transform: 'translateX(-50%)' }}
      >
        <p className="text-xl">
          Give Us Your Feedback here:
          <a
            href="https://docs.google.com/forms/d/1dP0Vs1oMszMEaOSc452c5NzVE50jgE2hDehxFWwyJ3o"
            target="blank"
            className="text-yellow-500 hover:underline hover:text-yellow-400 ml-2"
          >
            https://docs.google.com/forms/d/1dP0Vs1oMszMEaOSc452c5NzVE50jgE2hDehxFWwyJ3o
          </a>
        </p>
      </footer>
    </>
  );
};
