import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const InventoryTable = ({ 
  items = [], 
  onItemSelect, 
  onBulkSelect, 
  selectedItems = [], 
  onSort, 
  sortConfig = { key: null, direction: 'asc' },
  onItemEdit,
  onItemView,
  onStockAdjust
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getStockStatusColor = (current, minimum) => {
    if (current === 0) return 'text-error';
    if (current <= minimum) return 'text-warning';
    if (current > minimum * 3) return 'text-success';
    return 'text-text-primary';
  };

  const getStockStatusBadge = (current, minimum) => {
    if (current === 0) {
      return <span className="px-2 py-1 text-xs font-medium bg-error/10 text-error rounded-full">Sin stock</span>;
    }
    if (current <= minimum) {
      return <span className="px-2 py-1 text-xs font-medium bg-warning/10 text-warning rounded-full">Stock bajo</span>;
    }
    if (current > minimum * 3) {
      return <span className="px-2 py-1 text-xs font-medium bg-success/10 text-success rounded-full">Exceso</span>;
    }
    return <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">Normal</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const handleSort = (key) => {
    const direction = sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    onSort({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const isAllSelected = items?.length > 0 && selectedItems?.length === items?.length;
  const isIndeterminate = selectedItems?.length > 0 && selectedItems?.length < items?.length;

  const handleSelectAll = (checked) => {
    if (checked) {
      onBulkSelect(items?.map(item => item?.id));
    } else {
      onBulkSelect([]);
    }
  };

  const handleItemSelect = (itemId, checked) => {
    if (checked) {
      onItemSelect([...selectedItems, itemId]);
    } else {
      onItemSelect(selectedItems?.filter(id => id !== itemId));
    }
  };

  if (items?.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-lg shadow-card">
        <div className="p-12 text-center">
          <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No hay artículos</h3>
          <p className="text-text-secondary mb-4">No se encontraron artículos que coincidan con los filtros aplicados.</p>
          <Button variant="outline" iconName="Plus" iconPosition="left">
            Agregar primer artículo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('partNumber')}
                  iconName={getSortIcon('partNumber')}
                  iconPosition="right"
                  iconSize={14}
                  className="font-semibold text-text-primary"
                >
                  Código de Parte
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('description')}
                  iconName={getSortIcon('description')}
                  iconPosition="right"
                  iconSize={14}
                  className="font-semibold text-text-primary"
                >
                  Descripción
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('category')}
                  iconName={getSortIcon('category')}
                  iconPosition="right"
                  iconSize={14}
                  className="font-semibold text-text-primary"
                >
                  Categoría
                </Button>
              </th>
              <th className="text-center p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('currentStock')}
                  iconName={getSortIcon('currentStock')}
                  iconPosition="right"
                  iconSize={14}
                  className="font-semibold text-text-primary"
                >
                  Stock Actual
                </Button>
              </th>
              <th className="text-center p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('minimumStock')}
                  iconName={getSortIcon('minimumStock')}
                  iconPosition="right"
                  iconSize={14}
                  className="font-semibold text-text-primary"
                >
                  Stock Mínimo
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('supplier')}
                  iconName={getSortIcon('supplier')}
                  iconPosition="right"
                  iconSize={14}
                  className="font-semibold text-text-primary"
                >
                  Proveedor
                </Button>
              </th>
              <th className="text-center p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('unitPrice')}
                  iconName={getSortIcon('unitPrice')}
                  iconPosition="right"
                  iconSize={14}
                  className="font-semibold text-text-primary"
                >
                  Precio Unitario
                </Button>
              </th>
              <th className="text-center p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('lastUpdated')}
                  iconName={getSortIcon('lastUpdated')}
                  iconPosition="right"
                  iconSize={14}
                  className="font-semibold text-text-primary"
                >
                  Última Actualización
                </Button>
              </th>
              <th className="text-center p-4 w-32">
                <span className="font-semibold text-text-primary">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr
                key={item?.id}
                className={`border-b border-border transition-hover ${
                  hoveredRow === item?.id ? 'bg-muted/50' : 'hover:bg-muted/30'
                } ${selectedItems?.includes(item?.id) ? 'bg-primary/5' : ''}`}
                onMouseEnter={() => setHoveredRow(item?.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="p-4">
                  <Checkbox
                    checked={selectedItems?.includes(item?.id)}
                    onChange={(e) => handleItemSelect(item?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="font-mono text-sm font-medium text-primary">{item?.partNumber}</div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-text-primary">{item?.description}</div>
                  {item?.brand && (
                    <div className="text-sm text-text-secondary">{item?.brand}</div>
                  )}
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-full">
                    {item?.category}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <div className={`font-semibold ${getStockStatusColor(item?.currentStock, item?.minimumStock)}`}>
                    {item?.currentStock?.toLocaleString('es-ES')}
                  </div>
                  <div className="mt-1">
                    {getStockStatusBadge(item?.currentStock, item?.minimumStock)}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className="text-text-secondary">{item?.minimumStock?.toLocaleString('es-ES')}</span>
                </td>
                <td className="p-4">
                  <div className="text-text-primary font-medium">{item?.supplier}</div>
                </td>
                <td className="p-4 text-center">
                  <span className="font-medium text-text-primary">{formatCurrency(item?.unitPrice)}</span>
                </td>
                <td className="p-4 text-center">
                  <span className="text-text-secondary text-sm">{formatDate(item?.lastUpdated)}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onItemView(item)}
                      iconName="Eye"
                      iconSize={14}
                      className="text-primary hover:text-primary-foreground hover:bg-primary"
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onItemEdit(item)}
                      iconName="Edit"
                      iconSize={14}
                      className="text-secondary hover:text-secondary-foreground hover:bg-secondary"
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onStockAdjust(item)}
                      iconName="Package"
                      iconSize={14}
                      className="text-accent hover:text-accent-foreground hover:bg-accent"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {items?.map((item) => (
          <div
            key={item?.id}
            className={`border border-border rounded-lg p-4 transition-hover ${
              selectedItems?.includes(item?.id) ? 'bg-primary/5 border-primary' : 'hover:bg-muted/30'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={selectedItems?.includes(item?.id)}
                  onChange={(e) => handleItemSelect(item?.id, e?.target?.checked)}
                />
                <div className="flex-1">
                  <div className="font-mono text-sm font-medium text-primary mb-1">{item?.partNumber}</div>
                  <div className="font-medium text-text-primary">{item?.description}</div>
                  {item?.brand && (
                    <div className="text-sm text-text-secondary">{item?.brand}</div>
                  )}
                </div>
              </div>
              {getStockStatusBadge(item?.currentStock, item?.minimumStock)}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-text-secondary">Stock actual:</span>
                <div className={`font-semibold ${getStockStatusColor(item?.currentStock, item?.minimumStock)}`}>
                  {item?.currentStock?.toLocaleString('es-ES')}
                </div>
              </div>
              <div>
                <span className="text-text-secondary">Stock mínimo:</span>
                <div className="font-medium text-text-primary">{item?.minimumStock?.toLocaleString('es-ES')}</div>
              </div>
              <div>
                <span className="text-text-secondary">Proveedor:</span>
                <div className="font-medium text-text-primary">{item?.supplier}</div>
              </div>
              <div>
                <span className="text-text-secondary">Precio:</span>
                <div className="font-medium text-text-primary">{formatCurrency(item?.unitPrice)}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="text-xs text-text-secondary">
                Actualizado: {formatDate(item?.lastUpdated)}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => onItemView(item)}
                  iconName="Eye"
                  iconSize={14}
                >
                  Ver
                </Button>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => onItemEdit(item)}
                  iconName="Edit"
                  iconSize={14}
                >
                  Editar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryTable;