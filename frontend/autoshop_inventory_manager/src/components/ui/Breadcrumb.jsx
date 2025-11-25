import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Breadcrumb = ({ customItems = null, className = "" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeLabels = {
    '/dashboard': 'Dashboard',
    '/inventory-management': 'Gestión de Inventario',
    '/stock-movements': 'Movimientos de Stock',
    '/user-management': 'Gestión de Usuarios',
    '/supplier-management': 'Gestión de Proveedores',
    '/reports-analytics': 'Reportes y Análisis'
  };

  const generateBreadcrumbItems = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const items = [{ label: 'Inicio', path: '/dashboard', icon: 'Home' }];

    let currentPath = '';
    pathSegments?.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = routeLabels?.[currentPath] || segment?.charAt(0)?.toUpperCase() + segment?.slice(1);
      
      if (currentPath !== '/dashboard') {
        items?.push({
          label,
          path: currentPath,
          icon: getIconForPath(currentPath)
        });
      }
    });

    return items;
  };

  const getIconForPath = (path) => {
    const iconMap = {
      '/dashboard': 'LayoutDashboard',
      '/inventory-management': 'Package',
      '/stock-movements': 'ArrowUpDown',
      '/user-management': 'Users',
      '/supplier-management': 'Truck',
      '/reports-analytics': 'BarChart3'
    };
    return iconMap?.[path] || 'ChevronRight';
  };

  const breadcrumbItems = generateBreadcrumbItems();

  const handleNavigation = (path) => {
    if (path && path !== location?.pathname) {
      navigate(path);
    }
  };

  if (breadcrumbItems?.length <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <div className="flex items-center space-x-1 overflow-x-auto">
        {breadcrumbItems?.map((item, index) => {
          const isLast = index === breadcrumbItems?.length - 1;
          const isClickable = item?.path && !isLast;

          return (
            <div key={item?.path || index} className="flex items-center space-x-1 flex-shrink-0">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="text-muted-foreground flex-shrink-0" 
                />
              )}
              {isClickable ? (
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleNavigation(item?.path)}
                  className="h-auto p-1 text-primary hover:text-primary-foreground hover:bg-primary transition-hover"
                >
                  <div className="flex items-center space-x-1">
                    {item?.icon && index === 0 && (
                      <Icon name={item?.icon} size={14} />
                    )}
                    <span className="truncate max-w-32 sm:max-w-none">{item?.label}</span>
                  </div>
                </Button>
              ) : (
                <div className="flex items-center space-x-1 px-1">
                  {item?.icon && index === 0 && (
                    <Icon name={item?.icon} size={14} className="text-muted-foreground" />
                  )}
                  <span 
                    className={`truncate max-w-32 sm:max-w-none ${
                      isLast ? 'text-foreground font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    {item?.label}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Mobile: Show only current page */}
      <div className="sm:hidden flex items-center space-x-2 ml-auto">
        <Button
          variant="ghost"
          size="xs"
          onClick={() => window.history?.back()}
          iconName="ArrowLeft"
          iconSize={14}
          className="flex-shrink-0"
        >
          Atrás
        </Button>
      </div>
    </nav>
  );
};

export default Breadcrumb;