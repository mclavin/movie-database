//array containing movies
var movieDatabase = {
    movies: [
        {
            title: "Pulp Fiction",
            year: 1994,
            genres: ["Crime", "Drama"],
            ratings: [9, 8, 10, 8, 9]
        },
        {
            title: "Fight Club",
            year: 1999,
            genres: ["Drama"],
            ratings: [8,9,8,9]
        },
        {
            title: "Lord of the Rings: The Fellowship of the Ring",
            year: 2001,
            genres: ["Adventure", "Drama", "Fantasy"],
            ratings: [7, 8, 9, 9, 10]
        },
        {
            title: "Django Unchained",
            year: 2012,
            genres: ["Drama", "Western"],
            ratings: [8, 8, 9]
        },
        {
            title:"Sharknado 3: Oh Hell No!",
            year: 2015,
            genres: ["Horror", "Sci-Fi"],
            ratings: [10, 1, 3, 1, 4]
        },
        {
            title: "Pokémon: Mewtwo Returns",
            year: 2001,
            genres: ["Fantasy", "Adventure"],
            ratings: [10, 10, 10, 10, 10]
        }
    ]
};

//konstruktar som används för att kunna skapa nya filmobjekt
const addMovie = function(title, year, genres){
    this.title = title;
    this.year = year;
    this.genres = genres;
};
//skapar en ny film med funktionen addMovie
const newMovie = function() {
    //hämtar textfält för att mata in värden som argument
    let newTitle = document.getElementById("newTitle");
    let newYear = document.getElementById("newYear");
    let newGen = document.getElementById("newGenre");
  //  let secondGen = document.getElementById("secondGenre");


    //matar in genre och rating i arrayer
    let genArr = [];

    (function () {
        genArr.push(newGen.value);
    })();

    //skapar ny film utifrån konstruktorn newMovie
    let myMovie = new addMovie(newTitle.value, Number(newYear.value), genArr);

    //lägger till den nya filmen i movieDatabase.movies
    movieDatabase.movies.push(myMovie);
    console.log(movieDatabase.movies)
};





document.getElementById("submitMovie").addEventListener("click", newMovie);