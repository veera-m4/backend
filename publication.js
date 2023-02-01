const express = require('express')
const connectDB = require('./config/db');
const app = express();
connectDB();
app.get('/',(req,res) => res.send('API Running'));
app.use('/user/api',require('./routes/api/user'));
app.use('/auth/api',require('./routes/api/auth'));
app.use('/getuser/staffid', require('./routes/api/user'));
const PORT = process.env.port || 8080;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));