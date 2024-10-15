const mongoose = require('mongoose');

mongoose.connect(process.env.URI, {
    serverSelectionTimeoutMS: 30000,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));