import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  formValue!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,  private api: ApiService, private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
  }

}
