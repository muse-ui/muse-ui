export const basePath =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "/muse-ui" : ""
export const domain =
  process.env.NODE_ENV === "production"
    ? `https://chenyifaer.com${basePath}`
    : `http://localhost:3000${basePath}`
