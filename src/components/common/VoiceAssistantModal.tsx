import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Mic, MicOff, Volume2, X, Sparkles, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tabId: string) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const { currentLanguage, currentLangInfo, t, tr } = useLanguage();
  const { user } = useAuth();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [suggestedAction, setSuggestedAction] = useState<string | null>(null);
  const [actionTitle, setActionTitle] = useState<string>('');
  const [isDirecting, setIsDirecting] = useState(false);

  const recognitionRef = useRef<any>(null);
  const autoCloseTimerRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = currentLangInfo.speechCode || 'en-IN';

        recognition.onresult = (event: any) => {
          const spoken = event.results[0][0].transcript;
          setTranscript(spoken);
          setIsListening(false);
          processVoiceQuery(spoken);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, [currentLangInfo]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setResponseMessage('');
      setSuggestedAction(null);
      setIsDirecting(false);
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
        setIsListening(false);
      }
    }
  };

  const processVoiceQuery = (query: string) => {
    const q = query.toLowerCase();
    let reply = '';
    let actionTab = '';
    let title = '';

    const isHindi = currentLanguage === 'hi' || currentLanguage === 'mai' || currentLanguage === 'doi';
    const isTelugu = currentLanguage === 'te';
    const isTamil = currentLanguage === 'ta';
    const isMarathi = currentLanguage === 'mr';
    const isGujarati = currentLanguage === 'gu';
    const isBengali = currentLanguage === 'bn';
    const isKannada = currentLanguage === 'kn';
    const isPunjabi = currentLanguage === 'pa';

    if (
      q.includes('tomato') ||
      q.includes('tamatar') ||
      q.includes('टमाटर') ||
      q.includes('price') ||
      q.includes('bhav') ||
      q.includes('भाव') ||
      q.includes('rate') ||
      q.includes('mandi') ||
      q.includes('ధర') ||
      q.includes('விலை') ||
      q.includes('দর')
    ) {
      if (isHindi) {
        reply = `आज आपके क्षेत्र में टमाटर का मॉडल भाव ₹2,850 प्रति क्विंटल है। इस सप्ताह भाव में 4.8% की वृद्धि हुई है। आपको मंडी भाव पेज पर ले जाया जा रहा है।`;
      } else if (isTelugu) {
        reply = `ఈరోజు మీ ప్రాంతంలో టమోటా ధర క్వింటాల్‌కు ₹2,850. మార్కెట్ ధరల పేజీకి తీసుకెళ్తున్నాం.`;
      } else if (isTamil) {
        reply = `இன்று உங்கள் பகுதியில் தக்காளி சராசரி விலை குவிண்டாலுக்கு ₹2,850. சந்தை விலை பக்கத்திற்கு செல்கிறது.`;
      } else if (isMarathi) {
        reply = `आज आपल्या भागात टोमॅटोचा भाव ₹2,850 प्रति क्विंटल आहे. आपल्याला बाजारभाव पेजवर नेले जात आहे.`;
      } else {
        reply = `Today's modal price for Tomato in your region is ₹2,850 per quintal at Pimpalgaon Baswant Mandi (AGMARKNET). Directing you to the Mandi Prices page.`;
      }
      actionTab = 'market';
      title = t.tabMarket || 'Price Prediction & Mandis';
    } else if (
      q.includes('sell') ||
      q.includes('store') ||
      q.includes('bechna') ||
      q.includes('rakhna') ||
      q.includes('action') ||
      q.includes('निर्णय') ||
      q.includes('बेचें') ||
      q.includes('అమ్మ') ||
      q.includes('விற்பனை')
    ) {
      if (isHindi) {
        reply = `एआई पूर्वानुमान के अनुसार अगले 7 दिनों में भाव ₹3,120 तक बढ़ सकता है। यदि ग्रेड A है, तो 7 दिन कोल्ड स्टोरेज में रखने पर ₹145 प्रति क्विंटल का शुद्ध लाभ होगा। सर्वोत्तम निर्णय पेज पर ले जाया जा रहा है।`;
      } else if (isMarathi) {
        reply = `पुढील ७ दिवसांत भाव ₹3,120 पर्यंत वाढू शकतो. ग्रेड A साठी अल्पकालीन साठवणूक फायदेशीर ठरेल. सर्वोत्तम निर्णय पेज उघडत आहे.`;
      } else {
        reply = `AI market intelligence projects prices will rise to ₹3,120 in 7 days. If Grade A, short-term cold storage yields an estimated net gain of ₹145/quintal. Directing you to the Best Action Engine.`;
      }
      actionTab = 'best-action';
      title = t.tabBestAction || 'Best Action Engine';
    } else if (
      q.includes('storage') ||
      q.includes('cold') ||
      q.includes('godown') ||
      q.includes('warehouse') ||
      q.includes('गोदाम') ||
      q.includes('कोल्ड') ||
      q.includes('స్టోరేజ్') ||
      q.includes('கிடங்கு')
    ) {
      if (isHindi) {
        reply = `आपके निकट 3 सत्यापित शीतगृह उपलब्ध हैं। महाएग्रो कोल्ड चेन 8.5 किमी दूर है और क्षमता ₹125/माह पर उपलब्ध है। शीतगृह लोकेटर पेज पर ले जाया जा रहा है।`;
      } else {
        reply = `Found 3 verified cold storage & warehouse facilities near you. MahaAgro Cold Chain is 8.5 km away. Directing you to the Storage Locator page.`;
      }
      actionTab = 'storage';
      title = t.tabStorage || 'Storage Locator';
    } else if (
      q.includes('buyer') ||
      q.includes('khareeddar') ||
      q.includes('vyapari') ||
      q.includes('trader') ||
      q.includes('खरीदार') ||
      q.includes('व्यापारी') ||
      q.includes('కొనుగోలు') ||
      q.includes('வாங்குபவர்')
    ) {
      if (isHindi) {
        reply = `आपकी फसल के लिए 6 सत्यापित खरीदार उपलब्ध हैं। किसानप्योर प्रोसेसिंग ग्रेड B के लिए ₹2,950 प्रति क्विंटल 24-घंटे बैंक भुगतान दे रहा है। खरीदार पेज पर ले जाया जा रहा है।`;
      } else {
        reply = `Found 6 verified buyers for your produce with direct bank settlement. Directing you to the Direct Buyers page.`;
      }
      actionTab = 'buyers';
      title = t.tabBuyers || 'Find Buyers';
    } else if (
      q.includes('scheme') ||
      q.includes('yojana') ||
      q.includes('subsidy') ||
      q.includes('sarkar') ||
      q.includes('योजना') ||
      q.includes('सब्सिडी') ||
      q.includes('పథకాలు') ||
      q.includes('திட்டங்கள்')
    ) {
      if (isHindi) {
        reply = `कृषि अवसंरचना कोष (AIF) के तहत आप शीतगृह या ग्रेडिंग केंद्र स्थापित करने के लिए ₹2 करोड़ तक 3% ब्याज छूट के पात्र हैं। सरकारी योजनाएं पेज पर ले जाया जा रहा है।`;
      } else {
        reply = `Under Agriculture Infrastructure Fund (AIF), you are eligible for 3% interest subvention for post-harvest infra up to ₹2 Crores. Directing you to Govt Schemes page.`;
      }
      actionTab = 'schemes';
      title = t.tabSchemes || 'Govt Schemes';
    } else if (
      q.includes('grade') ||
      q.includes('quality') ||
      q.includes('photo') ||
      q.includes('camera') ||
      q.includes('scan') ||
      q.includes('गुणवत्ता') ||
      q.includes('फोटो') ||
      q.includes('ग्रेड') ||
      q.includes('తనిఖీ') ||
      q.includes('தரம்')
    ) {
      if (isHindi) {
        reply = `एआई फसल गुणवत्ता स्कैनर खोला जा रहा है। कृपया प्राकृतिक रोशनी में अपनी फसल की स्पष्ट तस्वीर लें।`;
      } else {
        reply = `Opening AI Produce Quality scanner. Directing you to the Quality Grading page.`;
      }
      actionTab = 'grading';
      title = t.tabGrading || 'AI Quality Grading';
    } else {
      if (isHindi) {
        reply = `किसानसेतु एआई: "${query}"। आपको मंडी भाव एवं मूल्य पूर्वानुमान पेज पर ले जाया जा रहा है।`;
      } else {
        reply = `KisanSetu AI understood: "${query}". Directing you to the Market Intelligence and Mandi prices page.`;
      }
      actionTab = 'market';
      title = t.tabMarket || 'Price Prediction & Mandis';
    }

    setResponseMessage(reply);
    setSuggestedAction(actionTab);
    setActionTitle(title);
    setIsDirecting(true);

    // DIRECT PAGE IMMEDIATELY to the required answer view
    if (actionTab && onNavigateTab) {
      onNavigateTab(actionTab);
    }

    speakResponse(reply);

    // Auto-close modal after user has heard/seen the direction so they are directly in the answer page
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    autoCloseTimerRef.current = setTimeout(() => {
      onClose();
    }, 4000);
  };

  const speakResponse = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLangInfo.speechCode || 'en-IN';
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const navigateAndClose = (tabId: string) => {
    stopSpeaking();
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    if (onNavigateTab) {
      onNavigateTab(tabId);
    }
    onClose();
  };

  if (!isOpen) return null;

  // Localized sample questions
  const getLocalizedPrompts = () => {
    if (currentLanguage === 'hi') {
      return [
        'टमाटर का आज का भाव क्या है?',
        'फसल अभी बेचें या कोल्ड स्टोरेज में रखें?',
        'मेरे नजदीक कोल्ड स्टोरेज खोजें',
        'सीधे खरीदार खोजें',
        'फसल गुणवत्ता फोटो जांचें'
      ];
    }
    if (currentLanguage === 'te') {
      return [
        'ఈరోజు టమోటా ధర ఎంత?',
        'ఇప్పుడే అమ్మాలా లేదా నిల్వ చేయాలా?',
        'సమీప కోల్డ్ స్టోరేజ్ కనుగొనండి',
        'కొనుగోలుదారులను కనుగొనండి',
        'పంట నాణ్యతను పరీక్షించండి'
      ];
    }
    if (currentLanguage === 'ta') {
      return [
        'இன்றைய தக்காளி விலை என்ன?',
        'இப்போதே விற்கவா அல்லது சேமிக்கவா?',
        'அருகிலுள்ள குளிர்பதன கிடங்கு',
        'நேரடி வாங்குபவர்களைக் கண்டறியவும்',
        'பயிர் தரம் சோதிக்கவும்'
      ];
    }
    if (currentLanguage === 'mr') {
      return [
        'आजचा टोमॅटोचा बाजारभाव काय आहे?',
        'माल आत्ताच विकावा की साठवून ठेवावा?',
        'जवळचे शीतगृह शोधा',
        'थेट खरेदीदार शोधा',
        'मालाची गुणवत्ता तपासा'
      ];
    }
    return [
      "What is today's tomato price?",
      'Should I sell or store my harvest?',
      'Find cold storage near me',
      'Find verified buyers near me',
      'Scan my crop quality'
    ];
  };

  const quickPrompts = getLocalizedPrompts();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-lg rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 text-slate-900 shadow-xl relative"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>{t.voiceAssistantTitle || 'KisanSetu AI Voice Navigator'}</span>
          </div>

          <button
            onClick={() => {
              stopSpeaking();
              if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
              onClose();
            }}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Mic Visualizer */}
        <div className="py-6 flex flex-col items-center text-center">
          <div className="relative mb-4">
            {isListening && (
              <div className="absolute -inset-4 rounded-full bg-rose-500/20 animate-ping" />
            )}
            <button
              onClick={toggleListening}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                isListening
                  ? 'bg-rose-600 text-white ring-4 ring-rose-200'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white hover:scale-105'
              }`}
            >
              {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
          </div>

          <p className="text-sm font-semibold text-slate-900">
            {isListening
              ? (t.voiceListening || 'Listening to your voice...')
              : (t.voiceTapToSpeak || 'Tap the microphone & speak in your language')}
          </p>

          <p className="text-xs text-slate-500 mt-1">
            {tr("Speaking in")}: <span className="font-semibold text-slate-700">{currentLangInfo.name} ({currentLangInfo.nativeName})</span>
          </p>
        </div>

        {/* Spoken Query & AI Answer Box */}
        {transcript && (
          <div className="mb-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="text-slate-900 font-semibold block mb-0.5">{tr("Spoken Query")}:</span>
            <p className="text-slate-700 italic">"{transcript}"</p>
          </div>
        )}

        {responseMessage && (
          <div className="mb-4 p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs leading-relaxed text-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                {tr("KisanSetu Decision AI")}:
              </span>
              {isSpeaking ? (
                <button
                  onClick={stopSpeaking}
                  className="flex items-center gap-1 text-[11px] text-amber-800 hover:text-amber-900 font-semibold cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>{t.stopAudio || 'Stop audio'}</span>
                </button>
              ) : (
                <button
                  onClick={() => speakResponse(responseMessage)}
                  className="flex items-center gap-1 text-[11px] text-emerald-800 hover:text-emerald-900 font-semibold cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{t.replayVoice || 'Replay voice'}</span>
                </button>
              )}
            </div>

            <p className="text-slate-800">{responseMessage}</p>

            {/* DIRECTING STATUS AND IMMEDIATE VIEW BUTTON */}
            {suggestedAction && (
              <div className="mt-3 pt-3 border-t border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-700">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  <span>
                    {t.directingTo || 'Directed to'}: <strong className="text-slate-900">{actionTitle}</strong>
                  </span>
                </div>

                <button
                  onClick={() => navigateAndClose(suggestedAction)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{t.viewNow || 'View Answer Now →'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quick Sample Questions */}
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            {t.tryAsking || 'Try Asking KisanSetu:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTranscript(q);
                  processVoiceQuery(q);
                }}
                className="text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition cursor-pointer text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
