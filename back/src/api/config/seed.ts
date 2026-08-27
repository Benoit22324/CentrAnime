import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { generateSalt, getEnvVariable, hashPassword } from "../utility";

export const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: getEnvVariable("DATABASE_URL")
    })
});

const genres = [
    "Action",
    "Drama",
    "Comedy",
    "Horror",
    "Psychological",
    "School",
    "School Life",
    "Music",
    "Mystery"
]

const platform = {
    platformName: "AniList",
    link: "https://anilist.co"
}

const rank = {
    rank: 0
}

const score = {
    score: 6.1
}

const anime = {
    main_title: "Spy Kyoushitsu",
    en_title: "Spy Classroom",
    type: "TV",
    episodes: 12,
    status: "FINISHED",
    posterUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx146323-vyj1w1VRgDN7.png",
    startDate: "5/1/2023",
    endDate: "30/3/2023",
    popularity: 66032,
    synopsis: "Conflict-ravaged nations now deploy covert operatives instead of missiles. Lily is recruited into spy-training… but her practical skills are absolutely abysmal. Desperate to pass, she leaps at the chance to join the mysterious “Tomoshibi” team. Too bad the team is filled with even more hopeless spies. Together they must conquer the Impassible Mission and best their genius instructor, but the true purpose behind their classroom is more harrowing than they can imagine…<br>\n<br>\n(Source: HIDIVE)",
    updatedAt: new Date()
}

async function main() {
    console.log("Ajout de l'utilisateurs...");
    const salt = await generateSalt();
    const hashedPassword = await hashPassword("test", salt);

    await prisma.user.create({
        data: {
            username: "test",
            email: "test@gmail.com",
            password: hashedPassword,
            salt,
            createdAt: new Date()
        }
    })
    console.log("Utilisateur test ajouté");

    for (const genreName of genres) {
        await prisma.genre.create({
            data: {
                genreName
            }
        })
    }
    console.log("Genres ajoutées");

    const platformData = await prisma.platform.create({
        data: platform
    })

    const scoreData = await prisma.score.create({
        data: {
            ...score,
            platformId: platformData.id
        }
    })
    const rankData = await prisma.rank.create({
        data: {
            ...rank,
            platformId: platformData.id
        }
    })

    const animeData = await prisma.anime.create({
        data: {
            ...anime,
            rankId: rankData.id,
            scoreId: scoreData.id
        }
    })
    console.log("Anime ajouté");

    const actionGenre = await prisma.genre.findMany({
        where: {
            genreName: "Action"
        }
    })
    const dramaGenre = await prisma.genre.findMany({
        where: {
            genreName: "Drama"
        }
    })

    await prisma.animeGenre.create({
        data: {
            animeId: animeData.id,
            genreId: actionGenre[0].id
        }
    })
    await prisma.animeGenre.create({
        data: {
            animeId: animeData.id,
            genreId: dramaGenre[0].id
        }
    })
    console.log("Genres ajoutés")
}

main()
    .catch(e => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })