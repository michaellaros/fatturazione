import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente';
import { HttpService } from 'src/app/services/http.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return (
      ((form?.form.value['cf'] == null || form?.form.value['cf'] == '') &&
        (form?.form.value['piva'] == null || form?.form.value['piva'] == '') &&
        (form?.form.value['passport_number'] == null ||
          form?.form.value['passport_number'] == '') &&
        (isSubmitted! || control!.touched)) ||
      (control! && control.invalid)
    );
  }
}

@Component({
  selector: 'app-modale-add-client',
  templateUrl: './modale-add-client.component.html',
  styleUrls: ['./modale-add-client.component.css'],
})
export class ModaleAddClientComponent {
  public form: FormGroup;
  public client?: Cliente;
  public flg_newClient: boolean = true;
  public flg_foreignerClient: boolean = false;
  public matcher = new MyErrorStateMatcher();
  public constructor(
    public dialogRef: MatDialogRef<ModaleAddClientComponent>,
    private fb: FormBuilder,
    private http: HttpService,
    @Inject(MAT_DIALOG_DATA) data: Cliente
  ) {
    this.client = data;

    this.form = this.fb.group({
      business_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
      ]),
      piva: new FormControl(null, [
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      cf: new FormControl(null, [
        Validators.minLength(16),
        Validators.maxLength(16),
      ]),
      passport_number: new FormControl({ value: null, disabled: true }, [
        Validators.maxLength(40),
      ]),
      surname: new FormControl(null, [Validators.maxLength(40)]),
      name: new FormControl(null, [Validators.maxLength(40)]),
      client_id: new FormControl(null, [Validators.maxLength(20)]),
      email: new FormControl(null, [
        Validators.email,
        Validators.maxLength(100),
      ]),
      tel_number: new FormControl(null, [Validators.maxLength(20)]),
      cel_number: new FormControl(null, [Validators.maxLength(20)]),
      address: new FormControl(null, [
        Validators.required,
        Validators.maxLength(40),
      ]),
      city: new FormControl(null, [
        Validators.required,
        Validators.maxLength(40),
      ]),
      zipcode: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15),
      ]),
      cod_destinazione: new FormControl(null, [Validators.maxLength(7)]),
      district_code: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15),
      ]),
      country_code: new FormControl(null, [
        Validators.required,
        Validators.maxLength(2),
      ]),
      note: new FormControl(null, [Validators.maxLength(40)]),
    });
    if (this.client != null) {
      this.flg_newClient = false;
      this.flg_foreignerClient =
        data.passport_number != null && data.passport_number != ''
          ? true
          : false;
      this.SetForeignerClient(this.flg_foreignerClient);
      this.form.patchValue({
        business_name: this.client.business_name,
        cf: this.client.cf,
        piva: this.client.piva,
        passport_number: this.client.passport_number,
        surname: this.client.surname,
        name: this.client.name,
        client_id: this.client.client_id,
        email: this.client.email,
        tel_number: this.client.tel_number,
        cel_number: this.client.cel_number,
        address: this.client.address,
        city: this.client.city,
        zipcode: this.client.zipcode,
        cod_destinazione: this.client.cod_destinazione,
        district_code: this.client.district_code,
        country_code: this.client.country_code,
        note: this.client.note,
      });
    }
  }

  public AddClient() {
    if (this.form.valid && !this.IsCfPivaPassportNull()) {
      let client = new Cliente(
        null,
        this.form.value['business_name'],
        this.form.value['cf'],
        this.form.value['piva'],
        this.form.value['passport_number'],
        this.form.value['surname'],
        this.form.value['name'],
        this.form.value['client_id'],
        this.form.value['email'],
        this.form.value['tel_number'],
        this.form.value['cel_number'],
        this.form.value['address'],
        this.form.value['city'],
        this.form.value['zipcode'],

        this.form.value['district_code'],
        this.form.value['country_code'],
        this.form.value['cod_destinazione'],
        this.form.value['note']
      );
      this.http
        .InsertClient(client)
        .subscribe((data) => this.dialogRef.close(data));
    }
  }

  public UpdateClient() {
    if (this.form.valid && !this.IsCfPivaPassportNull()) {
      let client = new Cliente(
        this.client!.id,
        this.form.value['business_name'],
        this.form.value['cf'],
        this.form.value['piva'],
        this.form.value['passport_number'],
        this.form.value['surname'],
        this.form.value['name'],
        this.form.value['client_id'],
        this.form.value['email'],
        this.form.value['tel_number'],
        this.form.value['cel_number'],
        this.form.value['address'],
        this.form.value['city'],
        this.form.value['zipcode'],
        this.form.value['district_code'],
        this.form.value['country_code'],
        this.form.value['cod_destinazione'],
        this.form.value['note']
      );
      this.http
        .UpdateClient(client)
        .subscribe((data) => this.dialogRef.close(data));
    }
  }

  public SetForeignerClient(flg_foreignerClient: boolean) {
    if (flg_foreignerClient) {
      this.form.patchValue({
        piva: null,
        cf: null,
      });
      this.form.get('piva')?.disable();
      this.form.get('cf')?.disable();
      this.form.get('passport_number')?.enable();
    } else {
      this.form.patchValue({
        passport_number: null,
      });
      this.form.get('piva')?.enable();
      this.form.get('cf')?.enable();
      this.form.get('passport_number')?.disable();
    }
  }

  public IsCfPivaPassportNull() {
    return (
      (this.form.value['cf'] == null || this.form.value['cf'] == '') &&
      (this.form.value['piva'] == null || this.form.value['piva'] == '') &&
      (this.form.value['passport_number'] == null ||
        this.form.value['passport_number'] == '')
    );
  }
}
