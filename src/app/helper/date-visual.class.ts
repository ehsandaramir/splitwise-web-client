
export class DateVisualClass {
  constructor(private date: Date) {  }

  getVisualDateTime(): string {
    return `${this.date.getUTCFullYear()}-${this.date.getUTCMonth()}-${this.date.getUTCDay()}
     ${this.date.getUTCHours()}:${this.date.getUTCMinutes()}:${this.date.getUTCSeconds()} UTC`;
  }
}
