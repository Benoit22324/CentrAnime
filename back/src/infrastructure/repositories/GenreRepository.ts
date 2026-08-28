import { Genre } from "@prisma/client";
import { GenreRepositoryInterface } from "../../domain/interfaces/GenreRepositoryInterface";
import { prisma } from "../../api/config/client";

class GenreRepository implements GenreRepositoryInterface {
    async getGenres(): Promise<Genre[] | null> {
        const genres = await prisma.genre.findMany({
            orderBy: { genreName: "asc" }
        });

        if (!genres) return null

        return genres;
    }
}

export default GenreRepository;