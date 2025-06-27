"use client";
import React from 'react';
import animationData from '../../../../public/animations/accounting-services.json';
import Lottie from 'lottie-react';

const AccountingServices = () => {
  return (
    <div className="jitter-container">
      <Lottie
        animationData={animationData}
        rendererSettings={{
          filterSize: {
            width: '200%',
            height: '200%',
            x: '-50%',
            y: '-50%',
          }
        }}
        className="w-full h-[50vh]"
      />
    </div>
  );
};


export default AccountingServices;