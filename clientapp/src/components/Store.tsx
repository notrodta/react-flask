import React, { useState, useEffect } from 'react';
import StoreService from '../services/StoreService';

const Store = () => {
  useEffect(() => {
    // const headers = { 'Content-Type': 'application/json' };
    // fetch('http://127.0.0.1:5000/items', { headers })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    StoreService.getAll().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      <p>Store</p>
    </div>
  );
};

export default Store;
