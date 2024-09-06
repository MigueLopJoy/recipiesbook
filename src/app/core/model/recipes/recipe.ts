import { Category } from "./categories"

export interface StoredRecipe extends Recipe {
    id: string
}

export interface Recipe extends RecipeData {
    authorId: string
}

export interface RecipeData {
    title: string,
    description: string,
    category: Category,
    ingredients: string[],
    steps: string[],
    images: string[]
}
