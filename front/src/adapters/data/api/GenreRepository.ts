import axios from "axios";
import Genre from "../../../domain/entities/Genre";
import type { GenreRepositoryInterface } from "../../../interfaces/repositories/GenreRepositoryInterface";
import type { GenreApiData } from "../../../typings/GenreApiData";

class GenreRepository implements GenreRepositoryInterface {
    async getGenres(): Promise<Genre[] | null> {
        try {
            const response = await axios.get("http://localhost:8000/api/genre");
            // const response = await axios.get("/api/genre");

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");

            return response.data.data.map((genre: GenreApiData) => new Genre(genre.id, genre.genreName));
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default GenreRepository;