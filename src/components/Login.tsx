import { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Requisito: acceso permanente con usuario "Dann33" y contraseña "compra33"
    if (username === 'Dann33' && password === 'compra33') {
      setError(false);
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="gradient-text glow-purple">List Market</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          Tu presupuesto bajo control.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="login-error">Credenciales incorrectas.</p>}
          
          <button type="submit" className="primary-btn" style={{ marginTop: '16px' }}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
