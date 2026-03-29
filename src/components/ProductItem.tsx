import type { Product } from '../types';

interface ProductItemProps {
  product: Product;
  onUpdatePrice: (id: string, price: number) => void;
  onDelete: (id: string) => void;
}

export default function ProductItem({ product, onUpdatePrice, onDelete }: ProductItemProps) {
  return (
    <div className="product-item">
      <div className="product-header">
        <div className="product-name-qty">
          <span className="product-name">{product.name}</span>
          <span className="product-qty">{product.expectedQty} unidad(es) esperadas</span>
        </div>
        <button 
          className="delete-btn" 
          onClick={() => onDelete(product.id)}
          aria-label="Eliminar producto"
        >
          Borrar
        </button>
      </div>
      
      <div className="product-price-input">
        <span className="price-label">Precio Anaquel ($):</span>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={product.shelfPrice > 0 ? product.shelfPrice : ''}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            onUpdatePrice(product.id, isNaN(val) ? 0 : val);
          }}
        />
      </div>
    </div>
  );
}
