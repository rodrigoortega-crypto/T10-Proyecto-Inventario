import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserTable = ({ users, onEdit, onToggleStatus, onViewDetails, selectedUsers, onSelectUser, onSelectAll }) => {
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

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isAllSelected = users?.length > 0 && selectedUsers?.length === users?.length;
  const isIndeterminate = selectedUsers?.length > 0 && selectedUsers?.length < users?.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="w-12 p-4">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={onSelectAll}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                </div>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Usuario</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Rol</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Área</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Último Acceso</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Estado</th>
              <th className="text-center p-4 text-sm font-medium text-muted-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users?.map((user) => (
              <tr key={user?.id} className="hover:bg-muted/50 transition-hover">
                <td className="p-4">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers?.includes(user?.id)}
                      onChange={() => onSelectUser(user?.id)}
                      className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                    />
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} color="white" />
                    </div>
                    <div>
                      <div className="font-medium text-card-foreground">{user?.name}</div>
                      <div className="text-sm text-muted-foreground">{user?.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
                    {getRoleLabel(user?.role)}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-card-foreground">{user?.area}</span>
                </td>
                <td className="p-4">
                  <div className="text-sm text-card-foreground">
                    <div>{formatDate(user?.lastLogin)}</div>
                    {user?.lastLogin && (
                      <div className="text-xs text-muted-foreground">{formatTime(user?.lastLogin)}</div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={user?.status === 'active' ? 'CheckCircle' : 'XCircle'} 
                      size={16} 
                      className={getStatusColor(user?.status)}
                    />
                    <span className={`text-sm font-medium ${getStatusColor(user?.status)}`}>
                      {user?.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onViewDetails(user)}
                      iconName="Eye"
                      iconSize={14}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onEdit(user)}
                      iconName="Edit"
                      iconSize={14}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onToggleStatus(user)}
                      iconName={user?.status === 'active' ? 'UserX' : 'UserCheck'}
                      iconSize={14}
                      className={user?.status === 'active' ? 'text-error hover:text-error' : 'text-success hover:text-success'}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;