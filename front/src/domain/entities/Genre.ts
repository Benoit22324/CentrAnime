class Genre {
    constructor(
        private readonly id: string,
        private readonly name: string
    ) { }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }
}

export default Genre;