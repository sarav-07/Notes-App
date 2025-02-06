import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Required for Edge Runtime

export async function middleware(req: NextRequest) {
  const SECRET_KEY = "your_secret_key";
  console.log(
    "\nMiddleware running for:=========   = =  ",
    req.nextUrl.pathname
  );

  const authToken = req.cookies.get("authToken")?.value;

  if (!authToken) {
    console.log("No auth token found");
    return NextResponse.redirect(new URL("/register", req.url));
  } else {
    const secret = new TextEncoder().encode(SECRET_KEY);
    const { payload } = await jwtVerify(authToken, secret);
    if(payload){
      return NextResponse.next();
    }else{
      return NextResponse.redirect(new URL("/register", req.url));
    }
  }
}

export const config = {
  matcher: ["/"],
};
