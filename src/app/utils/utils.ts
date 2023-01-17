export class Utils {
  formatDate(day: number, month: number, year: number): string {
    if (day < 10 && month < 10) {
      return `0${day}.0${month}.${year}`;
    } else if (+day < 10 && +month > 10) {
      return `0${day}.${month}.${year}`;
    } else if (+day > 10 && +month < 10) {
      return `${day}.0${month}.${year}`;
    } else {
      return `${day}.${month}.${year}`;
    }
  }
}
