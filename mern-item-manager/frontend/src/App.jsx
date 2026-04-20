import { useEffect, useState } from 'react';
import { getItems } from './api';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0d0d0f;
    --surface: #141416;
    --surface2: #1c1c1f;
    --border: #2a2a2e;
    --accent: #c8f03e;
    --accent2: #3ef0c8;
    --text: #f0f0ee;
    --text-muted: #6b6b72;
    --text-dim: #3a3a40;
    --danger: #f03e5a;
    --radius: 12px;
    --font-display: 'Syne', sans-serif;
    --font-mono: 'DM Mono', monospace;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-display);
    min-height: 100vh;
  }

  .app-wrapper {
    max-width: 760px;
    margin: 0 auto;
    padding: 3rem 1.5rem 5rem;
  }

  /* ── Header ── */
  .app-header {
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--border);
    padding-bottom: 2rem;
  }

  .app-header .eyebrow {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: var(--accent);
    text-transform: uppercase;
    margin-bottom: 0.6rem;
  }

  .app-header h1 {
    font-size: clamp(2rem, 6vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1;
    color: var(--text);
  }

  .app-header h1 span {
    color: var(--accent);
  }

  /* ── Form Card ── */
  .form-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 2rem;
    margin-bottom: 2.5rem;
    transition: border-color 0.2s;
  }

  .form-card:focus-within {
    border-color: var(--accent);
  }

  .form-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.75rem;
  }

  .form-icon {
    color: var(--accent);
    font-size: 1rem;
  }

  .form-header h2 {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: var(--text);
  }

  .field-group {
    margin-bottom: 1rem;
  }

  .field-group label {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 0.4rem;
  }

  .field-group input {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.7rem 0.9rem;
    color: var(--text);
    font-family: var(--font-display);
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.15s, background 0.15s;
  }

  .field-group input::placeholder { color: var(--text-dim); }

  .field-group input:focus {
    border-color: var(--accent);
    background: #1a1a1d;
  }

  /* Remove number input arrows */
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
  input[type=number] { -moz-appearance: textfield; }

  .submit-btn {
    width: 100%;
    margin-top: 0.5rem;
    padding: 0.85rem;
    background: var(--accent);
    color: #0d0d0f;
    border: none;
    border-radius: 8px;
    font-family: var(--font-display);
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 0.01em;
    transition: opacity 0.15s, transform 0.1s;
  }

  .submit-btn:hover { opacity: 0.88; }
  .submit-btn:active { transform: scale(0.99); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(0,0,0,0.3);
    border-top-color: #000;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Items Section ── */
  .items-section {}

  .items-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .items-header h2 {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text);
  }

  .item-count {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-muted);
  }

  .items-grid {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  /* ── Item Card ── */
  .item-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.1rem 1.25rem;
    display: grid;
    grid-template-columns: 2.5rem 1fr auto;
    align-items: center;
    gap: 1rem;
    animation: slideIn 0.3s ease both;
    transition: border-color 0.15s, background 0.15s;
  }

  .item-card:hover {
    border-color: #3a3a3e;
    background: #161618;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .item-index {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-dim);
    letter-spacing: 0.05em;
    user-select: none;
  }

  .item-body {}

  .item-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 0.2rem;
  }

  .item-desc {
    font-size: 0.78rem;
    color: var(--text-muted);
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 38ch;
  }

  .item-footer {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  .item-price {
    font-family: var(--font-mono);
    font-size: 0.82rem;
    color: var(--accent2);
    font-weight: 500;
    white-space: nowrap;
  }

  .delete-btn {
    width: 28px;
    height: 28px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-muted);
    font-size: 0.7rem;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .delete-btn:hover {
    background: var(--danger);
    color: #fff;
    border-color: var(--danger);
  }

  /* ── Empty State ── */
  .empty-state {
    border: 1px dashed var(--border);
    border-radius: var(--radius);
    padding: 3rem;
    text-align: center;
    color: var(--text-muted);
  }

  .empty-icon {
    display: block;
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    opacity: 0.4;
  }

  .empty-state p {
    font-size: 0.85rem;
    font-family: var(--font-mono);
  }

  /* ── Loading State ── */
  .loading-state {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 3rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 0.8rem;
  }
`;

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await getItems();
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="app-wrapper">
        <header className="app-header">
          <p className="eyebrow">MERN Stack</p>
          <h1>Item <span>Manager</span></h1>
        </header>

        <ItemForm onItemAdded={fetchItems} />

        {loading ? (
          <div className="loading-state">
            <span className="spinner" style={{ borderTopColor: '#6b6b72', borderColor: '#2a2a2e' }} />
            Loading items...
          </div>
        ) : (
          <ItemList items={items} onRefresh={fetchItems} />
        )}
      </div>
    </>
  );
}

export default App;
