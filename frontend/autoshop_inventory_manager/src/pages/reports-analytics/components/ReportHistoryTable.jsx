import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ReportHistoryTable = ({ reports, onDownload, onDelete, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('generatedAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const filteredReports = reports?.filter(report =>
    report?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    report?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const sortedReports = [...filteredReports]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: { label: 'Completado', color: 'bg-success text-success-foreground' },
      processing: { label: 'Procesando', color: 'bg-warning text-warning-foreground' },
      failed: { label: 'Error', color: 'bg-error text-error-foreground' },
      scheduled: { label: 'Programado', color: 'bg-primary text-primary-foreground' }
    };
    
    return badges?.[status] || badges?.completed;
  };

  const getFormatIcon = (format) => {
    const icons = {
      pdf: 'FileText',
      excel: 'FileSpreadsheet',
      csv: 'Database'
    };
    return icons?.[format] || 'File';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Historial de Informes
          </h3>
          <span className="text-sm text-muted-foreground">
            {filteredReports?.length} de {reports?.length} informes
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Buscar informes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Nombre</span>
                  <Icon 
                    name={sortField === 'name' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Categoría</th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('generatedAt')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Fecha</span>
                  <Icon 
                    name={sortField === 'generatedAt' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Formato</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Tamaño</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Estado</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedReports?.map((report) => {
              const statusBadge = getStatusBadge(report?.status);
              
              return (
                <tr key={report?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded">
                        <Icon name={getFormatIcon(report?.format)} size={16} color="var(--color-primary)" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{report?.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {report?.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{report?.category}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">
                      {formatDate(report?.generatedAt)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-mono text-foreground uppercase">
                      {report?.format}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">
                      {formatFileSize(report?.fileSize)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge?.color}`}>
                      {statusBadge?.label}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      {report?.status === 'completed' && (
                        <>
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => onView(report)}
                            iconName="Eye"
                            iconSize={14}
                          />
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => onDownload(report)}
                            iconName="Download"
                            iconSize={14}
                          />
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => onDelete(report?.id)}
                        iconName="Trash2"
                        iconSize={14}
                        className="text-error hover:text-error hover:bg-error/10"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {sortedReports?.length === 0 && (
          <div className="p-8 text-center">
            <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? 'No se encontraron informes que coincidan con la búsqueda' : 'No hay informes generados'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportHistoryTable;