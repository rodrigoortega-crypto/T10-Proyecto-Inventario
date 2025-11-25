import React from 'react';
import Icon from '../../../components/AppIcon';

const MovementStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Movimientos Hoy',
      value: stats?.todayMovements,
      icon: 'Activity',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: stats?.todayChange,
      changeType: stats?.todayChange >= 0 ? 'positive' : 'negative'
    },
    {
      title: 'Entradas',
      value: stats?.totalIn,
      icon: 'ArrowDown',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: stats?.inChange,
      changeType: 'positive'
    },
    {
      title: 'Salidas',
      value: stats?.totalOut,
      icon: 'ArrowUp',
      color: 'text-error',
      bgColor: 'bg-error/10',
      change: stats?.outChange,
      changeType: 'negative'
    },
    {
      title: 'Ajustes',
      value: stats?.totalAdjustments,
      icon: 'Settings',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: stats?.adjustmentChange,
      changeType: 'neutral'
    }
  ];

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
              <div>
                <p className="text-sm font-medium text-text-secondary">{stat?.title}</p>
                <p className="text-2xl font-bold text-text-primary">
                  {stat?.value?.toLocaleString('es-ES')}
                </p>
              </div>
            </div>
          </div>
          
          {stat?.change !== undefined && (
            <div className="mt-4 flex items-center space-x-2">
              <Icon 
                name={getChangeIcon(stat?.changeType)} 
                size={16} 
                className={getChangeColor(stat?.changeType)} 
              />
              <span className={`text-sm font-medium ${getChangeColor(stat?.changeType)}`}>
                {stat?.change > 0 ? '+' : ''}{stat?.change}%
              </span>
              <span className="text-sm text-text-secondary">vs. ayer</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovementStats;