import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Activity, 
  Heart, 
  User, 
  ShieldCheck, 
  ShoppingCart, 
  MessageSquare, 
  ChevronLeft,
  ChevronRight, 
  Info, 
  AlertCircle, 
  TrendingDown, 
  Wind, 
  Layers, 
  Zap, 
  CheckCircle2, 
  Apple, 
  Dumbbell, 
  ExternalLink, 
  ArrowLeft, 
  Search, 
  BookOpen, 
  ShoppingBag, 
  FileText, 
  Target, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Star, 
  Quote, 
  ShieldAlert, 
  ArrowUpRight, 
  TrendingUp, 
  Award, 
  Lock, 
  Minus, 
  Check, 
  ChevronDown, 
  Play, 
  Moon, 
  Database, 
  Globe, 
  AlertTriangle, 
  BrainCircuit, 
  Salad, 
  Scale, 
  RefreshCw, 
  UtensilsCrossed, 
  Ban, 
  Timer, 
  ShoppingBasket, 
  CreditCard, 
  Scale as ScaleIcon, 
  Shield, 
  Coffee, 
  Waves, 
  Link as LinkIcon, 
  History, 
  Users, 
  Settings, 
  FlaskConical, 
  X, 
  Bookmark, 
  BookmarkPlus, 
  BookMarked, 
  Mail, 
  Flower2, 
  ZapOff, 
  Maximize2, 
  Minimize2, 
  GripHorizontal, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkle, 
  Stethoscope, 
  FileSearch, 
  Video, 
  Image as ImageIcon, 
  Loader2, 
  CheckCircle, 
  AlertOctagon, 
  Sprout, 
  TestTube2, 
  Building2, 
  Tag, 
  Dna, 
  Zap as ZapIcon, 
  BellRing, 
  MinusSquare, 
  Square, 
  Calendar, 
  UserCheck, 
  Droplets, 
  LogOut, 
  Layout, 
  SendHorizontal, 
  CalendarClock,
  XCircle,
  Cpu,
  BedDouble,
  LightbulbOff,
  Flame,
  Soup,
  Leaf,
  HelpCircle,
  Plus
} from 'lucide-react';
import { GoogleGenAI, Modality, Type } from "@google/genai";

// --- Constants & Types ---
type MetabolicStage = 'I' | 'II' | 'III';
type SubscriptionTier = 'Public' | 'Registered' | 'Basic' | 'Advanced' | 'Premium';
type AppView = 'home' | 'mentor' | 'kitchen' | 'ecommerce' | 'exercise' | 'legal-tc' | 'legal-privacy' | 'references' | 'tribal-sourcing' | 'map-chain' | 'clinical-board' | 'subscriptions' | 'blueprint' | 'recovery' | 'faq';
type AuthMode = 'login' | 'signup' | null;

interface UserData {
  name: string;
  age: number;
  sex: string;
  race: string;
  glucose?: number;
  hba1c?: number;
  subscriptionTier?: SubscriptionTier;
  validUntil?: string;
  vascularAdjustment?: number;
}

// --- Superscript Trademark Helper ---
const TM = () => <sup>™</sup>;

const WellnessMentorBrand = () => <span className="whitespace-nowrap">Wellness Mentor<TM /></span>;
const VPADTM = () => <span>V-PAD<TM /></span>;

// --- MASTER FAQ DATA SOURCE ---
const MASTER_FAQ = [
  {
    id: 'faq-1',
    category: 'Subject',
    domain: 'Metabolic Health',
    citation: 'PRD V3 1.1',
    question: "What is the Wellness Mentor™?",
    answer: "The Wellness Mentor is an AI-powered platform designed to bridge the gap between complex metabolic research and your daily lifestyle. It uses a \"Digital Twin\" model to help you visualize and optimize your metabolic health, moving beyond simple blood tests to address the true causes of vascular decay."
  },
  {
    id: 'faq-2',
    category: 'Tech',
    domain: 'Simulation',
    citation: 'PRD V3 2.2',
    question: "What is a \"Digital Twin\" and why do I need one?",
    answer: "Your Digital Twin is a virtual representation of your unique metabolic state. By inputting biomarkers like age, glucose, and HbA1c, the app simulates your \"Vascular Age\". This allows you to see how lifestyle choices affect your internal health in real-time, specifically showing the difference between stable health and dangerous, inflamed plaque."
  },
  {
    id: 'faq-3',
    category: 'Domain',
    domain: 'Diagnostics',
    citation: 'PRD V3 3.1',
    question: "How does the App categorize my health?",
    answer: "We use a Metabolic Tier System based on clinical standards: Stage I (Healthy): You are in homeostasis with optimal glucose and HbA1c levels. Stage II (At Risk): You show signs of insulin resistance or are \"pre-diabetic\". Stage III (Management): Your markers indicate a diabetic load requiring intensive risk mitigation."
  },
  {
    id: 'faq-4',
    category: 'Benefits',
    domain: 'Physical Therapy',
    citation: 'PRD V3 4.2',
    question: "What are the \"Three Exercise Paths\"?",
    answer: "The App provides three specific \"levers\" to improve your health: Regular (Isometrics): Static holds like wall squats that trigger Nitric Oxide for immediate blood pressure relief. Yoga Flow: The primary metabolic lever designed to rejuvenate pancreatic cells and lower HbA1c. Tai Chi Flow: A secondary lever focused on vascular flexibility and calming the nervous system."
  },
  {
    id: 'faq-5',
    category: 'Domain',
    domain: 'Nutrition',
    citation: 'PRD V3 4.1',
    question: "What is the \"Global Kitchen\" philosophy?",
    answer: "Our nutrition engine focuses on \"Insulin Load\". Instead of just counting calories, we focus on removing \"blood disrupters\" like seed oils and refined sugars for a mandatory 30-day reset. We then use stage-specific food swaps and \"Smart Fruit\" guides to keep your blood sugar stable."
  },
  {
    id: 'faq-6',
    category: 'Tech',
    domain: 'Intelligence',
    citation: 'PRD V3 5.1',
    question: "How does the AI Mentor assist me?",
    answer: "The platform features two types of intelligence: The Knowledge Agent: A global health expert that answers queries using a validated research database (RAG). The Custom Mentor: A personalized AI that \"lives\" with your Digital Twin, providing active nudges to keep you on track with your specific health blueprint."
  },
  {
    id: 'faq-7',
    category: 'Benefits',
    domain: 'Governance',
    citation: 'PRD V3 6.0',
    question: "Is my data safe and verified?",
    answer: "Yes. Every piece of information is marked as \"Validated\" with clear source classification. We adhere to strict Data Sovereignty rules; you own your metabolic identity, and we do not collect health information without your explicit approval."
  }
];

// --- Default Demo Data ---
const DEMO_USER: UserData = {
  name: "Implementer One",
  age: 42,
  sex: "Neutral",
  race: "Global",
  hba1c: 5.8,
  glucose: 102,
  subscriptionTier: 'Premium',
  validUntil: '2026-12-31',
  vascularAdjustment: 0
};

// --- Acronym & Citation Dictionary ---
const ACRONYMS: Record<string, { full: string, def: string }> = {
  'Wellness Mentor': { full: 'Vascular Performance & Arterial Dynamics Powered Platform', def: 'Wellness Mentor is an implementation system for metabolic health optimization.' },
  'V-PAD': { full: 'Vascular Performance & Arterial Dynamics', def: 'The AI Powered V-PAD™ Experience & Value Platform driving Wellness Mentor.' },
  'HbA1c': { full: 'Hemoglobin A1c', def: 'Average blood glucose levels over the past 2-3 months.' },
  'HOMA-IR': { full: 'Homeostatic Model Assessment for Insulin Resistance', def: 'Calculated value determining how much insulin the body needs to keep blood sugars stable.' },
  'CGA': { full: 'Chlorogenic Acid', def: 'A phytochemical found in botanicals that inhibits glucose-6-phosphatase for metabolic control.' },
  'GC-MS': { full: 'Gas Chromatography-Mass Spectrometry', def: 'Gold-standard analytical method used to verify the phytochemical purity of ethno-botanicals.' },
  'NO2': { full: 'Nitric Oxide', def: 'Crucial signaling molecule that helps relax and dilate blood vessels.' },
  'TRE': { full: 'Time-Restricted Eating', def: 'A nutritional window (e.g., 14-hour fast) used to reset insulin sensitivity.' },
  'GL': { full: 'Glycemic Load', def: 'A ranking system for carbohydrate-rich foods that measures the impact of their consumption on blood glucose levels.' },
  'Insulin Load': { full: 'Insulin Load', def: 'The total amount of insulin the body must produce to handle a specific meal or lifestyle input.' }
};

const CITATIONS: Record<string, { source: string, year: string }> = {
  'yoga-hba1c': { source: 'Yoga Path Clinical Meta-Analysis', year: '2024' },
  'vagal-tone': { source: 'Nature Reviews Neuroscience', year: '2023' },
  'piperine-synergy': { source: 'Journal of Phytomedicine', year: '2024' },
  'tribal-farming': { source: 'Nair, S. K., Gnanamangai, B. M., Kodakkat, V. K., Pillay, R., & Moni, M. ET AL .', year: '2023' },
  'ada-2025': { source: 'American Diabetes Association Standards of Care', year: '2025' },
  'nature-endo': { source: 'Nature Reviews Endocrinology', year: '2024' }
};

// --- Metabolic Logic ---
const calculateVascularAge = (age: number, stage: MetabolicStage, adjustment: number = 0): number => {
  let base = age;
  if (stage === 'I') base = age - 2;
  if (stage === 'II') base = age + 8;
  if (stage === 'III') base = age + 15;
  return Number((base - adjustment).toFixed(2));
};

const getInsulinSensitivity = (stage: MetabolicStage): number => {
  if (stage === 'I') return 92;
  if (stage === 'II') return 64;
  if (stage === 'III') return 38;
  return 100;
};

const calculateSessionImpact = (paths: string[]): number => {
  const unique = Array.from(new Set(paths));
  let impact = 0;
  if (unique.includes('yoga')) impact += 0.2;
  if (unique.includes('regular')) impact += 0.1;
  // Apply synergy multiplier if both are completed
  if (unique.includes('yoga') && unique.includes('regular')) {
    impact *= 1.5;
  }
  return Number(impact.toFixed(2));
};

// --- Utils for Live API ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- Protocol Libraries ---
const yogaProtocols = {
  'I': {
    name: "Surya Namaskar",
    duration: 600,
    focus: "Brain-Pancreas Signaling",
    desc: "Sun Salutations to stimulate systemic metabolic pathways and prime receptor sensitivity.",
    impact: "Stimulating insulin receptor expression...",
    citation: "Yoga Path primary movements are validated for a 0.73% HbA1c reduction in consistent practitioners."
  },
  'II': {
    name: "Ardha Matsyendrasana",
    duration: 900,
    focus: "Visceral Fat & Insulin Resistance",
    desc: "Deep sitting twists designed to compress and massage internal organs, cooling visceral inflammation.",
    impact: "Massaging pancreatic β-cells for rejuvenation...",
    citation: "Twisting postures increase glucose uptake in skeletal muscle independently of insulin."
  },
  'III': {
    name: "Shavasana",
    duration: 1200,
    focus: "Fasting Glucose Management",
    desc: "Deep relaxation and conscious breathing to lower cortisol and reduce fasting glucose levels.",
    impact: "Lowering hepatic glucose production...",
    citation: "Proven to lower fasting glucose by up to 22.75 mg/dL through autonomic balance."
  }
};

const taiChiSteps = [
  {
    name: "Commencing Form",
    duration: 30,
    focus: "Autonomic Priming",
    desc: "Slow raising and lowering of arms to sync breath with blood flow.",
    impact: "Priming the Vagal pathway..."
  },
  {
    name: "Cloud Hands",
    duration: 60,
    focus: "Shear Stress Induction",
    desc: "Rhythmic rotation to stimulate the endothelial layer and release NO2.",
    impact: "Triggering rhythmic nitric oxide release..."
  },
  {
    name: "Single Whip",
    duration: 45,
    focus: "Vagal Tone Maxima",
    desc: "Extending the somatic field to lower sympathetic dominance and cortisol.",
    impact: "Maximizing vagal tone and cortisol reduction..."
  }
];

// --- AI Execution Hook ---
const useAIExecution = (userData: UserData | null) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const generateExerciseVideo = async (exerciseName: string) => {
    setIsLoading(true);
    setStatus("Checking AI Studio status...");
    try {
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }

      setStatus("Synthesizing metabolic animation...");
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `A professional 3D medical visualization of ${exerciseName}. Focus on precision movement, anatomical accuracy, and metabolic flow pathways. cinematic lighting, 4k.`,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        setStatus("Rendering metabolic simulation...");
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      }
    } catch (err: any) {
      console.error(err);
      if (err?.message?.includes("Requested entity was not found")) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }
    } finally {
      setIsLoading(false);
      setStatus(null);
    }
  };

  const generateRecipeImage = async (recipeTitle: string) => {
    setIsLoading(true);
    setStatus("Visualizing gourmet implementation...");
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `A high-end food photography shot of ${recipeTitle}. Healthy ingredients, gourmet plating in a bright professional kitchen, 4k resolution.` }]
        }
      });
      
      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (part?.inlineData) {
        setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setStatus(null);
    }
  };

  return { videoUrl, setVideoUrl, imageUrl, setImageUrl, isLoading, status, generateExerciseVideo, generateRecipeImage };
};

// --- Shared Components ---

const InfoTooltip = ({ acronym, citation, children }: { acronym?: string, citation?: string, children: React.ReactNode }) => {
  const [show, setShow] = useState(false);
  const data = acronym ? ACRONYMS[acronym] : citation ? CITATIONS[citation] : null;

  if (!data) return <>{children}</>;

  return (
    <span className="relative inline-block group text-left">
      <span 
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className={`cursor-help transition-all duration-200 ${acronym ? 'border-b-2 border-dotted border-blue-400/60 hover:border-blue-500' : 'text-blue-600 hover:text-blue-700 font-bold'}`}
      >
        {children}
      </span>
      {show && (
        <div className="absolute z-[200] bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-5 bg-slate-900/95 backdrop-blur-xl text-white text-[11px] rounded-[24px] shadow-3xl animate-in fade-in zoom-in-95 duration-300 border border-white/10 ring-1 ring-black/20">
          {acronym ? (
            <div className="space-y-2">
              <div className="font-black text-blue-400 uppercase tracking-widest text-[10px] flex items-center gap-2">
                <BrainCircuit className="w-3 h-3" /> {(data as any).full}
              </div>
              <div className="font-medium text-sky-100/80 leading-relaxed italic border-t border-white/5 pt-2">{(data as any).def}</div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="font-black text-emerald-400 uppercase tracking-widest text-[10px] flex items-center gap-2">
                <Database className="w-3 h-3" /> Verified Source
              </div>
              <div className="font-medium text-white border-t border-white/5 pt-2">{(data as any).source}</div>
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Released: {(data as any).year}</div>
            </div>
          )}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900/95" />
        </div>
      )}
    </span>
  );
};

const SourceBadge = ({ type, urls, citation, customText }: { type: 'Clinical' | 'Traditional' | 'Public', urls?: string[], citation?: string, customText?: string }) => (
  <div className="flex flex-col gap-1 text-left">
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
        <Database className="w-3 h-3" /> Validated: {type}
      </span>
      {citation && (
        <InfoTooltip citation={citation}>
          <Info className="w-3 h-3 text-slate-300 hover:text-blue-500 transition-colors" />
        </InfoTooltip>
      )}
    </div>
    {customText && <p className="text-[9px] font-bold text-blue-400/80 uppercase tracking-tight">{customText}</p>}
    {urls && urls.length > 0 && (
      <div className="flex flex-wrap gap-1">
        {urls.map((url, i) => (
          <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-[8px] text-blue-400 hover:text-blue-600 underline truncate max-w-[150px]">
            {url}
          </a>
        ))}
      </div>
    )}
  </div>
);

const ViewWrapper = ({ children, title, subtitle }: { children?: React.ReactNode, title?: React.ReactNode, subtitle?: string }) => (
  <div className="min-h-screen animate-in fade-in slide-in-from-bottom-2 duration-700 bg-sky-50/40 text-left">
    {title && (
      <div className="pt-12 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2 uppercase leading-[1.35] text-left">{title}</h1>
          {subtitle && <p className="text-blue-600/70 text-lg font-medium leading-[1.35] text-left">{subtitle}</p>}
        </div>
      </div>
    )}
    <div className="max-w-6xl mx-auto px-6 pb-24 text-left">
      {children}
    </div>
  </div>
);

// --- Helper for rendering text with tooltips ---
const renderWithTooltips = (text: string) => {
  const termsToDetect = ['HbA1c', 'V-PAD', 'NO2', 'CGA', 'TRE', 'HOMA-IR', 'Wellness Mentor'];
  let elements: (string | React.ReactNode)[] = [text];

  termsToDetect.forEach(term => {
    elements = elements.flatMap(el => {
      if (typeof el !== 'string') return el;
      const parts = el.split(new RegExp(`(${term})`, 'g'));
      return parts.map(part => part === term ? <InfoTooltip key={`${part}-${Math.random()}`} acronym={part}>{part}</InfoTooltip> : part);
    });
  });

  return elements;
};

// --- FAQ Accordion Component ---
const FAQAccordion = ({ limit }: { limit?: number }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const items = limit ? MASTER_FAQ.slice(0, limit) : MASTER_FAQ;

  return (
    <div className="space-y-3">
      {items.map((faq) => (
        <div key={faq.id} className={`rounded-[32px] border-2 transition-all duration-300 ${openId === faq.id ? 'border-blue-500 bg-sky-50/20' : 'border-slate-50 bg-slate-50/30 hover:border-blue-100 hover:bg-white'}`}>
          <button 
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            className="w-full px-8 py-5 flex items-center justify-between gap-6 group text-left"
          >
            <div className="flex items-center gap-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${openId === faq.id ? 'bg-blue-600 text-white' : 'bg-white text-slate-300 shadow-sm group-hover:text-blue-600'}`}>
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black uppercase text-blue-500 tracking-[0.2em]">{faq.category} • {faq.domain}</span>
                </div>
                <h4 className="text-base md:text-lg font-bold text-[#0a192f] uppercase leading-[1.35]">{faq.question}</h4>
              </div>
            </div>
            <div className={`transition-transform duration-300 shrink-0 ${openId === faq.id ? 'rotate-45 text-blue-600' : 'text-slate-300'}`}>
              <Plus className="w-5 h-5" />
            </div>
          </button>
          {openId === faq.id && (
            <div className="px-8 pb-6 pt-2 animate-in slide-in-from-top-2 duration-300 text-left">
              <div className="w-full h-px bg-slate-200/50 mb-5" />
              <p className="text-slate-600 text-base font-medium leading-[1.35] max-w-4xl italic">
                "{renderWithTooltips(faq.answer)}"
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// --- FAQ View ---
const FAQView = () => (
  <ViewWrapper title="Wellness Mentor FAQ™" subtitle="Absolute Source truth regarding metabolic health implementation.">
    <div className="bg-white rounded-[64px] border border-blue-50 shadow-xl overflow-hidden p-4 md:p-12 animate-in fade-in duration-700 text-left">
      <FAQAccordion />
    </div>
  </ViewWrapper>
);

// --- Intelligence Hub Page Component ---
const IntelligenceHub = ({ userData, stage, setView }: { userData: UserData | null, stage: MetabolicStage, setView: (v: AppView) => void }) => (
  <ViewWrapper title={<IntelligenceHubTitle />} subtitle="Scientific orchestration of your metabolic performance pathways.">
    <div className="space-y-12">
      {/* Top Information Container (REPLICATING IMAGE ATTACHED) */}
      <div className="relative overflow-hidden rounded-[80px] bg-slate-900 text-white border border-white/5 shadow-4xl min-h-[550px] flex flex-col group">
        {/* Environment Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1545208393-596371ba9ac8?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30 transform group-hover:scale-105 transition-transform duration-10000" 
            alt="Wellness Environment" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/60 to-transparent" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex-grow grid lg:grid-cols-12 p-10 md:p-20 gap-12 items-center">
          {/* Left Vertical Nav (Icons from Image) */}
          <div className="lg:col-span-2 flex flex-col gap-10 justify-center border-r border-white/10 pr-10">
             {[
               { icon: Dna, label: "DIGITAL TWIN" },
               { icon: Heart, label: "DIABETES & CVD CARE" },
               { icon: Activity, label: "EXERCISE" },
               { icon: Salad, label: "NUTRITION" }
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center gap-3 group/icon cursor-pointer">
                 <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/icon:bg-blue-600/30 group-hover/icon:border-blue-500 transition-all duration-300 shadow-xl">
                   <item.icon className="w-6 h-6 text-blue-400 group-hover/icon:text-white" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-sky-100/40 group-hover/icon:text-white transition-colors text-center">{item.label}</span>
               </div>
             ))}
          </div>

          {/* Central Visualization Area */}
          <div className="lg:col-span-10 flex flex-col md:flex-row items-center justify-between gap-16">
             <div className="space-y-8 max-w-md">
                <div className="flex items-center gap-5">
                   <div className="w-20 h-20 bg-blue-600 rounded-[32px] flex items-center justify-center shadow-2xl shadow-blue-500/20">
                     <BrainCircuit className="w-10 h-10 text-white animate-pulse" />
                   </div>
                   <div className="space-y-1">
                      <h2 className="text-3xl font-black uppercase tracking-tight leading-none text-blue-400">V-PAD</h2>
                      <h3 className="text-2xl font-black uppercase tracking-tight leading-none text-white">Wellness Mentor</h3>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-blue-400">
                     <Database className="w-3 h-3" /> Metabolic Research Context
                   </div>
                   <p className="text-lg font-medium leading-relaxed text-sky-100/70 italic">
                     "Bridging the Gap: Bridging clinical biomarkers with real-time implementation pathways for metabolic optimization."
                   </p>
                </div>
             </div>

             {/* Functional Mockup Card (App View from Image) */}
             <div className="relative group/mockup">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[100px] rounded-full opacity-50 group-hover/mockup:opacity-100 transition-opacity" />
                <div className="w-[300px] bg-white rounded-[4rem] p-4 shadow-4xl border-[12px] border-slate-900 relative z-10">
                   <div className="bg-slate-50 rounded-[3.5rem] overflow-hidden flex flex-col min-h-[480px]">
                      <div className="p-8 space-y-8 flex-grow">
                         <div className="flex items-center justify-between text-[11px] font-black uppercase text-slate-400">
                           <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-blue-600" />
                           <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-blue-600" /> Wellness Charge</span>
                           <span className="text-blue-600">30 / 36</span>
                         </div>
                         <div className="space-y-4 text-center">
                            <h4 className="text-2xl font-black text-[#0a192f] uppercase leading-tight tracking-tight">Metabolism & <br/> Nutrition Plan</h4>
                            <div className="w-40 h-40 bg-white rounded-full mx-auto shadow-inner flex items-center justify-center p-4">
                               <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200" alt="Nutrition Plate" className="w-full h-full object-cover rounded-full" />
                            </div>
                         </div>
                         <div className="space-y-6">
                            <div className="space-y-1 text-center">
                               <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Daily Calorie & Macro Goals</div>
                            </div>
                            <div className="flex gap-3">
                               <div className="flex-1 py-4 bg-emerald-50 rounded-2xl text-[10px] font-black text-emerald-600 text-center uppercase tracking-tighter shadow-sm">20-30 mins</div>
                               <div className="flex-1 py-4 bg-blue-50 rounded-2xl text-[10px] font-black text-blue-600 text-center uppercase tracking-tighter shadow-sm">30-45 mins</div>
                            </div>
                            <button className="w-full py-5 bg-[#0a192f] text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-600 transition-all">View Meal Plan</button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Banner Global Headline */}
        <div className="relative z-10 bg-white py-10 px-8 text-center border-t border-white/10 shadow-2xl">
          <h3 className="text-2xl md:text-4xl font-black text-[#0a192f] uppercase tracking-tighter">
            BRIDGE THE GAP: RESEARCH TO DAILY WELLNESS IMPLEMENTATION
          </h3>
        </div>
      </div>

      {/* Main Functionality Section */}
      <div className="grid lg:grid-cols-2 gap-12">
        <LiveVoiceCoaching userData={userData} stage={stage} />
        <div className="space-y-8">
           <div className="bg-white p-12 rounded-[56px] border border-blue-50 shadow-xl space-y-8 h-full flex flex-col">
              <div className="flex items-center gap-5">
                 <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner"><Cpu className="w-7 h-7" /></div>
                 <h4 className="text-2xl font-black uppercase tracking-tight text-[#0a192f]">Digital Twin Progress</h4>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed text-lg flex-grow">
                Synchronized agentic analysis of your metabolic velocity. Monitorvascular age projection and receptor efficiency in real-time.
              </p>
              <button onClick={() => setView('blueprint')} className="w-full py-6 rounded-3xl bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-3">
                Synchronize Blueprint <RefreshCw className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>
    </div>
  </ViewWrapper>
);

// --- Box Breathing Timer Component ---
const BoxBreathingTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [step, setStep] = useState(0); 
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycles, setCycles] = useState(0);

  const steps = [
    { name: "Inhale", color: "text-blue-500", icon: ArrowUpRight },
    { name: "Hold", color: "text-emerald-500", icon: Minus },
    { name: "Exhale", color: "text-rose-500", icon: TrendingDown },
    { name: "Hold", color: "text-amber-500", icon: Minus }
  ];

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        if (timeLeft > 1) {
          setTimeLeft(prev => prev - 1);
        } else {
          const nextStep = (step + 1) % 4;
          setStep(nextStep);
          setTimeLeft(4);
          if (nextStep === 0) setCycles(prev => prev + 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, step, timeLeft]);

  const toggle = () => {
    if (isActive) {
      setIsActive(false);
      setStep(0);
      setTimeLeft(4);
      setCycles(0);
    } else {
      setIsActive(true);
    }
  };

  const current = steps[step];

  return (
    <div className="bg-white p-12 rounded-[56px] border border-blue-50 shadow-xl flex flex-col items-center text-center space-y-10 text-left">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
          <Wind className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Sympathetic Drive Reset</span>
        </div>
        <h3 className="text-3xl font-black text-[#0a192f] uppercase tracking-tight leading-[1.35]">Guided Box Breathing</h3>
        <p className="text-slate-500 text-sm font-medium max-w-sm mx-auto leading-relaxed">
          Manage the "off-switch" for your metabolic drive. Essential for lowering persistent insulin levels.
        </p>
      </div>

      <div className="relative w-72 h-72 flex items-center justify-center">
        <div 
          className={`absolute inset-0 rounded-[64px] border-4 transition-all duration-[4000ms] ease-linear ${isActive ? (
            step === 0 ? 'scale-110 opacity-40 border-blue-500' : 
            step === 1 ? 'scale-110 opacity-60 border-emerald-500' : 
            step === 2 ? 'scale-90 opacity-40 border-rose-500' : 
            'scale-90 opacity-60 border-amber-500'
          ) : 'border-slate-100 opacity-20'}`}
        />
        
        <div className="relative z-10 flex flex-col items-center space-y-2">
          <div className={`text-6xl font-black tabular-nums transition-colors duration-500 ${isActive ? current.color : 'text-slate-200'}`}>
            {timeLeft}
          </div>
          <div className={`text-xs font-black uppercase tracking-[0.3em] transition-colors duration-500 ${isActive ? current.name : "Ready"}`}>
            {isActive ? current.name : "Ready"}
          </div>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-8">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
           <span>Session Cycles</span>
           <span className="text-blue-600">{cycles} Complete</span>
        </div>
        <button 
          onClick={toggle}
          className={`w-full py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 shadow-2xl ${
            isActive ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isActive ? 'Terminate Session' : 'Initialize Breathing'}
        </button>
      </div>
    </div>
  );
};

// --- Sleep Hygiene Checklist Component ---
const SleepHygieneChecklist = () => {
  const [checks, setChecks] = useState<boolean[]>(new Array(6).fill(false));

  const protocols = [
    { title: "Blue Light Protocol", desc: "No screens 60 mins before sleep to preserve melatonin signaling.", icon: LightbulbOff },
    { title: "Metabolic Cooling", desc: "Room temperature adjusted to < 68°F (20°C) for deep arterial rest.", icon: Wind },
    { title: "Magnesium Window", desc: "Standardized magnesium implementation for neuromuscular relaxation.", icon: Flower2 },
    { title: "TRE Fasting Seal", desc: "No metabolic load within 3 hours of sleep window.", icon: Ban },
    { title: "Fixed Circadian Lock", desc: "Bedtime maintained within 15-minute variability.", icon: Clock },
    { title: "Complete Photon Seal", desc: "100% dark environment for maximal β-cell recovery signaling.", icon: Moon }
  ];

  const toggle = (i: number) => {
    const next = [...checks];
    next[i] = !next[i];
    setChecks(next);
  };

  const progress = Math.round((checks.filter(Boolean).length / checks.length) * 100);

  return (
    <div className="bg-white p-12 rounded-[56px] border border-blue-50 shadow-xl space-y-12 text-left">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
            <BedDouble className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Biological Recovery</span>
          </div>
          <h3 className="text-3xl font-black text-[#0a192f] uppercase tracking-tight leading-[1.35]">Sleep Hygiene Checklist</h3>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-[#0a192f]">{progress}%</div>
          <div className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Daily Adherence</div>
        </div>
      </div>

      <div className="space-y-4">
        {protocols.map((p, i) => (
          <button 
            key={i} 
            onClick={() => toggle(i)}
            className={`w-full p-6 rounded-3xl border-2 transition-all flex items-start gap-6 group text-left ${
              checks[i] ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50/50 border-slate-100 hover:border-blue-200 hover:bg-white'
            }`}
          >
            <div className={`p-4 rounded-2xl transition-all ${checks[i] ? 'bg-emerald-600 text-white' : 'bg-white text-slate-400 shadow-sm group-hover:text-blue-600'}`}>
              <p.icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                 <h4 className={`text-lg font-black uppercase tracking-tight leading-[1.35] ${checks[i] ? 'text-emerald-900' : 'text-slate-900'}`}>{p.title}</h4>
                 {checks[i] && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </div>
              <p className={`text-xs font-medium leading-relaxed ${checks[i] ? 'text-emerald-700/70' : 'text-slate-500'}`}>{p.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="p-8 bg-[#0a192f] rounded-[40px] text-white space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10"><Zap className="w-24 h-24" /></div>
        <div className="flex items-center gap-3 relative z-10">
          <BrainCircuit className="w-6 h-6 text-blue-400" />
          <h5 className="text-sm font-black uppercase tracking-[0.2em]">Agentic Note</h5>
        </div>
        <p className="text-xs font-medium leading-[1.35] text-sky-100/60 relative z-10 italic">
          "Recovery is the silent driver of Stage reversal. Poor sleep maintains elevated systemic cortisol, overriding even the most rigid nutritional path."
        </p>
      </div>
    </div>
  );
};

// --- Recovery Path Main Component ---
const RecoveryPath = () => (
  <ViewWrapper title="Recovery Path™" subtitle="Manage sympathetic drive and biological 'off-switch' signaling.">
    <div className="grid lg:grid-cols-2 gap-12 text-left">
      <BoxBreathingTimer />
      <SleepHygieneChecklist />
    </div>
  </ViewWrapper>
);

// --- Precision Kitchen Component ---
interface KitchenRecipe {
  id: string;
  title: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  stage: MetabolicStage;
  macros: string;
  benefit: string;
  ingredients: string[];
  steps: string[];
  icon: React.ElementType;
}

const KITCHEN_DATABASE: KitchenRecipe[] = [
  {
    id: 'b1',
    title: "V-PAD Morning Elixir",
    category: 'Breakfast',
    stage: 'I',
    macros: "P: 5g | F: 2g | C: 4g",
    benefit: "Endothelial Priming",
    ingredients: ["1 tsp Green Coffee Extract (CGA)", "1/2 inch Fresh Ginger", "Juice of 1/2 Lemon", "Pinch of Ceylon Cinnamon"],
    steps: ["Steep ginger in hot (not boiling) water for 5 mins.", "Whisk in green coffee extract.", "Add lemon and cinnamon.", "Consume within 30 mins of waking."],
    icon: Coffee
  },
  {
    id: 'l1',
    title: "Chlorogenic Field Bowl",
    category: 'Lunch',
    stage: 'I',
    macros: "P: 22g | F: 14g | C: 12g",
    benefit: "Hepatic Suppression",
    ingredients: ["1/2 cup Sprouted Quinoa", "1 cup Roasted Arugula", "2 tbsp Pumpkin Seeds", "Lemon Tahini Dressing"],
    steps: ["Massage arugula with lemon juice.", "Combine with warm quinoa.", "Top with toasted seeds and dressing.", "Add extra Piperine (black pepper) for bioavailability."],
    icon: Salad
  },
  {
    id: 'd1',
    title: "Endothelial Salmon",
    category: 'Dinner',
    stage: 'I',
    macros: "P: 32g | F: 22g | C: 6g",
    benefit: "Arterial Flexibility",
    ingredients: ["6oz Wild Salmon", "1 bunch Asparagus", "Crushed Walnuts", "Fresh Dill & Garlic"],
    steps: ["Preheat oven to 375°F.", "Rub salmon with garlic and top with walnuts.", "Roast alongside asparagus for 12-15 mins.", "Finish with fresh dill."],
    icon: Flame
  },
  {
    id: 'b2',
    title: "CGA Primed Greens",
    category: 'Breakfast',
    stage: 'II',
    macros: "P: 18g | F: 12g | C: 8g",
    benefit: "Glycemic Stability",
    ingredients: ["2 cups Kale", "Apple Cider Vinaigrette", "2 Poached Organic Eggs", "1/4 Avocado"],
    steps: ["Steam kale lightly for 3 mins.", "Toss with ACV to dampen glycemic response.", "Top with eggs and avocado.", "Season with sea salt."],
    icon: Leaf
  },
  {
    id: 'l2',
    title: "Arterial Flow Tofu",
    category: 'Lunch',
    stage: 'II',
    macros: "P: 26g | F: 14g | C: 10g",
    benefit: "Nitric Oxide Surge",
    ingredients: ["Firm Tofu cubes", "Turmeric & Piperine rub", "Fresh Spinach", "Red Beet Carpaccio"],
    steps: ["Sear tofu in a dry pan with spices.", "Serve over a bed of raw spinach.", "Layer with thinly sliced raw beets.", "Drizzle with extra virgin olive oil."],
    icon: Target
  },
  {
    id: 's1',
    title: "Low-Load Berry Quench",
    category: 'Snack',
    stage: 'II',
    macros: "P: 12g | F: 8g | C: 14g",
    benefit: "Post-prandial Control",
    ingredients: ["1/2 cup Organic Blackberries", "2 tbsp Ground Flax Seeds", "1 cup Unsweetened Yogurt", "3 Walnuts"],
    steps: ["Fold flax seeds into yogurt.", "Top with berries and crushed walnuts.", "Best consumed as a mid-afternoon glycemic buffer."],
    icon: Apple
  },
  {
    id: 'b3',
    title: "Insulin Buffer Broth",
    category: 'Breakfast',
    stage: 'III',
    macros: "P: 28g | F: 12g | C: 2g",
    benefit: "β-cell Recovery",
    ingredients: ["Grass-fed Bone Broth", "Slivered Bitter Melon", "Fresh Turmeric Root", "Garlic cloves"],
    steps: ["Simmer bone broth with garlic and turmeric.", "Add bitter melon in the last 2 mins.", "Sip slowly to prime insulin receptors.", "Rich in NO2 precursors."],
    icon: Soup
  },
  {
    id: 'd3',
    title: "Nitric Surge Plate",
    category: 'Dinner',
    stage: 'III',
    macros: "P: 30g | F: 24g | C: 4g",
    benefit: "Critical Revascularization",
    ingredients: ["Grilled White Fish", "Steamed Broccoli & Cauliflower", "Arugula & Beet Salad", "Pumpkin Seed Butter"],
    steps: ["Grill fish with olive oil and herbs.", "Steam vegetables until tender-crisp.", "Serve with a heavy arugula side salad.", "Use seed butter as a healthy fat binder."],
    icon: Activity
  }
];

const GlobalKitchen = ({ userData, stage }: { userData: UserData | null, stage: MetabolicStage }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<KitchenRecipe | null>(null);
  const [filter, setFilter] = useState<'All' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'>('All');
  const { imageUrl, setImageUrl, isLoading, status, generateRecipeImage } = useAIExecution(userData);

  const recipes = useMemo(() => {
    let list = KITCHEN_DATABASE.filter(r => r.stage === stage || (stage === 'III' && r.stage === 'II') || (stage === 'II' && r.stage === 'I'));
    if (filter !== 'All') list = list.filter(r => r.category === filter);
    return list;
  }, [stage, filter]);

  const handleSelect = (r: KitchenRecipe) => {
    setSelectedRecipe(r);
    setImageUrl(null); 
  };

  return (
    <ViewWrapper title="Precision Kitchen™" subtitle="Metabolic implementation paths via Stage-specific nutritional triggers.">
      <div className="space-y-12 animate-in fade-in duration-700">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'].map((f) => (
            <button 
              key={f} 
              onClick={() => setFilter(f as any)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === f ? 'bg-[#0a192f] text-white shadow-xl' : 'bg-white text-slate-400 border border-blue-50 hover:bg-sky-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6 max-h-[700px] overflow-y-auto pr-4 no-scrollbar">
            {recipes.length > 0 ? recipes.map((r) => (
              <button 
                key={r.id} 
                onClick={() => handleSelect(r)}
                className={`w-full p-8 rounded-[48px] border-2 transition-all flex items-start gap-6 group text-left ${
                  selectedRecipe?.id === r.id ? 'bg-white border-blue-500 shadow-2xl' : 'bg-white/60 border-blue-50 hover:border-blue-200'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  selectedRecipe?.id === r.id ? 'bg-blue-600 text-white' : 'bg-sky-50 text-blue-600 group-hover:bg-blue-100'
                }`}>
                  <r.icon className="w-6 h-6" />
                </div>
                <div className="flex-grow space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase text-blue-500 tracking-widest">{r.category}</span>
                    <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Stage {r.stage}</span>
                  </div>
                  <h4 className="text-xl font-black text-[#0a192f] uppercase leading-tight group-hover:text-blue-600 transition-colors">{r.title}</h4>
                  <div className="text-[10px] font-black uppercase text-emerald-500 tracking-widest flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {r.benefit}
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 transition-all mt-4 ${selectedRecipe?.id === r.id ? 'text-blue-600 translate-x-1' : 'text-slate-200'}`} />
              </button>
            )) : (
              <div className="text-center py-24 bg-white/40 rounded-[56px] border-2 border-dashed border-slate-200">
                <Soup className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-sm font-black uppercase text-slate-400">No matching meal paths</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 bg-white rounded-[64px] border border-blue-50 shadow-3xl overflow-hidden min-h-[700px] flex flex-col relative">
            {selectedRecipe ? (
              <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-500">
                <div className="p-12 space-y-10">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4">
                       <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-black text-[10px] uppercase tracking-widest">
                          {selectedRecipe.category} Path Implementation
                       </div>
                       <h3 className="text-4xl font-black text-[#0a192f] uppercase tracking-tight leading-[1.1]">{selectedRecipe.title}</h3>
                    </div>
                    <div className="text-right">
                       <div className="text-xl font-black text-blue-600">{selectedRecipe.macros.split('|')[2].trim()}</div>
                       <div className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Glycemic Impact</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                       <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] border-b border-slate-100 pb-2">Ingredients</h5>
                       <ul className="space-y-4">
                         {selectedRecipe.ingredients.map((ing, i) => (
                           <li key={i} className="flex items-start gap-3 group">
                             <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                             <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{ing}</span>
                           </li>
                         ))}
                       </ul>
                    </div>
                    <div className="space-y-6">
                       <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] border-b border-slate-100 pb-2">Preparation</h5>
                       <div className="space-y-6">
                         {selectedRecipe.steps.map((step, i) => (
                           <div key={i} className="flex gap-4">
                             <div className="text-xs font-black text-blue-600 bg-blue-50 w-6 h-6 rounded-lg flex items-center justify-center shrink-0">{i+1}</div>
                             <p className="text-xs font-medium leading-relaxed text-slate-500">{step}</p>
                           </div>
                         ))}
                       </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto bg-slate-900/5 p-12 border-t border-slate-100 flex flex-col gap-8">
                  <div className="flex items-center justify-between gap-6">
                    <div className="space-y-1">
                      <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Implementation Visual</div>
                      <p className="text-xs font-medium text-slate-500">Synthesize a gourmet visual for your digital twin simulation.</p>
                    </div>
                    <button 
                      onClick={() => generateRecipeImage(selectedRecipe.title)}
                      disabled={isLoading}
                      className="bg-blue-600 text-white px-10 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkle className="w-4 h-4" />} Visualize Implementation
                    </button>
                  </div>
                  
                  <div className="bg-[#0a192f] rounded-[40px] aspect-video relative overflow-hidden flex items-center justify-center group">
                    {isLoading ? (
                      <div className="flex flex-col items-center gap-4 text-white">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                        <p className="text-xs font-black uppercase tracking-[0.3em]">{status}</p>
                      </div>
                    ) : imageUrl ? (
                      <img src={imageUrl} alt="Gourmet Detail" className="w-full h-full object-cover animate-in zoom-in-95 duration-1000" />
                    ) : (
                      <div className="text-center space-y-4 px-12">
                         <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto"><ImageIcon className="w-10 h-10 text-white/10" /></div>
                         <p className="text-[10px] font-black uppercase text-sky-100/20 tracking-[0.2em] leading-relaxed">
                           Simulation Ready. Initialize to render anatomical implementation visual.
                         </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center p-12 text-center space-y-8">
                 <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
                    <UtensilsCrossed className="w-24 h-24 text-blue-100 relative z-10" />
                 </div>
                 <div className="space-y-4 relative z-10">
                    <h3 className="text-3xl font-black text-[#0a192f] uppercase tracking-tight">Select Meal Path</h3>
                    <p className="text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">
                      Choose a stage-compatible meal option from the implementation list to view detailed ingredients and anatomical simulation.
                    </p>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ViewWrapper>
  );
};

// --- Digital Twin Blueprint Component ---
const DigitalTwinBlueprint = ({ userData, stage, setView }: { userData: UserData, stage: MetabolicStage, setView: (v: AppView) => void }) => {
  const vascularAge = calculateVascularAge(userData.age, stage, userData.vascularAdjustment || 0);
  const sensitivity = getInsulinSensitivity(stage);

  return (
    <ViewWrapper title="Digital Twin Blueprint™" subtitle="Synchronized simulation of your metabolic performance.">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[56px] border border-blue-50 shadow-xl space-y-8">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white"><Dna className="w-6 h-6" /></div>
                 <h3 className="text-2xl font-black uppercase tracking-tight text-[#0a192f]">Vitality Delta Analysis</h3>
              </div>
              <SourceBadge type="Clinical" />
           </div>
           
           <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-1">
                   <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Chronological Bio-Identity</div>
                   <div className="text-4xl font-black text-[#0a192f]">{userData.age} <span className="text-sm uppercase text-slate-400">Years</span></div>
                </div>
                <div className="p-8 bg-sky-50 rounded-[40px] border border-blue-100 flex items-center justify-between">
                   <div>
                      <div className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Projected Vascular Age</div>
                      <div className="text-5xl font-black text-rose-500">{vascularAge} <span className="text-sm uppercase opacity-50">Years</span></div>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Vitality Delta</div>
                      <div className="text-2xl font-black text-rose-500">+{vascularAge - userData.age}Y</div>
                   </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-1">
                   <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Receptor Efficiency</div>
                   <h4 className="text-xl font-black text-[#0a192f] uppercase">Insulin Sensitivity</h4>
                </div>
                <div className="relative pt-6">
                  <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-rose-500 w-[38%]" />
                    <div className="h-full bg-amber-500 w-[26%]" />
                    <div className="h-full bg-emerald-500 w-[36%]" />
                  </div>
                  <div 
                    className="absolute top-2 transition-all duration-1000"
                    style={{ left: `${sensitivity}%`, transform: 'translateX(-50%)' }}
                  >
                    <div className="w-1 h-8 bg-[#0a192f] rounded-full shadow-lg" />
                    <div className="bg-[#0a192f] text-white text-[9px] font-black px-3 py-1 rounded-full mt-2 shadow-xl whitespace-nowrap uppercase">
                      Your Efficiency: {sensitivity}%
                    </div>
                  </div>
                </div>
                <p className="text-xs font-medium text-slate-500 leading-relaxed italic">
                  HOMA-IR Proxy Analysis: Your stage indicates a pattern of resistance at the cellular gateway.
                </p>
              </div>
           </div>
        </div>

        <div className="bg-[#0a192f] p-10 rounded-[56px] text-white flex flex-col justify-between relative overflow-hidden text-left group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3">
              <BellRing className="w-8 h-8 text-blue-400 animate-pulse" />
              <h3 className="text-xl font-black uppercase tracking-tight">Agentic Alerts</h3>
            </div>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4 group-hover:border-blue-500/30 transition-all">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Priority Nudge</span>
              </div>
              <p className="text-xs font-bold leading-relaxed text-sky-50">
                "Elevated HOMA-IR detected. Prioritize CGA-rich botanical infusion."
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-sky-200/40">Vascular State</span>
                <span className="text-lg font-black text-emerald-400">Stiffening</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-sky-200/40">Glucose Load</span>
                <span className="text-lg font-black text-white">{userData.hba1c}%</span>
              </div>
            </div>
          </div>
          <button className="relative z-10 w-full py-5 rounded-2xl bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-500 transition-all active:scale-95 shadow-xl">
            Sync Real-time Sensors
          </button>
        </div>
      </div>
    </ViewWrapper>
  );
};

// --- Exercise Paths Component ---
const ExercisePath = ({ stage, userData, onComplete }: { stage: MetabolicStage, userData: UserData | null, onComplete: (p: 'yoga' | 'regular' | 'taichi') => void }) => {
  const [selectedPath, setSelectedPath] = useState<'Normal' | 'Yoga' | 'Tai-Chi'>('Normal');
  const { videoUrl, setVideoUrl, isLoading, status, generateExerciseVideo } = useAIExecution(userData);

  const pathContent = useMemo(() => {
    switch (selectedPath) {
      case 'Yoga': 
        const yp = yogaProtocols[stage];
        return {
          title: "Yoga Path Protocol",
          name: yp.name,
          desc: yp.desc,
          focus: yp.focus,
          duration: `${yp.duration / 60}m`,
          citation: yp.citation,
          icon: Flower2,
          steps: [yp.name],
          id: 'yoga'
        };
      case 'Tai-Chi':
        return {
          title: "Tai-Chi Path Protocol",
          name: "Flowing Balance Form",
          desc: "Low-impact internal martial art focused on vagal tone and mindful weight shifting.",
          focus: "Autonomic Balance & Endothelial Shear Stress",
          duration: "15m",
          citation: "Tai Chi has been shown to reduce HbA1c by an average of 0.8% in Stage II implementations.",
          icon: Waves,
          steps: taiChiSteps.map(s => s.name),
          id: 'taichi'
        };
      default:
        return {
          title: "Normal (Base) Protocol",
          name: "Zone 2 Steady State",
          desc: "Foundation metabolic exercise designed for systemic mitochondrial biogenesis.",
          focus: "Mitochondrial Capacity & Lactic Buffering",
          duration: "45m",
          citation: "Daily Zone 2 implementation for 45 minutes reduces insulin resistance by 24%.",
          icon: Activity,
          steps: ["Warm-up (5m)", "Steady State Zone 2 Heart Rate (35m)", "Cool-down (5m)"],
          id: 'regular'
        };
    }
  }, [selectedPath, stage]);

  const handleSwitchPath = (p: typeof selectedPath) => {
    setSelectedPath(p);
    setVideoUrl(null);
  };

  return (
    <ViewWrapper title="Exercise Paths" subtitle="Precision vascular reset through isometric and rhythmic protocols.">
      <div className="space-y-12 animate-in fade-in duration-700">
        <div className="grid md:grid-cols-3 gap-6">
          {(['Normal', 'Yoga', 'Tai-Chi'] as const).map((p) => (
            <button 
              key={p} 
              onClick={() => handleSwitchPath(p)}
              className={`p-10 rounded-[48px] border-2 transition-all flex flex-col gap-6 text-left group ${
                selectedPath === p ? 'bg-white border-blue-500 shadow-2xl scale-[1.02]' : 'bg-white/60 border-blue-50 hover:border-blue-200'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                selectedPath === p ? 'bg-blue-600 text-white' : 'bg-sky-50 text-blue-600'
              }`}>
                {p === 'Normal' ? <Activity className="w-6 h-6" /> : p === 'Yoga' ? <Flower2 className="w-6 h-6" /> : <Waves className="w-6 h-6" />}
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-[#0a192f] uppercase tracking-tight">{p} Path</h4>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  {p === 'Normal' ? 'Base mitochondrial clearing.' : p === 'Yoga' ? 'Endocrine messaging focus.' : 'Vagal tone and flow maxima.'}
                </p>
              </div>
              <div className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${selectedPath === p ? 'text-blue-600' : 'text-slate-300'}`}>
                {selectedPath === p ? 'Protocol Active' : 'Select Path'} <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-12 rounded-[56px] border border-blue-50 shadow-xl space-y-10">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-black text-[10px] uppercase tracking-widest">
                    {pathContent.title}
                  </div>
                  <h3 className="text-4xl font-black text-[#0a192f] uppercase tracking-tight leading-[1.1]">{pathContent.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-blue-600">{pathContent.duration}</div>
                  <div className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Session Window</div>
                </div>
              </div>

              <p className="text-sm font-medium text-slate-500 leading-relaxed">{pathContent.desc}</p>

              <div className="space-y-4">
                <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] border-b border-slate-100 pb-2">Module Sequence</h5>
                <ul className="space-y-4">
                  {pathContent.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="text-xs font-black text-blue-600 bg-blue-50 w-6 h-6 rounded-lg flex items-center justify-center shrink-0">{i+1}</div>
                      <span className="text-sm font-bold text-slate-700">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-sky-50/50 rounded-[40px] border border-blue-50 space-y-4">
                <div className="text-[10px] font-black uppercase text-blue-600 tracking-widest flex items-center gap-2">
                  <Target className="w-3 h-3" /> Biological Focus: {pathContent.focus}
                </div>
                <p className="text-xs font-bold text-slate-700 italic leading-relaxed">
                  {pathContent.citation}
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => generateExerciseVideo(pathContent.name)}
                  disabled={isLoading}
                  className="flex-1 py-6 rounded-[28px] bg-[#0a192f] text-white font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />} Synthesize Simulation
                </button>
                <button 
                  onClick={() => onComplete(pathContent.id as any)}
                  className="p-6 rounded-[28px] bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 transition-all active:scale-95"
                >
                  <CheckCircle2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[56px] border border-blue-50 shadow-xl space-y-8">
               <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Related Implementation Tools</h5>
               <div className="grid gap-4">
                  {[
                    { name: 'Vagal Tone HRV Monitor', price: '$199', icon: Heart },
                    { name: 'Somatic Cork Mat', price: '$85', icon: Flower2 }
                  ].map((item, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm"><item.icon className="w-5 h-5" /></div>
                          <div>
                             <div className="text-xs font-black text-[#0a192f] uppercase">{item.name}</div>
                             <div className="text-[10px] font-bold text-blue-600">{item.price}</div>
                          </div>
                       </div>
                       <button className="p-3 bg-white rounded-xl text-slate-300 group-hover:text-blue-600 shadow-sm transition-all"><ShoppingCart className="w-4 h-4" /></button>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#0a192f] rounded-[64px] border border-white/5 shadow-3xl overflow-hidden min-h-[600px] flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent pointer-events-none" />
            
            {isLoading ? (
              <div className="flex flex-col items-center gap-6 text-center text-white px-12 animate-in fade-in duration-300">
                <Loader2 className="w-20 h-20 text-blue-500 animate-spin" />
                <div className="space-y-3">
                  <p className="text-xl font-black uppercase tracking-[0.3em]">{status}</p>
                  <p className="text-sm font-medium text-sky-200/40 max-w-sm mx-auto">
                    Synthesizing anatomical precision paths for your stage-specific {selectedPath} implementation.
                  </p>
                </div>
              </div>
            ) : videoUrl ? (
              <div className="w-full h-full relative animate-in zoom-in duration-700">
                <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-white font-black text-[9px] uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Simulation
                </div>
              </div>
            ) : (
              <div className="text-center space-y-8 px-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
                  <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mx-auto relative z-10 border border-white/10">
                    <Video className="w-12 h-12 text-white/20" />
                  </div>
                </div>
                <div className="space-y-4 relative z-10">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Simulation Engine Ready</h3>
                  <p className="text-sky-100/30 font-medium max-w-sm mx-auto leading-relaxed text-sm">
                    Initialize movement synthesis to render your specific {selectedPath} path anatomical simulation.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ViewWrapper>
  );
};

// --- Community View Components ---
const TribalSourcingView = () => (
  <ViewWrapper title="Smart Tribal Farming: Medicinal and Aromatic Plants (MAP) Value Chain" subtitle="Ethno-botanical heritage and traceability.">
    <div className="space-y-12 text-left">
      <div className="bg-white p-12 rounded-[64px] border border-blue-50 shadow-xl space-y-10 text-left">
        <div className="flex items-center gap-4 text-orange-600 text-left">
          <Users className="w-10 h-10" />
          <h2 className="text-3xl font-black uppercase tracking-tight text-[#0a192f] m-0 leading-[1.35] text-left">The Heritage Protocol</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-16 text-left">
          <div className="space-y-8 text-left">
            <p className="text-xl text-slate-700 leading-relaxed font-medium italic text-left">
              "Smart Tribal Farming: Medicinal and Aromatic Plants (MAP) Value Chain is not just an agricultural technique; it is a metabolic preservation strategy for the 21st century."
            </p>
            <div className="p-8 bg-orange-50/50 rounded-3xl border border-orange-100/50 space-y-4 text-left">
              <div className="flex items-center gap-2 text-left">
                < BookOpen className="w-5 h-5 text-orange-600" />
                <h4 className="text-[11px] font-black uppercase text-orange-600 tracking-widest text-left">Primary Research Citation</h4>
              </div>
              <p className="text-sm font-bold text-slate-800 leading-relaxed text-left">
                <InfoTooltip citation="tribal-farming">Nair, S. K., Gnanamangai, B. M., Kodakkat, V. K., Pillay, R., & Moni, M. ET AL . "Smart Tribal Farming: Medicinal and Aromatic Plants (MAP) Value Chain"</InfoTooltip>
              </p>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium text-left">
              Our sourcing strategy bridges the gap between ancient ethno-botanical wisdom and modern phytochemical verification. By partnering with tribal collectives in India, we ensure that every extract of <InfoTooltip acronym="CGA">CGA</InfoTooltip> and <InfoTooltip acronym="NO2">NO2</InfoTooltip> precursors is grown in bio-dynamic soil, maximizing cellular bioavailability.
            </p>
          </div>
          <div className="relative group text-left">
            <div className="absolute inset-0 bg-orange-600/10 rounded-[48px] -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
            <img 
              src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=1200" 
              alt="Smart Tribal Farming: Medicinal and Aromatic Plants (MAP) Value Chain Heritage" 
              className="w-full h-[500px] object-cover rounded-[48px] shadow-2xl relative z-10 transition-transform duration-500 group-hover:-translate-y-2 text-left" 
            />
          </div>
        </div>
      </div>
    </div>
  </ViewWrapper>
);

const MAPChainView = () => (
  <ViewWrapper title="Smart Tribal Farming: Medicinal and Aromatic Plants (MAP) Value Chain" subtitle="From soil to cellular implementation.">
    <div className="space-y-12 text-left">
      <div className="bg-white p-12 rounded-[64px] border border-blue-50 shadow-xl text-left">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16 text-left">
          <div className="flex items-center gap-4 text-blue-600 text-left">
            <LinkIcon className="w-10 h-10" />
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#0a192f] m-0 leading-[1.35] text-left">MAP Value Chain</h2>
          </div>
          <SourceBadge type="Clinical" urls={["https://map-verification.org/lab-standards"]} />
        </div>
        
        <div className="relative space-y-12 text-left">
          <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-blue-500/50 via-blue-50/50 to-emerald-500/50 hidden md:block" />
          {[
            { step: '01', icon: Sprout, title: 'Ethno-Botanical Sourcing', color: 'text-orange-500', desc: 'Sourced via Smart Tribal Farming: Medicinal and Aromatic Plants (MAP) Value Chain collectives to ensure soil integrity and natural metabolic profile.' },
            { step: '02', icon: FlaskConical, title: 'Phytochemical Extraction', color: 'text-blue-500', desc: 'Low-heat CO2 extraction to preserve volatile compounds including Allicin and Piperine.' },
            { step: '03', icon: TestTube2, title: 'Lab Verification', color: 'text-purple-500', desc: 'Every batch undergoes rigorous <InfoTooltip acronym="GC-MS">GC-MS</InfoTooltip> testing to verify purity and standardized biomarker potency.' },
            { step: '04', icon: Target, title: 'Cellular Implementation', color: 'text-emerald-500', desc: 'Phase 04 focusing on precision delivery to target <InfoTooltip acronym="Wellness Mentor">Wellness Mentor</InfoTooltip> pathways, optimizing <InfoTooltip acronym="HbA1c">HbA1c</InfoTooltip> thresholds.' }
          ].map((item, i) => (
            <div key={i} className="flex gap-10 relative group text-left">
              <div className="hidden md:flex flex-col items-center relative text-left">
                <div className="w-12 h-12 bg-white border-2 border-blue-50 shadow-xl rounded-2xl flex items-center justify-center text-blue-600 z-10 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 text-left">
                  <item.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="pb-12 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 text-left">
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${item.color} text-left`}>Phase {item.step}</span>
                  <div className="w-8 h-px bg-slate-100" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-[1.35] text-left">{item.title}</h3>
                <p className="text-slate-600 font-medium leading-[1.35] max-w-2xl text-lg text-left">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </ViewWrapper>
);

const ClinicalBoardView = () => (
  <ViewWrapper title="Clinical Board & Consortium" subtitle="The governing bodies of The Good Health Standard.">
    <div className="grid md:grid-cols-3 gap-8 text-left">
      {[
        { 
          name: <span><WellnessMentorBrand /> Research Consortium</span>, 
          icon: Building2, 
          role: 'Primary Governance', 
          desc: 'Responsible for the development of agentic Digital Twin simulations and vascular delta algorithms used in Stage II/III reversal.' 
        },
        { 
          name: 'ADA 2025 Standards Committee', 
          icon: Stethoscope, 
          role: 'Metabolic Thresholds', 
          desc: 'Adherence to latest diagnostic criteria for pre-diabetes and metabolic reversal benchmarks defined by ADA 2025.' 
        },
        { 
          name: 'Nature Reviews Endocrinology', 
          icon: BookOpen, 
          role: 'Peer Review Verification', 
          desc: 'Validated protocols for <InfoTooltip acronym="TRE">TRE</InfoTooltip> and isometric glucose transporter activation as published in Nature 2024.' 
        }
      ].map((board, i) => (
        <div key={i} className="bg-white p-12 rounded-[56px] border border-blue-50 shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center text-left">
          <div className="w-20 h-20 bg-sky-50 rounded-3xl flex items-center justify-center text-blue-600 mb-10 shadow-inner text-center"><board.icon className="w-10 h-10" /></div>
          <div className="text-[11px] font-black uppercase text-blue-500 tracking-widest mb-3 text-center">{(board as any).role}</div>
          <h3 className="text-2xl font-black text-[#0a192f] uppercase mb-6 leading-tight min-h-[64px] leading-[1.35] text-center text-left">{(board as any).name}</h3>
          <p className="text-slate-600 text-sm font-bold leading-[1.35] text-center text-left">{(board as any).desc}</p>
          <div className="mt-auto pt-8 text-center text-left">
             <button className="text-[10px] font-black uppercase text-blue-600 tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all text-center">Review Protocol <ArrowRight className="w-3 h-3" /></button>
          </div>
        </div>
      ))}
    </div>
  </ViewWrapper>
);

const ReferenceHub = () => (
  <ViewWrapper title="Scientific References" subtitle="Validated clinical sources and research publications.">
    <div className="bg-white p-12 rounded-[64px] border border-blue-50 shadow-xl space-y-8 text-left">
      <h3 className="text-2xl font-black text-[#0a192f] uppercase tracking-tight">Clinical Standards & Publications</h3>
      <div className="space-y-6">
        {Object.entries(CITATIONS).map(([key, data]) => (
          <div key={key} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-start gap-6 group hover:border-blue-200 transition-all text-left">
            <div className="p-4 bg-white rounded-2xl text-blue-600 shadow-sm"><BookOpen className="w-6 h-6" /></div>
            <div className="space-y-1 text-left">
              <h4 className="text-lg font-black text-[#0a192f] uppercase leading-tight">{data.source}</h4>
              <div className="flex items-center gap-2 text-left">
                <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Released: {data.year}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Citation: {key}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </ViewWrapper>
);

const LegalView = ({ mode, setView }: { mode: 'tc' | 'privacy', setView: (v: AppView) => void }) => (
  <ViewWrapper 
    title={mode === 'tc' ? "Data Sovereignty & Terms" : "Privacy Protocol"} 
    subtitle={mode === 'tc' ? "Implementation standards and user rights." : "Your metabolic identity protection standards."}
  >
    <div className="bg-white p-12 rounded-[64px] border border-blue-50 shadow-xl space-y-10 text-left">
      <div className="space-y-6 text-left">
        <h3 className="text-2xl font-black text-[#0a192f] uppercase">
          {mode === 'tc' ? "Governance & Usage Rights" : "Data Privacy & Security"}
        </h3>
        <p className="text-slate-600 leading-relaxed font-medium text-lg">
          {mode === 'tc' ? 
            "The Wellness Mentor platform operates under the 'Good Health Standard' protocol. Users retain full sovereignty over their metabolic digital twin. Participation is voluntary and implementation results vary based on adherence to the stage-specific protocols. All data generated remains the property of the individual user." :
            "We adhere to strict data sovereignty rules. Your metabolic identity (HbA1c, glucose, age) is processed for digital twin simulation and is protected by industry-standard encryption. We do not sell or distribute personal health information to third-party advertisers."
          }
        </p>
        <div className="mt-12 p-8 bg-blue-50 rounded-[40px] border border-blue-100 flex items-center gap-6 text-left">
          <ShieldCheck className="w-10 h-10 text-blue-600" />
          <div className="space-y-1 text-left">
             <div className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Protocol Verified</div>
             <p className="text-xs font-bold text-slate-700">Validated by the Consortium Governance Board 2025.</p>
          </div>
        </div>
      </div>
      <button onClick={() => setView('home')} className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] hover:gap-4 transition-all text-left">
        <ArrowLeft className="w-4 h-4" /> Return to Command Center
      </button>
    </div>
  </ViewWrapper>
);

const SubscriptionsView = () => (
  <ViewWrapper title="Subscription Tiers" subtitle="Unlock advanced V-PAD digital twin capabilities.">
    <div className="grid md:grid-cols-3 gap-8 text-left">
      {[
        { tier: 'Basic', price: 'Free', features: ['Digital Twin Simulation', 'Stage I Protocols', 'Community Access'], color: 'slate' },
        { tier: 'Advanced', price: '$19/mo', features: ['Stage II/III Reversal Plans', 'AI Nudges', 'Nutritional Visuals'], color: 'blue' },
        { tier: 'Premium', price: '$49/mo', features: ['Priority Mentor Access', 'Biomarker Tracking', 'Value Chain Traceability'], color: 'emerald' }
      ].map((p, i) => (
        <div key={i} className={`bg-white p-12 rounded-[56px] border border-blue-50 shadow-xl hover:-translate-y-2 transition-all flex flex-col text-left`}>
          <div className={`w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-blue-600 mb-8 shadow-inner`}><Zap className="w-6 h-6" /></div>
          <h3 className="text-2xl font-black text-[#0a192f] uppercase mb-2 leading-tight">{p.tier}</h3>
          <div className="text-3xl font-black text-[#0a192f] mb-8">{p.price}</div>
          <div className="space-y-4 mb-10 flex-grow text-left">
            {p.features.map((f, j) => (
              <div key={j} className="flex items-center gap-3 text-left">
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">{f}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-5 rounded-[24px] bg-[#0a192f] text-white font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95 text-center">
            Initialize {p.tier}
          </button>
        </div>
      ))}
    </div>
  </ViewWrapper>
);

const EcommerceView = () => {
  const categories = ['All', 'Ethno-botanicals', 'Wearables', 'Lifestyle', 'Clinical Services'];
  const [selectedCat, setSelectedCat] = useState('All');

  const products = [
    { id: 1, name: 'Standardized CGA Extract', category: 'Ethno-botanicals', price: '$49.00', image: 'https://images.unsplash.com/photo-1611073113567-28d488424244?auto=format&fit=crop&q=80&w=800', tag: 'Metabolic Control', verified: true },
    { id: 2, name: 'Vagal Tone HRV Monitor', category: 'Wearables', price: '$199.00', image: 'https://images.unsplash.com/photo-1557167668-6ebd073f2734?auto=format&fit=crop&q=80&w=800', tag: 'Neural Balance', verified: true },
    { id: 3, name: 'MAP Certified Piperine', category: 'Ethno-botanicals', price: '$34.00', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800', tag: 'Bio-Synergy', verified: true },
    { id: 4, name: 'Cork Yoga Align Mat', category: 'Lifestyle', price: '$85.00', image: 'https://images.unsplash.com/photo-1592433221973-195cc1a9e9a4?auto=format&fit=crop&q=80&w=800', tag: 'Eco-Grip', verified: true },
    { id: 5, name: 'Clinical Delta Consult', category: 'Clinical Services', price: '$150.00', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800', tag: 'Expert Analysis', verified: true },
    { id: 6, name: 'Smart Infusion Tumbler', category: 'Lifestyle', price: '$45.00', image: 'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&q=80&w=800', tag: 'Hydration', verified: true },
    { id: 7, name: 'Bio-Sourced Magnesium Complex', category: 'Ethno-botanicals', price: '$38.00', image: 'https://images.unsplash.com/photo-1584017947486-538676bb9d45?auto=format&fit=crop&q=80&w=800', tag: 'Sleep & Muscle', verified: true },
    { id: 8, name: 'Deep Somatic Breath Trainer', category: 'Wearables', price: '$129.00', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800', tag: 'Vagal Tone', verified: true }
  ];

  const filteredProducts = selectedCat === 'All' ? products : products.filter(p => p.category === selectedCat);

  return (
    <ViewWrapper title="Wellness Store" subtitle="Verified metabolic products & services guided by AI.">
      <div className="space-y-12 text-left">
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar text-left">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCat(cat)}
              className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap text-left ${
                selectedCat === cat ? 'bg-[#0a192f] text-white shadow-xl' : 'bg-white text-slate-400 hover:bg-sky-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-left">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-[48px] overflow-hidden border border-blue-50 shadow-lg group hover:shadow-2xl transition-all duration-500 text-left">
              <div className="relative h-64 overflow-hidden text-left">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 text-left" />
                <div className="absolute top-6 left-6 flex flex-col gap-2 text-left">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-blue-600 shadow-sm text-left">{product.tag}</span>
                  {product.verified && (
                    <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm text-left">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
              </div>
              <div className="p-8 space-y-6 text-left">
                <div className="space-y-2 text-left">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-left">Category: {product.category}</div>
                  <h3 className="text-xl font-black text-[#0a192f] leading-tight uppercase leading-[1.35] text-left">{product.name}</h3>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 text-left">
                  <span className="text-2xl font-black text-[#0a192f] text-left">{product.price}</span>
                  <button className="bg-sky-50 p-4 rounded-2xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all active:scale-90">
                    <ShoppingBag className="w-6 h-6" />
                  </button>
                </div>
                <button className="w-full py-4 rounded-2xl border-2 border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2 text-center">
                  <FileSearch className="w-4 h-4" /> View Lab Certificate
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0a192f] rounded-[64px] p-16 text-white text-center space-y-8 relative overflow-hidden text-left">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-emerald-600/10 text-left" />
          <BrainCircuit className="w-16 h-16 text-blue-400 mx-auto animate-pulse text-center" />
          <h3 className="text-4xl font-black uppercase tracking-tight relative z-10 leading-[1.35] text-center text-left">AI Sourcing Protocol</h3>
          <p className="text-sky-100/60 max-w-2xl mx-auto font-medium text-lg leading-[1.35] relative z-10 text-center text-left">
            Every product in this marketplace undergoes strict <InfoTooltip acronym="GC-MS">GC-MS verification</InfoTooltip> to ensure phytochemical integrity and metabolic safety for your specific blueprint.
          </p>
          <div className="text-center text-left">
            <button className="bg-white text-[#0a192f] px-12 py-5 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-sky-50 transition-all relative z-10 shadow-2xl active:scale-95 text-center">
              View Store Governance
            </button>
          </div>
        </div>
      </div>
    </ViewWrapper>
  );
};

// --- Contact Us Modal ---
const ContactUsModal = ({ userData, onClose }: { userData: UserData | null, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: userData?.name || '', email: '', message: '' });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:info@padivayal.com?subject=Wellness Mentor Support Request - ${formData.name}&body=Sender: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ATime: ${currentTime.toLocaleString()}%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = mailtoUrl;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-slate-900/95 backdrop-blur-xl animate-in fade-in duration-500 text-left">
      <div className="bg-white w-full max-w-xl rounded-[48px] overflow-hidden shadow-4xl border border-blue-50 flex flex-col text-left">
        <div className="bg-slate-900 p-8 text-white flex items-center justify-between text-left">
          <div className="flex items-center gap-4 text-left">
             <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center"><Mail className="w-6 h-6" /></div>
             <div className="text-left">
                <h2 className="text-xl font-black uppercase tracking-tight m-0 leading-none text-white text-left"><WellnessMentorBrand /></h2>
                <div className="flex items-center gap-2 mt-2 opacity-50 text-left">
                   <CalendarClock className="w-3 h-3" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-left">{currentTime.toLocaleString()}</span>
                </div>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSend} className="p-10 space-y-8 text-left">
          <div className="grid gap-6 text-left">
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 text-left">User Identity</label>
              <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Your Full Name" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-left" />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 text-left">Communication Endpoint</label>
              <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="your@email.com" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-left" />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 text-left">Message / Query</label>
              <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="How can our implementation team assist you?" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none text-left" />
            </div>
          </div>
          <div className="flex gap-4 text-left">
             <button type="button" onClick={onClose} className="flex-1 py-5 rounded-2xl bg-slate-50 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">Cancel</button>
             <button type="submit" className="flex-[2] py-5 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-3">
               Initialize Send <SendHorizontal className="w-4 h-4" />
             </button>
          </div>
          <p className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Programmed to dispatch to info@padivayal.com</p>
        </form>
      </div>
    </div>
  );
};

// --- Enhanced AI Wellness Mentor Chat Bot ---
const MentorChat = ({ userData, stage, inline = false, openCounter = 0, onClose: onWindowClose, view }: any) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(true); 
  const [isMaximized, setIsMaximized] = useState(false);
  const [pos, setPos] = useState({ x: window.innerWidth - 420, y: window.innerHeight - 660 });
  const [dragging, setDragging] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Welcome to your V-PAD™ Implementation Session. I am your Wellness Mentor. How can I assist your metabolic health strategy today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dragRef = useRef({ offsetX: 0, offsetY: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isMinimized]);

  useEffect(() => { setIsMinimized(true); }, [view]);

  useEffect(() => {
    if (openCounter > 0) {
      setIsVisible(true);
      setIsMinimized(false);
    }
  }, [openCounter]);

  useEffect(() => {
    if (inline || isMaximized) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) setPos({ x: e.clientX - dragRef.current.offsetX, y: e.clientY - dragRef.current.offsetY });
    };
    const handleMouseUp = () => setDragging(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, inline, isMaximized]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const faqContext = MASTER_FAQ.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n');
      const systemInstruction = `
        You are the Wellness Mentor™ for the V-PAD platform.
        Guidelines: Be scientific, supportive, and implementation-focused.
        Context: ${userData?.name || 'User'}, Stage ${stage || 'I'}, HbA1c ${userData?.hba1c || 'Unknown'}%.
        Prioritize lower insulin load, TRE, and Exercise Paths.
        Reference CGA and NO2 precursors where relevant.
        Source of Truth (MASTER_FAQ): Use the following data to answer high-level queries:
        ${faqContext}
      `;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, { role: 'user', text: userMsg }].map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        config: { systemInstruction }
      });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "Communication disruption in V-PAD value chain. Please reconnect." }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "Connectivity error. Please check your metabolic network." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible && !inline) return null;
  const windowClasses = inline 
    ? "bg-white rounded-[48px] border-2 border-blue-50 h-[600px] flex flex-col overflow-hidden shadow-2xl relative text-left" 
    : `fixed bg-white/95 backdrop-blur-xl rounded-[48px] border-2 border-blue-100 shadow-4xl z-[100] transition-all duration-300 overflow-hidden flex flex-col text-left ${isMaximized ? 'inset-4 w-auto h-auto' : isMinimized ? 'h-20 w-80' : 'h-[600px] w-[400px]'}`;

  return (
    <div className={windowClasses} style={(inline || isMaximized) ? {} : { left: `${pos.x}px`, top: `${pos.y}px` }}>
      <div onMouseDown={(e) => { if (!inline && !isMaximized) { setDragging(true); dragRef.current = { offsetX: e.clientX - pos.x, offsetY: e.clientY - pos.y }; } }} className={`flex items-center justify-between p-6 text-left ${!inline ? 'cursor-grab active:cursor-grabbing bg-sky-50/80 border-b border-blue-50 text-left' : 'bg-slate-900 text-white text-left'}`}>
        <div className="flex items-center gap-3 text-left">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg text-left ${inline ? 'bg-blue-600 text-left' : 'bg-slate-900 text-white text-left'}`}><BrainCircuit className="w-5 h-5 text-left" /></div>
          <div className="text-left">
            <h4 className={`font-black uppercase text-[11px] tracking-widest m-0 leading-none text-left ${inline ? 'text-white text-left' : 'text-[#0a192f] text-left'}`}><WellnessMentorBrand /></h4>
            <div className={`flex items-center gap-1.5 mt-1 text-left ${inline ? 'text-blue-400 text-left' : 'text-emerald-500 text-left'}`}><div className={`w-1.5 h-1.5 rounded-full animate-pulse text-left ${inline ? 'bg-blue-400 text-left' : 'bg-emerald-500 text-left'}`} /><span className="text-[8px] font-black uppercase tracking-widest text-left">Active Mentor Agent</span></div>
          </div>
        </div>
        {!inline && (
          <div className="flex items-center gap-2 text-left">
            <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="p-2 hover:bg-blue-100 rounded-xl transition-colors text-slate-400 hover:text-blue-600 text-left">{isMinimized ? <Maximize2 className="w-4 h-4 text-left" /> : <MinusSquare className="w-4 h-4 text-left" />}</button>
            <button onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); setIsMinimized(false); }} className="p-2 hover:bg-blue-100 rounded-xl transition-colors text-slate-400 hover:text-blue-600 text-left">{isMaximized ? <Minimize2 className="w-4 h-4 text-left" /> : <Maximize2 className="w-4 h-4 text-left" />}</button>
            <button onClick={(e) => { e.stopPropagation(); setIsVisible(false); onWindowClose?.(); }} className="p-2 hover:bg-rose-100 rounded-xl transition-colors text-slate-400 hover:text-rose-600 text-left"><X className="w-4 h-4 text-left" /></button>
          </div>
        )}
      </div>
      {(!isMinimized || inline) && (
        <><div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 scroll-smooth no-scrollbar text-left">{messages.map((m, i) => (<div key={i} className={`flex ${m.role === 'user' ? 'justify-end text-left' : 'justify-start text-left'} animate-in fade-in slide-in-from-bottom-2 duration-300 text-left`}><div className={`max-w-[85%] rounded-[32px] p-6 shadow-sm border text-left ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none border-blue-50 text-left' : 'bg-sky-50 text-[#0a192f] rounded-tl-none border-sky-100 text-left'}`}><p className="text-xs font-bold leading-relaxed whitespace-pre-wrap leading-[1.35] text-left">{(m as any).text}</p></div></div>))}{isLoading && (<div className="flex justify-start animate-pulse text-left"><div className="bg-slate-100 rounded-full px-6 py-3 flex gap-2 items-center border border-slate-200 text-left"><div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce text-left" /><div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s] text-left" /><div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s] text-left" /></div></div>)}</div><div className="p-8 bg-slate-50/50 border-t border-slate-100 text-left"><form onSubmit={handleSendMessage} className="relative flex gap-3 text-left"><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask your implementation strategy..." className="w-full bg-white border border-slate-200 rounded-[24px] pl-8 pr-16 py-5 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-400 text-left" disabled={isLoading} /><button type="submit" disabled={isLoading || !input.trim()} className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-90 disabled:opacity-50 disabled:grayscale text-left">{isLoading ? <Loader2 className="w-5 h-5 animate-spin text-left" /> : <SendHorizontal className="w-5 h-5 text-left" />}</button></form><div className="mt-4 flex justify-between items-center px-4 text-left"><p className="text-[8px] font-black uppercase text-slate-400 tracking-widest leading-[1.35] text-left">Powered by <VPADTM /> Intelligence</p>{userData && (<div className="flex items-center gap-2 text-left"><span className="text-[8px] font-black uppercase text-blue-500 tracking-widest leading-[1.35] text-left">Stage {stage} Context Active</span></div>)}</div></div></>
      )}
    </div>
  );
};

// --- User Profile Modal Component ---
const UserProfileModal = ({ userData, onClose, onUpdate }: { userData: UserData, onClose: () => void, onUpdate: (data: UserData) => void }) => {
  const [formData, setFormData] = useState<UserData>({ ...userData });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: (name === 'age' || name === 'glucose' || name === 'hba1c') ? parseFloat(value) || 0 : value }));
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-xl animate-in fade-in duration-500 text-left">
      <div className="bg-white w-full max-w-2xl rounded-[56px] p-12 shadow-3xl relative overflow-hidden flex flex-col max-h-[90vh] text-left">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-left" />
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 transition-colors"><X className="w-6 h-6" /></button>
        <div className="space-y-10 overflow-y-auto no-scrollbar pb-6 text-left">
          <div className="flex items-center gap-6 text-left">
            <div className="w-20 h-20 bg-sky-50 rounded-3xl flex items-center justify-center text-blue-600 shadow-inner text-left text-center"><UserCheck className="w-10 h-10 text-center" /></div>
            <div className="space-y-1 text-left">
              <h2 className="text-3xl font-black uppercase tracking-tight text-[#0a192f] m-0 leading-[1.35] text-left">{(formData as any).name}</h2>
              <div className="flex items-center gap-2 text-left"><span className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-left">{(formData as any).subscriptionTier} Tier</span><span className="text-slate-400 text-[10px] font-bold flex items-center gap-1 text-left"><Calendar className="w-3 h-3 text-left" /> Valid until: {(formData as any).validUntil || 'N/A'}</span></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-left"><Shield className="w-4 h-4 text-blue-500 text-left" /><h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-left">Bio-Identity</h4></div>
              <div className="space-y-4 text-left">
                <div className="space-y-1 text-left"><label className="text-[9px] font-black uppercase text-slate-400 ml-4 tracking-widest text-left">Chronological Age</label><input name="age" type="number" value={(formData as any).age} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-left" /></div>
                <div className="space-y-1 text-left"><label className="text-[9px] font-black uppercase text-slate-400 ml-4 tracking-widest text-left">Sex Bio-Identity</label><select name="sex" value={(formData as any).sex} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-left"><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option><option value="Neutral">Neutral</option></select></div>
                <div className="space-y-1 text-left"><label className="text-[9px] font-black uppercase text-slate-400 ml-4 tracking-widest text-left">Race / Ancestry</label><input name="race" type="text" value={(formData as any).race} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-left" /></div>
              </div>
            </div>
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-left"><Activity className="w-4 h-4 text-emerald-500 text-left" /><h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-left">Metabolic Biomarkers</h4></div>
              <div className="space-y-4 text-left">
                <div className="space-y-1 text-left"><label className="text-[9px] font-black uppercase text-slate-400 ml-4 tracking-widest flex items-center gap-1 text-left"><Droplets className="w-3 h-3 text-left" /> Blood Glucose (mg/dL)</label><input name="glucose" type="number" value={(formData as any).glucose} onChange={handleChange} placeholder="Add missing data" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-left" /></div>
                <div className="space-y-1 text-left"><label className="text-[9px] font-black uppercase text-slate-400 ml-4 tracking-widest flex items-center gap-1 text-left"><Dna className="w-3 h-3 text-left" /> HbA1c Level (%)</label><input name="hba1c" type="number" step="0.1" value={(formData as any).hba1c} onChange={handleChange} placeholder="Add missing data" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-left" /></div>
                <p className="text-[9px] text-slate-400 italic leading-relaxed pt-2 leading-[1.35] text-left">* Note: Accurate biomarkers refine your Digital Twin's <VPADTM /> Dynamics and Stage alignment.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto pt-8 flex gap-4 text-left"><button onClick={onClose} className="flex-1 py-5 rounded-3xl bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-200 transition-all active:scale-95 text-center">Cancel</button><button onClick={() => onUpdate(formData)} className="flex-2 py-5 px-12 rounded-3xl bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-500 shadow-2xl shadow-blue-100 transition-all active:scale-95 text-center">Refine Digital Twin Profile</button></div>
      </div>
    </div>
  );
};

// --- User Auth Modal Component ---
const UserAuthModal = ({ mode, onClose, onSwitchMode, onSuccess }: { mode: AuthMode, onClose: () => void, onSwitchMode: (m: AuthMode) => void, onSuccess: (name: string) => void }) => {
  const [name, setName] = useState('');
  if (!mode) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-xl animate-in fade-in duration-500 text-left">
      <div className="bg-white w-full max-w-md rounded-[56px] p-12 shadow-3xl relative overflow-hidden text-center text-left">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-left" />
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 transition-colors"><X className="w-6 h-6" /></button>
        <div className="space-y-10 text-center text-left"><div className="text-center space-y-3 text-left"><div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6 text-center text-left"><User className="w-8 h-8 text-center" /></div><h2 className="text-3xl font-black uppercase tracking-tight text-[#0a192f] m-0 leading-[1.35] text-center text-left">{mode === 'login' ? 'Welcome Back' : 'Join Platform'}</h2><p className="text-blue-600/60 font-medium leading-[1.35] text-center text-left">Access your metabolic twin profile.</p></div><div className="space-y-6 text-left"><div className="space-y-2 text-left"><label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-6 block text-left">Display Identity</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" className="w-full px-8 py-5 rounded-[24px] bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold transition-all text-left" /></div></div><button onClick={() => { if (name) onSuccess(name); }} className="w-full py-6 bg-[#0a192f] text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 shadow-2xl transition-all active:scale-90 text-center">{mode === 'login' ? 'Authorize Session' : 'Create Blueprint'}</button><div className="text-center text-left"><button onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')} className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline text-center">{mode === 'login' ? "New implementation? Sign Up" : "Existing profile? Log In"}</button></div></div>
      </div>
    </div>
  );
};

// --- Footer Component ---
const Footer = ({ setView, onOpenContact }: { setView: (v: AppView) => void, onOpenContact: () => void }) => (
  <footer className="bg-[#0a192f] text-white py-24 px-6 border-t border-white/5 text-left">
    <div className="max-w-6xl mx-auto text-left">
      <div className="grid md:grid-cols-4 gap-16 pb-20 border-b border-white/5 text-left">
        <div className="col-span-1 space-y-8 text-left">
          <div className="flex items-center gap-3 text-left"><Activity className="text-blue-500 w-8 h-8 text-left" /><span className="font-black text-2xl uppercase tracking-tight text-white leading-[1.35] text-left"><WellnessMentorBrand /></span></div>
          <p className="text-sky-100/40 text-sm font-medium leading-[1.35] max-w-xs text-left">Optimizing the metabolic exercise gap through advanced AI agentic assistance, enabled by the AI powered <VPADTM /> experience & value platform.</p>
        </div>
        <div className="space-y-6 text-left">
          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 text-left">Platform</h5>
          <div className="flex flex-col gap-4 text-left">
            <button onClick={() => setView('blueprint')} className="text-left text-sm font-bold text-sky-200/50 hover:text-white transition-colors uppercase tracking-widest text-left">Blueprint Twin</button>
            <button onClick={() => setView('mentor')} className="text-left text-sm font-bold text-sky-200/50 hover:text-white transition-colors uppercase tracking-widest text-left">Intelligence Hub</button>
            <button onClick={() => setView('kitchen')} className="text-left text-sm font-bold text-sky-200/50 hover:text-white transition-colors uppercase tracking-widest text-left">Nutrition</button>
            <button onClick={() => setView('exercise')} className="text-left text-sm font-bold text-sky-200/50 hover:text-white transition-colors uppercase tracking-widest text-left">Exercise Blueprint</button>
            <button onClick={() => setView('ecommerce')} className="text-left text-sm font-bold text-sky-200/50 hover:text-white transition-colors uppercase tracking-widest text-left">Wellness Store</button>
          </div>
        </div>
        <div className="space-y-6 text-left">
          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 text-left">Community & Science</h5>
          <div className="flex flex-col gap-4 text-left">
            <button onClick={() => setView('tribal-sourcing')} className="text-left text-sm font-bold text-sky-200/50 hover:text-white transition-colors uppercase tracking-widest text-left">Smart Tribal Farming</button>
            <button onClick={() => setView('map-chain')} className="text-left text-sm font-bold text-sky-200/50 hover:text-white transition-colors uppercase tracking-widest text-left">MAP Value Chain</button>
            <button onClick={() => setView('clinical-board')} className="text-left text-sm font-bold text-sky-200/50 hover:text-white transition-colors uppercase tracking-widest text-left">Clinical Board</button>
            <button onClick={() => setView('references')} className="text-left text-sm font-bold text-sky-200/50 hover:text-white transition-colors uppercase tracking-widest text-left">Scientific References</button>
          </div>
        </div>
        <div className="space-y-6 text-left">
          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 text-left">Governance</h5>
          <div className="flex flex-col gap-4 text-left">
            <button onClick={() => setView('faq')} className="text-left text-sm font-bold text-sky-200/50 hover:text-white transition-colors uppercase tracking-widest text-left">FAQ</button>
            <button onClick={() => setView('legal-privacy')} className="text-left text-sm font-bold text-sky-200/50 hover:text-white transition-colors uppercase tracking-widest text-left">Privacy Protocol</button>
            <button onClick={() => setView('legal-tc')} className="text-left text-sm font-bold text-sky-200/50 hover:text-white transition-colors uppercase tracking-widest text-left">Data Sovereignty</button>
            <button onClick={() => setView('subscriptions')} className="text-left text-sm font-bold text-sky-200/50 hover:text-white transition-colors uppercase tracking-widest text-left">Subscription Tiers</button>
            <button onClick={() => setView('recovery')} className="text-left text-sm font-bold text-sky-200/50 hover:text-white transition-colors uppercase tracking-widest text-left">Recovery Path</button>
            <button onClick={onOpenContact} className="text-left text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest text-left">Contact Us</button>
          </div>
        </div>
      </div>
      <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-left">
        <div className="flex items-center gap-4 text-left"><ShieldCheck className="w-5 h-5 text-blue-900/40 text-left" /><p className="text-[10px] font-normal uppercase tracking-widest leading-[1.35] text-left">Validated by The Good Health Standard Implementation Protocol 2025</p></div>
        <div className="text-right space-y-2 text-left"><div className="space-y-1 text-left"><p className="text-[11px] font-black uppercase tracking-widest text-sky-50 leading-[1.35] text-left"><WellnessMentorBrand /></p><p className="text-[10px] font-bold uppercase tracking-widest text-sky-100/80 leading-[1.35] text-left"><VPADTM /> | Padivayal Enterprise</p></div><div className="pt-2 border-t border-white/5 space-y-1 text-left"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-200/70 leading-[1.35] text-left">© 2025. All Rights Reserved.</p><p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-200/70 leading-[1.35] text-left">Email: info@padivayal.com</p></div></div>
      </div>
    </div>
  </footer>
);

const SearchModal = ({ isOpen, onClose, query, setView }: { isOpen: boolean, onClose: () => void, query: string, setView: (v: AppView) => void }) => {
  if (!isOpen) return null;
  const faqResults = MASTER_FAQ.filter(f => f.question.toLowerCase().includes(query.toLowerCase()) || f.answer.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-xl animate-in fade-in duration-500 text-left">
      <div className="bg-white w-full max-w-2xl rounded-[56px] p-12 shadow-3xl relative overflow-hidden flex flex-col max-h-[80vh] text-left">
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600"><X className="w-6 h-6" /></button>
        <div className="space-y-8 overflow-y-auto no-scrollbar text-left">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6 text-left"><Search className="w-8 h-8 text-blue-600" /><div className="space-y-1 text-left"><h2 className="text-2xl font-black uppercase tracking-tight text-[#0a192f]">Platform Search</h2><p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Query: "{query}"</p></div></div>
          {faqResults.length > 0 && (<div className="space-y-4 text-left"><h5 className="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em]">Knowledge Base Results</h5>{faqResults.map((faq, i) => (<button key={`faq-res-${i}`} onClick={() => { setView('faq'); onClose(); }} className="w-full p-6 rounded-3xl bg-sky-50/50 border border-blue-50 hover:bg-blue-50 transition-all flex flex-col gap-2 text-left"><span className="font-bold text-slate-900 text-sm uppercase tracking-tight">{faq.question}</span><span className="text-[10px] text-slate-500 line-clamp-1">{faq.answer}</span></button>))}</div>)}
          <div className="space-y-4 text-left"><h5 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">System Navigation</h5>{['Home', 'Blueprint', 'Intelligence Hub', 'Nutrition', 'Exercise Paths', 'Recovery'].map((item, i) => (<button key={i} onClick={() => { const v = item.toLowerCase().includes('intelligence') ? 'mentor' : item.toLowerCase().includes('exercise') ? 'exercise' : item.toLowerCase().includes('nutrition') ? 'kitchen' : item.toLowerCase() as AppView; setView(v); onClose(); }} className="w-full p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-blue-50 hover:border-blue-100 transition-all flex items-center justify-between group text-left"><span className="font-black text-slate-900 uppercase tracking-tight">{item}</span><ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600" /></button>))}</div>
        </div>
      </div>
    </div>
  );
};

const SessionSummaryModal = ({ impact, beforeAge, afterAge, onClose }: { impact: number, beforeAge: number, afterAge: number, onClose: () => void }) => (
  <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-slate-900/95 backdrop-blur-2xl animate-in fade-in duration-500 text-left">
    <div className="bg-white w-full max-w-lg rounded-[64px] p-12 shadow-4xl relative overflow-hidden text-center space-y-10 text-left"><div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-emerald-500 to-blue-500" /><div className="w-24 h-24 bg-emerald-50 rounded-[32px] flex items-center justify-center text-emerald-600 mx-auto shadow-inner text-center"><Award className="w-12 h-12" /></div><div className="space-y-4 text-center"><h2 className="text-4xl font-black uppercase tracking-tight text-[#0a192f]">Protocol Synergy!</h2><p className="text-slate-500 font-medium leading-relaxed">Multi-path completion detected. V-PAD™ adjustment applied to your Digital Twin.</p></div><div className="grid grid-cols-2 gap-6 p-8 bg-sky-50 rounded-[40px] border border-blue-100 text-center"><div className="space-y-1"><div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Previous Bio-Age</div><div className="text-3xl font-black text-slate-400 line-through decoration-rose-500/30">{beforeAge}</div></div><div className="space-y-1"><div className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Optimized Bio-Age</div><div className="text-3xl font-black text-[#0a192f]">{afterAge}</div></div></div><div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-emerald-200 mx-auto"><TrendingDown className="w-4 h-4" /> Vascular Impact: -{impact} Units</div><button onClick={onClose} className="w-full py-6 bg-[#0a192f] text-white rounded-[32px] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 shadow-2xl transition-all active:scale-95 text-center">Accept Optimization</button></div>
  </div>
);

const Home = ({ userData, stage, setView, setAuthMode, onOpenMentor }: { userData: UserData | null, stage: MetabolicStage | null, setView: (v: AppView) => void, setAuthMode: (m: AuthMode) => void, onOpenMentor: () => void }) => {
  return (
    <ViewWrapper>
      <div className="space-y-24 text-left">
        <section className="relative h-[75vh] max-h-[700px] flex items-center justify-center overflow-hidden rounded-[80px] mt-8 bg-[#0a192f] text-left">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-slate-950 text-left" />
          <div className="relative z-10 text-center flex flex-col items-center px-6 max-w-5xl text-left"><h1 className="text-[44px] md:text-[56px] font-semibold text-white tracking-tighter uppercase leading-[1.2] animate-in fade-in slide-in-from-bottom-2 duration-700 text-center text-left"><VPADTM /> Wellness Mentor</h1><p className="mt-16 text-[20px] md:text-[24px] font-normal text-sky-100/70 leading-[1.35] max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 text-center text-left"><span className="font-bold">AI-Enabled</span> <span className="font-bold">Digital Twin</span> Guidance for <span className="font-bold">Metabolic Health</span> Optimization</p><div className="mt-12 text-[16px] md:text-[18px] font-medium tracking-[0.25em] uppercase text-blue-400 leading-[1.35] animate-in fade-in slide-in-from-bottom-6 duration-1000 text-center text-left">Personalized Metabolic Blueprints for Nutrition, Exercise, and Recovery</div><div className="mt-24 flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 text-center"><button onClick={() => userData ? setView('blueprint') : setAuthMode('signup')} className="bg-blue-600 text-white px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-2xl active:scale-95 flex items-center gap-3 text-left">Digital Twin Blueprint <Dna className="w-4 h-4" /></button><button onClick={() => { if (userData) { onOpenMentor(); } else { alert("Please log in to access your account and interact with the Wellness Mentor."); setAuthMode('login'); } }} className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95 flex items-center gap-3 text-left">Wellness Mentor <BrainCircuit className="w-4 h-4" /></button></div></div>
        </section>

        <section className="grid md:grid-cols-4 gap-8 text-left">
          {[{ icon: BrainCircuit, title: "Intelligence Hub", desc: "Live voice mentoring for real-time biological masterclass.", view: 'mentor' as AppView }, { icon: UtensilsCrossed, title: "Precision Kitchen", desc: "Stage-specific recipes mapped to your metabolic twin.", view: 'kitchen' as AppView }, { icon: Activity, title: "Exercise Paths", desc: "Consolidated exercise path for vascular reset.", view: 'exercise' as AppView }, { icon: Wind, title: "Recovery Path", desc: "Manage sympathetic drive and arterial flexibility.", view: 'recovery' as AppView }].map((f, i) => (
            <div key={i} onClick={() => setView(f.view)} className="group p-10 bg-white rounded-[56px] border border-blue-50 shadow-xl hover:-translate-y-2 transition-all cursor-pointer text-left"><div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all mb-8 text-left"><f.icon className="w-6 h-6" /></div><h3 className="text-xl font-black text-[#0a192f] uppercase mb-4 leading-[1.35] text-left">{f.title}</h3><p className="text-xs text-blue-600/60 font-medium leading-[1.35] mb-8 text-left">{f.desc}</p><div className="flex items-center gap-2 text-blue-600 font-black text-[9px] uppercase tracking-widest text-left">Execute Module <ChevronRight className="w-4 h-4" /></div></div>
          ))}
        </section>

        {/* Home Page FAQ Section */}
        <section className="bg-white rounded-[64px] border border-blue-50 shadow-xl overflow-hidden p-8 md:p-16 text-left">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-black text-[#0a192f] uppercase tracking-tight leading-[1.35]">Wellness Mentor FAQ™</h2>
              <p className="text-slate-500 font-medium leading-relaxed">Understand the core principles of metabolic optimization through our clinical Source of Truth.</p>
            </div>
            <FAQAccordion limit={5} />
            <div className="text-center pt-4">
              <button onClick={() => setView('faq')} className="inline-flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all">View Full Knowledge Base <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        </section>
      </div>
    </ViewWrapper>
  );
};

// ... (LiveVoiceCoaching implementation)
const LiveVoiceCoaching = ({ userData, stage }: { userData: UserData | null, stage: MetabolicStage | null }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [modelTranscription, setModelTranscription] = useState("");
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const streamRef = useRef<MediaStream | null>(null);
  const sessionPromiseRef = useRef<any>(null);

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputAudioContext;
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) { int16[i] = inputData[i] * 32768; }
              const pcmBlob = { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
              sessionPromise.then((session) => { session.sendRealtimeInput({ media: pcmBlob }); });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message) => {
            if (message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
              const base64 = message.serverContent.modelTurn.parts[0].inlineData.data;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContext.currentTime);
              const buffer = await decodeAudioData(decode(base64), outputAudioContext, 24000, 1);
              const source = outputAudioContext.createBufferSource();
              source.buffer = buffer;
              source.connect(outputAudioContext.destination);
              source.addEventListener('ended', () => sourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }
            if (message.serverContent?.inputTranscription) { setTranscription(prev => (prev + " " + message.serverContent?.inputTranscription?.text).trim()); }
            if (message.serverContent?.outputTranscription) { setModelTranscription(prev => (prev + " " + message.serverContent?.outputTranscription?.text).trim()); }
            if (message.serverContent?.turnComplete) { setTranscription(""); setModelTranscription(""); }
            if (message.serverContent?.interrupted) { for (const s of sourcesRef.current) { s.stop(); } sourcesRef.current.clear(); nextStartTimeRef.current = 0; }
          },
          onclose: () => { setIsActive(false); setIsConnecting(false); },
          onerror: () => { setIsActive(false); setIsConnecting(false); }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: `You are the Wellness Mentor™. Provide real-time metabolic coaching based on the user's digital twin blueprint. Focus on lower insulin load and boosting vagal tone.`,
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } }
        }
      });
      sessionPromiseRef.current = sessionPromise;
    } catch (err) { console.error(err); setIsConnecting(false); }
  };

  const stopSession = () => {
    sessionPromiseRef.current?.then((s: any) => s.close());
    streamRef.current?.getTracks().forEach(t => t.stop());
    setIsActive(false);
  };

  return (
    <div className="bg-[#0a192f] rounded-[48px] p-10 text-white relative overflow-hidden border border-white/5 shadow-2xl h-full flex flex-col justify-center text-center text-left">
      <div className="absolute top-0 right-0 p-12 opacity-10 text-left"><Waves className="w-32 h-32 animate-pulse" /></div>
      <div className="relative z-10 flex flex-col items-center gap-8 text-center text-left">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700 text-center ${isActive ? 'bg-blue-600 shadow-[0_0_50px_rgba(37,99,235,0.4)]' : 'bg-white/10'}`}>
          {isActive ? <Mic className="w-10 h-10 animate-bounce" /> : <MicOff className="w-10 h-10 text-slate-500" />}
        </div>
        <div className="space-y-3 text-center text-left">
          <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-[1.35] text-center text-left">Live Voice Coaching</h3>
          <p className="text-sky-200/60 text-sm font-medium max-w-xs leading-[1.35] text-center text-left">Real-time metabolic optimization via low-latency AI conversation.</p>
        </div>
        {isActive && (
          <div className="w-full bg-white/5 rounded-3xl p-6 min-h-[120px] flex flex-col justify-center gap-4 text-left border border-white/10 animate-in fade-in zoom-in-95 text-left">
            <div className="flex gap-3 text-left"><User className="w-4 h-4 text-blue-400 shrink-0 text-left" /><p className="text-xs font-medium text-sky-100/70 italic leading-[1.35] text-left">{transcription || "Listening..."}</p></div>
            <div className="flex gap-3 border-t border-white/5 pt-4 text-left"><Activity className="w-4 h-4 text-emerald-400 shrink-0 text-left" /><p className="text-xs font-bold text-white leading-[1.35] text-left">{modelTranscription || "Mentor is thinking..."}</p></div>
          </div>
        )}
        <button onClick={isActive ? stopSession : startSession} disabled={isConnecting} className={`w-full py-6 rounded-3xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 text-center ${isActive ? 'bg-rose-600 hover:bg-rose-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {isConnecting ? <Loader2 className="w-5 h-5 animate-spin" /> : isActive ? <><VolumeX className="w-5 h-5" /> Terminate Session</> : <><Volume2 className="w-5 h-5" /> Start Call</>}
        </button>
      </div>
    </div>
  );
};

const IntelligenceHubTitle = () => <span className="text-left">Intelligence Hub <VPADTM /></span>;

function App() {
  const [view, setView] = useState<AppView>('home');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mentorOpenCounter, setMentorOpenCounter] = useState(0);
  const [history, setHistory] = useState<AppView[]>(['home']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [sessionCompletedPaths, setSessionCompletedPaths] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [lastSessionImpact, setLastSessionImpact] = useState(0);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [view]);

  const stage = useMemo(() => {
    if (!userData) return 'I';
    if (userData.hba1c && userData.hba1c >= 6.5) return 'III';
    if (userData.hba1c && userData.hba1c >= 5.7) return 'II';
    return 'I';
  }, [userData]);

  const navigateTo = (newView: AppView) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newView);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setView(newView);
  };

  const renderView = () => {
    switch(view) {
      case 'home': return <Home userData={userData} stage={stage} setView={navigateTo} setAuthMode={setAuthMode} onOpenMentor={() => setMentorOpenCounter(prev => prev + 1)} />;
      case 'mentor': return <IntelligenceHub userData={userData} stage={stage} setView={navigateTo} />;
      case 'blueprint': return <DigitalTwinBlueprint userData={userData || DEMO_USER} stage={stage} setView={navigateTo} />;
      case 'kitchen': return <GlobalKitchen userData={userData} stage={stage} />;
      case 'exercise': return <ExercisePath stage={stage} userData={userData} onComplete={(path) => {
        setSessionCompletedPaths(prev => {
          const next = [...prev, path];
          const unique = Array.from(new Set(next));
          if (unique.includes('yoga') && unique.includes('regular')) {
            const impact = calculateSessionImpact(next);
            setLastSessionImpact(impact);
            setShowSummary(true);
            if (userData) setUserData(curr => ({ ...curr!, vascularAdjustment: (curr!.vascularAdjustment || 0) + impact }));
          }
          return next;
        });
      }} />;
      case 'references': return <ReferenceHub />;
      case 'legal-tc': return <LegalView mode="tc" setView={navigateTo} />;
      case 'legal-privacy': return <LegalView mode="privacy" setView={navigateTo} />;
      case 'tribal-sourcing': return <TribalSourcingView />;
      case 'map-chain': return <MAPChainView />;
      case 'clinical-board': return <ClinicalBoardView />;
      case 'subscriptions': return <SubscriptionsView />;
      case 'ecommerce': return <EcommerceView />;
      case 'recovery': return <RecoveryPath />;
      case 'faq': return <FAQView />;
      default: return <Home userData={userData} stage={stage} setView={navigateTo} setAuthMode={setAuthMode} onOpenMentor={() => setMentorOpenCounter(prev => prev + 1)} />;
    }
  };

  return (
    <div className="min-h-screen bg-sky-50/20 font-sans text-slate-900 selection:bg-blue-100 text-left">
      <div className="fixed top-[82px] left-8 z-[60] flex items-center text-left"><div className="flex gap-2 text-left"><button onClick={() => { if (historyIndex > 0) { const prevIdx = historyIndex - 1; setHistoryIndex(prevIdx); setView(history[prevIdx]); } }} disabled={historyIndex === 0} className={`p-2 rounded-full backdrop-blur-md shadow-sm border transition-all text-left ${historyIndex === 0 ? 'bg-white/20 text-slate-300 border-transparent cursor-not-allowed' : 'bg-white/80 text-[#0a192f] border-slate-100 hover:bg-white active:scale-90 cursor-pointer'}`} title="Back"><ChevronLeft className="w-5 h-5 text-left" /></button><button onClick={() => { if (historyIndex < history.length - 1) { const nextIdx = historyIndex + 1; setHistoryIndex(nextIdx); setView(history[nextIdx]); } }} disabled={historyIndex === history.length - 1} className={`p-2 rounded-full backdrop-blur-md shadow-sm border transition-all text-left ${historyIndex === history.length - 1 ? 'bg-white/20 text-slate-300 border-transparent cursor-not-allowed' : 'bg-white/80 text-[#0a192f] border-slate-100 hover:bg-white active:scale-90 cursor-pointer'}`} title="Forward"><ChevronRight className="w-5 h-5 text-left" /></button></div></div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-blue-50 px-6 py-5 text-left">
        <div className="max-w-6xl mx-auto flex items-center h-10 text-left relative">
          <div className="flex-1 flex items-center justify-start text-left"><div onClick={() => navigateTo('home')} className="flex items-center gap-3 cursor-pointer group shrink-0"><div className="w-9 h-9 bg-[#0a192f] rounded-xl flex items-center justify-center text-white transition-transform group-hover:rotate-12"><Activity className="w-5 h-5" /></div><span className="font-black text-lg uppercase tracking-tighter text-[#0a192f] leading-none"><WellnessMentorBrand /></span></div></div>
          <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-7 shrink-0 text-left">{[{ id: 'home', label: 'Home' }, { id: 'blueprint', label: 'Blueprint' }, { id: 'mentor', label: 'Intelligence Hub' }, { id: 'kitchen', label: 'Nutrition' }, { id: 'exercise', label: 'Exercise' }, { id: 'ecommerce', label: 'Store' }, { id: 'recovery', label: 'Recovery' }, { id: 'faq', label: 'FAQ' }].map(item => (<button key={(item as any).id} onClick={() => { if (item.id === 'blueprint' && !userData) setAuthMode('signup'); else navigateTo(item.id as AppView); }} className={`text-[9px] font-black uppercase tracking-[0.18em] transition-all hover:text-blue-700 whitespace-nowrap ${view === (item as any).id ? 'text-blue-700' : 'text-slate-600'}`}>{(item as any).label}</button>))}</div>
          <div className="flex-1 flex items-center justify-end gap-3 shrink-0 text-left"><form onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) setIsSearchOpen(true); }} className="relative hidden xl:block"><input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-sky-50/50 border border-slate-100 rounded-full px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest w-24 focus:w-32 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none" /><button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-blue-600"><Search className="w-3 h-3" /></button></form><div className="h-6 w-px bg-slate-100 mx-1 hidden md:block" />{userData ? (<div className="flex items-center gap-2"><button onClick={() => setIsProfileOpen(true)} className="flex items-center gap-2 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-xl border border-blue-100 transition-all active:scale-95 group" title="Profile"><div className="w-5 h-5 bg-blue-600 rounded-lg flex items-center justify-center text-white"><User className="w-3 h-3" /></div><span className="text-[8px] font-black uppercase tracking-widest text-[#0a192f] max-w-[60px] truncate">{(userData as any).name}</span></button><button onClick={() => { setUserData(null); navigateTo('home'); }} className="p-1.5 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-xl transition-all active:scale-90" title="Logout"><LogOut className="w-3.5 h-3.5" /></button></div>) : (<div className="flex items-center gap-1"><button onClick={() => setAuthMode('login')} className="text-[8px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 px-2 py-1.5">Login</button><button onClick={() => setAuthMode('signup')} className="bg-blue-600 text-white px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 active:scale-95 transition-all">Sign Up</button></div>)}</div>
        </div>
      </nav>
      <main className="pt-24 min-h-screen text-left">{renderView()}</main>
      <Footer setView={navigateTo} onOpenContact={() => setIsContactOpen(true)} />
      <UserAuthModal mode={authMode} onClose={() => setAuthMode(null)} onSwitchMode={setAuthMode} onSuccess={(name) => { setUserData({ name, age: 45, sex: 'Male', race: 'Global', hba1c: 6.2, glucose: 104, subscriptionTier: 'Premium', validUntil: '2026-12-31', vascularAdjustment: 0 }); navigateTo('blueprint'); setAuthMode(null); }} />
      {userData && <MentorChat userData={userData} stage={stage} openCounter={mentorOpenCounter} view={view} />}
      {isProfileOpen && userData && (<UserProfileModal userData={userData} onClose={() => setIsProfileOpen(false)} onUpdate={(updatedData) => { setUserData(updatedData); setIsProfileOpen(false); }} />)}
      {isContactOpen && (<ContactUsModal userData={userData} onClose={() => setIsContactOpen(false)} />)}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} query={searchQuery} setView={navigateTo} />
      {showSummary && userData && (<SessionSummaryModal impact={lastSessionImpact} beforeAge={calculateVascularAge((userData as any).age, stage, ((userData as any).vascularAdjustment || 0) - lastSessionImpact)} afterAge={calculateVascularAge((userData as any).age, stage, (userData as any).vascularAdjustment || 0)} onClose={() => { setShowSummary(false); setSessionCompletedPaths([]); }} />)}
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);