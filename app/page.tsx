"use client";

import React, { useContext, useEffect } from 'react';
import { redirect } from 'next/navigation';

const HomePage = () => {
  redirect('/login');
  return null
};

export default HomePage;
