import type { ListAnimeType } from "../../typings/ListAnimeType";

class AnimeList {
    constructor(
        private readonly id: string,
        private readonly title: string,
        private readonly animes: ListAnimeType[]
    ) { }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getAnimes() {
        return this.animes;
    }
}

export default AnimeList;