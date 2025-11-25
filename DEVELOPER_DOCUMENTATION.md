# Developer Documentation

## Project Overview

This is a Next.js 16 freelancer marketplace application built with TypeScript, React 19, Tailwind CSS, and Ant Design. The project follows the App Router pattern and includes separate sections for buyers, sellers, and administrators.

**Tech Stack:**
- **Framework:** Next.js 16.0.3 (App Router)
- **Language:** TypeScript 5
- **UI Library:** React 19.1.0, Ant Design 5.26.7
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand 5.0.7, React Context API
- **Data Fetching:** TanStack React Query 5.87.4, Axios 1.11.0
- **Forms:** React Hook Form 7.62.0, Zod 4.0.15
- **Animations:** Framer Motion 12.23.24
- **Internationalization:** i18next 25.5.2, react-i18next 15.6.1
- **Icons:** Lucide React 0.537.0, Ant Design Icons 5.5.1

**Development Server:** Runs on port `3050` with Turbopack enabled

---

## Project Structure

```
nextjs-cursorai-setup/
├── app/                          # Next.js App Router pages
│   ├── (admin)/                  # Admin route group
│   ├── (auth)/                   # Authentication route group
│   ├── (buyer)/                  # Buyer route group
│   ├── (seller)/                 # Seller route group
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles
│   ├── search/                   # Search page
│   ├── services/                 # Service detail pages
│   ├── find-talent/              # Find talent landing page
│   ├── for-freelancers/          # For freelancers landing page
│   └── design/                   # Design page
├── components/                    # React components
│   ├── auth/                     # Authentication components
│   ├── common/                   # Common/shared components
│   ├── layout/                   # Layout components
│   ├── nav/                      # Navigation components
│   ├── page/                     # Page-specific components
│   │   ├── admin/                # Admin page components
│   │   ├── buyer/                # Buyer page components
│   │   ├── seller/               # Seller page components
│   │   ├── home/                 # Homepage components
│   │   ├── search/               # Search page components
│   │   ├── category/             # Category page components
│   │   ├── find-talent/          # Find talent components
│   │   └── for-freelancers/      # For freelancers components
│   └── shared/                   # Shared UI components
├── contexts/                      # React Context providers
│   └── HomeDataContext.tsx       # Homepage data management
├── providers/                     # App providers
│   ├── LangProvider.tsx          # Language/i18n provider
│   └── QueryProvider.tsx         # React Query provider
├── entities/                      # Entity definitions
├── next.config.ts                 # Next.js configuration
├── package.json                   # Dependencies and scripts
└── tsconfig.json                  # TypeScript configuration
```

---

## Routing Structure

### Public Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Homepage with hero, categories, services, testimonials |
| `/search` | `app/search/page.tsx` | Search results page for services and sellers |
| `/services/[id]` | `app/services/[id]/page.tsx` | Individual service detail page |
| `/find-talent` | `app/find-talent/page.tsx` | Landing page for buyers |
| `/for-freelancers` | `app/for-freelancers/page.tsx` | Landing page for sellers |
| `/design` | `app/design/page.tsx` | Design showcase page |

### Authentication Routes

| Route | File | Description |
|-------|------|-------------|
| `/login` | `app/(auth)/login/page.tsx` | User login page (buyer/seller) |
| `/signup` | `app/(auth)/signup/page.tsx` | User registration page |

### Admin Routes

All admin routes are prefixed with `/admin` and require authentication.

| Route | File | Description |
|-------|------|-------------|
| `/admin/login` | `app/(admin)/admin/login/page.tsx` | Admin login page |
| `/admin/dashboard` | `app/(admin)/admin/dashboard/page.tsx` | Admin dashboard overview |
| `/admin/users` | `app/(admin)/admin/users/page.tsx` | User management (buyers, sellers, admins) |
| `/admin/services` | `app/(admin)/admin/services/page.tsx` | Service, category, and tag management |
| `/admin/orders` | `app/(admin)/admin/orders/page.tsx` | Order management and tracking |
| `/admin/disputes` | `app/(admin)/admin/disputes/page.tsx` | Dispute resolution management |
| `/admin/finance` | `app/(admin)/admin/finance/page.tsx` | Financial transactions and reports |
| `/admin/cms` | `app/(admin)/admin/cms/page.tsx` | Content management (banners, blog, FAQs) |
| `/admin/marketing` | `app/(admin)/admin/marketing/page.tsx` | Marketing tools (coupons, notifications, featured services) |
| `/admin/reviews` | `app/(admin)/admin/reviews/page.tsx` | Review moderation |
| `/admin/analytics` | `app/(admin)/admin/analytics/page.tsx` | Analytics and reporting |
| `/admin/settings` | `app/(admin)/admin/settings/page.tsx` | Platform settings |
| `/admin/audit` | `app/(admin)/admin/audit/page.tsx` | Audit logs |
| `/admin/support` | `app/(admin)/admin/support/page.tsx` | Support ticket management |

**Admin Layout:** `app/(admin)/admin/layout.tsx` - Provides `AdminDashboardLayout` with sidebar navigation

### Buyer Routes

All buyer routes require authentication.

| Route | File | Description |
|-------|------|-------------|
| `/buyer-dashboard` | `app/(buyer)/buyer-dashboard/page.tsx` | Buyer dashboard overview |
| `/orders` | `app/(buyer)/orders/page.tsx` | Buyer's order list |
| `/orders/[id]` | `app/(buyer)/orders/[id]/page.tsx` | Order detail page |
| `/messages` | `app/(buyer)/messages/page.tsx` | Buyer messages/inbox |
| `/buyer-messages` | `app/(buyer)/buyer-messages/page.tsx` | Alternative messages page |
| `/profile` | `app/(buyer)/profile/page.tsx` | Buyer profile page |
| `/wishlist` | `app/(buyer)/wishlist/page.tsx` | Saved services wishlist |
| `/custom-requests` | `app/(buyer)/custom-requests/page.tsx` | Custom request list |
| `/custom-requests/new` | `app/(buyer)/custom-requests/new/page.tsx` | Create new custom request |
| `/settings` | `app/(buyer)/settings/page.tsx` | Buyer settings main page |
| `/settings/notifications` | `app/(buyer)/settings/notifications/page.tsx` | Notification preferences |
| `/settings/payment` | `app/(buyer)/settings/payment/page.tsx` | Payment methods |
| `/settings/security` | `app/(buyer)/settings/security/page.tsx` | Security settings |
| `/logout` | `app/(buyer)/logout/page.tsx` | Logout page |

**Buyer Layout:** `app/(buyer)/layout.tsx` - Provides `BuyerDashboardLayout` with navigation

### Seller Routes

All seller routes are prefixed with `/dashboard` and require authentication.

| Route | File | Description |
|-------|------|-------------|
| `/dashboard` | `app/(seller)/dashboard/page.tsx` | Seller dashboard overview |
| `/dashboard/analytics` | `app/(seller)/dashboard/analytics/page.tsx` | Seller analytics |
| `/dashboard/earnings` | `app/(seller)/dashboard/earnings/page.tsx` | Earnings overview |
| `/dashboard/earnings/withdraw` | `app/(seller)/dashboard/earnings/withdraw/page.tsx` | Withdrawal page |
| `/dashboard/orders` | `app/(seller)/dashboard/orders/page.tsx` | Seller's order list |
| `/dashboard/orders/[id]` | `app/(seller)/dashboard/orders/[id]/page.tsx` | Order detail page |
| `/dashboard/services` | `app/(seller)/dashboard/services/page.tsx` | Seller's service list |
| `/dashboard/services/new` | `app/(seller)/dashboard/services/new/page.tsx` | Create new service |
| `/dashboard/services/[id]/edit` | `app/(seller)/dashboard/services/[id]/edit/page.tsx` | Edit service |
| `/dashboard/reviews` | `app/(seller)/dashboard/reviews/page.tsx` | Seller reviews |
| `/dashboard/messages` | `app/(seller)/dashboard/messages/page.tsx` | Seller messages |
| `/dashboard/notifications` | `app/(seller)/dashboard/notifications/page.tsx` | Seller notifications |
| `/dashboard/help` | `app/(seller)/dashboard/help/page.tsx` | Help and support |
| `/dashboard/settings` | `app/(seller)/dashboard/settings/page.tsx` | Seller settings main page |
| `/dashboard/settings/notifications` | `app/(seller)/dashboard/settings/notifications/page.tsx` | Notification preferences |
| `/dashboard/settings/payment` | `app/(seller)/dashboard/settings/payment/page.tsx` | Payment settings |
| `/dashboard/settings/security` | `app/(seller)/dashboard/settings/security/page.tsx` | Security settings |

**Seller Layout:** `app/(seller)/dashboard/layout.tsx` - Provides `SellerDashboardLayout` with bottom navigation

---

## Key Components

### Layout Components

- **`ConditionalLayout`** (`components/layout/ConditionalLayout.tsx`) - Conditionally renders Header/Footer based on route
- **`Header`** (`components/layout/Header.tsx`) - Main site header with navigation
- **`Footer`** (`components/layout/Footer.tsx`) - Site footer
- **`Navbar`** (`components/layout/Navbar.tsx`) - Navigation bar component
- **`AdminDashboardLayout`** (`components/page/admin/layout/AdminDashboardLayout.tsx`) - Admin dashboard layout with sidebar
- **`BuyerDashboardLayout`** (`components/page/buyer/layout/BuyerDashboardLayout.tsx`) - Buyer dashboard layout
- **`SellerDashboardLayout`** (`components/page/seller/layout/SellerDashboardLayout.tsx`) - Seller dashboard layout with bottom nav

### Homepage Components

Located in `components/page/home/`:

- **`Hero`** - Main hero section with search
- **`HeroSearch`** - Search bar component
- **`HeroSlider`** - Hero image slider
- **`HomeBannerSlider`** - Auto-sliding banner carousel (connected to admin CMS)
- **`CategoriesShowcase`** - Primary categories carousel
- **`ExploreCategories`** - Category grid display
- **`MultiRecommendationSection`** - Recommended services sections
- **`AdminFeaturedServices`** - Featured services from admin (connected to admin marketing)
- **`FeaturedFreelancers`** - Featured seller profiles
- **`HowItWorks`** - How it works section
- **`Testimonials`** - Customer testimonials
- **`FinalCallToAction`** - CTA section

### Admin Components

Located in `components/page/admin/`:

- **`AdminDashboardLayout`** - Admin sidebar and header layout
- **`BackToHomeButton`** - Navigation button to homepage
- **`ConfirmModal`** - Confirmation dialog component
- **`Toast`** - Toast notification component

### Search Components

Located in `components/page/search/`:

- **`SearchResultsContent`** - Main search results container
- **`SearchHeader`** - Search page header
- **`SearchFilters`** - Filter sidebar
- **`SearchFiltersBar`** - Filter bar component
- **`SearchResultsGrid`** - Service results grid
- **`SearchTypeTabs`** - Toggle between services/sellers
- **`SellerCard`** - Seller profile card
- **`SellerGrid`** - Seller results grid
- **`PortfolioCard`** - Portfolio item card
- **`PortfolioGrid`** - Portfolio grid display
- **`RelatedSearchTerms`** - Related search suggestions

### Authentication Components

Located in `components/auth/`:

- **`AuthLayout`** - Authentication page layout
- **`LoginForm`** - Login form component
- **`SignupForm`** - Registration form component
- **`LoginModeSelector`** - Toggle between buyer/seller login
- **`SignupModeSelector`** - Toggle between buyer/seller signup
- **`RoleSelector`** - Role selection component

---

## Contexts and State Management

### HomeDataContext

**File:** `contexts/HomeDataContext.tsx`

Centralized context for managing homepage content that can be edited from the admin panel.

**State:**
- `banners` - Homepage banners (with image, title, subtitle, link)
- `featuredServices` - Featured services displayed on homepage
- `services` - All services (synced from admin)
- `categories` - All categories (synced from admin)
- `testimonials` - Customer testimonials

**Features:**
- LocalStorage persistence
- Real-time updates from admin panel
- Type-safe interfaces

**Usage:**
```tsx
import { useHomeData } from "@/contexts/HomeDataContext";

const { banners, featuredServices, services, categories } = useHomeData();
```

### Providers

- **`LangProvider`** (`providers/LangProvider.tsx`) - i18next language provider
- **`QueryProvider`** (`providers/QueryProvider.tsx`) - TanStack React Query provider
- **`HomeDataProvider`** - Wraps `HomeDataContext` provider

---

## Admin Panel Features

### User Management (`/admin/users`)
- View all users (buyers, sellers, admins)
- Filter by role and status
- Edit user details
- Change user status (active, inactive, verified, banned)
- Search users

### Service Management (`/admin/services`)
- **Services:** CRUD operations for services
- **Categories:** Create/edit categories with images/icons
- **Tags:** Manage service tags
- File upload support (Base64 conversion)
- Sync with homepage categories and services

### CMS (`/admin/cms`)
- **Banners:** Manage homepage banners (image, title, subtitle, link)
- **Blog Posts:** Content management
- **FAQs:** Frequently asked questions
- File upload for banner images

### Marketing (`/admin/marketing`)
- **Coupons:** Create and manage discount coupons
- **Notifications:** Push notification management
- **Featured Services:** Select services to feature on homepage
- Sync featured services with homepage

### Other Admin Features
- **Orders:** View and manage all orders
- **Disputes:** Resolve disputes between buyers and sellers
- **Finance:** Transaction history and financial reports
- **Reviews:** Moderate reviews
- **Analytics:** Platform analytics and insights
- **Settings:** Platform-wide settings
- **Audit:** Activity logs
- **Support:** Support ticket management

---

## File Upload System

The admin panel uses Base64 file uploads for images:

1. User selects file via `<input type="file">`
2. File is converted to Base64 data URL using `FileReader`
3. Base64 string is stored in state/localStorage
4. Images are displayed using `<img src={base64String}>` or Next.js `Image` component

**Example:**
```tsx
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};
```

---

## Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Ant Design** - Component library for admin panels
- **Framer Motion** - Animation library
- **Custom CSS** - `app/globals.css` for global styles

---

## Internationalization (i18n)

- **Library:** i18next, react-i18next
- **Provider:** `LangProvider`
- **Usage:**
```tsx
import { useTranslation } from "react-i18next";

const { t } = useTranslation();
<h1>{t("home.hero.title")}</h1>
```

---

## Development Commands

```bash
# Start development server (port 3050)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## Important Notes

1. **Port Configuration:** Development server runs on port `3050` (not default 3000)
2. **Turbopack:** Enabled by default for faster builds
3. **Route Groups:** Uses Next.js route groups `(admin)`, `(auth)`, `(buyer)`, `(seller)` for organization
4. **Client Components:** Most pages use `"use client"` directive for interactivity
5. **Image Optimization:** Next.js Image component with remote patterns configured in `next.config.ts`
6. **LocalStorage:** Admin-managed content persists in browser localStorage
7. **TypeScript:** Full TypeScript support with strict type checking

---

## Data Flow

### Homepage Data Flow
1. Admin creates/edits content in admin panel
2. Content saved to `HomeDataContext` state
3. State persisted to localStorage
4. Homepage components read from `HomeDataContext`
5. Real-time updates reflected on homepage

### Example: Featured Services
1. Admin selects services in `/admin/marketing`
2. Services added to `featuredServices` in `HomeDataContext`
3. `AdminFeaturedServices` component on homepage displays them
4. Changes persist across page refreshes

---

## Next Steps for Developers

1. **API Integration:** Replace localStorage with API calls
2. **Authentication:** Implement proper auth system (JWT, sessions)
3. **Database:** Connect to database (PostgreSQL, MongoDB, etc.)
4. **File Storage:** Replace Base64 with cloud storage (AWS S3, Cloudinary)
5. **Real-time:** Add WebSocket support for messages/notifications
6. **Testing:** Add unit and integration tests
7. **Error Handling:** Implement comprehensive error boundaries
8. **Performance:** Add caching, lazy loading, code splitting
9. **SEO:** Add metadata, sitemap, robots.txt
10. **Analytics:** Integrate analytics (Google Analytics, etc.)

---

## Contact & Support

For questions or issues, refer to the project repository or contact the development team.

---

**Last Updated:** 2024
**Version:** 0.1.0

