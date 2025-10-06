export const config = {
    jwtSecret: process.env.JWT_SECRET || "secret",
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "refresh_secret",
    port: process.env.PORT || 4000,
}
export default config;