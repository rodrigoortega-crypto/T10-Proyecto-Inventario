import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AlertNotificationBar from '../../components/ui/AlertNotificationBar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MetricCard from './components/MetricCard';
import AlertsPanel from './components/AlertsPanel';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import StockOverview from './components/StockOverview';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('administrator');
  const [userName, setUserName] = useState('Carlos Rodríguez');
  const [currentLanguage, setCurrentLanguage] = useState('es');

  // Mock data for dashboard metrics
  const dashboardMetrics = [
    {
      title: "Valor Total Inventario",
      value: "$127.450.000",
      subtitle: "Actualizado hace 5 min",
      icon: "DollarSign",
      trend: "up",
      trendValue: "+2.3%",
      color: "primary"
    },
    {
      title: "Alertas de Stock Bajo",
      value: "23",
      subtitle: "Requieren atención",
      icon: "AlertTriangle",
      trend: "down",
      trendValue: "-5",
      color: "warning"
    },
    {
      title: "Transacciones Hoy",
      value: "47",
      subtitle: "32 entradas, 15 salidas",
      icon: "ArrowUpDown",
      trend: "up",
      trendValue: "+12%",
      color: "success"
    },
    {
      title: "Proveedores Activos",
      value: "18",
      subtitle: "3 nuevos este mes",
      icon: "Truck",
      trend: "up",
      trendValue: "+3",
      color: "secondary"
    }
  ];

  // Mock alerts data
  const mockAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Stock Crítico - Pastillas de Freno',
      message: 'Stock por debajo del mínimo establecido',
      timestamp: new Date(Date.now() - 300000),
      actionable: true,
      details: {
        itemCode: 'BRK-001',
        currentStock: 2,
        minStock: 10
      },
      expandedContent: `Las pastillas de freno modelo BRK-001 han alcanzado un nivel crítico de stock.\nSe recomienda realizar un pedido urgente al proveedor AutoParts Santiago.\nTiempo estimado de entrega: 2-3 días laborables.`
    },
    {
      id: 2,
      type: 'warning',
      title: 'Stock Bajo - Filtros de Aceite',
      message: 'Revisar niveles de inventario',
      timestamp: new Date(Date.now() - 900000),
      actionable: true,
      details: {
        itemCode: 'FLT-205',
        currentStock: 8,
        minStock: 15
      }
    },
    {
      id: 3,
      type: 'info',
      title: 'Nuevo Proveedor Registrado',
      message: 'Repuestos Valparaíso se ha añadido al sistema',
      timestamp: new Date(Date.now() - 1800000),
      actionable: false
    }
  ];

  // Mock activity data
  const mockActivities = [
    {
      id: 1,
      type: 'stock_in',
      title: 'Entrada de Stock',
      description: 'Recepción de mercancía de AutoParts Santiago',
      timestamp: new Date(Date.now() - 600000),
      details: {
        itemCode: 'ENG-450',
        quantity: 25,
        user: 'María González'
      }
    },
    {
      id: 2,
      type: 'stock_out',
      title: 'Salida de Stock',
      description: 'Entrega para reparación de BMW Serie 3',
      timestamp: new Date(Date.now() - 1200000),
      details: {
        itemCode: 'BRK-001',
        quantity: -2,
        user: 'Juan Pérez'
      }
    },
    {
      id: 3,
      type: 'user_action',
      title: 'Usuario Conectado',
      description: 'Ana Martín ha iniciado sesión',
      timestamp: new Date(Date.now() - 1800000),
      details: {
        user: 'Ana Martín'
      }
    },
    {
      id: 4,
      type: 'adjustment',
      title: 'Ajuste de Inventario',
      description: 'Corrección de stock por inventario físico',
      timestamp: new Date(Date.now() - 2400000),
      details: {
        itemCode: 'SUS-120',
        quantity: -3,
        user: 'Carlos Rodríguez'
      }
    },
    {
      id: 5,
      type: 'supplier',
      title: 'Pedido Enviado',
      description: 'Orden de compra #PO-2024-156 enviada',
      timestamp: new Date(Date.now() - 3600000),
      details: {
        user: 'Sistema'
      }
    }
  ];

  // Mock stock overview data
  const mockStockData = {
    totalItems: 1247,
    lowStockItems: 23,
    outOfStockItems: 7,
    categories: [
      { id: 'motor', count: 342 },
      { id: 'frenos', count: 189 },
      { id: 'suspension', count: 156 },
      { id: 'electrico', count: 298 },
      { id: 'carroceria', count: 262 }
    ],
    recentMovements: [
      { id: 1, type: 'in', item: 'Pastillas Freno Delanteras', quantity: 20 },
      { id: 2, type: 'out', item: 'Filtro Aceite Motor', quantity: -5 },
      { id: 3, type: 'in', item: 'Amortiguadores Traseros', quantity: 8 }
    ]
  };

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Mock user role detection (in real app, this would come from authentication)
    const savedUserRole = localStorage.getItem('userRole') || 'administrator';
    const savedUserName = localStorage.getItem('userName') || 'Carlos Rodríguez';
    setUserRole(savedUserRole);
    setUserName(savedUserName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const handleMetricClick = (metric) => {
    // Navigate based on metric type
    if (metric?.title?.includes('Inventario')) {
      navigate('/inventory-management');
    } else if (metric?.title?.includes('Alertas')) {
      navigate('/inventory-management');
    } else if (metric?.title?.includes('Transacciones')) {
      navigate('/stock-movements');
    } else if (metric?.title?.includes('Proveedores')) {
      navigate('/supplier-management');
    }
  };

  const handleQuickAction = (action) => {
    if (action?.path) {
      navigate(action?.path);
    }
  };

  const handleViewAllAlerts = () => {
    navigate('/inventory-management');
  };

  const handleViewAllActivities = () => {
    navigate('/stock-movements');
  };

  const handleViewStockDetails = () => {
    navigate('/inventory-management');
  };

  const handleDismissAlert = (alertId) => {
    console.log('Dismissing alert:', alertId);
    // In real app, this would update the alerts state
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole}
        userName={userName}
        onLogout={handleLogout}
      />
      <AlertNotificationBar 
        alerts={mockAlerts?.filter(alert => alert?.type === 'critical')}
        onDismiss={handleDismissAlert}
        onViewDetails={(alert) => navigate('/inventory-management')}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb />
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Resumen general del sistema Sigita
            </p>
            <div className="text-sm text-muted-foreground mt-1">
              Última actualización: {new Date()?.toLocaleDateString('es-CL', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardMetrics?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                subtitle={metric?.subtitle}
                icon={metric?.icon}
                trend={metric?.trend}
                trendValue={metric?.trendValue}
                color={metric?.color}
                onClick={() => handleMetricClick(metric)}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Alerts and Stock Overview */}
            <div className="lg:col-span-2 space-y-8">
              <AlertsPanel
                alerts={mockAlerts}
                onViewAll={handleViewAllAlerts}
                onDismissAlert={handleDismissAlert}
              />
              
              <StockOverview
                stockData={mockStockData}
                onViewDetails={handleViewStockDetails}
              />
            </div>

            {/* Right Column - Activity Feed */}
            <div className="lg:col-span-1">
              <ActivityFeed
                activities={mockActivities}
                onViewAll={handleViewAllActivities}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions
              userRole={userRole}
              onActionClick={handleQuickAction}
            />
          </div>

          {/* Footer Info */}
          <div className="text-center text-sm text-muted-foreground py-8 border-t border-border">
            <p>Sigita - Sistema de Gestión de Inventario</p>
            <p className="mt-1">
              © {new Date()?.getFullYear()} Sigita. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;