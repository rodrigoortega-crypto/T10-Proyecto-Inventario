import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const InventoryFilters = ({ 
  onFiltersChange, 
  onClearFilters, 
  totalItems = 0,
  filteredItems = 0 
}) => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    supplier: '',
    stockStatus: '',
    dateFrom: '',
    dateTo: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const categoryOptions = [
    { value: '', label: 'Todas las categorías' },
    { value: 'engine', label: 'Motor' },
    { value: 'transmission', label: 'Transmisión' },
    { value: 'brakes', label: 'Frenos' },
    { value: 'electrical', label: 'Eléctrico' },
    { value: 'suspension', label: 'Suspensión' },
    { value: 'cooling', label: 'Refrigeración' },
    { value: 'exhaust', label: 'Escape' },
    { value: 'filters', label: 'Filtros' },
    { value: 'oils', label: 'Aceites y Lubricantes' },
    { value: 'body', label: 'Carrocería' }
  ];

  const supplierOptions = [
    { value: '', label: 'Todos los proveedores' },
    { value: 'bosch', label: 'Bosch España' },
    { value: 'mann', label: 'Mann+Hummel' },
    { value: 'febi', label: 'Febi Bilstein' },
    { value: 'sachs', label: 'Sachs Performance' },
    { value: 'valeo', label: 'Valeo Service' },
    { value: 'gates', label: 'Gates Corporation' },
    { value: 'mahle', label: 'Mahle Original' },
    { value: 'continental', label: 'Continental Automotive' }
  ];

  const stockStatusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'in_stock', label: 'En stock' },
    { value: 'low_stock', label: 'Stock bajo' },
    { value: 'out_of_stock', label: 'Sin stock' },
    { value: 'overstock', label: 'Exceso de stock' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      supplier: '',
      stockStatus: '',
      dateFrom: '',
      dateTo: ''
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">Filtros de Inventario</h3>
          </div>
          <div className="text-sm text-text-secondary">
            Mostrando {filteredItems?.toLocaleString('es-ES')} de {totalItems?.toLocaleString('es-ES')} artículos
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Limpiar filtros
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={16}
          >
            {isExpanded ? 'Contraer' : 'Expandir'}
          </Button>
        </div>
      </div>
      {/* Search Bar - Always Visible */}
      <div className="p-4 border-b border-border">
        <Input
          type="search"
          placeholder="Buscar por código, descripción o proveedor..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Advanced Filters - Collapsible */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Categoría"
              options={categoryOptions}
              value={filters?.category}
              onChange={(value) => handleFilterChange('category', value)}
              placeholder="Seleccionar categoría"
            />

            <Select
              label="Proveedor"
              options={supplierOptions}
              value={filters?.supplier}
              onChange={(value) => handleFilterChange('supplier', value)}
              placeholder="Seleccionar proveedor"
              searchable
            />

            <Select
              label="Estado de Stock"
              options={stockStatusOptions}
              value={filters?.stockStatus}
              onChange={(value) => handleFilterChange('stockStatus', value)}
              placeholder="Seleccionar estado"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Rango de fechas</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  placeholder="Desde"
                  value={filters?.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
                />
                <Input
                  type="date"
                  placeholder="Hasta"
                  value={filters?.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
                />
              </div>
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            <span className="text-sm font-medium text-text-secondary">Filtros rápidos:</span>
            <Button
              variant="outline"
              size="xs"
              onClick={() => handleFilterChange('stockStatus', 'low_stock')}
              className={filters?.stockStatus === 'low_stock' ? 'bg-warning/10 border-warning' : ''}
            >
              Stock bajo
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => handleFilterChange('stockStatus', 'out_of_stock')}
              className={filters?.stockStatus === 'out_of_stock' ? 'bg-error/10 border-error' : ''}
            >
              Sin stock
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => handleFilterChange('category', 'engine')}
              className={filters?.category === 'engine' ? 'bg-primary/10 border-primary' : ''}
            >
              Motor
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => handleFilterChange('category', 'brakes')}
              className={filters?.category === 'brakes' ? 'bg-primary/10 border-primary' : ''}
            >
              Frenos
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryFilters;