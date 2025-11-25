import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import AlertNotificationBar from '../../components/ui/AlertNotificationBar';
import Breadcrumb from '../../components/ui/Breadcrumb';

import Button from '../../components/ui/Button';
import InventoryFilters from './components/InventoryFilters';
import InventoryTable from './components/InventoryTable';
import BulkActionsBar from './components/BulkActionsBar';
import ItemDetailsModal from './components/ItemDetailsModal';
import StockAdjustmentModal from './components/StockAdjustmentModal';

const InventoryManagement = () => {
  const [userRole] = useState('manager'); // This would come from auth context
  const [userName] = useState('Carlos Mendoza');

  // Mock inventory data
  const [inventoryItems] = useState([
    {
      id: 'inv-001',
      partNumber: 'BRK-001-2024',
      description: 'Pastillas de freno delanteras',
      brand: 'Bosch',
      category: 'Frenos',
      supplier: 'Bosch España',
      currentStock: 15,
      minimumStock: 10,
      maximumStock: 50,
      unitPrice: 45.99,
      location: 'A-1-3',
      lastUpdated: '2024-11-17T10:30:00Z',
      notes: 'Compatible con modelos 2018-2024'
    },
    {
      id: 'inv-002',
      partNumber: 'ENG-045-2024',
      description: 'Filtro de aceite motor',
      brand: 'Mann+Hummel',
      category: 'Motor',
      supplier: 'Mann+Hummel',
      currentStock: 3,
      minimumStock: 8,
      maximumStock: 40,
      unitPrice: 12.50,
      location: 'B-2-1',
      lastUpdated: '2024-11-16T14:20:00Z',
      notes: 'Para motores diésel y gasolina'
    },
    {
      id: 'inv-003',
      partNumber: 'ELEC-089-2024',
      description: 'Batería 12V 70Ah',
      brand: 'Varta',
      category: 'Eléctrico',
      supplier: 'Valeo Service',
      currentStock: 0,
      minimumStock: 5,
      maximumStock: 20,
      unitPrice: 89.99,
      location: 'C-1-2',
      lastUpdated: '2024-11-15T09:15:00Z',
      notes: 'Batería de arranque para vehículos ligeros'
    },
    {
      id: 'inv-004',
      partNumber: 'SUSP-012-2024',
      description: 'Amortiguador trasero',
      brand: 'Sachs',
      category: 'Suspensión',
      supplier: 'Sachs Performance',
      currentStock: 8,
      minimumStock: 4,
      maximumStock: 25,
      unitPrice: 125.00,
      location: 'D-3-1',
      lastUpdated: '2024-11-17T16:45:00Z',
      notes: 'Amortiguador hidráulico premium'
    },
    {
      id: 'inv-005',
      partNumber: 'COOL-034-2024',
      description: 'Radiador de refrigeración',
      brand: 'Mahle',
      category: 'Refrigeración',
      supplier: 'Mahle Original',
      currentStock: 2,
      minimumStock: 3,
      maximumStock: 15,
      unitPrice: 189.50,
      location: 'E-1-4',
      lastUpdated: '2024-11-14T11:30:00Z',
      notes: 'Radiador de aluminio con tanques de plástico'
    },
    {
      id: 'inv-006',
      partNumber: 'TRANS-067-2024',
      description: 'Kit de embrague completo',
      brand: 'Valeo',
      category: 'Transmisión',
      supplier: 'Valeo Service',
      currentStock: 6,
      minimumStock: 2,
      maximumStock: 12,
      unitPrice: 245.75,
      location: 'F-2-3',
      lastUpdated: '2024-11-17T08:20:00Z',
      notes: 'Incluye disco, plato y cojinete'
    },
    {
      id: 'inv-007',
      partNumber: 'FILT-098-2024',
      description: 'Filtro de aire motor',
      brand: 'Mann+Hummel',
      category: 'Filtros',
      supplier: 'Mann+Hummel',
      currentStock: 25,
      minimumStock: 15,
      maximumStock: 60,
      unitPrice: 18.90,
      location: 'B-1-2',
      lastUpdated: '2024-11-16T13:10:00Z',
      notes: 'Filtro de papel plisado de alta eficiencia'
    },
    {
      id: 'inv-008',
      partNumber: 'OIL-156-2024',
      description: 'Aceite motor 5W-30 sintético',
      brand: 'Castrol',
      category: 'Aceites y Lubricantes',
      supplier: 'Gates Corporation',
      currentStock: 45,
      minimumStock: 20,
      maximumStock: 100,
      unitPrice: 35.60,
      location: 'G-1-1',
      lastUpdated: '2024-11-17T15:25:00Z',
      notes: 'Aceite sintético para motores modernos'
    }
  ]);

  // State management
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    supplier: '',
    stockStatus: '',
    dateFrom: '',
    dateTo: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Modal states
  const [itemDetailsModal, setItemDetailsModal] = useState({ isOpen: false, item: null, mode: 'view' });
  const [stockAdjustmentModal, setStockAdjustmentModal] = useState({ isOpen: false, item: null });

  // Generate alerts based on inventory data
  const alerts = useMemo(() => {
    const alertList = [];
    
    inventoryItems?.forEach(item => {
      if (item?.currentStock === 0) {
        alertList?.push({
          id: `out-of-stock-${item?.id}`,
          type: 'critical',
          title: 'Artículo sin stock',
          message: `${item?.description} está agotado`,
          timestamp: new Date(),
          actionable: true,
          details: {
            itemCode: item?.partNumber,
            currentStock: item?.currentStock,
            minStock: item?.minimumStock
          }
        });
      } else if (item?.currentStock <= item?.minimumStock) {
        alertList?.push({
          id: `low-stock-${item?.id}`,
          type: 'warning',
          title: 'Stock bajo',
          message: `${item?.description} tiene stock bajo`,
          timestamp: new Date(),
          actionable: true,
          details: {
            itemCode: item?.partNumber,
            currentStock: item?.currentStock,
            minStock: item?.minimumStock
          }
        });
      }
    });

    return alertList;
  }, [inventoryItems]);

  // Filter and sort inventory items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = inventoryItems?.filter(item => {
      const matchesSearch = !filters?.search || 
        item?.partNumber?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        item?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        item?.supplier?.toLowerCase()?.includes(filters?.search?.toLowerCase());

      const matchesCategory = !filters?.category || item?.category?.toLowerCase() === filters?.category;
      const matchesSupplier = !filters?.supplier || item?.supplier?.toLowerCase()?.includes(filters?.supplier);
      
      const matchesStockStatus = !filters?.stockStatus || (() => {
        switch (filters?.stockStatus) {
          case 'in_stock':
            return item?.currentStock > item?.minimumStock;
          case 'low_stock':
            return item?.currentStock > 0 && item?.currentStock <= item?.minimumStock;
          case 'out_of_stock':
            return item?.currentStock === 0;
          case 'overstock':
            return item?.currentStock > (item?.maximumStock || item?.minimumStock * 3);
          default:
            return true;
        }
      })();

      return matchesSearch && matchesCategory && matchesSupplier && matchesStockStatus;
    });

    // Apply sorting
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (typeof aValue === 'string') {
          aValue = aValue?.toLowerCase();
          bValue = bValue?.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [inventoryItems, filters, sortConfig]);

  // Pagination
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedItems?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedItems?.length / itemsPerPage);

  // Event handlers
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      supplier: '',
      stockStatus: '',
      dateFrom: '',
      dateTo: ''
    });
    setCurrentPage(1);
  };

  const handleSort = (newSortConfig) => {
    setSortConfig(newSortConfig);
  };

  const handleItemSelect = (newSelectedItems) => {
    setSelectedItems(newSelectedItems);
  };

  const handleBulkSelect = (itemIds) => {
    setSelectedItems(itemIds);
  };

  const handleClearSelection = () => {
    setSelectedItems([]);
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'Items:', selectedItems);
    // Implement bulk action logic here
    setSelectedItems([]);
  };

  const handleItemView = (item) => {
    setItemDetailsModal({ isOpen: true, item, mode: 'view' });
  };

  const handleItemEdit = (item) => {
    setItemDetailsModal({ isOpen: true, item, mode: 'edit' });
  };

  const handleStockAdjust = (item) => {
    setStockAdjustmentModal({ isOpen: true, item });
  };

  const handleAddNewItem = () => {
    setItemDetailsModal({ isOpen: true, item: null, mode: 'create' });
  };

  const handleItemSave = async (itemData) => {
    console.log('Saving item:', itemData);
    // Implement save logic here
  };

  const handleStockAdjustmentSave = async (adjustmentData) => {
    console.log('Saving stock adjustment:', adjustmentData);
    // Implement stock adjustment logic here
  };

  const handleAlertDismiss = (alertId) => {
    console.log('Dismissing alert:', alertId);
  };

  const handleAlertViewDetails = (alert) => {
    // Find the item related to this alert and open its details
    const item = inventoryItems?.find(item => 
      alert?.details?.itemCode === item?.partNumber
    );
    if (item) {
      handleItemView(item);
    }
  };

  // Add this handler for logout
  const handleLogout = () => {
    console.log('Logging out...');
    // Implement logout logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole} 
        userName={userName}
        onLogout={handleLogout}
      />
      <AlertNotificationBar 
        alerts={alerts}
        onDismiss={handleAlertDismiss}
        onViewDetails={handleAlertViewDetails}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <Breadcrumb />
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Gestión de Inventario</h1>
                <p className="mt-2 text-text-secondary">
                  Administra el inventario de repuestos y componentes automotrices
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  iconSize={16}
                >
                  Exportar
                </Button>
                <Button
                  variant="default"
                  onClick={handleAddNewItem}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Agregar Artículo
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <InventoryFilters
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              totalItems={inventoryItems?.length}
              filteredItems={filteredAndSortedItems?.length}
            />
          </div>

          {/* Inventory Table */}
          <div className="mb-6">
            <InventoryTable
              items={paginatedItems}
              onItemSelect={handleItemSelect}
              onBulkSelect={handleBulkSelect}
              selectedItems={selectedItems}
              onSort={handleSort}
              sortConfig={sortConfig}
              onItemEdit={handleItemEdit}
              onItemView={handleItemView}
              onStockAdjust={handleStockAdjust}
            />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-text-secondary">
                Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredAndSortedItems?.length)} de {filteredAndSortedItems?.length} artículos
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  iconName="ChevronLeft"
                  iconSize={16}
                >
                  Anterior
                </Button>
                <span className="px-3 py-1 text-sm text-text-primary">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  iconName="ChevronRight"
                  iconSize={16}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedItems?.length}
        onBulkAction={handleBulkAction}
        onClearSelection={handleClearSelection}
        isVisible={selectedItems?.length > 0}
      />
      {/* Modals */}
      <ItemDetailsModal
        item={itemDetailsModal?.item}
        isOpen={itemDetailsModal?.isOpen}
        mode={itemDetailsModal?.mode}
        onClose={() => setItemDetailsModal({ isOpen: false, item: null, mode: 'view' })}
        onSave={handleItemSave}
      />
      <StockAdjustmentModal
        item={stockAdjustmentModal?.item}
        isOpen={stockAdjustmentModal?.isOpen}
        onClose={() => setStockAdjustmentModal({ isOpen: false, item: null })}
        onSave={handleStockAdjustmentSave}
      />
    </div>
  );
};

export default InventoryManagement;