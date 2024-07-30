import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <header className="mb-16">
        <h1 className="uppercase font-bold">
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
        <Link to="/load">
          <button className="w-[300px] hover:border-yellow-500 mb-5 text-white">
            Load Campaign
          </button>
        </Link>
        {/* <button className="w-[300px] hover:border-white">Settings</button> */}
      </div>
    </div>
  );
};
