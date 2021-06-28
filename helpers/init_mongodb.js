const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017',{
    dbname:"user_table",
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true,
})
.then(()=>{
    console.log('mongodb connected.')
})
.catch(err=>console.log(err.message))

mongoose.connection.on('connected',()=>{
    console.log("mongoose connected to dbase")
})

mongoose.connection.on('error',(err)=>{
    console.log(err.message)
})

mongoose.connection.on('disconnected',()=>{
    console.log('mongoose is disconnected.')

})

process.on('SIGINT',async()=>{
    await mongoose.connection.close();
    process.exit(0)
})