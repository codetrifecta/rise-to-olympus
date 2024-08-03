import clsx from 'clsx';
import { FC } from 'react';

export const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button
      className={clsx(
        'w-[300px] hover:border-yellow-500 mb-5 text-white bg-unset ',
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
