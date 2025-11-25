import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AlertNotificationBar = ({ 
  alerts = [], 
  onDismiss, 
  onViewDetails,
  className = "" 
}) => {
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  const activeAlerts = alerts?.filter(alert => !dismissedAlerts?.has(alert?.id));

  const handleDismiss = (alertId) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
    if (onDismiss) {
      onDismiss(alertId);
    }
  };

  const handleViewDetails = (alert) => {
    if (onViewDetails) {
      onViewDetails(alert);
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      case 'success':
        return 'CheckCircle';
      default:
        return 'Bell';
    }
  };

  const getAlertStyles = (type) => {
    // Always return yellow styling regardless of alert type
    return 'bg-yellow-100/95 border-yellow-400 text-yellow-900';
  };

  const getIconColor = (type) => {
    // Always return yellow color for icons
    return '#b45309'; // yellow-700 equivalent
  };

  if (activeAlerts?.length === 0) {
    return null;
  }

  return (
    <div className={`fixed top-16 left-0 right-0 z-1100 ${className}`}>
      <div className="px-4">
        {activeAlerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`mb-2 p-3 rounded-lg border-l-4 shadow-card animate-slide-in ${getAlertStyles(alert?.type)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <Icon 
                  name={getAlertIcon(alert?.type)} 
                  size={20} 
                  color={getIconColor(alert?.type)}
                  className="mt-0.5 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-yellow-900">{alert?.title}</h4>
                    {alert?.timestamp && (
                      <span className="text-xs text-yellow-700 ml-2">
                        {new Date(alert.timestamp)?.toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-yellow-800 mt-1">{alert?.message}</p>
                  
                  {alert?.details && (
                    <div className="mt-2 text-xs text-yellow-700">
                      {alert?.details?.itemCode && (
                        <span className="font-mono">Código: {alert?.details?.itemCode}</span>
                      )}
                      {alert?.details?.currentStock !== undefined && (
                        <span className="ml-3">Stock actual: {alert?.details?.currentStock}</span>
                      )}
                      {alert?.details?.minStock !== undefined && (
                        <span className="ml-3">Stock mínimo: {alert?.details?.minStock}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-3">
                {alert?.actionable && (
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleViewDetails(alert)}
                    className="text-xs text-yellow-800 border-yellow-300 hover:bg-yellow-200"
                  >
                    Ver detalles
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleDismiss(alert?.id)}
                  iconName="X"
                  iconSize={14}
                  className="text-yellow-700 hover:text-red-700"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertNotificationBar;