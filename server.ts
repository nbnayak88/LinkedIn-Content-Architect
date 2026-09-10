import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { SUCCESSLABS_SYSTEM_PROMPT } from './src/data/vibeCodePrompt.ts';
import { getCalendarEntryById, getTodayCalendarEntry, MASTER_CALENDAR } from './src/data/calendarData.ts';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return geminiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    calendarTotalDays: MASTER_CALENDAR.length
  });
});

// Copilot endpoint
app.post('/api/copilot/generate', async (req, res) => {
  try {
    const { command, dayId, userPrompt, analyticsData } = req.body;
    const targetDay = dayId ? getCalendarEntryById(Number(dayId)) : getTodayCalendarEntry();
    const entry = targetDay || MASTER_CALENDAR[0];

    const client = getGemini();

    // Construct prompt based on command
    let promptInstruction = '';
    const dateContext = `
TARGET DAY CONTEXT:
- Day #: ${entry.id} of 365
- Date: ${entry.date} (${entry.dayOfWeek})
- Domain: ${entry.domain}
- Master Topic: "${entry.title}"
- Strategic Angle: ${entry.angle}
- GICS Sector Context: ${entry.gicsSector}
- 2027 Evolution Phase: ${entry.phase}
- Webinar URL to drive to: https://transformation.successlabsacademy.com/
`;

    switch (command) {
      case 'LINKEDIN_POST':
      case 'TODAY':
      case 'SESSION_PACK':
        promptInstruction = `Craft an authoritative, scroll-stopping, high-converting DIRECT RESPONSE LINKEDIN POST for Day #${entry.id}: "${entry.title}".
Target Audience: Enterprise Architects, CIOs, CTOs, SAP Program Directors, Heads of AI, and Digital Transformation Leaders.

Structure strictly according to Direct Response Copywriting rules:
1. **Line 1 (The Hook)**: Ruthless pattern interrupt. No greeting or generic intro. Challenge conventional wisdom or reveal a hidden $10M enterprise trap in ${entry.domain}.
2. **Line 2 (The "...see more" Trigger)**: A single short cliffhanger line that compels the reader to click "...see more".
3. **The Agitation / Problem**: Expose why 90% of enterprises fail when throwing GenAI/copilots at messy legacy ERP systems or broken custom code in ${entry.domain}.
4. **The Epiphany / Mechanism**: Introduce the SuccessLabs framework: Enterprise Architecture (Capabilities & Value Streams) + SAP Clean Core (contextual ERP backbone) + Autonomous AI Agents.
5. **The 3-5 Concrete Actionable Takeaways**: Clear bullet points with bold headers explaining how to architect this properly.
6. **The Two-Tier Response-Invoking CTA**:
   - **Comment Trigger**: "Drop a comment below with **'TRANSFORM'** (or **'BLUEPRINT'**) and I'll personally DM you the high-resolution architecture diagram + your VIP access link."
   - **Direct Link**: "Or skip the queue and register directly for our upcoming Live Masterclass here: 🔗 https://transformation.successlabsacademy.com/"
7. **The Direct Response P.S.**: A high-curiosity closing note addressing a major hesitation or previewing a live architecture whiteboarding session on the webinar.
8. **Targeted Hashtags**: 4-5 relevant tags (e.g. #EnterpriseArchitecture #SAP #AI #DigitalTransformation #SuccessLabsAcademy).

Format with crisp, punchy spacing (1-2 sentences per line), clean bullet points, and high readability.`;
        break;

      case 'CAROUSEL':
      case 'SLIDES':
        promptInstruction = `Create an 8-Slide High-Converting LinkedIn PDF Carousel Script for Day #${entry.id}: "${entry.title}".
For each slide provide:
- **Slide Number & Headline**: Short, punchy, high-contrast title.
- **Visual Layout & Diagram Note**: What visual blueprint or flowchart should be shown.
- **Slide Copy / Bullet Points**: Max 30-40 words per slide for maximum legibility on mobile.
- **Slide 8 MUST be the Webinar Conversion Slide**: Direct call to action with comment trigger ("Comment 'CAROUSEL'") and link to https://transformation.successlabsacademy.com/.`;
        break;

      case 'HOOKS':
        promptInstruction = `Generate 5 distinct high-converting Direct Response Pattern-Interrupt Hooks for Day #${entry.id}: "${entry.title}".
Formulas to provide:
1. **The Contrarian Truth** (Debunking a popular industry myth in ${entry.domain})
2. **The $10M Waste / Threat** (Highlighting expensive architectural failure)
3. **The 'How-To Without'** (Achieving agentic transformation without breaking Clean Core)
4. **The Bold Executive Question** (A dilemma only seasoned CIOs/EAs face)
5. **The Insider Case Study** (Behind-the-scenes architectural rescue)
For each hook, explain the psychological trigger and why it compels the "...see more" click, followed by how it bridges to the webinar https://transformation.successlabsacademy.com/.`;
        break;

      case 'STORY':
        promptInstruction = `Write a gripping, high-empathy B2B Case Study Narrative LinkedIn Post for Day #${entry.id}: "${entry.title}".
Format:
- The Crisis: A $2B enterprise in the ${entry.gicsSector} sector deploying AI in ${entry.domain}, hitting catastrophic data hallucination and ERP lockup.
- The Discovery: Identifying the missing Enterprise Architecture layer and contaminated SAP custom code.
- The Architecture Fix: Implementing Clean Core, SAP BTP context, and human-governed agent orchestration.
- The Measurable Outcome: 40% cycle time reduction, zero hallucinations, clean upgrade path.
- The Direct Response Call-To-Action: Inviting the reader to the live breakdown webinar at https://transformation.successlabsacademy.com/ with comment trigger "Comment 'STORY'".`;
        break;

      case 'COMMENT_MAGNET':
        promptInstruction = `Write an ultra-potent 150-word LinkedIn "Comment Magnet" post for Day #${entry.id}: "${entry.title}".
Objective: Maximize comments to trigger the LinkedIn viral algorithm.
Highlight that you just spent 40 hours mapping out the complete 2027 ${entry.domain} + SAP + AI Agent Architecture Blueprint.
Offer to send the full PDF diagram and private webinar access link (https://transformation.successlabsacademy.com/) to anyone who comments a specific trigger word (e.g. "TRANSFORM").`;
        break;

      case 'POLL':
        promptInstruction = `Create a high-engagement LinkedIn Poll and accompanying Direct Response Post for Day #${entry.id}: "${entry.title}".
Include:
1. Poll Question (Controversial, thought-provoking architectural debate).
2. 4 Voting Options.
3. Post Body (150-200 words analyzing why this debate matters now in 2026/2027).
4. Webinar Bridge: Connecting the debate to the live masterclass at https://transformation.successlabsacademy.com/.`;
        break;

      case 'CTA_OPTIMIZER':
        promptInstruction = `Generate 5 different Direct Response Call-To-Action (CTA) and P.S. pairings for LinkedIn posts on Day #${entry.id}: "${entry.title}".
Each pairing must compel leaders to register at https://transformation.successlabsacademy.com/ using different psychological angles:
1. Urgency / Scarcity (Live Q&A seat limit)
2. Value Stacking (Architecture diagram + framework + webinar)
3. Fear of Stagnation / Cost of Inaction (Falling behind 2027 autonomous enterprise curve)
4. Contrarian Challenge (Prove your architecture is ready)
5. VIP Community & Whiteboard Session Access`;
        break;

      case 'SCRIPT':
        promptInstruction = `Create the FULL PRESENTER / VIDEO SCRIPT for Day #${entry.id}: "${entry.title}".
Use the authoritative, direct-response voice of Niladri Bihari Nayak (SuccessLabs Academy).
Include exact opening hook, visual cues, whiteboarding instructions, and high-converting CTA directing viewers to register at https://transformation.successlabsacademy.com/.`;
        break;

      case 'REPURPOSE':
        promptInstruction = `Create a 5-in-1 multi-format direct response repurposing asset pack for Day #${entry.id}: "${entry.title}":
1. **Primary Direct Response LinkedIn Post** (with comment trigger & webinar link https://transformation.successlabsacademy.com/)
2. **Carousel Slide Outline** (8 slides)
3. **LinkedIn Short Video Script (60s)**
4. **LinkedIn Newsletter Article Hook & Outline**
5. **Engagement Poll & Discussion Topic**`;
        break;

      case 'ANALYZE':
        promptInstruction = `You are in LINKEDIN DIRECT RESPONSE ANALYTICS COACH MODE.
Analyze the following LinkedIn post metrics for Day #${entry.id}: "${entry.title}".
Metrics:
- Impressions: ${analyticsData?.impressions || '14,800'}
- "...see more" Click Rate: ${analyticsData?.seeMoreRate || '18.4%'}
- Comments & Trigger Word Count: ${analyticsData?.commentsCount || '142 comments (86 saying TRANSFORM)'}
- Webinar Click-Throughs: ${analyticsData?.webinarClicks || '312 clicks to transformation.successlabsacademy.com'}
- Webinar Registration Rate: ${analyticsData?.registrationRate || '38%'}
- Presenter Notes: ${analyticsData?.notes || 'Contrarian hook about Clean Core generated intense debate among SAP consultants'}

Provide a structured strategic diagnosis:
1. **Hook Effectiveness & Retention**
2. **Comment Magnet Conversion (Trigger Word Ratio)**
3. **Webinar Traffic & Registration Pipeline**
4. **Specific Copy Tweaks for Tomorrow's Post**
5. **Recommended Follow-up Comment & DM Automation Strategy**`;
        break;

      case 'IMPROVE':
        promptInstruction = `Provide 5 actionable direct response copywriting improvements for upcoming LinkedIn posts based on SuccessLabs Academy's master principles (EA + AI + SAP) and maximizing conversions to https://transformation.successlabsacademy.com/.`;
        break;

      case 'NEXT':
        const nextDay = getCalendarEntryById(entry.id + 1) || MASTER_CALENDAR[0];
        promptInstruction = `Create a seamless LinkedIn post bridge connecting Day #${entry.id} ("${entry.title}" - ${entry.domain}) to Day #${nextDay.id} ("${nextDay.title}" - ${nextDay.domain}).
Explain how the business problem moves from ${entry.domain} into ${nextDay.domain} and invite readers to join the upcoming webinar series at https://transformation.successlabsacademy.com/.`;
        break;

      case 'WEEK':
        promptInstruction = `Provide a 7-day LinkedIn Direct Response Content Campaign Plan starting from Day #${entry.id}.
Show how each day builds anticipation and funnels enterprise leaders into the weekly masterclass webinar at https://transformation.successlabsacademy.com/.`;
        break;

      case 'CUSTOM':
      default:
        promptInstruction = userPrompt || `Write a high-converting Direct Response LinkedIn post for Day #${entry.id}: "${entry.title}" driving registrations to https://transformation.successlabsacademy.com/.`;
        break;
    }

    if (client) {
      try {
        const response = await client.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `${dateContext}\n\n${promptInstruction}`,
          config: {
            systemInstruction: SUCCESSLABS_SYSTEM_PROMPT,
            temperature: 0.7
          }
        });
        return res.json({
          content: response.text,
          dayId: entry.id,
          command,
          source: 'gemini-api'
        });
      } catch (geminiError: any) {
        console.warn('Gemini API temporary issue, falling back to Architect Engine:', geminiError?.message || geminiError);
        const fallbackResponse = generateLocalArchitectResponse(command, entry, analyticsData, userPrompt);
        return res.json({
          content: fallbackResponse,
          dayId: entry.id,
          command,
          source: 'local-architect-engine-fallback'
        });
      }
    }

    // Fallback if GEMINI_API_KEY is not configured
    const fallbackResponse = generateLocalArchitectResponse(command, entry, analyticsData, userPrompt);
    return res.json({
      content: fallbackResponse,
      dayId: entry.id,
      command,
      source: 'local-architect-engine'
    });
  } catch (error: any) {
    console.error('Copilot Generation Error:', error);
    res.status(500).json({
      error: error.message || 'Error generating copilot response',
      details: String(error)
    });
  }
});

// Helper for offline / default responses
function generateLocalArchitectResponse(command: string, entry: any, analyticsData: any, customPrompt?: string): string {
  const nextEntry = getCalendarEntryById(entry.id + 1) || MASTER_CALENDAR[0];
  const webinarUrl = 'https://transformation.successlabsacademy.com/';

  if (command === 'HOOKS') {
    return `# 5 HIGH-CONVERTING DIRECT RESPONSE HOOKS — DAY #${entry.id}
**Topic:** ${entry.title} (${entry.domain})
**Goal:** Stop the LinkedIn scroll, force the "...see more" click, and drive leaders to ${webinarUrl}.

---

### 1. The Contrarian Truth (Mythbuster)
> **"Most enterprises deploying AI in ${entry.domain.toLowerCase()} right now aren't transforming.**
>
> They're just spending millions to automate their 15-year-old technical debt faster.
>
> Here is what happens when you skip Enterprise Architecture..."
*(Psychology: Disarms skepticism by calling out the emperor's new clothes. Irresistible to senior leaders.)*

### 2. The $10M Architectural Loss (Fear of Waste)
> **"A $3B enterprise in the ${entry.gicsSector} sector just scrapped a 14-month GenAI copilot pilot.**
>
> Total write-off: $8.4 million.
> The culprit? They contaminated their SAP core with brittle LLM wrappers.
>
> If you don't enforce Clean Core before launching AI agents, here is the exact failure loop you trigger..."
*(Psychology: Loss aversion + real-world enterprise stakes.)*

### 3. The "How-To Without" Framework
> **"How to orchestrate autonomous AI agents across ${entry.domain.toLowerCase()} without breaking your SAP Clean Core or failing data compliance:**
>
> You don't need a 200-page governance manual.
> You need this 3-layer architecture blueprint..."
*(Psychology: Offers high desire [AI agents] while removing the #1 objection [breaking ERP/security].)*

### 4. The Bold Executive Question
> **"If your Board asked you today: 'Can our autonomous AI agents safely post transactions in SAP S/4HANA without human hallucination?' — what would you answer?**
>
> 92% of CIOs would have to say 'no'.
>
> Here is the decision architecture that turns that into a confident 'yes':"
*(Psychology: Forces executive self-assessment; exposes hidden vulnerability.)*

### 5. The Insider Case Study Breakdown
> **"Last week, I whiteboarded a complete ${entry.domain} transformation for an enterprise handling 500k transactions a day.**
>
> The before: 11 point solutions, 4 duplicate master data tables, and zero agent governance.
> The target state: SAP Clean Core + BTP + autonomous agent orchestrators.
>
> Here is the exact blueprint we drafted (and how you can replicate it):"
*(Psychology: Demonstrates immediate hands-on consulting authority and tangible blueprints.)*

---
👉 **Next Step:** Select your favorite hook and pair it with the Direct Response Post below to drive attendees to **${webinarUrl}**!`;
  }

  if (command === 'CAROUSEL') {
    return `# 8-SLIDE LINKEDIN PDF CAROUSEL SCRIPT — DAY #${entry.id}
**Topic:** ${entry.title}
**Framework:** Problem → The Invisible Trap → Architectural Epiphany → Execution Steps → Webinar Offer
**Webinar Target:** ${webinarUrl}

---

### Slide 1: The Scroll-Stopping Cover
- **Big Bold Headline:** Stop Deploying AI in ${entry.domain.toUpperCase()} Without This Blueprint.
- **Subtitle:** Why 85% of enterprise AI copilots fail (and the 2027 architecture that actually scales).
- **Visual Cue:** High-contrast graphic: Deep navy slate background with warning amber tag: **SWIPE TO ARCHITECT 👉**
- **Presenter Byline:** Niladri Bihari Nayak • SuccessLabs Academy

---

### Slide 2: The Invisible $10M Trap
- **Headline:** The "Copilot Trap" Is Bleeding IT Budgets
- **Slide Copy:**
  - Companies plug shiny AI wrappers into 15-year-old custom SAP code.
  - Result? Hallucinated business records, compliance panic, and zero ROI.
  - **The truth:** AI without enterprise context creates expensive experiments.
- **Visual Cue:** Diagram of brittle LLM wrapper crashing into a legacy database.

---

### Slide 3: The Broken Legacy Model
- **Headline:** Point Solutions vs. Enterprise Context
- **Slide Copy:**
  - ❌ Disconnected chatbot point tools
  - ❌ Fragmented employee & customer data
  - ❌ Zero human-in-the-loop decision audits
  - When the AI hallucinates an ERP transaction, who is accountable?
- **Visual Cue:** Red warning icons showing disconnected silos.

---

### Slide 4: The 2027 Architectural Epiphany
- **Headline:** The SuccessLabs Transformation Formula
- **Slide Copy:**
  - **ENTERPRISE ARCHITECTURE**: Maps capabilities & value streams.
  - **SAP CLEAN CORE**: Preserves an unpolluted, standardized ERP spine.
  - **AUTONOMOUS AI AGENTS**: Orchestrated on SAP BTP with strict guardrails.
  - Architecture turns AI experiments into enterprise value.
- **Visual Cue:** The 3-tier architecture pyramid (EA, SAP Core, AI Agents).

---

### Slide 5: The ${entry.domain} Target Architecture
- **Headline:** Layer-by-Layer Architecture Stack
- **Slide Copy:**
  - 1. **Experience & Agents**: Autonomous task execution.
  - 2. **Contextual Intelligence**: Enterprise semantic data graph on SAP BTP.
  - 3. **Core Systems**: SAP S/4HANA Clean Core (untouched standard).
- **Visual Cue:** Clean, modular 3-tier enterprise architecture blueprint.

---

### Slide 6: Real-World Industry Application
- **Headline:** ${entry.gicsSector} Sector Breakthrough
- **Slide Copy:**
  - **Problem:** Manual delays & data discrepancies in ${entry.domain.toLowerCase()}.
  - **Action:** Implemented business capability boundaries & event-driven AI agents.
  - **Outcome:** 42% operational cycle time reduction + 100% audit compliance.
- **Visual Cue:** Before vs. After metric comparison chart (+42% efficiency).

---

### Slide 7: The 3 Rules for Enterprise Architects
- **Headline:** Execute This Tomorrow Morning
- **Slide Copy:**
  - 1. **Audit Custom Code**: Isolate legacy modifications outside the core.
  - 2. **Map Capabilities First**: Never select an AI model before mapping the business capability.
  - 3. **Define Human-in-the-Loop Thresholds**: Hardcode financial & legal signoff limits for autonomous agents.
- **Visual Cue:** 3 checkmarks with emerald accent badges.

---

### Slide 8: The Webinar Invitation (Direct Response Conversion)
- **Headline:** Want the Complete Architecture Blueprint?
- **Slide Copy:**
  - I'm hosting a LIVE deep-dive masterclass whiteboarding this exact architecture from scratch.
  - **Live Q&A + Full Architecture PDF Pack included.**
  - 👉 **Comment "TRANSFORM" below** and I'll DM you the private access link.
  - 🔗 **Or claim your seat immediately at:**
    **${webinarUrl}**
- **Visual Cue:** VIP Masterclass Pass badge with link and comment callout!`;
  }

  if (command === 'COMMENT_MAGNET') {
    return `# 150-WORD VIRAL COMMENT MAGNET POST — DAY #${entry.id}
*(Engineered specifically to generate 50-100+ comments to maximize LinkedIn reach & feed your webinar funnel)*

---

I just spent 38 hours mapping out the complete 2027 Enterprise Architecture Blueprint for **${entry.domain} Transformation** (combining SAP Clean Core + Autonomous AI Agents).

Most enterprises are spending millions trying to figure this out by trial and error.

This 1-page PDF map covers:
1. The 5 capability layers required before deploying autonomous agents
2. How to keep your SAP S/4HANA core 100% clean while using BTP & Joule
3. The exact decision governance matrix for human-in-the-loop approvals
4. A real-world ${entry.gicsSector} sector case study

I'm giving this full PDF blueprint to everyone attending my upcoming Live Enterprise Transformation Masterclass.

Want early access to the architecture diagram + your free VIP pass to the masterclass?

👉 **Drop a comment below with "TRANSFORM"** and I'll send it directly to your LinkedIn DM.

(Or grab your seat directly here: ${webinarUrl})

#EnterpriseArchitecture #SAP #AI #DigitalTransformation #SuccessLabsAcademy`;
  }

  if (command === 'STORY') {
    return `# CASE STUDY NARRATIVE POST — DAY #${entry.id}
**Topic:** ${entry.title}
**Style:** Direct Response Storytelling (The Hero's Journey of an Enterprise Transformation)

---

18 months ago, a Tier-1 enterprise in the ${entry.gicsSector} sector thought they were "winning" the AI race.

They had deployed 14 different AI copilots across ${entry.domain.toLowerCase()}.
Management celebrated. The Board loved the headlines.

Then, quarter-end hit.

The AI copilots had hallucinated purchase approvals, conflicted with custom SAP pricing tables, and created a $4.2 million reconciliation nightmare.

The CIO called me on a Sunday evening.
His question was simple: *"Did the AI fail, or did our vendor fail?"*

My answer shocked him:
*"Neither. Your architecture failed."*

Here is what went wrong:
They had bought AI tools and pointed them at 15 years of undocumented SAP custom code.
No capability mapping.
No Clean Core boundary.
No agent decision governance.

They were building a Ferrari engine on a rusty bicycle frame.

Over the next 90 days, we architected the turnaround:
1. **Clean Core Isolation:** We moved all custom logic to SAP BTP, restoring standard SAP S/4HANA integrity.
2. **Business Capability Blueprint:** Every AI agent was assigned to a strictly defined business capability with bounded context.
3. **Human-on-the-Loop Governance:** Autonomous agents can draft; only certified human workflows can commit financial transactions over $10k.

The result?
- 38% faster cycle time in ${entry.domain.toLowerCase()}
- Zero hallucinated ledger entries
- A future-proof foundation ready for 2027 autonomous operations.

Here is the lesson every leader must remember:
Technology is not the architecture. Technology is one layer of the architecture.

If you are currently navigating this shift in your enterprise, you don't have to learn through million-dollar mistakes.

I am hosting a free, live architectural masterclass where I will whiteboard this entire enterprise framework step-by-step.

👉 **Comment "STORY" below** and I'll send you the case study slides + VIP access link.
🔗 **Or reserve your seat directly right now:**
${webinarUrl}

P.S. On the live webinar, I'll be sharing the exact 1-page Architecture Checklist we used to audit their SAP landscape. Don't miss it: ${webinarUrl}

#EnterpriseArchitecture #SAP #AI #Leadership #SuccessLabsAcademy`;
  }

  if (command === 'POLL') {
    return `# LINKEDIN POLL & DEBATE POST — DAY #${entry.id}
**Goal:** Ignites senior leader debates in comments and bridges directly to the webinar.

---

### POLL QUESTION:
When deploying AI agents into your ${entry.domain} landscape, what is your organization's biggest bottleneck?

### OPTIONS:
1. Contaminated SAP Custom Code
2. Lack of Capability / EA Maps
3. AI Hallucination & Security
4. Unclear ROI & Exec Alignment

---

### ACCOMPANYING POST TEXT:
Every enterprise wants autonomous AI agents in 2026/2027.
Almost none are architected to run them safely.

In ${entry.domain.toLowerCase()}, we see organizations spending millions attempting to bolt generative AI directly onto 15-year-old custom ERP modifications.

The result?
- Brittle integration pipelines
- Data hallucination inside mission-critical workflows
- Complete inability to adopt standard cloud upgrades without breaking the AI

Here is the hard truth:
AI is an accelerator. But without Enterprise Architecture and a Clean Core foundation, it simply accelerates chaos.

Where is your organization feeling the friction right now? Vote in the poll above and let's debate in the comments.

P.S. If you want to see how leading enterprises solve this with a unified EA + AI + SAP Clean Core blueprint, join my upcoming Live Transformation Masterclass:
🔗 **Register free here:** ${webinarUrl}

(Or comment **"VOTE"** below and I will send you the masterclass invite directly to your DM.)

#EnterpriseArchitecture #SAP #DigitalTransformation #SuccessLabsAcademy`;
  }

  if (command === 'CTA_OPTIMIZER') {
    return `# 5 DIRECT RESPONSE CTA & P.S. COMBINATIONS
**Driving Traffic to:** ${webinarUrl}
**Topic Context:** Day #${entry.id} — ${entry.title}

---

### 1. Urgency & Live Interaction (Limited Seats)
> **CTA:** Want to see this architecture whiteboarded live with real-world SAP & AI examples?
>
> I'm hosting an exclusive live masterclass this week. Seats are strictly limited to ensure I can answer every live attendee's architecture questions.
>
> 🔗 **Claim your free seat here:** ${webinarUrl}
>
> **P.S.** Drop a comment with **"ATTEND"** below and I'll also send you the high-resolution architecture diagram ahead of the session.

---

### 2. Value Stacking (The "Free Blueprint" Engine)
> **CTA:** Stop guessing your 2027 enterprise transformation roadmap.
>
> When you join my upcoming Live Masterclass, you'll receive the complete 2027 ${entry.domain} Architecture Pack:
> - 1-Page Clean Core Decision Tree
> - AI Agent Governance Checklist
> - TOGAF-aligned Capability Matrix
>
> 🔗 **Register instantly at zero cost:** ${webinarUrl}
>
> **P.S.** Can't make it live? Register anyway at ${webinarUrl} and I'll ensure the replay and slide deck land in your inbox.

---

### 3. Fear of Costly Inaction (The $10M Waste Warning)
> **CTA:** The biggest risk in 2026 isn't moving too slow with AI. It's moving fast on a broken architecture and paying for it in multi-million dollar cleanups later.
>
> Join our upcoming Masterclass to learn the proven framework used by Fortune 500 architects:
> 🔗 **Reserve your priority pass:** ${webinarUrl}
>
> **P.S.** What is your #1 unanswered question about SAP Clean Core and AI agent integration? Leave it in the comments below, and I'll address it live on stream!

---

### 4. Direct Response Comment Trigger (Algorithmic Multiplier)
> **CTA:** Want the full step-by-step implementation guide for this post?
>
> 👉 **Comment "TRANSFORM" below.**
>
> I'll personally DM you the PDF blueprint + your VIP access link to our upcoming Live Transformation Masterclass.
>
> 🔗 Or skip the wait and grab your seat right here: ${webinarUrl}
>
> **P.S.** Over 1,200 Enterprise Architects and IT leaders have already registered. Reserve your spot before registration closes: ${webinarUrl}

---

### 5. Contrarian Challenge (Are You Truly Ready?)
> **CTA:** If your CEO asks tomorrow whether your enterprise is architected for autonomous agent execution—will you be ready with a clear answer?
>
> Let's architect your answer together.
>
> 🔗 **Join the Live Enterprise Transformation Masterclass:** ${webinarUrl}
>
> **P.S.** On the webinar, I'll be sharing the exact slides and SAP BTP architecture blueprints I use with private consulting clients. See you inside: ${webinarUrl}`;
  }

  // DEFAULT: Master Direct Response LinkedIn Post
  return `# DIRECT RESPONSE LINKEDIN POST — DAY #${entry.id}
**Target Topic:** ${entry.title}
**Domain:** ${entry.domain} | **Sector:** ${entry.gicsSector}
**Conversion Destination:** ${webinarUrl}

---

Most enterprises deploying AI in ${entry.domain.toLowerCase()} right now are making a critical $10M mistake.
...see more

They buy generative AI copilots, plug them into 15-year-old custom ERP code, and expect autonomous transformation.

Here is what actually happens:
- Hallucinated business transactions
- Corrupted master data pipelines
- Zero human-in-the-loop decision accountability
- An ERP core so contaminated that future upgrades become impossible

The truth?
**AI is not the architecture.**
AI is an accelerator.
Enterprise Architecture is the foundation.
SAP is the mission-critical business context.
Measurable business outcomes are the destination.

If you want autonomous agentic outcomes in ${entry.domain.toLowerCase()} that scale safely into 2027, you must follow this 3-layer architecture:

1. **Clean Core Discipline**:
Isolate all customizations outside your core ERP using SAP BTP. If your core isn't clean, your AI agents will ingest dirty data and hallucinate expensive mistakes.

2. **Business Capability Mapping**:
Never select an AI model before mapping your Level-1 and Level-2 business capabilities. AI must be bounded by enterprise capability scopes, not ad-hoc prompts.

3. **Event-Driven Agentic Orchestration**:
Replace static automation scripts with autonomous agents that reason over live contextual data—with hardcoded human-in-the-loop approval gates for high-stakes decisions.

In the ${entry.gicsSector} sector, organizations adopting this exact architecture are seeing a 35-45% reduction in cycle time while maintaining 100% regulatory compliance.

---

### 🚀 WANT TO ARCHITECT THIS IN YOUR ENTERPRISE?

I am hosting an exclusive **Live Enterprise Transformation Masterclass** where I will whiteboard this entire blueprint from scratch.

You'll see:
- The exact SAP Clean Core + BTP + AI Agent reference architecture
- Live breakdown of real-world enterprise blunders (and how to fix them)
- Live Q&A where we architect your specific transformation challenges

👉 **Drop a comment below with "TRANSFORM"** and I will personally send you the high-resolution architecture blueprint + your private VIP registration link.

🔗 **Or skip the line and claim your seat directly right now:**
**${webinarUrl}**

---
**P.S.** Seats for the live session are strictly limited to preserve time for live attendee Q&A. Reserve your spot before it fills up: ${webinarUrl}

#EnterpriseArchitecture #SAP #AI #DigitalTransformation #SuccessLabsAcademy #${entry.domain.replace(/[^a-zA-Z]/g, '')}`;
}

// Vite middleware in dev or static files in production
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SuccessLabs Academy Daily YouTube Live Architect server running on http://0.0.0.0:${PORT}`);
  });
}

start();
