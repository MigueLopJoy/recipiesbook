import { Component, EventEmitter, Output } from '@angular/core';
import { IonInput, IonLabel, IonItem } from "@ionic/angular/standalone";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../../../../../core/services/storage/storage.service';

@Component({
  selector: 'app-upload-images',
  standalone: true,
  imports: [IonItem, IonLabel, IonInput, ReactiveFormsModule],
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.scss'
})
export class UploadImagesComponent {

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService
  ) {}

  @Output() images: EventEmitter<string[]> = new EventEmitter<string[]>();
  imagesForm!: FormGroup;

  initImageForm(): void {
    this.imagesForm = this.fb.group({
      image: ['', [Validators.required]]
    });
  }

  

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) 
      this.storageService.uploadRecipieImage(file, 'recipies')
    .then((path: string) => {
      console.log(path);
      this.imagesForm.get('image')?.setValue(path);
      this.images.emit([path]);
    })
  }

  ngOnInit() {
    this.initImageForm();
  }
}
