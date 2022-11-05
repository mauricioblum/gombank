import React from 'react';

interface WalletCardProps {
  walletName: string;
  balance: string;
  currency: string;
}

export const WalletCard: React.FC<WalletCardProps> = ({ walletName, balance, currency }) => {
  return (
    <div className="bg-white relative shadow-md rounded-xl text-neutral-500 p-5 pb-3 w-64 h-44">
      <div className="absolute top-3 left-2">{currency}</div>

      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center justify-center mt-4">
          <p>{walletName}</p>
        </div>
        <p className="font-bold text-xl">
          {balance} {currency}
        </p>
      </div>
    </div>
  );
};
