import React from 'react';
import Navbar from '../layout/Navbar';
import HomePage from './HomePage';
import Footer from '../layout/Footer';

export default function HomeLayout() {
  return (
    <>
      <Navbar />
      <HomePage />
      <Footer />
    </>
  )
}
