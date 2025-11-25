import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AlertNotificationBar from '../../components/ui/AlertNotificationBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SupplierCard from './components/SupplierCard';
import SupplierTable from './components/SupplierTable';
import SupplierFilters from './components/SupplierFilters';
import SupplierModal from './components/SupplierModal';
import SupplierDetailModal from './components/SupplierDetailModal';
import PerformanceDashboard from './components/PerformanceDashboard';

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [showDashboard, setShowDashboard] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    rating: '',
    location: ''
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Proveedor con Retraso',
      message: 'AutoParts Santiago tiene 3 pedidos con retrasos superiores a 5 días.',
      timestamp: new Date(Date.now() - 300000),
      actionable: true,
      details: {
        supplierId: 1,
        delayedOrders: 3
      }
    },
    {
      id: 2,
      type: 'info',
      title: 'Nuevo Proveedor Registrado',
      message: 'Repuestos Valparaíso se ha registrado exitosamente en el sistema.',
      timestamp: new Date(Date.now() - 600000),
      actionable: false
    }
  ]);

  // Mock data for suppliers
  const mockSuppliers = [
    {
      id: 1,
      name: "AutoParts Santiago",
      category: "Repuestos de Motor",
      email: "contacto@autoparts-santiago.cl",
      phone: "+56 2 2123 4567",
      location: "Santiago",
      contactPerson: "Carlos Rodríguez",
      address: "Av. Vicuña Mackenna 4860, Santiago",
      paymentTerms: "30",
      notes: "Proveedor principal para repuestos de motor. Excelente calidad y servicio.",
      status: "active",
      rating: 4.5,
      activeOrders: 12,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-11-15T14:30:00Z"
    },
    {
      id: 2,
      name: "Frenos Profesionales Ltda.",
      category: "Sistema de Frenos",
      email: "ventas@frenos-pro.cl",
      phone: "+56 32 234 5678",
      location: "Valparaíso",
      contactPerson: "María González",
      address: "Av. Argentina 2135, Valparaíso",
      paymentTerms: "60",
      notes: "Especialistas en sistemas de frenado. Certificación ISO 9001.",
      status: "active",
      rating: 4.8,
      activeOrders: 8,
      createdAt: "2024-02-20T09:15:00Z",
      updatedAt: "2024-11-16T11:20:00Z"
    },
    {
      id: 3,
      name: "Suspensión Total ChileAuto",
      category: "Suspensión",
      email: "info@suspension-total.cl",
      phone: "+56 33 345 6789",
      location: "Viña del Mar",
      contactPerson: "Antonio Martín",
      address: "Calle Libertad 1250, Viña del Mar",
      paymentTerms: "30",
      notes: "Amplio catálogo de amortiguadores y componentes de suspensión.",
      status: "active",
      rating: 4.2,
      activeOrders: 15,
      createdAt: "2024-03-10T16:45:00Z",
      updatedAt: "2024-11-14T09:10:00Z"
    },
    {
      id: 4,
      name: "ElectroAuto Concepción",
      category: "Sistema Eléctrico",
      email: "pedidos@electroauto-concepcion.cl",
      phone: "+56 41 456 7890",
      location: "Concepción",
      contactPerson: "Isabel Fernández",
      address: "Av. O'Higgins 1420, Concepción",
      paymentTerms: "45",
      notes: "Especialistas en componentes eléctricos y electrónicos automotrices.",
      status: "active",
      rating: 4.6,
      activeOrders: 6,
      createdAt: "2024-04-05T12:30:00Z",
      updatedAt: "2024-11-17T15:45:00Z"
    },
    {
      id: 5,
      name: "Carrocería Express La Serena",
      category: "Carrocería",
      email: "contacto@carroceria-express.cl",
      phone: "+56 51 567 8901",
      location: "La Serena",
      contactPerson: "Javier López",
      address: "Ruta 5 Norte Km 470, La Serena",
      paymentTerms: "30",
      notes: "Proveedor de paneles, faros y accesorios de carrocería.",
      status: "pending",
      rating: 3.9,
      activeOrders: 4,
      createdAt: "2024-05-12T08:20:00Z",
      updatedAt: "2024-11-12T13:15:00Z"
    },
    {
      id: 6,
      name: "Neumáticos del Sur",
      category: "Neumáticos",
      email: "ventas@neumaticos-sur.cl",
      phone: "+56 45 678 9012",
      location: "Temuco",
      contactPerson: "Carmen Ruiz",
      address: "Av. Alemania 0281, Temuco",
      paymentTerms: "60",
      notes: "Distribuidor oficial de las principales marcas de neumáticos.",
      status: "active",
      rating: 4.4,
      activeOrders: 9,
      createdAt: "2024-06-18T14:10:00Z",
      updatedAt: "2024-11-16T10:30:00Z"
    },
    {
      id: 7,
      name: "Lubricantes Premium Antofagasta",
      category: "Lubricantes",
      email: "info@lubricantes-premium.cl",
      phone: "+56 55 789 0123",
      location: "Antofagasta",
      contactPerson: "Roberto Sánchez",
      address: "Av. Grecia 1000, Antofagasta",
      paymentTerms: "30",
      notes: "Aceites y lubricantes de alta calidad para todo tipo de vehículos.",
      status: "inactive",
      rating: 3.7,
      activeOrders: 0,
      createdAt: "2024-07-22T11:40:00Z",
      updatedAt: "2024-10-30T16:20:00Z"
    },
    {
      id: 8,
      name: "Herramientas Profesionales Iquique",
      category: "Herramientas",
      email: "pedidos@herramientas-pro.cl",
      phone: "+56 57 890 1234",
      location: "Iquique",
      contactPerson: "Elena Torres",
      address: "Av. Arturo Prat 1789, Iquique",
      paymentTerms: "45",
      notes: "Herramientas especializadas y equipos de diagnóstico automotriz.",
      status: "active",
      rating: 4.7,
      activeOrders: 7,
      createdAt: "2024-08-15T09:25:00Z",
      updatedAt: "2024-11-15T12:50:00Z"
    }
  ];

  useEffect(() => {
    setSuppliers(mockSuppliers);
    setFilteredSuppliers(mockSuppliers);
  }, []);

  useEffect(() => {
    let filtered = [...suppliers];

    // Apply search filter
    if (filters?.search) {
      filtered = filtered?.filter(supplier =>
        supplier?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        supplier?.email?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        supplier?.contactPerson?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    // Apply category filter
    if (filters?.category) {
      filtered = filtered?.filter(supplier => supplier?.category === filters?.category);
    }

    // Apply status filter
    if (filters?.status) {
      filtered = filtered?.filter(supplier => supplier?.status === filters?.status);
    }

    // Apply rating filter
    if (filters?.rating) {
      const minRating = parseFloat(filters?.rating);
      filtered = filtered?.filter(supplier => supplier?.rating >= minRating);
    }

    // Apply location filter
    if (filters?.location) {
      filtered = filtered?.filter(supplier => supplier?.location?.toLowerCase() === filters?.location);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortConfig?.direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredSuppliers(filtered);
  }, [suppliers, filters, sortConfig]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: '',
      rating: '',
      location: ''
    });
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    setModalMode('add');
    setIsSupplierModalOpen(true);
  };

  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setModalMode('edit');
    setIsSupplierModalOpen(true);
  };

  const handleViewDetails = (supplier) => {
    setSelectedSupplier(supplier);
    setIsDetailModalOpen(true);
  };

  const handleContactSupplier = (supplier) => {
    // Mock contact functionality
    alert(`Contactando a ${supplier?.name} (${supplier?.email})`);
  };

  const handleSaveSupplier = async (supplierData) => {
    if (modalMode === 'add') {
      setSuppliers(prev => [...prev, supplierData]);
    } else {
      setSuppliers(prev => prev?.map(s => s?.id === supplierData?.id ? supplierData : s));
    }
  };

  const handleExport = () => {
    // Mock export functionality
    const csvContent = "data:text/csv;charset=utf-8," + "Nombre,Categoría,Email,Teléfono,Ubicación,Estado,Calificación\n" +
      filteredSuppliers?.map(s => 
        `${s?.name},${s?.category},${s?.email},${s?.phone},${s?.location},${s?.status},${s?.rating}`
      )?.join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link?.setAttribute("href", encodedUri);
    link?.setAttribute("download", "proveedores.csv");
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const handleViewAlertDetails = (alert) => {
    if (alert?.details?.supplierId) {
      const supplier = suppliers?.find(s => s?.id === alert?.details?.supplierId);
      if (supplier) {
        handleViewDetails(supplier);
      }
    }
  };

  const handleLogout = () => {
    // Mock logout functionality
    console.log('Logout clicked');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="manager" userName="Ana García" onLogout={handleLogout} />
      <AlertNotificationBar 
        alerts={alerts}
        onDismiss={handleDismissAlert}
        onViewDetails={handleViewAlertDetails}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-6">
            <Breadcrumb />
            <div className="flex items-center justify-between mt-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Gestión de Proveedores</h1>
                <p className="text-muted-foreground mt-1">
                  Administra proveedores, contratos y rendimiento de suministros
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDashboard(!showDashboard)}
                  iconName={showDashboard ? "List" : "BarChart3"}
                  iconPosition="left"
                  iconSize={16}
                >
                  {showDashboard ? 'Ver Lista' : 'Dashboard'}
                </Button>
                <Button
                  variant="default"
                  onClick={handleAddSupplier}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Agregar Proveedor
                </Button>
              </div>
            </div>
          </div>

          {showDashboard ? (
            <PerformanceDashboard suppliers={suppliers} />
          ) : (
            <>
              {/* Filters */}
              <SupplierFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                onExport={handleExport}
                resultsCount={filteredSuppliers?.length}
              />

              {/* View Mode Toggle */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Vista:</span>
                  <div className="flex bg-muted rounded-lg p-1">
                    <Button
                      variant={viewMode === 'table' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                      iconName="List"
                      iconSize={16}
                    >
                      Tabla
                    </Button>
                    <Button
                      variant={viewMode === 'cards' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('cards')}
                      iconName="Grid3X3"
                      iconSize={16}
                    >
                      Tarjetas
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Mostrando {filteredSuppliers?.length} de {suppliers?.length} proveedores
                </div>
              </div>

              {/* Content */}
              {filteredSuppliers?.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron proveedores</h3>
                  <p className="text-muted-foreground mb-4">
                    No hay proveedores que coincidan con los filtros aplicados.
                  </p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Limpiar Filtros
                  </Button>
                </div>
              ) : viewMode === 'table' ? (
                <SupplierTable
                  suppliers={filteredSuppliers}
                  onEdit={handleEditSupplier}
                  onViewDetails={handleViewDetails}
                  onContact={handleContactSupplier}
                  onSort={handleSort}
                  sortConfig={sortConfig}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredSuppliers?.map((supplier) => (
                    <SupplierCard
                      key={supplier?.id}
                      supplier={supplier}
                      onEdit={handleEditSupplier}
                      onViewDetails={handleViewDetails}
                      onContact={handleContactSupplier}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      {/* Modals */}
      <SupplierModal
        isOpen={isSupplierModalOpen}
        onClose={() => setIsSupplierModalOpen(false)}
        supplier={selectedSupplier}
        onSave={handleSaveSupplier}
        mode={modalMode}
      />
      <SupplierDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        supplier={selectedSupplier}
        onEdit={handleEditSupplier}
        onContact={handleContactSupplier}
      />
    </div>
  );
};

export default SupplierManagement;