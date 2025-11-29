import { NextRequest, NextResponse } from "next/server";
import type { LoginRequest, AuthResponse, User } from "@/types/common";

// 임시 저장소 (실제로는 DB에서 조회)
// 개발용: 미리 생성된 사용자들
const users: User[] = [
  {
    id: "client-1",
    email: "client@demo.com",
    password_hash: "hashed_demo1234",
    name: "의뢰인",
    role: "client",
    status: "active",
    created_at: new Date().toISOString(),
  },
  {
    id: "expert-1",
    email: "expert@demo.com",
    password_hash: "hashed_demo1234",
    name: "전문가",
    role: "expert",
    status: "active",
    created_at: new Date().toISOString(),
  },
  {
    id: "admin-1",
    email: "admin@demo.com",
    password_hash: "hashed_demo1234",
    name: "관리자",
    role: "admin",
    status: "active",
    created_at: new Date().toISOString(),
  },
];

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();

    // Validation
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "이메일과 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    // 사용자 찾기 (실제로는 DB 조회 + 비밀번호 검증)
    const user = users.find((u) => u.email === body.email);

    if (!user) {
      return NextResponse.json(
        { error: "이메일 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    // 비밀번호 검증 (실제로는 bcrypt.compare 사용)
    // 여기서는 간단히 체크
    const isValidPassword = user.password_hash === `hashed_${body.password}`;
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "이메일 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    // status 체크
    if (user.status !== "active") {
      const statusMessage =
        user.status === "suspended"
          ? "계정이 정지되었습니다."
          : user.status === "banned"
            ? "계정이 영구 정지되었습니다."
            : "계정 상태를 확인할 수 없습니다.";

      return NextResponse.json(
        { error: statusMessage, status: user.status },
        { status: 403 }
      );
    }

    // last_login_at 업데이트
    user.last_login_at = new Date().toISOString();

    // 응답 생성 (password_hash 제외)
    const userResponse: Omit<User, "password_hash"> = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status,
      created_at: user.created_at,
      last_login_at: user.last_login_at,
    };

    // 토큰 생성 (실제로는 JWT 사용)
    const token = `token_${Date.now()}_${user.id}`;

    const response: AuthResponse = {
      user: userResponse,
      token,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "로그인 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}


