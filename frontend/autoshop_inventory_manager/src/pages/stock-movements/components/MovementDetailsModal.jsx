import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MovementDetailsModal = ({ movement, isOpen, onClose }) => {
  if (!isOpen || !movement) return null;

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
        return 'Entrada de Stock';
      case 'out':
        return 'Salida de Stock';
      case 'adjustment':
        return 'Ajuste de Inventario';
      case 'transfer':
        return 'Transferencia';
      default:
        return type;
    }
  };

  const typeInfo = getMovementTypeIcon(movement?.type);

  return (
    <div className="fixed inset-0 z-1300 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-card rounded-lg shadow-modal transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-muted ${typeInfo?.color}`}>
                <Icon name={typeInfo?.icon} size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Detalles del Movimiento
                </h3>
                <p className="text-sm text-text-secondary">
                  {getMovementTypeLabel(movement?.type)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">Número de Pieza</label>
                  <div className="mt-1 font-mono text-lg font-semibold text-text-primary">
                    {movement?.partNumber}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-text-secondary">Descripción</label>
                  <div className="mt-1 text-text-primary">
                    {movement?.description}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-text-secondary">Categoría</label>
                  <div className="mt-1 text-text-primary">
                    {movement?.category}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">Fecha y Hora</label>
                  <div className="mt-1 text-text-primary">
                    {new Date(movement.timestamp)?.toLocaleString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-text-secondary">Usuario Responsable</label>
                  <div className="mt-1">
                    <div className="text-text-primary font-medium">{movement?.user}</div>
                    <div className="text-sm text-text-secondary">{movement?.userRole}</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-text-secondary">Referencia</label>
                  <div className="mt-1 font-mono text-text-primary">
                    {movement?.reference}
                  </div>
                </div>
              </div>
            </div>

            {/* Stock Information */}
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-text-primary mb-4 flex items-center">
                <Icon name="Package" size={18} className="mr-2" />
                Información de Stock
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">{movement?.stockBefore}</div>
                  <div className="text-sm text-text-secondary">Stock Anterior</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${movement?.type === 'out' ? 'text-error' : 'text-success'}`}>
                    {movement?.type === 'out' ? '-' : '+'}{movement?.quantity}
                  </div>
                  <div className="text-sm text-text-secondary">Movimiento</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">{movement?.stockAfter}</div>
                  <div className="text-sm text-text-secondary">Stock Posterior</div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-text-secondary">Proveedor</label>
                <div className="mt-1 text-text-primary">{movement?.supplier}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Área de Trabajo</label>
                <div className="mt-1 text-text-primary">{movement?.area}</div>
              </div>
            </div>

            {/* Justification */}
            <div>
              <label className="text-sm font-medium text-text-secondary">Justificación del Movimiento</label>
              <div className="mt-2 p-4 bg-muted rounded-lg text-text-primary leading-relaxed">
                {movement?.justification}
              </div>
            </div>

            {/* Approval Information */}
            {movement?.approvedBy && (
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="CheckCircle" size={18} className="text-success" />
                  <span className="font-medium text-success">Movimiento Aprobado</span>
                </div>
                <div className="text-sm text-text-secondary">
                  Aprobado por: <span className="font-medium text-text-primary">{movement?.approvedBy}</span>
                  {movement?.approvalDate && (
                    <span className="ml-2">
                      el {new Date(movement.approvalDate)?.toLocaleDateString('es-ES')}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Documents */}
            {movement?.documents && movement?.documents?.length > 0 && (
              <div>
                <label className="text-sm font-medium text-text-secondary mb-3 block">
                  Documentos Relacionados
                </label>
                <div className="space-y-2">
                  {movement?.documents?.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon name="FileText" size={18} className="text-text-secondary" />
                        <div>
                          <div className="font-medium text-text-primary">{doc?.name}</div>
                          <div className="text-sm text-text-secondary">{doc?.type}</div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Download"
                        iconSize={16}
                      >
                        Descargar
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-border bg-muted/30">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cerrar
            </Button>
            <Button
              variant="default"
              iconName="Printer"
              iconPosition="left"
              iconSize={16}
            >
              Imprimir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovementDetailsModal;