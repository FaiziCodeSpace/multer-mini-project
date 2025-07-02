import express from 'express';
import multer from 'multer';
import path from 'path';
import url from 'url';
const app = express();
const PORT = 8080;

// FILENAME    
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set ejs 
app.set('view engine', 'ejs');
app.set('views', 'views');

// set static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// set multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, 'upload')),
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
}) 
const upload = multer({ storage }); 

app.get('/', (req, res)=>{
    res.render('index');
})
//  File-upload
app.post('/profile', upload.single('myFile') ,(req, res)=>{
   if (!req.file) return res.status(400).send('No file uploaded.'); 
    res.redirect('/');
})
  


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});