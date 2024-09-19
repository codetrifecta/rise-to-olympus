import { FC } from 'react';
import { useGameStateStore } from '../../stores/game';
import { useFloorStore } from '../../stores/floor';
import { IArmor, IConsumable, Item, IWeapon } from '../../types';
import { IconButton } from './IconButton';
import { Icon } from './Icon';
import { Tooltip } from './Tooltip';
import clsx from 'clsx';
import { ITEM_TYPE } from '../../constants/item';

export const ChestItemsDisplay: FC = () => {
  const { setIsChestOpen, setIsCharacterSheetOpen } = useGameStateStore();
  const { currentRoom } = useFloorStore();

  return (
    <div className="bg-zinc-900 p-5 border border-white h-full w-full">
      <div className="relative">
        <div
          className="absolute top-0 right-0 cursor-pointer text-red-500"
          onClick={() => {
            setIsChestOpen(false);
            setIsCharacterSheetOpen(false);
          }}
        >
          X
        </div>
        <h2 className="mb-5 pb-3 w-full border-b">Chest Items</h2>
      </div>
      <div className="flex justify-center items-center h-full gap-2">
        {currentRoom &&
          currentRoom.chestItems &&
          currentRoom.chestItems.map((item: Item) => {
            if (item.itemType === ITEM_TYPE.WEAPON) {
              const weapon = item as IWeapon;
              return (
                <WeaponCard
                  key={weapon.id}
                  weapon={weapon}
                  active={false}
                  onClick={() => {
                    // if (player.state.isAttacking === false) {
                    //   setPlayerWeapon(null);
                    // }
                  }}
                />
              );
            } else if (item.itemType === ITEM_TYPE.ARMOR) {
              const armor = item as IArmor;
              return (
                <ArmorCard
                  key={armor.id}
                  armor={armor}
                  active={false}
                  onClick={() => {
                    // if (player.state.isAttacking === false) {
                    //   setPlayerWeapon(null);
                    // }
                  }}
                />
              );
            } else if (item.itemType === ITEM_TYPE.CONSUMABLE) {
              const consumable = item as IConsumable;
              return (
                <ConsumableCard
                  key={consumable.id}
                  consumable={consumable}
                  active={false}
                  onClick={() => {
                    // if (player.state.isAttacking === false) {
                    //   setPlayerWeapon(null);
                    // }
                  }}
                />
              );
            }
          })}
        {currentRoom &&
          currentRoom.chestItems &&
          currentRoom.chestItems.length < 5 &&
          Array.from({ length: 5 - currentRoom.chestItems.length }).map(
            (_, index) => (
              <div
                key={index}
                className="w-14 h-14 bg-zinc-500 border border-white"
              ></div>
            )
          )}
      </div>
    </div>
  );
};

// const equipmentTypeClasses = 'mb-4';
// const equipmentTitleClasses = 'mb-0';
// const cardContainerClasses = 'relative flex gap-3 pb-5 p-3';
// const cardClasses =
//   'p-3 bg-zinc-700 border border-white min-w-[175px] cursor-pointer';
const cardParagraphClasses = 'text-base';
const EQUIPMENT_ICON_SIZE = 50;

const WeaponCard: FC<{
  weapon: IWeapon;
  active: boolean;
  onClick: () => void;
}> = ({ weapon, active, onClick }) => {
  return (
    <div className="relative">
      <IconButton onClick={onClick} disabled={active} active={active}>
        <Icon
          icon={weapon.icon}
          width={EQUIPMENT_ICON_SIZE}
          height={EQUIPMENT_ICON_SIZE}
        />
      </IconButton>
      <Tooltip>
        <h3>{weapon.name}</h3>
        {weapon.stats.strength > 0 && (
          <p className={clsx(cardParagraphClasses)}>
            Strength: {weapon.stats.strength}
          </p>
        )}
        {weapon.stats.intelligence > 0 && (
          <p className={clsx(cardParagraphClasses)}>
            Intelligence: {weapon.stats.intelligence}
          </p>
        )}
        {weapon.stats.defense > 0 && (
          <p className={clsx(cardParagraphClasses)}>
            Defense: {weapon.stats.defense}
          </p>
        )}
        {weapon.stats.constitution > 0 && (
          <p className={clsx(cardParagraphClasses)}>
            Constitution: {weapon.stats.constitution}
          </p>
        )}
        <p className={clsx(cardParagraphClasses)}>Range: {weapon.range}</p>
        <p className={clsx(cardParagraphClasses)}>Cost: {weapon.cost} AP</p>
      </Tooltip>
    </div>
  );
};

const ArmorCard: FC<{
  armor: IArmor;
  active: boolean;
  onClick?: () => void;
}> = ({ armor, active, onClick }) => {
  return (
    <div className="relative">
      <IconButton onClick={onClick} disabled={active} active={active}>
        <Icon
          icon={armor.icon}
          width={EQUIPMENT_ICON_SIZE}
          height={EQUIPMENT_ICON_SIZE}
        />
      </IconButton>
      <Tooltip>
        <h3>{armor.name}</h3>
        {armor.stats.strength > 0 && (
          <p className={clsx(cardParagraphClasses)}>
            Strength: {armor.stats.strength}
          </p>
        )}
        {armor.stats.intelligence > 0 && (
          <p className={clsx(cardParagraphClasses)}>
            Intelligence: {armor.stats.intelligence}
          </p>
        )}
        {armor.stats.defense > 0 && (
          <p className={clsx(cardParagraphClasses)}>
            Defense: {armor.stats.defense}
          </p>
        )}
        {armor.stats.constitution > 0 && (
          <p className={clsx(cardParagraphClasses)}>
            Constitution: {armor.stats.constitution}
          </p>
        )}
      </Tooltip>
    </div>
  );
};

const ConsumableCard: FC<{
  consumable: IConsumable;
  active: boolean;
  onClick?: () => void;
}> = ({ consumable, active, onClick }) => {
  return (
    <div className="relative">
      <IconButton onClick={onClick} disabled={active} active={active}>
        <Icon
          icon={consumable.icon}
          width={EQUIPMENT_ICON_SIZE}
          height={EQUIPMENT_ICON_SIZE}
        />
      </IconButton>
      <Tooltip>
        <h3>{consumable.name}</h3>
        <p>
          Potion to recover lost health points. Heals a % of maximum health.
        </p>
      </Tooltip>
    </div>
  );
};
