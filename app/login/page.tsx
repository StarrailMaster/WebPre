"use client";

import React, { useState } from 'react';
import styles from './login.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://13.55.190.75:8080/api/login', {
        username,
        password,
      });
      if (response.status == 200){
        localStorage.setItem("userId", response.data.userId);
        router.replace('/home');
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  const step2Register = () => {
    router.replace('/register');
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <h2 className={styles.loginTitle}>SIGN IN</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className={styles.loginButton}>SIGN IN</button>
          <button type="submit" className={styles.registerButton} onClick={step2Register}>SIGN UP</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
