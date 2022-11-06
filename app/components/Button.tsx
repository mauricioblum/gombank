import React from 'react';
import classNames from 'classnames';
import type { ButtonProps } from 'ariakit/button';
import { Button as AriaButton } from 'ariakit/button';

type IButtonProps = ButtonProps & {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
};

export const Button: React.FC<IButtonProps> = ({
  children,
  variant = 'primary',
  className,
  disabled,
  ...rest
}) => {
  return (
    <AriaButton
      {...rest}
      className={classNames(
        `flex items-center justify-center whitespace-nowrap rounded-lg px-4 leading-6 h-10 border-2`,
        {
          'bg-neutral-700 hover:bg-neutral-800 text-white border-neutral-700 hover:border-neutral-800':
            variant === 'primary',
          'bg-lime-400 hover:bg-lime-500 text-white border-lime-400 hover:border-lime-500':
            variant === 'secondary',
          'bg-white hover:bg-neutral-700 text-neutral-700 hover:text-white border-neutral-700 hover:border-neutral-700':
            variant === 'tertiary',
          'cursor-not-allowed bg-neutral-200 text-white border-neutral-200 hover:bg-neutral-200 hover:border-neutral-200':
            disabled,
        },
        className
      )}
    >
      {children}
    </AriaButton>
  );
};
