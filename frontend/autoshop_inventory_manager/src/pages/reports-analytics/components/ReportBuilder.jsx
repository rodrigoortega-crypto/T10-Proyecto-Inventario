import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReportBuilder = ({ selectedCategory, onGenerate, onBack }) => {
  const [reportConfig, setReportConfig] = useState({
    name: '',
    dateRange: 'last_30_days',
    startDate: '',
    endDate: '',
    format: 'pdf',
    filters: {
      suppliers: [],
      categories: [],
      users: [],
      areas: []
    },
    includeCharts: true,
    includeDetails: true,
    groupBy: 'date'
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const dateRangeOptions = [
    { value: 'today', label: 'Hoy' },
    { value: 'yesterday', label: 'Ayer' },
    { value: 'last_7_days', label: 'Últimos 7 días' },
    { value: 'last_30_days', label: 'Últimos 30 días' },
    { value: 'last_90_days', label: 'Últimos 90 días' },
    { value: 'this_month', label: 'Este mes' },
    { value: 'last_month', label: 'Mes pasado' },
    { value: 'this_year', label: 'Este año' },
    { value: 'custom', label: 'Rango personalizado' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF' },
    { value: 'excel', label: 'Excel (XLSX)' },
    { value: 'csv', label: 'CSV' }
  ];

  const groupByOptions = [
    { value: 'date', label: 'Por fecha' },
    { value: 'supplier', label: 'Por proveedor' },
    { value: 'category', label: 'Por categoría' },
    { value: 'user', label: 'Por usuario' },
    { value: 'area', label: 'Por área' }
  ];

  const supplierOptions = [
    { value: 'bosch', label: 'Bosch España' },
    { value: 'mann_filter', label: 'Mann+Hummel' },
    { value: 'castrol', label: 'Castrol Iberia' },
    { value: 'ngk', label: 'NGK Spark Plugs' },
    { value: 'continental', label: 'Continental' }
  ];

  const categoryOptions = [
    { value: 'motor', label: 'Motor' },
    { value: 'frenos', label: 'Frenos' },
    { value: 'suspension', label: 'Suspensión' },
    { value: 'electrico', label: 'Sistema Eléctrico' },
    { value: 'carroceria', label: 'Carrocería' }
  ];

  const handleConfigChange = (field, value) => {
    setReportConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilterChange = (filterType, values) => {
    setReportConfig(prev => ({
      ...prev,
      filters: {
        ...prev?.filters,
        [filterType]: values
      }
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const reportData = {
      ...reportConfig,
      category: selectedCategory,
      generatedAt: new Date()?.toISOString(),
      id: `report_${Date.now()}`
    };
    
    setIsGenerating(false);
    onGenerate(reportData);
  };

  const isCustomDateRange = reportConfig?.dateRange === 'custom';

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              iconName="ArrowLeft"
              iconSize={20}
            />
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Configurar Informe: {selectedCategory?.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                Personaliza los parámetros del informe
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name={selectedCategory?.icon} size={24} color="var(--color-primary)" />
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Basic Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Configuración Básica</h3>
            
            <Input
              label="Nombre del Informe"
              type="text"
              placeholder="Ej: Informe Mensual de Inventario"
              value={reportConfig?.name}
              onChange={(e) => handleConfigChange('name', e?.target?.value)}
              required
            />

            <Select
              label="Rango de Fechas"
              options={dateRangeOptions}
              value={reportConfig?.dateRange}
              onChange={(value) => handleConfigChange('dateRange', value)}
            />

            {isCustomDateRange && (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Fecha Inicio"
                  type="date"
                  value={reportConfig?.startDate}
                  onChange={(e) => handleConfigChange('startDate', e?.target?.value)}
                  required
                />
                <Input
                  label="Fecha Fin"
                  type="date"
                  value={reportConfig?.endDate}
                  onChange={(e) => handleConfigChange('endDate', e?.target?.value)}
                  required
                />
              </div>
            )}

            <Select
              label="Formato de Salida"
              options={formatOptions}
              value={reportConfig?.format}
              onChange={(value) => handleConfigChange('format', value)}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Filtros</h3>
            
            <Select
              label="Proveedores"
              options={supplierOptions}
              value={reportConfig?.filters?.suppliers}
              onChange={(value) => handleFilterChange('suppliers', value)}
              multiple
              searchable
              placeholder="Seleccionar proveedores..."
            />

            <Select
              label="Categorías"
              options={categoryOptions}
              value={reportConfig?.filters?.categories}
              onChange={(value) => handleFilterChange('categories', value)}
              multiple
              searchable
              placeholder="Seleccionar categorías..."
            />

            <Select
              label="Agrupar por"
              options={groupByOptions}
              value={reportConfig?.groupBy}
              onChange={(value) => handleConfigChange('groupBy', value)}
            />
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Opciones del Informe</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Checkbox
              label="Incluir gráficos y visualizaciones"
              description="Añade gráficos para mejor comprensión"
              checked={reportConfig?.includeCharts}
              onChange={(e) => handleConfigChange('includeCharts', e?.target?.checked)}
            />
            
            <Checkbox
              label="Incluir detalles completos"
              description="Muestra información detallada de cada elemento"
              checked={reportConfig?.includeDetails}
              onChange={(e) => handleConfigChange('includeDetails', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">Vista Previa de Configuración</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Tipo:</strong> {selectedCategory?.title}</p>
            <p><strong>Período:</strong> {dateRangeOptions?.find(opt => opt?.value === reportConfig?.dateRange)?.label}</p>
            <p><strong>Formato:</strong> {formatOptions?.find(opt => opt?.value === reportConfig?.format)?.label}</p>
            <p><strong>Filtros activos:</strong> {
              Object.values(reportConfig?.filters)?.flat()?.length || 'Ninguno'
            }</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onBack}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Volver
          </Button>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Eye"
              iconPosition="left"
            >
              Vista Previa
            </Button>
            
            <Button
              variant="default"
              onClick={handleGenerate}
              loading={isGenerating}
              disabled={!reportConfig?.name?.trim()}
              iconName="Download"
              iconPosition="left"
            >
              {isGenerating ? 'Generando...' : 'Generar Informe'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;