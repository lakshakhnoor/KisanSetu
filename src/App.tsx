import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { LoginScreen } from './components/auth/LoginScreen';
import { RoleSelectionModal } from './components/auth/RoleSelectionModal';
import { GovtTopBar } from './components/common/GovtTopBar';
import { Header } from './components/common/Header';
import { GovtFooter } from './components/common/GovtFooter';
import { VoiceAssistantModal } from './components/common/VoiceAssistantModal';
import { FarmerPortal, FarmerTab } from './components/farmer/FarmerPortal';
import { FpoPortal } from './components/fpo/FpoPortal';
import { TraderPortal } from './components/trader/TraderPortal';
import { AdminPortal } from './components/admin/AdminPortal';
import { ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated, needsRoleSelection, role, switchRole } = useAuth();
  const { tr } = useLanguage();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [farmerTab, setFarmerTab] = useState<FarmerTab>('overview');

  const handleVoiceNavigate = (tabId: string) => {
    // If currently in another role, switch to farmer role to show relevant screen
    if (role !== 'farmer') {
      switchRole('farmer');
    }
    setFarmerTab(tabId as FarmerTab);
  };

  // If user is not yet logged in with mobile OTP, display Login screen
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-700 selection:text-white">
      {/* Official Government of India & Accessibility Top Bar */}
      <GovtTopBar />

      {/* Universal Top Header */}
      <Header
        onOpenVoiceModal={() => setIsVoiceOpen(true)}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
      />

      {/* Main Content Area based on User Role */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {role === 'farmer' && (
          <FarmerPortal
            currentTab={farmerTab}
            onTabChange={(tab) => setFarmerTab(tab)}
          />
        )}
        {role === 'fpo' && <FpoPortal />}
        {role === 'trader' && <TraderPortal />}
        {role === 'admin' && <AdminPortal />}
      </main>

      {/* Official Government Compliant Footer */}
      <GovtFooter />

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onNavigateTab={handleVoiceNavigate}
      />

      {/* Role Selection / Role Switcher Modal */}
      {(needsRoleSelection || isRoleModalOpen) && (
        <RoleSelectionModal
          isOpen={needsRoleSelection || isRoleModalOpen}
          onClose={() => setIsRoleModalOpen(false)}
          currentRole={role}
          onSelectRole={(selectedRole) => {
            switchRole(selectedRole);
            setIsRoleModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
