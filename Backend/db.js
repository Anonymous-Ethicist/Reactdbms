const mongoose=require('mongoose');
const connectToDatabase=async()=>{
    try{
        const MONGODB_URI = 'mongodb://127.0.0.1:27017/Fitness';
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        console.log('Connected to MongoDB');
    } catch(error){
        console.error('Error connecting to MongoDB',error.message);
        process.exit(1);
    }
};
const disconnectFromDatabase=async()=>{
    try{
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }catch(error){
        console.error('Error disconnecting from MongoDB:',error.message);
        process.exit(1);
    }
};
module.exports={connectToDatabase,disconnectFromDatabase};