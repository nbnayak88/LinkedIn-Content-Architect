import fs from 'fs';
import { MASTER_CALENDAR } from '../src/data/calendarData.ts';

let md = `# SUCCESSLABS ACADEMY — 365-DAY MASTER EDITORIAL CALENDAR
**Creator:** Niladri Bihari Nayak  
**Planning Period:** 11 September 2026 → 10 September 2027  
**Cadence:** 1 YouTube Live Every Day (365 Consecutive Days)  
**Core Editorial Thesis:** Enterprise Architecture + AI + SAP, applied to one business domain every day.  
**Mission:** Architecting for a Better World  

---

## Weekly Domain Rhythm
- **Monday**: HR Transformation (Workforce, SuccessFactors, SAP HCM, AI)
- **Tuesday**: CRM & Customer Experience (Customer journeys, SAP CX, AI)
- **Wednesday**: Finance Transformation (CFO transformation, SAP Finance, AI)
- **Thursday**: Procurement Transformation (Sourcing, spend, SAP Ariba, AI)
- **Friday**: Supply Chain Transformation (Planning, logistics, SAP IBP/S/4HANA, AI)
- **Saturday**: Enterprise Business (EA, Business Architecture, strategy, operating model)
- **Sunday**: Leadership & Mixed (Leadership, careers, transformation, cross-domain EA)

---

## 365-Day Master Schedule Table

| # | Date | Day | Domain | Intent | Topic | Strategic Angle | GICS Case Sector | Phase |
|---|---|---|---|---|---|---|---|---|
`;

for (const e of MASTER_CALENDAR) {
  md += `| ${e.id} | ${e.date} | ${e.dayOfWeek} | ${e.domain} | ${e.intent} | ${e.title} | ${e.angle} | ${e.gicsSector} | ${e.phase} |\n`;
}

fs.writeFileSync('./master_calendar.md', md);
fs.writeFileSync('./public/master_calendar.md', md);
console.log('Saved master_calendar.md successfully');
