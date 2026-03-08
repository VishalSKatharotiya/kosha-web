import { createPortal } from 'react-dom';

/**
 * Renders modal content directly into document.body via a React portal,
 * ensuring it always covers the full screen regardless of parent stacking context.
 */
const AdminModal = ({ children, onClose }) => {
  return createPortal(
    <div className="premium-modal-overlay" onClick={onClose}>
      {children}
    </div>,
    document.body
  );
};

export default AdminModal;
