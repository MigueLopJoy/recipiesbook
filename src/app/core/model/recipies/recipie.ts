import { Category } from "./categories"

export interface StoredRecipie extends Recipie {
    id: string
}

export interface Recipie {
    title: string,
    description: string,
    category: Category,
    ingredients: string[],
    steps: string[],
    images: string[]
}
