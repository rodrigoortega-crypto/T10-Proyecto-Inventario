import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ExportModal = ({ isOpen, onClose, onExport, totalRecords }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'excel',
    dateRange: 'all',
    includeDetails: true,
    includeAuditTrail: true,
    includeDocuments: false,
    groupBy: 'none'
  });

  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const formatOptions = [
    { value: 'excel', label: 'Excel (.xlsx)' },
    { value: 'csv', label: 'CSV (.csv)' },
    { value: 'pdf', label: 'PDF (.pdf)' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'Todos los registros' },
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Última semana' },
    { value: 'month', label: 'Último mes' },
    { value: 'quarter', label: 'Último trimestre' },
    { value: 'year', label: 'Último año' }
  ];

  const groupByOptions = [
    { value: 'none', label: 'Sin agrupación' },
    { value: 'date', label: 'Por fecha' },
    { value: 'type', label: 'Por tipo de movimiento' },
    { value: 'user', label: 'Por usuario' },
    { value: 'category', label: 'Por categoría' },
    { value: 'supplier', label: 'Por proveedor' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport(exportConfig);
      onClose();
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const getEstimatedFileSize = () => {
    const baseSize = totalRecords * 0.5; // KB per record
    const multiplier = exportConfig?.includeDetails ? 1.5 : 1;
    const auditMultiplier = exportConfig?.includeAuditTrail ? 1.3 : 1;
    return Math.round(baseSize * multiplier * auditMultiplier);
  };

  return (
    <div className="fixed inset-0 z-1300 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-card rounded-lg shadow-modal transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon name="Download" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Exportar Movimientos
                </h3>
                <p className="text-sm text-text-secondary">
                  Configurar opciones de exportación
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
            {/* Format Selection */}
            <div>
              <Select
                label="Formato de archivo"
                description="Selecciona el formato para la exportación"
                options={formatOptions}
                value={exportConfig?.format}
                onChange={(value) => setExportConfig(prev => ({ ...prev, format: value }))}
              />
            </div>

            {/* Date Range */}
            <div>
              <Select
                label="Rango de fechas"
                description="Selecciona el período de datos a exportar"
                options={dateRangeOptions}
                value={exportConfig?.dateRange}
                onChange={(value) => setExportConfig(prev => ({ ...prev, dateRange: value }))}
              />
            </div>

            {/* Group By */}
            <div>
              <Select
                label="Agrupar por"
                description="Organizar los datos por categoría"
                options={groupByOptions}
                value={exportConfig?.groupBy}
                onChange={(value) => setExportConfig(prev => ({ ...prev, groupBy: value }))}
              />
            </div>

            {/* Export Options */}
            <div className="space-y-4">
              <h4 className="font-medium text-text-primary">Opciones de contenido</h4>
              
              <Checkbox
                label="Incluir detalles completos"
                description="Información detallada de cada movimiento"
                checked={exportConfig?.includeDetails}
                onChange={(e) => setExportConfig(prev => ({ 
                  ...prev, 
                  includeDetails: e?.target?.checked 
                }))}
              />

              <Checkbox
                label="Incluir pista de auditoría"
                description="Información de usuario y timestamps"
                checked={exportConfig?.includeAuditTrail}
                onChange={(e) => setExportConfig(prev => ({ 
                  ...prev, 
                  includeAuditTrail: e?.target?.checked 
                }))}
              />

              <Checkbox
                label="Incluir referencias de documentos"
                description="Enlaces y referencias a documentos adjuntos"
                checked={exportConfig?.includeDocuments}
                onChange={(e) => setExportConfig(prev => ({ 
                  ...prev, 
                  includeDocuments: e?.target?.checked 
                }))}
              />
            </div>

            {/* Export Summary */}
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-text-primary mb-3 flex items-center">
                <Icon name="Info" size={18} className="mr-2" />
                Resumen de exportación
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Registros a exportar:</span>
                  <span className="font-medium">{totalRecords?.toLocaleString('es-ES')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Formato:</span>
                  <span className="font-medium">
                    {formatOptions?.find(f => f?.value === exportConfig?.format)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Tamaño estimado:</span>
                  <span className="font-medium">{getEstimatedFileSize()} KB</span>
                </div>
              </div>
            </div>

            {/* Warning for large exports */}
            {totalRecords > 10000 && (
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={18} className="text-warning mt-0.5" />
                  <div>
                    <div className="font-medium text-warning">Exportación grande</div>
                    <div className="text-sm text-text-secondary mt-1">
                      Esta exportación contiene más de 10,000 registros. El proceso puede tardar varios minutos.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-border bg-muted/30">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isExporting}
            >
              Cancelar
            </Button>
            <Button
              variant="default"
              onClick={handleExport}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
            >
              {isExporting ? 'Exportando...' : 'Exportar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;