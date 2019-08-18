import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { Patient } from '../icons/start-scrape.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar, MatDialog, MatChipInputEvent } from '@angular/material';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


export interface ProblemTitle {
  title: string;
}

export interface MedicationTitle {
  title: string;
}

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  patientForm: FormGroup;
  patient: Patient;
  dialogRef: any;
  type: any = "basic";

  constructor(
    private _formBuilder: FormBuilder,
    private _httpClient: HttpClient,
    private router: Router,
    public _matSnackBar: MatSnackBar,
    public _matDialog: MatDialog
  ) {
    this.patientForm = this.createPatientForm();
  }
  createPatientForm(): FormGroup {
    return this._formBuilder.group({
      patientName: this.patient ? [this.patient.patientName] : '',
      homePhone: this.patient ? [this.patient.homePhone] : '',
      address: this.patient ? [this.patient.address] : '',
      officePhone: this.patient ? [this.patient.officePhone] : '',
      fax: this.patient ? [this.patient.fax] : '',
      birthDate: this.patient ? [this.patient.birthDate] : '',
      status: this.patient ? [this.patient.status] : '',
      gender: this.patient ? [this.patient.gender] : '',
      maritalStatus: this.patient ? [this.patient.maritalStatus] : '',
      contactBy: this.patient ? [this.patient.contactBy] : '',
      race: this.patient ? [this.patient.race] : '',
      socSecNo: this.patient ? [this.patient.socSecNo] : '',
      language: this.patient ? [this.patient.language] : '',
      respProv: this.patient ? [this.patient.respProv] : '',
      mrn: this.patient ? [this.patient.mrn] : '',
      referredBy: this.patient ? [this.patient.referredBy] : '',
      empStatus: this.patient ? [this.patient.empStatus] : '',
      email: this.patient ? [this.patient.email] : '',
      sensChart: this.patient ? [this.patient.sensChart] : '',
      homeLOC: this.patient ? [this.patient.homeLOC] : '',
      externalID: this.patient ? [this.patient.externalID] : '',
      problems: this.patient ? [this.patient.problems] : '',
      medications: this.patient ? [this.patient.medications] : '',
      patientHistory: this.patient ? [this.patient.patientHistory] : '',
      physicalExam: this.patient ? [this.patient.physicalExam] : '',
      hospitalName: this.patient ? [this.patient.hospitalName] : '',
      hospitalFax: this.patient ? [this.patient.hospitalFax] : '',
      hospitalPhone: this.patient ? [this.patient.hospitalPhone] : '',
      hash: this.patient ? [this.patient.hash] : '',


      general: this.patient ? [this.patient.general] : '',
      eyesEarOrNoseOrThroat: this.patient ? [this.patient.eyesEarOrNoseOrThroat] : '',
      cardiovascular: this.patient ? [this.patient.cardiovascular] : '',
      gastrointestinalGenitourinary: this.patient ? [this.patient.gastrointestinalGenitourinary] : '',
      musculoskeletal: this.patient ? [this.patient.musculoskeletal] : '',
      skin: this.patient ? [this.patient.skin] : '',
      neurologic: this.patient ? [this.patient.neurologic] : '',
      psychiatric: this.patient ? [this.patient.psychiatric] : '',
      endocrine: this.patient ? [this.patient.endocrine] : '',
      hemeOrLymphatic: this.patient ? [this.patient.hemeOrLymphatic] : '',
      lymphaticAllergicOrImmunologic: this.patient ? [this.patient.lymphaticAllergicOrImmunologic] : '',

      ht: this.patient ? [this.patient.ht] : '',
      wt: this.patient ? [this.patient.wt] : '',
      rhythm: this.patient ? [this.patient.rhythm] : '',
      bP: this.patient ? [this.patient.bP] : ''
    });
  }

  ngOnInit() {
  }


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  problemTitles: ProblemTitle[] = [];
  medicationTitles: MedicationTitle[] = [];

  addProblem(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.problemTitles.push({ title: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  addMedication(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.medicationTitles.push({ title: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeProblem(problemTitle: ProblemTitle): void {
    const index = this.problemTitles.indexOf(problemTitle);

    if (index >= 0) {
      this.problemTitles.splice(index, 1);
    }
  }

  removeMedication(medicationTitle: MedicationTitle): void {
    const index = this.medicationTitles.indexOf(medicationTitle);

    if (index >= 0) {
      this.medicationTitles.splice(index, 1);
    }
  }


  stepSecondForMedicalProblem() {
    this.type = "medical";
  }

  backToBasicData() {
    this.type = "basic";
  }

  backToMedicalProblem() {
    this.type = "medical";
  }

  stepSecondForHospitalVisit() {
    this.type = "hospital";
  }



  addPatient(): Promise<any> {
    const data = this.patientForm.getRawValue();
    let problemTitles: any = [];
    for (let index = 0; index < this.problemTitles.length; index++) {
      problemTitles.push(this.problemTitles[index].title);
    }

    let medicationTitles: any = [];
    for (let index = 0; index < this.medicationTitles.length; index++) {
      medicationTitles.push(this.medicationTitles[index].title);
    }

    let basicData = {
      patientName: data.patientName,
      homePhone: data.homePhone,
      address: data.address,
      birthDate: data.birthDate,
      status: data.status,
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      empStatus: data.empStatus,
      email: data.email,
      race: data.race,
      socSecNo: data.socSecNo,
      language: data.language
    }

    let reviewOfSystems = {
      general: data.general,
      eyesEarOrNoseOrThroat: data.eyesEarOrNoseOrThroat,
      cardiovascular: data.cardiovascular,
      gastrointestinalGenitourinary: data.gastrointestinalGenitourinary,
      musculoskeletal: data.musculoskeletal,
      skin: data.skin,
      neurologic: data.neurologic,
      psychiatric: data.psychiatric,
      endocrine: data.endocrine,
      hemeOrLymphatic: data.hemeOrLymphatic,
      lymphaticAllergicOrImmunologic: data.lymphaticAllergicOrImmunologic
    };

    let medicalProblem = {
      problems: problemTitles,
      medications: medicationTitles,
      reviewOfSystems: reviewOfSystems
    }

    let hospitalVisit = {
      hospitalName: data.hospitalName,
      hospitalPhone: data.hospitalPhone,
      ht: data.ht,
      wt: data.wt,
      rhythm: data.rhythm,
      bP: data.bP,
      referredBy: data.referredBy
    }
    let json = {
      basicData: basicData,
      medicalProblem: medicalProblem,
      hospitalVisit: hospitalVisit
    };
    const url = `${environment.apiUrl}patient/add`;
    return new Promise((resolve, reject) => {
      this._httpClient.post(url, json)
        .subscribe((response: any) => {
          console.log(response);
          if (response && response.status === 'OK') {
            this.patientForm.reset();
            alert(JSON.stringify(response,null,2));
            // this._matSnackBar.open(response.message, 'OK', {
            //   duration: 4000,
            //   verticalPosition: 'top',
            //   horizontalPosition: 'center',
            //   panelClass: 'snackbar'
            // });
          } else {
            this._matSnackBar.open(response.message, response.status, {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          }
        }, error => {
          this._matSnackBar.open('Internal Server Error', 'Try Again', {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        });

    });
  }
}
