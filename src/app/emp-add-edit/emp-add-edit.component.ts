import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {


  empForm:FormGroup;

 education : string[]=[
  'Masters',
  'Degree',
  'Diploma',
  'Engineering'
 ]

 constructor(private _fb:FormBuilder,
  private _empServie:EmployeeService,
  private _dialogRef:MatDialogRef<EmpAddEditComponent>,
  @Inject(MAT_DIALOG_DATA)public data:any,
  private _coreService:CoreService,
  ){

  this.empForm=this._fb.group({
    firstName:'',
    lastName:'',
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    experience:'',
    package:''
  })
 }

 ngOnInit(): void {
    this.empForm.patchValue(this.data);
 }


 onFormSubmit(){
  if(this.empForm.valid){
    if(this.data){
      this._empServie.updateEmployee(this.data.id,this.empForm.value).subscribe({
        next:(val:any)=>{
          // alert('Employee Updated');
          this._coreService.openSnackBar('Employee Updated','Ok')
          this._dialogRef.close(true)
        },
        error:(err:any)=>{
          console.log(err);
        }
      })
    }else{
      this._empServie.addEmployee(this.empForm.value).subscribe({
        next:(val:any)=>{
          // alert('Employee Added Successfully');
          this._coreService.openSnackBar('Employee Added','Ok')
          this._dialogRef.close(true)

        },
        error:(err:any)=>{
          console.log(err);
        }
      })
    }
  }
 }

}
