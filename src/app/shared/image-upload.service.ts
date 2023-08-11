import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { ImageUpload } from '../model/image-upload';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private basePath = '/Customer';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFileToStorage(imageUpload: ImageUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${imageUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, imageUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          imageUpload.url = downloadURL;
          imageUpload.name = imageUpload.file.name;
          this.saveFileData(imageUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(imageUpload: ImageUpload): void {
    this.db.list(this.basePath).push(imageUpload);
  }

  getFiles(numberItems: number): AngularFireList<ImageUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  // deleteFile(imageUpload: ImageUpload): void {
  //   this.deleteFileDatabase(imageUpload.key)
  //     .then(() => {
  //       this.deleteFileStorage(imageUpload.name);
  //     })
  //     .catch(error => console.log(error));
  // }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}

