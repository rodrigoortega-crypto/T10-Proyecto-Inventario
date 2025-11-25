import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const UserFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  userCounts 
}) => {
  const roleOptions = [
    { value: '', label: 'Todos los roles' },
    { value: 'administrator', label: 'Administrador' },
    { value: 'manager', label: 'Gerente de Área' },
    { value: 'operator', label: 'Operador Mecánico' }
  ];

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'active', label: 'Activos' },
    { value: 'inactive', label: 'Inactivos' }
  ];

  const areaOptions = [
    { value: '', label: 'Todas las áreas' },
    { value: 'Mecánica General', label: 'Mecánica General' },
    { value: 'Electricidad', label: 'Electricidad' },
    { value: 'Carrocería', label: 'Carrocería' },
    { value: 'Pintura', label: 'Pintura' },
    { value: 'Administración', label: 'Administración' }
  ];

  const hasActiveFilters = filters?.search || filters?.role || filters?.status || filters?.area;

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Buscar por nombre o email..."
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="w-full"
          />
          
          <Select
            placeholder="Filtrar por rol"
            options={roleOptions}
            value={filters?.role}
            onChange={(value) => onFilterChange('role', value)}
          />
          
          <Select
            placeholder="Filtrar por área"
            options={areaOptions}
            value={filters?.area}
            onChange={(value) => onFilterChange('area', value)}
          />
          
          <Select
            placeholder="Filtrar por estado"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
          />
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={16}
          >
            Limpiar filtros
          </Button>
        )}
      </div>
      {/* User Count Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-medium text-card-foreground">{userCounts?.total}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Activos:</span>
            <span className="font-medium text-success">{userCounts?.active}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Inactivos:</span>
            <span className="font-medium text-error">{userCounts?.inactive}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Administradores:</span>
            <span className="font-medium text-card-foreground">{userCounts?.administrators}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Gerentes:</span>
            <span className="font-medium text-card-foreground">{userCounts?.managers}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Operadores:</span>
            <span className="font-medium text-card-foreground">{userCounts?.operators}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;