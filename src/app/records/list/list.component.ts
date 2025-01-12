import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TimeServiceService } from '../../services/time-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { AuthService } from '../../services/auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  userId: string | null = null;
  listadoTimes: any[] = [];
  selectedTime: any;
  user: string = ''

  private formBuilder = inject(FormBuilder);
  createForm = this.formBuilder.group({
    fecha: ['', Validators.required],
    customerId: ['', Validators.required],
    total: ['', Validators.required],
  });

  constructor(
    private timeService: TimeServiceService,
    private spinner: SpinnerComponent,
    private authService: AuthService,
  ) {
    if (typeof window !== 'undefined') {
      this.userId = localStorage.getItem('user_id');
    }
    this.user = localStorage.getItem('user') || '';
  }

  editForm = this.formBuilder.group({
    orderIdEdit: ['', Validators.required],
    fechaEdit: ['', Validators.required],
    customerIdEdit: ['', Validators.required],
    totalEdit: ['', Validators.required],
  });

  get fecha() {
    return this.createForm.get('fecha')!;
  }

  get customerId() {
    return this.createForm.get('customerId')!;
  }

  get total() {
    return this.createForm.get('total')!;
  }

  get fechaEdit() {
    return this.createForm.get('fecha')!;
  }

  get customerIdEdit() {
    return this.createForm.get('customerId')!;
  }

  get totalEdit() {
    return this.createForm.get('total')!;
  }

  get orderIdEdit() {
    return this.editForm.get('orderId')!;
  }

  ngOnInit(): void {
    this.loadData();
  }

  onSelectTime(time: any) {
    this.selectedTime = time;
    this.editForm.patchValue({
      orderIdEdit: this.selectedTime.orderId,
      totalEdit: this.selectedTime.total,
      customerIdEdit: this.selectedTime.customerId,
      fechaEdit: this.selectedTime.fecha,
    });
  }

  loadData() {
    if (this.userId) {
      this.spinner.show();
      this.timeService.getTimes(Number(this.userId)).subscribe(
        (response) => {
          this.listadoTimes = response.times;
          this.listadoTimes.forEach(time => {
            time.fecha = this.formatDateForInput(time.fecha);
          });
          console.log(this.listadoTimes);
          this.spinner.hide(); 
        },
        (error) => {
          this.authService.logout();
          console.error('Error al cargar los datos', error);
          this.spinner.hide();
        }
      );
    }
  }

  formatDateToISO(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, -1); // Remueve la "Z" final
  }

  private formatDateForInput(date: string): string {
    if (!date) return '';
    const parsedDate = new Date(date);
    return parsedDate.toISOString().slice(0, 16); // Formato compatible con `datetime-local`
  } 

  onSubmitCreate() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }
  
    //Convertir los tiempos al formato ISO
    const formValue = {
      ...this.createForm.value,
      fecha: this.createForm.value.fecha!,
      customerId: this.createForm.value.customerId!,
      total: this.createForm.value.total!,
    };
  
    this.timeService.postTime(Number(this.userId), formValue).pipe(
      catchError(error => {
        if (error.status === 401 || error.status === 403) {
          this.authService.logout();  
        }
        return throwError(error); 
      })
    ).subscribe({
      next: (response) => {
        console.log(response);
        this.loadData();
      },
      error: (err) => {
        console.error('Error al crear el registro:', err);
      }
    });
    this.createForm.reset();
  }

  onSubmitEdit() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    console.log("enviando");
    const formValue = {
      ...this.editForm.value,
      fecha: this.editForm.value.fechaEdit!,
      customerId: this.editForm.value.customerIdEdit!,
      total: this.editForm.value.totalEdit!,
    };
  
    this.timeService.putTime(Number(this.editForm.value.orderIdEdit), formValue).pipe(
      catchError(error => {
        if (error.status === 401 || error.status === 403) {
          this.authService.logout(); 
        }
        return throwError(error);  
      })
    ).subscribe({
      next: (response) => {
        console.log(response);
        this.loadData(); 
      },
      error: (err) => {
        console.error('Error al editar el registro:', err);
      }
    });
  }

  onDelete() {
    this.timeService.deleteTime(Number(this.editForm.value.orderIdEdit)).pipe(
      catchError(error => {
        if (error.status === 401 || error.status === 403) {
          this.authService.logout(); 
        }
        return throwError(error); 
      })
    ).subscribe({
      next: (response) => {
        console.log(response);
        this.loadData();
      },
      error: (err) => {
        console.error('Error al borrar el registro:', err);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
