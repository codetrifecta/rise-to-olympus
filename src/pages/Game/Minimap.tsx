import { FC } from 'react';
import { useFloorStore } from '../../stores/floor';
import { ROOM_TYPE } from '../../constants/room';
import { IRoom } from '../../types';
import clsx from 'clsx';

export const Minimap: FC = () => {
  const { floor, currentRoom } = useFloorStore();

  return (
    <div className="relative bg-zinc-900 p-5 border-white border inline-block w-full h-full">
      {floor?.rooms.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((room, roomIndex) => {
            return (
              <RoomNode
                key={roomIndex}
                room={room}
                active={currentRoom ? currentRoom.id === room.id : false}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

const DOOR_BG_CLASSNAME = 'bg-white';

const RoomNode: FC<{ room: IRoom; active: boolean }> = ({ room, active }) => {
  return (
    <div className={`w-8 h-8 p-1 bg-zinc-900`}>
      <div
        className={clsx(
          'relative w-full h-full flex justify-center items-center p-2',
          {
            'bg-none': !room.isKnown,
            'bg-green-500': room.isKnown && room.type === ROOM_TYPE.START,
            'bg-red-500': room.isKnown && room.type === ROOM_TYPE.BOSS,
            'bg-blue-500': room.isKnown && room.type === ROOM_TYPE.COMMON,
          }
        )}
      >
        {active && (
          <div className={clsx('bg-black rounded-full w-2 h-2')}></div>
        )}
        {room.isCleared && room.northDoor && (
          <div
            className={clsx(
              'absolute top-0 left-[50%] w-2 h-1',
              DOOR_BG_CLASSNAME
            )}
            style={{ transform: 'translate(-50%, -50%)' }}
          ></div>
        )}
        {room.isCleared && room.southDoor && (
          <div
            className={clsx(
              'absolute bottom-0 left-[50%] w-2 h-1',
              DOOR_BG_CLASSNAME
            )}
            style={{ transform: 'translate(-50%, 50%)' }}
          ></div>
        )}
        {room.isCleared && room.eastDoor && (
          <div
            className={clsx(
              'absolute top-[50%] right-0 w-1 h-2',
              DOOR_BG_CLASSNAME
            )}
            style={{ transform: 'translate(50%, -50%)' }}
          ></div>
        )}
        {room.isCleared && room.westDoor && (
          <div
            className={clsx(
              'absolute top-[50%] left-0 w-1 h-2',
              DOOR_BG_CLASSNAME
            )}
            style={{ transform: 'translate(-50%, -50%)' }}
          ></div>
        )}
      </div>
    </div>
  );
};
