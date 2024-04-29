import express from 'express';
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path"
import { EmpModel } from '../connection/dbcon.js';
//creating Route class instance
const route = express.Router();

const secretKey = 'ks99d8@lsl9k39s'; // Replace with your secret key

// Mock user database
const users = [
  { id: 1, email: 'sandeep@gmail.com', password: 'password123' }
];

const GetDate=()=>{
  const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${day}/${month}/${year}`;
return currentDate
}


// Storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Public/EmpImage/') // Upload files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Rename files to avoid conflicts
  }
});

const upload = multer({ storage: storage });

// Handle POST request with form data
route.post('/submit-form', upload.single('photo'), async (req, res) => {
  const formData = req.body; // Form data without the file
  const photoFile = req.file; // File uploaded through the form

  // Do something with formData and photoFile, like saving to a database or filesystem
  console.log('Form data:', formData);
  console.log('Uploaded photo:', photoFile);

  let r = await EmpModel({
    fullName: formData.fullName,
    email: formData.email,
    mobileNo: formData.mobileNo,
    gender: formData.gender,
    course: formData.course,
    designation: formData.designation,
    date:GetDate(),
    photo: photoFile.filename
  })

  await r.save();

  // Send response to the client
  res.status(200).json({ message: 'Form submitted successfully' });
});

route.post('/check-email', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await EmpModel.findOne({ email });

    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//fetch data api
route.get("/emp", async (req, res) => {
  try {
    // Extract the search query from the request query parameters
    const searchQuery = req.query.search;

    // Find users from MongoDB based on the search query
    const filteredUsers = await EmpModel.find({
      $or: [
        { fullName: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
        { gender: { $regex: searchQuery, $options: 'i' } },
        { designation: { $regex: searchQuery, $options: 'i' } },

      ]
    });

    // Return the filtered users as JSON response
    res.json(filteredUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})
//fetch single data
route.get("/emp/single/:id", async (req, res) => {
  try {
    // Extract the search query from the request query parameters
    const searchid = req.params.id;

    // Find users from MongoDB based on the search query
    const filteredUsers = await EmpModel.find({ _id: searchid });
    // Return the filtered users as JSON response
    res.json(filteredUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

//update data
route.put('/update', upload.single('photo'), async (req, res) => {
  const formData = req.body; // Form data without the file
  const photoFile = req.file; // File uploaded through the form

  // Do something with formData and photoFile, like saving to a database or filesystem
  console.log('Form data:', formData);
  console.log('Uploaded photo:', photoFile);
  if (photoFile) {
    var myquery = { email: formData.email };
    var newvalues = { $set: { fullName: formData.fullName, email: formData.email, mobileNo: formData.mobileNo, gender: formData.gender, course: formData.course, designation: formData.designation, photo: photoFile.filename } };
    const r = await EmpModel.updateOne(myquery, newvalues);
  }
  var myquery = { email: formData.email };
  var newvalues = { $set: { fullName: formData.fullName, email: formData.email, mobileNo: formData.mobileNo, gender: formData.gender, course: formData.course, designation: formData.designation } };
  const r = await EmpModel.updateOne(myquery, newvalues);

  // Send response to the client
  res.status(200).json({ message: 'Form submitted successfully' });
});

// Authentication endpoint
route.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
  res.json({ token });
});

route.delete('/emp/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    const deletedItem = await EmpModel.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully', deletedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


export default route