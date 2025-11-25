import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import RoleInfoCard from './components/RoleInfoCard';
import TrustIndicators from './components/TrustIndicators';
import SystemStatus from './components/SystemStatus';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showRoleInfo, setShowRoleInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (userData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
  };

  const currentYear = new Date()?.getFullYear();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-surface border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Wrench" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary">Sigita</h1>
              </div>
            </div>
            
            <button
              onClick={() => setShowRoleInfo(!showRoleInfo)}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-hover"
            >
              <Icon name="HelpCircle" size={18} />
              <span className="hidden sm:inline">Información de Roles</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Login Form Section */}
              <div className="lg:col-span-2">
                <div className="max-w-md mx-auto lg:mx-0">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-2">
                      Iniciar Sesión
                    </h2>
                    <p className="text-text-secondary">
                      Acceda al sistema de gestión de inventario automotriz
                    </p>
                  </div>

                  <div className="bg-card border border-border rounded-lg shadow-card p-6">
                    <LoginForm onLogin={handleLogin} isLoading={isLoading} />
                  </div>

                  {/* Quick Access Info */}
                  <div className="mt-6 bg-muted/50 border border-border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="Key" size={20} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Acceso Rápido</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Utilice las credenciales de prueba para explorar el sistema según su rol.
                        </p>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div>• <strong>Administrador:</strong> Acceso completo al sistema</div>
                          <div>• <strong>Gerente:</strong> Gestión de inventario y proveedores</div>
                          <div>• <strong>Operador:</strong> Consulta y operaciones básicas</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Information */}
              <div className="space-y-6">
                {/* Role Information (Collapsible on mobile) */}
                <div className={`${showRoleInfo ? 'block' : 'hidden lg:block'}`}>
                  <RoleInfoCard />
                </div>

                {/* System Status */}
                <div className="hidden lg:block">
                  <SystemStatus />
                </div>

                {/* Trust Indicators */}
                <div className="hidden lg:block">
                  <TrustIndicators />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© {currentYear} Sigita</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Versión 2.1.0</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-hover flex items-center space-x-1">
                <Icon name="FileText" size={16} />
                <span>Términos</span>
              </a>
              <a href="#" className="hover:text-foreground transition-hover flex items-center space-x-1">
                <Icon name="Shield" size={16} />
                <span>Privacidad</span>
              </a>
              <a href="#" className="hover:text-foreground transition-hover flex items-center space-x-1">
                <Icon name="HelpCircle" size={16} />
                <span>Ayuda</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;