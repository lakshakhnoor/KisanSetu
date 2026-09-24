import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { KisanSetuLogo } from '../common/KisanSetuLogo';
import { ShieldCheck, Sparkles, ArrowRight, RefreshCw, PhoneCall, CheckCircle2, ChevronLeft, Languages, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LoginScreen: React.FC = () => {
  const { sendOtp, verifyOtp, otpCooldown, mockOtpCode, quickDemoLogin } = useAuth();
  const { t, currentLanguage, setLanguage, availableLanguages, currentLangInfo } = useLanguage();

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const res = await sendOtp(fullName, mobileNumber);
    setLoading(false);

    if (res.success) {
      setStep('otp');
      setOtpValues(['', '', '', '', '', '']);
    } else {
      setErrorMessage(res.error || 'Failed to send OTP.');
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const newOtp = [...otpValues];
    newOtp[index] = digit;
    setOtpValues(newOtp);

    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasteData) return;
    const newOtp = [...otpValues];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtpValues(newOtp);
    const focusIdx = Math.min(pasteData.length, 5);
    otpInputRefs.current[focusIdx]?.focus();
  };

  const handleVerifyOtp = async (e?: React.FormEvent, overrideCode?: string) => {
    if (e) e.preventDefault();
    const code = overrideCode || otpValues.join('');
    if (code.length !== 6) {
      setErrorMessage('Please enter all 6 digits of the OTP.');
      return;
    }

    setErrorMessage('');
    setLoading(true);
    const res = await verifyOtp(code, fullName);
    setLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Invalid OTP code.');
    }
  };

  const fillDemoOtp = () => {
    setOtpValues(mockOtpCode.split(''));
    setErrorMessage('');
  };

  return (
    <div
      id="kisansetu-login-screen"
      className="relative w-screen h-screen overflow-hidden select-none flex items-center justify-center bg-black"
    >
      {/* ULTRA-REALISTIC LIVE-ACTION AGRICULTURAL LANDSCAPE VIDEO BACKGROUND */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded && !videoError ? 'opacity-100 scale-105 animate-[pulse_12s_ease-in-out_infinite]' : 'opacity-0'
          }`}
          style={{ filter: 'brightness(0.82) contrast(1.08) saturate(1.15)' }}
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-farmer-walking-through-a-wheat-field-42795-large.mp4"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-green-farm-fields-42784-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* ULTRA-REALISTIC POSTER FALLBACK (shows immediately while video buffers or on error) */}
        <div
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000&auto=format&fit=crop")'
          }}
        />

        {/* REALISTIC LIGHT OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(248, 250, 252, 0.88) 0%, rgba(241, 245, 249, 0.92) 50%, rgba(236, 253, 245, 0.85) 100%)'
          }}
        />
      </div>

      {/* TOP FLOATING LANGUAGE SELECTOR */}
      <div className="absolute top-4 right-4 z-20">
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white border border-slate-200 text-xs text-slate-700 transition cursor-pointer backdrop-blur-md shadow-xs"
            title={t.changeLanguage}
          >
            <Languages className="w-3.5 h-3.5 text-emerald-700" />
            <span className="font-semibold">{currentLangInfo.nativeName}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-64 max-h-80 overflow-y-auto rounded-xl bg-white border border-slate-200 p-2 shadow-xl z-50">
              <div className="px-2 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                22 Scheduled Indian Languages
              </div>
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition cursor-pointer flex items-center justify-between ${
                    currentLanguage === lang.code
                      ? 'bg-emerald-700 text-white font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{lang.name}</span>
                  <span className="text-xs opacity-75">{lang.nativeName}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MINIMAL KISANSETU LOGIN CARD CONTAINER */}
      <div className="relative z-10 w-full max-w-md px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xl text-slate-900 relative overflow-hidden"
        >
          {/* Dignified Official Branding */}
          <div className="text-center mb-6 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>National AgriTech Gateway • e-NAM & AGMARKNET</span>
            </div>

            <div className="mb-2">
              <KisanSetuLogo size="lg" />
            </div>

            <p className="text-xs text-slate-500 mt-1 tracking-wide">
              {t.subTagline}
            </p>
          </div>

          {/* ERROR ALERT */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center"
            >
              {errorMessage}
            </motion.div>
          )}

          {/* STEP 1: NAME + INDIAN MOBILE */}
          <AnimatePresence mode="wait">
            {step === 'phone' ? (
              <motion.form
                key="phone-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSendOtp}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                    {t.fullName}
                  </label>
                  <input
                    id="login-full-name-input"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar Patel"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                    {t.mobileNumber}
                  </label>
                  <div className="flex rounded-xl bg-slate-50 border border-slate-300 overflow-hidden focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-600/30 focus-within:border-emerald-600 transition">
                    <div className="flex items-center gap-1.5 px-3 bg-slate-100 border-r border-slate-300 text-slate-700 text-sm font-semibold">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      id="login-mobile-input"
                      type="tel"
                      required
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="98765 43210"
                      className="w-full px-4 py-3 bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none tracking-wider"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Enter valid 10-digit Indian mobile number
                  </p>
                </div>

                <button
                  id="login-send-otp-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wider uppercase transition shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>{t.sendOtp}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              /* STEP 2: 6-DIGIT OTP VERIFICATION */
              <motion.form
                key="otp-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleVerifyOtp}
                className="space-y-4"
              >
                {/* ENTERED NAME & MOBILE SUMMARY BADGE */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                      {t.enteringAs || 'Entering As'}
                    </span>
                    <span className="text-sm font-bold text-slate-900 block">
                      {fullName.trim() || 'Kisan Mitra'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-600 font-mono block">
                      +91 {mobileNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setStep('phone');
                        setErrorMessage('');
                      }}
                      className="inline-flex items-center gap-0.5 text-[11px] text-emerald-800 hover:text-emerald-900 underline font-medium cursor-pointer"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      <span>{t.changeNumber}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      {t.verifyOtp}
                    </label>
                    <span className="text-[11px] text-slate-500">
                      6-digit security code
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2" onPaste={handleOtpPaste}>
                    {otpValues.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => { otpInputRefs.current[idx] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-11 h-13 text-center text-xl font-bold bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition"
                      />
                    ))}
                  </div>

                  {/* DEMO OTP HELPER BUTTON */}
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={fillDemoOtp}
                      className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition cursor-pointer"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      <span>Demo Mode OTP: {mockOtpCode} (Click to Fill)</span>
                    </button>

                    {otpCooldown > 0 ? (
                      <span className="text-[11px] text-slate-500">
                        Resend in {otpCooldown}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSendOtp()}
                        className="text-[11px] text-emerald-800 hover:text-emerald-900 font-semibold underline cursor-pointer"
                      >
                        {t.resendOtp}
                      </button>
                    )}
                  </div>
                </div>

                <button
                  id="login-verify-otp-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wider uppercase transition shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>VERIFY & ENTER AS {fullName.trim() ? fullName.trim().toUpperCase() : 'KISAN'}</span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* QUICK DEMO ACCESS ROLES (for evaluation / presentations) */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <p className="text-[11px] text-center text-slate-500 uppercase tracking-wider font-semibold mb-2.5">
              Instant Demo Access (One-Click)
            </p>
            <div className="grid grid-cols-4 gap-1.5 text-center">
              <button
                type="button"
                onClick={() => quickDemoLogin('farmer', 'Devendra Patil (Kisan)')}
                className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] text-slate-700 transition cursor-pointer flex flex-col items-center gap-0.5 shadow-xs"
              >
                <span className="text-base">👨‍🌾</span>
                <span className="font-semibold">Kisan</span>
              </button>

              <button
                type="button"
                onClick={() => quickDemoLogin('fpo', 'Sahyadri Agri FPO Lead')}
                className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] text-slate-700 transition cursor-pointer flex flex-col items-center gap-0.5 shadow-xs"
              >
                <span className="text-base">🌾</span>
                <span className="font-semibold">FPO Lead</span>
              </button>

              <button
                type="button"
                onClick={() => quickDemoLogin('trader', 'Khurana Mandi Traders')}
                className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] text-slate-700 transition cursor-pointer flex flex-col items-center gap-0.5 shadow-xs"
              >
                <span className="text-base">🏪</span>
                <span className="font-semibold">Trader</span>
              </button>

              <button
                type="button"
                onClick={() => quickDemoLogin('admin', 'KisanSetu Admin Console')}
                className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] text-slate-700 transition cursor-pointer flex flex-col items-center gap-0.5 shadow-xs"
              >
                <span className="text-base">🛡️</span>
                <span className="font-semibold">Admin</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
