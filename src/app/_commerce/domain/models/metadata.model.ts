export class Metadata {
  page: number;
  lastPage: number;
  total: number;

  constructor(page: number, lastPage: number, total: number) {
    this.page = page;
    this.lastPage = lastPage;
    this.total = total;
  }
}
