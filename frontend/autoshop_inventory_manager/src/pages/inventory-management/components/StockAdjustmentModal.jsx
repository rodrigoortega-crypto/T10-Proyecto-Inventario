import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const StockAdjustmentModal = ({ 
  item = null, 
  isOpen = false, 
  onClose, 
  onSave 
}) => {
  const [adjustmentData, setAdjustmentData] = useState({
    type: 'manual', // 'manual', 'received', 'damaged', 'returned', 'sold'
    quantity: 0,
    reason: '',
    notes: '',
    reference: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const adjustmentTypes = [
    { value: 'manual', label: 'Ajuste Manual' },
    { value: 'received', label: 'Mercancía Recibida' },
    { value: 'damaged', label: 'Producto Dañado' },
    { value: 'returned', label: 'Devolución' },
    { value: 'sold', label: 'Venta Directa' },
    { value: 'transfer', label: 'Transferencia' },
    { value: 'inventory', label: 'Conteo de Inventario' }
  ];

  const handleInputChange = (field, value) => {
    setAdjustmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const adjustmentRecord = {
        itemId: item?.id,
        partNumber: item?.partNumber,
        previousStock: item?.currentStock,
        adjustment: adjustmentData?.quantity,
        newStock: item?.currentStock + adjustmentData?.quantity,
        type: adjustmentData?.type,
        reason: adjustmentData?.reason,
        notes: adjustmentData?.notes,
        reference: adjustmentData?.reference,
        timestamp: new Date()?.toISOString(),
        userId: 'current-user-id' // This would come from auth context
      };

      await onSave(adjustmentRecord);
      onClose();
      
      // Reset form
      setAdjustmentData({
        type: 'manual',
        quantity: 0,
        reason: '',
        notes: '',
        reference: ''
      });
    } catch (error) {
      console.error('Error saving stock adjustment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNewStockValue = () => {
    return item?.currentStock + adjustmentData?.quantity;
  };

  const getStockStatusColor = (stock, minimum) => {
    if (stock <= 0) return 'text-error';
    if (stock <= minimum) return 'text-warning';
    return 'text-success';
  };

  const getAdjustmentTypeIcon = (type) => {
    const iconMap = {
      manual: 'Edit',
      received: 'TruckIcon',
      damaged: 'AlertTriangle',
      returned: 'RotateCcw',
      sold: 'ShoppingCart',
      transfer: 'ArrowRightLeft',
      inventory: 'ClipboardList'
    };
    return iconMap?.[type] || 'Package';
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-1300 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 transition-opacity bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-surface shadow-modal rounded-lg border border-border">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Icon name="Package" size={20} color="white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Ajustar Stock</h3>
                <p className="text-sm text-text-secondary">{item?.partNumber} - {item?.description}</p>
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
          <div className="px-6 py-6">
            {/* Current Stock Info */}
            <div className="bg-muted rounded-lg p-4 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm font-medium text-text-secondary mb-1">Stock Actual</div>
                  <div className="text-2xl font-bold text-text-primary">
                    {item?.currentStock?.toLocaleString('es-ES')}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-text-secondary mb-1">Ajuste</div>
                  <div className={`text-2xl font-bold ${adjustmentData?.quantity >= 0 ? 'text-success' : 'text-error'}`}>
                    {adjustmentData?.quantity >= 0 ? '+' : ''}{adjustmentData?.quantity?.toLocaleString('es-ES')}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-text-secondary mb-1">Nuevo Stock</div>
                  <div className={`text-2xl font-bold ${getStockStatusColor(getNewStockValue(), item?.minimumStock)}`}>
                    {getNewStockValue()?.toLocaleString('es-ES')}
                  </div>
                </div>
              </div>
            </div>

            {/* Adjustment Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Tipo de Ajuste"
                  options={adjustmentTypes}
                  value={adjustmentData?.type}
                  onChange={(value) => handleInputChange('type', value)}
                  required
                />
                
                <Input
                  label="Cantidad de Ajuste"
                  type="number"
                  value={adjustmentData?.quantity}
                  onChange={(e) => handleInputChange('quantity', parseInt(e?.target?.value) || 0)}
                  placeholder="Ingrese cantidad (+ para aumentar, - para disminuir)"
                  required
                />
              </div>

              <Input
                label="Motivo del Ajuste"
                type="text"
                value={adjustmentData?.reason}
                onChange={(e) => handleInputChange('reason', e?.target?.value)}
                placeholder="Ej: Conteo físico, mercancía dañada, error de sistema..."
                required
              />

              <Input
                label="Referencia/Documento"
                type="text"
                value={adjustmentData?.reference}
                onChange={(e) => handleInputChange('reference', e?.target?.value)}
                placeholder="Ej: Factura #12345, Orden de trabajo #OT-001..."
              />

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Notas Adicionales
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                  value={adjustmentData?.notes}
                  onChange={(e) => handleInputChange('notes', e?.target?.value)}
                  placeholder="Información adicional sobre el ajuste..."
                />
              </div>

              {/* Warning for negative stock */}
              {getNewStockValue() < 0 && (
                <div className="flex items-center space-x-2 p-3 bg-error/10 border border-error rounded-lg">
                  <Icon name="AlertTriangle" size={20} className="text-error flex-shrink-0" />
                  <div className="text-sm text-error">
                    <strong>Advertencia:</strong> El ajuste resultará en stock negativo. 
                    Verifique la cantidad antes de continuar.
                  </div>
                </div>
              )}

              {/* Warning for low stock */}
              {getNewStockValue() > 0 && getNewStockValue() <= item?.minimumStock && (
                <div className="flex items-center space-x-2 p-3 bg-warning/10 border border-warning rounded-lg">
                  <Icon name="AlertCircle" size={20} className="text-warning flex-shrink-0" />
                  <div className="text-sm text-warning">
                    <strong>Aviso:</strong> El nuevo stock estará por debajo del mínimo establecido ({item?.minimumStock}).
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-border bg-muted/30">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>
            
            <Button
              variant="default"
              onClick={handleSave}
              loading={isLoading}
              disabled={!adjustmentData?.quantity || !adjustmentData?.reason}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              Aplicar Ajuste
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAdjustmentModal;