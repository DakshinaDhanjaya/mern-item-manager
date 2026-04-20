import { deleteItem } from '../api';

export default function ItemList({ items, onRefresh }) {
  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    try {
      await deleteItem(id);
      onRefresh();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">◎</span>
        <p>No items yet. Add one above.</p>
      </div>
    );
  }

  return (
    <div className="items-section">
      <div className="items-header">
        <h2>Items</h2>
        <span className="item-count">{items.length} item{items.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="items-grid">
        {items.map((item, index) => (
          <div
            key={item._id}
            className="item-card"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="item-index">{String(index + 1).padStart(2, '0')}</div>
            <div className="item-body">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-desc">{item.description}</p>
            </div>
            <div className="item-footer">
              <span className="item-price">LKR {Number(item.price).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
                title="Delete item"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
