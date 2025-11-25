import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SupplierFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onExport,
  resultsCount 
}) => {
  const categoryOptions = [
    { value: '', label: 'Todas las categorías' },
    { value: 'motor', label: 'Repuestos de Motor' },
    { value: 'frenos', label: 'Sistema de Frenos' },
    { value: 'suspension', label: 'Suspensión' },
    { value: 'electrico', label: 'Sistema Eléctrico' },
    { value: 'carroceria', label: 'Carrocería' },
    { value: 'neumaticos', label: 'Neumáticos' },
    { value: 'lubricantes', label: 'Lubricantes' },
    { value: 'herramientas', label: 'Herramientas' }
  ];

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'pending', label: 'Pendiente' }
  ];

  const ratingOptions = [
    { value: '', label: 'Todas las calificaciones' },
    { value: '4.5', label: '4.5+ estrellas' },
    { value: '4.0', label: '4.0+ estrellas' },
    { value: '3.5', label: '3.5+ estrellas' },
    { value: '3.0', label: '3.0+ estrellas' }
  ];

  const locationOptions = [
    { value: '', label: 'Todas las ubicaciones' },
    { value: 'madrid', label: 'Madrid' },
    { value: 'barcelona', label: 'Barcelona' },
    { value: 'valencia', label: 'Valencia' },
    { value: 'sevilla', label: 'Sevilla' },
    { value: 'bilbao', label: 'Bilbao' },
    { value: 'zaragoza', label: 'Zaragoza' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Filtros de Proveedores</span>
        </h3>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-muted-foreground">
            {resultsCount} proveedor{resultsCount !== 1 ? 'es' : ''} encontrado{resultsCount !== 1 ? 's' : ''}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Exportar
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
        <Input
          type="search"
          placeholder="Buscar proveedor..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="lg:col-span-2"
        />

        <Select
          placeholder="Categoría"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
        />

        <Select
          placeholder="Estado"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <Select
          placeholder="Calificación"
          options={ratingOptions}
          value={filters?.rating}
          onChange={(value) => onFilterChange('rating', value)}
        />

        <Select
          placeholder="Ubicación"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => onFilterChange('location', value)}
        />
      </div>
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>Filtros activos aplicados</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Limpiar Filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default SupplierFilters;