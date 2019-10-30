import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { platoespecialService } from 'src/app/services/platoespecial.service';

@Component({
  selector: 'app-platoespecial-create',
  templateUrl: './platoespecial-create.component.html',
  styleUrls: ['./platoespecial-create.component.css']
})
export class PlatoespecialCreateComponent implements OnInit {
  public platoespecialFormGroup: FormGroup;
  public submitted: any = false;
  public fileData: File = null;
  public imageUrl: any;
  public id: any;

  constructor(
    // private platoespecialService: platoespecialService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }
  onSubmit() {
    this.submitted = true;
    if (this.platoespecialFormGroup.invalid) {
      console.log("error de validacion.............................");
      return;
    }
    const formData = new FormData();

    formData.append('nombre', this.formValue.nombre);
    formData.append('precio', this.formValue.precio);
    formData.append('descripcion', this.formValue.descripcion);


  }

  initialData() {
    this.platoespecialFormGroup = this.formBuilder.group({
      id_plato: [null],
      id: [null],
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z _-]*')]],      
      precio:['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.pattern('[a-zA-Z _-]*')]],
      imagen: ['']
    });
  }
  get formControls() {
    return this.platoespecialFormGroup.controls;
  }
  get formValue() {
    return this.platoespecialFormGroup.value;
  }
  cancelar(){
    this.router.navigate(['/admin/plato-especial']);
  }
}
