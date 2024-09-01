import zod from "zod"
const envSchima=zod.object({
    GOOGLE_CLIENT_SECRET:zod.string().nonempty(),
    GOOGLE_CLIENT_ID:zod.string().nonempty(),
    NEXTAUTH_SECRET:zod.string().nonempty(),
    NEXTAUTH_URL:zod.string().nonempty(),
})
export const env=envSchima.parse(process.env)