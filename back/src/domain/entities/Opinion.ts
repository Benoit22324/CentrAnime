import Anime from "./Anime";

class Opinion {
    constructor(
        private readonly id: string,
        private readonly viewStatus: string,
        private readonly note: number,
        private readonly comment: string,
        private readonly anime?: Anime
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

    getAnime() {
        return this.anime;
    }
}

export default Opinion;