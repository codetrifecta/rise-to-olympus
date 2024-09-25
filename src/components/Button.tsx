import clsx from 'clsx';
import { FC } from 'react';

export const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button
      className={clsx(
        'w-[300px] mb-5 text-white bg-neutral-900 text-2xl',
        props.className,
        { 'hover:border-yellow-500': !props.disabled },
        { 'opacity-50 cursor-default': props.disabled }
      )}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
