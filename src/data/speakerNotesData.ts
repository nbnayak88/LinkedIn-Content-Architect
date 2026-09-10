import { CalendarEntry, MinuteSpeakerNote } from '../types.ts';

/**
 * Generates an authoritative, minute-by-minute speaker notes schedule
 * for any of the 365 days in SuccessLabs Academy.
 * Combines Enterprise Architecture + AI + SAP for the specific Domain & Sector.
 */
export function getSpeakerNotesForEntry(entry: CalendarEntry): MinuteSpeakerNote[] {
  const domain = entry.domain;
  const sector = entry.gicsSector === 'As applicable' ? 'Cross-Industry Enterprise' : `${entry.gicsSector} Sector`;
  const title = entry.title;
  const dayId = entry.id;

  // Domain-specific SAP context
  const getSapContext = () => {
    switch (domain) {
      case 'HR':
        return 'SAP SuccessFactors HCM Suite, SAP Employee Central, Opportunity Marketplace & Joule HR Agents';
      case 'CRM / Customer Experience':
        return 'SAP CX Suite, SAP Sales Cloud, Service Cloud & Emarsys Customer Data Platform';
      case 'Finance':
        return 'SAP S/4HANA Finance, Universal Journal (ACDOCA), Central Finance & Group Reporting';
      case 'Procurement':
        return 'SAP Ariba Network, SAP S/4HANA Sourcing & Procurement, Guided Buying & BTP Spend Agents';
      case 'Supply Chain':
        return 'SAP Integrated Business Planning (IBP), S/4HANA Extended Warehouse & Digital Supply Chain on BTP';
      case 'Enterprise Business':
        return 'SAP LeanIX EA Suite, SAP Signavio Process Transformation & SAP BTP Extension Suite';
      default:
        return 'SAP Clean Core Strategy, Enterprise Architecture Governance & Cross-functional BTP';
    }
  };

  const getBusinessProblem = () => {
    switch (domain) {
      case 'HR':
        return 'Fragmented employee records, reactive talent matching, and disconnect between skills taxonomies and enterprise growth.';
      case 'CRM / Customer Experience':
        return 'Siloed customer touchpoints, stale CRM records, and slow lead-to-quote conversion cycles across multiple channels.';
      case 'Finance':
        return 'Multi-day accounting close cycles, unstandardized reconciliation, and slow CFO visibility into operational cash flows.';
      case 'Procurement':
        return 'Maverick spend, supplier risk blindness across tiers, and manual RFP evaluation bottlenecks.';
      case 'Supply Chain':
        return 'Bullwhip demand shocks, inventory hoarding, supply disconnections, and rigid planning cycles.';
      case 'Enterprise Business':
        return 'Sprawling technical debt, undocumented legacy integrations, and architectural misalignment with board-level AI goals.';
      default:
        return 'Lack of architecture alignment between strategic vision, human teams, and autonomous AI systems.';
    }
  };

  const getAiAgentRole = () => {
    switch (domain) {
      case 'HR':
        return 'Agentic talent discovery, contextual onboarding copilots, and autonomous skill gap remediation workflows.';
      case 'CRM / Customer Experience':
        return 'Autonomous account intelligence, dynamic quote-to-cash assistants, and real-time customer sentiment agents.';
      case 'Finance':
        return 'Continuous anomaly detection in general ledger, predictive cash forecasting agents, and automated dispute resolution.';
      case 'Procurement':
        return 'Autonomous contract compliance analyzers, supplier risk scoring agents, and dynamic purchase order reconciliation.';
      case 'Supply Chain':
        return 'Autonomous multi-echelon replenishment agents, disruption response simulations, and predictive carrier re-routing.';
      case 'Enterprise Business':
        return 'Automated architecture compliance scanning, technical debt impact assessment agents, and capability gap solvers.';
      default:
        return 'Multi-agent orchestration engines governing cross-enterprise value streams.';
    }
  };

  return [
    {
      minuteRange: '00:00 - 02:00',
      stage: 'Stage 1: The Hook, Big Promise & The Provocative Question',
      speakerScript: `Welcome everyone to Day #${dayId} of SuccessLabs Academy! I am Niladri Bihari Nayak. Today we are addressing a defining transformation question: "${title}". Most enterprises treat AI as a shiny playground widget, but today we prove that technology is not the architecture. Technology is only one layer of the architecture. By the end of this 60-minute live session, you will possess a complete, battle-tested Enterprise Architecture blueprint connecting business capability maps, SAP clean core realities, and autonomous AI agents. Let's architect this together.`,
      slideVisual: `Gamma Slide 1: High-Contrast Title Banner, Day #${dayId} Authority Badge, SuccessLabs Academy Logo & The Provocative Question.`,
      keyQuestionOrCta: `Type in the chat right now: Which city and enterprise organization are you joining from today?`,
      architectureFocus: 'Live Session Promise & Architectural Mission ("Architecting experiences for a better world")'
    },
    {
      minuteRange: '02:00 - 06:00',
      stage: 'Stage 2: Why This Matters Today (2026/2027 Market & Regulatory Context)',
      speakerScript: `Let us ground ourselves in current reality. In 2026 and 2027, enterprise boards are demanding more than proof-of-concept AI demos. The core enterprise friction we face in ${domain} is clear: ${getBusinessProblem()} If your core systems and your AI experiments are decoupled, you do not have transformation—you have expensive chaos. We must examine how clean core architectures unlock high-value AI while mitigating compliance and data leakage risks.`,
      slideVisual: `Gamma Slide 2: 2026/2027 Market Driver Infographic: Enterprise Friction vs. Clean Core Acceleration.`,
      keyQuestionOrCta: `On a scale of 1-10, how well integrated is your current ${domain} system with your corporate AI roadmap?`,
      architectureFocus: 'Enterprise Problem Framing & Business Case Urgency'
    },
    {
      minuteRange: '06:00 - 14:00',
      stage: 'Stage 3: Business Architecture & Capability Decomposition',
      speakerScript: `Before writing a line of code or deploying a single AI model, we must anchor in Business Architecture. Look at this Level-1 and Level-2 capability heatmap. Notice the critical bottleneck where human workflows stall. We decouple business capabilities from underlying technical implementations. This allows business leaders to define the 'What', while architects define the 'How'. When we align the value stream with customer outcomes, the true role of AI becomes crystal clear.`,
      slideVisual: `Gamma Slide 3: Level 1 & Level 2 Capability Heatmap for ${domain} with Value Stream Bottleneck Highlight.`,
      keyQuestionOrCta: `Which capability in your enterprise is causing the greatest operational delay today?`,
      architectureFocus: 'TOGAF / ArchiMate Business Capability Mapping'
    },
    {
      minuteRange: '14:00 - 22:00',
      stage: 'Stage 4: Target Enterprise Architecture Blueprint (Clean Core & Data Fabric)',
      speakerScript: `Now we move into the Target Enterprise Architecture. Here is the four-tier architectural stack: Data Foundation, Transactional Core, Agentic Orchestration Layer, and Experience Layer. Notice our non-negotiable rule: Clean Core. We strictly isolate custom extensions onto side-by-side cloud platforms via event meshes and standard APIs. This guarantees that your core system remains upgradeable while your AI models access zero-latency enterprise context without schema corruption.`,
      slideVisual: `Gamma Slide 4: Target Enterprise Architecture Stack Diagram showing Clean Core separation and Event Mesh.`,
      keyQuestionOrCta: `Ask in chat: Does your organization currently enforce strict Clean Core principles for enterprise extensions?`,
      architectureFocus: 'Target State Architecture & Integration Boundaries'
    },
    {
      minuteRange: '22:00 - 30:00',
      stage: 'Stage 5: SAP Ecosystem Integration & Platform Realization',
      speakerScript: `Let us translate architectural theory into SAP ecosystem execution. In this specific blueprint, our primary anchor is ${getSapContext()}. Notice how SAP Datasphere acts as the semantic layer, preserving business context without data replication. Meanwhile, SAP BTP orchestrates custom microservices, and SAP Joule embeds generative assistance directly into user interfaces. This is how enterprise architects bridge legacy investments with cutting-edge innovations.`,
      slideVisual: `Gamma Slide 5: SAP Ecosystem Architecture Blueprint: Core Transactional Engine + Datasphere + BTP Integration.`,
      keyQuestionOrCta: `Which SAP components are currently active in your enterprise landscape for ${domain}?`,
      architectureFocus: 'SAP S/4HANA, BTP, Clean Core & Datasphere Integration'
    },
    {
      minuteRange: '30:00 - 38:00',
      stage: 'Stage 6: AI & Autonomous Agent Architecture (Contextual Orchestration)',
      speakerScript: `Now comes the AI layer. AI is moving rapidly from passive assistance to autonomous agents. Here is how we orchestrate agentic workflows: ${getAiAgentRole()} Notice that the agent does not execute blind API calls; it queries a secure Semantic Knowledge Graph, validates user role entitlements through SAP authorization tokens, and proposes actions with deterministic guardrails.`,
      slideVisual: `Gamma Slide 6: Multi-Agent Orchestration Flowchart: Trigger -> Semantic Graph -> Verification -> Execution.`,
      keyQuestionOrCta: `What is the highest-risk decision you would trust an autonomous AI agent to execute with supervision?`,
      architectureFocus: 'Multi-Agent Frameworks, RAG Semantic Layer & Deterministic Tool Calling'
    },
    {
      minuteRange: '38:00 - 45:00',
      stage: 'Stage 7: Human + AI Governance, Security & Risk Guardrails',
      speakerScript: `Enterprise Architecture without governance is reckless. In our architecture, the human is never discarded; the human is elevated to the governor of the loop. We enforce three strict guardrails: First, zero retention of sensitive enterprise data in external LLMs. Second, deterministic sanity gates that stop anomalous transactions exceeding business thresholds. Third, an immutable audit log tracing every autonomous agent decision back to its root prompt and context state.`,
      slideVisual: `Gamma Slide 7: Human-in-the-Loop Governance Matrix & Enterprise Risk Guardrails Dashboard.`,
      keyQuestionOrCta: `Drop a 1 in the chat if your company has formal AI governance rules; drop a 2 if you are still drafting them!`,
      architectureFocus: 'Risk Mitigation, Data Sovereignty & Explainable AI Auditing'
    },
    {
      minuteRange: '45:00 - 52:00',
      stage: `Stage 8: Industry Case Study (${sector})`,
      speakerScript: `Let us ground this with a concrete case study from the ${sector}. Prior to transformation, the organization suffered from 40% cycle delays and fragmented audit trails. By deploying this exact Enterprise Architecture—leveraging SAP clean core foundations and orchestrated AI agents—they achieved a 65% reduction in processing friction and unlocked millions in working capital efficiency within two quarters. This is what 'Architecting experiences for a better world' means in tangible enterprise terms.`,
      slideVisual: `Gamma Slide 8: Real-World Case Study: Before vs. After Architecture Metrics & Quantified Business Value.`,
      keyQuestionOrCta: `What is the single biggest barrier to scaling this case study model in your industry?`,
      architectureFocus: 'Quantified Enterprise ROI & Production Benchmark'
    },
    {
      minuteRange: '52:00 - 56:00',
      stage: "Stage 9: The Architect's Decision Checklist (3 Mandates for Tomorrow)",
      speakerScript: `Before we open the floor to live Q&A, here are the three non-negotiable architectural mandates you must take to your team tomorrow morning: 1. Audit your ${domain} capability map and isolate the manual bottleneck. 2. Enforce clean core boundaries—never customize core tables directly. 3. Establish semantic context governance before connecting autonomous agents to production workflows. Write these three down.`,
      slideVisual: `Gamma Slide 9: The Architect's Implementation Checklist: 3 Mandates for Executive Action.`,
      keyQuestionOrCta: `Which of these three mandates will you present to your leadership team first?`,
      architectureFocus: 'Executive Action Plan & Immediate Monday Morning Priorities'
    },
    {
      minuteRange: '56:00 - 60:00',
      stage: 'Stage 10: Live Q&A, Gamma Slides Recap, CTA & Bridge to Tomorrow',
      speakerScript: `Let's dive into your questions from the live chat! ... Excellent question from our live audience regarding integration latency. [Live Q&A answers] ... You can access today's full presentation slides via the embedded Gamma AI deck link below. If you found immense value in today's session, hit Subscribe, share this with your enterprise architecture and SAP peers, and remember our guiding compass: We are 'Architecting experiences for a better world'. Join me tomorrow for Day #${Math.min(365, dayId + 1)} as we continue this 365-day master journey. Thank you and keep architecting!`,
      slideVisual: `Gamma Slide 10: Live Q&A Screen, QR Code for SuccessLabs Community, Next Day Teaser & Mission Compass.`,
      keyQuestionOrCta: `Share your key takeaway from today in one sentence! See you tomorrow live!`,
      architectureFocus: 'Live Community Engagement, Next-Video Bridge & SuccessLabs Academy CTA'
    }
  ];
}
