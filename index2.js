const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Example route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    // Access uploaded file using req.file
    console.log(req.file);
    res.send('File uploaded successfully.');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
