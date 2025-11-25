import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsPanel = ({ alerts = [], onViewAll, onDismissAlert, className = "" }) => {
  const [expandedAlert, setExpandedAlert] = useState(null);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical':
        return 'text-yellow-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-yellow-800';
      default:
        return 'text-yellow-800';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleToggleExpand = (alertId) => {
    setExpandedAlert(expandedAlert === alertId ? null : alertId);
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-warning" />
            <h3 className="text-lg font-semibold text-foreground">Alertas de Stock</h3>
            {alerts?.length > 0 && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full border border-yellow-300">
                {alerts?.length}
              </span>
            )}
          </div>
          {alerts?.length > 0 && (
            <Button variant="outline" size="sm" onClick={onViewAll}>
              Ver todas
            </Button>
          )}
        </div>
      </div>
      <div className="p-6">
        {alerts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <p className="text-muted-foreground">No hay alertas activas</p>
            <p className="text-sm text-muted-foreground mt-1">
              Todos los productos tienen stock suficiente
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts?.slice(0, 5)?.map((alert) => (
              <div key={alert?.id} className="border border-yellow-300 rounded-lg p-4 bg-yellow-100/90">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Icon 
                      name={getAlertIcon(alert?.type)} 
                      size={20} 
                      className={getAlertColor(alert?.type)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-yellow-900">{alert?.title}</h4>
                        <span className="text-xs text-yellow-700">
                          {formatDate(alert?.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-yellow-800 mt-1">{alert?.message}</p>
                      
                      {alert?.details && (
                        <div className="mt-2 text-xs text-yellow-700">
                          <div className="flex flex-wrap gap-4">
                            {alert?.details?.itemCode && (
                              <span className="font-mono bg-yellow-200/80 px-2 py-1 rounded border border-yellow-300">
                                Código: {alert?.details?.itemCode}
                              </span>
                            )}
                            {alert?.details?.currentStock !== undefined && (
                              <span>Stock actual: {alert?.details?.currentStock}</span>
                            )}
                            {alert?.details?.minStock !== undefined && (
                              <span>Stock mínimo: {alert?.details?.minStock}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-3">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleToggleExpand(alert?.id)}
                      iconName={expandedAlert === alert?.id ? "ChevronUp" : "ChevronDown"}
                      iconSize={14}
                      className="text-yellow-700 hover:text-yellow-900"
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onDismissAlert(alert?.id)}
                      iconName="X"
                      iconSize={14}
                      className="text-yellow-700 hover:text-red-700"
                    />
                  </div>
                </div>
                
                {expandedAlert === alert?.id && alert?.expandedContent && (
                  <div className="mt-4 pt-4 border-t border-yellow-300">
                    <div className="text-sm text-yellow-800">
                      {alert?.expandedContent}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {alerts?.length > 5 && (
              <div className="text-center pt-4">
                <Button variant="outline" size="sm" onClick={onViewAll}>
                  Ver {alerts?.length - 5} alertas más
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;