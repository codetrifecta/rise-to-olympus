import { FC, useMemo } from 'react';
import { useGameStateStore } from '../../stores/game';
import { useFloorStore } from '../../stores/floor';
import { IArmor, IConsumable, Item, IWeapon } from '../../types';
import { IconButton } from './IconButton';
import { Icon } from './Icon';
import { Tooltip } from './Tooltip';
import clsx from 'clsx';
import { ITEM_TYPE } from '../../constants/item';
import { usePlayerStore } from '../../stores/player';
import { ARMOR_PART } from '../../constants/armor';
import { DEFAULT_CHEST_ITEM_COUNT } from '../../constants/floor';

export const ChestItemsDisplay: FC = () => {
  const { setIsChestOpen, setIsCharacterSheetOpen } = useGameStateStore();
  const { currentRoom, floorChestItems, setFloorChestItems } = useFloorStore();
  const { player, setPlayer } = usePlayerStore();

  // Chest items for the current room
  const roomChestItems: Item[] = useMemo(() => {
    console.log('floorChestItems:', floorChestItems);
    if (currentRoom === null) {
      console.error('ChestItemsDisplay: roomChestItems: No current room');
      return [];
    }

    const roomPositionString =
      currentRoom.position[0] + ',' + currentRoom.position[1];
    const roomChestItems = floorChestItems.get(roomPositionString) || [];

    return roomChestItems;
  }, [currentRoom, floorChestItems]);

  // Switch item in chest with player's equipment
  const handleSwitchItem = (item: Item, itemIndex: number) => {
    if (currentRoom === null) {
      console.error('handleSwitchItem: No current room');
      return;
    }

    console.log('Switching item:', item);

    let switchedItem = null;
    let newPlayer = { ...player };

    switch (item.itemType) {
      case ITEM_TYPE.WEAPON: {
        const weaponInChest = item as IWeapon;
        const playerWeapon = newPlayer.equipment.weapon;
        newPlayer = {
          ...newPlayer,
          equipment: { ...newPlayer.equipment, weapon: weaponInChest },
        };

        if (playerWeapon?.name === 'Fists') {
          switchedItem = null;
        } else {
          switchedItem = playerWeapon;
        }
        break;
      }
      case ITEM_TYPE.ARMOR: {
        const armorInChest = item as IArmor;

        console.log('armorInChest:', armorInChest);
        switch (armorInChest.armorPart) {
          case ARMOR_PART.HELMET: {
            const playerHelmet = newPlayer.equipment.helmet;
            newPlayer = {
              ...newPlayer,
              equipment: { ...newPlayer.equipment, helmet: armorInChest },
            };
            switchedItem = playerHelmet;
            break;
          }
          case ARMOR_PART.CHESTPIECE: {
            const playerChestpiece = newPlayer.equipment.chestpiece;
            newPlayer = {
              ...newPlayer,
              equipment: { ...newPlayer.equipment, chestpiece: armorInChest },
            };
            switchedItem = playerChestpiece;
            console.log('switchedItem:', switchedItem);
            break;
          }
          case ARMOR_PART.LEGGING: {
            const playerLegging = newPlayer.equipment.legging;
            newPlayer = {
              ...newPlayer,
              equipment: { ...newPlayer.equipment, legging: armorInChest },
            };
            switchedItem = playerLegging;
            break;
          }
          default:
            break;
        }
        break;
      }
      case ITEM_TYPE.CONSUMABLE: {
        // For now, consumables are only health potions
        newPlayer = {
          ...newPlayer,
          healthPotions: newPlayer.healthPotions + 1,
        };
        break;
      }
      default:
        break;
    }

    // Update chest item
    const roomPositionString =
      currentRoom.position[0] + ',' + currentRoom.position[1];
    const newRoomChestItems = [...roomChestItems];

    // Check if item index is within bounds
    if (itemIndex < 0 || itemIndex >= newRoomChestItems.length) {
      console.error('handleSwitchItem: Item index out of bounds');
      return;
    }

    console.log('itemIndex:', itemIndex);

    if (switchedItem) {
      newRoomChestItems[itemIndex] = switchedItem;
    } else {
      // Pull items to the front
      newRoomChestItems.splice(itemIndex, 1);
    }

    // Update room chest items and player
    const newFloorChestItems = new Map(floorChestItems);
    newFloorChestItems.set(roomPositionString, newRoomChestItems);
    setFloorChestItems(newFloorChestItems);
    setPlayer(newPlayer);
  };

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
      <div className="grid grid-rows-2 grid-cols-5 justify-center items-center h-full gap-2">
        {roomChestItems.map((item: Item) => {
          if (item.itemType === ITEM_TYPE.WEAPON) {
            if (!player.equipment.weapon) {
              console.error('No weapon equipped');
              return null;
            }

            const weapon = item as IWeapon;
            return (
              <WeaponCard
                key={weapon.id}
                weapon={weapon}
                active={false}
                playerWeapon={player.equipment.weapon}
                onClick={() => {
                  handleSwitchItem(item, roomChestItems.indexOf(item));
                }}
              />
            );
          } else if (item.itemType === ITEM_TYPE.ARMOR) {
            const armor = item as IArmor;

            let playerArmor = null;

            switch (armor.armorPart) {
              case ARMOR_PART.HELMET:
                playerArmor = player.equipment.helmet;
                break;
              case ARMOR_PART.CHESTPIECE:
                playerArmor = player.equipment.chestpiece;
                break;
              case ARMOR_PART.LEGGING:
                playerArmor = player.equipment.legging;
                break;
            }

            return (
              <ArmorCard
                key={armor.id}
                armor={armor}
                active={false}
                playerArmor={playerArmor}
                onClick={() => {
                  handleSwitchItem(item, roomChestItems.indexOf(item));
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
                  handleSwitchItem(item, roomChestItems.indexOf(item));
                }}
              />
            );
          }
        })}
        {roomChestItems.length < DEFAULT_CHEST_ITEM_COUNT &&
          Array.from({
            length: DEFAULT_CHEST_ITEM_COUNT - roomChestItems.length,
          }).map((_, index) => (
            <div key={index} className="w-14 h-14 bg-zinc-800"></div>
          ))}
      </div>
    </div>
  );
};

// const equipmentTypeClasses = 'mb-4';
// const equipmentTitleClasses = 'mb-0';
// const cardContainerClasses = 'relative flex gap-3 pb-5 p-3';
// const cardClasses =
//   'p-3 bg-zinc-700 border border-white min-w-[175px] cursor-pointer';
const cardParagraphClasses = 'text-md';
const EQUIPMENT_ICON_SIZE = 50;

const WeaponCard: FC<{
  weapon: IWeapon;
  active: boolean;
  playerWeapon: IWeapon;
  onClick: () => void;
}> = ({ weapon, active, playerWeapon, onClick }) => {
  const strengthDiff = weapon.stats.strength - playerWeapon.stats.strength;
  const intelligenceDiff =
    weapon.stats.intelligence - playerWeapon.stats.intelligence;
  const defenseDiff = weapon.stats.defense - playerWeapon.stats.defense;
  const constitutionDiff =
    weapon.stats.constitution - playerWeapon.stats.constitution;
  const rangeDiff = weapon.range - playerWeapon.range;
  const costDiff = weapon.cost - playerWeapon.cost;

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
        <h2>{weapon.name}</h2>
        {weapon.stats.strength > 0 && (
          <p className={clsx(cardParagraphClasses)}>
            Strength: {weapon.stats.strength}
            {strengthDiff !== 0 ? (
              strengthDiff > 0 ? (
                <span className="text-green-600 ml-2">
                  +{Math.abs(strengthDiff)}
                </span>
              ) : (
                <span className="text-red-600 ml-2">
                  -{Math.abs(strengthDiff)}
                </span>
              )
            ) : null}
          </p>
        )}
        {weapon.stats.intelligence > 0 && (
          <p className={clsx(cardParagraphClasses)}>
            Intelligence: {weapon.stats.intelligence}
            {intelligenceDiff !== 0 ? (
              intelligenceDiff > 0 ? (
                <span className="text-green-600 ml-2">
                  +{Math.abs(intelligenceDiff)}
                </span>
              ) : (
                <span className="text-red-600 ml-2">
                  -{Math.abs(intelligenceDiff)}
                </span>
              )
            ) : null}
          </p>
        )}
        {weapon.stats.defense > 0 && (
          <p className={clsx(cardParagraphClasses)}>
            Defense: {weapon.stats.defense}
            {defenseDiff !== 0 ? (
              defenseDiff > 0 ? (
                <span className="text-green-600 ml-2">
                  +{Math.abs(defenseDiff)}
                </span>
              ) : (
                <span className="text-red-600 ml-2">
                  -{Math.abs(defenseDiff)}
                </span>
              )
            ) : null}
          </p>
        )}
        {(weapon.stats.constitution > 0 || constitutionDiff !== 0) && (
          <p className={clsx(cardParagraphClasses)}>
            Constitution: {weapon.stats.constitution}
            {constitutionDiff !== 0 ? (
              constitutionDiff > 0 ? (
                <span className="text-green-600 ml-2">
                  +{Math.abs(constitutionDiff)}
                </span>
              ) : (
                <span className="text-red-600 ml-2">
                  -{Math.abs(constitutionDiff)}
                </span>
              )
            ) : null}
          </p>
        )}
        <p className={clsx(cardParagraphClasses)}>
          Range: {weapon.range}
          {rangeDiff !== 0 ? (
            rangeDiff > 0 ? (
              <span className="text-green-600 ml-2">
                +{Math.abs(rangeDiff)}
              </span>
            ) : (
              <span className="text-red-600 ml-2">-{Math.abs(rangeDiff)}</span>
            )
          ) : null}
        </p>
        <p className={clsx(cardParagraphClasses)}>
          Cost: {weapon.cost} AP
          {costDiff !== 0 ? (
            costDiff > 0 ? (
              <span className="text-red-600 ml-2">+{Math.abs(costDiff)}</span>
            ) : (
              <span className="text-green-600 ml-2">-{Math.abs(costDiff)}</span>
            )
          ) : null}
        </p>
      </Tooltip>
    </div>
  );
};

const ArmorCard: FC<{
  armor: IArmor;
  active: boolean;
  playerArmor: IArmor | null;
  onClick?: () => void;
}> = ({ armor, active, playerArmor, onClick }) => {
  let strengthDiff = armor.stats.strength;
  let intelligenceDiff = armor.stats.intelligence;
  let defenseDiff = armor.stats.defense;
  let constitutionDiff = armor.stats.constitution;

  if (playerArmor) {
    strengthDiff = armor.stats.strength - playerArmor.stats.strength;
    intelligenceDiff =
      armor.stats.intelligence - playerArmor.stats.intelligence;
    defenseDiff = armor.stats.defense - playerArmor.stats.defense;
    constitutionDiff =
      armor.stats.constitution - playerArmor.stats.constitution;
  }

  console.log('armor:', armor, playerArmor);

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
        <h2>{armor.name}</h2>
        {armor.stats.strength > 0 && (
          <p className={clsx(cardParagraphClasses)}>
            Strength: {armor.stats.strength}
            {strengthDiff !== 0 ? (
              strengthDiff > 0 ? (
                <span className="text-green-600 ml-2">
                  +{Math.abs(strengthDiff)}
                </span>
              ) : (
                <span className="text-red-600 ml-2">
                  -{Math.abs(strengthDiff)}
                </span>
              )
            ) : null}
          </p>
        )}
        {armor.stats.intelligence > 0 && (
          <p className={clsx(cardParagraphClasses)}>
            Intelligence: {armor.stats.intelligence}
            {intelligenceDiff !== 0 ? (
              intelligenceDiff > 0 ? (
                <span className="text-green-600 ml-2">
                  +{Math.abs(intelligenceDiff)}
                </span>
              ) : (
                <span className="text-red-600 ml-2">
                  -{Math.abs(intelligenceDiff)}
                </span>
              )
            ) : null}
          </p>
        )}
        {armor.stats.defense > 0 && (
          <p className={clsx(cardParagraphClasses)}>
            Defense: {armor.stats.defense}
            {defenseDiff !== 0 ? (
              defenseDiff > 0 ? (
                <span className="text-green-600 ml-2">
                  +{Math.abs(defenseDiff)}
                </span>
              ) : (
                <span className="text-red-600 ml-2">
                  -{Math.abs(defenseDiff)}
                </span>
              )
            ) : null}
          </p>
        )}
        {armor.stats.constitution > 0 && (
          <p className={clsx(cardParagraphClasses)}>
            Constitution: {armor.stats.constitution}
            {constitutionDiff !== 0 ? (
              constitutionDiff > 0 ? (
                <span className="text-green-600 ml-2">
                  +{Math.abs(constitutionDiff)}
                </span>
              ) : (
                <span className="text-red-600 ml-2">
                  -{Math.abs(constitutionDiff)}
                </span>
              )
            ) : null}
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
        <h2>{consumable.name}</h2>
        <p>
          Potion to recover lost health points. Heals a % of maximum health.
        </p>
      </Tooltip>
    </div>
  );
};
