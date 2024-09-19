import { type FC } from 'react';
import { MAX_ACTION_POINTS } from '../../constants/entity';
import { useLogStore } from '../../stores/log';
import { usePlayerStore } from '../../stores/player';

// Display action points as circles
export const ActionPoints: FC = () => {
  const { playerMovementAPCost, player } = usePlayerStore();

  const {
    actionPoints,
    state,
    equipment: { weapon },
  } = player;

  const { addLog } = useLogStore();

  const emptyActionPoints = MAX_ACTION_POINTS - actionPoints;
  let usedActionPoints = 0;

  if (state.isAttacking) {
    if (!weapon) {
      addLog({
        message: (
          <>
            <span className="text-green-500">{player.name}</span> has no weapon
            equipped.
          </>
        ),
        type: 'error',
      });
      return;
    }
    usedActionPoints = weapon.cost;
  } else if (state.isMoving) {
    usedActionPoints = playerMovementAPCost;
  } else if (state.isUsingSkill) {
    const skill = player.skills.find((skill) => skill.id === state.skillId);
    if (!skill) {
      addLog({
        message: (
          <>
            <span className="text-green-500">{player.name}</span> is not using
            any skill.
          </>
        ),
        type: 'error',
      });
      return;
    }
    usedActionPoints = skill.cost;
  }

  const availableActionPoints = actionPoints - usedActionPoints;

  return (
    <div className="flex gap-2 justify-start items-center">
      {Array.from({ length: availableActionPoints }).map((_, index) => (
        <div
          key={index}
          className="w-4 h-4 border bg-green-700 rounded-full"
        ></div>
      ))}
      {Array.from({ length: usedActionPoints }).map((_, index) => (
        <div
          key={index}
          className="w-4 h-4 border bg-red-500 rounded-full"
        ></div>
      ))}
      {Array.from({ length: emptyActionPoints }).map((_, index) => (
        <div key={index} className="w-4 h-4 border rounded-full"></div>
      ))}
    </div>
  );
};
