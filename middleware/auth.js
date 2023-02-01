const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = function(req,res,next)
{
    const token = req.header('x-auth-token');
    if(!token)
    {
        return res.status(401).json({msg :'no token found'});
    }
    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        req.user = decoded.user;
        console.dir(req.user);
        console.dir('1');
        next()

    }
    catch(err)
    {
        return res.send('server error');
    }
}