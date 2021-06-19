import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userResponse } from 'src/app/odels/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: number;
  user: userResponse;
  constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute,   private toastr: ToastrService, ) { }

  ngOnInit(): void {
    this.userId = parseInt (this.activatedRoute.snapshot.params.id);
    this.usersService.getUserById(this.userId).subscribe((data: userResponse) => {
      this.user = data;
    }, () => {
      this.toastr.error('Failed to Load this User');
    });

  }

}
