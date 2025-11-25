import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ItemDetailsModal = ({ 
  item = null, 
  isOpen = false, 
  onClose, 
  onSave, 
  mode = 'view' // 'view', 'edit', 'create'
}) => {
  const [formData, setFormData] = useState({
    partNumber: item?.partNumber || '',
    description: item?.description || '',
    brand: item?.brand || '',
    category: item?.category || '',
    supplier: item?.supplier || '',
    currentStock: item?.currentStock || 0,
    minimumStock: item?.minimumStock || 0,
    maximumStock: item?.maximumStock || 0,
    unitPrice: item?.unitPrice || 0,
    location: item?.location || '',
    notes: item?.notes || ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const categoryOptions = [
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
    { value: 'bosch', label: 'Bosch España' },
    { value: 'mann', label: 'Mann+Hummel' },
    { value: 'febi', label: 'Febi Bilstein' },
    { value: 'sachs', label: 'Sachs Performance' },
    { value: 'valeo', label: 'Valeo Service' },
    { value: 'gates', label: 'Gates Corporation' },
    { value: 'mahle', label: 'Mahle Original' },
    { value: 'continental', label: 'Continental Automotive' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStockStatusColor = (current, minimum) => {
    if (current === 0) return 'text-error';
    if (current <= minimum) return 'text-warning';
    if (current > minimum * 3) return 'text-success';
    return 'text-text-primary';
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'create':
        return 'Agregar Nuevo Artículo';
      case 'edit':
        return 'Editar Artículo';
      default:
        return 'Detalles del Artículo';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1300 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 transition-opacity bg-background/90 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-surface shadow-modal rounded-lg border border-border">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Package" size={20} color="white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">{getModalTitle()}</h3>
                {item && mode === 'view' && (
                  <p className="text-sm text-text-secondary">Código: {item?.partNumber}</p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            {mode === 'view' ? (
              /* View Mode */
              (<div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Código de Parte</label>
                      <div className="font-mono text-lg font-semibold text-primary mt-1">{item?.partNumber}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Descripción</label>
                      <div className="text-text-primary mt-1">{item?.description}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Marca</label>
                      <div className="text-text-primary mt-1">{item?.brand || 'No especificada'}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Categoría</label>
                      <div className="mt-1">
                        <span className="px-2 py-1 text-sm font-medium bg-secondary/10 text-secondary rounded-full">
                          {item?.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Proveedor</label>
                      <div className="text-text-primary mt-1">{item?.supplier}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Precio Unitario</label>
                      <div className="text-lg font-semibold text-text-primary mt-1">{formatCurrency(item?.unitPrice)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Ubicación</label>
                      <div className="text-text-primary mt-1">{item?.location || 'No especificada'}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Última Actualización</label>
                      <div className="text-text-primary mt-1">{formatDate(item?.lastUpdated)}</div>
                    </div>
                  </div>
                </div>
                {/* Stock Information */}
                <div className="border-t border-border pt-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-4">Información de Stock</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-sm font-medium text-text-secondary mb-1">Stock Actual</div>
                      <div className={`text-2xl font-bold ${getStockStatusColor(item?.currentStock, item?.minimumStock)}`}>
                        {item?.currentStock?.toLocaleString('es-ES')}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-sm font-medium text-text-secondary mb-1">Stock Mínimo</div>
                      <div className="text-2xl font-bold text-text-primary">
                        {item?.minimumStock?.toLocaleString('es-ES')}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-sm font-medium text-text-secondary mb-1">Stock Máximo</div>
                      <div className="text-2xl font-bold text-text-primary">
                        {item?.maximumStock?.toLocaleString('es-ES') || 'No definido'}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Notes */}
                {item?.notes && (
                  <div className="border-t border-border pt-6">
                    <h4 className="text-lg font-semibold text-text-primary mb-2">Notas</h4>
                    <div className="text-text-secondary bg-muted p-4 rounded-lg">
                      {item?.notes}
                    </div>
                  </div>
                )}
              </div>)
            ) : (
              /* Edit/Create Mode */
              (<div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Input
                      label="Código de Parte"
                      type="text"
                      value={formData?.partNumber}
                      onChange={(e) => handleInputChange('partNumber', e?.target?.value)}
                      placeholder="Ej: BRK-001-2024"
                      required
                    />
                    <Input
                      label="Descripción"
                      type="text"
                      value={formData?.description}
                      onChange={(e) => handleInputChange('description', e?.target?.value)}
                      placeholder="Descripción del artículo"
                      required
                    />
                    <Input
                      label="Marca"
                      type="text"
                      value={formData?.brand}
                      onChange={(e) => handleInputChange('brand', e?.target?.value)}
                      placeholder="Marca del producto"
                    />
                    <Select
                      label="Categoría"
                      options={categoryOptions}
                      value={formData?.category}
                      onChange={(value) => handleInputChange('category', value)}
                      placeholder="Seleccionar categoría"
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <Select
                      label="Proveedor"
                      options={supplierOptions}
                      value={formData?.supplier}
                      onChange={(value) => handleInputChange('supplier', value)}
                      placeholder="Seleccionar proveedor"
                      searchable
                      required
                    />
                    <Input
                      label="Precio Unitario (€)"
                      type="number"
                      value={formData?.unitPrice}
                      onChange={(e) => handleInputChange('unitPrice', parseFloat(e?.target?.value) || 0)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                    <Input
                      label="Ubicación"
                      type="text"
                      value={formData?.location}
                      onChange={(e) => handleInputChange('location', e?.target?.value)}
                      placeholder="Ej: Estante A-1-3"
                    />
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-4">Configuración de Stock</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="Stock Actual"
                      type="number"
                      value={formData?.currentStock}
                      onChange={(e) => handleInputChange('currentStock', parseInt(e?.target?.value) || 0)}
                      placeholder="0"
                      min="0"
                      required
                    />
                    <Input
                      label="Stock Mínimo"
                      type="number"
                      value={formData?.minimumStock}
                      onChange={(e) => handleInputChange('minimumStock', parseInt(e?.target?.value) || 0)}
                      placeholder="0"
                      min="0"
                      required
                    />
                    <Input
                      label="Stock Máximo"
                      type="number"
                      value={formData?.maximumStock}
                      onChange={(e) => handleInputChange('maximumStock', parseInt(e?.target?.value) || 0)}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <Input
                    label="Notas"
                    type="text"
                    value={formData?.notes}
                    onChange={(e) => handleInputChange('notes', e?.target?.value)}
                    placeholder="Notas adicionales sobre el artículo..."
                  />
                </div>
              </div>)
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-border bg-muted/60">
            <Button
              variant="outline"
              onClick={onClose}
            >
              {mode === 'view' ? 'Cerrar' : 'Cancelar'}
            </Button>
            
            {mode === 'view' ? (
              <Button
                variant="default"
                onClick={() => {/* Switch to edit mode */}}
                iconName="Edit"
                iconPosition="left"
                iconSize={16}
              >
                Editar
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleSave}
                loading={isLoading}
                iconName="Save"
                iconPosition="left"
                iconSize={16}
              >
                {mode === 'create' ? 'Crear Artículo' : 'Guardar Cambios'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal;