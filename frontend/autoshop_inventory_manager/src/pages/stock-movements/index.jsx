import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AlertNotificationBar from '../../components/ui/AlertNotificationBar';
import MovementFilters from './components/MovementFilters';
import MovementTable from './components/MovementTable';
import MovementDetailsModal from './components/MovementDetailsModal';
import ExportModal from './components/ExportModal';
import MovementStats from './components/MovementStats';
import Button from '../../components/ui/Button';


const StockMovements = () => {
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);

  // Mock data for stock movements
  const mockMovements = [
    {
      id: 1,
      timestamp: new Date('2024-11-18T09:15:00'),
      partNumber: 'BRK-001-FR',
      description: 'Pastillas de freno delanteras Bosch',
      type: 'in',
      quantity: 12,
      stockBefore: 8,
      stockAfter: 20,
      user: 'Carlos Martínez',
      userRole: 'Gerente de Área',
      reference: 'PO-2024-1156',
      category: 'Frenos',
      supplier: 'Bosch España',
      area: 'Almacén Principal',
      justification: 'Reposición de stock por pedido programado. Nivel mínimo alcanzado según alertas del sistema.',
      approvedBy: 'Ana Rodríguez',
      approvalDate: new Date('2024-11-18T08:30:00'),
      documents: [
        { name: 'Factura_Bosch_1156.pdf', type: 'Factura' },
        { name: 'Albarán_Entrega.pdf', type: 'Albarán' }
      ]
    },
    {
      id: 2,
      timestamp: new Date('2024-11-18T10:30:00'),
      partNumber: 'ENG-045-OIL',
      description: 'Aceite motor 5W-30 Castrol GTX',
      type: 'out',
      quantity: 4,
      stockBefore: 24,
      stockAfter: 20,
      user: 'Miguel López',
      userRole: 'Operador Mecánico',
      reference: 'WO-2024-0892',
      category: 'Aceites',
      supplier: 'Castrol Ibérica',
      area: 'Taller 1',
      justification: 'Cambio de aceite en vehículo Ford Focus. Orden de trabajo 892 - Mantenimiento preventivo.',
      documents: [
        { name: 'Orden_Trabajo_892.pdf', type: 'Orden de Trabajo' }
      ]
    },
    {
      id: 3,
      timestamp: new Date('2024-11-18T11:45:00'),
      partNumber: 'SUS-012-SHK',
      description: 'Amortiguador trasero Sachs',
      type: 'adjustment',
      quantity: -2,
      stockBefore: 6,
      stockAfter: 4,
      user: 'Sofía García',
      userRole: 'Administrador',
      reference: 'ADJ-2024-0034',
      category: 'Suspensión',
      supplier: 'Sachs Performance',
      area: 'Almacén Principal',
      justification: 'Ajuste por inventario físico. Detectadas 2 unidades dañadas durante inspección de calidad.',
      approvedBy: 'Ana Rodríguez',
      approvalDate: new Date('2024-11-18T11:40:00')
    },
    {
      id: 4,
      timestamp: new Date('2024-11-17T16:20:00'),
      partNumber: 'ELC-078-BAT',
      description: 'Batería 12V 70Ah Varta Blue',
      type: 'out',
      quantity: 1,
      stockBefore: 5,
      stockAfter: 4,
      user: 'Carlos Martínez',
      userRole: 'Gerente de Área',
      reference: 'WO-2024-0889',
      category: 'Eléctrico',
      supplier: 'Varta Automotive',
      area: 'Taller 2',
      justification: 'Sustitución de batería defectuosa en vehículo Seat León. Cliente reportó problemas de arranque.',
      documents: [
        { name: 'Orden_Trabajo_889.pdf', type: 'Orden de Trabajo' },
        { name: 'Garantía_Batería.pdf', type: 'Garantía' }
      ]
    },
    {
      id: 5,
      timestamp: new Date('2024-11-17T14:10:00'),
      partNumber: 'FIL-023-AIR',
      description: 'Filtro de aire Mann Filter',
      type: 'in',
      quantity: 20,
      stockBefore: 3,
      stockAfter: 23,
      user: 'Miguel López',
      userRole: 'Operador Mecánico',
      reference: 'PO-2024-1152',
      category: 'Motor',
      supplier: 'Mann+Hummel',
      area: 'Almacén Principal',
      justification: 'Pedido de reposición urgente. Stock crítico detectado por sistema de alertas.',
      approvedBy: 'Carlos Martínez',
      approvalDate: new Date('2024-11-17T13:45:00')
    },
    {
      id: 6,
      timestamp: new Date('2024-11-17T12:30:00'),
      partNumber: 'BDY-156-PNT',
      description: 'Pintura base agua Negro Metalizado',
      type: 'out',
      quantity: 2,
      stockBefore: 8,
      stockAfter: 6,
      user: 'Sofía García',
      userRole: 'Administrador',
      reference: 'WO-2024-0885',
      category: 'Carrocería',
      supplier: 'PPG Ibérica',
      area: 'Taller Chapa',
      justification: 'Reparación de carrocería BMW Serie 3. Trabajo de chapa y pintura por siniestro.',
      documents: [
        { name: 'Orden_Trabajo_885.pdf', type: 'Orden de Trabajo' },
        { name: 'Peritaje_Seguro.pdf', type: 'Peritaje' }
      ]
    }
  ];

  // Mock alerts
  const mockAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Stock bajo detectado',
      message: 'El filtro de aceite FIL-001-OIL tiene solo 2 unidades en stock',
      timestamp: new Date(),
      actionable: true,
      details: {
        itemCode: 'FIL-001-OIL',
        currentStock: 2,
        minStock: 5
      }
    }
  ];

  // Mock stats
  const mockStats = {
    todayMovements: 3,
    totalIn: 32,
    totalOut: 28,
    totalAdjustments: 2,
    todayChange: 15,
    inChange: 8,
    outChange: -5,
    adjustmentChange: 0
  };

  // Filter and sort movements
  const filteredAndSortedMovements = useMemo(() => {
    let filtered = mockMovements?.filter(movement => {
      if (filters?.dateFrom && new Date(movement.timestamp) < new Date(filters.dateFrom)) return false;
      if (filters?.dateTo && new Date(movement.timestamp) > new Date(filters.dateTo + 'T23:59:59')) return false;
      if (filters?.movementType && movement?.type !== filters?.movementType) return false;
      if (filters?.user && movement?.user?.toLowerCase()?.indexOf(filters?.user?.toLowerCase()) === -1) return false;
      if (filters?.category && movement?.category !== filters?.category) return false;
      if (filters?.supplier && movement?.supplier !== filters?.supplier) return false;
      if (filters?.partNumber && movement?.partNumber?.toLowerCase()?.indexOf(filters?.partNumber?.toLowerCase()) === -1) return false;
      return true;
    });

    // Sort
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'timestamp') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedMovements?.length / itemsPerPage);
  const paginatedMovements = filteredAndSortedMovements?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleViewDetails = (movement) => {
    setSelectedMovement(movement);
    setIsDetailsModalOpen(true);
  };

  const handleExport = async (exportConfig) => {
    // Simulate export process
    console.log('Exporting with config:', exportConfig);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleClearFilters = () => {
    setCurrentPage(1);
  };

  const handleAlertDismiss = (alertId) => {
    console.log('Alert dismissed:', alertId);
  };

  const handleAlertViewDetails = (alert) => {
    console.log('View alert details:', alert);
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Add logout logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="manager" userName="Carlos Martínez" onLogout={handleLogout} />
      <AlertNotificationBar 
        alerts={mockAlerts}
        onDismiss={handleAlertDismiss}
        onViewDetails={handleAlertViewDetails}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <Breadcrumb />
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Movimientos de Stock</h1>
                <p className="mt-2 text-text-secondary">
                  Registro completo de transacciones y trazabilidad de inventario
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => window.location?.reload()}
                >
                  Actualizar
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => console.log('Add movement')}
                >
                  Nuevo Movimiento
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-8">
            <MovementStats stats={mockStats} />
          </div>

          {/* Filters Section */}
          <div className="mb-8">
            <MovementFilters
              onFiltersChange={handleFiltersChange}
              onExport={() => setIsExportModalOpen(true)}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Results Summary */}
          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Mostrando {paginatedMovements?.length} de {filteredAndSortedMovements?.length} movimientos
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">Elementos por página:</span>
              <select className="text-sm border border-border rounded px-2 py-1 bg-card">
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>

          {/* Table Section */}
          <div className="mb-8">
            <MovementTable
              movements={paginatedMovements}
              onViewDetails={handleViewDetails}
              onSort={handleSort}
              sortConfig={sortConfig}
            />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-text-secondary">
                Página {currentPage} de {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  iconName="ChevronLeft"
                  iconSize={16}
                >
                  Anterior
                </Button>
                
                {/* Page Numbers */}
                <div className="hidden sm:flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === currentPage ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-8 h-8"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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
      {/* Modals */}
      <MovementDetailsModal
        movement={selectedMovement}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedMovement(null);
        }}
      />
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
        totalRecords={filteredAndSortedMovements?.length}
      />
    </div>
  );
};

export default StockMovements;