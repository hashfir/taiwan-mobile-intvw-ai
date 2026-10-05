import React from 'react';
import { X, CheckCircle, Info } from 'lucide-react';

export function NotificationToast({ notifications, onDismiss }) {
  if (!notifications.length) return null;

  return (
    <div className="toast-container" data-testid="toast-container">
      {notifications.map((toast) => (
        <div key={toast.id} className={`toast-item toast-${toast.type}`}>
          {toast.type === 'success' ? (
            <CheckCircle className="toast-icon" size={18} />
          ) : (
            <Info className="toast-icon" size={18} />
          )}
          <span className="toast-message">{toast.message}</span>
          <button className="toast-close" onClick={() => onDismiss(toast.id)}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
