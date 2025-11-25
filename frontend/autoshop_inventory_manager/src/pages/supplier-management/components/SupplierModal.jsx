import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SupplierModal = ({ isOpen, onClose, supplier, onSave, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    email: '',
    phone: '',
    address: '',
    location: '',
    contactPerson: '',
    paymentTerms: '',
    notes: '',
    status: 'active'
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (supplier && mode === 'edit') {
      setFormData({
        name: supplier?.name || '',
        category: supplier?.category || '',
        email: supplier?.email || '',
        phone: supplier?.phone || '',
        address: supplier?.address || '',
        location: supplier?.location || '',
        contactPerson: supplier?.contactPerson || '',
        paymentTerms: supplier?.paymentTerms || '',
        notes: supplier?.notes || '',
        status: supplier?.status || 'active'
      });
    } else {
      setFormData({
        name: '',
        category: '',
        email: '',
        phone: '',
        address: '',
        location: '',
        contactPerson: '',
        paymentTerms: '',
        notes: '',
        status: 'active'
      });
    }
    setErrors({});
  }, [supplier, mode, isOpen]);

  const categoryOptions = [
    { value: 'motor', label: 'Repuestos de Motor' },
    { value: 'frenos', label: 'Sistema de Frenos' },
    { value: 'suspension', label: 'Suspensión' },
    { value: 'electrico', label: 'Sistema Eléctrico' },
    { value: 'carroceria', label: 'Carrocería' },
    { value: 'neumaticos', label: 'Neumáticos' },
    { value: 'lubricantes', label: 'Lubricantes' },
    { value: 'herramientas', label: 'Herramientas' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'pending', label: 'Pendiente' }
  ];

  const locationOptions = [
    { value: 'madrid', label: 'Madrid' },
    { value: 'barcelona', label: 'Barcelona' },
    { value: 'valencia', label: 'Valencia' },
    { value: 'sevilla', label: 'Sevilla' },
    { value: 'bilbao', label: 'Bilbao' },
    { value: 'zaragoza', label: 'Zaragoza' }
  ];

  const paymentTermsOptions = [
    { value: '30', label: '30 días' },
    { value: '60', label: '60 días' },
    { value: '90', label: '90 días' },
    { value: 'immediate', label: 'Pago inmediato' },
    { value: 'custom', label: 'Términos personalizados' }
  ];

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre del proveedor es obligatorio';
    }

    if (!formData?.category) {
      newErrors.category = 'La categoría es obligatoria';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    }

    if (!formData?.contactPerson?.trim()) {
      newErrors.contactPerson = 'La persona de contacto es obligatoria';
    }

    if (!formData?.location) {
      newErrors.location = 'La ubicación es obligatoria';
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
        id: supplier?.id || Date.now(),
        rating: supplier?.rating || 0,
        activeOrders: supplier?.activeOrders || 0,
        createdAt: supplier?.createdAt || new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Error saving supplier:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1300 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-background/80 backdrop-blur-sm" onClick={onClose} />
        
        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-card shadow-modal rounded-lg border border-border">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-card-foreground">
              {mode === 'edit' ? 'Editar Proveedor' : 'Agregar Nuevo Proveedor'}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre del Proveedor"
                type="text"
                placeholder="Ingrese el nombre"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                error={errors?.name}
                required
              />

              <Select
                label="Categoría Principal"
                placeholder="Seleccione categoría"
                options={categoryOptions}
                value={formData?.category}
                onChange={(value) => handleInputChange('category', value)}
                error={errors?.category}
                required
              />

              <Input
                label="Email"
                type="email"
                placeholder="correo@proveedor.com"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                required
              />

              <Input
                label="Teléfono"
                type="tel"
                placeholder="+34 XXX XXX XXX"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                error={errors?.phone}
                required
              />

              <Input
                label="Persona de Contacto"
                type="text"
                placeholder="Nombre del contacto"
                value={formData?.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e?.target?.value)}
                error={errors?.contactPerson}
                required
              />

              <Select
                label="Ubicación"
                placeholder="Seleccione ubicación"
                options={locationOptions}
                value={formData?.location}
                onChange={(value) => handleInputChange('location', value)}
                error={errors?.location}
                required
              />

              <Select
                label="Términos de Pago"
                placeholder="Seleccione términos"
                options={paymentTermsOptions}
                value={formData?.paymentTerms}
                onChange={(value) => handleInputChange('paymentTerms', value)}
              />

              <Select
                label="Estado"
                options={statusOptions}
                value={formData?.status}
                onChange={(value) => handleInputChange('status', value)}
                required
              />
            </div>

            <Input
              label="Dirección"
              type="text"
              placeholder="Dirección completa"
              value={formData?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
            />

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Notas Adicionales
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={3}
                placeholder="Información adicional sobre el proveedor..."
                value={formData?.notes}
                onChange={(e) => handleInputChange('notes', e?.target?.value)}
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={isLoading}
                iconName="Save"
                iconPosition="left"
                iconSize={16}
              >
                {mode === 'edit' ? 'Actualizar' : 'Guardar'} Proveedor
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupplierModal;