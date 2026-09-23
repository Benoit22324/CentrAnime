import { Genre } from "@prisma/client";
import { GenreRepositoryInterface } from "../../domain/interfaces/GenreRepositoryInterface";

const genres: Genre[] = [
    {
        id: "genre1",
        genreName: "Comedy"
    },
    {
        id: "genre2",
        genreName: "Drama"
    },
    {
        id: "genre3",
        genreName: "Thriller"
    }
]

class InMemoryGenreRepository implements GenreRepositoryInterface {
    async getGenres(): Promise<Genre[] | null> {
        return genres;
    }
}

export default InMemoryGenreRepository;