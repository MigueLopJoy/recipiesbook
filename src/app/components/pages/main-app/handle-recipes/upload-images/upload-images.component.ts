import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IonInput, IonLabel, IonItem, IonImg } from "@ionic/angular/standalone";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../../../../core/services/storage/storage.service';

@Component({
  selector: 'app-upload-images',
  standalone: true,
  imports: [IonItem, IonLabel, IonInput, ReactiveFormsModule, IonImg],
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.scss'
})
export class UploadImagesComponent {

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService
  ) {}

  @Output() uploeadedImages: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Input() images!: string[];
  imagesForm!: FormGroup;

  initImageForm(): void {
    this.imagesForm = this.fb.group({
      image: ['', [Validators.required]]
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) 
      this.storageService.uploadRecipeImage(file, 'recipies')
      .then((path: string) => {
        console.log(path)
        this.imagesForm.get('image')?.setValue(path);
        console.log(this.imagesForm.value)
        this.uploeadedImages.emit([path]);
      }).catch((error) => {
        console.log(console.error())
      })
    }
  

  ngOnInit() {
    this.initImageForm();
  }
}
