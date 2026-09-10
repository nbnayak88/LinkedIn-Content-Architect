export type DomainType =
  | 'HR'
  | 'CRM / Customer Experience'
  | 'Finance'
  | 'Procurement'
  | 'Supply Chain'
  | 'Enterprise Business'
  | 'Leadership / Mixed';

export type IntentType = 'authority' | 'help' | 'search';

export type PhaseType =
  | 'Phase 1: Foundation (Sep-Dec 2026)'
  | 'Phase 2: Agentic Transformation (Jan-Mar 2027)'
  | 'Phase 3: Autonomous Enterprise (Apr-Jun 2027)'
  | 'Phase 4: 2028 Horizon (Jul-Sep 2027)';

export type GICSSector =
  | 'Energy'
  | 'Materials'
  | 'Industrials'
  | 'Consumer Discretionary'
  | 'Consumer Staples'
  | 'Health Care'
  | 'Financials'
  | 'Information Technology'
  | 'Communication Services'
  | 'Utilities'
  | 'Real Estate'
  | 'As applicable';

export interface MinuteSpeakerNote {
  minuteRange: string; // e.g. "00:00 - 02:00"
  stage: string; // e.g. "Stage 1: Hook & Big Promise"
  speakerScript: string; // Spoken words for Niladri
  slideVisual: string; // What slide / architectural diagram to present
  keyQuestionOrCta: string; // Chat prompt or architecture challenge
  architectureFocus: string; // EA / SAP / AI focus
}

export interface CalendarEntry {
  id: number;
  date: string; // e.g. "11 Sep 2026"
  isoDate: string; // "2026-09-11"
  dayOfWeek: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  domain: DomainType;
  intent: IntentType;
  title: string;
  angle: string;
  gicsSector: GICSSector;
  phase: PhaseType;
  hook?: string;
  suggestedChapters?: string[];
  cta?: string;
  minuteByMinuteNotes?: MinuteSpeakerNote[];
  gammaPresentationUrl?: string;
}

export interface LiveSessionPack {
  dayId: number;
  primaryTitle: string;
  titleAlternatives: {
    search: string;
    curiosity: string;
    authority: string;
  };
  promise: string;
  thumbnail: {
    visualConcept: string;
    badgeText: string;
    emotionalTrigger: string;
    layout: string;
    colorPalette: string[];
  };
  liveStructure: {
    hook: string;
    whyThisMattersNow: string;
    businessArchitecture: string;
    enterpriseArchitecture: string;
    sapArchitecture: string;
    aiArchitecture: string;
    humanPlusAi: string;
    industryCaseStudy: string;
    architectsTakeaway: string[];
    audienceInteraction: {
      openingPoll: string;
      midSessionQuestion: string;
      architectureChallenge: string;
      closingQuestion: string;
    };
    cta: string;
    nextVideoBridge: string;
  };
  runOfShow: Array<{
    timing: string;
    section: string;
    presenterNotes: string;
    visualAction: string;
  }>;
  youtubeMetadata: {
    description: string;
    suggestedChapters: string;
    hashtags: string[];
  };
  repurposingPlan: {
    linkedInPost: string;
    youtubeShortScript: string;
    instagramReelConcept: string;
    communityPost: string;
    newsletterInsight: string;
    futureVideoFollowUp: string;
  };
  slideOutline: Array<{
    slideNumber: number;
    title: string;
    bulletPoints: string[];
    visualDiagramPrompt: string;
  }>;
}

export interface AnalyticsEntry {
  dayId: number;
  date: string;
  ctr: number; // e.g. 7.4%
  avgViewDuration: string; // e.g. "9m 42s"
  avgPercentageViewed: number; // e.g. 52%
  watchTimeHours: number;
  peakConcurrentViewers: number;
  returningViewersPct: number;
  subscribersGained: number;
  topAudienceQuestions: string[];
  notes: string;
  aiStrategicInsights?: string;
}

export type CopilotCommand =
  | 'LINKEDIN_POST'
  | 'CAROUSEL'
  | 'HOOKS'
  | 'STORY'
  | 'COMMENT_MAGNET'
  | 'POLL'
  | 'CTA_OPTIMIZER'
  | 'TODAY'
  | 'TOMORROW'
  | 'WEEK'
  | 'MONTH'
  | 'DEEP DIVE'
  | 'SCRIPT'
  | 'SLIDES'
  | 'DEMO'
  | 'THUMBNAIL'
  | 'DESCRIPTION'
  | 'REPURPOSE'
  | 'ANALYZE'
  | 'IMPROVE'
  | 'NEXT'
  | 'CUSTOM';

export type DirectResponseFramework =
  | 'PAS' // Problem - Agitate - Solve
  | 'BAB' // Before - After - Bridge
  | 'CONTRARIAN' // Myth/Lie - Reality - Enterprise Framework
  | 'HOOK_STORY_OFFER' // Hook - Story/Epiphany - Webinar Offer
  | 'AIDA'; // Attention - Interest - Desire - Action

export interface CarouselSlide {
  slideNumber: number;
  title: string;
  subtitle?: string;
  bulletPoints: string[];
  takeaway?: string;
  visualCue: string;
}

export interface LinkedInPostBlueprint {
  dayId: number;
  title: string;
  targetDomain: DomainType;
  framework: DirectResponseFramework;
  primaryHook: string;
  hookAlternatives: string[];
  agitation: string;
  coreFramework: string[];
  commentTriggerWord: string;
  webinarUrl: string;
  callToAction: string;
  psStatement: string;
  hashtags: string[];
  fullPostMarkdown: string;
  carouselSlides?: CarouselSlide[];
}

