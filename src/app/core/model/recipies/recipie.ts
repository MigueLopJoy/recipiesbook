import { Category } from "./categories"

export interface StoredRecipie extends Recipie {
    id: string
}

export interface Recipie extends RecipieData {
    authorId: string
}

export interface RecipieData {
    title: string,
    description: string,
    category: Category,
    ingredients: string[],
    steps: string[],
    images: string[]
}
