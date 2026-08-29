type AnimeRank = {
    rank: number,
    platformName: string,
    link: string
}
type AnimeScore = {
    score: number,
    platformName: string,
    link: string
}

class Anime {
    constructor(
        private readonly id: string,
        private readonly main_title: string,
        private readonly en_title: string,
        private readonly type: string,
        private readonly episodes: number,
        private readonly status: string,
        private readonly posterUrl: string,
        private readonly startDate: string,
        private readonly endDate: string,
        private readonly popularity: number,
        private readonly synopsis: string,
        private readonly updatedAt: Date,
        private readonly genres: string[],
        private readonly rank?: AnimeRank,
        private readonly score?: AnimeScore,
        private readonly studio?: string
    ) { }

    getId() {
        return this.id;
    }

    getMainTitle() {
        return this.main_title;
    }

    getEnTitle() {
        return this.en_title;
    }

    getType() {
        return this.type;
    }

    getEpisodes() {
        return this.episodes;
    }

    getStatus() {
        return this.status;
    }

    getPosterUrl() {
        return this.posterUrl;
    }

    getStartDate() {
        return this.startDate;
    }

    getEndDate() {
        return this.endDate;
    }

    getPopularity() {
        return this.popularity;
    }

    getSynopsis() {
        return this.synopsis;
    }

    getUpdatedAt() {
        return this.updatedAt;
    }

    getGenres() {
        return this.genres;
    }

    getRank() {
        return this.rank;
    }

    getScore() {
        return this.score;
    }

    getStudio() {
        return this.studio;
    }
}

export default Anime;