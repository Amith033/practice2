import { Component, Inject  ,OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {


 constructor(private _dialogRef:MatDialogRef<DeleteComponent>,
  private _empService:EmployeeService,
  @Inject(MAT_DIALOG_DATA) public data:any,
  private _coreService:CoreService
  ){}

  id:any
  ngOnInit(): void {
    this.id=this.data
  }

  onConfirmDelete(id:any){
    this._empService.deleteEmployee(id).subscribe({
      next:(res)=>{
        this._coreService.openSnackBar('Employee deleted','ok')
        this._dialogRef.close(1)
      },
      error:console.log,

    })

  }
}
