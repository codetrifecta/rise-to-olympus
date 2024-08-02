import { IScript } from '../types';

export const ScriptTextOverlay = () => {
  const handlePreviousDialog = () => {
    console.log('Previous dialog');
  };

  const handleNextDialog = () => {
    console.log('Next dialog');
  };

  return (
    <div className="fixed bottom-0 z-50 bottom-0 bg-black w-full min-h-[200px] py-5 px-10 shadow-sm shadow-white">
      <h2 className="text-white">Dialog Overlay</h2>
      <p className="text-white">
        This is the dialog overlay. It is used to display a dialog.
      </p>
      <div className="absolute bottom-5 right-5">
        <button
          className="text-white hover:border-yellow-500"
          onClick={handlePreviousDialog}
        >
          {'<'}
        </button>
        <button
          className="text-white hover:border-yellow-500"
          onClick={handleNextDialog}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};
