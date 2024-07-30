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
        <button className="w-[300px] hover:border-white mb-5">
          New Campaign
        </button>
        <button className="w-[300px] hover:border-white mb-5">
          Load Campaign
        </button>
        {/* <button className="w-[300px] hover:border-white">Settings</button> */}
      </div>
    </div>
  );
};
