import { useState, useMemo } from 'react';
import type { Product } from '../types';
import ProductItem from './ProductItem';

interface DashboardProps {
  onLogout: () => void;
  budget: number;
  setBudget: (val: number) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function Dashboard({
  onLogout,
  budget,
  setBudget,
  products,
  setProducts
}: DashboardProps) {
  const [newProductName, setNewProductName] = useState('');
  const [newProductQty, setNewProductQty] = useState(1);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [tempBudget, setTempBudget] = useState(budget.toString());

  const totalSpent = useMemo(() => {
    return products.reduce((acc, p) => acc + (p.shelfPrice * p.expectedQty), 0);
  }, [products]);

  const remaining = budget - totalSpent;
  const isExceeded = remaining < 0;

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim() || newProductQty < 1) return;
    
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: newProductName,
      expectedQty: newProductQty,
      shelfPrice: 0
    };
    
    setProducts(prev => [newProduct, ...prev]);
    setNewProductName('');
    setNewProductQty(1);
  };

  const handleUpdatePrice = (id: string, price: number) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, shelfPrice: price } : p
    ));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const saveBudget = () => {
    const b = parseFloat(tempBudget);
    if (!isNaN(b) && b >= 0) {
      setBudget(b);
    } else {
      setTempBudget(budget.toString());
    }
    setIsEditingBudget(false);
  };

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <h2 className="gradient-text glow-green" style={{ margin: 0 }}>List Market</h2>
        <button className="logout-btn" onClick={onLogout}>Salir</button>
      </header>

      <section className="budget-summary">
        <div className="budget-stats">
          <div className="stat-item">
            <span className="stat-label">Presupuesto</span>
            {isEditingBudget ? (
              <div className="budget-setup">
                <input 
                  type="number" 
                  value={tempBudget}
                  onChange={e => setTempBudget(e.target.value)}
                  onBlur={saveBudget}
                  autoFocus
                />
                <button className="secondary-btn" onClick={saveBudget}>✓</button>
              </div>
            ) : (
              <span className="stat-value" onClick={() => setIsEditingBudget(true)} style={{cursor: 'pointer'}}>
                ${budget.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="stat-item">
            <span className="stat-label">Gastado</span>
            <span className="stat-value">${totalSpent.toFixed(2)}</span>
          </div>
        </div>

        <div className="stat-item" style={{ marginTop: '8px' }}>
          <span className="stat-label">Restante</span>
          <span className={`stat-value ${isExceeded ? 'exceeded' : 'remaining'}`}>
            ${remaining.toFixed(2)}
          </span>
        </div>
      </section>

      <form className="add-product-form" onSubmit={handleAddProduct}>
        <input 
          type="text" 
          placeholder="Ej: Manzanas" 
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <input 
          type="number" 
          min="1" 
          value={newProductQty}
          onChange={(e) => setNewProductQty(parseInt(e.target.value) || 1)}
        />
        <button type="submit" className="add-btn" aria-label="Agregar Producto">
          +
        </button>
      </form>

      <section className="product-list">
        {products.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '20px' }}>
            Empieza agregando productos a tu lista...
          </p>
        ) : (
          products.map(p => (
            <ProductItem 
              key={p.id} 
              product={p} 
              onUpdatePrice={handleUpdatePrice} 
              onDelete={handleDeleteProduct} 
            />
          ))
        )}
      </section>
    </div>
  );
}
