import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AlertNotificationBar from '../../components/ui/AlertNotificationBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ReportCategoryCard from './components/ReportCategoryCard';
import MetricsCard from './components/MetricsCard';
import ReportBuilder from './components/ReportBuilder';
import ReportTemplateCard from './components/ReportTemplateCard';
import AnalyticsChart from './components/AnalyticsChart';
import ReportHistoryTable from './components/ReportHistoryTable';

const ReportsAnalytics = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [alerts, setAlerts] = useState([]);

  // Mock data for report categories
  const reportCategories = [
    {
      id: 'inventory',
      type: 'inventory',
      title: 'Valoración de Inventario',
      description: 'Informes detallados sobre el valor del stock, rotación y análisis de costos por categoría de productos.',
      icon: 'Package',
      color: 'var(--color-primary)',
      reportCount: 12,
      lastGenerated: 'Hace 2 horas',
      isNew: false
    },
    {
      id: 'movements',
      type: 'movement',
      title: 'Análisis de Movimientos',
      description: 'Seguimiento completo de entradas, salidas y transferencias con patrones de consumo y tendencias.',
      icon: 'ArrowUpDown',
      color: 'var(--color-warning)',
      reportCount: 8,
      lastGenerated: 'Ayer',
      isNew: false
    },
    {
      id: 'suppliers',
      type: 'supplier',
      title: 'Rendimiento de Proveedores',
      description: 'Evaluación de proveedores con métricas de tiempo de entrega, calidad y análisis comparativo.',
      icon: 'Truck',
      color: 'var(--color-success)',
      reportCount: 15,
      lastGenerated: 'Hace 3 días',
      isNew: true
    },
    {
      id: 'users',
      type: 'user',
      title: 'Actividad de Usuarios',
      description: 'Registro de actividades del personal, auditoría de operaciones y análisis de productividad.',
      icon: 'Users',
      color: 'var(--color-secondary)',
      reportCount: 6,
      lastGenerated: 'Hace 1 semana',
      isNew: false
    },
    {
      id: 'financial',
      type: 'financial',
      title: 'Análisis Financiero',
      description: 'Informes de costos de inventario, análisis de rentabilidad y proyecciones financieras.',
      icon: 'DollarSign',
      color: 'var(--color-error)',
      reportCount: 9,
      lastGenerated: 'Hace 5 días',
      isNew: true
    }
  ];

  // Mock data for key metrics
  const keyMetrics = [
    {
      id: 'total_value',
      title: 'Valor Total del Inventario',
      value: 245680,
      unit: '€',
      trend: 5.2,
      icon: 'Euro',
      bgColor: 'bg-primary/10',
      iconColor: 'var(--color-primary)',
      subtitle: 'Incremento mensual del 5.2%',
      progress: 78
    },
    {
      id: 'turnover_rate',
      title: 'Tasa de Rotación',
      value: 4.2,
      unit: 'veces/año',
      trend: -2.1,
      icon: 'RotateCcw',
      bgColor: 'bg-warning/10',
      iconColor: 'var(--color-warning)',
      subtitle: 'Objetivo: 5.0 veces/año',
      progress: 84
    },
    {
      id: 'supplier_performance',
      title: 'Rendimiento Promedio',
      value: 92,
      unit: '%',
      trend: 3.8,
      icon: 'TrendingUp',
      bgColor: 'bg-success/10',
      iconColor: 'var(--color-success)',
      subtitle: 'Basado en 15 proveedores activos',
      progress: 92
    },
    {
      id: 'cost_savings',
      title: 'Ahorro en Costos',
      value: 18450,
      unit: '€',
      trend: 12.5,
      icon: 'PiggyBank',
      bgColor: 'bg-error/10',
      iconColor: 'var(--color-error)',
      subtitle: 'Comparado con el trimestre anterior',
      progress: 65
    }
  ];

  // Mock data for report templates
  const reportTemplates = [
    {
      id: 'monthly_inventory',
      name: 'Resumen Mensual de Inventario',
      description: 'Informe completo del estado del inventario con análisis de rotación y valoración.',
      category: 'Inventario',
      icon: 'Calendar',
      format: 'pdf',
      frequency: 'monthly',
      isScheduled: true,
      lastUsed: '2025-11-15T10:30:00Z',
      usageCount: 24,
      filters: {
        categories: ['motor', 'frenos'],
        suppliers: ['bosch', 'mann_filter']
      }
    },
    {
      id: 'supplier_scorecard',
      name: 'Tarjeta de Puntuación de Proveedores',
      description: 'Evaluación detallada del rendimiento de proveedores con métricas clave.',
      category: 'Proveedores',
      icon: 'Award',
      format: 'excel',
      frequency: 'weekly',
      isScheduled: true,
      lastUsed: '2025-11-17T14:15:00Z',
      usageCount: 18,
      filters: {
        suppliers: ['bosch', 'castrol', 'continental']
      }
    },
    {
      id: 'stock_movement_analysis',
      name: 'Análisis de Movimientos de Stock',
      description: 'Seguimiento detallado de entradas y salidas con patrones de consumo.',
      category: 'Movimientos',
      icon: 'BarChart3',
      format: 'csv',
      frequency: 'daily',
      isScheduled: false,
      lastUsed: '2025-11-16T09:45:00Z',
      usageCount: 42,
      filters: {
        categories: ['motor', 'suspension', 'electrico']
      }
    }
  ];

  // Mock data for chart analytics
  const inventoryTrendData = [
    { name: 'Ene', value: 220000 },
    { name: 'Feb', value: 235000 },
    { name: 'Mar', value: 228000 },
    { name: 'Abr', value: 242000 },
    { name: 'May', value: 238000 },
    { name: 'Jun', value: 245680 }
  ];

  const supplierPerformanceData = [
    { name: 'Bosch España', value: 95 },
    { name: 'Mann+Hummel', value: 92 },
    { name: 'Castrol Iberia', value: 88 },
    { name: 'NGK Spark Plugs', value: 94 },
    { name: 'Continental', value: 90 }
  ];

  const categoryDistributionData = [
    { name: 'Motor', value: 35 },
    { name: 'Frenos', value: 25 },
    { name: 'Suspensión', value: 20 },
    { name: 'Eléctrico', value: 15 },
    { name: 'Carrocería', value: 5 }
  ];

  // Mock data for report history
  const reportHistory = [
    {
      id: 'RPT-2025-001',
      name: 'Informe Mensual Octubre 2025',
      category: 'Inventario',
      format: 'pdf',
      generatedAt: '2025-11-15T10:30:00Z',
      fileSize: 2048576,
      status: 'completed'
    },
    {
      id: 'RPT-2025-002',
      name: 'Análisis de Proveedores Q4',
      category: 'Proveedores',
      format: 'excel',
      generatedAt: '2025-11-14T16:20:00Z',
      fileSize: 1536000,
      status: 'completed'
    },
    {
      id: 'RPT-2025-003',
      name: 'Movimientos Semanales',
      category: 'Movimientos',
      format: 'csv',
      generatedAt: '2025-11-13T08:45:00Z',
      fileSize: 512000,
      status: 'completed'
    },
    {
      id: 'RPT-2025-004',
      name: 'Valoración Trimestral',
      category: 'Financiero',
      format: 'pdf',
      generatedAt: '2025-11-12T12:00:00Z',
      fileSize: 3072000,
      status: 'processing'
    }
  ];

  useEffect(() => {
    // Mock alerts for low stock and other notifications
    const mockAlerts = [
      {
        id: 'alert_1',
        type: 'warning',
        title: 'Stock Bajo Detectado',
        message: 'Varios artículos están por debajo del nivel mínimo de stock.',
        timestamp: new Date(Date.now() - 300000),
        actionable: true,
        details: {
          itemCode: 'Multiple',
          affectedItems: 8
        }
      }
    ];
    setAlerts(mockAlerts);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setActiveTab('builder');
  };

  const handleReportGenerate = (reportData) => {
    console.log('Generating report:', reportData);
    // Simulate report generation success
    setSelectedCategory(null);
    setActiveTab('history');
  };

  const handleTemplateUse = (template) => {
    console.log('Using template:', template);
    // Pre-fill report builder with template data
    setActiveTab('builder');
  };

  const handleTemplateEdit = (template) => {
    console.log('Editing template:', template);
  };

  const handleTemplateDelete = (templateId) => {
    console.log('Deleting template:', templateId);
  };

  const handleReportDownload = (report) => {
    console.log('Downloading report:', report);
  };

  const handleReportDelete = (reportId) => {
    console.log('Deleting report:', reportId);
  };

  const handleReportView = (report) => {
    console.log('Viewing report:', report);
  };

  const handleLogout = () => {
    console.log('User logging out');
  };

  const handleAlertDismiss = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const handleAlertViewDetails = (alert) => {
    console.log('Viewing alert details:', alert);
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: 'LayoutDashboard' },
    { id: 'categories', label: 'Categorías', icon: 'Grid3X3' },
    { id: 'builder', label: 'Generar Informe', icon: 'Plus' },
    { id: 'templates', label: 'Plantillas', icon: 'FileTemplate' },
    { id: 'history', label: 'Historial', icon: 'History' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="manager" userName="Carlos Mendoza" onLogout={handleLogout} />
      <AlertNotificationBar alerts={alerts} onDismiss={handleAlertDismiss} onViewDetails={handleAlertViewDetails} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <Breadcrumb />
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-foreground">Reportes y Análisis</h1>
              <p className="text-muted-foreground mt-2">
                Genera informes personalizados y analiza el rendimiento del inventario con métricas detalladas.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">Métricas Clave</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {keyMetrics?.map((metric) => (
                    <MetricsCard key={metric?.id} metric={metric} />
                  ))}
                </div>
              </div>

              {/* Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticsChart
                  data={inventoryTrendData}
                  type="area"
                  title="Tendencia de Valoración del Inventario"
                  height={300}
                  color="var(--color-primary)"
                />
                <AnalyticsChart
                  data={supplierPerformanceData}
                  type="bar"
                  title="Rendimiento de Proveedores (%)"
                  height={300}
                  color="var(--color-success)"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticsChart
                  data={categoryDistributionData}
                  type="pie"
                  title="Distribución por Categorías (%)"
                  height={300}
                />
                <div className="bg-card p-6 rounded-lg border border-border shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Acciones Rápidas</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="FileText"
                      iconPosition="left"
                      onClick={() => setActiveTab('builder')}
                    >
                      Generar Informe Personalizado
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Download"
                      iconPosition="left"
                      onClick={() => setActiveTab('history')}
                    >
                      Descargar Informes Recientes
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Calendar"
                      iconPosition="left"
                      onClick={() => setActiveTab('templates')}
                    >
                      Programar Informe Automático
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Categorías de Informes</h2>
                <p className="text-sm text-muted-foreground">
                  Selecciona una categoría para generar un informe personalizado
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportCategories?.map((category) => (
                  <ReportCategoryCard
                    key={category?.id}
                    category={category}
                    onSelect={handleCategorySelect}
                    isSelected={selectedCategory?.id === category?.id}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'builder' && (
            <div>
              {selectedCategory ? (
                <ReportBuilder
                  selectedCategory={selectedCategory}
                  onGenerate={handleReportGenerate}
                  onBack={() => setSelectedCategory(null)}
                />
              ) : (
                <div className="text-center py-12">
                  <Icon name="FileText" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Selecciona una Categoría
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Primero selecciona una categoría de informe para continuar con la configuración.
                  </p>
                  <Button
                    variant="default"
                    onClick={() => setActiveTab('categories')}
                    iconName="Grid3X3"
                    iconPosition="left"
                  >
                    Ver Categorías
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Plantillas de Informes</h2>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setActiveTab('builder')}
                >
                  Nueva Plantilla
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {reportTemplates?.map((template) => (
                  <ReportTemplateCard
                    key={template?.id}
                    template={template}
                    onUse={handleTemplateUse}
                    onEdit={handleTemplateEdit}
                    onDelete={handleTemplateDelete}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <ReportHistoryTable
                reports={reportHistory}
                onDownload={handleReportDownload}
                onDelete={handleReportDelete}
                onView={handleReportView}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReportsAnalytics;