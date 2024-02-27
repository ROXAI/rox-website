import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateUser } from "./helpers/user_validation/validateUser";
import { Auth } from "./app/ts/types/enums";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { isUserAuthenticated } = new validateUser();

  console.log("testing middleware", request.url);
  if (!request.cookies.has(Auth.token))
    return NextResponse.redirect(new URL("/login", request.url));

  const newToken = await isUserAuthenticated();
  const response = NextResponse.next();

  if (typeof newToken === "string") {
    console.log("====================================");
    console.log("middleware sagar", newToken);
    console.log("====================================");
    response.cookies.set({
      name: Auth.token,
      value: newToken,
      sameSite: "lax",
      httpOnly: true,
      secure: true,
      path: "/",
    });
  }

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard", "/business-setup", "/social-accounts/instagram"],
};
