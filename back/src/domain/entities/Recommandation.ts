type RecoAnime = {
    id: string,
    animeId: string,
    title: string
}

class Recommandation {
    constructor(
        private readonly id: string,
        private readonly title: string,
        private readonly description: string,
        private readonly animes: RecoAnime[],
        private readonly author: string
    ) { }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getAnimes() {
        return this.animes;
    }

    getAuthor() {
        return this.author;
    }
}

export default Recommandation;