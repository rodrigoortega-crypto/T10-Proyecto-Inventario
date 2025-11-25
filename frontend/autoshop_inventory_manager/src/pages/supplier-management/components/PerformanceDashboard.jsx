import React from 'react';
import Icon from '../../../components/AppIcon';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const PerformanceDashboard = ({ suppliers }) => {
  const performanceData = [
    { month: 'Ene', deliveries: 45, quality: 4.2, response: 2.1 },
    { month: 'Feb', deliveries: 52, quality: 4.4, response: 1.8 },
    { month: 'Mar', deliveries: 48, quality: 4.3, response: 2.0 },
    { month: 'Abr', deliveries: 61, quality: 4.5, response: 1.6 },
    { month: 'May', deliveries: 55, quality: 4.6, response: 1.4 },
    { month: 'Jun', deliveries: 67, quality: 4.4, response: 1.7 }
  ];

  const categoryDistribution = [
    { name: 'Motor', value: 25, color: '#1E40AF' },
    { name: 'Frenos', value: 20, color: '#F59E0B' },
    { name: 'Suspensión', value: 15, color: '#10B981' },
    { name: 'Eléctrico', value: 18, color: '#EF4444' },
    { name: 'Otros', value: 22, color: '#6B7280' }
  ];

  const topPerformers = suppliers?.sort((a, b) => b?.rating - a?.rating)?.slice(0, 5);

  const calculateAverageRating = () => {
    const total = suppliers?.reduce((sum, supplier) => sum + supplier?.rating, 0);
    return (total / suppliers?.length)?.toFixed(1);
  };

  const getActiveSuppliers = () => {
    return suppliers?.filter(supplier => supplier?.status === 'active')?.length;
  };

  const getTotalOrders = () => {
    return suppliers?.reduce((sum, supplier) => sum + supplier?.activeOrders, 0);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Proveedores Activos</p>
              <p className="text-2xl font-bold text-card-foreground">{getActiveSuppliers()}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={24} className="text-primary" />
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm">
            <Icon name="TrendingUp" size={16} className="text-success mr-1" />
            <span className="text-success">+5.2%</span>
            <span className="text-muted-foreground ml-1">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pedidos Activos</p>
              <p className="text-2xl font-bold text-card-foreground">{getTotalOrders()}</p>
            </div>
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={24} className="text-warning" />
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm">
            <Icon name="TrendingUp" size={16} className="text-success mr-1" />
            <span className="text-success">+12.8%</span>
            <span className="text-muted-foreground ml-1">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Calificación Promedio</p>
              <p className="text-2xl font-bold text-card-foreground">{calculateAverageRating()}</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Star" size={24} className="text-success" />
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm">
            <Icon name="TrendingUp" size={16} className="text-success mr-1" />
            <span className="text-success">+0.3</span>
            <span className="text-muted-foreground ml-1">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tiempo Respuesta</p>
              <p className="text-2xl font-bold text-card-foreground">1.7h</p>
            </div>
            <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={24} className="text-error" />
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm">
            <Icon name="TrendingDown" size={16} className="text-success mr-1" />
            <span className="text-success">-0.4h</span>
            <span className="text-muted-foreground ml-1">vs mes anterior</span>
          </div>
        </div>
      </div>
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Tendencias de Rendimiento</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="deliveries" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  name="Entregas"
                />
                <Line 
                  type="monotone" 
                  dataKey="quality" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  name="Calidad"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Distribución por Categoría</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                >
                  {categoryDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Top Performers */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Mejores Proveedores</h3>
        <div className="space-y-3">
          {topPerformers?.map((supplier, index) => (
            <div key={supplier?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'bg-warning text-warning-foreground' :
                  index === 1 ? 'bg-muted-foreground text-background' :
                  index === 2 ? 'bg-accent text-accent-foreground': 'bg-secondary text-secondary-foreground'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium text-card-foreground">{supplier?.name}</div>
                  <div className="text-sm text-muted-foreground">{supplier?.category}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-sm font-medium text-card-foreground">{supplier?.activeOrders}</div>
                  <div className="text-xs text-muted-foreground">Pedidos</div>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} className="text-warning fill-current" />
                  <span className="font-medium text-card-foreground">{supplier?.rating?.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;