import bcrypt from "bcrypt";


class HashService {
    private saltRounds = 10;

    async gethash(password: string) {
        let salt = await bcrypt.genSalt(this.saltRounds);
        return await bcrypt.hash(password, salt);
    }

    async comparehash(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }

}


export default new HashService();
