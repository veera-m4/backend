const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/users');
router.use(express.json()) 
const jwt =  require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');


router.get('/',(req,res) => res.send('auth route'));


router.post('/authuser',
[
    check('staffid','Staffid is required')
    .notEmpty(),
    check('password','password is required').exists()
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { staffid, password} = req.body;

    try {
      let user = await User.findOne({ staffid });
      console.dir(staffid);
      console.dir(password);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User not exists' }] });
          
      }

      const isMatch = await bcrypt.compare (password,user.password);


      if(!isMatch)
      {
        
        return res
          .status(400)
          .json({ errors: [{ msg: 'password is wrong' }] });
      }
      const payload = {
        user:{
            id:user.id,
            name:user.name,
            staffid : user.staffid
        }
    }
    jwt.sign(payload, config.get('jwtSecret'),
    {
        expiresIn :36000
    },
    (err,token) => {
        if(err) throw err;
        res.json({token}); 
    }
    )
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
);


router.get('/getuser', auth,async (req,res) => {
  try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
    console.dir(user);
  }
  catch(err)
  {
    res.status(500).send(err.message);
    console.dir(err.message);
  }
}
);
module.exports = router;