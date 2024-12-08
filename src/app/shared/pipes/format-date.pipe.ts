import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    const date = new Date(value);
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isToday =
      date >= today && date < new Date(today.getTime() + 86400000);
    const isYesterday = date >= yesterday && date < today;

    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());

    if (isToday) {
      return `Today at ${hours}:${minutes}`;
    } else if (isYesterday) {
      return `Yesterday at ${hours}:${minutes}`;
    } else {
      const day = this.padZero(date.getDate());
      const month = this.padZero(date.getMonth() + 1);
      const year = date.getFullYear();
      return `${day}/${month}/${year}, ${hours}:${minutes}`;
    }
  }

  padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
