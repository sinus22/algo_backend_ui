import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import Swal from 'sweetalert2';


export class BaseComponent implements OnDestroy{
  protected readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showError(errorMessage: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Xatolik!',
      text: errorMessage,
      confirmButtonText: 'OK'
    });
  }

}
