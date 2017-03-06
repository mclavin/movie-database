/**
 * module pattern
 *
 * enkelt att återanvända/hantera kod
 *
 * håller variabler borta från global scope
 */
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

    //funktion för att betygsätta film
    /**
     * inputfälten hittar ingen film i databasen
     **/
    const rateMovie = () =>{
        console.log("wat");
        for(let i = 0; i < movies.length; i++){
            var movieRating = document.getElementsByClassName("movieRating");
            var movieTitle = document.getElementsByClassName("movieTitle");
            if(movieTitle == movies[i].title)
                movies.ratings.push(Number(movieRating.value));
            else
                console.log("nej");
        }
        console.log(movies);
    }

    //funktion för att visa alla filmer i Module.movies
    const logMovies = () => {
        //hämtar diven som är container för alla filmtitlar
        let movieList = document.getElementById("movieList");
        //tömmer containern ifall man lägger till ny film och vill logga ut alla igen
        movieList.innerHTML = "";
        //loopar genom Module.movies och skriver ut alla filmtitlar, samt ger dem en input och button för rating
        for (let i = 0; i < movies.length; i++){
            var movieWrapper = document.createElement("div");
            movieWrapper.setAttribute("id", "movieWrapper");
            var movieTitle = document.createElement("p");
            movieTitle.setAttribute("class", "movieTitle");
            var rating = document.createElement("input");
            rating.setAttribute("class", "movieRating");
            var rate = document.createElement("button");
            rate.setAttribute("class", "rateButton");
            rate.innerHTML = "Rate movie";
            //Event listener på knappen
            rate.addEventListener('click', rateMovie);
            movieList.appendChild(movieWrapper);
            movieWrapper.appendChild(movieTitle);
            movieWrapper.appendChild(rating);
            movieWrapper.appendChild(rate);
            movieTitle.innerHTML = movies[i].title;
        }

    }
    document.getElementById("getMovies").addEventListener("click", logMovies);


    /**
     * konstruktar som används för att kunna skapa nya filmobjekt
     *
     * konstruktor för att senare kunna  använda mig utav prototyper på filmobject
     *
     * nackdel med denna okonstruktor skulle vara om man vill skapa väldigt många filmer
     * kommer samma kod köras lika många gånger
     */
    const createMovie = function(title, year, genres){
        this.title = title;
        this.year = year;
        this.genres = genres;
    };

    //skapar en ny film med funktionen createMovie
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
        let myMovie = new createMovie(newTitle.value, Number(newYear.value), genArr);

        //lägger till den nya filmen i movies
        movies.push(myMovie);
    }
    document.getElementById("submitMovie").addEventListener("click", newMovie);

    //funktion för att hämta film med bäst rating
    const getTopRatedMovie = () => {
        //värde som ändras om snittrating på den loopade filmen är högre än förra snittet
        let topAvgRating = 0;
        //loopar genom alla filmer
        for (let i = 0; i < movies.length; i++){
            //
            if(movies[i].ratings == undefined){
                movies[i].ratings = [];
            }
            //initierar 2 variabler för att lagra ratings/värden i
            let avgRating = 0;
            let totRating = 0;
            //loopar genom ratings på en film för att lagra det totala värdet i totRating
            for (let j = 0; j < movies[i].ratings.length; j++){
                totRating += movies[i].ratings[j];
            }
            //räknar ut filmens snittrating
            avgRating = totRating/movies[i].ratings.length;
            //om filmens snittrating är den högsta snittrating sätts den som den högsta ratingen
            //filmen titel med högst rating sparas i title
            if(avgRating > topAvgRating){
                topAvgRating = avgRating;
                var title = movies[i].title;
            }
        }
        //skriver ut filmen med höst rating
        document.getElementById("bestOrWorst").innerHTML = `Filmen med högst rating är ${title} med en rating på ${topAvgRating}`;
    }
    document.getElementById("bestMovie").addEventListener("click", getTopRatedMovie);

    //funktion för att hämta film med sämst rating
    const getWorstRatedMovie = () => {
        //variabel för att hålla ett värde så att vi kan få en rating att jamföra med
        let tempRating = 0;
        //loopar genom första filmens ratings och lägger dem i tempRating
        for(let i = 0; i < movies[0].ratings.length; i++){
            tempRating += movies[0].ratings[i];
        }
        //sparar snittrating på första filmen i lowestAvgRating
        let lowestAvgRating = tempRating/movies[0].ratings.length;
        //loopar genom alla filmer
        for (let i = 0; i < movies.length; i++){
            //
            if(movies[i].ratings == undefined){
                movies[i].ratings = [];
            }
            //initierar 2 variabler för att lagra ratings/värden i
            let avgRating = 0;
            let totRating = 0;
            //loopar genom ratings på filmen [i] och lagrar alla ratings i totRating
            for (let j = 0; j < movies[i].ratings.length; j++){
                totRating += movies[i].ratings[j];
            }
            //räknar ut filmen snittrating
            avgRating = totRating/movies[i].ratings.length;
            //om snittbetyget på filmen är lägre än den tidigare filems snitt sätts denn nya filmens rating som den lägsta
            if(avgRating < lowestAvgRating){
                lowestAvgRating = avgRating;
                //sparar filmens titel med lägst rating i title
                var title = movies[i].title;
            }
        }
        //skriver ut filmen med lägst rating
        document.getElementById("bestOrWorst").innerHTML = `Filmen med lägst rating är ${title} med en rating på ${lowestAvgRating}`;
    }
    document.getElementById("worstMovie").addEventListener("click", getWorstRatedMovie);

    //funktion för att hämta film efter årtal
    const getMoviesByThisYear = () => {
        //hämtar inputfältet där årtal ska matas in
        let userYear = document.getElementById("year");
        //div som ska ska hålla filmer efter önskat årtal
        let yearDiv = document.getElementById("yearDiv");
        //tömmer diven varje gång funktionen körs så att det inte ligger kvar gamla resultat när vi hämtar nya
        yearDiv.innerHTML = "";
        //loopat genom alla filmer
        for (let i = 0; i < movies.length; i++){
            //ser över om filmens årtal stämmer överens med användarens input
            if (userYear.value == movies[i].year){
                //om det är true skriver vi ut filmens titel på sidan
                let p = document.createElement("p");
                let t = document.createTextNode(movies[i].title);
                yearDiv.appendChild(p);
                p.appendChild(t);
            }
        }
    }
    document.getElementById("getMoviesByYear").addEventListener("click", getMoviesByThisYear);

    //funktion för att hämta film efter genre
    const getMoviesByGenre = () => {
        //sparar alla filmer i movies
        let movies = Module.getMovies();
        //hämtar användarens input
        let userGenre = document.getElementById("genre");
        let genreDiv = document.getElementById("genreDiv");
        //tömmer diven så att vi inte har kvar gamla filmer när vi hämtar nya
        genreDiv.innerHTML = "";
        //loopar vi genom alla filmer
        for (let i = 0; i < movies.length; i++){
            //loopar genom filmen [i]s genre
            for (let j = 0; j < movies[i].genres.length; j++){
                //jämför user input med genres i movie och skriver ut resultat
                if (userGenre.value.toUpperCase() === movies[i].genres[j].toUpperCase()){
                    let p = document.createElement("p");
                    let t = document.createTextNode(movies[i].title);
                    p.appendChild(t);
                    genreDiv.appendChild(p);
                }
            }
        }
    }
    document.getElementById("getMoviesByGenre").addEventListener("click", getMoviesByGenre);

    return {
        getMovies: function(){
            return movies;
        }
    }
})();
