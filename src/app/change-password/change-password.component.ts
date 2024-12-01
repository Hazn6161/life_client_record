import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  formValue!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,  private api: ApiService, private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
  }

  password1;
  show = false;
  
  changepassword() {

    let user = JSON.parse(localStorage.getItem('user') || '');
    
    let updatepassword = {
      "id":  user.id,
      "bucode": user.bucode,
      "percode": user.percode,
      "name": user.name,
      "soflevelcode": user.soflevelcode,
      "sotdesc": user.sotdesc,
      "branch": user.branch,
      "contactno": user.contactno,
      "overrider": user.overrider,
      "address": user.address,
      "brId": user.brId,
      "regonid": user.regonid,
      "zoneid": user.zoneid,
      "pw": this.password1,
      "status": user.status,

      
    }

    this.api.changepassword(updatepassword).subscribe((data: any) => {

   

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Password Changed Done',
        showConfirmButton: false,
        timer: 2000
      })

      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 2000);
      
      
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'User not found',
        text: 'Something went wrong!',
        footer: 'Please Contact Us - 0710233087'
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    });

    
  }

  showPassword() {
    this.show = !this.show;
  }

}
