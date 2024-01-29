const express = require('express');
const app = express();
const port = 3000;

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Routes

// 10 routes
for (let i = 1; i <= 10; i++) {
  app.get(`/route${i}`, (req, res) => {
    res.render('template1', { message: `This is route ${i}` });
  });
}

// Two different templates
app.get('/template1', (req, res) => {
  res.render('template1', { message: 'Hello from template 1!' });
});

app.get('/template2', (req, res) => {
  res.render('template2', { message: 'Greetings from template 2!' });
});

// Bonus: Dynamically add links to view engine
const links = [];
for (let i = 1; i <= 10; i++) {
  links.push({ url: `/route${i}`, text: `Link to Route ${i}` });
}

app.get('/dynamic-links', (req, res) => {
  res.render('dynamic-links', { links });
});

// Super Bonus: Single data resource route/view
const studentsObject = {
  1: { id: 1, name: 'John Doe' },
  2: { id: 2, name: 'Jane Smith' },
  // Add more student data
};

app.get('/students/:id', (req, res) => {
  const studentId = req.params.id;
  console.log(`The value for the :id route parameter is: ${studentId}`);
  res.render('students/show', {
    studentId,
    studentName: studentsObject[studentId] ? studentsObject[studentId].name : 'Student Not Found',
  });
});

// Route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to my Express App!');
});

// Listen on port 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
