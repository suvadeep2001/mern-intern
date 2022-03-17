const mongoose = require('mongoose')

exports.connect = () =>{
    mongoose.connect(process.env.MONGO_URI)
    .then(
        () => console.log('Connected')
    )
    .catch(err =>console.log(err))
}