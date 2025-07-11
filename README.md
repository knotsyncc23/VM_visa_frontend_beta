# VM Visa Frontend Application

## Overview

The VM Visa Frontend is a modern, responsive React application that provides a comprehensive user interface for the VM Visa immigration services platform. It features a complete case management system, proposal workflows, real-time notifications, document management, and role-based dashboards.

## 🏗️ Architecture

### Technology Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom UI library with shadcn/ui
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **State Management**: React Context + Hooks
- **HTTP Client**: Fetch API with custom wrapper
- **Real-time**: Socket.io Client
- **Form Handling**: React Hook Form + Validation
- **Icons**: Lucide React

### Project Structure

```
frontend/
├── client/
│   ├── components/
│   │   ├── auth/
│   │   │   └── auth-context.tsx     # Authentication context provider
│   │   ├── dashboard/
│   │   │   ├── agent/
│   │   │   │   ├── incoming-requests-new.tsx  # Agent incoming requests
│   │   │   │   └── agent-proposals.tsx        # Agent proposals management
│   │   │   ├── active-cases.tsx               # Active cases component
│   │   │   ├── my-requests.tsx                # Client requests management
│   │   │   └── [other-dashboard-components]
│   │   ├── escrow/                            # Escrow management components
│   │   └── ui/                                # Reusable UI components
│   │       ├── button.tsx
│   │       ├── badge.tsx
│   │       ├── card.tsx
│   │       └── [other-ui-components]
│   ├── hooks/
│   │   ├── use-mobile.tsx                     # Mobile detection hook
│   │   └── use-toast.ts                       # Toast notification hook
│   ├── lib/
│   │   ├── utils.ts                           # Utility functions
│   │   └── utils.spec.ts                      # Utility tests
│   ├── pages/
│   │   ├── About.tsx                          # About page
│   │   ├── AdminEscrowPage.tsx               # Admin escrow management
│   │   ├── AgentDashboard.tsx                # Agent dashboard
│   │   ├── AgentInsightsPage.tsx             # Agent analytics
│   │   ├── CalendarPage.tsx                  # Calendar view
│   │   ├── ChatPage.tsx                      # Messaging interface
│   │   ├── ClientDashboard.tsx               # Client dashboard
│   │   ├── Contact.tsx                       # Contact page
│   │   ├── EscrowDashboard.tsx               # Escrow management
│   │   ├── FileManagerPage.tsx               # Document management
│   │   ├── Index.tsx                         # Landing page
│   │   ├── Login.tsx                         # Login page
│   │   ├── MessagesPage.tsx                  # Messages page
│   │   ├── NotFound.tsx                      # 404 page
│   │   ├── OrganizationDashboard.tsx         # Organization dashboard
│   │   ├── PaymentsPage.tsx                  # Payment management
│   │   ├── ProfileEditPage.tsx               # Profile editing
│   │   ├── ProfilePage.tsx                   # Profile view
│   │   ├── Services.tsx                      # Services page
│   │   ├── SettingsPage.tsx                  # Settings page
│   │   ├── Signup.tsx                        # Registration page
│   │   ├── SupportPage.tsx                   # Support page
│   │   ├── ToolsPage.tsx                     # Tools page
│   │   └── CaseDetailPage.tsx                # Case detail view
│   ├── types/
│   │   └── escrow.ts                         # TypeScript type definitions
│   ├── App.tsx                               # Main application component
│   ├── global.css                            # Global styles
│   ├── suppress-warnings.js                  # Warning suppressions
│   └── vite-env.d.ts                         # Vite type definitions
├── shared/
│   ├── api.ts                                # API service layer
│   └── types.ts                              # Shared type definitions
├── server/
│   ├── routes/
│   │   └── demo.ts                           # Demo API routes
│   ├── index.ts                              # Server entry point
│   └── node-build.ts                         # Build configuration
├── netlify/
│   └── functions/
│       └── api.ts                            # Netlify serverless functions
├── public/                                   # Static assets
├── components.json                           # UI components configuration
├── index.html                                # HTML template
├── netlify.toml                              # Netlify deployment config
├── package.json                              # Dependencies and scripts
├── postcss.config.js                        # PostCSS configuration
├── tailwind.config.ts                        # Tailwind CSS configuration
├── tsconfig.json                             # TypeScript configuration
├── vite.config.ts                            # Vite configuration
└── vite.config.server.ts                    # Vite server configuration
```

## 🎨 Design System

### UI Components
Built with a custom design system based on shadcn/ui:

- **Button**: Multiple variants (default, outline, ghost, link)
- **Card**: Container with header, content, and footer sections
- **Badge**: Status indicators and labels
- **Input**: Form input components with validation
- **Modal**: Overlay dialogs and confirmations
- **Toast**: Notification system
- **Loading**: Spinner and skeleton components

### Color Palette
```css
/* Primary Colors */
--primary: #326dee          /* Main brand blue */
--primary-foreground: #ffffff

/* Status Colors */
--success: #22c55e          /* Green for success states */
--warning: #f59e0b          /* Orange for warnings */
--error: #ef4444            /* Red for errors */
--info: #3b82f6             /* Blue for information */

/* Neutral Colors */
--background: #ffffff
--foreground: #0f172a
--muted: #f8fafc
--border: #e2e8f0
```

### Typography
```css
/* Font Families */
font-heading: 'Inter', sans-serif;
font-body: 'Inter', sans-serif;

/* Font Sizes */
text-xs: 0.75rem
text-sm: 0.875rem
text-base: 1rem
text-lg: 1.125rem
text-xl: 1.25rem
text-2xl: 1.5rem
text-3xl: 1.875rem
```

## 🔐 Authentication System

### Authentication Context
```typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}
```

### User Roles & Permissions
- **Client**: Access to personal requests, proposals, and cases
- **Agent**: Access to incoming requests, proposal creation, and case management
- **Organization**: Multi-agent management and oversight
- **Admin**: Full platform administration

### Protected Routes
```typescript
// Route protection based on user roles
<ProtectedRoute roles={['client']}>
  <ClientDashboard />
</ProtectedRoute>

<ProtectedRoute roles={['agent']}>
  <AgentDashboard />
</ProtectedRoute>
```

## 📊 Core Features & Workflows

### 1. Client Dashboard

**Overview Tab**
- Personal statistics and quick actions
- Recent activity timeline
- Quick access to create new requests

**My Requests Tab**
- List of all visa requests with status
- Proposal management for each request
- Request creation and editing

**Active Cases Tab**
- Live case management interface
- Milestone tracking with progress indicators
- Document sharing and communication

**Agent Proposals Tab**
- Review and compare agent proposals
- Accept/reject proposals with escrow integration
- Proposal detail analysis

### 2. Agent Dashboard

**Overview Tab**
- Performance metrics and earnings
- Quick stats on active cases and proposals
- Recent activity feed

**Incoming Requests Tab**
- Browse available client requests
- Filter by visa type, budget, and timeline
- Submit detailed proposals with milestones

**My Proposals Tab**
- Track proposal status and responses
- Edit pending proposals
- View acceptance/rejection feedback

**Active Cases Tab**
- Manage accepted cases
- Update milestone progress
- Client communication tools

### 3. Case Management System

**Case Lifecycle Visualization**
```
Proposal Accepted → Case Created → Milestone Progress → Completion
     ↓                 ↓               ↓                    ↓
  Escrow Setup    Document Setup   Progress Updates   Final Payment
```

**Key Features**
- **Real-time Progress**: Live milestone updates
- **Document Management**: Secure file sharing
- **Communication**: Built-in messaging system
- **Timeline Tracking**: Complete audit trail
- **Payment Integration**: Escrow-based payments

### 4. Proposal Management

**Proposal Creation (Agents)**
```typescript
interface ProposalData {
  budget: number;
  timeline: string;
  coverLetter: string;
  proposalText: string;
  milestones: Milestone[];
  portfolio: PortfolioItem[];
}
```

**Proposal Review (Clients)**
- Side-by-side proposal comparison
- Detailed agent profile analysis
- Milestone and timeline evaluation
- One-click acceptance with escrow setup

### 5. Document Management

**Upload Features**
- Drag & drop interface
- File type validation
- Progress tracking
- Automatic categorization

**Security Features**
- Role-based access control
- Secure file storage
- Download tracking
- Version management

## 🔌 API Integration

### API Service Layer
```typescript
class ApiService {
  private baseURL = 'http://localhost:5000/api';
  
  // Authentication
  async login(email: string, password: string): Promise<AuthResponse>
  async register(userData: RegisterData): Promise<AuthResponse>
  
  // Cases
  async getCases(): Promise<Case[]>
  async getCase(caseId: string): Promise<Case>
  async updateMilestone(caseId: string, milestoneId: string, data: any): Promise<void>
  
  // Proposals
  async getProposals(filters?: ProposalFilters): Promise<Proposal[]>
  async acceptProposal(proposalId: string): Promise<void>
  async createProposal(data: ProposalData): Promise<Proposal>
  
  // Documents
  async uploadDocument(file: File, metadata: DocumentMetadata): Promise<Document>
  async getDocuments(): Promise<Document[]>
}
```

### Mock API Fallback
When backend is unavailable, the system falls back to mock data:

```typescript
class MockApiService {
  // Realistic mock data for development
  async getCases(): Promise<Case[]> {
    return mockCasesData;
  }
  
  async getProposals(): Promise<Proposal[]> {
    return mockProposalsData;
  }
}
```

### Error Handling
```typescript
// Automatic fallback with user-friendly messages
try {
  const data = await api.getCases();
  setCases(data);
} catch (error) {
  console.warn('API failed, using mock data:', error);
  const mockData = await mockApi.getCases();
  setCases(mockData);
  showToast('Using offline data', 'warning');
}
```

## 🎯 Real-time Features

### Socket.io Integration
```typescript
// Real-time notifications
useEffect(() => {
  const socket = io('http://localhost:5000');
  
  socket.on('proposalNotification', (data) => {
    showToast(`New proposal from ${data.agentName}`, 'info');
    refreshProposals();
  });
  
  socket.on('caseUpdate', (data) => {
    showToast(`Case update: ${data.message}`, 'success');
    refreshCases();
  });
  
  return () => socket.disconnect();
}, []);
```

### Notification Types
- **Proposal Updates**: New proposals, acceptance, rejection
- **Case Progress**: Milestone completions, status changes
- **Document Updates**: Upload confirmations, approvals
- **System Alerts**: Important platform notifications

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
sm: '640px'   /* Small devices (landscape phones, 640px and up) */
md: '768px'   /* Medium devices (tablets, 768px and up) */
lg: '1024px'  /* Large devices (desktops, 1024px and up) */
xl: '1280px'  /* Extra large devices (large desktops, 1280px and up) */
2xl: '1536px' /* 2X Extra large devices (larger desktops, 1536px and up) */
```

### Mobile Optimization
- **Touch-friendly**: Large buttons and touch targets
- **Navigation**: Collapsible mobile menu
- **Tables**: Responsive card layouts on mobile
- **Forms**: Optimized input fields and validation
- **Modals**: Full-screen on mobile devices

## 🎨 Animation & Interactions

### Framer Motion Integration
```typescript
// Page transitions
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  <PageContent />
</motion.div>

// List animations
<AnimatePresence>
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.1 }}
    >
      <ItemComponent item={item} />
    </motion.div>
  ))}
</AnimatePresence>
```

### Interactive Elements
- **Hover Effects**: Smooth transitions on buttons and cards
- **Loading States**: Skeleton components and spinners
- **Micro-animations**: Button clicks, form submissions
- **Progress Indicators**: Animated progress bars

## 🛠️ Development

### Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Scripts
```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint src --ext ts,tsx",
  "type-check": "tsc --noEmit"
}
```

### Environment Configuration
```bash
# .env.local
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
VITE_APP_NAME=VM Visa
VITE_APP_VERSION=1.0.0
```

## 🧪 Testing Strategy

### Component Testing
```typescript
// Example test structure
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Integration Testing
- **API Integration**: Mock server responses
- **User Flows**: Complete workflow testing
- **Error Handling**: Network failure scenarios
- **Authentication**: Login/logout flows

## 🚀 Deployment

### Build Process
```bash
# Production build
npm run build

# Output directory: dist/
# - Optimized and minified code
# - Asset hashing for caching
# - Source maps for debugging
```

### Netlify Deployment
```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### Environment-specific Builds
```bash
# Development
VITE_API_URL=http://localhost:5000

# Staging
VITE_API_URL=https://api-staging.vmvisa.com

# Production
VITE_API_URL=https://api.vmvisa.com
```

## 🔧 Configuration Files

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
  server: {
    port: 8080,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
```

### Tailwind Configuration
```typescript
// tailwind.config.ts
export default {
  content: ["./client/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#326dee",
        "cool-gray": {
          50: "#f8fafc",
          600: "#475569",
          800: "#1e293b",
        },
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

## 🔍 Performance Optimization

### Code Splitting
```typescript
// Lazy loading for better performance
const ClientDashboard = lazy(() => import('./pages/ClientDashboard'));
const AgentDashboard = lazy(() => import('./pages/AgentDashboard'));

// Route-based code splitting
<Route
  path="/client-dashboard"
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <ClientDashboard />
    </Suspense>
  }
/>
```

### Asset Optimization
- **Images**: WebP format with fallbacks
- **Fonts**: Preloaded and optimized
- **Icons**: Tree-shakable icon imports
- **CSS**: Purged unused styles

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

## 🧩 State Management

### Context Pattern
```typescript
// Global state management
interface AppState {
  user: User | null;
  notifications: Notification[];
  theme: 'light' | 'dark';
  loading: boolean;
}

const AppContext = createContext<AppState>();

// Component usage
const { user, notifications } = useContext(AppContext);
```

### Local State
```typescript
// Component-level state with hooks
const [cases, setCases] = useState<Case[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// Custom hooks for reusable logic
const useCases = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(false);
  
  const fetchCases = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getCases();
      setCases(data);
    } catch (error) {
      console.error('Failed to fetch cases:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  return { cases, loading, fetchCases };
};
```

## 🔒 Security Considerations

### XSS Prevention
```typescript
// Sanitize user input
import DOMPurify from 'dompurify';

const sanitizedContent = DOMPurify.sanitize(userInput);
```

### CSRF Protection
```typescript
// CSRF token handling
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

headers: {
  'X-CSRF-Token': csrfToken,
  'Content-Type': 'application/json',
}
```

### Authentication Security
- **JWT Storage**: Secure HttpOnly cookies (recommended)
- **Token Refresh**: Automatic token renewal
- **Route Protection**: Role-based access control
- **Input Validation**: Client-side validation with server-side verification

## 🐛 Error Handling

### Error Boundaries
```typescript
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

### Global Error Handling
```typescript
// API error interceptor
const apiRequest = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    // Log error and show user-friendly message
    console.error('API Request failed:', error);
    showToast('Something went wrong. Please try again.', 'error');
    throw error;
  }
};
```

## 📊 Analytics & Monitoring

### User Analytics
```typescript
// Track user interactions
const trackEvent = (eventName: string, properties: Record<string, any>) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, properties);
  }
};

// Usage
trackEvent('proposal_accepted', {
  proposal_id: proposalId,
  user_type: user.userType,
  amount: proposal.budget,
});
```

### Performance Monitoring
```typescript
// Core Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🎓 Best Practices

### Component Design
- **Single Responsibility**: Each component has one clear purpose
- **Composition**: Prefer composition over inheritance
- **Props Interface**: Clear TypeScript interfaces for all props
- **Error Boundaries**: Wrap components that might fail

### Performance
- **Memoization**: Use `React.memo` for expensive components
- **Lazy Loading**: Code-split at route level
- **Virtual Scrolling**: For large lists
- **Image Optimization**: Lazy loading and WebP format

### Accessibility
- **Semantic HTML**: Use proper HTML elements
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant color schemes

## 🚨 Troubleshooting

### Common Issues

**1. Routing Issues**
```typescript
// Ensure BrowserRouter is properly configured
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/client-dashboard" element={<ClientDashboard />} />
  </Routes>
</BrowserRouter>
```

**2. API Connection Failures**
```typescript
// Check CORS and API URL configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

**3. Build Failures**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check
```

**4. Styling Issues**
```bash
# Rebuild Tailwind CSS
npx tailwindcss -i ./client/global.css -o ./dist/output.css --watch
```

## 📚 Resources

### Documentation
- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Framer Motion**: https://www.framer.com/motion/
- **React Router**: https://reactrouter.com/

### Development Tools
- **VS Code Extensions**: ES7+ React/Redux/React-Native snippets
- **Browser DevTools**: React Developer Tools
- **Testing**: React Testing Library
- **Linting**: ESLint + Prettier

## 🤝 Contributing

### Code Style Guidelines
- **TypeScript**: Strict mode enabled
- **Naming**: PascalCase for components, camelCase for functions
- **File Structure**: One component per file
- **Imports**: Absolute imports using @ alias

### Pull Request Process
1. **Feature Branch**: Create from main
2. **Development**: Implement feature with tests
3. **Testing**: Ensure all tests pass
4. **Documentation**: Update relevant documentation
5. **Review**: Submit pull request for review

---

**Last Updated**: July 11, 2025
**Version**: 1.0.0
**Maintainer**: VM Visa Development Team
