"use client";

import React, { useState } from 'react';
import styles from './register.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();


  const handRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/register', {
        username,
        password,
      });
      if (response.status == 200) {
        router.replace('/login');
      }
    } catch (error) {
      setError('Register failed');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <h2 className={styles.loginTitle}>SIGN UP</h2>
        <form onSubmit={handRegister}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Username:</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.registerButton}>SIGN UP</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
