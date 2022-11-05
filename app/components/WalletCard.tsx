import React from 'react';
import classNames from 'classnames';
import { formatCurrency } from '../utils/formatCurrency';

interface WalletCardProps {
  walletName: string;
  balance: number;
  currency: string;
  active?: boolean;
  onClick?: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({
  walletName,
  balance,
  currency,
  active,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={classNames('relative shadow-md rounded-xl p-5 pb-3 w-64 h-44 cursor-pointer', {
        'bg-lime-600 text-white': active,
        'bg-white text-neutral-500': !active,
      })}
    >
      <div className="absolute top-3 left-2">{currency}</div>

      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center justify-center mt-4">
          <p>{walletName}</p>
        </div>
        <p className="font-bold text-xl">{formatCurrency(balance, currency)}</p>
      </div>
    </div>
  );
};
