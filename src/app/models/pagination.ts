export class Pagination {
    page: number;
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;

    constructor() {
        this.page = 1;
        this.count = 0;
        this.pages = 0;
        this.next = null;
        this.prev = null;
    }
}
