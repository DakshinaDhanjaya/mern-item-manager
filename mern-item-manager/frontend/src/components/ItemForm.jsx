import { useState } from 'react';
import { createItem } from '../api';

export default function ItemForm({ onItemAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createItem({ name, description, price: Number(price) });
      setName('');
      setDescription('');
      setPrice('');
      onItemAdded();
    } catch (err) {
      console.error('Error creating item:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <span className="form-icon">✦</span>
        <h2>Add New Item</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <label>Item Name</label>
          <input
            placeholder="e.g. Wireless Mouse"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="field-group">
          <label>Description</label>
          <input
            placeholder="e.g. Ergonomic 2.4GHz wireless mouse"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="field-group">
          <label>Price (LKR)</label>
          <input
            placeholder="e.g. 2999.00"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (
            <span className="btn-loading">
              <span className="spinner" /> Adding...
            </span>
          ) : (
            '+ Add Item'
          )}
        </button>
      </form>
    </div>
  );
}
