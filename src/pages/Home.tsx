export const Home = () => {
  return (
    <div>
      <h1 className="mb-2 uppercase font-bold mb-16">
        R<span className="text-4xl">eturn</span>{' '}
        <span className="text-4xl">to</span> O
        <span className="text-4xl">lympus</span>
      </h1>

      <div className="flex flex-col items-center">
        <button className="w-[300px] hover:border-white mb-5">
          New Campaign
        </button>
        <button className="w-[300px] hover:border-white mb-5">
          Load Campaign
        </button>
        <button className="w-[300px] hover:border-white">Settings</button>
      </div>
    </div>
  );
};
