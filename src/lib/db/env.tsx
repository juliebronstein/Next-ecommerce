import zod from "zod"
const envSchima=zod.object({
    GOOGLE_CLIENT_SECRET:zod.string(),
    GOOGLE_CLIENT_ID:zod.string(),
    NEXTAUTH_SECRET:zod.string(),
    NEXTAUTH_URL:zod.string(),
})
export const env=envSchima.parse(process.env)