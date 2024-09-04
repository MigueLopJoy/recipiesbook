import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipie } from '../../../../../core/model/recipies/recipie';
import { IonItem, IonLabel, IonButton, IonList, IonSelectOption } from "@ionic/angular/standalone";
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { addIcons } from "ionicons";

@Component({
  selector: 'app-create-recipie-form',
  standalone: true,
  imports: [IonList, IonButton, IonLabel, IonItem, IonSelectOption, ReactiveFormsModule, UploadImagesComponent],
  templateUrl: './create-recipie-form.component.html',
  styleUrl: './create-recipie-form.component.scss'
})
export class CreateRecipieFormComponent {

  constructor(
    private fb: FormBuilder
  ) {}

  @Output() recipie: EventEmitter<Recipie> = new EventEmitter<Recipie>();
  recipeForm!: FormGroup;
  submitted!: boolean;


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

  setCategory(event: CustomEvent) {
    this.recipeForm.get('category')?.setValue(event.detail.value);
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required]
    });
  }

  addIngredient() {
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  createStep(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required]
    });
  }

  addStep() {
    this.steps.push(this.createStep());
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  setImage(images: string[]):void {
    this.recipeForm.get('images')?.setValue(images);
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const {title, description, category, ingredients, steps, images} = this.recipeForm.value;

    if (this.recipeForm.invalid) return

    this.recipie.emit({
      title: title || '',
      description: description || '',
      category: category || '',
      ingredients: ingredients || [],
      steps: steps || [],
      images: images || []
    });
  }

  ngOnInit() {
    this.initializeForm();
  }
}
