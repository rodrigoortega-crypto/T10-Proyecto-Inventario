import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginForm = ({ onLogin, isLoading }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const mockCredentials = [
    { username: 'admin@sigita', password: 'Admin123!', role: 'administrator', name: 'Carlos Rodríguez' },
    { username: 'manager@sigita', password: 'Manager123!', role: 'manager', name: 'María González' },
    { username: 'operator@sigita', password: 'Operator123!', role: 'operator', name: 'José Martínez' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.username?.trim()) {
      newErrors.username = 'El nombre de usuario es obligatorio';
    }
    
    if (!formData?.password?.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check credentials
    const user = mockCredentials?.find(
      cred => cred?.username === formData?.username && cred?.password === formData?.password
    );

    if (user) {
      // Store user data in localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        username: user?.username,
        role: user?.role,
        name: user?.name,
        loginTime: new Date()?.toISOString()
      }));
      
      if (onLogin) {
        onLogin(user);
      }
      
      navigate('/dashboard');
    } else {
      setErrors({
        general: 'Credenciales incorrectas. Verifique su usuario y contraseña.\n\nCredenciales de prueba:\n• admin@sigita / Admin123!\n• manager@sigita / Manager123!\n• operator@sigita / Operator123!'
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.general && (
        <div className="p-4 bg-error/10 border border-error rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={20} color="var(--color-error)" className="mt-0.5 flex-shrink-0" />
            <div className="text-sm text-error-foreground whitespace-pre-line">
              {errors?.general}
            </div>
          </div>
        </div>
      )}
      <div className="space-y-4">
        <Input
          label="Usuario"
          type="text"
          name="username"
          placeholder="Ingrese su nombre de usuario"
          value={formData?.username}
          onChange={handleInputChange}
          error={errors?.username}
          required
          disabled={isLoading}
        />

        <div className="relative">
          <Input
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Ingrese su contraseña"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-hover"
            disabled={isLoading}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="mt-6"
      >
        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </Button>
    </form>
  );
};

export default LoginForm;