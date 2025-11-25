import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SupplierCard = ({ supplier, onEdit, onViewDetails, onContact }) => {
  const getPerformanceColor = (rating) => {
    if (rating >= 4.5) return 'text-success';
    if (rating >= 3.5) return 'text-warning';
    return 'text-error';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Activo' },
      inactive: { color: 'bg-error text-error-foreground', label: 'Inactivo' },
      pending: { color: 'bg-warning text-warning-foreground', label: 'Pendiente' }
    };
    return statusConfig?.[status] || statusConfig?.active;
  };

  const statusBadge = getStatusBadge(supplier?.status);

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-card-foreground text-lg">{supplier?.name}</h3>
          <p className="text-muted-foreground text-sm">{supplier?.category}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge?.color}`}>
          {statusBadge?.label}
        </span>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="MapPin" size={16} className="text-muted-foreground" />
          <span className="text-card-foreground">{supplier?.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Phone" size={16} className="text-muted-foreground" />
          <span className="text-card-foreground">{supplier?.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Mail" size={16} className="text-muted-foreground" />
          <span className="text-card-foreground">{supplier?.email}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-card-foreground">{supplier?.activeOrders}</div>
          <div className="text-xs text-muted-foreground">Pedidos Activos</div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-semibold ${getPerformanceColor(supplier?.rating)}`}>
            {supplier?.rating?.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground">Calificación</div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(supplier)}
          iconName="Eye"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          Ver Detalles
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onContact(supplier)}
          iconName="MessageCircle"
          iconSize={14}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(supplier)}
          iconName="Edit"
          iconSize={14}
        />
      </div>
    </div>
  );
};

export default SupplierCard;