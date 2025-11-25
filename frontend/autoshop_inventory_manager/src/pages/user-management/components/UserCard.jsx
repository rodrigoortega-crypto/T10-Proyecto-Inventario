import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserCard = ({ user, onEdit, onToggleStatus, onViewDetails }) => {
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
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card hover:shadow-modal transition-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="User" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-medium text-card-foreground">{user?.name}</h3>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon 
            name={user?.status === 'active' ? 'CheckCircle' : 'XCircle'} 
            size={16} 
            className={getStatusColor(user?.status)}
          />
          <span className={`text-xs font-medium ${getStatusColor(user?.status)}`}>
            {user?.status === 'active' ? 'Activo' : 'Inactivo'}
          </span>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Rol:</span>
          <span className={`text-xs px-2 py-1 rounded-full ${getRoleColor(user?.role)}`}>
            {getRoleLabel(user?.role)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Área:</span>
          <span className="text-sm font-medium text-card-foreground">{user?.area}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Último acceso:</span>
          <span className="text-sm text-card-foreground">{formatDate(user?.lastLogin)}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(user)}
          iconName="Eye"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          Ver
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(user)}
          iconName="Edit"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          Editar
        </Button>
        <Button
          variant={user?.status === 'active' ? 'destructive' : 'success'}
          size="sm"
          onClick={() => onToggleStatus(user)}
          iconName={user?.status === 'active' ? 'UserX' : 'UserCheck'}
          iconSize={14}
        />
      </div>
    </div>
  );
};

export default UserCard;