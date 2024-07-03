import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-usermanagement.component.html',
  styleUrls: ['./admin-usermanagement.component.scss']
})
export class AdminUserManagementComponent implements OnInit {
  changeRoleForm: FormGroup;
  roles = ['ADMIN', 'TREASURY', 'HRPAYROLL', 'HRIR', 'GENERALSERVICES', 'HRSERVICE', 'SECURITYADMIN', 'HRTALENT', 'HRLEARNING'];
  selectedRole: string = 'Select Role';
  users: any[] = []; // Add a property to store the users

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.changeRoleForm = this.fb.group({
      username: ['', Validators.required],
      newRole: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUsersAdmin();
  }

  getUsersAdmin(): void {
    this.adminService.getUsersAdmin().subscribe({
      next: response => {
        if (response.success) {
          this.users = response.data;
        } else {
          Swal.fire('Error!', response.message, 'error');
        }
      },
      error: err => {
        Swal.fire('Error!', 'There was an error fetching the users.', 'error');
      }
    });
  }

  onSelectRole(role: string) {
    this.selectedRole = role;
    this.changeRoleForm.get('role')?.setValue(role);
  }

  onSubmit() {
    if (this.changeRoleForm.valid) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to change the user role?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, change it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminService.postChangeRole(this.changeRoleForm.value).subscribe({
            next: response => {
              Swal.fire('Submitted!', 'Role has been changed successfully.', 'success');
            },
            error: err => {
              Swal.fire('Error!', 'There was an error changing the role.', 'error');
            }
          });
        }
      });
    } else {
      Swal.fire('Error!', 'Please fill in all required fields.', 'error');
    }
  }
}
