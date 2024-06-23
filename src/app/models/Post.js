class Post {
    constructor(id, title, subtitle,content, author,publish_date,categories) {
        this.id=id,
        this.title=title,
        this.subtitle=subtitle,
        this.content=content,
        this.author=author,
        this.publish_date=publish_date,
        this.categories=categories
    }

    // Thêm post
    async save(db) {
        try {
            const result = await db.collection('posts').insertOne(
                this
            )
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    // get post
    static async findAll(db) {
        try {
            const docs = await db.collection('posts').find({}).toArray();
            return docs.map(doc => new Post(doc._id, doc.title,doc.subtitle,doc.content, doc.author,doc.publish_date,doc.categories))
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    // get post bằng id
    static async findById(db, id) {
        try {
            const doc = await db.collection('posts').findOne({ _id: id });
            return doc;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    // cập nhật
    async update(db, id) {
        try {
            const result = await db.collection('posts').updateOne(
                { _id: id },
                { $set: { title: this.title, subtitle:this.subtitle,content:this.content, author: this.author,publish_date:this.publish_date,categories:this.categories } }
            )
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    // xóa
    static async remove(db, id) {
        try {
            const result = await db.collection('posts').deleteOne({ _id: id });
            return result;
        } catch (err) {
            console.error(err);
            throw err
        }
    }
    // Show_Post_byID
    static async show_byID(db, id_user) {
        try {
            const result = await db.collection('posts').find({ id_users: id_user }).toArray()
            //  console.log(result);
            return result
        } catch (err) {
            console.log(err);
            throw err
        }
    }
    static async Delete_post_by_User(db, id_user_del) {
        try {
            const result = await db.collection('posts').deleteOne({ _id: id_user_del })
            return result
        } catch (err) {
            console.log(err);
            throw err
        }
    }
    async Update_Post(db, id_Upd) {
        try {
            const result = await db.collection('posts').updateOne({ _id: id_Upd }, {
                $set: {
                    title: this.title,
                    subtitle:this.subtitle,
                    content:this.content, 
                    author: this.author,
                    publish_date:this.publish_date,
                    categories:this.categories
                }
            })
            console.log(result);
            return result
        } catch (err) {
            console.log(err);
            throw err
        }
    }
}

export default Post;

