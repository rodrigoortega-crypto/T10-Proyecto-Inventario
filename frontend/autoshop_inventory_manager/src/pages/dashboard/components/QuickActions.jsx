import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ userRole = 'operator', onActionClick, className = "" }) => {
  const getActionsForRole = (role) => {
    const baseActions = [
      {
        id: 'search_parts',
        label: 'Buscar Repuestos',
        description: 'Consultar disponibilidad de piezas',
        icon: 'Search',
        variant: 'default',
        path: '/inventory-management'
      },
      {
        id: 'new_transaction',
        label: 'Nueva Transacción',
        description: 'Registrar entrada o salida',
        icon: 'Plus',
        variant: 'outline',
        path: '/stock-movements'
      }
    ];

    const managerActions = [
      {
        id: 'view_reports',
        label: 'Ver Reportes',
        description: 'Análisis y estadísticas',
        icon: 'BarChart3',
        variant: 'outline',
        path: '/reports-analytics'
      },
      {
        id: 'manage_suppliers',
        label: 'Gestionar Proveedores',
        description: 'Administrar contactos',
        icon: 'Truck',
        variant: 'outline',
        path: '/supplier-management'
      }
    ];

    const adminActions = [
      {
        id: 'manage_users',
        label: 'Gestionar Usuarios',
        description: 'Administrar permisos',
        icon: 'Users',
        variant: 'outline',
        path: '/user-management'
      },
      {
        id: 'system_settings',
        label: 'Configuración',
        description: 'Ajustes del sistema',
        icon: 'Settings',
        variant: 'outline',
        path: '/dashboard'
      }
    ];

    let actions = [...baseActions];
    
    if (role === 'manager' || role === 'administrator') {
      actions = [...actions, ...managerActions];
    }
    
    if (role === 'administrator') {
      actions = [...actions, ...adminActions];
    }

    return actions;
  };

  let actions = getActionsForRole(userRole);

  const handleActionClick = (action) => {
    if (onActionClick) {
      onActionClick(action);
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Acciones Rápidas</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Acceso directo a funciones principales
        </p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions?.map((action) => (
            <div
              key={action?.id}
              className="group p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-hover cursor-pointer"
              onClick={() => handleActionClick(action)}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-hover">
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName={action?.icon}
                    iconSize={20}
                    className="w-full h-full hover:bg-transparent"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-hover">
                    {action?.label}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {action?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Actions */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Acciones de Emergencia</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="destructive"
              size="sm"
              iconName="AlertTriangle"
              iconPosition="left"
              iconSize={16}
              onClick={() => handleActionClick({ id: 'emergency_stock', path: '/inventory-management' })}
            >
              Stock Crítico
            </Button>
            <Button
              variant="warning"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              iconSize={16}
              onClick={() => handleActionClick({ id: 'contact_supplier', path: '/supplier-management' })}
            >
              Contactar Proveedor
            </Button>
            {(userRole === 'manager' || userRole === 'administrator') && (
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                iconSize={16}
                onClick={() => handleActionClick({ id: 'export_data', path: '/reports-analytics' })}
              >
                Exportar Datos
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;