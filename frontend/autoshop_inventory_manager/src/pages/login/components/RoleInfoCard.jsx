import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleInfoCard = () => {
  const roles = [
    {
      id: 'administrator',
      name: 'Administrador',
      icon: 'Shield',
      description: 'Acceso completo al sistema, gestión de usuarios y configuración',
      permissions: ['Gestión completa de inventario', 'Administración de usuarios', 'Reportes avanzados', 'Configuración del sistema']
    },
    {
      id: 'manager',
      name: 'Gerente de Área',
      icon: 'Users',
      description: 'Supervisión de inventario y gestión de proveedores',
      permissions: ['Gestión de inventario', 'Movimientos de stock', 'Reportes departamentales', 'Gestión de proveedores']
    },
    {
      id: 'operator',
      name: 'Operador Mecánico',
      icon: 'Wrench',
      description: 'Consulta de inventario y operaciones básicas',
      permissions: ['Consulta de inventario', 'Registro de uso de piezas', 'Alertas de stock bajo', 'Búsqueda de repuestos']
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Info" size={20} color="var(--color-primary)" />
        <h3 className="text-lg font-semibold text-card-foreground">Roles del Sistema</h3>
      </div>
      <div className="space-y-4">
        {roles?.map((role) => (
          <div key={role?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-hover">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={role?.icon} size={20} color="var(--color-primary)" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-card-foreground mb-1">{role?.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{role?.description}</p>
                
                <div className="space-y-1">
                  {role?.permissions?.map((permission, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} color="var(--color-success)" />
                      <span className="text-xs text-muted-foreground">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleInfoCard;