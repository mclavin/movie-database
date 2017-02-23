//array containing movies
var Module = (function(){
    var movies = [
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
    ];

    return {
        getMovies: function(){
            return movies;
        }
    }
})();

const logMovies = () => {
    console.log(Module.getMovies());
}
document.getElementById("getMovies").addEventListener("click", logMovies);

//konstruktar som används för att kunna skapa nya filmobjekt
const addMovie = function(title, year, genres){
    this.title = title;
    this.year = year;
    this.genres = genres;
};

//skapar en ny film med funktionen addMovie
const newMovie = () => {
    //hämtar textfält för att mata in värden som argument
    let newTitle = document.getElementById("newTitle");
    let newYear = document.getElementById("newYear");
    let newGen = document.getElementById("newGenre");
    //let secondGen = document.getElementById("secondGenre");

    //matar in genre och rating i arrayer
    let genArr = [];

    (function () {
        genArr.push(newGen.value);
    })();

    //skapar ny film utifrån konstruktorn newMovie
    let myMovie = new addMovie(newTitle.value, Number(newYear.value), genArr);

    //lägger till den nya filmen i movies
    Module.getMovies().push(myMovie);
}
document.getElementById("submitMovie").addEventListener("click", newMovie);

//funktion för att betygsätta film
const rateMovie = () => {
    movie = Module.getMovies()[6];
    rating = document.getElementById("rateValue");
    //om filmen inte har några ratings skapar vi en tom array och pushar sedan in en rating
    if(movie.ratings == undefined){
        movie.ratings = [];
        movie.ratings.push(Number(rating.value));
    }
    //har filmen redan ratings pushar vi in en ny rating i arrayen
    else
        movie.ratings.push(Number(rating.value));
}
document.getElementById("rateButton").addEventListener("click", rateMovie);