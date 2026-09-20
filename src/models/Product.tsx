export type Product = {
    id: string
    name: string
    synopsis: string
    location: string
    condition: string
    category?: string
    thumbnailUrl: string
    imageUrls: string[]
    sellerName?: string,
    ageRange?: string,
    brand?: string,
    description?: string
}