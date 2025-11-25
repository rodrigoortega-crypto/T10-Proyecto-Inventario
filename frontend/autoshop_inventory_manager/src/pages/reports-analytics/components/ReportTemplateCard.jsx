import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportTemplateCard = ({ template, onUse, onEdit, onDelete }) => {
  const formatLastUsed = (date) => {
    const now = new Date();
    const lastUsed = new Date(date);
    const diffInHours = Math.floor((now - lastUsed) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    
    return lastUsed?.toLocaleDateString('es-ES');
  };

  const getFrequencyBadge = (frequency) => {
    const badges = {
      daily: { label: 'Diario', color: 'bg-success text-success-foreground' },
      weekly: { label: 'Semanal', color: 'bg-primary text-primary-foreground' },
      monthly: { label: 'Mensual', color: 'bg-warning text-warning-foreground' },
      quarterly: { label: 'Trimestral', color: 'bg-secondary text-secondary-foreground' },
      manual: { label: 'Manual', color: 'bg-muted text-muted-foreground' }
    };
    
    return badges?.[frequency] || badges?.manual;
  };

  const frequencyBadge = getFrequencyBadge(template?.frequency);

  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-card hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name={template?.icon} size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {template?.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {template?.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {template?.isScheduled && (
            <Icon name="Clock" size={16} color="var(--color-success)" />
          )}
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${frequencyBadge?.color}`}>
            {frequencyBadge?.label}
          </span>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Categoría:</span>
          <span className="font-medium text-foreground">{template?.category}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Formato:</span>
          <span className="font-medium text-foreground uppercase">{template?.format}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Último uso:</span>
          <span className="font-medium text-foreground">
            {formatLastUsed(template?.lastUsed)}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Veces usado:</span>
          <span className="font-medium text-foreground">{template?.usageCount}</span>
        </div>
      </div>
      {template?.filters && Object.keys(template?.filters)?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-medium text-muted-foreground mb-2">Filtros configurados:</h4>
          <div className="flex flex-wrap gap-1">
            {Object.entries(template?.filters)?.map(([key, values]) => (
              values?.length > 0 && (
                <span 
                  key={key}
                  className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                >
                  {key}: {values?.length}
                </span>
              )
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(template)}
            iconName="Edit"
            iconPosition="left"
            iconSize={14}
          >
            Editar
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(template?.id)}
            iconName="Trash2"
            iconSize={14}
            className="text-error hover:text-error hover:bg-error/10"
          />
        </div>
        
        <Button
          variant="default"
          size="sm"
          onClick={() => onUse(template)}
          iconName="Play"
          iconPosition="left"
          iconSize={14}
        >
          Usar Plantilla
        </Button>
      </div>
    </div>
  );
};

export default ReportTemplateCard;