import express from 'express';
import User from '../user.model.js';
import { startSession } from 'mongoose';
const router = express.Router();

// Mock database
// const users = [
//   {
//     first_name: 'John',
//     last_name: 'Doe',
//     email: 'johndoe@example.com',
//   },
//   {
//     first_name: 'Alice',
//     last_name: 'Smith',
//     email: 'alicesmith@example.com',
//   },
// ];

router.post('/insert',async(req, res)=>{
  const {name,usn,address} = req.body;
  const user = await User.findOne({ usn });
  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }
  const newUser = new User({
    name,
    usn,
    address
   })
  
  if(newUser){
  newUser.save()
    res.status(201).json({
      name:newUser.name,
      usn:newUser.usn,
      address:newUser.address

    })
  }
  else{
    res.status(400).json({
      message:"invalid data"
    })
  }
})
router.get('/getAll', async (req, res) => {
  try{
      const data = await User.find();
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.put('/update/:usn', async (req, res) => {
  try {
      const {usn}= req.params;
      // const updatedData = req.body;
       const options = { new: true };
      const data ={name:req.body.name,
        address: req.body.address
      }

      const result = await User.findOneAndUpdate({usn:usn},data,
          options
      )
      console.log(result)

      if (result) {
        res.status(200).json({ message: "Data updated successfully" });
      } else {
        res.status(404).json({ error: "Data not found" });
      }
    
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})



export default router