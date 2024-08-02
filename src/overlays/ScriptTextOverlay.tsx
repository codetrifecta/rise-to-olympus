import { FC, useEffect, useState } from 'react';
import { IScriptItem } from '../types';
import { SCRIPT_TYPE } from '../constants/scripts';
import { useCampaignStore } from '../stores/campaign';
import clsx from 'clsx';

export const ScriptTextOverlay: FC<{ script: IScriptItem[] }> = ({
  script,
}) => {
  const [currentScriptItem, setCurrentScriptItem] = useState<{
    id: number;
    scriptItem: IScriptItem;
  } | null>(null);

  const { campaigns, selectedCampaign } = useCampaignStore();

  useEffect(() => {
    if (script.length === 0) return;

    setCurrentScriptItem({ id: 0, scriptItem: script[0] });
  }, [script, selectedCampaign]);

  const handlePreviousDialog = (
    currentScriptItem: {
      id: number;
      scriptItem: IScriptItem;
    } | null
  ) => {
    console.log('Previous dialog');
    setCurrentScriptItem({
      id: currentScriptItem ? currentScriptItem.id - 1 : 0,
      scriptItem: script[currentScriptItem ? currentScriptItem.id - 1 : 0],
    });
  };

  const handleNextDialog = (
    currentScriptItem: {
      id: number;
      scriptItem: IScriptItem;
    } | null
  ) => {
    console.log('Next dialog');
    setCurrentScriptItem({
      id: currentScriptItem ? currentScriptItem.id + 1 : 0,
      scriptItem: script[currentScriptItem ? currentScriptItem.id + 1 : 0],
    });
  };

  console.log(selectedCampaign, campaigns);

  const renderTextScriptItem = (scriptItem: IScriptItem | null) => {
    if (!scriptItem) return null;
    if (selectedCampaign === null) return null;

    console.log(scriptItem);

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

  return (
    <div className="fixed bottom-0 z-50 bottom-0 bg-black w-full min-h-[200px] py-5 px-10 shadow-sm shadow-white">
      <div className="container mx-auto px-40">
        {renderTextScriptItem(
          currentScriptItem ? currentScriptItem.scriptItem : null
        )}
      </div>

      <div className="absolute bottom-5 right-5">
        <button
          className={clsx('text-white', {
            'hover:border-yellow-500': currentScriptItem?.id !== 0,
            'opacity-50 cursor-default': currentScriptItem?.id === 0,
          })}
          onClick={() => handlePreviousDialog(currentScriptItem)}
          disabled={currentScriptItem?.id === 0}
        >
          {'<'}
        </button>
        <button
          className={clsx('text-white hover:border-yellow-500')}
          onClick={() => {
            if (currentScriptItem?.id === script.length - 1) {
              console.log('End of script');
              return;
            } else {
              handleNextDialog(currentScriptItem);
            }
          }}
          disabled={currentScriptItem?.id === script.length}
        >
          {currentScriptItem?.id === script.length - 1 ? '>>' : '>'}
        </button>
      </div>
    </div>
  );
};
