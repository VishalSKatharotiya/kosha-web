import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import AdminModal from './AdminModal';
import { Plus, PencilSimple, Trash, X, Image as ImageIcon, MagnifyingGlass, Package, Tag, CaretUp, CaretDown } from '@phosphor-icons/react';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    stockQuantity: '',
    categoryId: '',
    image: '',
    images: [],
    tags: [],
    benefits: []
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/products'),
        api.get('/products/categories')
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching products data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        slug: product.slug,
        description: product.description || '',
        price: product.price,
        stockQuantity: product.stockQuantity,
        categoryId: product.categoryId,
        image: product.image || '',
        images: product.images || [],
        tags: Array.isArray(product.tags) ? product.tags : [],
        benefits: Array.isArray(product.benefits) ? product.benefits : []
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        price: '',
        stockQuantity: '',
        categoryId: '',
        image: '',
        images: [],
        tags: [],
        benefits: []
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
        // Ensure these are arrays for backend
        tags: Array.isArray(formData.tags) ? formData.tags : [],
        benefits: Array.isArray(formData.benefits) ? formData.benefits : [],
        images: Array.isArray(formData.images) ? formData.images : []
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, payload);
      } else {
        await api.post('/products', payload);
      }
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchData();
      } catch (error) {
        alert('Error deleting product');
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

  const filteredProducts = products
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.category?.name || '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let aVal, bVal;
      if (sortField === 'name') { aVal = a.name; bVal = b.name; }
      else if (sortField === 'category') { aVal = a.category?.name || ''; bVal = b.category?.name || ''; }
      else if (sortField === 'price') { aVal = a.price; bVal = b.price; }
      else if (sortField === 'stock') { aVal = a.stockQuantity; bVal = b.stockQuantity; }
      else return 0;
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="admin-section fade-in">
      <div className="section-header">
        <div className="header-left">
          <h2>Manage Products</h2>
          <div className="search-bar-premium">
            <MagnifyingGlass size={20} />
            <input 
              type="text" 
              placeholder="Search by name or category..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <button className="add-btn-premium" onClick={() => handleOpenModal()}>
          <Plus size={20} weight="bold" />
          Add Product
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="premium-admin-table">
            <thead>
              <tr className="table-head-gradient">
                <th className={`th-sortable${sortField === 'name' ? ' sorted' : ''}`} onClick={() => handleSort('name')}>
                  <div className="th-inner"><Package size={14} weight="bold" />Product<SortIcon field="name" /></div>
                </th>
                <th className={`th-sortable${sortField === 'category' ? ' sorted' : ''}`} onClick={() => handleSort('category')}>
                  <div className="th-inner"><Tag size={14} weight="bold" />Category<SortIcon field="category" /></div>
                </th>
                <th className={`th-sortable${sortField === 'price' ? ' sorted' : ''}`} onClick={() => handleSort('price')}>
                  <div className="th-inner">Price<SortIcon field="price" /></div>
                </th>
                <th className={`th-sortable${sortField === 'stock' ? ' sorted' : ''}`} onClick={() => handleSort('stock')}>
                  <div className="th-inner">Stock<SortIcon field="stock" /></div>
                </th>
                <th className="text-right"><div className="th-inner" style={{justifyContent:'flex-end'}}>Actions</div></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="table-row-hover">
                  <td>
                    <div className="product-cell-premium">
                      <div className="img-box">
                        <img src={(product.images || [])[0] || product.image || 'https://via.placeholder.com/50'} alt="" />
                      </div>
                      <div className="product-info">
                        <span className="name">{product.name}</span>
                        <span className="slug">{product.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="category-tag">{product.category?.name || 'Uncategorized'}</span>
                  </td>
                  <td><span className="price-text">₹{product.price}</span></td>
                  <td>
                    <span className={`stock-badge ${product.stockQuantity < 10 ? 'low' : ''}`}>
                      {product.stockQuantity} in stock
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="action-buttons">
                      <button className="icon-btn edit" title="Edit" onClick={() => handleOpenModal(product)}>
                        <PencilSimple size={18} />
                      </button>
                      <button className="icon-btn delete" title="Delete" onClick={() => handleDelete(product.id)}>
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
          <div className="premium-modal wide" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="premium-form">
              <div className="form-grid">
                <div className="form-column">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input 
                      type="text" 
                      value={formData.name} 
                      required 
                      placeholder="e.g. Aura Night Repair"
                      onChange={e => setFormData({ ...formData, name: e.target.value })} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Slug</label>
                    <input 
                      type="text" 
                      value={formData.slug} 
                      required 
                      placeholder="e.g. aura-night-repair"
                      onChange={e => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} 
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group half">
                      <label>Price (₹)</label>
                      <input 
                        type="number" 
                        value={formData.price} 
                        required 
                        placeholder="999"
                        onChange={e => setFormData({ ...formData, price: e.target.value })} 
                      />
                    </div>
                    <div className="form-group half">
                      <label>Stock Quantity</label>
                      <input 
                        type="number" 
                        value={formData.stockQuantity} 
                        required 
                        placeholder="100"
                        onChange={e => setFormData({ ...formData, stockQuantity: e.target.value })} 
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select 
                      value={formData.categoryId} 
                      required
                      onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                    >
                      <option value="">Select Category</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-column">
                  <div className="form-group">
                    <label>Main Image URL</label>
                    <div className="input-with-icon">
                      <ImageIcon size={20} />
                      <input 
                        type="text" 
                        value={formData.image} 
                        placeholder="https://..."
                        onChange={e => setFormData({ ...formData, image: e.target.value })} 
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea 
                      value={formData.description} 
                      placeholder="Product details..."
                      rows="7"
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-submit">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </AdminModal>
      )}
    </div>
  );
};

export default ProductManager;
