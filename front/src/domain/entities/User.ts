class User {
    constructor(
        private id: string,
        private username: string,
        private email: string,
        private createdAt: Date,
        private lastLogin: Date
    ) { }

    getId() {
        return this.id;
    }

    getUsername() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getLastLogin() {
        return this.lastLogin;
    }
}

export default User;