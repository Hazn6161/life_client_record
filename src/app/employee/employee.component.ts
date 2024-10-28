import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']

})
export class EmployeeComponent implements OnInit {
  formValue!: UntypedFormGroup;
  paymentForm!: UntypedFormGroup;
  //employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  policyData!: any;
  isEdit: boolean = false;
  isEditButtonNameAdd = 'Add';
  isEditButtonName = 'Update';
  username: any;
  branchId: any;
  regionId: any;
  Percode: any;
  id: any;
  policyNo: any;
  policyPayments: any;

  spinner1 = 'sp1';
  spinner2 = 'sp2';


  constructor(
    private formBuilder: UntypedFormBuilder,
    private api: ApiService,
    private spinner: NgxSpinnerService){ }

  ngOnInit(): void {

    if (this.isEdit) {
      this.isEditButtonName = 'Update';
    } else {
      this.isEditButtonNameAdd = 'Add';
    }
    this.getEmployeeByPercode();

    this.formValue = this.formBuilder.group({

      id: [''],
      name: ['', Validators.required],
      nic: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', Validators.required],
      statusType: ['', Validators.required],
      status: ['', Validators.required],
      familyDetails: ['', Validators.required],
      typeOfInsurance: ['', Validators.required],
      presentInsurer: ['', Validators.required],
      noOfFamilyMembers: ['', Validators.required],
      noOfChild: ['', Validators.required],
      monthlyIncome: ['', Validators.required],
      monthlyExpences: ['', Validators.required],
      remark: ['', Validators.required],
      createdDateTime: ['', Validators.required],
      modifiedDateTime: ['', Validators.required],
      spouseAge: ['', Validators.required],

    });

    this.paymentForm = this.formBuilder.group({

      policyNo: ['', Validators.required],
      policyHolder: ['', Validators.required],
      payAddress: ['', Validators.required],
      cusNic: ['',],
      policyType: ['', Validators.required],
      policyStatus: ['', Validators.required],
      mobileNo: [' ', ],
      mobileNo2: ['',Validators.required],
      paidAmount: ['', Validators.required],
      confirmpaidAmount: ['', Validators.required],
      receiptsCat: ['', Validators.required]

    });

    let user = JSON.parse(localStorage.getItem('user') || '');

    this.username = user.name;
    this.branchId = user.branch;
    this.Percode = user.percode;
  }


  addClick() {
    this.isEdit = false;
    this.formValue.reset();
  }


  // deleteEmployeeDetail(data: any) {
  //   this.api.deleteEmployee(data.id).subscribe(
  //     (res) => {
  //       Swal.fire(
  //         'Record Deleted Successfully',
  //         'Well Done !',
  //         'success'
  //       )
  //       //alert('Employee deleted Successfully');
  //       this.getAllEmployee();
  //     },
  //     (err) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'User not found',
  //         text: 'Something went wrong!',
  //         footer: 'Please Contact Us'
  //         //footer: '<a href="">Why do I have this issue?</a>'
  //       })
  //     }
  //   );
  // }



  onEdit(data: any) {
    this.isEdit = true;
    this.isEditButtonName = 'Upload';
    this.formValue.controls['id'].setValue(data.id);
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['statusType'].setValue(data.statusType);
    this.formValue.controls['nic'].setValue(data.nic);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['monthlyIncome'].setValue(data.monthlyIncome);
    this.formValue.controls['monthlyExpences'].setValue(data.monthlyExpences);
    this.formValue.controls['noOfFamilyMembers'].setValue(data.noOfFamilyMembers);
    this.formValue.controls['presentInsurer'].setValue(data.presentInsurer);
    this.formValue.controls['noOfChild'].setValue(data.noOfChild);
    this.formValue.controls['typeOfInsurance'].setValue(data.typeOfInsurance);
    this.formValue.controls['remark'].setValue(data.remark);
    this.formValue.controls['spouseAge'].setValue(data.spouseAge);

  }

  updateEmployee() {

    let user = JSON.parse(localStorage.getItem('user') || '');

    let employee = {
      "isDeleted": "NO",
      "status": "string",
      "id": this.formValue.value.id,
      "address": this.formValue.value.address,
      "mobile": this.formValue.value.mobile,
      "monthlyExpences": this.formValue.value.monthlyExpences,
      "monthlyIncome": this.formValue.value.monthlyIncome,
      "name": this.formValue.value.name,
      "nic": this.formValue.value.nic,
      "noOfFamilyMembers": this.formValue.value.noOfFamilyMembers,
      "presentInsurer": this.formValue.value.presentInsurer,
      "remark": this.formValue.value.remark,
      "statusType": this.formValue.value.statusType,
      "noOfChild": this.formValue.value.noOfChild,
      "typeOfInsurance": this.formValue.value.typeOfInsurance,
      "spouseAge": this.formValue.value.spouseAge,
      "modifyedBy": user.percode,
      "branchId": user.branch,
      "regionId": user.regonid

    }

    this.api.updateEmployee(employee).subscribe((data: any) => {

      Swal.fire(
        'Record Updated Successfully',
        'Well Done !',
        'success'
      )
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getEmployeeByPercode();

    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'User not found',
        text: 'Something went wrong!',
        footer: 'Please Contact Us'
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    });


  }

  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
    });
  }

  getEmployeeByPercode() {
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.api.getuserData(user.percode).subscribe((res) => {
      this.employeeData = res;
    });
  }

  addEmployee() {
    let user = JSON.parse(localStorage.getItem('user') || '');

    let employee = {
      "isDeleted": "NO",
      "status": "string",
      "address": this.formValue.value.address,
      "mobile": this.formValue.value.mobile,
      "monthlyExpences": this.formValue.value.monthlyExpences,
      "monthlyIncome": this.formValue.value.monthlyIncome,
      "name": this.formValue.value.name,
      "nic": this.formValue.value.nic,
      "noOfFamilyMembers": this.formValue.value.noOfFamilyMembers,
      "presentInsurer": this.formValue.value.presentInsurer,
      "remark": this.formValue.value.remark,
      "statusType": this.formValue.value.statusType,
      "noOfChild": this.formValue.value.noOfChild,
      "typeOfInsurance": this.formValue.value.typeOfInsurance,
      "spouseAge": this.formValue.value.spouseAge,
      "createdBy": user.percode,
      "branchId": user.branch,
      "regionId": user.regonid

    }

    this.api.saveEmployee(employee).subscribe((data: any) => {

      Swal.fire(
        'Record Added Successfully',
        'Well Done !',
        'success'
      )
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getEmployeeByPercode();

    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Fill All Data',
        text: 'Something went wrong!',
        footer: 'Please Contact Us - COOP-SDU',
        // footer: '<a href="">Why do I have this issue?</a>',
      })
    }
    );
  }

  getByPolicyNo() {
    this.spinner.show('sp1');
    let policyNo = this.paymentForm.value.policyNo;

    this.api.getpolicyNo(policyNo).subscribe((res) => {
      this.spinner.hide('sp1');

      if (res.cusName) {
        this.paymentForm.controls['policyHolder'].setValue(res.cusName);
        this.paymentForm.controls['payAddress'].setValue(res.cusAddress);
        this.paymentForm.controls['cusNic'].setValue(res.nic);
        this.paymentForm.controls['policyType'].setValue(res.coverType);
        this.paymentForm.controls['policyStatus'].setValue(res.polStatus);
        this.paymentForm.controls['mobileNo'].setValue(res.mobileNo);
        this.paymentForm.controls['mobileNo2'].setValue(res.mobileNo);

        this.policyPayments = res.policyPaymentResponses;

        Swal.fire(
          'Data Loading Done',
          '',
          'success'
        );

      }
      else {
        this.spinner.hide('sp1');
        Swal.fire({
          icon: 'error',
          title: 'Invalid Policy No',
          //text: 'Something went wrong!',
          //footer: 'Soryy'
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      }

    });
  }

  addPolicyPayment() {
    console.log();
    
    if (!(this.paymentForm.get('paidAmount')?.value == this.paymentForm.get('confirmpaidAmount')?.value)) {
      Swal.fire({
        icon: 'error',
        title: 'Amount mismatched',
        text: 'Please Check the Amount!'
      })

      let control = this.paymentForm.get('paidAmount');
      //this.getElementById('#confirmpaidAmount').style.borderColor='red'
      control?.invalid && control.touched ? 'red' : 'red';
      return
    }

    if (this.paymentForm.get('mobileNo2')?.value.match(/\d/g).length===10){
    
    
    if (this.paymentForm.get('paidAmount')?.value>0) {
      this.spinner.show('sp2');

    let user = JSON.parse(localStorage.getItem('user') || '');

    let policyPay = {

      "createdBy": user.percode,
      "cusAddress": this.paymentForm.value.payAddress,
      "cusName": this.paymentForm.value.policyHolder,
      // "dueDate": "2024-08-29T12:30:09.321Z",
      "mobile": this.paymentForm.value.mobileNo ? this.paymentForm.value.mobileNo : "",
      "modifiedBy": user.percode,
      "newMobile": this.paymentForm.value.mobileNo2,
      "nic": this.paymentForm.value.cusNic,
      // "paidDate": "2024-08-29T12:30:09.321Z",
      "payment": this.paymentForm.value.paidAmount,
      "policyNo": this.paymentForm.value.policyNo,
      "receiptsCategory": this.paymentForm.value.receiptsCat,
      //"receiptNo": "",
      "status": "ACTIVE",
      "statusType": "Paid",
      "type": this.paymentForm.value.policyType

    }

    this.api.savePaymentinfo(policyPay).subscribe((data: any) => {
      this.spinner.hide('sp2');

      Swal.fire(
        'Payment Successfully',
        'Good job !',
        'success'
      )
      let ref = document.getElementById('cancel');
      ref?.click();
      this.paymentForm.reset();
      this.policyPayments = null;

    },error => {
      this.spinner.hide('sp2');
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Something went wrong!',
        footer: 'Please Contact Us - 0710233087'
      })
    });

    } else {
      //this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Amount is incorect ',
          text: 'Please Check the Amount!',
          //footer: 'Soryy'
          // footer: '<a href="">Why do I have this issue?</a>'
        })
    }

    } else {
    //this.spinner.hide();
      Swal.fire({
        icon: 'error',
        title: 'Invalid Mobile no format',
        text: 'Please Check the Mobile no !',
        //footer: 'Soryy'
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  

  }

  clearForms() {

    this.paymentForm.reset();
    this.policyPayments = null;

    Swal.fire(
      'Record Clear Done',
      'Well Done !',
      'success'
    )

  }

  restrictZero(event:any){
    if(event.target.value.length === 0 && event.key === "0"){
      event.preventDefault();
   } 
  }
  

}

