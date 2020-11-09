import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseStorageService } from 'src/app/shared/services/firebase-storage.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {


  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  
  constructor(
    private firebaseStorage : FirebaseStorageService
  ) { }

  ngOnInit(): void {
  }

    //Evento que se gatilla cuando el input de tipo archivo cambia
    public cambioArchivo(event) {
      if (event.target.files.length > 0) {
        for (let i = 0; i < event.target.files.length; i++) {
          this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
          this.nombreArchivo = event.target.files[i].name;
          this.datosFormulario.delete('archivo');
          this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
        }
      } else {
        this.mensajeArchivo = 'No hay un archivo seleccionado';
      }
    }
  
    //Sube el archivo a Cloud Storage
    public subirArchivo() {
      let archivo = this.datosFormulario.get('archivo');

      let tarea = this.firebaseStorage.tareaCloudStorage(this.nombreArchivo, archivo);
  
      //Cambia el porcentaje
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentaje = Math.round(porcentaje);
        if (this.porcentaje == 100) {
          this.finalizado = true;
          let referencia = this.firebaseStorage.referenciaCloudStorage(this.nombreArchivo);
          
          referencia.getDownloadURL().subscribe((URL) => {
            this.URLPublica = URL;
          });

        }
      });
  
    }

}
