type AniListAnime = {
    id: string,
    animeId: string,
    title: string
}

class AnimeList {
    constructor(
        private readonly id: string,
        private readonly title: string,
        private readonly animes: AniListAnime[]
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