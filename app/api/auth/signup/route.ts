import { NextRequest, NextResponse } from "next/server";
import type { SignupRequest, AuthResponse, User } from "@/types/common";

// 임시 저장소 (실제로는 DB 사용)
const users: User[] = [];

export async function POST(request: NextRequest) {
  try {
    const body: SignupRequest = await request.json();

    // Validation
    if (!body.email || !body.password || !body.name || !body.role) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    // role 검증 (admin은 signup 불가)
    if (body.role === "admin") {
      return NextResponse.json(
        { error: "관리자 계정은 회원가입으로 생성할 수 없습니다." },
        { status: 403 }
      );
    }

    // 이메일 중복 체크
    const existingUser = users.find((u) => u.email === body.email);
    if (existingUser) {
      return NextResponse.json(
        { error: "이미 사용 중인 이메일입니다." },
        { status: 409 }
      );
    }

    // 비밀번호 해시 (실제로는 bcrypt 등 사용)
    // 여기서는 간단히 저장
    const password_hash = `hashed_${body.password}`;

    // 새 사용자 생성
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: body.email,
      password_hash,
      name: body.name,
      role: body.role,
      status: "active",
      created_at: new Date().toISOString(),
    };

    users.push(newUser);

    // 응답 생성 (password_hash 제외)
    const userResponse: Omit<User, "password_hash"> = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      status: newUser.status,
      created_at: newUser.created_at,
      last_login_at: newUser.last_login_at,
    };

    // 토큰 생성 (실제로는 JWT 사용)
    const token = `token_${Date.now()}_${newUser.id}`;

    const response: AuthResponse = {
      user: userResponse,
      token,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "회원가입 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}


