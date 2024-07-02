/**
 * 로그인 없이 접근 가능한 경로
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * 로그인된 사용자는 접근할 수 없는 경로
 * @type {string[]}
 */
export const authRoutes = ["/sign-in", "/sign-up"];

/**
 * 인증 api 경로
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * 로그인 성공 시 이동되는 페이지
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/main";
