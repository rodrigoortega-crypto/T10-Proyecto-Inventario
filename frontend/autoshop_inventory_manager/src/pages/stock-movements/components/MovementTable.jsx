import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MovementTable = ({ movements, onViewDetails, onSort, sortConfig }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (movementId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(movementId)) {
      newExpanded?.delete(movementId);
    } else {
      newExpanded?.add(movementId);
    }
    setExpandedRows(newExpanded);
  };

  const getMovementTypeIcon = (type) => {
    switch (type) {
      case 'in':
        return { icon: 'ArrowDown', color: 'text-success' };
      case 'out':
        return { icon: 'ArrowUp', color: 'text-error' };
      case 'adjustment':
        return { icon: 'Settings', color: 'text-warning' };
      case 'transfer':
        return { icon: 'ArrowLeftRight', color: 'text-primary' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getMovementTypeLabel = (type) => {
    switch (type) {
      case 'in':
        return 'Entrada';
      case 'out':
        return 'Salida';
      case 'adjustment':
        return 'Ajuste';
      case 'transfer':
        return 'Transferencia';
      default:
        return type;
    }
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return 'ArrowUpDown';
    }
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const handleSort = (column) => {
    onSort(column);
  };

  if (movements?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">No hay movimientos</h3>
        <p className="text-text-secondary">No se encontraron movimientos con los filtros aplicados.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-hover"
                >
                  <span>Fecha/Hora</span>
                  <Icon name={getSortIcon('timestamp')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('partNumber')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-hover"
                >
                  <span>Pieza</span>
                  <Icon name={getSortIcon('partNumber')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">Tipo</th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort('quantity')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-hover ml-auto"
                >
                  <span>Cantidad</span>
                  <Icon name={getSortIcon('quantity')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">Usuario</th>
              <th className="px-4 py-3 text-left">Referencia</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {movements?.map((movement) => {
              const typeInfo = getMovementTypeIcon(movement?.type);
              const isExpanded = expandedRows?.has(movement?.id);
              
              return (
                <React.Fragment key={movement?.id}>
                  <tr className="hover:bg-muted/50 transition-hover">
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <div className="font-medium text-text-primary">
                          {new Date(movement.timestamp)?.toLocaleDateString('es-ES')}
                        </div>
                        <div className="text-text-secondary">
                          {new Date(movement.timestamp)?.toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <div className="font-mono font-medium text-text-primary">
                          {movement?.partNumber}
                        </div>
                        <div className="text-text-secondary truncate max-w-32">
                          {movement?.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Icon name={typeInfo?.icon} size={16} className={typeInfo?.color} />
                        <span className="text-sm font-medium">
                          {getMovementTypeLabel(movement?.type)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="text-sm">
                        <div className={`font-medium ${movement?.type === 'out' ? 'text-error' : 'text-success'}`}>
                          {movement?.type === 'out' ? '-' : '+'}{movement?.quantity}
                        </div>
                        <div className="text-text-secondary">
                          Stock: {movement?.stockAfter}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <div className="font-medium text-text-primary">{movement?.user}</div>
                        <div className="text-text-secondary">{movement?.userRole}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-text-secondary font-mono">
                        {movement?.reference}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center space-x-1">
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => toggleRowExpansion(movement?.id)}
                          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                          iconSize={16}
                        />
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => onViewDetails(movement)}
                          iconName="Eye"
                          iconSize={16}
                        />
                      </div>
                    </td>
                  </tr>
                  {/* Expanded Row Details */}
                  {isExpanded && (
                    <tr className="bg-muted/30">
                      <td colSpan="7" className="px-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <h4 className="font-medium text-text-primary mb-2">Detalles del Stock</h4>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-text-secondary">Stock anterior:</span>
                                <span className="font-mono">{movement?.stockBefore}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary">Stock posterior:</span>
                                <span className="font-mono">{movement?.stockAfter}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary">Diferencia:</span>
                                <span className={`font-mono ${movement?.type === 'out' ? 'text-error' : 'text-success'}`}>
                                  {movement?.type === 'out' ? '-' : '+'}{movement?.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-text-primary mb-2">Información Adicional</h4>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-text-secondary">Categoría:</span>
                                <span>{movement?.category}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary">Proveedor:</span>
                                <span>{movement?.supplier}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary">Área:</span>
                                <span>{movement?.area}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-text-primary mb-2">Justificación</h4>
                            <p className="text-text-secondary text-sm leading-relaxed">
                              {movement?.justification}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {movements?.map((movement) => {
          const typeInfo = getMovementTypeIcon(movement?.type);
          const isExpanded = expandedRows?.has(movement?.id);
          
          return (
            <div key={movement?.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name={typeInfo?.icon} size={20} className={typeInfo?.color} />
                  <div>
                    <div className="font-mono font-medium text-text-primary">
                      {movement?.partNumber}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {getMovementTypeLabel(movement?.type)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${movement?.type === 'out' ? 'text-error' : 'text-success'}`}>
                    {movement?.type === 'out' ? '-' : '+'}{movement?.quantity}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {new Date(movement.timestamp)?.toLocaleDateString('es-ES')}
                  </div>
                </div>
              </div>
              <div className="text-sm text-text-secondary mb-3 truncate">
                {movement?.description}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-text-secondary">Por: </span>
                  <span className="font-medium">{movement?.user}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => toggleRowExpansion(movement?.id)}
                    iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                    iconSize={16}
                  />
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => onViewDetails(movement)}
                    iconName="Eye"
                    iconSize={16}
                  />
                </div>
              </div>
              {/* Expanded Mobile Details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-text-secondary">Stock anterior</div>
                      <div className="font-mono">{movement?.stockBefore}</div>
                    </div>
                    <div>
                      <div className="text-text-secondary">Stock posterior</div>
                      <div className="font-mono">{movement?.stockAfter}</div>
                    </div>
                    <div>
                      <div className="text-text-secondary">Proveedor</div>
                      <div>{movement?.supplier}</div>
                    </div>
                    <div>
                      <div className="text-text-secondary">Referencia</div>
                      <div className="font-mono text-xs">{movement?.reference}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-text-secondary text-sm mb-1">Justificación</div>
                    <p className="text-sm leading-relaxed">{movement?.justification}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovementTable;