"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './roleSelection.module.css';

const RoleSelection = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button onClick={() => router.replace('/home')} className={styles.backButton}>Back</button>
      <div className={styles.option} onClick={() => router.replace('/customerRecommend')}>
        <h2 className={styles.optionTitle}>I am a Customer</h2>
      </div>
      <div className={styles.option} onClick={() => router.replace('/merchantRecommend')}>
        <h2 className={styles.optionTitle}>I am a Merchant</h2>
      </div>
    </div>
  );
};

export default RoleSelection;