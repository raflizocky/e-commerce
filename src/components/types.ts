export interface Product {
    id: number
    name: string
    slug: string
    price: string
    image: string | null
    category: { id: number; name: string }
}