import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StockOverview = ({ stockData = {}, onViewDetails, className = "" }) => {
  const {
    totalItems = 0,
    lowStockItems = 0,
    outOfStockItems = 0,
    categories = [],
    recentMovements = []
  } = stockData;

  const stockCategories = [
    {
      id: 'motor',
      name: 'Motor',
      icon: 'Cog',
      count: categories?.find(c => c?.id === 'motor')?.count || 0,
      color: 'text-primary bg-primary/10'
    },
    {
      id: 'frenos',
      name: 'Frenos',
      icon: 'Disc',
      count: categories?.find(c => c?.id === 'frenos')?.count || 0,
      color: 'text-error bg-error/10'
    },
    {
      id: 'suspension',
      name: 'Suspensión',
      icon: 'Zap',
      count: categories?.find(c => c?.id === 'suspension')?.count || 0,
      color: 'text-warning bg-warning/10'
    },
    {
      id: 'electrico',
      name: 'Eléctrico',
      icon: 'Zap',
      count: categories?.find(c => c?.id === 'electrico')?.count || 0,
      color: 'text-success bg-success/10'
    },
    {
      id: 'carroceria',
      name: 'Carrocería',
      icon: 'Car',
      count: categories?.find(c => c?.id === 'carroceria')?.count || 0,
      color: 'text-secondary bg-secondary/10'
    }
  ];

  const getStockStatus = () => {
    const criticalPercentage = (outOfStockItems / totalItems) * 100;
    const lowStockPercentage = (lowStockItems / totalItems) * 100;
    
    if (criticalPercentage > 5) return { status: 'critical', color: 'text-error' };
    if (lowStockPercentage > 15) return { status: 'warning', color: 'text-warning' };
    return { status: 'good', color: 'text-success' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Package" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Resumen de Stock</h3>
          </div>
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            Ver detalles
          </Button>
        </div>
      </div>
      <div className="p-6">
        {/* Stock Status Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{totalItems}</div>
            <div className="text-sm text-muted-foreground">Total Artículos</div>
          </div>
          <div className="text-center p-4 bg-warning/10 rounded-lg">
            <div className="text-2xl font-bold text-warning">{lowStockItems}</div>
            <div className="text-sm text-muted-foreground">Stock Bajo</div>
          </div>
          <div className="text-center p-4 bg-error/10 rounded-lg">
            <div className="text-2xl font-bold text-error">{outOfStockItems}</div>
            <div className="text-sm text-muted-foreground">Sin Stock</div>
          </div>
        </div>

        {/* Stock Status Indicator */}
        <div className="mb-6 p-4 border border-border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={stockStatus?.status === 'critical' ? 'AlertTriangle' : 
                      stockStatus?.status === 'warning' ? 'AlertCircle' : 'CheckCircle'} 
                size={20} 
                className={stockStatus?.color} 
              />
              <span className={`font-medium ${stockStatus?.color}`}>
                {stockStatus?.status === 'critical' ? 'Estado Crítico' :
                 stockStatus?.status === 'warning' ? 'Requiere Atención' : 'Estado Saludable'}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {((totalItems - outOfStockItems) / totalItems * 100)?.toFixed(1)}% disponible
            </div>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Por Categorías</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {stockCategories?.map((category) => (
              <div key={category?.id} className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-hover cursor-pointer">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${category?.color}`}>
                  <Icon name={category?.icon} size={16} />
                </div>
                <div className="text-sm font-medium text-foreground">{category?.count}</div>
                <div className="text-xs text-muted-foreground">{category?.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Movements Preview */}
        {recentMovements?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Movimientos Recientes</h4>
            <div className="space-y-2">
              {recentMovements?.slice(0, 3)?.map((movement) => (
                <div key={movement?.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={movement?.type === 'in' ? 'ArrowUp' : 'ArrowDown'} 
                      size={14} 
                      className={movement?.type === 'in' ? 'text-success' : 'text-error'} 
                    />
                    <span className="text-sm text-foreground">{movement?.item}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {movement?.quantity > 0 ? '+' : ''}{movement?.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockOverview;