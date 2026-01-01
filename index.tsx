
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
// Correct import from @google/genai
import { GoogleGenAI, Modality, Type, GenerateContentResponse, Chat } from "@google/genai";

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
        // GUIDELINE: Assume success and proceed to the app
      }

      setStatus("Synthesizing metabolic animation...");
      // GUIDELINE: Create a new GoogleGenAI instance right before making an API call
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
        // GUIDELINE: Append API key when fetching from the download link
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

// --- High Fidelity Banner Component ---
const ImplementationBanner = ({ setView }: { setView: (v: AppView) => void }) => (
  <div className="relative overflow-hidden rounded-[80px] bg-slate-900 text-white border border-white/5 shadow-4xl min-h-[550px] flex flex-col group animate-in fade-in duration-700">
    <div className="absolute inset-0 z-0 overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1545208393-596371ba9ac8?auto=format&fit=crop&q=80&w=2000" 
        className="w-full h-full object-cover opacity-30 transform group-hover:scale-105 transition-transform duration-10000" 
        alt="Wellness Environment" 
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/60 to-transparent" />
    </div>

    <div className="relative z-10 flex-grow grid lg:grid-cols-12 p-10 md:p-20 gap-12 items-center">
      <div className="lg:col-span-2 flex flex-col gap-10 justify-center border-r border-white/10 pr-10">
         {[
           { icon: Dna, label: "DIGITAL TWIN", target: 'blueprint' as AppView },
           { icon: Heart, label: "DIABETES & CVD CARE", target: 'clinical-board' as AppView },
           { icon: Activity, label: "EXERCISE", target: 'exercise' as AppView },
           { icon: Salad, label: "NUTRITION", target: 'kitchen' as AppView }
         ].map((item, i) => (
           <div key={i} onClick={() => setView(item.target)} className="flex flex-col items-center gap-3 group/icon cursor-pointer">
             <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/icon:bg-blue-600/30 group-hover/icon:border-blue-500 transition-all duration-300 shadow-xl">
               <item.icon className="w-6 h-6 text-blue-400 group-hover/icon:text-white" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-widest text-sky-100/40 group-hover/icon:text-white transition-colors text-center">{item.label}</span>
           </div>
         ))}
      </div>

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

         <div className="relative group/mockup">
            <div className="absolute -inset-10 bg-blue-500/10 blur-[100px] rounded-full opacity-50 group-hover/mockup:opacity-100 transition-opacity" />
            <div className="w-[300px] bg-white rounded-[4rem] p-4 shadow-4xl border-[12px] border-slate-900 relative z-10">
               <div className="bg-slate-50 rounded-[3.5rem] overflow-hidden flex flex-col min-h-[480px]">
                  <div className="p-8 space-y-8 flex-grow">
                     <div onClick={() => setView('blueprint')} className="flex items-center justify-between text-[11px] font-black uppercase text-slate-400 cursor-pointer hover:text-blue-600 transition-colors">
                       <ChevronLeft className="w-4 h-4" />
                       <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-blue-600" /> Wellness Charge</span>
                       <span className="text-blue-600">30 / 36</span>
                     </div>
                     <div onClick={() => setView('kitchen')} className="space-y-4 text-center cursor-pointer group/plan">
                        <h4 className="text-2xl font-black text-[#0a192f] uppercase leading-tight tracking-tight group-hover/plan:text-blue-600 transition-colors">Metabolism & <br/> Nutrition Plan</h4>
                        <div className="w-40 h-40 bg-white rounded-full mx-auto shadow-inner flex items-center justify-center p-4 overflow-hidden">
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
                        <button onClick={() => setView('kitchen')} className="w-full py-5 bg-[#0a192f] text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-600 transition-all">View Meal Plan</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>

    <div className="relative z-10 bg-white py-10 px-8 text-center border-t border-white/10 shadow-2xl">
      <h3 className="text-2xl md:text-4xl font-black text-[#0a192f] uppercase tracking-tighter">
        BRIDGE THE GAP: RESEARCH TO DAILY WELLNESS IMPLEMENTATION
      </h3>
    </div>
  </div>
);

// --- Intelligence Hub Component ---
const IntelligenceHub = ({ userData, stage, setView }: { userData: UserData | null, stage: MetabolicStage, setView: (v: AppView) => void }) => (
  <ViewWrapper title={<IntelligenceHubTitle />} subtitle="Scientific orchestration of your metabolic performance pathways.">
    <div className="space-y-12 animate-in fade-in duration-700">
      <ImplementationBanner setView={setView} />
      <div className="grid lg:grid-cols-2 gap-12">
        <LiveVoiceCoaching userData={userData} stage={stage} />
        <div className="space-y-8">
           <div className="bg-white p-12 rounded-[56px] border border-blue-50 shadow-xl space-y-8 h-full flex flex-col">
              <div className="flex items-center gap-5">
                 <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner"><Cpu className="w-7 h-7" /></div>
                 <h4 className="text-2xl font-black uppercase tracking-tight text-[#0a192f]">Digital Twin Progress</h4>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed text-lg flex-grow">
                Synchronized agentic analysis of your metabolic velocity. Monitor vascular age projection and receptor efficiency in real-time.
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

// --- MISSING COMPONENTS IMPLEMENTATION ---

// Digital Twin Blueprint Component
const DigitalTwinBlueprint = ({ userData, stage, setView }: { userData: UserData, stage: MetabolicStage, setView: (v: AppView) => void }) => {
  const vascularAge = calculateVascularAge(userData.age, stage, userData.vascularAdjustment || 0);
  const insulinSensitivity = getInsulinSensitivity(stage);

  return (
    <ViewWrapper title="Metabolic Digital Twin™" subtitle="Vascular age simulation based on current biomarkers.">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white rounded-[64px] p-12 shadow-xl border border-blue-50 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white">
              <UserCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase text-slate-900">{userData.name}</h3>
              <p className="text-blue-500 font-bold text-xs uppercase tracking-widest">Digital Identity Verified</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-3xl space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chronological Age</span>
              <div className="text-3xl font-black text-slate-900">{userData.age}</div>
            </div>
            <div className="p-6 bg-blue-600 rounded-3xl space-y-1 text-white">
              <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Vascular Age</span>
              <div className="text-3xl font-black">{vascularAge}</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Biomarker Telemetry</h4>
            <div className="space-y-3">
              {[
                { label: 'HbA1c', value: `${userData.hba1c}%`, status: stage === 'I' ? 'Optimal' : stage === 'II' ? 'Warning' : 'Critical' },
                { label: 'Insulin Sensitivity', value: `${insulinSensitivity}%`, status: stage === 'I' ? 'High' : 'Reduced' },
                { label: 'V-PAD Adjustment', value: `-${userData.vascularAdjustment || 0} Years`, status: 'Active' }
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl">
                  <span className="text-sm font-bold text-slate-600">{m.label}</span>
                  <div className="text-right">
                    <div className="text-sm font-black text-slate-900">{m.value}</div>
                    <div className={`text-[9px] font-black uppercase ${m.status === 'Optimal' || m.status === 'Active' ? 'text-emerald-500' : 'text-amber-500'}`}>{m.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#0a192f] rounded-[64px] p-12 text-white border border-white/5 shadow-2xl space-y-8">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center"><Zap className="w-6 h-6" /></div>
               <h3 className="text-xl font-black uppercase">Optimization Levers</h3>
             </div>
             <p className="text-sky-100/60 leading-relaxed font-medium">Your metabolic twin is currently at <span className="text-blue-400 font-bold">Stage {stage}</span>. Execute the following pathways to decelerate vascular decay.</p>
             <div className="space-y-4">
               {[
                 { icon: Salad, title: 'Nutritional Reset', desc: 'Eliminate blood disrupters for 30 days.', target: 'kitchen' as AppView },
                 { icon: Activity, title: 'Exercise Path', desc: 'Nitric oxide and vagal tone stimulation.', target: 'exercise' as AppView },
                 { icon: Wind, title: 'Recovery Focus', desc: 'Sympathetic drive management.', target: 'recovery' as AppView }
               ].map((l, i) => (
                 <button key={i} onClick={() => setView(l.target)} className="w-full flex items-center gap-4 p-5 rounded-[32px] bg-white/5 hover:bg-white/10 transition-all text-left border border-white/5">
                   <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-blue-400"><l.icon className="w-5 h-5" /></div>
                   <div className="flex-grow">
                     <div className="text-sm font-black uppercase tracking-tight">{l.title}</div>
                     <div className="text-[10px] text-sky-100/40">{l.desc}</div>
                   </div>
                   <ChevronRight className="w-4 h-4 text-white/20" />
                 </button>
               ))}
             </div>
          </div>
        </div>
      </div>
    </ViewWrapper>
  );
};

// Global Kitchen Component
const GlobalKitchen = ({ userData, stage }: { userData: UserData | null, stage: MetabolicStage }) => {
  const { imageUrl, isLoading, status, generateRecipeImage } = useAIExecution(userData);
  const recipes = [
    { title: "Mediterranean Salmon with CGA-Rich Greens", stage: ["I", "II"], desc: "High omega-3 profile with chlorogenic acid for glucose management." },
    { title: "Keto-Activated Avocado & Turmeric Bowl", stage: ["II", "III"], desc: "Anti-inflammatory fats designed to reset insulin sensitivity." },
    { title: "Cruciferous Fiber Reset", stage: ["I", "II", "III"], desc: "Phase 1 detox support for vascular cleaning." }
  ].filter(r => r.stage.includes(stage));

  return (
    <ViewWrapper title="Precision Kitchen™" subtitle="Metabolic orchestration through biological nutrition.">
      <div className="space-y-12">
        <div className="grid md:grid-cols-3 gap-8">
          {recipes.map((r, i) => (
            <div key={i} className="bg-white rounded-[48px] overflow-hidden shadow-xl border border-blue-50 group hover:-translate-y-2 transition-all">
              <div className="aspect-square bg-slate-100 relative overflow-hidden">
                <img src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600&sig=${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={r.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <button onClick={() => generateRecipeImage(r.title)} className="bg-white/20 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/30 transition-all">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "AI Visualization"}
                  </button>
                </div>
              </div>
              <div className="p-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase">Stage {stage} Compatible</div>
                <h3 className="text-xl font-black text-slate-900 uppercase leading-tight">{r.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{r.desc}</p>
                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">Prepare Recipe</button>
              </div>
            </div>
          ))}
        </div>
        {imageUrl && (
          <div className="bg-white p-12 rounded-[64px] shadow-2xl border border-blue-100 animate-in fade-in zoom-in-95">
             <h4 className="text-xl font-black uppercase mb-6 flex items-center gap-3"><Sparkles className="w-6 h-6 text-blue-500" /> AI Culinary Visualization</h4>
             <img src={imageUrl} className="w-full rounded-[48px] shadow-lg" alt="AI Recipe" />
          </div>
        )}
      </div>
    </ViewWrapper>
  );
};

// Exercise Path Component
const ExercisePath = ({ stage, userData, onComplete }: { stage: MetabolicStage, userData: UserData | null, onComplete: (path: string) => void }) => {
  const { videoUrl, isLoading, status, generateExerciseVideo } = useAIExecution(userData);
  const currentYoga = yogaProtocols[stage];

  return (
    <ViewWrapper title="Exercise Paths™" subtitle="Vascular performance through rhythmic stimulation.">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-white rounded-[56px] p-12 shadow-xl border border-blue-50 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black uppercase text-slate-900 flex items-center gap-3"><Dumbbell className="w-8 h-8 text-blue-600" /> Yoga Flow</h3>
              <span className="text-[10px] font-black px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full uppercase tracking-widest">Primary Lever</span>
            </div>
            <div className="space-y-4">
               <div className="p-8 bg-slate-50 rounded-[40px] space-y-4">
                 <div className="text-blue-600 font-black uppercase text-xs tracking-widest">{currentYoga.name}</div>
                 <h4 className="text-xl font-black text-slate-900">{currentYoga.focus}</h4>
                 <p className="text-slate-500 text-sm leading-relaxed italic">"{currentYoga.desc}"</p>
                 <SourceBadge type="Clinical" citation="yoga-hba1c" customText={currentYoga.citation} />
               </div>
               <button onClick={() => { generateExerciseVideo(currentYoga.name); onComplete('yoga'); }} className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3">
                 {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Begin Sequence <Play className="w-4 h-4" /></>}
               </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
           {videoUrl ? (
             <div className="bg-black rounded-[56px] overflow-hidden shadow-2xl aspect-video relative group">
               <video src={videoUrl} controls autoPlay className="w-full h-full object-cover" />
               <div className="absolute top-6 left-6 p-4 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">Metabolic Simulation Active</div>
             </div>
           ) : (
             <div className="bg-slate-900 rounded-[56px] aspect-video flex flex-col items-center justify-center p-12 text-center text-white/20 border border-white/5 shadow-inner">
               <Video className="w-16 h-16 mb-6 opacity-10" />
               <p className="text-sm font-bold uppercase tracking-widest">{status || "Initialize sequence to view AI visualization"}</p>
             </div>
           )}
        </div>
      </div>
    </ViewWrapper>
  );
};

// Recovery Path Component
const RecoveryPath = () => (
  <ViewWrapper title="Recovery Path™" subtitle="Autonomic balance and arterial flexibility reset.">
    <div className="grid md:grid-cols-2 gap-12">
      <div className="bg-white p-12 rounded-[56px] shadow-xl border border-blue-50 space-y-8">
        <div className="flex items-center gap-5">
           <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner"><Moon className="w-7 h-7" /></div>
           <h4 className="text-2xl font-black uppercase tracking-tight text-[#0a192f]">Sleep Architecture</h4>
        </div>
        <p className="text-slate-500 font-medium leading-relaxed text-lg italic">"Optimizing deep sleep phases for glucose clearance and neural inflammation cooling."</p>
        <div className="space-y-4">
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-600">Parasympathetic Tone</span>
            <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-emerald-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0a192f] p-12 rounded-[56px] shadow-2xl text-white space-y-8">
        <h3 className="text-xl font-black uppercase">Vagal Tone Protocol</h3>
        <p className="text-sky-100/60 leading-relaxed font-medium">Execute the 4-7-8 breathing sequence to trigger immediate arterial relaxation.</p>
        <button className="w-full py-6 rounded-3xl bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-500 transition-all">Start Session</button>
      </div>
    </div>
  </ViewWrapper>
);

// Placeholder Components for secondary views
const ReferenceHub = () => <ViewWrapper title="Reference Hub" subtitle="Complete clinical and academic documentation." />;
const LegalView = ({ mode, setView }: { mode: 'tc' | 'privacy', setView: (v: AppView) => void }) => (
  <ViewWrapper title={mode === 'tc' ? "Terms & Conditions" : "Privacy Policy"} subtitle="Governance and data sovereignty standards.">
    <div className="bg-white p-12 rounded-[64px] shadow-xl border border-blue-50 space-y-8 max-w-4xl mx-auto">
      <div className="prose prose-slate max-w-none">
        <h3 className="text-xl font-black uppercase text-slate-900">1. Data Sovereignty</h3>
        <p className="text-slate-600 font-medium">All metabolic data is owned exclusively by the user. Wellness Mentor™ acts only as an implementation agent.</p>
        <h3 className="text-xl font-black uppercase text-slate-900 mt-8">2. Liability</h3>
        <p className="text-slate-600 font-medium">This platform provides educational simulations and research-based implementation pathways. Consult your clinical board for medical interventions.</p>
      </div>
      <button onClick={() => setView('home')} className="inline-flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all">Return to Home <ArrowLeft className="w-4 h-4" /></button>
    </div>
  </ViewWrapper>
);
const TribalSourcingView = () => <ViewWrapper title="Tribal Sourcing™" subtitle="Traceable, high-purity botanical supply chains." />;
const MAPChainView = () => <ViewWrapper title="MAP Chain™" subtitle="Metabolic Analytics & Provenance Blockchain." />;
const ClinicalBoardView = () => <ViewWrapper title="Clinical Board" subtitle="Expert oversight and validation protocols." />;
const SubscriptionsView = () => <ViewWrapper title="Subscriptions" subtitle="Tiered access to advanced metabolic tools." />;
const EcommerceView = () => <ViewWrapper title="Global Store" subtitle="Verified phytochemicals and biometric hardware." />;

// Footer Component
const Footer = ({ setView, onOpenContact }: { setView: (v: AppView) => void, onOpenContact: () => void }) => (
  <footer className="bg-slate-900 text-white py-24 px-6 border-t border-white/5">
    <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><Activity className="w-4 h-4" /></div>
          <span className="font-black text-lg uppercase tracking-tighter"><WellnessMentorBrand /></span>
        </div>
        <p className="text-sky-100/40 text-xs font-medium leading-relaxed uppercase tracking-widest">
          Bridging clinical research with real-world implementation.
        </p>
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-8">Navigation</h4>
        <div className="flex flex-col gap-4">
          {['Home', 'Blueprint', 'Intelligence Hub', 'Nutrition', 'Exercise'].map((l, i) => (
            <button key={i} onClick={() => setView(l.toLowerCase().replace(' ', '-') as AppView)} className="text-xs font-bold text-sky-100/60 hover:text-white transition-colors text-left uppercase tracking-widest">{l}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-8">Support</h4>
        <div className="flex flex-col gap-4">
          <button onClick={onOpenContact} className="text-xs font-bold text-sky-100/60 hover:text-white transition-colors text-left uppercase tracking-widest">Contact Us</button>
          <button onClick={() => setView('faq')} className="text-xs font-bold text-sky-100/60 hover:text-white transition-colors text-left uppercase tracking-widest">Knowledge Base</button>
        </div>
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-8">Legal</h4>
        <div className="flex flex-col gap-4">
          <button onClick={() => setView('legal-tc')} className="text-xs font-bold text-sky-100/60 hover:text-white transition-colors text-left uppercase tracking-widest">Terms & Conditions</button>
          <button onClick={() => setView('legal-privacy')} className="text-xs font-bold text-sky-100/60 hover:text-white transition-colors text-left uppercase tracking-widest">Privacy Policy</button>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-24 pt-12 border-t border-white/5 text-center">
      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-sky-100/20">© 2025 WELLNESS MENTOR • V-PAD™ POWERED SYSTEM • ALL RIGHTS RESERVED</p>
    </div>
  </footer>
);

// User Authentication Modal
const UserAuthModal = ({ mode, onClose, onSwitchMode, onSuccess }: { mode: AuthMode, onClose: () => void, onSwitchMode: (m: AuthMode) => void, onSuccess: (name: string) => void }) => {
  if (!mode) return null;
  const [name, setName] = useState('');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-[64px] overflow-hidden shadow-3xl border border-white/10 p-16 space-y-8 animate-in zoom-in-95 duration-300">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-blue-600 rounded-[32px] mx-auto flex items-center justify-center text-white shadow-2xl shadow-blue-500/30">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-[#0a192f]">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-slate-500 font-medium">Secure access to your Metabolic Digital Twin™.</p>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6">Your Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter full name" className="w-full px-8 py-6 rounded-[32px] bg-slate-50 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold text-slate-900" />
          </div>
          <button onClick={() => onSuccess(name || 'Implementer One')} className="w-full py-6 bg-blue-600 text-white rounded-[32px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-500 transition-all active:scale-95">
            {mode === 'login' ? 'Authorize Access' : 'Initialize Blueprint'}
          </button>
          <div className="text-center">
            <button onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')} className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700">
              {mode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mentor Chat Widget
const MentorChat = ({ userData, stage, openCounter, view }: { userData: UserData, stage: MetabolicStage, openCounter: number, view: AppView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => { if (openCounter > 0) setIsOpen(true); }, [openCounter]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      if (!chatRef.current) {
        chatRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: `You are the Wellness Mentor™. You are guiding ${userData.name}, who is at Metabolic Stage ${stage}. Current view: ${view}. Your goal is to provide evidence-based, actionable advice for vascular optimization. Be professional, clinical, yet encouraging. Always reference the Digital Twin and Vascular Age.`,
          }
        });
      }

      // GUIDELINE: Receive streaming response from model
      const stream = await chatRef.current.sendMessageStream({ message: userMsg });
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        fullText += c.text;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].text = fullText;
          return updated;
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return (
    <button onClick={() => setIsOpen(true)} className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-3xl hover:scale-110 transition-all z-50 animate-bounce">
      <MessageSquare className="w-7 h-7" />
    </button>
  );

  return (
    <div className="fixed bottom-8 right-8 w-[400px] h-[600px] bg-white rounded-[48px] shadow-4xl border border-blue-50 flex flex-col overflow-hidden z-[100] animate-in slide-in-from-bottom-8 duration-500">
      <div className="p-8 bg-[#0a192f] text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"><BrainCircuit className="w-6 h-6" /></div>
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-blue-400">Wellness Mentor™</div>
            <div className="text-[9px] font-bold text-sky-100/50 uppercase">Stage {stage} Active</div>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
      </div>
      <div className="flex-grow p-8 overflow-y-auto space-y-6">
        {messages.length === 0 && (
          <div className="text-center py-12 space-y-4">
             <Sparkles className="w-12 h-12 text-blue-100 mx-auto" />
             <p className="text-slate-400 text-sm font-medium leading-relaxed italic">"Hello {userData.name}, I am your Wellness Mentor. How can I assist with your metabolic optimization today?"</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-[28px] text-sm font-medium leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-800 border border-slate-100'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && <div className="flex justify-start"><div className="bg-slate-50 p-4 rounded-2xl animate-pulse text-slate-400 text-[10px] font-black uppercase">Mentor is thinking...</div></div>}
      </div>
      <div className="p-6 border-t border-slate-100">
        <form onSubmit={e => { e.preventDefault(); sendMessage(); }} className="relative">
          <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask your mentor..." className="w-full px-8 py-5 rounded-full bg-slate-50 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold text-slate-900 pr-16" />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"><SendHorizontal className="w-5 h-5" /></button>
        </form>
      </div>
    </div>
  );
};

// User Profile Modal
const UserProfileModal = ({ userData, onClose, onUpdate }: { userData: UserData, onClose: () => void, onUpdate: (data: UserData) => void }) => {
  const [data, setData] = useState(userData);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-[64px] shadow-3xl p-16 space-y-8 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-black uppercase text-[#0a192f]">Profile Settings</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">HbA1c (%)</label>
            <input type="number" step="0.1" value={data.hba1c} onChange={e => setData({...data, hba1c: parseFloat(e.target.value)})} className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Glucose (mg/dL)</label>
            <input type="number" value={data.glucose} onChange={e => setData({...data, glucose: parseInt(e.target.value)})} className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" />
          </div>
          <button onClick={() => onUpdate(data)} className="w-full py-6 bg-blue-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

// Contact Us Modal
const ContactUsModal = ({ userData, onClose }: { userData: UserData | null, onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
    <div className="relative bg-white w-full max-w-lg rounded-[64px] shadow-3xl p-16 space-y-8 text-center">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl mx-auto flex items-center justify-center text-blue-600"><Mail className="w-8 h-8" /></div>
      <h2 className="text-2xl font-black uppercase text-[#0a192f]">Contact Implementation Team</h2>
      <p className="text-slate-500 font-medium">Have questions about your V-PAD™ orchestration? Reach out to our metabolic experts.</p>
      <div className="space-y-4">
        <input type="email" placeholder="Email Address" defaultValue={userData?.name ? 'implementer@vpad.io' : ''} className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold" />
        <textarea placeholder="Your message..." className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold h-32" />
        <button onClick={onClose} className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase tracking-widest">Send Message</button>
      </div>
    </div>
  </div>
);

// Search Modal Component
const SearchModal = ({ isOpen, onClose, query, setView }: { isOpen: boolean, onClose: () => void, query: string, setView: (v: AppView) => void }) => {
  if (!isOpen) return null;
  const results = ['Digital Twin', 'Insulin Resistance', 'Yoga Flow', 'Precision Kitchen'].filter(r => r.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl rounded-[64px] shadow-3xl p-16 space-y-8">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-8">
          <Search className="w-6 h-6 text-slate-300" />
          <input type="text" defaultValue={query} className="flex-grow text-2xl font-black uppercase outline-none text-[#0a192f]" placeholder="Search knowledge base..." />
        </div>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {results.length > 0 ? results.map((r, i) => (
            <button key={i} onClick={() => { setView('faq'); onClose(); }} className="w-full p-6 bg-slate-50 hover:bg-blue-50 rounded-3xl text-left transition-colors flex items-center justify-between group">
              <span className="font-bold text-slate-900">{r}</span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
            </button>
          )) : (
            <div className="text-center py-12 text-slate-400 font-medium italic">No results found for "{query}"</div>
          )}
        </div>
      </div>
    </div>
  );
};

// Session Summary Modal
const SessionSummaryModal = ({ impact, beforeAge, afterAge, onClose }: { impact: number, beforeAge: number, afterAge: number, onClose: () => void }) => (
  <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 animate-in fade-in duration-300">
    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
    <div className="relative bg-white w-full max-w-lg rounded-[64px] overflow-hidden shadow-3xl border border-white/10 p-16 text-center space-y-8 animate-in zoom-in-95 duration-300">
      <div className="w-24 h-24 bg-emerald-500 rounded-[32px] mx-auto flex items-center justify-center text-white shadow-2xl shadow-emerald-500/30">
        <Award className="w-12 h-12" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-black uppercase tracking-tight text-[#0a192f]">Session Complete</h2>
        <p className="text-slate-500 font-medium">Metabolic optimization protocol successful.</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-8 bg-slate-50 rounded-[40px] space-y-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Previous Age</span>
          <div className="text-3xl font-black text-slate-400 line-through decoration-rose-500/50">{beforeAge}</div>
        </div>
        <div className="p-8 bg-blue-600 rounded-[40px] space-y-2 text-white">
          <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest">New Age</span>
          <div className="text-3xl font-black">{afterAge}</div>
        </div>
      </div>
      <div className="p-6 bg-emerald-50 rounded-3xl text-emerald-600 text-sm font-black uppercase tracking-widest">
        Digital Twin Deceleration: -{impact} Years
      </div>
      <button onClick={onClose} className="w-full py-6 bg-slate-900 text-white rounded-[32px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-600 transition-all">
        Synchronize Data
      </button>
    </div>
  </div>
);

// --- Home Component ---
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

        <section className="px-2">
           <div className="rounded-[64px] overflow-hidden">
             <ImplementationBanner setView={setView} />
           </div>
        </section>

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

// Live Voice Coaching Component
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
      // GUIDELINE: Create a new GoogleGenAI instance right before making an API call
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
              // GUIDELINE: Solely rely on sessionPromise resolves
              sessionPromise.then((session) => { session.sendRealtimeInput({ media: pcmBlob }); });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message) => {
            if (message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
              const base64 = message.serverContent.modelTurn.parts[0].inlineData.data;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContext.currentTime);
              // GUIDELINE: Custom decoding logic for raw PCM data
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
