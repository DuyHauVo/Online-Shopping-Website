import { MongoClient, ServerApiVersion } from 'mongodb';
// const uri = "mongodb+srv://hungnnpd08422:hungnnpd08422@cluster0.kkgahsn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb+srv://assignment:sk3D-x778xZhQ!$@atlascluster.yeiscpa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

class Connection {

    constructor() {
      // Init a MongoClient with a MongoClientOptions object to set the Stable API version
      this.client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    }
  
    async connect() {
      try {
        // Connect the client to the server
        console.log("Connecting to MongoDB...");
        await this.client.connect();
        
        // Test connection
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
        // Return the database
        return await this.client.db("assignment");
      } catch (e) {
        console.error(e);
      }
    }
  
    async close() {
      await this.client.close();
      console.log("Closed MongoDB connection");
    }
  }
  
  // export client
  export default new Connection;
  