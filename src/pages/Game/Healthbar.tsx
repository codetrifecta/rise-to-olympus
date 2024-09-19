import { FC } from 'react';
import { getPlayerMaxHealth } from '../../utils/entity';
import { usePlayerStore } from '../../stores/player';

export const Healthbar: FC = () => {
  const { player } = usePlayerStore();
  const { health } = player;
  const maxHealth = getPlayerMaxHealth(player);

  const healthPercentage = (health / maxHealth) * 100;

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="relative w-full h-7 bg-gray-300 rounded-full flex justify-center items-center">
        <div
          className="absolute top-0 left-0 h-full bg-red-700 rounded-full transition-all ease-in-out duration-300 delay-0"
          style={{ width: `${healthPercentage > 0 ? healthPercentage : 0}%` }}
        ></div>
        <span className="text-black z-10 font-bold cursor-default">
          {health > 0 ? health : 0} / {maxHealth}
        </span>
      </div>
    </div>
  );
};
