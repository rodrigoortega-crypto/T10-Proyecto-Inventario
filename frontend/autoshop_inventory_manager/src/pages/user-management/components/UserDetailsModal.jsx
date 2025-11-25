import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  const getRoleColor = (role) => {
    switch (role) {
      case 'administrator':
        return 'bg-error text-error-foreground';
      case 'manager':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-success text-success-foreground';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'administrator':
        return 'Administrador';
      case 'manager':
        return 'Gerente de Área';
      default:
        return 'Operador Mecánico';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-success' : 'text-error';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible';
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const permissions = {
    administrator: [
      { name: 'Gestión completa de inventario', granted: true },
      { name: 'Gestión de usuarios', granted: true },
      { name: 'Reportes y análisis', granted: true },
      { name: 'Configuración del sistema', granted: true },
      { name: 'Auditoría completa', granted: true },
      { name: 'Gestión de proveedores', granted: true }
    ],
    manager: [
      { name: 'Gestión completa de inventario', granted: true },
      { name: 'Gestión de usuarios', granted: false },
      { name: 'Reportes y análisis', granted: true },
      { name: 'Configuración del sistema', granted: false },
      { name: 'Auditoría de área', granted: true },
      { name: 'Gestión de proveedores', granted: true }
    ],
    operator: [
      { name: 'Consulta de inventario', granted: true },
      { name: 'Gestión de usuarios', granted: false },
      { name: 'Reportes básicos', granted: true },
      { name: 'Configuración del sistema', granted: false },
      { name: 'Auditoría limitada', granted: false },
      { name: 'Consulta de proveedores', granted: true }
    ]
  };

  const userPermissions = permissions?.[user?.role] || permissions?.operator;

  const recentActivity = [
    {
      id: 1,
      action: 'Inicio de sesión',
      timestamp: '2025-11-18T08:30:00',
      details: 'Acceso desde 192.168.1.100'
    },
    {
      id: 2,
      action: 'Consulta de inventario',
      timestamp: '2025-11-18T09:15:00',
      details: 'Búsqueda: "filtros de aceite"'
    },
    {
      id: 3,
      action: 'Actualización de stock',
      timestamp: '2025-11-18T10:45:00',
      details: 'Producto: Bujías NGK - Cantidad: +50'
    },
    {
      id: 4,
      action: 'Generación de reporte',
      timestamp: '2025-11-18T11:20:00',
      details: 'Reporte de movimientos mensuales'
    }
  ];

  return (
    <div className="fixed inset-0 z-1300 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-background/80 backdrop-blur-sm" onClick={onClose} />
        
        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-card shadow-modal rounded-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-card-foreground">Detalles del Usuario</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>

          <div className="space-y-6">
            {/* User Profile Section */}
            <div className="flex items-start space-x-4 p-4 bg-muted rounded-lg">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={24} color="white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-medium text-card-foreground">{user?.name}</h4>
                <p className="text-muted-foreground">{user?.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
                    {getRoleLabel(user?.role)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={user?.status === 'active' ? 'CheckCircle' : 'XCircle'} 
                      size={16} 
                      className={getStatusColor(user?.status)}
                    />
                    <span className={`text-sm font-medium ${getStatusColor(user?.status)}`}>
                      {user?.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h5 className="text-sm font-medium text-card-foreground mb-3">Información de Contacto</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-card-foreground">{user?.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-card-foreground">{user?.phone || 'No especificado'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-card-foreground">{user?.area}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-card-foreground">Último acceso: {formatDate(user?.lastLogin)}</span>
                </div>
              </div>
            </div>

            {/* Permissions Matrix */}
            <div>
              <h5 className="text-sm font-medium text-card-foreground mb-3">Permisos del Sistema</h5>
              <div className="space-y-2">
                {userPermissions?.map((permission, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm text-card-foreground">{permission?.name}</span>
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name={permission?.granted ? 'Check' : 'X'} 
                        size={16} 
                        className={permission?.granted ? 'text-success' : 'text-error'}
                      />
                      <span className={`text-xs font-medium ${permission?.granted ? 'text-success' : 'text-error'}`}>
                        {permission?.granted ? 'Concedido' : 'Denegado'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h5 className="text-sm font-medium text-card-foreground mb-3">Actividad Reciente</h5>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {recentActivity?.map((activity) => (
                  <div key={activity?.id} className="flex items-start space-x-3 p-2 bg-muted/50 rounded">
                    <Icon name="Activity" size={16} className="text-muted-foreground mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-card-foreground">{activity?.action}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(activity?.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{activity?.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;