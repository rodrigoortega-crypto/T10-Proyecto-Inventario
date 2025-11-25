import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AlertNotificationBar from '../../components/ui/AlertNotificationBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UserTable from './components/UserTable';
import UserCard from './components/UserCard';
import UserFilters from './components/UserFilters';
import UserModal from './components/UserModal';
import UserDetailsModal from './components/UserDetailsModal';
import BulkActionsBar from './components/BulkActionsBar';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    area: '',
    status: ''
  });
  const [viewMode, setViewMode] = useState('table');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState('create');
  const [alerts, setAlerts] = useState([]);

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@sigita.es",
      role: "administrator",
      area: "Administración",
      phone: "+34 600 123 456",
      status: "active",
      lastLogin: "2025-11-18T08:30:00",
      createdAt: "2025-01-15T10:00:00"
    },
    {
      id: 2,
      name: "María González",
      email: "maria.gonzalez@sigita.es",
      role: "manager",
      area: "Mecánica General",
      phone: "+34 600 234 567",
      status: "active",
      lastLogin: "2025-11-18T09:15:00",
      createdAt: "2025-02-20T14:30:00"
    },
    {
      id: 3,
      name: "José Martínez",
      email: "jose.martinez@sigita.es",
      role: "operator",
      area: "Electricidad",
      phone: "+34 600 345 678",
      status: "active",
      lastLogin: "2025-11-18T07:45:00",
      createdAt: "2025-03-10T09:15:00"
    },
    {
      id: 4,
      name: "Ana López",
      email: "ana.lopez@sigita.es",
      role: "manager",
      area: "Carrocería",
      phone: "+34 600 456 789",
      status: "active",
      lastLogin: "2025-11-17T16:20:00",
      createdAt: "2025-04-05T11:45:00"
    },
    {
      id: 5,
      name: "Pedro Sánchez",
      email: "pedro.sanchez@sigita.es",
      role: "operator",
      area: "Pintura",
      phone: "+34 600 567 890",
      status: "inactive",
      lastLogin: "2025-11-15T14:30:00",
      createdAt: "2025-05-12T08:20:00"
    },
    {
      id: 6,
      name: "Laura Fernández",
      email: "laura.fernandez@sigita.es",
      role: "operator",
      area: "Mecánica General",
      phone: "+34 600 678 901",
      status: "active",
      lastLogin: "2025-11-18T10:00:00",
      createdAt: "2025-06-18T13:10:00"
    },
    {
      id: 7,
      name: "Miguel Torres",
      email: "miguel.torres@sigita.es",
      role: "operator",
      area: "Electricidad",
      phone: "+34 600 789 012",
      status: "active",
      lastLogin: "2025-11-18T08:15:00",
      createdAt: "2025-07-22T15:30:00"
    },
    {
      id: 8,
      name: "Carmen Ruiz",
      email: "carmen.ruiz@sigita.es",
      role: "manager",
      area: "Administración",
      phone: "+34 600 890 123",
      status: "inactive",
      lastLogin: "2025-11-10T12:45:00",
      createdAt: "2025-08-14T10:25:00"
    }
  ];

  const mockAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Usuario inactivo detectado',
      message: 'El usuario Pedro Sánchez no ha iniciado sesión en los últimos 3 días.',
      timestamp: new Date(Date.now() - 300000),
      actionable: true,
      details: {
        userId: 5,
        lastLogin: '2025-11-15T14:30:00'
      }
    }
  ];

  useEffect(() => {
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
    setAlerts(mockAlerts);
  }, []);

  useEffect(() => {
    let filtered = users;

    if (filters?.search) {
      filtered = filtered?.filter(user =>
        user?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        user?.email?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.role) {
      filtered = filtered?.filter(user => user?.role === filters?.role);
    }

    if (filters?.area) {
      filtered = filtered?.filter(user => user?.area === filters?.area);
    }

    if (filters?.status) {
      filtered = filtered?.filter(user => user?.status === filters?.status);
    }

    setFilteredUsers(filtered);
  }, [users, filters]);

  const getUserCounts = () => {
    return {
      total: users?.length,
      active: users?.filter(u => u?.status === 'active')?.length,
      inactive: users?.filter(u => u?.status === 'inactive')?.length,
      administrators: users?.filter(u => u?.role === 'administrator')?.length,
      managers: users?.filter(u => u?.role === 'manager')?.length,
      operators: users?.filter(u => u?.role === 'operator')?.length
    };
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      role: '',
      area: '',
      status: ''
    });
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setModalMode('create');
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalMode('edit');
    setIsUserModalOpen(true);
  };

  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleToggleUserStatus = (user) => {
    const newStatus = user?.status === 'active' ? 'inactive' : 'active';
    setUsers(prev => prev?.map(u => 
      u?.id === user?.id ? { ...u, status: newStatus } : u
    ));
  };

  const handleSaveUser = (userData) => {
    if (modalMode === 'create') {
      setUsers(prev => [...prev, {
        ...userData,
        id: Date.now(),
        createdAt: new Date()?.toISOString(),
        lastLogin: null
      }]);
    } else {
      setUsers(prev => prev?.map(u => 
        u?.id === userData?.id ? { ...u, ...userData } : u
      ));
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev?.includes(userId) 
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers?.length === filteredUsers?.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers?.map(user => user?.id));
    }
  };

  const handleBulkAction = async (action) => {
    switch (action) {
      case 'activate':
        setUsers(prev => prev?.map(u => 
          selectedUsers?.includes(u?.id) ? { ...u, status: 'active' } : u
        ));
        break;
      case 'deactivate':
        setUsers(prev => prev?.map(u => 
          selectedUsers?.includes(u?.id) ? { ...u, status: 'inactive' } : u
        ));
        break;
      case 'change-role-operator':
        setUsers(prev => prev?.map(u => 
          selectedUsers?.includes(u?.id) ? { ...u, role: 'operator' } : u
        ));
        break;
      case 'change-role-manager':
        setUsers(prev => prev?.map(u => 
          selectedUsers?.includes(u?.id) ? { ...u, role: 'manager' } : u
        ));
        break;
      case 'change-role-admin':
        setUsers(prev => prev?.map(u => 
          selectedUsers?.includes(u?.id) ? { ...u, role: 'administrator' } : u
        ));
        break;
      case 'export':
        console.log('Exporting users:', selectedUsers);
        break;
    }
    setSelectedUsers([]);
  };

  const handleClearSelection = () => {
    setSelectedUsers([]);
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const handleViewAlertDetails = (alert) => {
    if (alert?.details?.userId) {
      const user = users?.find(u => u?.id === alert?.details?.userId);
      if (user) {
        handleViewUserDetails(user);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="administrator" 
        userName="Carlos Rodríguez"
        onLogout={() => console.log('Logout clicked')}
      />
      <AlertNotificationBar 
        alerts={alerts}
        onDismiss={handleDismissAlert}
        onViewDetails={handleViewAlertDetails}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <Breadcrumb />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Gestión de Usuarios</h1>
              <p className="text-muted-foreground mt-1">
                Administra usuarios, roles y permisos del sistema
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  iconName="Table"
                  iconSize={16}
                />
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  iconName="Grid3X3"
                  iconSize={16}
                />
              </div>
              
              <Button
                variant="default"
                onClick={handleCreateUser}
                iconName="UserPlus"
                iconPosition="left"
                iconSize={16}
              >
                Agregar Usuario
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <UserFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              userCounts={getUserCounts()}
            />

            {viewMode === 'table' ? (
              <UserTable
                users={filteredUsers}
                onEdit={handleEditUser}
                onToggleStatus={handleToggleUserStatus}
                onViewDetails={handleViewUserDetails}
                selectedUsers={selectedUsers}
                onSelectUser={handleSelectUser}
                onSelectAll={handleSelectAll}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredUsers?.map((user) => (
                  <UserCard
                    key={user?.id}
                    user={user}
                    onEdit={handleEditUser}
                    onToggleStatus={handleToggleUserStatus}
                    onViewDetails={handleViewUserDetails}
                  />
                ))}
              </div>
            )}

            {filteredUsers?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron usuarios</h3>
                <p className="text-muted-foreground mb-4">
                  {filters?.search || filters?.role || filters?.area || filters?.status
                    ? 'Intenta ajustar los filtros de búsqueda' :'Comienza agregando tu primer usuario al sistema'
                  }
                </p>
                {!filters?.search && !filters?.role && !filters?.area && !filters?.status && (
                  <Button
                    variant="default"
                    onClick={handleCreateUser}
                    iconName="UserPlus"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Agregar Primer Usuario
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <BulkActionsBar
        selectedCount={selectedUsers?.length}
        onBulkAction={handleBulkAction}
        onClearSelection={handleClearSelection}
      />
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
        mode={modalMode}
      />
      <UserDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default UserManagement;