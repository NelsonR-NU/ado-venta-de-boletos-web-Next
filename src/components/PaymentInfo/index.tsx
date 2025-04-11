'use client';

import React from 'react';
import Card from '../Card';

const PaymentInfo: React.FC = () => {
  return (
    <div className="w-full flex gap-4">
      <Card>
        <h1 className="text-xl font-semibold mb-4">Payment Method</h1>
        </Card>
      <Card>
        <h1 className="text-xl font-semibold mb-4">SALDO MAX</h1>
      </Card>
    </div>
  );
};

export default PaymentInfo;
