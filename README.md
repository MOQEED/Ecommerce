# Travel Trip Application

> This README documents the **Travel Trip** assignment: multi-step booking flow, validation rules, design tokens, and submission notes. Implement or align the codebase in `src/` (especially `src/components`) with these user stories.

A multi-step **Travel Trip** booking flow built with **React**. The UI guides the user through **Your Details**, **Date Selection**, **Guests**, **Travel Assistance**, and **Confirmation**, with validation at each step and a final success state. The flow uses **functional components** and **`useState`** only (no React Router routes in the spec—everything can live in one screen with step state).

---

## Project description

The application is a linear wizard: the user enters trip information across several steps, can move **Next** / **Previous** with data **persisted** when navigating back, and finishes on a **Confirmation** screen. **Cancel** resets the trip to the first step with **empty** fields. **Confirm** shows a success message and a **Book New Trip** action to start over.

---

## User stories

### Step 1 — Your Details (active on load)

- Show a **Your Details** form with:
  - **Name**
  - **Start Location**
  - **End Location**
  - **Next** button
- **Your Details** is the **active** step in the step indicator.
- On **Next**:
  - If **Name** is empty → show error: `Enter your name`
  - If **Start Location** is empty → show error: `Enter your start location`
  - If **End Location** is empty → show error: `Enter your end location`
  - If all are valid → show the **Date Selection** form.

### Step 2 — Date Selection

- Show **Start Date** and **End Date** inputs.
- **Your Details** appears as **completed**; **Date Selection** is **active**.
- **Previous** → return to **Your Details** with **values preserved**; user can edit and submit again.
- On **Next**:
  - If **Start Date** is empty → `Select start date`
  - If **End Date** is empty → `Select end date`
  - If **End Date** is before **Start Date** → `The end date cannot be less than the start date`
  - If valid → show the **Guests** section.

### Step 3 — Guests

- **Your Details** and **Date Selection** are **completed**; **Guests** is **active**.
- Counters:
  - **Adults**: default **1**, minimum **1** (cannot go below 1).
  - **Children**: default **0**, minimum **0**.
  - **Infants**: default **0**, minimum **0**.
- **Previous** → return to **Date Selection** with **dates preserved**.
- **Next** → show **Travel Assistance**.

### Step 4 — Travel Assistance

- **Your Details**, **Date Selection**, and **Guests** are **completed**; **Travel Assistance** is **active**.
- **Travel assistance needed** checkbox: when checked, show an extra control to **select an assistance option** (per reference designs).
- **Previous** → return to **Guests** with **counts preserved**.
- **Next** → show **Confirmation**.

### Step 5 — Confirmation

- All prior steps appear **completed**; **Confirmation** is **active**.
- Display a **summary** of all collected details.
- **Cancel** → return to **Your Details** with **all inputs cleared** (fresh trip).
- **Confirm** → show the **confirmed** message and a **Book New Trip** button to reset and start a new booking.

### Success screen

- After **Confirm**, show the success state with a **Book New Trip** button (same reset behavior as starting over).

---

## Technical requirements (for tests / evaluation)

| Requirement | Detail |
|-------------|--------|
| Components | **Functional components** only, using **React hooks** (`useState`, etc.). |
| Styling | Use **normal HTML elements** and CSS (or a single CSS file). **Do not use `styled-components`** (CSS-in-JS is not supported by the test suite). |
| Routing | **No need to use React Router**; a single parent with step state is enough. |
| Completed-step images | The checkmark / “successfully completed” image for each finished step must use **`alt` equal to the step’s `displayText`** from the initial steps configuration. |
| Confirmed success image | The image on the confirmed success view must use **`alt="success"`**. |
| Layout | **Responsiveness is not required** for this project. |
| Code location | Implement UI pieces under **`src/components`**. **Do not remove** any **pre-filled starter code** provided in the project. |

---

## Design resources

### Image assets

- Step completion (generic):  
  `https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png`
- Reference screenshots (UX flow):  
  - [Your Details form](https://res.cloudinary.com/do4qwwms8/image/upload/v1653301583/travel-trip-your-details-form_t3nxfb.png)  
  - [Date Selection](https://res.cloudinary.com/do4qwwms8/image/upload/v1653387013/travel-trip-date-selection-form_e9em97.png)  
  - [Guests](https://res.cloudinary.com/do4qwwms8/image/upload/v1653389151/travel-trip-guests-section_tkngtt.png)  
  - [Travel Assistance](https://res.cloudinary.com/do4qwwms8/image/upload/v1653391377/travel-trip-travel-assistance-form_kynpti.png)  
  - [Confirmation](https://res.cloudinary.com/do4qwwms8/image/upload/v1653393537/travel-trip-confirmation-form_rinxgy.png)  
  - [Confirmed message](https://res.cloudinary.com/do4qwwms8/image/upload/v1653452335/travel-trip-confirmed-message_gysiks.png)

### Colors (reference)

**Backgrounds:** `#3b82f6`, `#304766`, `#ffffff`, `#2563eb`, `#dbeafe`  

**Text:** `#334155`, `#2563eb`, `#1e293b`, `#ffffff`, `#64748b`, `#f1f5f9`, `#475569`  

**Borders:** `#cbd5e1`, `#e2e8f0`

### Fonts

- **Caveat**
- **Roboto**

(Load via Google Fonts or local files as appropriate.)

---

## Setup

```bash
cd e-commerce
npm install
npm run dev
```

Then open the dev server URL (typically `http://localhost:5173`).

### Production build (optional)

```bash
npm run build
npm run preview
```

---

## Suggested project structure

```
src/
  components/
    TravelTrip.jsx          # or App-level orchestrator
    YourDetails.jsx
    DateSelection.jsx
    Guests.jsx
    TravelAssistance.jsx
    Confirmation.jsx
    SuccessMessage.jsx
    StepIndicator.jsx       # optional: shared step UI
  App.jsx
  main.jsx
  index.css                 # global + Travel Trip styles (no styled-components)
```

Keep **step list** (with `displayText` per step) in one place so **completed** step images can reuse those strings for **`alt`**.

---

## Things to keep in mind

- Validate on **Next** as specified; clear or show one error at a time depending on your test expectations (match the exact error strings above).
- Persist step data in **component state** (lifted to a parent) so **Previous** restores values.
- **Cancel** on Confirmation clears **all** trip state and returns to step 1 with **empty** fields.
- **Book New Trip** after success should behave like a full reset.



