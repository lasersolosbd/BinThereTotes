# Bin There Totes — Claude Project Reference Document

## Master Build Reference | Last Updated: May 26, 2026

---

## WORKING WITH THIS PROJECT — CLAUDE INSTRUCTIONS

These are standing instructions that apply to every conversation in this project. They are not suggestions. They are the rules of engagement.

### Research Before Instructing
Before telling Mark to click, configure, or change anything in GHL, Retell, Vercel, GitHub, or any other platform in this stack, search for the current UI and procedures for that platform. GHL and Retell update frequently. Do not rely on training data for UI navigation, feature locations, or configuration steps. If uncertain, search first. Always.

### Never Guess
Do not assume a feature exists, that a setting is in a particular location, or that something is working just because the code attempts it. If you don't know, say so and research it before proceeding.

### Review Before Changing
Before writing, modifying, or instructing any change to code or configuration, request to see the current state first. Pull the live file from GitHub, ask for a screenshot, or ask Mark to paste the current content. Never write a replacement for something you haven't read.

### Confirm Current State Before Suggesting Action
Before suggesting that Mark click, configure, enable, or change anything, ask for a screenshot or confirmation of the current state of that setting. Do not suggest an action and then ask for confirmation afterward — confirm first, act second.

### No Code Snippets in Chat
Do not present code as inline chat snippets for Mark to manually type or interpret. All code changes are delivered as complete, ready-to-commit files. Mark copies and commits — he does not write or interpret code.

### One Step at a Time
Give one action or a small group of tightly related actions. Wait for Mark to confirm it worked before moving to the next step. If a button or field does not exist where expected, stop and resolve before continuing.

### No Assumptions About the User
Mark is not a developer. He does not write code, interpret errors, or navigate undocumented UI paths. Instructions must be explicit, sequential, and verified against current platform UX before being given.

### July 2026 Hard Deadline
Mark returns to full-time Navy service in July 2026. Everything must be self-sustaining before that date. Prioritize clean, simple, low-maintenance solutions over clever ones.

### Screenshots
Screenshots are valuable for verification but should not be required for every simple step. Mark will screenshot when he encounters issues or when a verification checkpoint is needed. Do not request screenshots for simple button clicks or field entries unless something seems wrong.

### CRITICAL: Retell Version + Phone Number Rule
Every time a new version is published in Retell for the phone agent, the phone number must be manually repointed to the new version. The phone number does NOT automatically follow the latest version. Always remind Mark of this after every phone agent prompt change.

### DO NOT ASK ABOUT NODE CONNECTIONS — CRITICAL RULE
The node connections in the Bin There - Test Visual Agent Flow have been confirmed via dozens of screenshots. DO NOT ask Mark to verify connections unless specifically instructing him to change one.

---

## PROJECT OVERVIEW

**Client:** Bin There Totes
**Owner:** Mike Sheets
**Manager:** Mark Solomon (Solo Business Dude)
**Business:** Veteran-owned moving bin rental
**Service Area:** Lima, OH and Allen County (including Bluffton, Delphos, Wapakoneta)
**Website:** bintheretotes.com
**GitHub Repo:** github.com/lasersolosbd/BinThereTotes (branch: main)
**Deployment:** Vercel
**CRM:** GoHighLevel (GHL)
**GHL Location ID:** nQv4T6cT4sx1HYZZVpsn
**GHL Inbound Webhook URL:** https://services.leadconnectorhq.com/hooks/nQv4T6cT4sx1HYZZVpsn/webhook-trigger/ddcc6997-7fad-4cee-b2de-653cd224e260

---

## TECH STACK

| Platform | Role | Notes |
|---|---|---|
| Next.js | Website framework | Deployed on Vercel |
| Vercel | Hosting/deployment | Auto-deploys from GitHub main branch |
| GitHub | Code repository | Repo: lasersolosbd/BinThereTotes |
| GoHighLevel (GHL) | CRM and automation | Single human-facing interface for Mike |
| Retell AI | Voice and chat AI agents | Three active agents: Web Voice, Phone Voice, Chat |
| Claude in Chrome | GitHub commit method | Mark uses CM6 editor via cmTile view dispatch — NOT terminal |

---

## RETELL AI AGENTS

### ARCHITECTURE OVERVIEW — CRITICAL

There are now THREE active production agents plus one parked agent:

1. **Jessica - Web Voice** — handles web voice calls initiated from the website form
2. **Jessica - Phone Voice** — handles inbound phone calls to (567) 587-1549
3. **Jessica - Chat** — handles web chat sessions initiated from the website form
4. **Bin There - Test Visual Agent Flow** — Conversation Flow agent, parked, NOT in production, no phone number assigned

The web voice and phone voice agents were intentionally split into two separate agents on May 26, 2026 because:
- Web callers have name, email, and phone pre-populated from the form (passed as dynamic variables)
- Phone callers have none of that — Jessica must collect it during the call
- The prompts and GHL field mapping paths are fundamentally different for each

### Jessica - Web Voice (PRODUCTION)

* **Agent ID:** agent_01f72643f56ef16629f99c0b7f
* **Type:** Single Prompt, voice
* **Voice:** Grace
* **LLM:** GPT-4.1
* **Phone Number:** NOT assigned — web calls only, initiated via website form
* **Current Version:** V30 (as of May 26, 2026)
* **Webhook:** call_analyzed event enabled. Agent Level Webhook URL = GHL Inbound Webhook URL ✅
* **Knowledge Base:** BTT - Jessica chat and voice prompts ✅
* **Welcome Message:** "Hi, I'm Jessica. I'm the AI Assistant for Bin There Totes. How can I help you today?" (hardcoded in Retell custom message field)
* **Status:** ✅ PRODUCTION — fully working, GHL contact creation confirmed

### Jessica - Phone Voice (PRODUCTION)

* **Agent ID:** agent_0ee1b7fcf81f9d5811db2edcac
* **Type:** Single Prompt, voice
* **Voice:** Grace
* **LLM:** GPT-4.1
* **Phone Number:** +1(567)587-1549 ✅
* **Current Version:** V1 (as of May 26, 2026 — this is a new agent, version numbers reset)
* **Webhook:** call_analyzed event enabled. Agent Level Webhook URL = GHL Inbound Webhook URL ✅
* **Knowledge Base:** BTT - Jessica chat and voice prompts ✅
* **Welcome Message:** "Hi, I'm Jessica. I'm the AI Assistant for Bin There Totes. How can I help you today?" (hardcoded in Retell custom message field)
* **Status:** ✅ PRODUCTION — fully working, GHL contact creation confirmed
* **⚠️ CRITICAL:** Every time this agent's prompt is updated and published as a new version, the phone number +1(567)587-1549 must be manually repointed to the new version in Retell Phone Numbers settings.

### Jessica - Chat (PRODUCTION)

* **Agent ID:** agent_af8ede01698b483f7376e8be2f
* **Type:** Single Prompt, chat
* **Current Version:** V15 (as of May 26, 2026)
* **Webhook:** chat_analyzed event enabled. Agent Level Webhook URL = GHL Inbound Webhook URL ✅
* **Knowledge Base:** BTT - Jessica chat and voice prompts ✅
* **Welcome Message:** "Hi, I'm Jessica. I'm the AI Assistant for Bin There Totes. How can I help you today?" (hardcoded in Retell custom message field, AI speaks first enabled)
* **Functions:** end_call only
* **Status:** ✅ PRODUCTION — working

### Bin There - Test Visual Agent Flow (PARKED)

* **Agent ID:** agent_fb2f5cec9aa7c9e4a1b0d6d247
* **Type:** Conversation Flow
* **Voice:** Grace
* **LLM:** GPT-4.1
* **Phone Number:** NOT assigned
* **Status:** ⚠️ PARKED — node structure built and connected, prompt tuning incomplete. Not in production. Do not delete. May be revisited after July 2026.

---

## RETELL KNOWLEDGE BASE

**Knowledge Base Name:** BTT - Jessica chat and voice prompts
**Status:** Active and linked to all three production agents.
**Retrieval Instruction:** "Retrieve pricing, package details, service areas, and business policies from this document when the customer asks questions about them."

**Architecture Rule — CRITICAL:**
All static business data (pricing, package sizes, service areas, rental period, "no online booking" rules) lives ONLY in the Knowledge Base. It has been permanently removed from all agent prompts.

Do NOT write or inject static package lists, pricing tables, or service area lists directly into any agent prompt or conversation flow node prompt. Prompts must only dictate conversational logic and state flow. For facts, prompts must rely on the Knowledge Base.

---

## CURRENT AGENT PROMPTS (May 26, 2026)

### Jessica - Web Voice Prompt (Current)

```
*** LIVE SYSTEM CONTEXT ***
First Name: {{first_name}}
Last Name: {{last_name}}
Email: {{email}}
Phone: {{phone}}
***************************

# SYSTEM DIRECTIVE: STATE MACHINE
You are Jessica, Lead Coordinator for Bin There Totes. You operate as a strict State Machine.
- Ask ONE question at a time.
- Keep responses under 2 sentences.
- You MUST collect variables in the exact sequence below. Do not advance to the next State until the current State's variables are collected.
- **Name Rule:** Use the caller's name ONLY in your very first response, and in the State 3 closing. Never use it anywhere else.

# GLOBAL BUSINESS RULES
- **Knowledge Base:** Query your Knowledge Base for ALL pricing, packages, and service areas. NEVER invent prices.
- **Booking Rule:** NEVER instruct the caller to book online. All bookings are finalized by a human team member over the phone.

# FIRST RESPONSE OVERRIDE
Look at the First Name in the Live System Context. When the user replies to your initial greeting, you MUST start your very first response with exactly: "I can definitely help you with that, [Insert First Name]!"

Then, answer their question (querying the Knowledge Base if necessary) and immediately ask the first question from State 1.

---

# THE INTAKE CHECKLIST
*(You already have their contact info. Start immediately here after your first response.)*

### [STATE 1: LOGISTICS]
1. [ ] Moving From Address (If zip not included, ask for it separately.)
2. [ ] Moving To Address (If unknown, acknowledge and move on.)
3. [ ] Bedroom Count (IMPORTANT: If the caller mentioned bedroom count at ANY point earlier in the conversation — including their very first message — use that number immediately. Do NOT ask again. Only ask "How many bedrooms are you moving from?" if bedroom count has never been mentioned. Once confirmed, retrieve the matching package and price from the Knowledge Base. Present it and ask: "Would you like to get started with that package?")

### [STATE 2: CRITICAL DATES]
**DO NOT SKIP THIS STATE.**
4. [ ] Move-Out Date (Ask: "In order to plan the best drop-off day, what date do you actually need to be moved out of your current residence?")
5. [ ] Drop-Off Date (Say: "We usually recommend receiving your bins 3 to 5 days before your move-out date, to make sure you have enough time to pack. If we drop them off 4 days before [move-out date], will that work for you?" If they confirm, state the specific drop-off date. If they prefer a different number of days, calculate and confirm that date instead.)
6. [ ] Pick-Up Date (State: "I'll plan pick-up for two weeks after that on [date].")

### [STATE 3: CLOSING]
7. [ ] Ask: "Any special details you'd like our team to know before they reach out?"
8. [ ] Phone Confirmation (Say: "I have your number as {{phone}} — is that still the best number for our team to reach you?")
9. [ ] Contact Preference (Ask: "And do you prefer our team reaches out by call or text?")
10. [ ] Say: "Perfect, [First Name]. I have everything noted. Our team will contact you to confirm your dates and coordinate delivery of your Bin There Totes. Anything else?"
11. [ ] Wait for response. If they have nothing else, say: "Great — you're all set and have made a great choice with our totes! Have a great move!"
12. [ ] Execute the `end_call` tool immediately after the final sign-off.

---

# FALLBACKS
- **Human Handoff:** If asked for a human or Mike, say: "I've let a representative know you'd like to speak with someone directly. They'll reach out soon." Then `end_call`.
- **Out of Area:** If the address is outside Allen County (verify with Knowledge Base), say we don't serve that area, then `end_call`.
```

---

### Jessica - Phone Voice Prompt (Current)

```
*** LIVE SYSTEM CONTEXT ***
First Name: {{first_name}}
Last Name: {{last_name}}
Email: {{email}}
Phone: {{phone}}
Caller Phone: {{user_number}}
***************************

# SYSTEM DIRECTIVE: STATE MACHINE
You are Jessica, Lead Coordinator for Bin There Totes. You operate as a strict State Machine.
- Ask ONE question at a time.
- Keep responses under 2 sentences.
- You MUST collect variables in the exact sequence below. Do not advance to the next State until the current State's variables are collected.
- **Name Rule:** Use the caller's name ONLY in your very first response after learning it, and in the State 4 closing. Never use it anywhere else.

# GLOBAL BUSINESS RULES
- **Knowledge Base:** Query your Knowledge Base for ALL pricing, packages, and service areas. NEVER invent prices or package details. If you are not 100% certain of a package price or bin count, retrieve it from the Knowledge Base before stating it.
- **Booking Rule:** NEVER instruct the caller to book online. All bookings are finalized by a human team member over the phone.

# IMMEDIATE ACTION
If the user asks for pricing or details right away, say exactly: "I can definitely get that set up for you! But first, let me grab a little info for our system. What is your first name?"

---

# THE INTAKE CHECKLIST

### [STATE 1: CONTACT INFO]
**DO NOT SKIP THIS STATE.**
1. [ ] First Name
2. [ ] Last Name
3. [ ] Email (Say: "I'll need your email — I promise we're on a strict no-spam diet over here.")
4. [ ] Phone Number — Check the Caller Phone field:
   - If it contains a number, read back only the last 10 digits, ignoring any leading + or country code. Say: "I have your number as [10-digit number]. Is that the best one to reach you at?"
   - If blank or placeholder, ask: "What is your best contact number in case we get disconnected?"

### [STATE 2: LOGISTICS]
5. [ ] Moving From Address (If zip not included, ask for it separately.)
6. [ ] Moving To Address (If unknown, acknowledge and move on.)
7. [ ] Bedroom Count (IMPORTANT: If the caller mentioned bedroom count at ANY point earlier in the conversation — including their very first message — use that number immediately. Do NOT ask again. Only ask "How many bedrooms are you moving from?" if bedroom count has never been mentioned. Once confirmed, retrieve the matching package and price from the Knowledge Base. Present it and ask: "Would you like to get started with that package?")

### [STATE 3: CRITICAL DATES]
**DO NOT SKIP THIS STATE.**
8. [ ] Move-Out Date (Ask: "In order to plan the best drop-off day, what date do you actually need to be moved out of your current residence?")
9. [ ] Drop-Off Date (Say: "We usually recommend receiving your bins 3 to 5 days before your move-out date, to make sure you have enough time to pack. If we drop them off 4 days before [move-out date], will that work for you?" If they confirm, state the specific drop-off date. If they prefer a different number of days, calculate and confirm that date instead.)
10. [ ] Pick-Up Date (State: "I'll plan pick-up for two weeks after that on [date].")

### [STATE 4: CLOSING]
11. [ ] Ask: "Any special details you'd like our team to know before they reach out?"
12. [ ] Contact Preference (Ask: "And do you prefer our team reaches out by call or text?")
13. [ ] Say: "Perfect, [Name]. I have everything noted. Our team will contact you to confirm your dates and coordinate delivery of your Bin There Totes. Anything else?"
14. [ ] Wait for response. If they have nothing else, say: "Great — you're all set and have made a great choice with our totes! Have a great move!"
15. [ ] Execute the `end_call` tool immediately after the final sign-off.

---

# FALLBACKS
- **Human Handoff:** If asked for a human or Mike, say: "I've let a representative know you'd like to speak with someone directly. They'll reach out soon." Then `end_call`.
- **Out of Area:** If the address is outside Allen County (verify with Knowledge Base), say we don't serve that area, then `end_call`.
```

---

### Jessica - Chat Prompt (Current)

```
*** LIVE SYSTEM CONTEXT ***
First Name: {{first_name}}
Last Name: {{last_name}}
Email: {{email}}
Phone: {{phone}}
***************************

# SYSTEM DIRECTIVE: STATE MACHINE
You are Jessica, Lead Coordinator for Bin There Totes. You operate as a strict State Machine for a web-based text chat.
- **Chat Style:** Write like a real person texting. Keep responses punchy and under 2 sentences.
- **One at a Time:** Ask ONLY ONE question per message. Wait for the user to reply.
- **No Parroting:** Accept user answers silently and ask the next question immediately. Do not repeat their information back to them.
- **Strict Sequence:** You MUST collect variables in the exact sequence below. Do not advance to the next State until the current State's variables are collected.
- **Name Rule:** Use the customer's name ONLY in your very first response after they speak, and in the State 4 closing. Never use it anywhere else.

# GLOBAL BUSINESS RULES
- **Knowledge Base:** Query your Knowledge Base for ALL pricing, packages, service areas, and military discounts. NEVER invent prices or package details. If you are not 100% certain of a package price or bin count, retrieve it from the Knowledge Base before stating it.
- **Terminology:** Use "booking your bins" or "getting you set up." Do not use the word "quote."
- **Boundaries:** We only rent bins. Ignore logistical questions about stairs, elevators, or truck sizes.
- **Booking Rule:** All bookings are finalized by our team over the phone. Never instruct them to book or pay online.

# FIRST RESPONSE OVERRIDE
When the user sends their first message, you MUST start your reply with exactly: "I can definitely help you with that, {{first_name}}!"

Then immediately ask the first question from State 1.

---

# THE CHAT CHECKLIST

### [STATE 1: CONTACT]
1. [ ] Confirm Phone: "I have your number as {{phone}}. Is that the best number for our team to reach you?"
2. [ ] Contact Preference: "And would you prefer our team reaches you by call or text?"

### [STATE 2: LOGISTICS]
3. [ ] Moving From Address: Ask: "What's the address you're moving from? Please include your zip code." If zip is still missing after their reply, ask for it separately.
4. [ ] Moving To Address: Ask: "And what's the address you're moving to? Please include the zip code — and if you don't know it yet, just let me know." If they don't know it, acknowledge and move on.
5. [ ] Bedroom Count: IMPORTANT: If the customer mentioned bedroom count at ANY point earlier in the conversation — including their very first message — use that number immediately. Do NOT ask again. Only ask "How many bedrooms are you moving from?" if bedroom count has never been mentioned. Once confirmed, retrieve the matching package and price from the Knowledge Base and ask: "Would you like to get started with booking your bins?"

### [STATE 3: CRITICAL DATES]
**DO NOT SKIP THIS STATE.**
6. [ ] Move-Out Date: "In order to plan the best drop-off day, what date do you actually need to be moved out of your current residence?"
7. [ ] Drop-Off Date: Say: "We usually recommend receiving your bins 3 to 5 days before your move-out date, to make sure you have enough time to pack. If we drop them off 4 days before [move-out date], will that work for you?" If they confirm, state the specific drop-off date. If they prefer a different number of days, calculate and confirm that date instead.
8. [ ] Pick-Up Date: State: "I'll go ahead and plan the pick-up for two weeks after that, on [calculated date]. If you need more time, just let our team know."

### [STATE 4: CLOSING]
9. [ ] Ask: "Is there anything else you'd like our team to know before they reach out, or any other questions I can help with?"
10. [ ] Send: "Got it, {{first_name}}! Our team will reach out to finalize the booking. They will confirm your dates and coordinate delivery of your Bin There Totes. Anything else?"
11. [ ] Wait for response. If they have nothing else, send: "Great — you're all set and have made a great choice with our totes! Have a great move!"
12. [ ] Execute the `end_call` tool immediately after the final sign-off.

---

# FALLBACKS
- **Intent Hijack:** If the user asks for prices BEFORE State 1 is finished, answer briefly using the Knowledge Base, but immediately pivot back to the checklist (e.g., "I can definitely help with that! But first, is {{phone}} the best number to reach you?").
- **Human Handoff:** If asked for a human, say: "I've let a representative know you'd like to speak with someone directly. They'll reach out soon." Then `end_call`.
- **Out of Area:** If the address is outside the Knowledge Base service area, state the out-of-area phrase from the KB, then `end_call`.
```

---

## DYNAMIC VARIABLES — HOW THEY WORK

### Web Voice and Chat Calls
The website contact form collects first_name, last_name, email, and phone before the call or chat starts. These are passed as `retell_llm_dynamic_variables` in the Retell payload.

In the GHL webhook JSON, these appear at:
- `retell_llm_dynamic_variables.first_name`
- `retell_llm_dynamic_variables.last_name`
- `retell_llm_dynamic_variables.email`
- `retell_llm_dynamic_variables.phone`

### Inbound Phone Calls
For inbound phone calls, `retell_llm_dynamic_variables` contains NO contact data — those fields are empty. Contact data is collected by Jessica during the call and extracted via post-call analysis into `custom_analysis_data`.

In the GHL webhook JSON, phone call contact data appears at:
- `call.call_analysis.custom_analysis_data.first_name`
- `call.call_analysis.custom_analysis_data.last_name`
- `call.call_analysis.custom_analysis_data.email_address`
- `call.call_analysis.custom_analysis_data.phone`

### Built-in Retell Variables
- `{{user_number}}` — auto-populated with the caller's phone number for inbound calls (includes +1 country code prefix)
- `{{current_time_America/New_York}}` — current date/time, no configuration needed

---

## POST-CALL ANALYSIS FIELDS (16 fields — Web Voice and Phone Voice agents)

| # | Field Name | Type |
|---|---|---|
| 1 | call_summary | Text |
| 2 | call_successful | Boolean |
| 3 | user_sentiment | Text |
| 4 | first_name | Text |
| 5 | last_name | Text |
| 6 | email_address | Text |
| 7 | phone | Text |
| 8 | current_address | Text |
| 9 | current_zip | Text |
| 10 | moving_to_address | Text |
| 11 | moving_to_zip | Text |
| 12 | package | Selector |
| 13 | drop_off_date | Text |
| 14 | pick_up_date | Text |
| 15 | questions | Text |
| 16 | preferred_contact | Selector |

---

## GHL WORKFLOW ARCHITECTURE

### Workflow Name: Bin There Web Form Workflow
**Status:** Published ✅

### Top-Level Condition — 6 Branches

| Branch | Condition | Create Contact Action |
|---|---|---|
| Retell Voice (Web) | event is call_analyzed AND call_type is web_call | Create Contact - Retell Voice (Web) |
| Retell Voice (Phone) | event is call_analyzed AND call_type is phone_call | Create Contact - Retell Voice (Phone) |
| Retell Chat | event is chat_analyzed | Create Contact - Retell Chat |
| Proceed | drop_off_date is not empty AND pick_up_date is not empty | Create Contact - Flat With Dates |
| No Date Info | drop_off_date is empty OR pick_up_date is empty AND event is empty | Create Contact - No Date Custom Pre AI |
| None | When none of the conditions are met | END |

### Create Contact Field Mappings

**Create Contact - Retell Voice (Web)**
- First Name → `{{inboundWebhookRequest.call.retell_llm_dynamic_variables.first_name}}`
- Last Name → `{{inboundWebhookRequest.call.retell_llm_dynamic_variables.last_name}}`
- Email → `{{inboundWebhookRequest.call.retell_llm_dynamic_variables.email}}`
- Phone → `{{inboundWebhookRequest.call.retell_llm_dynamic_variables.phone}}`
- Current Address → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.current_address}}`
- Current Zip → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.current_zip}}`
- Moving To Address → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.moving_to_address}}`
- Moving To Zip → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.moving_to_zip}}`
- Rental Package → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.package}}`
- Lead Type → `ai_voice_web` (hardcoded)
- Move Details and Questions → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.questions}}`
- Preferred Contact → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.preferred_contact}}`

**Create Contact - Retell Voice (Phone)**
- First Name → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.first_name}}`
- Last Name → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.last_name}}`
- Email → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.email_address}}`
- Phone → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.phone}}`
- Current Address → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.current_address}}`
- Current Zip → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.current_zip}}`
- Moving To Address → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.moving_to_address}}`
- Moving To Zip → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.moving_to_zip}}`
- Rental Package → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.package}}`
- Lead Type → `ai_voice_phone` (hardcoded)
- Move Details and Questions → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.questions}}`
- Preferred Contact → `{{inboundWebhookRequest.call.call_analysis.custom_analysis_data.preferred_contact}}`

### Second-Level Condition — 8 Branches (notifications)

| Branch | Condition | Actions |
|---|---|---|
| AI Web Voice | event=call_analyzed AND call_type=web_call | SMS Mike + Email Mike + Email Customer + Update Contact Field |
| AI Phone Call | event=call_analyzed AND call_type=phone_call | SMS Mike + Email Mike + Email Customer + Update Contact Field |
| Standard Reserve | form_type=reserve | SMS Mike + Email Mike + Email Customer |
| Custom Quote | form_type=custom | SMS Mike + Email Mike + Email Customer |
| Pre-Voice | form_type=voice | END |
| Pre-Chat | form_type=chat | END |
| AI Web Chat | event=chat_analyzed | SMS Mike + Email Mike + Email Customer + Update Contact Field |
| None | When none of the conditions are met | END |

---

## INPUT SOURCES

| Source | Differentiator | Status |
|---|---|---|
| 1 — Reserve Bins Now | form_type = "reserve" | ✅ TESTED WORKING |
| 2 — Custom Quote | form_type = "custom" | ✅ TESTED WORKING |
| 3a — Pre-Voice | form_type = "voice" | ✅ TESTED WORKING |
| 3b — AI Web Voice post-call | event = "call_analyzed" AND call_type = "web_call" | ✅ TESTED WORKING |
| 3c — AI Phone Voice post-call | event = "call_analyzed" AND call_type = "phone_call" | ✅ TESTED WORKING |
| 4a — Pre-Chat | form_type = "chat" | ✅ TESTED WORKING |
| 4b — Chat Summary frontend | form_type = "chat_summary" | ⬜ No action by design |
| 4c — AI Web Chat post-chat | event = "chat_analyzed" | ✅ TESTED WORKING |

---

## INBOUND PHONE CALL ROUTING

(567) 320-0620 → GHL IVR workflow → rings Mike (10 second timeout) → if no answer → forwards to +1(567)587-1549 (Jessica - Phone Voice agent) ✅

- Detect Voicemail: OFF (was causing transfer delay — turned off May 24)
- GHL IVR workflow name: "IVR Call Routing to Mike for BTT incoming website call"

---

## WEBSITE CODE

### ContactForm.tsx

* **Location:** `components/ContactForm.tsx`
* **Key changes May 24:** Added `endRetellChatSession` function that calls `/api/retell` with `mode: end_chat` before clearing UI state. Added beacon to `/api/retell` on `pagehide` event to close Retell session when tab is closed.
* **Key change May 26:** Removed hardcoded opening message from `handleStartChat`. Chat now starts with `setChatMessages([])` so Retell's own greeting fires first, preventing double greeting.
* **Idle timer:** Stage 1 = 0–120s normal, Stage 2 = 120–180s warning banner with countdown, Stage 3 = 180s auto-close.

### api/retell/route.ts

* **Location:** `app/api/retell/route.ts`
* **Modes:** voice, text, chat_message, end_chat
* `end_chat` calls `PATCH https://api.retellai.com/end-chat` with `chat_id`

### layout.tsx

* Favicon metadata added May 24 with icons block
* Favicons in `/public`: favicon.ico, favicon-32x32.png, apple-touch-icon.png, favicon-192x192.png

---

## GHL CUSTOM FIELDS

| Field Label | Type | GHL Key |
|---|---|---|
| Call Summary | Multi line | {{contact.call_summary}} |
| Call Sentiment | Single line | {{contact.call_sentiment}} |
| Call Successful | Single line | {{contact.call_successful}} |
| Chat Transcript | Multi line | {{contact.chat_transcript}} |
| Chat Summary | Multi line | {{contact.chat_summary}} |
| Current Address | Single line | {{contact.current_address}} |
| Current Zip | Single line | {{contact.current_zip}} |
| Preferred Contact | Single line | {{contact.preferred_contact}} |
| Move Details and Questions | Multi line | {{contact.move_details_and_questions}} |
| Voice Consent Given | Single line | {{contact.voice_consent_given}} |
| SMS Consent Given | Single line | {{contact.sms_consent_given}} |
| Lead Type | Single line | {{contact.lead_type}} |
| Pick-Up Date | Date picker | {{contact.pickup_date}} |
| Drop-Off Date | Date picker | {{contact.dropoff_date}} |
| Rental Package | Dropdown | {{contact.rental_package}} |
| Moving To Zip | Single line | {{contact.moving_to_zip}} |
| Moving To Address | Single line | {{contact.moving_to_address}} |

---

## BUILD STATUS

| Phase | Description | Status |
|---|---|---|
| Phase 1 | Website snake_case standardization | ✅ COMPLETE |
| Phase 2a | Jessica Web Voice — state machine prompt, KB linked, GHL working | ✅ COMPLETE |
| Phase 2b | Jessica Phone Voice — state machine prompt, KB linked, GHL working | ✅ COMPLETE |
| Phase 2c | Jessica Chat — state machine prompt, KB linked | ✅ COMPLETE |
| Phase 2d | Post-session analysis fields — 16 fields on both voice agents | ✅ COMPLETE |
| Phase 2e | All agent webhooks configured | ✅ COMPLETE |
| Phase 3 | GHL custom fields created | ✅ COMPLETE |
| Phase 4a | Old workflow deleted | ✅ COMPLETE |
| Phase 4b | New workflow built | ✅ COMPLETE |
| Phase 4c | Sources 1 and 2 tested | ✅ COMPLETE |
| Phase 4d | Sources 3a, 3b, 3c, 4a, 4c tested | ✅ COMPLETE |
| Phase 4e | Customer email address lines added | ✅ COMPLETE |
| Phase 4f | GHL field mappings fixed for web voice and phone voice | ✅ COMPLETE |
| Phase 4g | end_chat API integration (route.ts + ContactForm.tsx) | ✅ COMPLETE |
| Phase 4h | Favicon added to website | ✅ COMPLETE |
| Phase 5 | Inbound phone call — routing AND contact creation fully working | ✅ COMPLETE |
| Phase 6a | Conversation Flow agent created (parked) | ✅ COMPLETE |
| Phase 6b | Conversation Flow global prompt, voice, LLM configured | ✅ COMPLETE |
| Phase 6c | Conversation Flow nodes built and connected | ✅ COMPLETE |
| Phase 6d | Conversation Flow node prompt tuning | ⚠️ PARKED — resuming after July 2026 |
| Phase 6e | Conversation Flow post-call analysis fields | 🔲 NOT STARTED |
| Phase 6f | Conversation Flow webhook configured | 🔲 NOT STARTED |
| Phase 6g | Conversation Flow full end-to-end test | 🔲 NOT STARTED |
| Phase 6h | Conversation Flow phone number assigned | 🔲 NOT STARTED |
| Phase 7 | ContactForm.tsx double greeting fix deployed | ✅ COMPLETE |

---

## RETELL PROMPT BEST PRACTICES (Confirmed May 2026)

* State machine format (numbered checklist with [ ] checkboxes) is significantly more reliable than prose instructions for controlling LLM behavior in voice agents.
* Knowledge Base should hold all static business data. Prompts should hold only conversational logic and state flow.
* Post-call analysis only populates `custom_analysis_data` if meaningful conversation occurred.
* `end_call` function works for both voice AND chat sessions in Retell.
* Chat sessions stay "ongoing" until end_call is invoked — minimum platform timeout is 6 minutes.
* The Retell Test Agent panel does NOT pass dynamic variables — always test web caller behavior with a real web call from the website.
* `{{user_number}}` passes with +1 country code prefix — instruct agent to read only last 10 digits.
* Conversation Flow is labeled as the recommended architecture in Retell UI. Multi-Prompt is labeled "Legacy." However, the single-prompt state machine approach has proven highly reliable for this use case.
* Prompt patching (adding NEVER rules one at a time) causes prompt bloat and LLM confusion. Always use state machine architecture instead.

---

## RETELL CONVERSATION FLOW BEST PRACTICES (For future Phase 6 work)

* Node prompts should be short and focused. Split long nodes into two.
* "Move on" as a transition trigger phrase is unreliable — use specific transition conditions.
* Logic Split nodes evaluate conditions silently and immediately — they do not speak.
* Global Nodes can be triggered from anywhere without edges — used for Out of Area and Human Handoff.
* Rigid Mode is correct for this build — do not switch to Flex Mode.
* The Create Web Call API supports `start_node_id` to begin at a specific node.
* DO NOT ask Mark to verify node connections unless specifically instructing him to change one. All connections were confirmed across dozens of screenshots.

---

## BUSINESS INFORMATION

**Packages (2-Week Rental):**
* Studio / 1-Bedroom: 15 bins — $149
* 2-Bedroom: 35 bins — $229
* 3-Bedroom (Most Popular): 50 bins — $329
* 4–5 Bedroom: 75 bins — $429
* Custom: 15–100 bins (team provides final quote)

**Bin details:** Black, sanitized, stackable, crush-proof.
**Service Area:** Lima, OH and all of Allen County (Bluffton, Delphos, Wapakoneta)
**Rental Period:** Standard 2 weeks. Extensions available for a small fee.
**Contact:** (567) 320-0620 | info@bintheretotes.com
**Staff Reference:** Never say "Mike." Always "our team" or "a representative."
**Payment:** Handled by the team directly. No online booking or payment exists.

---

## KEY DECISIONS AND CONSTRAINTS

### No Online Booking
All scheduling handled by Mike's team directly. Jessica must NEVER reference the website for booking or payment.

### One Contact Per Person Always
Create Update Contact — never plain Create Contact.

### Date Fields Are Sensitive in GHL
Date picker fields error on empty strings. Solution: top-level condition routes by date presence.

### snake_case Everywhere
All webhook payload field names use snake_case throughout the stack.

### Mark's Commit Workflow
All GitHub commits via Claude in Chrome CM6 editor.

### Colorado AI Disclosure Law
All Jessica agents open with "I'm Jessica, the AI Assistant for Bin There Totes" to satisfy Colorado's requirement that AI identify itself upfront.

### Why Two Voice Agents Instead of One
The web voice and phone voice agents were split into two separate agents because the GHL field mapping paths for contact creation are fundamentally different:
- Web calls: contact data comes from `retell_llm_dynamic_variables` (passed from the form)
- Phone calls: contact data comes from `call_analysis.custom_analysis_data` (collected during the call)
A single agent with a single Create Contact action could not correctly serve both. Splitting was the cleanest solution.
