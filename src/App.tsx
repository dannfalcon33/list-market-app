import { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import type { AppState, Product } from './types';

// Let's set initial default state
const defaultState: AppState = {
  isLoggedIn: false,
  budget: 100, // Default 100 USD
  products: []
};

// Local storage key
const STORAGE_KEY = 'list_market_state';

function App() {
  const [state, setState] = useState<AppState>(() => {
    // Attempt to load from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing local storage', e);
      }
    }
    return defaultState;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const handleLogin = () => {
    setState(s => ({ ...s, isLoggedIn: true }));
  };

  const handleLogout = () => {
    // Optionally you can clear budget/products on logout, 
    // but the prompt says permanent login access (they are shopping)
    // we just sign them out visually
    setState(s => ({ ...s, isLoggedIn: false }));
  };

  const setBudget = (val: number) => {
    setState(s => ({ ...s, budget: val }));
  };

  const setProducts = (action: React.SetStateAction<Product[]>) => {
    setState(s => {
      const nextProducts = typeof action === 'function' ? action(s.products) : action;
      return { ...s, products: nextProducts };
    });
  };

  const content = !state.isLoggedIn ? (
    <Login onLogin={handleLogin} />
  ) : (
    <Dashboard 
      budget={state.budget} 
      setBudget={setBudget}
      products={state.products}
      setProducts={setProducts}
      onLogout={handleLogout}
    />
  );

  return (
    <>
      <div className="bg-bubbles">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
      </div>
      {content}
    </>
  );
}

export default App;
