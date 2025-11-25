import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ 
  selectedCount = 0, 
  onBulkAction, 
  onClearSelection,
  isVisible = false 
}) => {
  const [selectedAction, setSelectedAction] = useState('');

  const bulkActionOptions = [
    { value: '', label: 'Seleccionar acción...' },
    { value: 'adjust_stock', label: 'Ajustar stock' },
    { value: 'update_category', label: 'Cambiar categoría' },
    { value: 'update_supplier', label: 'Cambiar proveedor' },
    { value: 'update_prices', label: 'Actualizar precios' },
    { value: 'set_minimum', label: 'Establecer stock mínimo' },
    { value: 'export_selected', label: 'Exportar seleccionados' },
    { value: 'generate_labels', label: 'Generar etiquetas' },
    { value: 'mark_discontinued', label: 'Marcar como descontinuado' }
  ];

  const handleExecuteAction = () => {
    if (selectedAction && onBulkAction) {
      onBulkAction(selectedAction);
      setSelectedAction('');
    }
  };

  if (!isVisible || selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-1200 animate-slide-up">
      <div className="bg-surface/95 border border-border rounded-lg shadow-floating glass-morphism-enhanced px-6 py-4 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          {/* Selection Info */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} color="white" />
            </div>
            <div>
              <div className="text-sm font-medium text-text-primary">
                {selectedCount?.toLocaleString('es-ES')} artículo{selectedCount !== 1 ? 's' : ''} seleccionado{selectedCount !== 1 ? 's' : ''}
              </div>
              <div className="text-xs text-text-secondary">
                Selecciona una acción para aplicar a todos los elementos
              </div>
            </div>
          </div>

          {/* Action Selector */}
          <div className="flex items-center space-x-2">
            <Select
              options={bulkActionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Seleccionar acción..."
              className="w-64"
            />
            
            <Button
              variant="default"
              onClick={handleExecuteAction}
              disabled={!selectedAction}
              iconName="Play"
              iconPosition="left"
              iconSize={16}
            >
              Ejecutar
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-1 border-l border-border pl-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('adjust_stock')}
              iconName="Package"
              iconSize={16}
              className="text-xs"
            >
              Ajustar Stock
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('export_selected')}
              iconName="Download"
              iconSize={16}
              className="text-xs"
            >
              Exportar
            </Button>
          </div>

          {/* Clear Selection */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconSize={16}
            className="text-text-secondary hover:text-error"
          >
            Limpiar selección
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;