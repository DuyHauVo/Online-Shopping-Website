class User {
    constructor(_id, name, email, password, role) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role
    }

    // insert a new user
    async save(db) {
        try {
            return await db.collection('users').insertOne(this);
        } catch (err) {
            console.error(`Error: ${err}`);
            throw err;
        }
    }

    // check user exist
    static async isAvailable(db, email) {
        try {
            const result = await db.collection('users').findOne({ email: email });
            console.log(`Result0: ${result}`);
            return result ? true : false;
        } catch (err) {
            console.error(`Error: ${err}`);
            throw err;
        }
    }

    // get user by email
    static async findByEmail(db, email) {
        try {
            const result = await db.collection('users').findOne({ email: email });
            return result ? new User(result._id, result.name, result.email, result.password,result.role) : null;
        } catch (err) {
            console.error(`Error: ${err}`);
            throw err;
        }
    }
    static async list_user(db) {
        try {
            const result = await db.collection('users').find({}).toArray()
            // console.log(result);
            return result.map(result => new User(result._id, result.name, result.email, result.password, result.role))
        } catch (err) {
            console.log(err);
            throw err
        }
    }
    static async Check_user(db,id) {

        const result = await db.collection('users').find({_id : id}).toArray()
        return result
        // return result
    }
    static async delete_user(db, id) {
        const result = await db.collection('users').deleteOne({ _id: id })
        return result
    }
}

export default User;