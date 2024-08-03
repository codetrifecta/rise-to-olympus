import { FC, useEffect } from 'react';
import { IScriptItem } from '../types';
import { SCRIPT_PARENT, SCRIPT_TYPE } from '../constants/scripts';
import { useCampaignStore } from '../stores/campaign';
import clsx from 'clsx';
import { useScriptStore } from '../stores/script';

export const ScriptOverlay: FC = () => {
  const {
    currentScript,
    currentScriptItemIndex,
    setCurrentScript,
    setCurrentScriptItemIndex,
  } = useScriptStore();

  const { campaigns, selectedCampaign, setSelectedCampaign, setCampaigns } =
    useCampaignStore();

  useEffect(() => {
    if (currentScript === null || currentScript.length === 0) return;

    setCurrentScriptItemIndex(0);
  }, [currentScript, selectedCampaign]);

  const endScript = () => {
    console.log('End script');

    if (!selectedCampaign || !currentScript) return;

    const editedCampaign = {
      ...selectedCampaign,
      scriptsCompleted: {
        ...selectedCampaign.scriptsCompleted,
        tutorial: true,
      },
    };

    if (currentScript[0].parent === SCRIPT_PARENT.TUTORIAL) {
      editedCampaign.scriptsCompleted.tutorial = true;
    }

    const newCampaigns = campaigns.map((c) =>
      c.id === editedCampaign.id ? editedCampaign : c
    );

    setCurrentScript(null);
    setCurrentScriptItemIndex(0);
    setSelectedCampaign(editedCampaign);
    setCampaigns(newCampaigns);
  };

  const handlePreviousScriptItem = (currentScriptItemIndex: number) => {
    console.log('Previous script item');
    setCurrentScriptItemIndex(currentScriptItemIndex - 1);
  };

  const handleNextScriptItem = (currentScriptItemIndex: number) => {
    console.log('Previous script item');
    setCurrentScriptItemIndex(currentScriptItemIndex + 1);
  };

  const renderTextScriptItem = (scriptItem: IScriptItem | null) => {
    if (!scriptItem) return null;
    if (selectedCampaign === null) return null;

    // Fill text and speaker name placeholders with appropriate text
    if (scriptItem.text.includes('$PLAYER_NAME')) {
      scriptItem.text = scriptItem.text.replace(
        '$PLAYER_NAME',
        selectedCampaign.playerName
      );
    }
    scriptItem.speakerNames = scriptItem.speakerNames.map((name) => {
      if (name === '$PLAYER_NAME') {
        return selectedCampaign.playerName;
      }
      return name;
    });

    switch (scriptItem.type) {
      case SCRIPT_TYPE.DIALOG:
        return renderDialogScriptItem(scriptItem);
      case SCRIPT_TYPE.NARRATOR:
        return renderNarratorScriptItem(scriptItem);
      default:
        return renderPlaceHolderScriptItem(scriptItem);
    }
  };

  const renderPlaceHolderScriptItem = (scriptItem: IScriptItem) => {
    return <p className="italic">{scriptItem.text}</p>;
  };

  const renderDialogScriptItem = (scriptItem: IScriptItem) => {
    if (!scriptItem) return null;
    if (scriptItem.speakerNames.length === 0) return null;
    if (scriptItem.type !== SCRIPT_TYPE.DIALOG) return null;

    return (
      <>
        <p>{scriptItem.speakerNames.join(', ')}</p>
        <p>{scriptItem.text}</p>
      </>
    );
  };

  const renderNarratorScriptItem = (scriptItem: IScriptItem) => {
    if (!scriptItem) return null;
    if (scriptItem.speakerNames.length > 0) return null;
    if (scriptItem.type !== SCRIPT_TYPE.NARRATOR) return null;

    return <p className="italic">{scriptItem.text}</p>;
  };

  if (!currentScript) return null;

  return (
    <div className=" bg-black w-screen min-h-[200px] py-5 px-10 shadow-sm shadow-white">
      <div className="container mx-auto px-40">
        {renderTextScriptItem(currentScript[currentScriptItemIndex])}
      </div>

      <div className="absolute bottom-5 right-5">
        <button
          className={clsx('text-white', {
            'hover:border-yellow-500':
              currentScript[currentScriptItemIndex].id !== 0,
            'opacity-50 cursor-default':
              currentScript[currentScriptItemIndex].id === 0,
          })}
          onClick={() => handlePreviousScriptItem(currentScriptItemIndex)}
          disabled={currentScript[currentScriptItemIndex].id === 0}
        >
          {'<'}
        </button>
        <button
          className={clsx('text-white hover:border-yellow-500')}
          onClick={() => {
            if (
              currentScript[currentScriptItemIndex].id ===
              currentScript.length - 1
            ) {
              endScript();
              return;
            } else {
              handleNextScriptItem(currentScriptItemIndex);
            }
          }}
          disabled={
            currentScript[currentScriptItemIndex].id >= currentScript.length
          }
        >
          {currentScript[currentScriptItemIndex].id >= currentScript.length - 1
            ? '>>'
            : '>'}
        </button>
      </div>
    </div>
  );
};
