# 인증 및 역할 기반 라우팅 구현 완료

## 구현된 기능

### 1. 공통 타입 및 Enum 정의 (`types/common.ts`)

- **UserRole**: `client | expert | admin`
- **UserStatus**: `active | suspended | banned`
- **ServiceStatus**: `draft | pending_review | active | rejected | disabled`
- **ProjectStatus**: `open | in_progress | closed | cancelled`
- **OrderStatus**: `pending_payment | in_progress | delivered | completed | cancelled | dispute`
- **ProposalStatus**: `sent | accepted | rejected | withdrawn`
- **ReviewStatus**: `visible | hidden | deleted`

### 2. User 모델

```typescript
interface User {
  id: string;
  email: string;
  password_hash?: string; // 서버 사이드만
  name: string;
  role: UserRole; // client | expert | admin
  status: UserStatus; // active | suspended | banned
  created_at: string;
  last_login_at?: string;
}
```

### 3. Auth API 라우트

#### POST `/api/auth/signup`
- **요청**: `{ email, password, name, role: "client" | "expert" }`
- **응답**: `{ user, token }`
- **특징**: 
  - `admin` role은 signup 불가 (Super Admin 전용)
  - 이메일 중복 체크
  - 자동으로 `status: "active"` 설정

#### POST `/api/auth/login`
- **요청**: `{ email, password }`
- **응답**: `{ user, token }`
- **특징**:
  - 비밀번호 검증
  - `status !== "active"`인 경우 로그인 차단
  - `last_login_at` 업데이트

### 4. 회원가입 플로우 (`/signup`)

1. 첫 화면: "어떻게 사용할 건가요?" 선택
   - "Hire as a client" → `role: "client"`
   - "Work as an expert" → `role: "expert"`
2. 선택한 role로 회원가입 폼 표시
3. API 호출 후 자동 로그인 및 role 기반 리다이렉트:
   - `client` → `/client/dashboard`
   - `expert` → `/expert/dashboard`

### 5. 로그인 플로우 (`/login`)

1. 로그인 폼 제출
2. API 호출 및 검증
3. **Status 체크**: `status !== "active"`인 경우:
   - 에러 메시지: "계정이 정지되었습니다"
   - 로그인 차단
4. 성공 시 role 기반 리다이렉트:
   - `admin` → `/admin/dashboard`
   - `client` → `/client/dashboard`
   - `expert` → `/expert/dashboard`
5. `redirect` 쿼리 파라미터 지원

### 6. Role 기반 라우트 가드

#### `/client/**` - `AuthGuard` with `requiredRole="client"`
- `app/(client)/client/layout.tsx`에 적용
- `client` role만 접근 가능
- 미인증 시 `/login?redirect=원래URL`로 리다이렉트

#### `/expert/**` - `AuthGuard` with `requiredRole="expert"`
- `app/(expert)/expert/layout.tsx`에 적용
- `expert` role만 접근 가능
- 미인증 시 `/login?redirect=원래URL`로 리다이렉트

#### `/admin/**` - `AuthGuard` with `requiredRole="admin"`
- `app/(admin)/admin/layout.tsx`에 적용
- `admin` role만 접근 가능
- 미인증 시 `/admin/login`으로 리다이렉트

### 7. 업데이트된 라우팅

- 기존: `/buyer-dashboard` → 새: `/client/dashboard`
- 기존: `/dashboard` (seller) → 새: `/expert/dashboard`
- 기존: `/admin/dashboard` → 유지

### 8. useAuth 훅 업데이트

- 새로운 `User` 타입 사용 (`client | expert | admin`)
- `status` 필드 지원
- `requireAuth(requiredRole?: UserRole)` 함수 업데이트
- role 불일치 시 자동 리다이렉트

## 개발용 테스트 계정

API에 미리 등록된 계정:

- **Client**: `client@demo.com` / `demo1234`
- **Expert**: `expert@demo.com` / `demo1234`
- **Admin**: `admin@demo.com` / `demo1234`

## 주요 파일 구조

```
types/
  └── common.ts                    # 공통 타입 및 Enum

app/api/auth/
  ├── signup/route.ts              # 회원가입 API
  └── login/route.ts                # 로그인 API

app/(client)/client/
  ├── layout.tsx                   # Client 가드 레이아웃
  └── dashboard/page.tsx           # Client 대시보드

app/(expert)/expert/
  ├── layout.tsx                   # Expert 가드 레이아웃
  └── dashboard/page.tsx           # Expert 대시보드

app/(admin)/admin/
  └── layout.tsx                   # Admin 가드 레이아웃

lib/
  └── auth-guard.tsx               # AuthGuard 컴포넌트

hooks/
  └── useAuth.ts                   # 인증 훅 (업데이트됨)

components/auth/
  ├── SignupForm.tsx               # 회원가입 폼 (API 연동)
  ├── LoginForm.tsx                # 로그인 폼 (API 연동)
  └── RoleSelector.tsx             # Role 선택 컴포넌트
```

## 다음 단계

1. 실제 데이터베이스 연동 (현재는 메모리 저장소 사용)
2. JWT 토큰 구현 (현재는 간단한 토큰)
3. 비밀번호 해싱 (bcrypt 등)
4. 이메일 인증 플로우
5. 비밀번호 재설정 기능




