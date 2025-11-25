import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MovementFilters = ({ onFiltersChange, onExport, onClearFilters }) => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    movementType: '',
    user: '',
    category: '',
    supplier: '',
    partNumber: ''
  });

  const movementTypeOptions = [
    { value: '', label: 'Todos los tipos' },
    { value: 'in', label: 'Entrada' },
    { value: 'out', label: 'Salida' },
    { value: 'adjustment', label: 'Ajuste' },
    { value: 'transfer', label: 'Transferencia' }
  ];

  const userOptions = [
    { value: '', label: 'Todos los usuarios' },
    { value: 'carlos.martinez', label: 'Carlos Martínez' },
    { value: 'ana.rodriguez', label: 'Ana Rodríguez' },
    { value: 'miguel.lopez', label: 'Miguel López' },
    { value: 'sofia.garcia', label: 'Sofía García' }
  ];

  const categoryOptions = [
    { value: '', label: 'Todas las categorías' },
    { value: 'motor', label: 'Motor' },
    { value: 'frenos', label: 'Frenos' },
    { value: 'suspension', label: 'Suspensión' },
    { value: 'electrico', label: 'Eléctrico' },
    { value: 'carroceria', label: 'Carrocería' },
    { value: 'aceites', label: 'Aceites y Lubricantes' }
  ];

  const supplierOptions = [
    { value: '', label: 'Todos los proveedores' },
    { value: 'bosch', label: 'Bosch España' },
    { value: 'valeo', label: 'Valeo Ibérica' },
    { value: 'mann', label: 'Mann+Hummel' },
    { value: 'febi', label: 'Febi Bilstein' },
    { value: 'sachs', label: 'Sachs Performance' }
  ];

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      dateFrom: '',
      dateTo: '',
      movementType: '',
      user: '',
      category: '',
      supplier: '',
      partNumber: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Filtros de Búsqueda
        </h3>
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
              Limpiar
            </Button>
          )}
          <Button
            variant="default"
            size="sm"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Exportar
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Fecha desde"
              type="date"
              value={filters?.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
              className="text-sm"
            />
            <Input
              label="Fecha hasta"
              type="date"
              value={filters?.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
              className="text-sm"
            />
          </div>
        </div>

        {/* Movement Type */}
        <Select
          label="Tipo de movimiento"
          options={movementTypeOptions}
          value={filters?.movementType}
          onChange={(value) => handleFilterChange('movementType', value)}
        />

        {/* User */}
        <Select
          label="Usuario responsable"
          options={userOptions}
          value={filters?.user}
          onChange={(value) => handleFilterChange('user', value)}
          searchable
        />

        {/* Part Number Search */}
        <Input
          label="Número de pieza"
          type="search"
          placeholder="Buscar por código..."
          value={filters?.partNumber}
          onChange={(e) => handleFilterChange('partNumber', e?.target?.value)}
        />

        {/* Category */}
        <Select
          label="Categoría"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => handleFilterChange('category', value)}
        />

        {/* Supplier */}
        <Select
          label="Proveedor"
          options={supplierOptions}
          value={filters?.supplier}
          onChange={(value) => handleFilterChange('supplier', value)}
          searchable
        />
      </div>
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-text-secondary">Filtros activos:</span>
            {Object.entries(filters)?.map(([key, value]) => {
              if (!value) return null;
              
              let label = '';
              switch (key) {
                case 'dateFrom':
                  label = `Desde: ${new Date(value)?.toLocaleDateString('es-ES')}`;
                  break;
                case 'dateTo':
                  label = `Hasta: ${new Date(value)?.toLocaleDateString('es-ES')}`;
                  break;
                case 'movementType':
                  label = movementTypeOptions?.find(opt => opt?.value === value)?.label || value;
                  break;
                case 'user':
                  label = userOptions?.find(opt => opt?.value === value)?.label || value;
                  break;
                case 'category':
                  label = categoryOptions?.find(opt => opt?.value === value)?.label || value;
                  break;
                case 'supplier':
                  label = supplierOptions?.find(opt => opt?.value === value)?.label || value;
                  break;
                case 'partNumber':
                  label = `Pieza: ${value}`;
                  break;
                default:
                  label = value;
              }

              return (
                <span
                  key={key}
                  className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {label}
                  <button
                    onClick={() => handleFilterChange(key, '')}
                    className="ml-1 hover:text-primary-foreground"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovementFilters;