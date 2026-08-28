import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="pulse-circle"></div>
        <h1>نبض الأرض</h1>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="hero">
        <h1>نبض الأرض</h1>
        <p>منصة لمراقبة نبض كوكبنا</p>
      </header>
    </div>
  );
}

export default App;
