// Generate /src/data/calendarData.ts and /public/master_calendar.md
import fs from 'fs';
import path from 'path';

const rawEntries = [
  // Sep 2026
  [1, "11 Sep 2026", "Fri", "Supply Chain", "authority", "Supply Chain Transformation in the AI Era: An Enterprise Architecture Blueprint", "Energy"],
  [2, "12 Sep 2026", "Sat", "Enterprise Business", "authority", "Enterprise Architecture in the AI Era: The 2027 Blueprint", "As applicable"],
  [3, "13 Sep 2026", "Sun", "Leadership / Mixed", "authority", "2027 Leadership for Enterprise Architects: What Changes?", "As applicable"],
  [4, "14 Sep 2026", "Mon", "HR", "authority", "HR Transformation in the AI Era: An Enterprise Architecture Blueprint", "As applicable"],
  [5, "15 Sep 2026", "Tue", "CRM / Customer Experience", "authority", "CRM Transformation in the AI Era: An Enterprise Architecture Blueprint", "As applicable"],
  [6, "16 Sep 2026", "Wed", "Finance", "authority", "Finance Transformation in the AI Era: An Enterprise Architecture Blueprint", "As applicable"],
  [7, "17 Sep 2026", "Thu", "Procurement", "authority", "Procurement Transformation in the AI Era: An Enterprise Architecture Blueprint", "As applicable"],
  [8, "18 Sep 2026", "Fri", "Supply Chain", "help", "AI-Powered Supply Chain with SAP IBP", "As applicable"],
  [9, "19 Sep 2026", "Sat", "Enterprise Business", "search", "Business Architecture in the AI Era: From Strategy to Execution", "As applicable"],
  [10, "20 Sep 2026", "Sun", "Leadership / Mixed", "help", "Will AI Replace Enterprise Architects? The Leadership Answer", "As applicable"],
  [11, "21 Sep 2026", "Mon", "HR", "help", "AI-Powered Workforce Planning with SAP SuccessFactors", "As applicable"],
  [12, "22 Sep 2026", "Tue", "CRM / Customer Experience", "help", "AI-Powered Customer Experience with SAP CX", "Materials"],
  [13, "23 Sep 2026", "Wed", "Finance", "help", "AI-Powered Finance with SAP: From Reporting to Autonomous Decisions", "As applicable"],
  [14, "24 Sep 2026", "Thu", "Procurement", "help", "AI-Powered Procurement with SAP: From Spend to Strategic Value", "As applicable"],
  [15, "25 Sep 2026", "Fri", "Supply Chain", "authority", "Supply Chain Operating Model 2027: What Enterprise Architects Need to Redesign", "As applicable"],
  [16, "26 Sep 2026", "Sat", "Enterprise Business", "authority", "Enterprise Architecture vs. Business Architecture: 2027 View", "As applicable"],
  [17, "27 Sep 2026", "Sun", "Leadership / Mixed", "help", "From Architect to AI Transformation Leader", "As applicable"],
  [18, "28 Sep 2026", "Mon", "HR", "authority", "HR Operating Model 2027: What Enterprise Architects Need to Redesign", "As applicable"],
  [19, "29 Sep 2026", "Tue", "CRM / Customer Experience", "search", "Customer Journey Architecture: From Touchpoint to Outcome", "As applicable"],
  [20, "30 Sep 2026", "Wed", "Finance", "authority", "Finance Operating Model 2027: What Enterprise Architects Need to Redesign", "As applicable"],

  // Oct 2026
  [21, "01 Oct 2026", "Thu", "Procurement", "authority", "Procurement Operating Model 2027: What Enterprise Architects Need to Redesign", "As applicable"],
  [22, "02 Oct 2026", "Fri", "Supply Chain", "help", "AI Agents in Supply Chain: From Planning to Autonomous Execution", "As applicable"],
  [23, "03 Oct 2026", "Sat", "Enterprise Business", "search", "How AI Changes Enterprise Architecture", "Consumer Discretionary"],
  [24, "04 Oct 2026", "Sun", "Leadership / Mixed", "help", "Strategic Communication for AI-Powered Transformation", "As applicable"],
  [25, "05 Oct 2026", "Mon", "HR", "help", "SAP SuccessFactors + AI: From Employee Data to Intelligent Decisions", "As applicable"],
  [26, "06 Oct 2026", "Tue", "CRM / Customer Experience", "search", "AI Agents in CRM: What Changes in the Target Architecture?", "As applicable"],
  [27, "07 Oct 2026", "Wed", "Finance", "search", "AI Agents in Finance: Architecture for the Autonomous CFO", "As applicable"],
  [28, "08 Oct 2026", "Thu", "Procurement", "help", "AI Agents in Procurement: From Sourcing to Autonomous Execution", "As applicable"],
  [29, "09 Oct 2026", "Fri", "Supply Chain", "search", "Supply Chain Data Architecture for Trusted AI", "As applicable"],
  [30, "10 Oct 2026", "Sat", "Enterprise Business", "search", "How AI Changes Business Architecture", "As applicable"],
  [31, "11 Oct 2026", "Sun", "Leadership / Mixed", "help", "Executive Storytelling for Enterprise Architects", "As applicable"],
  [32, "12 Oct 2026", "Mon", "HR", "search", "Agentic AI in HR: What Changes in the Target Architecture?", "As applicable"],
  [33, "13 Oct 2026", "Tue", "CRM / Customer Experience", "search", "Customer Data Architecture for Trusted Enterprise AI", "As applicable"],
  [34, "14 Oct 2026", "Wed", "Finance", "search", "Finance Data Architecture: Building Trusted AI Context", "Consumer Staples"],
  [35, "15 Oct 2026", "Thu", "Procurement", "search", "Spend Data Architecture: Building Trusted AI Context", "As applicable"],
  [36, "16 Oct 2026", "Fri", "Supply Chain", "help", "AI-Powered Demand Forecasting", "As applicable"],
  [37, "17 Oct 2026", "Sat", "Enterprise Business", "help", "Enterprise Operating Model for the Autonomous Enterprise", "As applicable"],
  [38, "18 Oct 2026", "Sun", "Leadership / Mixed", "search", "How to Influence Without Authority", "As applicable"],
  [39, "19 Oct 2026", "Mon", "HR", "search", "Employee Experience Architecture: AI, Data and SAP", "As applicable"],
  [40, "20 Oct 2026", "Tue", "CRM / Customer Experience", "search", "AI-Powered Personalization: Designing the Enterprise Architecture", "As applicable"],
  [41, "21 Oct 2026", "Wed", "Finance", "help", "AI-Powered Financial Planning and Analysis", "As applicable"],
  [42, "22 Oct 2026", "Thu", "Procurement", "help", "AI-Powered Strategic Sourcing", "As applicable"],
  [43, "23 Oct 2026", "Fri", "Supply Chain", "search", "AI in Supply Planning: Architecture and Governance", "As applicable"],
  [44, "24 Oct 2026", "Sat", "Enterprise Business", "help", "Business Capability Mapping for AI Transformation", "As applicable"],
  [45, "25 Oct 2026", "Sun", "Leadership / Mixed", "search", "Architecture Leadership: Balancing AI Ambition and Governance", "Financials"],
  [46, "26 Oct 2026", "Mon", "HR", "search", "AI in Talent Acquisition: Designing the Future HR Architecture", "As applicable"],
  [47, "27 Oct 2026", "Tue", "CRM / Customer Experience", "search", "CRM Integration Architecture: SAP CX and the Enterprise", "As applicable"],
  [48, "28 Oct 2026", "Wed", "Finance", "help", "AI in Record-to-Report: Designing Intelligent Finance Processes", "As applicable"],
  [49, "29 Oct 2026", "Thu", "Procurement", "search", "AI in Supplier Management: Architecture and Governance", "As applicable"],
  [50, "30 Oct 2026", "Fri", "Supply Chain", "help", "AI in Inventory Optimization", "As applicable"],
  [51, "31 Oct 2026", "Sat", "Enterprise Business", "help", "Value Streams + AI: Designing for Outcomes", "As applicable"],

  // Nov 2026
  [52, "01 Nov 2026", "Sun", "Leadership / Mixed", "help", "Decision-Making in an Agentic Enterprise", "As applicable"],
  [53, "02 Nov 2026", "Mon", "HR", "search", "AI in Learning and Development: Skills Intelligence Architecture", "As applicable"],
  [54, "03 Nov 2026", "Tue", "CRM / Customer Experience", "help", "AI in Sales: From Lead Management to Autonomous Revenue Operations", "As applicable"],
  [55, "04 Nov 2026", "Wed", "Finance", "search", "AI in Procure-to-Pay: Finance and Procurement Architecture", "As applicable"],
  [56, "05 Nov 2026", "Thu", "Procurement", "help", "AI in Contract Management: From Documents to Decisions", "Information Technology"],
  [57, "06 Nov 2026", "Fri", "Supply Chain", "help", "AI in Logistics and Transportation", "As applicable"],
  [58, "07 Nov 2026", "Sat", "Enterprise Business", "search", "Architecture Principles for the AI-Native Enterprise", "As applicable"],
  [59, "08 Nov 2026", "Sun", "Leadership / Mixed", "help", "Leading Human + AI Teams", "As applicable"],
  [60, "09 Nov 2026", "Mon", "HR", "help", "AI in Performance Management: From Goals to Business Outcomes", "As applicable"],
  [61, "10 Nov 2026", "Tue", "CRM / Customer Experience", "help", "AI in Service: Designing Intelligent Customer Operations", "As applicable"],
  [62, "11 Nov 2026", "Wed", "Finance", "search", "AI in Order-to-Cash: Architecture for Faster Revenue", "As applicable"],
  [63, "12 Nov 2026", "Thu", "Procurement", "search", "AI in Purchase-to-Pay: Enterprise Architecture View", "As applicable"],
  [64, "13 Nov 2026", "Fri", "Supply Chain", "help", "AI-Powered Manufacturing Operations", "As applicable"],
  [65, "14 Nov 2026", "Sat", "Enterprise Business", "search", "AI-Native Enterprise Architecture: What It Means", "As applicable"],
  [66, "15 Nov 2026", "Sun", "Leadership / Mixed", "help", "AI Change Management: The Leader's Playbook", "As applicable"],
  [67, "16 Nov 2026", "Mon", "HR", "search", "AI-Powered Succession Planning: Architecture for Leadership Continuity", "Utilities"],
  [68, "17 Nov 2026", "Tue", "CRM / Customer Experience", "search", "AI in Marketing: Enterprise Architecture for Next-Best Action", "As applicable"],
  [69, "18 Nov 2026", "Wed", "Finance", "search", "AI in Treasury: Scenario Intelligence and Decision Architecture", "As applicable"],
  [70, "19 Nov 2026", "Thu", "Procurement", "help", "AI-Powered Supplier Risk Management", "As applicable"],
  [71, "20 Nov 2026", "Fri", "Supply Chain", "search", "Supply Chain Control Tower: Enterprise Architecture View", "As applicable"],
  [72, "21 Nov 2026", "Sat", "Enterprise Business", "search", "SAP's Autonomous Enterprise: An Architecture View", "As applicable"],
  [73, "22 Nov 2026", "Sun", "Leadership / Mixed", "search", "Building an AI-Ready Architecture Culture", "As applicable"],
  [74, "23 Nov 2026", "Mon", "HR", "search", "Workforce Data Architecture: Building Trusted AI Context", "As applicable"],
  [75, "24 Nov 2026", "Tue", "CRM / Customer Experience", "help", "Customer Experience Analytics: From Data to AI Decisions", "As applicable"],
  [76, "25 Nov 2026", "Wed", "Finance", "help", "Finance Analytics: From BI to Business AI", "As applicable"],
  [77, "26 Nov 2026", "Thu", "Procurement", "help", "Procurement Analytics: From Reporting to Business AI", "As applicable"],
  [78, "27 Nov 2026", "Fri", "Supply Chain", "search", "SAP IBP + AI: Architecture Patterns for Planners", "Energy"],
  [79, "28 Nov 2026", "Sat", "Enterprise Business", "search", "SAP AI-Native North Star Architecture Explained", "As applicable"],
  [80, "29 Nov 2026", "Sun", "Leadership / Mixed", "help", "How Leaders Should Think About SAP's Autonomous Enterprise", "As applicable"],
  [81, "30 Nov 2026", "Mon", "HR", "help", "HR Process Transformation: From Workflow to Intelligent Orchestration", "As applicable"],

  // Dec 2026
  [82, "01 Dec 2026", "Tue", "CRM / Customer Experience", "authority", "CRM Operating Model 2027: What Leaders Need to Redesign", "As applicable"],
  [83, "02 Dec 2026", "Wed", "Finance", "search", "SAP Finance + AI: Enterprise Architecture Patterns", "As applicable"],
  [84, "03 Dec 2026", "Thu", "Procurement", "search", "SAP Ariba + AI: Enterprise Architecture Patterns", "As applicable"],
  [85, "04 Dec 2026", "Fri", "Supply Chain", "help", "SAP S/4HANA + Supply Chain AI", "As applicable"],
  [86, "05 Dec 2026", "Sat", "Enterprise Business", "search", "Enterprise Architecture for SAP Business AI", "As applicable"],
  [87, "06 Dec 2026", "Sun", "Leadership / Mixed", "help", "Leadership Lessons from an SAP Transformation", "As applicable"],
  [88, "07 Dec 2026", "Mon", "HR", "help", "SAP HCM to S/4HANA: AI-Ready HR Transformation", "As applicable"],
  [89, "08 Dec 2026", "Tue", "CRM / Customer Experience", "search", "AI-Powered Customer Journeys: Architecture Patterns", "Materials"],
  [90, "09 Dec 2026", "Wed", "Finance", "search", "Finance Integration Architecture Across the Enterprise", "As applicable"],
  [91, "10 Dec 2026", "Thu", "Procurement", "search", "Procurement Integration Architecture Across the Enterprise", "As applicable"],
  [92, "11 Dec 2026", "Fri", "Supply Chain", "search", "Supply Chain Integration Architecture", "As applicable"],
  [93, "12 Dec 2026", "Sat", "Enterprise Business", "search", "Enterprise Architecture for Agentic AI", "As applicable"],
  [94, "13 Dec 2026", "Sun", "Leadership / Mixed", "authority", "Leadership Case Study: Energy Transformation", "Industrials"],
  [95, "14 Dec 2026", "Mon", "HR", "search", "HR Integration Architecture: SuccessFactors, SAP and the Enterprise", "As applicable"],
  [96, "15 Dec 2026", "Tue", "CRM / Customer Experience", "help", "Customer Identity and Data: The Foundation for AI", "As applicable"],
  [97, "16 Dec 2026", "Wed", "Finance", "help", "AI Governance in Finance: Controls, Auditability and Human Oversight", "As applicable"],
  [98, "17 Dec 2026", "Thu", "Procurement", "help", "AI Governance in Procurement: Trust, Controls and Human Oversight", "As applicable"],
  [99, "18 Dec 2026", "Fri", "Supply Chain", "help", "AI Governance in Supply Chain", "As applicable"],
  [100, "19 Dec 2026", "Sat", "Enterprise Business", "search", "AI Agents and Enterprise Integration Architecture", "Consumer Discretionary"],
  [101, "20 Dec 2026", "Sun", "Leadership / Mixed", "authority", "Leadership Case Study: Industrials Transformation", "Consumer Discretionary"],
  [102, "21 Dec 2026", "Mon", "HR", "help", "AI Governance in HR: Privacy, Bias and Human Oversight", "As applicable"],
  [103, "22 Dec 2026", "Tue", "CRM / Customer Experience", "help", "CRM Governance: Privacy, Consent and Responsible AI", "As applicable"],
  [104, "23 Dec 2026", "Wed", "Finance", "authority", "Finance Transformation Roadmap: 2026 to 2027", "As applicable"],
  [105, "24 Dec 2026", "Thu", "Procurement", "authority", "Procurement Transformation Roadmap: 2026 to 2027", "As applicable"],
  [106, "25 Dec 2026", "Fri", "Supply Chain", "authority", "Supply Chain Transformation Roadmap: 2026 to 2027", "As applicable"],
  [107, "26 Dec 2026", "Sat", "Enterprise Business", "search", "AI Governance as an Enterprise Architecture Capability", "As applicable"],
  [108, "27 Dec 2026", "Sun", "Leadership / Mixed", "authority", "Leadership Case Study: Financial Services Transformation", "Consumer Staples"],
  [109, "28 Dec 2026", "Mon", "HR", "authority", "HR Case Study: AI Transformation in an Energy Enterprise", "Consumer Staples"],
  [110, "29 Dec 2026", "Tue", "CRM / Customer Experience", "authority", "CRM Case Study: AI Transformation in Energy", "Consumer Staples"],
  [111, "30 Dec 2026", "Wed", "Finance", "authority", "Finance Case Study: AI Transformation in Energy", "Consumer Staples"],
  [112, "31 Dec 2026", "Thu", "Procurement", "authority", "Procurement Case Study: Energy Sector Spend Transformation", "Consumer Staples"],

  // Jan 2027
  [113, "01 Jan 2027", "Fri", "Supply Chain", "authority", "Supply Chain Case Study: Energy", "Health Care"],
  [114, "02 Jan 2027", "Sat", "Enterprise Business", "search", "Enterprise Data Architecture for AI Context", "As applicable"],
  [115, "03 Jan 2027", "Sun", "Leadership / Mixed", "authority", "Leadership Case Study: Health Care Transformation", "Health Care"],
  [116, "04 Jan 2027", "Mon", "HR", "authority", "HR Case Study: Workforce Architecture in Industrials", "Health Care"],
  [117, "05 Jan 2027", "Tue", "CRM / Customer Experience", "authority", "CRM Case Study: Customer Experience in Industrials", "Health Care"],
  [118, "06 Jan 2027", "Wed", "Finance", "authority", "Finance Case Study: Financial Services Architecture", "Health Care"],
  [119, "07 Jan 2027", "Thu", "Procurement", "authority", "Procurement Case Study: Industrial Sourcing Transformation", "Health Care"],
  [120, "08 Jan 2027", "Fri", "Supply Chain", "authority", "Supply Chain Case Study: Industrials and Manufacturing", "Financials"],
  [121, "09 Jan 2027", "Sat", "Enterprise Business", "help", "Application Portfolio Rationalization for AI", "As applicable"],
  [122, "10 Jan 2027", "Sun", "Leadership / Mixed", "authority", "Leadership Case Study: Consumer Transformation", "Financials"],
  [123, "11 Jan 2027", "Mon", "HR", "authority", "HR Case Study: Talent Intelligence in Financial Services", "Financials"],
  [124, "12 Jan 2027", "Tue", "CRM / Customer Experience", "authority", "CRM Case Study: Digital Customer Experience in Financials", "Financials"],
  [125, "13 Jan 2027", "Wed", "Finance", "authority", "Finance Case Study: Cost Transformation in Industrials", "Financials"],
  [126, "14 Jan 2027", "Thu", "Procurement", "authority", "Procurement Case Study: Financial Services Procurement", "Financials"],
  [127, "15 Jan 2027", "Fri", "Supply Chain", "authority", "Supply Chain Case Study: Financial Services Operations", "Information Technology"],
  [128, "16 Jan 2027", "Sat", "Enterprise Business", "help", "Technology Portfolio Rationalization in the AI Era", "As applicable"],
  [129, "17 Jan 2027", "Sun", "Leadership / Mixed", "authority", "Leadership Case Study: Technology Transformation", "Information Technology"],
  [130, "18 Jan 2027", "Mon", "HR", "authority", "HR Case Study: Employee Experience in Consumer Staples", "Information Technology"],
  [131, "19 Jan 2027", "Tue", "CRM / Customer Experience", "authority", "CRM Case Study: Consumer Experience in Consumer Discretionary", "Information Technology"],
  [132, "20 Jan 2027", "Wed", "Finance", "authority", "Finance Case Study: Consumer Finance Transformation", "Information Technology"],
  [133, "21 Jan 2027", "Thu", "Procurement", "authority", "Procurement Case Study: Consumer Discretionary Sourcing", "Information Technology"],
  [134, "22 Jan 2027", "Fri", "Supply Chain", "authority", "Supply Chain Case Study: Consumer Discretionary", "Communication Services"],
  [135, "23 Jan 2027", "Sat", "Enterprise Business", "help", "Cloud Strategy for the Autonomous Enterprise", "As applicable"],
  [136, "24 Jan 2027", "Sun", "Leadership / Mixed", "authority", "Leadership Case Study: Utilities Transformation", "Communication Services"],
  [137, "25 Jan 2027", "Mon", "HR", "authority", "HR Case Study: Digital Workforce in Health Care", "Communication Services"],
  [138, "26 Jan 2027", "Tue", "CRM / Customer Experience", "authority", "CRM Case Study: Loyalty in Consumer Staples", "Communication Services"],
  [139, "27 Jan 2027", "Wed", "Finance", "authority", "Finance Case Study: Health Care Finance", "Communication Services"],
  [140, "28 Jan 2027", "Thu", "Procurement", "authority", "Procurement Case Study: Consumer Staples Supplier Management", "Communication Services"],
  [141, "29 Jan 2027", "Fri", "Supply Chain", "authority", "Supply Chain Case Study: Consumer Staples", "Utilities"],
  [142, "30 Jan 2027", "Sat", "Enterprise Business", "help", "Integration Strategy for AI Agents", "As applicable"],
  [143, "31 Jan 2027", "Sun", "Leadership / Mixed", "authority", "Leadership Case Study: Real Estate Transformation", "Utilities"],

  // Feb 2027
  [144, "01 Feb 2027", "Mon", "HR", "authority", "HR Case Study: AI-Powered Recruiting in Information Technology", "Utilities"],
  [145, "02 Feb 2027", "Tue", "CRM / Customer Experience", "authority", "CRM Case Study: Patient Experience in Health Care", "Utilities"],
  [146, "03 Feb 2027", "Wed", "Finance", "authority", "Finance Case Study: IT Industry Finance Transformation", "Utilities"],
  [147, "04 Feb 2027", "Thu", "Procurement", "authority", "Procurement Case Study: Health Care Procurement", "Utilities"],
  [148, "05 Feb 2027", "Fri", "Supply Chain", "authority", "Supply Chain Case Study: Health Care", "Real Estate"],
  [149, "06 Feb 2027", "Sat", "Enterprise Business", "search", "Security Architecture for Agentic AI", "As applicable"],
  [150, "07 Feb 2027", "Sun", "Leadership / Mixed", "authority", "Leadership Case Study: Materials Transformation", "Real Estate"],
  [151, "08 Feb 2027", "Mon", "HR", "authority", "HR Case Study: Workforce Resilience in Utilities", "Real Estate"],
  [152, "09 Feb 2027", "Tue", "CRM / Customer Experience", "authority", "CRM Case Study: B2B Customer Experience in IT", "Real Estate"],
  [153, "10 Feb 2027", "Wed", "Finance", "authority", "Finance Case Study: Communication Services Finance", "Real Estate"],
  [154, "11 Feb 2027", "Thu", "Procurement", "authority", "Procurement Case Study: IT Procurement", "Real Estate"],
  [155, "12 Feb 2027", "Fri", "Supply Chain", "authority", "Supply Chain Case Study: Information Technology", "Energy"],
  [156, "13 Feb 2027", "Sat", "Enterprise Business", "search", "Experience Architecture for AI-Powered Enterprises", "As applicable"],
  [157, "14 Feb 2027", "Sun", "Leadership / Mixed", "authority", "Leadership Case Study: Communication Services Transformation", "Energy"],
  [158, "15 Feb 2027", "Mon", "HR", "authority", "HR Case Study: HR Transformation in Real Estate", "Energy"],
  [159, "16 Feb 2027", "Tue", "CRM / Customer Experience", "authority", "CRM Case Study: Customer Engagement in Communication Services", "Energy"],
  [160, "17 Feb 2027", "Wed", "Finance", "authority", "Finance Case Study: Utilities Finance", "Energy"],
  [161, "18 Feb 2027", "Thu", "Procurement", "authority", "Procurement Case Study: Communication Services Procurement", "Energy"],
  [162, "19 Feb 2027", "Fri", "Supply Chain", "authority", "Supply Chain Case Study: Communication Services", "Materials"],
  [163, "20 Feb 2027", "Sat", "Enterprise Business", "search", "Enterprise Architecture and AI Operating Models", "As applicable"],
  [164, "21 Feb 2027", "Sun", "Leadership / Mixed", "authority", "Leadership Case Study: Procurement Transformation", "Materials"],
  [165, "22 Feb 2027", "Mon", "HR", "authority", "HR Case Study: Customer-Facing Workforce in Consumer Discretionary", "Materials"],
  [166, "23 Feb 2027", "Tue", "CRM / Customer Experience", "authority", "CRM Case Study: Utility Customer Experience", "Materials"],
  [167, "24 Feb 2027", "Wed", "Finance", "authority", "Finance Case Study: Real Estate Finance", "Materials"],
  [168, "25 Feb 2027", "Thu", "Procurement", "authority", "Procurement Case Study: Utilities Procurement", "Materials"],
  [169, "26 Feb 2027", "Fri", "Supply Chain", "authority", "Supply Chain Case Study: Utilities", "Industrials"],
  [170, "27 Feb 2027", "Sat", "Enterprise Business", "search", "Strategy to Execution: The Architecture Roadmap", "As applicable"],
  [171, "28 Feb 2027", "Sun", "Leadership / Mixed", "authority", "Leadership Case Study: Supply Chain Transformation", "Industrials"],

  // Mar 2027
  [172, "01 Mar 2027", "Mon", "HR", "authority", "HR Case Study: Skills Transformation in Materials", "Industrials"],
  [173, "02 Mar 2027", "Tue", "CRM / Customer Experience", "authority", "CRM Case Study: Real Estate Customer Experience", "Industrials"],
  [174, "03 Mar 2027", "Wed", "Finance", "authority", "Finance Case Study: Materials Finance", "Industrials"],
  [175, "04 Mar 2027", "Thu", "Procurement", "authority", "Procurement Case Study: Real Estate Procurement", "Industrials"],
  [176, "05 Mar 2027", "Fri", "Supply Chain", "authority", "Supply Chain Case Study: Real Estate", "Consumer Discretionary"],
  [177, "06 Mar 2027", "Sat", "Enterprise Business", "help", "Enterprise Transformation Governance in the AI Era", "Consumer Discretionary"],
  [178, "07 Mar 2027", "Sun", "Leadership / Mixed", "authority", "Leadership Case Study: HR Transformation", "Consumer Discretionary"],
  [179, "08 Mar 2027", "Mon", "HR", "authority", "HR Case Study: AI-Enabled Workforce in Communication Services", "Consumer Discretionary"],
  [180, "09 Mar 2027", "Tue", "CRM / Customer Experience", "authority", "CRM Case Study: Materials Industry Customer Relationships", "Consumer Discretionary"],
  [181, "10 Mar 2027", "Wed", "Finance", "authority", "Finance Case Study: Consumer Staples Finance", "Consumer Discretionary"],
  [182, "11 Mar 2027", "Thu", "Procurement", "authority", "Procurement Case Study: Materials and Commodity Procurement", "Consumer Discretionary"],
  [183, "12 Mar 2027", "Fri", "Supply Chain", "authority", "Supply Chain Case Study: Materials", "Consumer Staples"],
  [184, "13 Mar 2027", "Sat", "Enterprise Business", "authority", "How to Build an EA Capability for 2027", "As applicable"],
  [185, "14 Mar 2027", "Sun", "Leadership / Mixed", "authority", "Leadership Case Study: Customer Experience Transformation", "Consumer Staples"],
  [186, "15 Mar 2027", "Mon", "HR", "help", "How SAP Joule Changes the HR Employee Experience", "As applicable"],
  [187, "16 Mar 2027", "Tue", "CRM / Customer Experience", "help", "SAP CX + AI: What Architects Should Know", "As applicable"],
  [188, "17 Mar 2027", "Wed", "Finance", "authority", "Autonomous Finance: What SAP's 2027 Direction Means for Architects", "Consumer Staples"],
  [189, "18 Mar 2027", "Thu", "Procurement", "authority", "Autonomous Procurement: What 2027 Could Look Like", "As applicable"],
  [190, "19 Mar 2027", "Fri", "Supply Chain", "authority", "Autonomous Supply Chain: What 2027 Could Look Like", "As applicable"],
  [191, "20 Mar 2027", "Sat", "Enterprise Business", "search", "How to Measure EA Value in an AI Enterprise", "As applicable"],
  [192, "21 Mar 2027", "Sun", "Leadership / Mixed", "authority", "Leadership Case Study: Finance Transformation", "Health Care"],
  [193, "22 Mar 2027", "Mon", "HR", "search", "How Enterprise Architecture Connects HR Strategy to SAP Technology", "As applicable"],
  [194, "23 Mar 2027", "Tue", "CRM / Customer Experience", "search", "Enterprise Architecture for Omnichannel Customer Experience", "As applicable"],
  [195, "24 Mar 2027", "Wed", "Finance", "search", "How Enterprise Architecture Connects CFO Strategy to Technology", "As applicable"],
  [196, "25 Mar 2027", "Thu", "Procurement", "search", "How Enterprise Architecture Connects CPO Strategy to Technology", "As applicable"],
  [197, "26 Mar 2027", "Fri", "Supply Chain", "search", "How Enterprise Architecture Connects COO Strategy to Technology", "As applicable"],
  [198, "27 Mar 2027", "Sat", "Enterprise Business", "search", "Enterprise Architecture Metrics That Matter", "As applicable"],
  [199, "28 Mar 2027", "Sun", "Leadership / Mixed", "authority", "How to Build Your Enterprise Architect Portfolio in 2027", "Financials"],
  [200, "29 Mar 2027", "Mon", "HR", "search", "HR Data Governance for AI: A Practical Architecture", "As applicable"],
  [201, "30 Mar 2027", "Tue", "CRM / Customer Experience", "help", "AI Agents and Customer Service: Human Oversight by Design", "As applicable"],
  [202, "31 Mar 2027", "Wed", "Finance", "help", "Finance Process Transformation: From Automation to Autonomy", "As applicable"],

  // Apr 2027
  [203, "01 Apr 2027", "Thu", "Procurement", "help", "Procurement Process Transformation: Automation to Autonomy", "As applicable"],
  [204, "02 Apr 2027", "Fri", "Supply Chain", "help", "Supply Chain Process Transformation: Automation to Autonomy", "As applicable"],
  [205, "03 Apr 2027", "Sat", "Enterprise Business", "authority", "EA Case Study: Energy Transformation", "Information Technology"],
  [206, "04 Apr 2027", "Sun", "Leadership / Mixed", "authority", "Enterprise Architect Career Roadmap 2027", "As applicable"],
  [207, "05 Apr 2027", "Mon", "HR", "help", "AI Agents in HR: Where Humans Must Stay in Control", "As applicable"],
  [208, "06 Apr 2027", "Tue", "CRM / Customer Experience", "search", "CRM Automation vs. CRM Autonomy", "As applicable"],
  [209, "07 Apr 2027", "Wed", "Finance", "search", "Finance Master Data Architecture for AI", "As applicable"],
  [210, "08 Apr 2027", "Thu", "Procurement", "search", "Supplier Master Data Architecture for AI", "Information Technology"],
  [211, "09 Apr 2027", "Fri", "Supply Chain", "search", "Supply Chain Master Data Architecture for AI", "As applicable"],
  [212, "10 Apr 2027", "Sat", "Enterprise Business", "authority", "EA Case Study: Materials Transformation", "Communication Services"],
  [213, "11 Apr 2027", "Sun", "Leadership / Mixed", "authority", "Architecture Skills That Will Matter Most in 2027", "As applicable"],
  [214, "12 Apr 2027", "Mon", "HR", "search", "HR Automation vs. HR Autonomy: What Is the Difference?", "As applicable"],
  [215, "13 Apr 2027", "Tue", "CRM / Customer Experience", "help", "Designing an Autonomous Customer Experience", "As applicable"],
  [216, "14 Apr 2027", "Wed", "Finance", "help", "Financial Close Transformation with AI", "As applicable"],
  [217, "15 Apr 2027", "Thu", "Procurement", "help", "AI-Powered Category Management", "As applicable"],
  [218, "16 Apr 2027", "Fri", "Supply Chain", "help", "AI-Powered Supplier-to-Customer Visibility", "As applicable"],
  [219, "17 Apr 2027", "Sat", "Enterprise Business", "authority", "EA Case Study: Industrials Transformation", "Utilities"],
  [220, "18 Apr 2027", "Sun", "Leadership / Mixed", "help", "AI Skills Every Architect Should Build Now", "As applicable"],
  [221, "19 Apr 2027", "Mon", "HR", "help", "Designing an Autonomous HR Operating Model", "Utilities"],
  [222, "20 Apr 2027", "Tue", "CRM / Customer Experience", "authority", "CRM Transformation Roadmap: 2026 to 2027", "As applicable"],
  [223, "21 Apr 2027", "Wed", "Finance", "search", "AI-Powered Forecasting: Architecture and Governance", "As applicable"],
  [224, "22 Apr 2027", "Thu", "Procurement", "help", "AI in Spend Classification", "As applicable"],
  [225, "23 Apr 2027", "Fri", "Supply Chain", "help", "AI in Warehouse Management", "As applicable"],
  [226, "24 Apr 2027", "Sat", "Enterprise Business", "authority", "EA Case Study: Consumer Discretionary Transformation", "Real Estate"],
  [227, "25 Apr 2027", "Sun", "Leadership / Mixed", "search", "How to Stay Relevant as AI Changes Architecture", "As applicable"],
  [228, "26 Apr 2027", "Mon", "HR", "authority", "HR Transformation Roadmap: From 2026 Foundations to 2027 Outcomes", "As applicable"],
  [229, "27 Apr 2027", "Tue", "CRM / Customer Experience", "search", "How to Measure AI Value in Customer Experience", "As applicable"],
  [230, "28 Apr 2027", "Wed", "Finance", "search", "AI in Fraud and Risk: Enterprise Architecture View", "As applicable"],
  [231, "29 Apr 2027", "Thu", "Procurement", "help", "AI in Demand and Supply Alignment", "As applicable"],
  [232, "30 Apr 2027", "Fri", "Supply Chain", "help", "AI in Transportation Management", "Energy"],

  // May 2027
  [233, "01 May 2027", "Sat", "Enterprise Business", "authority", "EA Case Study: Consumer Staples Transformation", "Energy"],
  [234, "02 May 2027", "Sun", "Leadership / Mixed", "search", "Certification vs. Capability: What Employers Really Need", "As applicable"],
  [235, "03 May 2027", "Mon", "HR", "search", "How to Measure AI Value in HR Transformation", "As applicable"],
  [236, "04 May 2027", "Tue", "CRM / Customer Experience", "search", "Customer Experience Architecture Principles", "As applicable"],
  [237, "05 May 2027", "Wed", "Finance", "help", "AI in Working Capital Management", "As applicable"],
  [238, "06 May 2027", "Thu", "Procurement", "search", "Procurement Control Tower Architecture", "As applicable"],
  [239, "07 May 2027", "Fri", "Supply Chain", "help", "AI in Supply Chain Risk", "As applicable"],
  [240, "08 May 2027", "Sat", "Enterprise Business", "authority", "EA Case Study: Health Care Transformation", "Materials"],
  [241, "09 May 2027", "Sun", "Leadership / Mixed", "search", "How to Learn Architecture Through Real Projects", "As applicable"],
  [242, "10 May 2027", "Mon", "HR", "search", "HR Architecture Principles for the Autonomous Enterprise", "As applicable"],
  [243, "11 May 2027", "Tue", "CRM / Customer Experience", "authority", "Future of CRM: 2027 Trends for Enterprise Architects", "Materials"],
  [244, "12 May 2027", "Wed", "Finance", "search", "Finance Control Tower Architecture", "As applicable"],
  [245, "13 May 2027", "Thu", "Procurement", "search", "Procurement Architecture Principles for the Autonomous Enterprise", "As applicable"],
  [246, "14 May 2027", "Fri", "Supply Chain", "search", "Supply Chain Architecture Principles for the Autonomous Enterprise", "As applicable"],
  [247, "15 May 2027", "Sat", "Enterprise Business", "authority", "EA Case Study: Financial Services Transformation", "Industrials"],
  [248, "16 May 2027", "Sun", "Leadership / Mixed", "help", "The Architect Mindset: Systems Thinking", "As applicable"],
  [249, "17 May 2027", "Mon", "HR", "authority", "Future of HR Technology: 2027 Trends for Architects", "As applicable"],
  [250, "18 May 2027", "Tue", "CRM / Customer Experience", "help", "CRO + CIO Alignment: Architecting AI-Powered CX", "As applicable"],
  [251, "19 May 2027", "Wed", "Finance", "search", "Finance Architecture Principles for the Autonomous Enterprise", "As applicable"],
  [252, "20 May 2027", "Thu", "Procurement", "authority", "Future of Procurement Technology: 2027 Trends", "As applicable"],
  [253, "21 May 2027", "Fri", "Supply Chain", "authority", "Future of Supply Chain Technology: 2027 Trends", "As applicable"],
  [254, "22 May 2027", "Sat", "Enterprise Business", "authority", "EA Case Study: Information Technology Transformation", "Consumer Discretionary"],
  [255, "23 May 2027", "Sun", "Leadership / Mixed", "help", "The Architect Mindset: Critical Thinking", "As applicable"],
  [256, "24 May 2027", "Mon", "HR", "help", "CHRO + CIO Alignment: Architecting AI-Powered HR", "As applicable"],
  [257, "25 May 2027", "Tue", "CRM / Customer Experience", "search", "CRM Transformation Mistakes to Avoid", "As applicable"],
  [258, "26 May 2027", "Wed", "Finance", "authority", "Future of Finance Technology: 2027 Trends", "As applicable"],
  [259, "27 May 2027", "Thu", "Procurement", "help", "CPO + CIO Alignment for AI Transformation", "As applicable"],
  [260, "28 May 2027", "Fri", "Supply Chain", "help", "COO + CIO Alignment for AI Transformation", "As applicable"],
  [261, "29 May 2027", "Sat", "Enterprise Business", "authority", "EA Case Study: Communication Services Transformation", "Consumer Staples"],
  [262, "30 May 2027", "Sun", "Leadership / Mixed", "help", "The Architect Mindset: Business Acumen", "As applicable"],
  [263, "31 May 2027", "Mon", "HR", "search", "HR Transformation Mistakes That Enterprise Architects Should Avoid", "As applicable"],

  // Jun 2027
  [264, "01 Jun 2027", "Tue", "CRM / Customer Experience", "help", "Customer Journey Mapping for Enterprise Architects", "As applicable"],
  [265, "02 Jun 2027", "Wed", "Finance", "help", "CFO + CIO Alignment for AI Transformation", "Consumer Staples"],
  [266, "03 Jun 2027", "Thu", "Procurement", "search", "Procurement Transformation Mistakes to Avoid", "As applicable"],
  [267, "04 Jun 2027", "Fri", "Supply Chain", "search", "Supply Chain Transformation Mistakes to Avoid", "As applicable"],
  [268, "05 Jun 2027", "Sat", "Enterprise Business", "authority", "EA Case Study: Utilities Transformation", "Health Care"],
  [269, "06 Jun 2027", "Sun", "Leadership / Mixed", "help", "The Architect Mindset: Data-Driven Decisions", "As applicable"],
  [270, "07 Jun 2027", "Mon", "HR", "search", "How to Build a Future-Ready HR Architecture Capability", "As applicable"],
  [271, "08 Jun 2027", "Tue", "CRM / Customer Experience", "search", "Customer Data Platform Architecture Explained", "As applicable"],
  [272, "09 Jun 2027", "Wed", "Finance", "search", "Finance Transformation Mistakes Enterprise Architects Should Avoid", "As applicable"],
  [273, "10 Jun 2027", "Thu", "Procurement", "search", "How to Measure AI ROI in Procurement", "As applicable"],
  [274, "11 Jun 2027", "Fri", "Supply Chain", "search", "How to Measure AI ROI in Supply Chain", "As applicable"],
  [275, "12 Jun 2027", "Sat", "Enterprise Business", "authority", "EA Case Study: Real Estate Transformation", "Financials"],
  [276, "13 Jun 2027", "Sun", "Leadership / Mixed", "help", "The Architect Mindset: Experimentation", "Financials"],
  [277, "14 Jun 2027", "Mon", "HR", "search", "AI + SAP SuccessFactors: A Reference Architecture", "As applicable"],
  [278, "15 Jun 2027", "Tue", "CRM / Customer Experience", "help", "AI-Powered Customer Insights: From Data to Action", "As applicable"],
  [279, "16 Jun 2027", "Wed", "Finance", "search", "How to Measure AI ROI in Finance", "As applicable"],
  [280, "17 Jun 2027", "Thu", "Procurement", "search", "Procurement API and Integration Architecture", "As applicable"],
  [281, "18 Jun 2027", "Fri", "Supply Chain", "search", "Supply Chain API and Integration Architecture", "As applicable"],
  [282, "19 Jun 2027", "Sat", "Enterprise Business", "search", "11 GICS Sectors: How AI Changes Enterprise Architecture", "Information Technology"],
  [283, "20 Jun 2027", "Sun", "Leadership / Mixed", "help", "The Architect Mindset: Curiosity", "As applicable"],
  [284, "21 Jun 2027", "Mon", "HR", "help", "Employee Central as the HR System of Context", "As applicable"],
  [285, "22 Jun 2027", "Tue", "CRM / Customer Experience", "search", "CRM + SAP Integration Patterns", "As applicable"],
  [286, "23 Jun 2027", "Wed", "Finance", "search", "Finance API and Integration Architecture", "As applicable"],
  [287, "24 Jun 2027", "Thu", "Procurement", "search", "Event-Driven Procurement Architecture", "Information Technology"],
  [288, "25 Jun 2027", "Fri", "Supply Chain", "search", "Event-Driven Supply Chain Architecture", "As applicable"],
  [289, "26 Jun 2027", "Sat", "Enterprise Business", "help", "11 GICS Sectors: How SAP Supports Transformation", "Communication Services"],
  [290, "27 Jun 2027", "Sun", "Leadership / Mixed", "help", "The Architect Mindset: Continuous Learning", "As applicable"],
  [291, "28 Jun 2027", "Mon", "HR", "search", "HR Integration Patterns for AI Agents", "As applicable"],
  [292, "29 Jun 2027", "Tue", "CRM / Customer Experience", "search", "API-Led CRM Architecture for AI", "As applicable"],
  [293, "30 Jun 2027", "Wed", "Finance", "search", "Event-Driven Finance Architecture", "As applicable"],

  // Jul 2027
  [294, "01 Jul 2027", "Thu", "Procurement", "search", "Supplier Collaboration Architecture", "As applicable"],
  [295, "02 Jul 2027", "Fri", "Supply Chain", "help", "Digital Twin + AI for Supply Chain", "As applicable"],
  [296, "03 Jul 2027", "Sat", "Enterprise Business", "search", "Enterprise Architecture Patterns for Industry AI", "As applicable"],
  [297, "04 Jul 2027", "Sun", "Leadership / Mixed", "search", "How to Run a High-Impact Architecture Workshop", "As applicable"],
  [298, "05 Jul 2027", "Mon", "HR", "search", "Payroll Transformation: SAP, AI and Enterprise Architecture", "Utilities"],
  [299, "06 Jul 2027", "Tue", "CRM / Customer Experience", "search", "Event-Driven Customer Experience Architecture", "As applicable"],
  [300, "07 Jul 2027", "Wed", "Finance", "help", "SAP Analytics Cloud + AI: What Architects Should Know", "As applicable"],
  [301, "08 Jul 2027", "Thu", "Procurement", "help", "AI-Powered Procurement Risk Management", "As applicable"],
  [302, "09 Jul 2027", "Fri", "Supply Chain", "help", "AI-Powered Supply Chain Scenario Planning", "As applicable"],
  [303, "10 Jul 2027", "Sat", "Enterprise Business", "search", "Domain Architecture vs. Industry Architecture", "As applicable"],
  [304, "11 Jul 2027", "Sun", "Leadership / Mixed", "search", "How to Present Architecture to the Board", "As applicable"],
  [305, "12 Jul 2027", "Mon", "HR", "search", "Workforce Time Architecture for the Autonomous Enterprise", "As applicable"],
  [306, "13 Jul 2027", "Tue", "CRM / Customer Experience", "search", "Customer Service AI: Architecture and Governance", "As applicable"],
  [307, "14 Jul 2027", "Wed", "Finance", "help", "Business Data Context for Finance Agents", "As applicable"],
  [308, "15 Jul 2027", "Thu", "Procurement", "help", "Business Context for Procurement Agents", "As applicable"],
  [309, "16 Jul 2027", "Fri", "Supply Chain", "help", "Business Context for Supply Chain Agents", "Energy"],
  [310, "17 Jul 2027", "Sat", "Enterprise Business", "search", "Enterprise Ecosystem Architecture", "As applicable"],
  [311, "18 Jul 2027", "Sun", "Leadership / Mixed", "search", "How to Handle Architecture Conflict", "As applicable"],
  [312, "19 Jul 2027", "Mon", "HR", "search", "HR Analytics vs. Workforce Intelligence", "As applicable"],
  [313, "20 Jul 2027", "Tue", "CRM / Customer Experience", "help", "AI in Sales Forecasting and Pipeline Management", "As applicable"],
  [314, "21 Jul 2027", "Wed", "Finance", "help", "Designing Human-in-the-Loop Finance Decisions", "As applicable"],
  [315, "22 Jul 2027", "Thu", "Procurement", "help", "Designing Human-in-the-Loop Sourcing Decisions", "As applicable"],
  [316, "23 Jul 2027", "Fri", "Supply Chain", "help", "Designing Human-in-the-Loop Supply Chain Decisions", "As applicable"],
  [317, "24 Jul 2027", "Sat", "Enterprise Business", "search", "Platform Architecture for AI", "As applicable"],
  [318, "25 Jul 2027", "Sun", "Leadership / Mixed", "search", "How to Challenge a Technology Decision Professionally", "As applicable"],
  [319, "26 Jul 2027", "Mon", "HR", "search", "AI-Powered Employee Service: Architecture and Governance", "As applicable"],
  [320, "27 Jul 2027", "Tue", "CRM / Customer Experience", "search", "AI-Powered Account Management Architecture", "Materials"],
  [321, "28 Jul 2027", "Wed", "Finance", "search", "Finance Architecture Workshop: Build an AI-Ready Target State", "As applicable"],
  [322, "29 Jul 2027", "Thu", "Procurement", "search", "Procurement Architecture Workshop: Build an AI-Ready Target State", "As applicable"],
  [323, "30 Jul 2027", "Fri", "Supply Chain", "search", "Supply Chain Architecture Workshop: Build an AI-Ready Target State", "As applicable"],
  [324, "31 Jul 2027", "Sat", "Enterprise Business", "help", "Business Transformation Management + AI", "As applicable"],

  // Aug 2027
  [325, "01 Aug 2027", "Sun", "Leadership / Mixed", "search", "How to Build an Architecture Community", "As applicable"],
  [326, "02 Aug 2027", "Mon", "HR", "authority", "HR Transformation Case Study: From Shared Services to AI Agents", "Industrials"],
  [327, "03 Aug 2027", "Tue", "CRM / Customer Experience", "help", "Customer Experience Control Tower: A Practical Model", "As applicable"],
  [328, "04 Aug 2027", "Wed", "Finance", "help", "Finance Strategy to Execution: The EA Playbook", "As applicable"],
  [329, "05 Aug 2027", "Thu", "Procurement", "help", "Procurement Strategy to Execution: The EA Playbook", "As applicable"],
  [330, "06 Aug 2027", "Fri", "Supply Chain", "help", "Supply Chain Strategy to Execution: The EA Playbook", "As applicable"],
  [331, "07 Aug 2027", "Sat", "Enterprise Business", "search", "Clean Core + AI: Why SAP Architecture Matters", "Consumer Discretionary"],
  [332, "08 Aug 2027", "Sun", "Leadership / Mixed", "search", "How to Teach Architecture Through Case Studies", "As applicable"],
  [333, "09 Aug 2027", "Mon", "HR", "help", "Designing Human-in-the-Loop HR Processes", "As applicable"],
  [334, "10 Aug 2027", "Tue", "CRM / Customer Experience", "search", "CRM Architecture Workshop: Design an AI-Ready Customer Journey", "As applicable"],
  [335, "11 Aug 2027", "Wed", "Finance", "authority", "Top 7 AI Use Cases for Finance Leaders in 2027", "As applicable"],
  [336, "12 Aug 2027", "Thu", "Procurement", "authority", "Top 7 AI Use Cases for Procurement Leaders in 2027", "As applicable"],
  [337, "13 Aug 2027", "Fri", "Supply Chain", "authority", "Top 7 AI Use Cases for Supply Chain Leaders in 2027", "As applicable"],
  [338, "14 Aug 2027", "Sat", "Enterprise Business", "search", "RISE with SAP + AI: Transformation Architecture", "As applicable"],
  [339, "15 Aug 2027", "Sun", "Leadership / Mixed", "authority", "My 2027 Predictions for Enterprise Architecture", "As applicable"],
  [340, "16 Aug 2027", "Mon", "HR", "search", "HR Architecture Workshop: Design an AI-Ready Workforce", "As applicable"],
  [341, "17 Aug 2027", "Tue", "CRM / Customer Experience", "help", "Customer Strategy to Technology: The EA Playbook", "As applicable"],
  [342, "18 Aug 2027", "Wed", "Finance", "help", "Finance Transformation KPI Framework", "Consumer Staples"],
  [343, "19 Aug 2027", "Thu", "Procurement", "search", "Procurement KPI Architecture", "As applicable"],
  [344, "20 Aug 2027", "Fri", "Supply Chain", "search", "Supply Chain KPI Architecture", "As applicable"],
  [345, "21 Aug 2027", "Sat", "Enterprise Business", "help", "SAP BTP as the Integration and Extension Foundation", "As applicable"],
  [346, "22 Aug 2027", "Sun", "Leadership / Mixed", "authority", "My 2027 Predictions for Enterprise AI", "As applicable"],
  [347, "23 Aug 2027", "Mon", "HR", "search", "HR Strategy to Execution: The Enterprise Architecture Playbook", "As applicable"],
  [348, "24 Aug 2027", "Tue", "CRM / Customer Experience", "authority", "Top 7 AI Use Cases for CRM Leaders in 2027", "As applicable"],
  [349, "25 Aug 2027", "Wed", "Finance", "help", "AI Risk Assessment for Financial Processes", "As applicable"],
  [350, "26 Aug 2027", "Thu", "Procurement", "help", "AI Risk Assessment for Procurement Processes", "As applicable"],
  [351, "27 Aug 2027", "Fri", "Supply Chain", "help", "AI Risk Assessment for Supply Chain Processes", "As applicable"],
  [352, "28 Aug 2027", "Sat", "Enterprise Business", "search", "Enterprise Architecture for Autonomous Business Processes", "As applicable"],
  [353, "29 Aug 2027", "Sun", "Leadership / Mixed", "authority", "My 2027 Predictions for SAP Transformation", "Financials"],
  [354, "30 Aug 2027", "Mon", "HR", "authority", "Top 7 AI Use Cases for HR Leaders in 2027", "As applicable"],
  [355, "31 Aug 2027", "Tue", "CRM / Customer Experience", "search", "Customer Experience KPI Architecture", "As applicable"],

  // Sep 2027
  [356, "01 Sep 2027", "Wed", "Finance", "authority", "Finance Case Study: From Shared Services to Intelligent Operations", "Financials"],
  [357, "02 Sep 2027", "Thu", "Procurement", "authority", "Procurement Case Study: From Shared Services to Intelligent Operations", "Financials"],
  [358, "03 Sep 2027", "Fri", "Supply Chain", "authority", "Supply Chain Case Study: From Planning to Intelligent Execution", "Information Technology"],
  [359, "04 Sep 2027", "Sat", "Enterprise Business", "help", "From Systems of Record to Systems of Intelligence", "As applicable"],
  [360, "05 Sep 2027", "Sun", "Leadership / Mixed", "help", "The Biggest Enterprise Transformation Lessons of 2026", "As applicable"],
  [361, "06 Sep 2027", "Mon", "HR", "help", "HR Transformation KPI Framework: From Activity to Outcomes", "As applicable"],
  [362, "07 Sep 2027", "Tue", "CRM / Customer Experience", "help", "AI Risk Assessment for Customer Processes", "As applicable"],
  [363, "08 Sep 2027", "Wed", "Finance", "help", "Designing Autonomous Financial Planning", "As applicable"],
  [364, "09 Sep 2027", "Thu", "Procurement", "help", "Designing Autonomous Supplier Management", "Information Technology"],
  [365, "10 Sep 2027", "Fri", "Supply Chain", "help", "Designing Autonomous Planning", "As applicable"]
];

const monthMap = {
  "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12",
  "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
  "May": "05", "Jun": "06", "Jul": "07", "Aug": "08"
};

const entries = rawEntries.map(([id, dateStr, dayOfWeek, domain, intent, title, gicsSector]) => {
  const parts = dateStr.split(" ");
  const dayNum = parts[0];
  const monthStr = parts[1];
  const year = parts[2];
  const isoDate = `${year}-${monthMap[monthStr]}-${dayNum}`;

  let phase = "Phase 1: Foundation (Sep-Dec 2026)";
  if (id >= 113 && id <= 202) {
    phase = "Phase 2: Agentic Transformation (Jan-Mar 2027)";
  } else if (id >= 203 && id <= 293) {
    phase = "Phase 3: Autonomous Enterprise (Apr-Jun 2027)";
  } else if (id >= 294) {
    phase = "Phase 4: 2028 Horizon (Jul-Sep 2027)";
  }

  const hook = `How do enterprise architects combine Enterprise Architecture and AI to solve critical ${domain.toLowerCase()} transformation challenges using SAP context?`;
  const cta = `What is your biggest ${domain.toLowerCase()} architecture challenge as AI transforms the enterprise? Share your thoughts below and subscribe to SuccessLabs Academy for tomorrow's live session.`;
  const suggestedChapters = [
    "00:00 Introduction & Hook",
    "02:00 Why This Transformation Matters Now",
    "07:00 Business Architecture & Capability Mapping",
    "15:00 Target Enterprise Architecture Blueprint",
    "25:00 SAP Platform Context & Integration",
    "35:00 AI, Agentic Workflows & Context Data",
    "45:00 Industry Case Study & Governance",
    "55:00 Architect's Actionable Takeaways",
    "58:00 Live Audience Q&A",
    "60:00 Bridge to Tomorrow"
  ];

  return {
    id,
    date: dateStr,
    isoDate,
    dayOfWeek,
    domain,
    intent,
    title,
    angle: "EA + AI + SAP",
    gicsSector,
    phase,
    hook,
    cta,
    suggestedChapters
  };
});

// Write to /src/data/calendarData.ts
const tsContent = `import { CalendarEntry } from '../types';

export const MASTER_CALENDAR: CalendarEntry[] = ${JSON.stringify(entries, null, 2)};

export function getCalendarEntryById(id: number): CalendarEntry | undefined {
  return MASTER_CALENDAR.find((e) => e.id === id);
}

export function getCalendarEntryByDate(dateStr: string): CalendarEntry | undefined {
  return MASTER_CALENDAR.find((e) => e.date.toLowerCase() === dateStr.toLowerCase() || e.isoDate === dateStr);
}

export function getTodayCalendarEntry(currentDate?: Date): CalendarEntry {
  const now = currentDate || new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const iso = \`\${year}-\${month}-\${day}\`;
  
  const match = MASTER_CALENDAR.find((e) => e.isoDate === iso);
  if (match) return match;
  // If today is outside the range (e.g. before Sep 11, 2026 or testing), return Day 1
  return MASTER_CALENDAR[0];
}

export const DOMAINS = [
  'HR',
  'CRM / Customer Experience',
  'Finance',
  'Procurement',
  'Supply Chain',
  'Enterprise Business',
  'Leadership / Mixed'
] as const;

export const PHASES = [
  'Phase 1: Foundation (Sep-Dec 2026)',
  'Phase 2: Agentic Transformation (Jan-Mar 2027)',
  'Phase 3: Autonomous Enterprise (Apr-Jun 2027)',
  'Phase 4: 2028 Horizon (Jul-Sep 2027)'
] as const;

export const GICS_SECTORS = [
  'Energy',
  'Materials',
  'Industrials',
  'Consumer Discretionary',
  'Consumer Staples',
  'Health Care',
  'Financials',
  'Information Technology',
  'Communication Services',
  'Utilities',
  'Real Estate'
] as const;
`;

fs.mkdirSync('./src/data', { recursive: true });
fs.writeFileSync('./src/data/calendarData.ts', tsContent);
console.log('Generated /src/data/calendarData.ts with', entries.length, 'entries');
