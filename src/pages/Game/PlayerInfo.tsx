import { FC } from 'react';
import { ActionPoints } from './ActionPoints';
import { useGameStateStore } from '../../stores/game';
import clsx from 'clsx';
import { usePlayerStore } from '../../stores/player';
import { Healthbar } from './Healthbar';

export const PlayerInfo: FC = () => {
  const { player } = usePlayerStore();
  const { isRoomOver } = useGameStateStore();

  return (
    <div className="flex flex-col justify-center w-full">
      {/* Display statuses */}
      {/* {player.statuses.length > 0 && (
        <div className="flex justify-center items-center mb-3">
          {player.statuses.map((status) => (
            <StatusEffect key={status.id} status={status} />
          ))}
        </div>
      )} */}

      {/* Player health and action points */}
      <div className="w-full ml-auto mr-auto text-left flex flex-col justify-center items-center">
        {!isRoomOver && (
          <div className="mb-3">
            <ActionPoints />
          </div>
        )}
        <div
          className={clsx(
            'flex items-center w-[400px] py-2 px-3 bg-neutral-900'
          )}
        >
          <Healthbar entity={player} />
        </div>
      </div>
    </div>
  );
};
