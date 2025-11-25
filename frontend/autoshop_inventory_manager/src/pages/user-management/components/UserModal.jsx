import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserModal = ({ isOpen, onClose, user, onSave, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'operator',
    area: '',
    phone: '',
    status: 'active'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || 'operator',
        area: user?.area || '',
        phone: user?.phone || '',
        status: user?.status || 'active'
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'operator',
        area: '',
        phone: '',
        status: 'active'
      });
    }
    setErrors({});
  }, [user, mode, isOpen]);

  const roleOptions = [
    { value: 'administrator', label: 'Administrador' },
    { value: 'manager', label: 'Gerente de Área' },
    { value: 'operator', label: 'Operador Mecánico' }
  ];

  const areaOptions = [
    { value: 'Mecánica General', label: 'Mecánica General' },
    { value: 'Electricidad', label: 'Electricidad' },
    { value: 'Carrocería', label: 'Carrocería' },
    { value: 'Pintura', label: 'Pintura' },
    { value: 'Administración', label: 'Administración' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData?.area) {
      newErrors.area = 'El área es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await onSave({
        ...formData,
        id: user?.id || Date.now()
      });
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1300 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-background/80 backdrop-blur-sm" onClick={onClose} />
        
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-card shadow-modal rounded-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-card-foreground">
              {mode === 'create' ? 'Agregar Nuevo Usuario' : 'Editar Usuario'}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nombre completo"
              type="text"
              placeholder="Ingrese el nombre completo"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              error={errors?.name}
              required
            />

            <Input
              label="Correo electrónico"
              type="email"
              placeholder="usuario@ejemplo.com"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required
            />

            <Input
              label="Teléfono"
              type="tel"
              placeholder="+34 600 000 000"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              error={errors?.phone}
            />

            <Select
              label="Rol del usuario"
              options={roleOptions}
              value={formData?.role}
              onChange={(value) => handleInputChange('role', value)}
              required
            />

            <Select
              label="Área de trabajo"
              options={areaOptions}
              value={formData?.area}
              onChange={(value) => handleInputChange('area', value)}
              error={errors?.area}
              required
            />

            {mode === 'edit' && (
              <Select
                label="Estado del usuario"
                options={statusOptions}
                value={formData?.status}
                onChange={(value) => handleInputChange('status', value)}
                required
              />
            )}

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="default"
                loading={isLoading}
                iconName="Save"
                iconPosition="left"
                iconSize={16}
                className="flex-1"
              >
                {mode === 'create' ? 'Crear Usuario' : 'Guardar Cambios'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserModal;