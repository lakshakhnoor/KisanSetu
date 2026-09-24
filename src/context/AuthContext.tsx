import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  role: Role | null;
  needsRoleSelection: boolean;
  pendingMobile: string;
  pendingName: string;
  otpSent: boolean;
  otpCooldown: number;
  mockOtpCode: string;
  sendOtp: (name: string, mobile: string) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (code: string, customName?: string) => Promise<{ success: boolean; error?: string }>;
  selectRole: (role: Role) => void;
  switchRole: (role: Role) => void;
  updateLocation: (state: string, district: string) => void;
  logout: () => void;
  quickDemoLogin: (role: Role, name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_OTP = '123456';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('kisansetu_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [role, setRole] = useState<Role | null>(() => {
    try {
      return (localStorage.getItem('kisansetu_role') as Role) || null;
    } catch {
      return null;
    }
  });

  const [needsRoleSelection, setNeedsRoleSelection] = useState<boolean>(false);
  const [pendingMobile, setPendingMobile] = useState<string>('');
  const [pendingName, setPendingName] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpCooldown, setOtpCooldown] = useState<number>(0);

  const isAuthenticated = !!user && !!role && !needsRoleSelection;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpCooldown > 0) {
      timer = setInterval(() => {
        setOtpCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpCooldown]);

  const sendOtp = async (name: string, mobile: string): Promise<{ success: boolean; error?: string }> => {
    const cleanMobile = mobile.replace(/\D/g, '');
    if (!name.trim() || name.trim().length < 2) {
      return { success: false, error: 'Please enter your valid full name.' };
    }
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      return { success: false, error: 'Please enter a valid 10-digit Indian mobile number.' };
    }

    setPendingName(name.trim());
    setPendingMobile(cleanMobile);
    setOtpSent(true);
    setOtpCooldown(30);

    return { success: true };
  };

  const verifyOtp = async (code: string, customName?: string): Promise<{ success: boolean; error?: string }> => {
    if (code.trim() !== DEMO_OTP && code.trim() !== '888888') {
      return { success: false, error: 'Invalid OTP. For demo/review, use OTP: 123456' };
    }

    const enteredName = customName?.trim() || pendingName?.trim() || 'Kisan Mitra';

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: enteredName,
      mobile: pendingMobile ? `+91 ${pendingMobile}` : '+91 98765 43210',
      role: 'farmer',
      state: 'Maharashtra',
      district: 'Nashik',
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    setRole('farmer');
    setNeedsRoleSelection(false);
    setOtpSent(false);

    localStorage.setItem('kisansetu_user', JSON.stringify(newUser));
    localStorage.setItem('kisansetu_role', 'farmer');

    return { success: true };
  };

  const selectRole = (selectedRole: Role) => {
    if (!user) return;
    const updatedUser = { ...user, role: selectedRole };
    setUser(updatedUser);
    setRole(selectedRole);
    setNeedsRoleSelection(false);
    localStorage.setItem('kisansetu_user', JSON.stringify(updatedUser));
    localStorage.setItem('kisansetu_role', selectedRole);
  };

  const updateLocation = (state: string, district: string) => {
    if (!user) return;
    const updatedUser = { ...user, state, district };
    setUser(updatedUser);
    localStorage.setItem('kisansetu_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setNeedsRoleSelection(false);
    setPendingMobile('');
    setPendingName('');
    setOtpSent(false);
    localStorage.removeItem('kisansetu_user');
    localStorage.removeItem('kisansetu_role');
  };

  const quickDemoLogin = (selectedRole: Role, name: string) => {
    const demoUser: User = {
      id: `usr-demo-${selectedRole}`,
      name,
      mobile: '+91 98220 12345',
      role: selectedRole,
      state: selectedRole === 'trader' ? 'Maharashtra' : selectedRole === 'fpo' ? 'Madhya Pradesh' : 'Maharashtra',
      district: selectedRole === 'trader' ? 'Nashik' : selectedRole === 'fpo' ? 'Sehore' : 'Nashik',
      createdAt: new Date().toISOString()
    };
    setUser(demoUser);
    setRole(selectedRole);
    setNeedsRoleSelection(false);
    localStorage.setItem('kisansetu_user', JSON.stringify(demoUser));
    localStorage.setItem('kisansetu_role', selectedRole);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        role,
        needsRoleSelection,
        pendingMobile,
        pendingName,
        otpSent,
        otpCooldown,
        mockOtpCode: DEMO_OTP,
        sendOtp,
        verifyOtp,
        selectRole,
        switchRole: selectRole,
        updateLocation,
        logout,
        quickDemoLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
