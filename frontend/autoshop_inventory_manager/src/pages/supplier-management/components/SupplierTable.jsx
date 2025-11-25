import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SupplierTable = ({ suppliers, onEdit, onViewDetails, onContact, onSort, sortConfig }) => {
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

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const handleSort = (column) => {
    onSort(column);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-foreground transition-hover"
                >
                  <span>Proveedor</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center space-x-1 hover:text-foreground transition-hover"
                >
                  <span>Categoría</span>
                  <Icon name={getSortIcon('category')} size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Contacto</th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('activeOrders')}
                  className="flex items-center space-x-1 hover:text-foreground transition-hover"
                >
                  <span>Pedidos</span>
                  <Icon name={getSortIcon('activeOrders')} size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('rating')}
                  className="flex items-center space-x-1 hover:text-foreground transition-hover"
                >
                  <span>Calificación</span>
                  <Icon name={getSortIcon('rating')} size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Estado</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {suppliers?.map((supplier) => {
              const statusBadge = getStatusBadge(supplier?.status);
              return (
                <tr key={supplier?.id} className="border-t border-border hover:bg-muted/50 transition-hover">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-card-foreground">{supplier?.name}</div>
                      <div className="text-sm text-muted-foreground">{supplier?.location}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-card-foreground">{supplier?.category}</span>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <Icon name="Phone" size={14} className="text-muted-foreground" />
                        <span className="text-card-foreground">{supplier?.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Icon name="Mail" size={14} className="text-muted-foreground" />
                        <span className="text-card-foreground">{supplier?.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-card-foreground">{supplier?.activeOrders}</div>
                      <div className="text-xs text-muted-foreground">activos</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className={`text-lg font-semibold ${getPerformanceColor(supplier?.rating)}`}>
                        {supplier?.rating?.toFixed(1)}
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5]?.map((star) => (
                          <Icon
                            key={star}
                            name="Star"
                            size={14}
                            className={star <= supplier?.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge?.color}`}>
                      {statusBadge?.label}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(supplier)}
                        iconName="Eye"
                        iconSize={14}
                      />
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierTable;