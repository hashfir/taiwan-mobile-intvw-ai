import React from 'react';
import { AlertTriangle, HelpCircle } from 'lucide-react';

export function ModalDialog({ isOpen, title, message, confirmText = '確定', cancelText = '取消', onConfirm, onCancel, type = 'danger' }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" data-testid="modal-backdrop" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className={`modal-header ${type}`}>
          {type === 'danger' ? <AlertTriangle size={24} /> : <HelpCircle size={24} />}
          <h3>{title}</h3>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            {cancelText}
          </button>
          <button className={`btn btn-${type === 'danger' ? 'danger' : 'primary'}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
