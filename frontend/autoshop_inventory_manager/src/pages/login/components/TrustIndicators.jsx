import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const certifications = [
    {
      id: 1,
      name: 'ISO 9001:2015',
      description: 'Certificación de Calidad',
      icon: 'Award',
      verified: true
    },
    {
      id: 2,
      name: 'AENOR',
      description: 'Asociación Española de Normalización',
      icon: 'Shield',
      verified: true
    },
    {
      id: 3,
      name: 'RGPD Compliant',
      description: 'Protección de Datos Europea',
      icon: 'Lock',
      verified: true
    }
  ];

  const securityFeatures = [
    'Encriptación SSL/TLS',
    'Autenticación segura',
    'Copias de seguridad automáticas',
    'Auditoría de accesos'
  ];

  return (
    <div className="space-y-6">
      {/* Security Features */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-card">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Shield" size={18} color="var(--color-success)" />
          <h4 className="font-medium text-card-foreground">Seguridad Garantizada</h4>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={14} color="var(--color-success)" />
              <span className="text-xs text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Certifications */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-card">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Award" size={18} color="var(--color-primary)" />
          <h4 className="font-medium text-card-foreground">Certificaciones</h4>
        </div>
        
        <div className="space-y-2">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name={cert?.icon} size={14} color="var(--color-primary)" />
                <div>
                  <div className="text-xs font-medium text-card-foreground">{cert?.name}</div>
                  <div className="text-xs text-muted-foreground">{cert?.description}</div>
                </div>
              </div>
              {cert?.verified && (
                <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Support Info */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Icon name="Headphones" size={16} />
          <span className="text-xs">Soporte 24/7: +34 900 123 456</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-muted-foreground mt-1">
          <Icon name="Mail" size={16} />
          <span className="text-xs">soporte@sigita.es</span>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;