import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ metric }) => {
  const getTrendIcon = () => {
    if (metric?.trend > 0) return 'TrendingUp';
    if (metric?.trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (metric?.trend > 0) return 'text-success';
    if (metric?.trend < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const formatValue = (value) => {
    if (typeof value === 'number') {
      if (value >= 1000000) {
        return `${(value / 1000000)?.toFixed(1)}M`;
      } else if (value >= 1000) {
        return `${(value / 1000)?.toFixed(1)}K`;
      }
      return value?.toLocaleString('es-ES');
    }
    return value;
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${metric?.bgColor || 'bg-primary/10'}`}>
          <Icon 
            name={metric?.icon} 
            size={24} 
            color={metric?.iconColor || 'var(--color-primary)'}
          />
        </div>
        {metric?.trend !== 0 && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={16} />
            <span className="text-sm font-medium">
              {Math.abs(metric?.trend)}%
            </span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          {metric?.title}
        </h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-foreground">
            {formatValue(metric?.value)}
          </span>
          {metric?.unit && (
            <span className="text-sm text-muted-foreground">
              {metric?.unit}
            </span>
          )}
        </div>
        {metric?.subtitle && (
          <p className="text-xs text-muted-foreground">
            {metric?.subtitle}
          </p>
        )}
      </div>
      {metric?.progress !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progreso</span>
            <span>{metric?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                metric?.progress >= 80 ? 'bg-success' : 
                metric?.progress >= 60 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${metric?.progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricsCard;