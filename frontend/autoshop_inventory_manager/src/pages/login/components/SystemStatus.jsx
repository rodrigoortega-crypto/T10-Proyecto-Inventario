import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState({
    database: 'online',
    api: 'online',
    backup: 'online'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'var(--color-success)';
      case 'warning':
        return 'var(--color-warning)';
      case 'offline':
        return 'var(--color-error)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'offline':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online':
        return 'Operativo';
      case 'warning':
        return 'Advertencia';
      case 'offline':
        return 'Desconectado';
      default:
        return 'Desconocido';
    }
  };

  const statusItems = [
    { key: 'database', label: 'Base de Datos', status: systemStatus?.database },
    { key: 'api', label: 'Servicios API', status: systemStatus?.api },
    { key: 'backup', label: 'Respaldo', status: systemStatus?.backup }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={18} color="var(--color-primary)" />
          <h4 className="font-medium text-card-foreground">Estado del Sistema</h4>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
          <span className="text-xs text-muted-foreground">
            {currentTime?.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {statusItems?.map((item) => (
          <div key={item?.key} className="flex items-center justify-between">
            <span className="text-sm text-card-foreground">{item?.label}</span>
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(item?.status)} 
                size={16} 
                color={getStatusColor(item?.status)} 
              />
              <span 
                className="text-xs font-medium"
                style={{ color: getStatusColor(item?.status) }}
              >
                {getStatusText(item?.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Última actualización:</span>
          <span>
            {currentTime?.toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })} {currentTime?.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;