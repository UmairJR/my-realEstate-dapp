import React from 'react';
import NavbarUI from './ui/Navbar';

const Navigate = ({ accounts, web3Handler }) => {
  const title = "RealEstate"
  return (
    <>
      <NavbarUI logo={'./house_logo.png'} title={title} web3Handler={web3Handler} accounts={accounts} />
    </>
  );
};

export default Navigate;
