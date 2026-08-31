type RecoAnime = {
    id: string,
    animeId: string,
    title: string
}

type RecoUserInteraction = {
    favoriteId: string,
    likeId: string
}

class Recommandation {
    constructor(
        private readonly id: string,
        private readonly title: string,
        private readonly description: string,
        private readonly animes: RecoAnime[],
        private readonly author: string,
        private readonly userInteraction: RecoUserInteraction,
        private readonly likes: number,
        private readonly favorites: number
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

    getUserInteraction() {
        return this.userInteraction;
    }

    getFavorites() {
        return this.favorites;
    }

    getLikes() {
        return this.likes;
    }
}

export default Recommandation;