import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }

  constructor(private userService: UserService,private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if(this.user.username==''  || this.user.username==null)
    {
      this.snack.open("Fill the details carefully.","",{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }
    //add user
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        //success
       // swal("Registration Sucessfull!");
       Swal.fire('Registration Sucessfull','Your User ID : '+data.id,'success');
      },
      (error) => {
        console.log(error);
        alert("Something went wrong!");
      }
    );
  }

}
