export {};

export type Roles = "admin" | "teacher" | "student";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
