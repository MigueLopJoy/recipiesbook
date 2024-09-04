import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytes} from '@angular/fire/storage';
import { StorageReference } from 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage
  ) { }

  createImageRef(folder: string, fileName: string): StorageReference {
    return ref(this.storage, `${folder}/${Date.now()}_${fileName}`);
  }

  async uploadRecipieImage(file: File, folder: string): Promise<string> {
    try {
      const imageRef: StorageReference = this.createImageRef(folder, file.name);
      
      await uploadBytes(imageRef, file);
      
      return await this.getURL(imageRef);
    
    } catch (error: unknown) {
      throw error;
    }
  }

  async getURL(ref: StorageReference): Promise<string> {
    try {
      return await getDownloadURL(ref);
    } catch(error: unknown) {
      return `https://firebasestorage.googleapis.com/b/bucket/o/default.jpg`; 
    }
  }

}
