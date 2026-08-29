class Opinion {
    constructor(
        private readonly id: string,
        private readonly viewStatus: string,
        private readonly note: number,
        private readonly comment: string,
    ) { }

    getId() {
        return this.id;
    }

    getViewStatus() {
        return this.viewStatus;
    }

    getNote() {
        return this.note;
    }

    getComment() {
        return this.comment;
    }
}

export default Opinion;