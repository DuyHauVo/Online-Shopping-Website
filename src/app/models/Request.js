class Request{
    
    constructor(_id,title,description,created_by,created_at,categories){
        this._id=_id;
        this.title=title;
        this.description=description;
        this.created_by=created_by;
        this.created_at=created_at;
        this.categories=categories;
    }
    static async FindAll_Request(db){
        try {
        const result_Request= await db.collection('Request').find({}).toArray();
            return result_Request.map(request=>new Request(request._id,request.title,request.description,request.created_by,request.created_at,request.categories));
        } catch (error) {
            console.error('Err',error);
        }        
    }
    
    async Create_Request(db){
        try {
            const result= await db.collection('Request').insertOne(this)
            return result
        } catch (error) {
            console.error('Err create',error);
        }
    }

    static async Detail_byID(db,id){
        try {
            const result_byID= await db.collection('Request').find({_id:id}).toArray()
            return result_byID;
        } catch (error) {
            console.error('Err detail',error);
        }
    }

}
export default Request
