import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SupplierDetailModal = ({ isOpen, onClose, supplier, onEdit, onContact }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !supplier) return null;

  const getPerformanceColor = (rating) => {
    if (rating >= 4.5) return 'text-success';
    if (rating >= 3.5) return 'text-warning';
    return 'text-error';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Activo' },
      inactive: { color: 'bg-error text-error-foreground', label: 'Inactivo' },
      pending: { color: 'bg-warning text-warning-foreground', label: 'Pendiente' }
    };
    return statusConfig?.[status] || statusConfig?.active;
  };

  const mockOrderHistory = [
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      date: "2024-11-15",
      items: "Pastillas de freno, Discos",
      amount: "€245.50",
      status: "delivered",
      deliveryDate: "2024-11-17"
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      date: "2024-11-10",
      items: "Filtro de aceite, Bujías",
      amount: "€89.30",
      status: "delivered",
      deliveryDate: "2024-11-12"
    },
    {
      id: 3,
      orderNumber: "ORD-2024-003",
      date: "2024-11-08",
      items: "Amortiguadores delanteros",
      amount: "€320.00",
      status: "pending",
      deliveryDate: "2024-11-20"
    }
  ];

  const mockPerformanceMetrics = [
    { label: "Puntualidad de Entrega", value: "94%", trend: "up" },
    { label: "Calidad de Productos", value: "4.6/5", trend: "up" },
    { label: "Tiempo Respuesta", value: "2.3h", trend: "down" },
    { label: "Cumplimiento Pedidos", value: "98%", trend: "up" }
  ];

  const mockCommunicationLog = [
    {
      id: 1,
      date: "2024-11-16",
      type: "email",
      subject: "Consulta sobre disponibilidad",
      status: "responded"
    },
    {
      id: 2,
      date: "2024-11-14",
      type: "phone",
      subject: "Seguimiento pedido ORD-2024-003",
      status: "completed"
    },
    {
      id: 3,
      date: "2024-11-12",
      type: "email",
      subject: "Actualización de precios",
      status: "pending"
    }
  ];

  const statusBadge = getStatusBadge(supplier?.status);

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: 'Eye' },
    { id: 'orders', label: 'Historial Pedidos', icon: 'Package' },
    { id: 'performance', label: 'Rendimiento', icon: 'BarChart3' },
    { id: 'communication', label: 'Comunicación', icon: 'MessageCircle' }
  ];

  return (
    <div className="fixed inset-0 z-1300 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-background/80 backdrop-blur-sm" onClick={onClose} />
        
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-card shadow-modal rounded-lg border border-border">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="text-xl font-semibold text-card-foreground">{supplier?.name}</h3>
                <p className="text-muted-foreground">{supplier?.category}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge?.color}`}>
                {statusBadge?.label}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onContact(supplier)}
                iconName="MessageCircle"
                iconPosition="left"
                iconSize={16}
              >
                Contactar
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => onEdit(supplier)}
                iconName="Edit"
                iconPosition="left"
                iconSize={16}
              >
                Editar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                iconName="X"
                iconSize={20}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <nav className="flex space-x-8 px-6">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-hover ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-card-foreground">Información de Contacto</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Icon name="Mail" size={16} className="text-muted-foreground" />
                        <span className="text-card-foreground">{supplier?.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Phone" size={16} className="text-muted-foreground" />
                        <span className="text-card-foreground">{supplier?.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="MapPin" size={16} className="text-muted-foreground" />
                        <span className="text-card-foreground">{supplier?.location}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="User" size={16} className="text-muted-foreground" />
                        <span className="text-card-foreground">{supplier?.contactPerson}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-card-foreground">Estadísticas Rápidas</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-card-foreground">{supplier?.activeOrders}</div>
                        <div className="text-sm text-muted-foreground">Pedidos Activos</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className={`text-2xl font-bold ${getPerformanceColor(supplier?.rating)}`}>
                          {supplier?.rating?.toFixed(1)}
                        </div>
                        <div className="text-sm text-muted-foreground">Calificación</div>
                      </div>
                    </div>
                  </div>
                </div>

                {supplier?.notes && (
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-2">Notas</h4>
                    <p className="text-muted-foreground bg-muted p-3 rounded-lg">{supplier?.notes}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-card-foreground">Historial de Pedidos</h4>
                <div className="space-y-3">
                  {mockOrderHistory?.map((order) => (
                    <div key={order?.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-card-foreground">{order?.orderNumber}</div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order?.status === 'delivered' ?'bg-success text-success-foreground' :'bg-warning text-warning-foreground'
                        }`}>
                          {order?.status === 'delivered' ? 'Entregado' : 'Pendiente'}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">{order?.items}</div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Fecha: {order?.date}</span>
                        <span className="font-medium text-card-foreground">{order?.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-card-foreground">Métricas de Rendimiento</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockPerformanceMetrics?.map((metric, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground">{metric?.label}</div>
                          <div className="text-lg font-semibold text-card-foreground">{metric?.value}</div>
                        </div>
                        <Icon 
                          name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                          size={20} 
                          className={metric?.trend === 'up' ? 'text-success' : 'text-error'} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'communication' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-card-foreground">Registro de Comunicación</h4>
                <div className="space-y-3">
                  {mockCommunicationLog?.map((log) => (
                    <div key={log?.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Icon 
                            name={log?.type === 'email' ? 'Mail' : 'Phone'} 
                            size={16} 
                            className="text-muted-foreground" 
                          />
                          <span className="font-medium text-card-foreground">{log?.subject}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          log?.status === 'completed' || log?.status === 'responded'
                            ? 'bg-success text-success-foreground' :'bg-warning text-warning-foreground'
                        }`}>
                          {log?.status === 'completed' ? 'Completado' : 
                           log?.status === 'responded' ? 'Respondido' : 'Pendiente'}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{log?.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetailModal;