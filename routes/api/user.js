const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/users');
router.use(express.json()) 
const jwt =  require('jsonwebtoken');
const config = require('config');



router.get('/',(req,res) => res.send('user route'));
router.post('/adduser',
[
    check('staffid','Staffid is required')
    .notEmpty(),
    check('name', 'Name is requires')
    .notEmpty(),
    check('email','valide Email is required')
    .isEmail(),
    check('password','password is required').isLength({
        min : 8
    }),
    check('department', 'department is requires')
    .notEmpty()
    
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password,staffid,department } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password,
        staffid,
        department

      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      const payload = {
        user:{
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

router.get('/getuser/:staffid',
  async (req, res) => {

    try {
      let user = await User.findOne({staffid : req.params.staffid});

      if (user) {
        return res.json(user);
      }
      else
      {
        res.status(500).send('User does not exists');
      }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
);

module.exports = router;