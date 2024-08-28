const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs  = require('fs');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        const fileContents = files.map((filename) => {
            const content = fs.readFileSync(`./files/${filename}`, 'utf-8');
            return { filename, content };
        });
        res.render('index', { files: fileContents });
    });
});





app.get('/files/:filename', (req, res) => {
    
    const filePath = `./files/${req.params.filename}`;
    
    fs.readFile(filePath, "utf-8", (err, data) => {
        const stats = fs.statSync(filePath);
        const createdAt = stats.birthtime;
        
        res.render('reading', { filename: req.params.filename, filedata: data, createdAt: createdAt });
    });
});


app.post('/create', (req, res) => {
    fs.writeFile (`./files/${req.body.title.split(" ").join("-")}.txt`, req.body.details, (err) => {
        res.redirect("/")
   })

});




app.get('/edit/:filename', (req, res) => {

    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
        res.render('edit', { filename: req.params.filename, filedata: data });
    });
});

app.post('/edit/:filename', (req, res) => {    
    fs.rename(`./files/${req.params.filename}`, `./files/${req.body.newFilename}.txt`, (err) => {
        res.redirect('/');
    });
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


