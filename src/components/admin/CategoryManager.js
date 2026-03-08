import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import AdminModal from './AdminModal';
import { Plus, PencilSimple, Trash, X, Tag, MagnifyingGlass, CaretUp, CaretDown } from '@phosphor-icons/react';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || ''
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', slug: '', description: '' });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await api.put(`/products/categories/${editingCategory.id}`, formData);
      } else {
        await api.post('/products/categories', formData);
      }
      setShowModal(false);
      fetchCategories();
    } catch (error) {
      alert('Error saving category');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await api.delete(`/products/categories/${id}`);
        fetchCategories();
      } catch (error) {
        alert('Error deleting category');
      }
    }
  };

  const handleSort = (field) => {
    if (sortField === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };
  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="sort-arrow">⇅</span>;
    return sortDir === 'asc' ? <CaretUp size={12} weight="bold" className="sort-arrow" /> : <CaretDown size={12} weight="bold" className="sort-arrow" />;
  };

  const displayedCategories = categories
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || (c.slug || '').includes(search.toLowerCase()))
    .sort((a, b) => {
      const aVal = sortField === 'slug' ? a.slug : a.name;
      const bVal = sortField === 'slug' ? b.slug : b.name;
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="admin-section fade-in">
      <div className="section-header">
        <div className="header-left">
          <h2>Manage Categories</h2>
          <div className="search-bar-premium">
            <MagnifyingGlass size={20} />
            <input
              type="text"
              placeholder="Search categories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <button className="add-btn-premium" onClick={() => handleOpenModal()}>
          <Plus size={20} weight="bold" />
          Add Category
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Loading categories...</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="premium-admin-table">
            <thead>
              <tr className="table-head-gradient">
                <th className={`th-sortable${sortField === 'name' ? ' sorted' : ''}`} onClick={() => handleSort('name')}>
                  <div className="th-inner"><Tag size={14} weight="bold" />Name<SortIcon field="name" /></div>
                </th>
                <th className={`th-sortable${sortField === 'slug' ? ' sorted' : ''}`} onClick={() => handleSort('slug')}>
                  <div className="th-inner">Slug<SortIcon field="slug" /></div>
                </th>
                <th><div className="th-inner">Description</div></th>
                <th className="text-right"><div className="th-inner" style={{justifyContent:'flex-end'}}>Actions</div></th>
              </tr>
            </thead>
            <tbody>
              {displayedCategories.map((cat) => (
                <tr key={cat.id} className="table-row-hover">
                  <td className="font-bold">{cat.name}</td>
                  <td><code className="slug-tag">{cat.slug}</code></td>
                  <td className="text-muted">{cat.description || 'No description'}</td>
                  <td className="text-right">
                    <div className="action-buttons">
                      <button className="icon-btn edit" onClick={() => handleOpenModal(cat)} title="Edit">
                        <PencilSimple size={18} />
                      </button>
                      <button className="icon-btn delete" onClick={() => handleDelete(cat.id)} title="Delete">
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <AdminModal onClose={() => setShowModal(false)}>
          <div className="premium-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
              <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="premium-form">
              <div className="form-group">
                <label>Category Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  required 
                  placeholder="e.g. Face Care"
                  onChange={e => setFormData({ ...formData, name: e.target.value })} 
                />
              </div>
              <div className="form-group">
                <label>Slug</label>
                <input 
                  type="text" 
                  value={formData.slug} 
                  required 
                  placeholder="e.g. face-care"
                  onChange={e => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} 
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={formData.description} 
                  placeholder="Tell us about this category..."
                  rows="4"
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-submit">
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </AdminModal>
      )}
    </div>
  );
};

export default CategoryManager;
