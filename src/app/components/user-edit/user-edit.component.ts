import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  form: FormGroup;
  userId:number;
  constructor(private fb: FormBuilder,private usersService:UsersService,private activatedRoute:ActivatedRoute, private route :Router,  private toastr: ToastrService,) { 

  }

  ngOnInit(): void {
    this.userId=parseInt (this.activatedRoute.snapshot.params.id);
    
    this.form = this.fb.group({
      firstName: [""],
      lastName: [""],
      email: [""],
      password: [""],
      userName: [""],
      telephoneNumber: [""],
      address: [""],
      birthDate: [""],
    });
    this.usersService.getUserById(this.userId).subscribe((data)=>{
      this.form.controls.firstName.setValue(data.firstName);
      this.form.controls.lastName.setValue(data.lastName);
      this.form.controls.email.setValue(data.email);
      this.form.controls.password.setValue(data.password);
      this.form.controls.userName.setValue(data.userName);
      this.form.controls.telephoneNumber.setValue(data.telephoneNumber);
      this.form.controls.address.setValue(data.address);
      this.form.controls.birthDate.setValue(data.birthDate);
    })
  }
  updateUser(){
    this.usersService.updateUser({...this.form.value,id:this.userId},this.userId).subscribe(()=>{
      this.toastr.success("user has been updated successfulty")
      this.route.navigate(['']);
    },()=>{
      this.toastr.error("Failed to update this user");
    })
  }

}
