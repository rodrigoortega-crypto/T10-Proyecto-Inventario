import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportCategoryCard = ({ category, onSelect, isSelected = false }) => {
  const getIconColor = () => {
    if (isSelected) return 'white';
    return category?.color || 'var(--color-primary)';
  };

  const getBorderColor = () => {
    switch (category?.type) {
      case 'inventory':
        return 'border-blue-200';
      case 'supplier':
        return 'border-green-200';
      case 'movement':
        return 'border-orange-200';
      case 'user':
        return 'border-purple-200';
      case 'financial':
        return 'border-red-200';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <div 
      className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
        isSelected 
          ? 'bg-primary border-primary text-primary-foreground shadow-lg' 
          : `bg-card hover:bg-muted ${getBorderColor()}`
      }`}
      onClick={() => onSelect(category)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          isSelected ? 'bg-white/20' : 'bg-muted'
        }`}>
          <Icon 
            name={category?.icon} 
            size={24} 
            color={getIconColor()}
          />
        </div>
        {category?.isNew && (
          <span className="px-2 py-1 text-xs font-medium bg-success text-success-foreground rounded-full">
            Nuevo
          </span>
        )}
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${
        isSelected ? 'text-primary-foreground' : 'text-foreground'
      }`}>
        {category?.title}
      </h3>
      <p className={`text-sm mb-4 ${
        isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
      }`}>
        {category?.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs">
          <span className={`flex items-center space-x-1 ${
            isSelected ? 'text-primary-foreground/70' : 'text-muted-foreground'
          }`}>
            <Icon name="FileText" size={14} />
            <span>{category?.reportCount} informes</span>
          </span>
          <span className={`flex items-center space-x-1 ${
            isSelected ? 'text-primary-foreground/70' : 'text-muted-foreground'
          }`}>
            <Icon name="Clock" size={14} />
            <span>{category?.lastGenerated}</span>
          </span>
        </div>
        
        <Button
          variant={isSelected ? "secondary" : "outline"}
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={14}
          className={isSelected ? 'bg-white/20 border-white/30 text-primary-foreground hover:bg-white/30' : ''}
        >
          Seleccionar
        </Button>
      </div>
    </div>
  );
};

export default ReportCategoryCard;