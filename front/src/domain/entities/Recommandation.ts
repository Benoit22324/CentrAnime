import type { ListAnimeType } from "../../typings/ListAnimeType";

type RecoUserInteraction = {
    favoriteId: string,
    likeId: string
}

class Recommandation {
    constructor(
        private readonly id: string,
        private readonly title: string,
        private readonly description: string,
        private readonly animes: ListAnimeType[],
        private readonly author: string,
        private readonly isOwner: boolean,
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

    getIsOwner() {
        return this.isOwner;
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