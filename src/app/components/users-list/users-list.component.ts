import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { userResponse } from 'src/app/odels/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  usersList: userResponse[];
  title: string;

firstname="ahmed"
  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.usersService.getAllUsers().subscribe(
      (data: userResponse[]) => {
        this.usersList = data;
        this.toastr.success('Users List Loaded successfully');
      },
      () => {
        this.toastr.error('Failed to Load Users Data');
      }
    );
  }

  onSubmit(form: NgForm, index?: number) {

    if (this.title == 'Add') {

      this.usersService
        .createUser({
          ...form.value,
          birthDate:
            form.value.birthDate.day +
            '-' +
            form.value.birthDate.month +
            '-' +
            form.value.birthDate.year,
        })
        .subscribe(
          (data: userResponse) => {
            this.usersList.push(data);
            this.modalService.dismissAll()
            this.toastr.success('Added successfully');
          },
          () => {
            this.toastr.error('Failed to add this user try  another username and email');
          });
    } else {
      const updatedUser: userResponse ={
        address: form.value.address,
        birthDate: form.value.birthDate,
        email: form.value.email,
        firstName: form.value.firstName,
        id: this.usersList[index].id,
        lastName: form.value.lastName,
        password: form.value.password,
        telephoneNumber: form.value.telephoneNumber,
        userName: form.value.userName
      }
      this.usersService.updateUser(updatedUser,this.usersList[index].id).subscribe(()=>{
        this.toastr.success("the user updated successfully");
      },()=>{
        this.toastr.error("Failed to update this user")
      })

    }
  }
  addUser(content) {
    this.title = 'Add';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }


  removeUser(index: number) {
    var confirmation = confirm('Are you sure you want to remove this user?');
    if (confirmation == true) {
      this.usersService.removeUser(this.usersList[index].id).subscribe(
        () => {
          this.usersList.splice(index, 1);
          this.toastr.success('the user has been removed successfully');
        },
        () => {
          this.toastr.error('Failed to remove this user');
        }
      );
    } else {
    }
  }
  updateUser(index:number){
    this.route.navigate(['edit',this.usersList[index].id])

  }
}
