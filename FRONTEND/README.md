# InlighnX Frontend - React Application

A modern, responsive React-based frontend for the **InlighnX Fall Risk Assessment Tool**. This application provides healthcare professionals with an intuitive interface to manage patients and conduct comprehensive fall risk assessments for elderly patients (60+ years).

## Overview

The InlighnX Frontend is a single-page application (SPA) built with React that delivers a seamless user experience for fall risk assessment workflows. It features a beautiful landing page, patient management, interactive assessment forms, real-time data visualization, and AI-powered care plan generation capabilities.

## Features

### 🏠 Landing Page

- **Hero Section**: Eye-catching introduction with intelligent automation messaging
- **Action Cards**: Quick access to Select Patient, View Info, and Start Assessment
- **About Section**: Comprehensive platform overview
- **Testimonials**: Real clinician feedback with attractive card layout
- **Contact Section**: Easy-to-find support information

### 👥 Patient Management

- **Patient Selection**: Browse and select patients from the facility database
- **Patient Information**: Comprehensive patient profiles with:
  - Demographics (name, age, gender, DOB)
  - Medical conditions and history
  - Current medications
  - Observations and vital signs
  - Immunization records

### 📋 Fall Risk Assessment

- **Two-Part Assessment System**:

  **Part 1 - Scored Sections (35 points total)**:

  - Falls History (0-25 points)
  - Medications (0-3 points)
  - Psychological Factors (0-2 points)
  - Cognitive Impairment (0-5 points)

  **Part 2 - Risk Factor Checklist (11 factors)**:

  - Vision, Mobility, Transfers, Behaviours, ADL, Equipment, Footwear, Environment, Nutrition, Continence, Other

- **Auto-save Draft**: Assessment progress saved automatically in browser
- **Patient-specific Drafts**: Each patient maintains separate draft
- **Input Validation**: Comprehensive form validation

### 📊 Results & Visualization

- **Risk Level Display**: Clear Low/Medium/High risk classification
- **Interactive Charts**:
  - Doughnut Chart: Total risk score visualization
  - Pie Chart: Risk distribution
  - Bar Chart: Section-wise scores
  - Radar Chart: Multi-dimensional risk factors
- **Part 2 Summary Table**: Clear yes/no responses for all risk factors
- **Historical Data**: View previous assessments

### 🤖 AI Care Plan (Ready for Integration)

- AI-powered care plan generation component
- Patient data and assessment integration
- Ready for backend AI endpoint connection

### 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: WCAG-compliant with proper ARIA labels
- **Smooth Navigation**: React Router with programmatic navigation
- **Loading States**: Professional loaders for better UX
- **Error Handling**: User-friendly error messages
- **Session Persistence**: State maintained across page refreshes

## Technology Stack

- **Framework**: React 18.2.0
- **Routing**: React Router DOM 6.8.0
- **HTTP Client**: Axios 1.6.0
- **Styling**: Custom CSS with responsive design
- **State Management**: React Hooks + sessionStorage
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Testing**: Jest + React Testing Library

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

## Installation & Setup

### 1. Install Dependencies

```bash
cd FRONTEND
npm install
```

### 2. Start Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

### 3. Verify Backend Connection

Ensure the backend is running on port 5000 before starting the frontend.

```bash
# Check backend health
curl http://localhost:5000/health
```

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page auto-reloads on edits.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. Optimizes for best performance.

### `npm run eject`

⚠️ **One-way operation!** Ejects from Create React App for full configuration control.

## Project Structure

```
FRONTEND/
├── public/
│   ├── index.html              # Main HTML template
│   ├── manifest.json           # PWA manifest
│   └── robots.txt              # SEO robots file
├── src/
│   ├── api/
│   │   └── frat.js            # Backend API client (axios)
│   ├── components/
│   │   ├── Navbar.jsx         # Top navigation bar
│   │   ├── Footer.jsx         # Bottom footer
│   │   └── Loader.jsx         # Loading spinner component
│   ├── pages/
│   │   ├── LandingPage.jsx              # Home page
│   │   ├── herosection.jsx              # Hero section
│   │   ├── actionsection.jsx            # Action cards
│   │   ├── Aboutsection.jsx             # About section
│   │   ├── testimonalsection.jsx        # Testimonials
│   │   ├── contactsection.jsx           # Contact info
│   │   ├── PatientSelectionPage.jsx     # Patient list
│   │   ├── PatientInfoPage.jsx          # Patient details
│   │   ├── AssessmentPage.jsx           # Assessment form
│   │   ├── ResultsPage.jsx              # Assessment results
│   │   ├── AICarePlanPage.jsx           # AI care plan
│   │   ├── AccountPage.jsx              # User account
│   │   ├── LoginPage.jsx                # Login page
│   │   ├── ErrorPage.jsx                # Error/404 page
│   │   ├── CallBackPage.jsx             # OAuth callback
│   │   └── scrolltosection.js           # Smooth scroll utility
│   ├── images/                  # Image assets
│   ├── App.jsx                  # Main app component & routing
│   ├── App.css                  # App-level styles
│   ├── index.js                 # App entry point
│   ├── index.css                # Global styles & theme
│   └── setupTests.js            # Test configuration
├── package.json                 # Dependencies & scripts
└── README.md                    # This file
```

## Application Flow

### 1. Landing Page (`/`)

User arrives at the landing page with overview of the platform.

### 2. Patient Selection (`/select-patient`)

- View list of all patients
- Search/filter patients
- Click to select a patient
- Patient ID stored in sessionStorage

### 3. Patient Information (`/patient-info`)

- View complete patient profile
- Review medical history, medications, observations
- Click "Start Assessment" button

### 4. Assessment Form (`/assessment`)

**Part 1**: Score-based questions

- Falls History: Recent falls, frequency
- Medications: Risk-associated drugs
- Psychological: Anxiety, depression
- Cognitive: Mental impairment assessment

**Part 2**: Yes/No risk factors

- 11 risk factor checkboxes
- Each can be Yes, No, or Not Answered

**Draft System**:

- Auto-saves to sessionStorage as `assessmentDraft`
- Includes patientId for proper association
- Cleared when starting new assessment for same patient
- Loads previous draft when returning to page

### 5. Results Page (`/results`)

- Risk score calculation
- Risk level determination (Low/Medium/High)
- Interactive charts (Chart.js or similar)
- Part 2 summary table
- Option to view AI care plan

### 6. AI Care Plan (`/ai-careplan`) (Ready for Integration)

- Displays patient info
- Shows assessment results
- AI-generated recommendations
- Needs backend AI endpoint connection

## API Integration

### API Client (`src/api/frat.js`)

All API calls are made through axios with credentials enabled:

```javascript
const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
```

### Available API Functions

```javascript
// Patient APIs
getAllPatients(); // GET /patient/list
getPatientById(patientId); // GET /patient/:id
getPatientInfo(patientId); // GET /patient/info/:id

// Assessment APIs
submitAssessment(data); // POST /assessment/submit
getAssessmentResult(); // GET /assessment/result?patientId=X

// Draft Management (sessionStorage)
getAssessmentDraft(); // From sessionStorage
saveAssessmentDraft(data); // To sessionStorage
```

## State Management

### SessionStorage Keys

The application uses browser sessionStorage for state persistence:

```javascript
// Patient Selection
sessionStorage.setItem("selectedPatientId", "1");
sessionStorage.getItem("selectedPatientId");

// Assessment Draft
sessionStorage.setItem("assessmentDraft", JSON.stringify({
  patientId: "1",
  part1: {...},
  part2: {...}
}));

// Assessment Results
sessionStorage.setItem("lastAssessmentResult", JSON.stringify(result));

// New Assessment Flag
sessionStorage.setItem("startingNewAssessment", "true");
```

### Draft Management System

**Saving Draft**:

```javascript
const draft = {
  patientId: sessionStorage.getItem("selectedPatientId"),
  part1: { falls, medications, psychological, cognitive },
  part2: { vision, mobility, transfers, ... }
};
sessionStorage.setItem("assessmentDraft", JSON.stringify(draft));
```

**Loading Draft**:

```javascript
const draft = JSON.parse(sessionStorage.getItem("assessmentDraft"));
if (draft && draft.patientId === currentPatientId) {
  // Restore draft
}
```

**Clearing Draft** (when starting new assessment):

```javascript
sessionStorage.removeItem("assessmentDraft");
sessionStorage.setItem("startingNewAssessment", "true");
```

## Styling & Theming

### Global Theme (`index.css`)

- **Primary Color**: Medical Maroon (`#7a113b`, `#941a4d`)
- **Accent Colors**: Soft Pink (`#f8bbd0`), Light Blue (`#b0c7f1`)
- **Background**: Gradient from white to light pink (`#fde7f0`)
- **Typography**: Inter, Segoe UI, sans-serif
- **Responsive Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### Component-Specific Styles

Each page component has inline styles or uses global CSS classes:

- `.section` - Page sections
- `.card` - Content cards
- `.btn`, `.btn-primary`, `.btn-secondary` - Buttons
- `.testimonial` - Testimonial cards
- `.assessment-page` - Assessment layout

## Key Features Implementation

### 1. Patient-Specific Draft Management

```javascript
// In AssessmentPage.jsx
useEffect(() => {
  const draft = JSON.parse(sessionStorage.getItem("assessmentDraft"));
  const currentPatientId = sessionStorage.getItem("selectedPatientId");

  if (draft && draft.patientId === currentPatientId) {
    // Load draft for this patient
    setPart1(draft.part1);
    setPart2(draft.part2);
  } else {
    // Different patient or no draft - start fresh
    resetForm();
  }
}, []);
```

### 2. Starting New Assessment

```javascript
// In PatientInfoPage.jsx - "Start Assessment" button
const handleStartAssessment = () => {
  sessionStorage.removeItem("assessmentDraft");
  sessionStorage.setItem("startingNewAssessment", "true");
  navigate("/assessment");
};

// In AssessmentPage.jsx - Check flag
useEffect(() => {
  if (sessionStorage.getItem("startingNewAssessment") === "true") {
    sessionStorage.removeItem("startingNewAssessment");
    resetForm(); // Clear all fields
  }
}, []);
```

### 3. Risk Score Calculation

```javascript
const calculateRiskScore = () => {
  const falls = parseInt(part1.falls.score) || 0;
  const meds = parseInt(part1.medications.score) || 0;
  const psych = parseInt(part1.psychological.score) || 0;
  const cog = parseInt(part1.cognitive.score) || 0;

  return falls + meds + psych + cog;
};

const getRiskLevel = (score) => {
  if (score >= 25) return "high";
  if (score >= 12) return "medium";
  return "low";
};
```

### 4. Responsive Navigation

```javascript
// Navbar.jsx - Scroll to section or navigate
const go = (id) => {
  if (location.pathname !== "/") {
    navigate("/", { state: { scrollTo: id } });
  } else {
    scrollToSection(id);
  }
};
```

## Testing

### Running Tests

```bash
npm test
```

### Test Files

- `App.test.js` - Basic app rendering tests
- Component tests can be added in `__tests__` folders

### Testing Best Practices

1. Test user interactions
2. Test API integration
3. Test form validation
4. Test navigation flows
5. Test error handling

## Development Guidelines

### Adding a New Page

1. **Create component** in `src/pages/NewPage.jsx`
2. **Add route** in `src/App.jsx`:
   ```javascript
   <Route path="/new-page" element={<NewPage />} />
   ```
3. **Add navigation** if needed in Navbar or other components
4. **Add styles** in component or `index.css`

### Adding API Endpoint

1. **Add function** in `src/api/frat.js`:
   ```javascript
   export function newEndpoint(param) {
     return api.get(`/new-endpoint/${param}`);
   }
   ```
2. **Use in component**:

   ```javascript
   import { newEndpoint } from "../api/frat";

   newEndpoint(param)
     .then((res) => console.log(res.data))
     .catch((err) => console.error(err));
   ```

### State Management Best Practices

1. Use `useState` for component-local state
2. Use `useEffect` for side effects and data fetching
3. Use sessionStorage for persistence across page refreshes
4. Use React Router state for navigation data
5. Consider Context API for deeply nested prop drilling

## Deployment

### Production Build

```bash
npm run build
```

Creates optimized production build in `build/` folder.

### Deployment Options

**1. Static Hosting (Netlify, Vercel)**

```bash
# Build and deploy
npm run build
# Upload build/ folder
```

**2. Docker**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
```

**3. Traditional Server (nginx)**

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/inlignx/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Environment Configuration

Create `.env` file for production:

```env
REACT_APP_API_BASE_URL=https://api.yourdomain.com
REACT_APP_ENV=production
```

Update `src/api/frat.js`:

```javascript
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
```

## Troubleshooting

### Common Issues

**1. Cannot connect to backend**

- Check backend is running on port 5000
- Verify CORS is enabled in backend
- Check `withCredentials: true` in axios config

**2. Patient not selected**

- Check sessionStorage for `selectedPatientId`
- Verify patient selection sets the ID correctly
- Check console for navigation errors

**3. Assessment draft not loading**

- Clear sessionStorage and try again
- Check draft includes `patientId` field
- Verify JSON parsing doesn't fail

**4. Charts not rendering**

- Ensure data is in correct format
- Check console for chart library errors
- Verify results page receives data

**5. Styles not applying**

- Check CSS import order in components
- Verify class names match CSS selectors
- Clear browser cache

### Browser Console Debugging

```javascript
// Check sessionStorage
console.log("Patient ID:", sessionStorage.getItem("selectedPatientId"));
console.log("Draft:", JSON.parse(sessionStorage.getItem("assessmentDraft")));
console.log(
  "Results:",
  JSON.parse(sessionStorage.getItem("lastAssessmentResult"))
);

// Clear all session data
sessionStorage.clear();
```

## Performance Optimization

### Best Practices Implemented

1. **Code Splitting**: React.lazy() for route-based splitting (ready to implement)
2. **Memoization**: Use React.memo() for expensive components
3. **Debouncing**: Implement for search/filter inputs
4. **Image Optimization**: Compress images in `src/images/`
5. **Bundle Analysis**: Use `npm run build` and analyze size

### Future Improvements

- [ ] Implement React.lazy() for code splitting
- [ ] Add service worker for offline support
- [ ] Implement Chart.js for data visualization
- [ ] Add form validation library (Formik/React Hook Form)
- [ ] Add toast notifications (react-toastify)
- [ ] Implement loading skeletons
- [ ] Add error boundary components

## Accessibility (A11y)

### Implemented Features

- ✅ Semantic HTML elements
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Alt text on images
- ✅ Color contrast compliance
- ✅ Screen reader friendly

### Testing Accessibility

```bash
# Install accessibility checker
npm install -g pa11y

# Run accessibility audit
pa11y http://localhost:3000
```

## Contributing

1. Follow React best practices and hooks guidelines
2. Maintain consistent code style
3. Add comments for complex logic
4. Update this README for new features
5. Test all user flows before committing
6. Use meaningful commit messages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
