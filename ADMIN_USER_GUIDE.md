# Admin Dashboard User Guide for Developers

## Table of Contents
1. [Overview](#overview)
2. [Access & Authentication](#access--authentication)
3. [Dashboard Overview](#dashboard-overview)
4. [Admin Pages Guide](#admin-pages-guide)
5. [Data Flow & Homepage Integration](#data-flow--homepage-integration)
6. [Technical Implementation](#technical-implementation)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The Admin Dashboard is a comprehensive management system for the FreelanceMarket platform. It provides full CRUD operations for users, services, orders, content, and more. All admin-managed content is automatically synchronized with the homepage through the `HomeDataContext`.

**Key Features:**
- User management (Buyers, Sellers, Admins)
- Service management with approval workflow
- Order and finance tracking
- Content management (CMS) for homepage
- Marketing tools (coupons, featured services)
- Analytics and reporting
- System settings

**Tech Stack:**
- Next.js 16 App Router
- React 19 with TypeScript
- Tailwind CSS for styling
- React Context API for state management
- LocalStorage for data persistence

---

## Access & Authentication

### Login

**URL:** `/admin/login`

**Default Credentials:**
- **Email:** `admin@example.com`
- **Password:** `admin1234`

**Alternative Credentials:**
- **Email:** `moderator@example.com`
- **Password:** `moderator1234`

### Authentication Flow

1. User enters credentials on `/admin/login`
2. Upon successful login, user data is stored in `localStorage`:
   ```javascript
   {
     id: "admin-1",
     email: "admin@example.com",
     name: "관리자",
     role: "admin"
   }
   ```
3. Token is stored: `admin-token-{timestamp}`
4. User is redirected to `/admin/dashboard`
5. All admin routes are protected by `app/(admin)/layout.tsx`

### Route Protection

All admin routes (`/admin/*`) are protected by the authentication wrapper in `app/(admin)/layout.tsx`:
- Unauthenticated users are redirected to `/admin/login`
- Non-admin users are redirected to their respective dashboards
- Admin users have full access to all admin pages

---

## Dashboard Overview

**URL:** `/admin/dashboard`

The dashboard provides a high-level overview of the platform with:

### Statistics Cards
- **총 구매자** (Total Buyers): Links to `/admin/users?type=buyer`
- **총 판매자** (Total Sellers): Links to `/admin/users?type=seller`
- **총 주문** (Total Orders): Links to `/admin/orders`
- **총 수익** (Total Revenue): Links to `/admin/finance`
- **대기 중인 출금** (Pending Withdrawals): Links to `/admin/finance/withdrawals`
- **열린 분쟁** (Open Disputes): Links to `/admin/disputes`

### Quick Actions
- **판매자 승인**: Approve pending sellers
- **서비스 승인**: Approve pending services
- **보고서 보기**: View analytics
- **쿠폰 생성**: Create marketing coupons

### Recent Activity
- Recent orders, user registrations, and system events

---

## Admin Pages Guide

### 1. Users Management (`/admin/users`)

**Purpose:** Manage all user accounts (buyers, sellers, admins)

**Features:**
- **Tabs:** Buyers, Sellers, Admins
- **Search:** Filter by name, email, or ID
- **Status Filter:** All, Active, Banned, Pending, Verified
- **Actions:**
  - View user details
  - Edit user information
  - Ban/Unban users
  - Approve pending sellers
  - Create new admin accounts

**User Types:**

#### Buyers
- View purchase history
- Manage account status
- View payment methods

#### Sellers
- Approve/reject seller applications
- View seller profile and services
- Manage verification status
- View earnings and ratings

#### Admins
- Create new admin accounts
- Manage admin permissions
- View admin activity logs

**Implementation:**
- File: `app/(admin)/admin/users/page.tsx`
- Uses `useSearchParams` for tab navigation
- State managed with `useState`
- Data persisted in component state (can be extended to API)

---

### 2. Services Management (`/admin/services`)

**Purpose:** Manage all services, categories, and tags

**URL:** `/admin/services`

**Features:**

#### Services Tab
- **View Modes:** Table view and Grid view
- **Filters:**
  - Search by title, seller, or category
  - Filter by category
  - Filter by status (All, Approved, Pending, Rejected, Hidden)
- **Statistics:**
  - Total services
  - Approved services
  - Pending services
  - Featured services
- **Actions:**
  - View service details
  - Edit service information
  - Approve/Reject services
  - Feature/Unfeature services
  - Hide services
  - Bulk approve/feature
- **Add Service:**
  - Title, seller, category
  - Price, rating, orders
  - Status (Pending/Approved/Rejected)
  - Service image (file upload - Base64)
  - Seller avatar (file upload - Base64)
  - Description
  - Featured checkbox

#### Categories Tab
- View all categories with service counts
- Add new categories with:
  - Category name
  - Image upload or icon selection from `/public/assets/icons/categories/`
  - Icon name (Lucide icon fallback)
- Edit categories (updates all related services)
- Delete categories

#### Tags/Skills Tab
- View all tags
- Add/Edit/Delete tags
- Tags are used for service filtering

**Homepage Integration:**
- Approved services are automatically synced to homepage via `HomeDataContext`
- Featured services appear in homepage sections
- Categories appear in homepage category carousel

**File Upload:**
- Images are converted to Base64 data URLs
- Maximum file size: 5MB
- Supported formats: JPG, PNG, GIF
- Stored in service object as `imageUrl` and `sellerAvatar`

**Implementation:**
- File: `app/(admin)/admin/services/page.tsx`
- Uses `useHomeData` hook for homepage sync
- `syncServicesToHomepage()` function updates homepage in real-time

---

### 3. Orders Management (`/admin/orders`)

**Purpose:** Track and manage all orders

**URL:** `/admin/orders`

**Features:**
- View all orders with details
- Filter by status (All, Pending, In Progress, Completed, Cancelled)
- Search by order ID, buyer, or seller
- View order timeline
- Manage order status
- View payment information
- Handle refunds

**Order Statuses:**
- Pending
- In Progress
- Completed
- Cancelled
- Refunded

**Implementation:**
- File: `app/(admin)/admin/orders/page.tsx`

---

### 4. Disputes Management (`/admin/disputes`)

**Purpose:** Handle order disputes between buyers and sellers

**URL:** `/admin/disputes`

**Features:**
- View all open disputes
- Filter by status (All, Open, In Review, Resolved, Closed)
- View dispute details and messages
- Assign dispute to admin
- Make resolution decisions
- Issue refunds if needed

**Implementation:**
- File: `app/(admin)/admin/disputes/page.tsx`

---

### 5. Finance Management (`/admin/finance`)

**Purpose:** Manage platform finances, transactions, and payouts

**URL:** `/admin/finance`

**Features:**
- View revenue statistics
- Transaction history
- Pending withdrawals
- Commission settings
- Payment gateway configuration
- Financial reports

**Implementation:**
- File: `app/(admin)/admin/finance/page.tsx`

---

### 6. CMS (Content Management System) (`/admin/cms`)

**Purpose:** Manage homepage content

**URL:** `/admin/cms`

**Features:**

#### Banners Tab
- Create/edit/delete homepage banners
- Upload banner images (file upload - Base64)
- Set banner title, subtitle, and link URL
- Activate/deactivate banners
- Banners appear in `HomeBannerSlider` component

#### Blog/Articles Tab
- Manage blog posts and articles
- Create/edit/delete posts
- Set publication dates
- Manage categories

#### FAQ Tab
- Create/edit/delete FAQ items
- Organize by categories
- Set display order

#### Legal Pages Tab
- Manage Terms of Service
- Privacy Policy
- Other legal documents

**Homepage Integration:**
- Banners sync to `HomeDataContext` and appear on homepage
- Changes reflect immediately on homepage

**Implementation:**
- File: `app/(admin)/admin/cms/page.tsx`
- Uses `useHomeData` hook for banner sync

---

### 7. Marketing (`/admin/marketing`)

**Purpose:** Manage marketing campaigns and promotions

**URL:** `/admin/marketing`

**Features:**

#### Coupons Tab
- Create/edit/delete discount coupons
- Set discount types (percentage/fixed)
- Set expiration dates
- Limit usage
- Track usage statistics

#### Notifications Tab
- Send push notifications
- Email campaigns
- SMS notifications

#### Featured Services Tab
- Select services to feature on homepage
- Services appear in `AdminFeaturedServices` component
- Can set featured status directly from services page

**Homepage Integration:**
- Featured services sync to homepage via `HomeDataContext`
- Appear in homepage featured section

**Implementation:**
- File: `app/(admin)/admin/marketing/page.tsx`
- Uses `useHomeData` hook for featured services sync

---

### 8. Reviews Management (`/admin/reviews`)

**Purpose:** Moderate service reviews

**URL:** `/admin/reviews`

**Features:**
- View all reviews
- Filter by rating (1-5 stars)
- Approve/reject reviews
- Edit review content
- Delete inappropriate reviews
- View review statistics

**Implementation:**
- File: `app/(admin)/admin/reviews/page.tsx`

---

### 9. Analytics (`/admin/analytics`)

**Purpose:** View platform analytics and reports

**URL:** `/admin/analytics`

**Features:**
- Revenue charts
- User growth statistics
- Service performance metrics
- Popular categories
- Geographic data
- Time-based reports (daily, weekly, monthly)

**Implementation:**
- File: `app/(admin)/admin/analytics/page.tsx`

---

### 10. Settings (`/admin/settings`)

**Purpose:** Configure platform settings

**URL:** `/admin/settings`

**Features:**

#### General Settings
- Platform name
- Contact email
- Maintenance mode toggle
- Maintenance message

#### Branding
- Logo upload
- Favicon
- Color scheme
- Theme settings

#### Payment
- Payment gateway configuration
- Commission rates
- Currency settings

#### Email/SMS
- SMTP configuration
- SMS provider settings
- Email templates

#### System
- Database backup/restore
- Cache management
- System logs

**Implementation:**
- File: `app/(admin)/admin/settings/page.tsx`

---

### 11. Audit Log (`/admin/audit`)

**Purpose:** Track all admin actions

**URL:** `/admin/audit`

**Features:**
- View all admin actions
- Filter by admin user
- Filter by action type
- Filter by date range
- Export logs

**Implementation:**
- File: `app/(admin)/admin/audit/page.tsx`

---

### 12. Support (`/admin/support`)

**Purpose:** Manage customer support tickets

**URL:** `/admin/support`

**Features:**
- View support tickets
- Filter by status (Open, In Progress, Resolved, Closed)
- Assign tickets to admins
- Respond to tickets
- View ticket history

**Implementation:**
- File: `app/(admin)/admin/support/page.tsx`

---

## Data Flow & Homepage Integration

### HomeDataContext

The `HomeDataContext` (`contexts/HomeDataContext.tsx`) is the central state management system that syncs admin-managed data to the homepage.

**Data Types:**
- `banners`: Homepage banner slides
- `featuredServices`: Featured services for homepage
- `services`: All approved services
- `categories`: Category list for homepage
- `testimonials`: Customer testimonials

### How It Works

1. **Admin makes changes** in admin dashboard
2. **State updates** in admin page component
3. **Sync function called** (e.g., `updateServices()`, `updateBanners()`)
4. **HomeDataContext updates** with new data
5. **localStorage persists** the data
6. **Homepage components** read from context and update UI

### Example: Adding a Service

```typescript
// In admin/services/page.tsx
const handleAddService = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const newService: Service = {
    id: Date.now(),
    title: formData.get("title") as string,
    // ... other fields
    status: "approved",
  };
  
  const updatedServices = [...services, newService];
  setServices(updatedServices);
  
  // Sync to homepage
  syncServicesToHomepage(updatedServices);
};

const syncServicesToHomepage = (serviceList: Service[]) => {
  const approvedServices: HomeService[] = serviceList
    .filter((s) => s.status === "approved")
    .map((s) => ({
      id: s.id,
      title: s.title,
      // ... map fields
    }));
  updateServices(approvedServices); // Updates HomeDataContext
};
```

### Homepage Components Using Admin Data

- **HomeBannerSlider**: Uses `banners` from context
- **CategoriesShowcase**: Uses `categories` from context
- **AdminFeaturedServices**: Uses `featuredServices` from context
- **MultiRecommendationSection**: Uses `services` from context

---

## Technical Implementation

### File Structure

```
app/(admin)/
├── layout.tsx                    # Auth wrapper
├── admin/
│   ├── layout.tsx                # Admin sub-layout
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx              # Dashboard overview
│   ├── users/
│   │   ├── layout.tsx
│   │   └── page.tsx              # User management
│   ├── services/
│   │   ├── layout.tsx
│   │   └── page.tsx              # Service management
│   └── ... (other admin pages)
```

### State Management

**Current Implementation:**
- React `useState` for local component state
- `HomeDataContext` for homepage data sync
- `localStorage` for data persistence

**Future Enhancement:**
- Replace with API calls to backend
- Use React Query for server state
- Implement proper database storage

### Authentication

**Current Implementation:**
- `localStorage` for token and user data
- `useAuth` hook (`hooks/useAuth.ts`) for auth state
- Route protection in `app/(admin)/layout.tsx`

**Auth Flow:**
```typescript
// Login
localStorage.setItem("token", token);
localStorage.setItem("user", JSON.stringify(userData));

// Check auth
const token = localStorage.getItem("token");
const userData = JSON.parse(localStorage.getItem("user") || "{}");

// Require auth
if (!user || user.role !== "admin") {
  router.push("/admin/login");
}
```

### File Uploads

**Current Implementation:**
- Files converted to Base64 data URLs
- Stored in component state
- Persisted in localStorage

**File Upload Handler:**
```typescript
const handleFileUpload = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("이미지 파일만 업로드할 수 있습니다."));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error("파일 크기는 5MB 이하여야 합니다."));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
```

**Future Enhancement:**
- Upload to cloud storage (AWS S3, Cloudinary)
- Store file URLs instead of Base64
- Implement image optimization

---

## Best Practices

### 1. Data Validation

Always validate user input before saving:
```typescript
if (!title || title.trim() === "") {
  showToast("제목을 입력해주세요.", "error");
  return;
}
```

### 2. Error Handling

Use try-catch blocks for async operations:
```typescript
try {
  const dataUrl = await handleFileUpload(file);
  // Process file
} catch (error) {
  showToast(error.message, "error");
}
```

### 3. User Feedback

Always provide feedback for user actions:
```typescript
showToast("서비스가 추가되었습니다.", "success");
showToast("오류가 발생했습니다.", "error");
```

### 4. Confirmation Modals

Use confirmation modals for destructive actions:
```typescript
<ConfirmModal
  isOpen={deleteModal.isOpen}
  onConfirm={handleDelete}
  title="삭제 확인"
  message="정말 삭제하시겠습니까?"
/>
```

### 5. Loading States

Show loading indicators for async operations:
```typescript
const [isLoading, setIsLoading] = useState(false);

<Button loading={isLoading} disabled={isLoading}>
  저장
</Button>
```

### 6. Responsive Design

All admin pages are responsive:
- Mobile: Single column layout
- Tablet: 2-column layout
- Desktop: Full table/grid layout

### 7. Accessibility

- Use semantic HTML
- Add ARIA labels
- Keyboard navigation support
- Screen reader friendly

---

## Troubleshooting

### Issue: Cannot Login to Admin Dashboard

**Symptoms:** Redirected to login page after entering credentials

**Solutions:**
1. Check browser console for errors
2. Verify credentials: `admin@example.com` / `admin1234`
3. Clear browser localStorage and try again
4. Check `app/(admin)/admin/login/page.tsx` for login logic
5. Verify `useAuth` hook is working correctly

### Issue: Changes Not Reflecting on Homepage

**Symptoms:** Admin changes don't appear on homepage

**Solutions:**
1. Check if `HomeDataContext` is properly imported
2. Verify `updateServices()` or similar function is called
3. Check browser localStorage for data
4. Refresh homepage to see changes
5. Verify homepage components are using `useHomeData()` hook

### Issue: File Upload Not Working

**Symptoms:** Images not uploading or showing errors

**Solutions:**
1. Check file size (must be < 5MB)
2. Verify file type (must be image/*)
3. Check browser console for errors
4. Verify `handleFileUpload` function is working
5. Check Base64 conversion is successful

### Issue: Layout Error

**Symptoms:** "The default export is not a React Component" error

**Solutions:**
1. Verify layout file exists: `app/(admin)/admin/{page}/layout.tsx`
2. Check layout file exports default React component
3. Ensure proper imports: `import { ReactNode } from "react"`
4. Restart dev server: `npm run dev`
5. Clear Next.js cache: `rm -rf .next`

### Issue: Data Not Persisting

**Symptoms:** Data lost on page refresh

**Solutions:**
1. Check localStorage is being used
2. Verify data is saved after changes
3. Check browser localStorage in DevTools
4. Implement proper API integration for persistence

### Issue: Search/Filter Not Working

**Symptoms:** Search or filter returns no results

**Solutions:**
1. Check search query is properly set
2. Verify filter state is updated
3. Check `filteredServices` or similar computed values
4. Verify data structure matches filter logic

---

## Development Tips

### Adding a New Admin Page

1. Create page file: `app/(admin)/admin/{page-name}/page.tsx`
2. Create layout file: `app/(admin)/admin/{page-name}/layout.tsx`
3. Add route to admin sidebar (if needed)
4. Implement CRUD operations
5. Add to navigation menu

### Extending Homepage Integration

1. Add new data type to `HomeDataContext`
2. Create update function in context
3. Call update function from admin page
4. Use data in homepage component
5. Test sync functionality

### Adding File Upload

1. Use `handleFileUpload` function pattern
2. Convert to Base64 or upload to storage
3. Store URL or Base64 in state
4. Persist in localStorage or API
5. Display in UI

### Customizing Admin UI

1. Use Tailwind CSS classes
2. Follow existing component patterns
3. Use shared components from `@/components/shared/common`
4. Maintain responsive design
5. Follow accessibility guidelines

---

## API Integration (Future)

When integrating with a backend API:

1. **Replace localStorage with API calls:**
   ```typescript
   // Instead of:
   setServices([...services, newService]);
   
   // Use:
   const response = await fetch('/api/services', {
     method: 'POST',
     body: JSON.stringify(newService)
   });
   const data = await response.json();
   setServices([...services, data]);
   ```

2. **Use React Query for server state:**
   ```typescript
   const { data, isLoading } = useQuery({
     queryKey: ['services'],
     queryFn: () => fetch('/api/services').then(res => res.json())
   });
   ```

3. **Implement proper error handling:**
   ```typescript
   try {
     await apiCall();
   } catch (error) {
     showToast(error.message, "error");
   }
   ```

---

## Conclusion

The Admin Dashboard provides comprehensive management capabilities for the FreelanceMarket platform. All changes made in the admin panel are automatically synchronized with the homepage through the `HomeDataContext`, ensuring a seamless user experience.

For questions or issues, refer to:
- `DEVELOPER_DOCUMENTATION.md` for general project documentation
- Component source code in `app/(admin)/admin/`
- Context implementation in `contexts/HomeDataContext.tsx`

**Last Updated:** 2024


