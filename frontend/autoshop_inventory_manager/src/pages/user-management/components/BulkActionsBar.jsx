import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const actionOptions = [
    { value: '', label: 'Seleccionar acción...' },
    { value: 'activate', label: 'Activar usuarios' },
    { value: 'deactivate', label: 'Desactivar usuarios' },
    { value: 'change-role-operator', label: 'Cambiar rol a Operador' },
    { value: 'change-role-manager', label: 'Cambiar rol a Gerente' },
    { value: 'change-role-admin', label: 'Cambiar rol a Administrador' },
    { value: 'export', label: 'Exportar seleccionados' }
  ];

  const handleExecuteAction = async () => {
    if (!selectedAction) return;

    setIsLoading(true);
    try {
      await onBulkAction(selectedAction);
      setSelectedAction('');
    } catch (error) {
      console.error('Error executing bulk action:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'activate':
        return 'UserCheck';
      case 'deactivate':
        return 'UserX';
      case 'change-role-operator': case'change-role-manager': case'change-role-admin':
        return 'UserCog';
      case 'export':
        return 'Download';
      default:
        return 'Settings';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'activate':
        return 'success';
      case 'deactivate':
        return 'destructive';
      case 'export':
        return 'outline';
      default:
        return 'default';
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-1200">
      <div className="bg-card border border-border rounded-lg shadow-floating p-4 glass-morphism">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={20} className="text-primary" />
            <span className="text-sm font-medium text-card-foreground">
              {selectedCount} usuario{selectedCount !== 1 ? 's' : ''} seleccionado{selectedCount !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Select
              placeholder="Seleccionar acción..."
              options={actionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              className="min-w-48"
            />

            <Button
              variant={selectedAction ? getActionColor(selectedAction) : 'outline'}
              onClick={handleExecuteAction}
              disabled={!selectedAction || isLoading}
              loading={isLoading}
              iconName={selectedAction ? getActionIcon(selectedAction) : 'Play'}
              iconPosition="left"
              iconSize={16}
            >
              Ejecutar
            </Button>

            <Button
              variant="ghost"
              onClick={onClearSelection}
              iconName="X"
              iconSize={16}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;