import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeData, StoredRecipe } from '../../../../../core/model/recipes/recipe'; 
import { IonItem, IonLabel, IonButton, IonButtons, IonSelect, IonSelectOption, IonTextarea, IonList, IonInput } from "@ionic/angular/standalone";
import { Category } from '../../../../../core/model/recipes/categories';
import { UploadImagesComponent } from '../upload-images/upload-images.component';

@Component({
  selector: 'app-recipes-form',
  standalone: true,
  imports: [IonInput, IonList, IonTextarea, IonButton, IonButtons, IonLabel, IonItem, IonSelect, IonSelectOption, ReactiveFormsModule, UploadImagesComponent],
  templateUrl: './recipes-form.component.html',
  styleUrls: ['./recipes-form.component.scss'],
})
export class RecipesFormComponent {
    constructor(
      private fb: FormBuilder
    ) {}
  
    @Output() createRecipe: EventEmitter<RecipeData> = new EventEmitter<RecipeData>();
    @Output() updateRecipe: EventEmitter<RecipeData> = new EventEmitter<RecipeData>();
    @Input() recipe!: StoredRecipe;
    recipeForm!: FormGroup;
    categories: Category[] = [
        "Desayuno",
        "Entrante",
        "Plato principal",
        "Acompañamientos / Guarniciones",
        "Postres y dulces",
        "Panadería",
        "Snack",
        "Bebidas y cócteles"
    ];
    isEdit!: boolean;
  
    initializeForm(): void {
      this.recipeForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        ingredients: this.fb.array([this.createIngredient()]),
        steps: this.fb.array([this.createStep()]),
        category: ['', Validators.required],
        images: ['', Validators.required]
      });
    }


  fillFormWithRecipeData(recipe: StoredRecipe): void {
    this.recipeForm.patchValue({
      title: recipe.title,
      description: recipe.description,
      category: recipe.category,
      images: recipe.images,
    });

    this.setIngredients(recipe.ingredients);
    this.setSteps(recipe.steps);
  }

  setIngredients(ingredients: string[]): void {
    ingredients.forEach((ingredient: string) => this.addIngredient(ingredient));
  }

  setSteps(steps: string[]): void {
    steps.forEach((step: string) => this.addStep(step));
  }
  
    setCategory(event: CustomEvent) {
      this.recipeForm.get('category')?.setValue(event.detail.value);
    }
  
    get ingredients(): FormArray {
      return this.recipeForm.get('ingredients') as FormArray;
    }
  
    createIngredient(ingredient: string = ''): FormGroup {
      return this.fb.group({
        name: [ingredient, Validators.required]
      });
    }
  
    addIngredient(ingredient: string = '') {
      this.ingredients.push(this.createIngredient(ingredient));
    }
  
    removeIngredient(index: number) {
      this.ingredients.removeAt(index);
    }
  
    get steps(): FormArray {
      return this.recipeForm.get('steps') as FormArray;
    }
  
    createStep(step: string = ''): FormGroup {
      return this.fb.group({
        description: [step, Validators.required]
      });
    }
  
    addStep(step: string = '') {
      this.steps.push(this.createStep(step));
    }
  
    removeStep(index: number) {
      this.steps.removeAt(index);
    }
  
    get images(): string[] {
      return this.recipeForm.value['images']    
    }

    setImages(images: string[]):void {
      this.recipeForm.get('images')?.setValue(images);
    }

    confirm(event: Event): void {
      event.preventDefault();
    
      const {title, description, category, ingredients, steps, images} = this.recipeForm.value,
        transformedIngredients: string[] = ingredients.map((ingredient: { name: string }) => ingredient.name),
        transformedSteps: string[] = steps.map((step: {description: string}) => step.description);

      if (this.recipeForm.invalid) return
    
      this.updateRecipe.emit({
        title: title || '',
        description: description || '',
        category: category || '',
        ingredients: transformedIngredients || [],
        steps: transformedSteps || [],
        images: images || []
      });
    }
    

    cancel(): void {
      
    }

    onSubmit(event: Event) {
      event.preventDefault();
      
      const {title, description, category, ingredients, steps, images} = this.recipeForm.value,
        transformedIngredients: string[] = ingredients.map((ingredient: { name: string }) => ingredient.name),
        transformedSteps: string[] = steps.map((step: {name: string}) => step.name);
  
      if (this.recipeForm.invalid) return
  
      this.createRecipe.emit({
        title: title || '',
        description: description || '',
        category: category || '',
        ingredients: transformedIngredients || [],
        steps: transformedSteps || [],
        images: images || []
      });
    }

    ngOnInit() {
      if (!this.recipeForm)
        this.initializeForm();      
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (!this.recipeForm)
        this.initializeForm();

      if (changes['recipe'] && changes['recipe'].currentValue) {
        this.fillFormWithRecipeData(changes['recipe'].currentValue);
        this.isEdit = true;
      }
    }
  }
  