import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'operator', userName = 'Usuario', onLogout }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: 'LayoutDashboard',
      permissions: ['operator', 'manager', 'administrator']
    },
    { 
      label: 'Inventario', 
      path: '/inventory-management', 
      icon: 'Package',
      permissions: ['operator', 'manager', 'administrator']
    },
    { 
      label: 'Movimientos', 
      path: '/stock-movements', 
      icon: 'ArrowUpDown',
      permissions: ['manager', 'administrator']
    },
    { 
      label: 'Proveedores', 
      path: '/supplier-management', 
      icon: 'Truck',
      permissions: ['manager', 'administrator']
    },
    { 
      label: 'Reportes', 
      path: '/reports-analytics', 
      icon: 'BarChart3',
      permissions: ['manager', 'administrator']
    }
  ];

  const adminItems = [
    { 
      label: 'Usuarios', 
      path: '/user-management', 
      icon: 'Users',
      permissions: ['administrator']
    }
  ];

  const filteredNavItems = navigationItems?.filter(item => 
    item?.permissions?.includes(userRole)
  );

  const filteredAdminItems = adminItems?.filter(item => 
    item?.permissions?.includes(userRole)
  );

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  const getRoleBadgeColor = (role) => {
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
        return 'Admin';
      case 'manager':
        return 'Gerente';
      default:
        return 'Operador';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-border shadow-card">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Wrench" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-text-primary">Sigita</h1>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {filteredNavItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <Button
                key={item?.path}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                className="transition-hover"
              >
                {item?.label}
              </Button>
            );
          })}
          
          {/* More Menu for Admin Functions */}
          {filteredAdminItems?.length > 0 && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
                iconSize={16}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                Más
              </Button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-modal glass-morphism animate-fade-in z-1200">
                  <div className="py-1">
                    {filteredAdminItems?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => handleNavigation(item?.path)}
                        className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-hover flex items-center space-x-2"
                      >
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            iconName="Menu"
            iconSize={20}
          />

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted transition-hover"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-text-primary">{userName}</div>
                <div className={`text-xs px-2 py-0.5 rounded-full inline-block ${getRoleBadgeColor(userRole)}`}>
                  {getRoleLabel(userRole)}
                </div>
              </div>
              <Icon name="ChevronDown" size={16} className="text-text-secondary" />
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-modal glass-morphism animate-fade-in z-1200">
                <div className="py-1">
                  <div className="px-3 py-2 border-b border-border">
                    <div className="text-sm font-medium text-popover-foreground">{userName}</div>
                    <div className="text-xs text-muted-foreground">{getRoleLabel(userRole)}</div>
                  </div>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      // Handle profile navigation
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-hover flex items-center space-x-2"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Configuración</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left text-sm text-destructive hover:bg-muted transition-hover flex items-center space-x-2"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-border shadow-modal">
          <nav className="px-4 py-2 space-y-1">
            {filteredNavItems?.map((item) => {
              const isActive = location?.pathname === item?.path;
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-hover ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </button>
              );
            })}
            
            {filteredAdminItems?.map((item) => {
              const isActive = location?.pathname === item?.path;
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-hover ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;