const express = require('express');
const app = express();
const port = process.argv[2] || 8080
const bodyParser = require('body-parser')

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index', {
    movies: getMovies()
  });
});

app.get('/movie/:movieId', (req, res) => {
  let { movieId } = req.params
  let movie = getMovies().find((movie) => {
    return movie.title.toLowerCase() === movieId.toLowerCase()
  })
  // res.render movie, pass movie object
  res.render('movie', { movie, });
});

app.post('/search', (req, res) => {
  // const mvSearch = req.query.searchTerm
  let mvSearch = req.body.searchTerm
  
  if (mvSearch) {
    let filteredMovie = getMovies().find((movie) => {
      return movie.title.toLowerCase().includes(mvSearch.toLowerCase())
    })
    res.render('search', { result: filteredMovie}); 
  }
})

app.listen(8080, () => {

});

getMovies = () => {
  return [{
    title: 'Blade Runner',
    year: '1982',
    rated: 'R',
    released: '25 June 1982',
    runtime: '1h 57min',
    genre: 'Sci-Fi, Thriller',
    director: 'Ridley Scott',
    writer: 'Hampton Fancher, David Peoples',
    actors: 'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
    plot: 'A blade runner must pursue and try to terminate four replicants who stole a ship in space and have returned to Earth to find their creator.',
    language: 'English',
    country: 'USA, Hong Kong',
  },
  {
    title: 'Star Wars',
    plot: 'test test test',
    actors: 'Somebody',
    id: 1
  },
  {
    title: 'Batman',
    plot: 'test test test',
    actors: 'Christian Bale',
    id: 2
  }];
}