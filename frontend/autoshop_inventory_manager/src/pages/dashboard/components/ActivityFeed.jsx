import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = ({ activities = [], onViewAll, className = "" }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'stock_in':
        return 'ArrowUp';
      case 'stock_out':
        return 'ArrowDown';
      case 'adjustment':
        return 'Edit';
      case 'user_action':
        return 'User';
      case 'system':
        return 'Settings';
      case 'supplier':
        return 'Truck';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'stock_in':
        return 'text-success bg-success/10';
      case 'stock_out':
        return 'text-error bg-error/10';
      case 'adjustment':
        return 'text-warning bg-warning/10';
      case 'user_action':
        return 'text-primary bg-primary/10';
      case 'system':
        return 'text-secondary bg-secondary/10';
      case 'supplier':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted';
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

  const getRelativeTime = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInMinutes = Math.floor((now - activityDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora mismo';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Hace ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays}d`;
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Actividad Reciente</h3>
          </div>
          {activities?.length > 0 && (
            <Button variant="outline" size="sm" onClick={onViewAll}>
              Ver todo
            </Button>
          )}
        </div>
      </div>
      <div className="p-6">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No hay actividad reciente</p>
            <p className="text-sm text-muted-foreground mt-1">
              Las actividades aparecerán aquí cuando ocurran
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities?.slice(0, 8)?.map((activity) => (
              <div key={activity?.id} className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                  <Icon name={getActivityIcon(activity?.type)} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity?.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{activity?.description}</p>
                      
                      {activity?.details && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          {activity?.details?.itemCode && (
                            <span className="font-mono bg-muted px-2 py-1 rounded mr-2">
                              {activity?.details?.itemCode}
                            </span>
                          )}
                          {activity?.details?.quantity && (
                            <span>Cantidad: {activity?.details?.quantity}</span>
                          )}
                          {activity?.details?.user && (
                            <span className="ml-2">Por: {activity?.details?.user}</span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right ml-4 flex-shrink-0">
                      <p className="text-xs text-muted-foreground">
                        {getRelativeTime(activity?.timestamp)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(activity?.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {activities?.length > 8 && (
              <div className="text-center pt-4 border-t border-border">
                <Button variant="outline" size="sm" onClick={onViewAll}>
                  Ver {activities?.length - 8} actividades más
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;