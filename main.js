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
            ratings: [9, 8, 10, 8, 9],
            cover: "http://cdn.miramax.com/media/assets/Pulp-Fiction1.png"
        },
        {
            title: "Fight Club",
            year: 1999,
            genres: ["Drama"],
            ratings: [8,9,8,9],
            cover: "http://cdn.playbuzz.com/cdn/a99cfa7f-1267-42ca-9ae3-516d37c42005/fb69c47f-a441-4abd-932c-73503410383c.jpg"
        },
        {
            title: "Lord of the Rings: The Fellowship of the Ring",
            year: 2001,
            genres: ["Adventure", "Drama", "Fantasy"],
            ratings: [7, 8, 9, 9, 10],
            cover: "http://www.theclosetfeminist.ca/wp-content/uploads/2015/09/LOTR-movie-poster.jpeg"
        },
        {
            title: "Django Unchained",
            year: 2012,
            genres: ["Drama", "Western"],
            ratings: [8, 8, 9],
            cover: "http://www.impawards.com/2012/posters/django_unchained_ver9.jpg"
        },
        {
            title:"Sharknado 3: Oh Hell No!",
            year: 2015,
            genres: ["Horror", "Sci-Fi"],
            ratings: [10, 1, 3, 1, 4],
            cover: "http://www.gstatic.com/tv/thumb/movieposters/11560110/p11560110_p_v8_aa.jpg"
        },
        {
            title: "Pokémon: Mewtwo Returns",
            year: 2001,
            genres: ["Fantasy", "Adventure"],
            ratings: [10, 10, 10, 10, 10],
            cover: "https://s-media-cache-ak0.pinimg.com/564x/1b/be/94/1bbe9463d8943157a4ec871a4bc91312.jpg"
        }
    ];

    /**
     * konstruktar som används för att kunna skapa nya filmobjekt
     *
     * konstruktor för att enkelt  använda mig utav prototyper på filmobject
     *
     * nackdel med denna okonstruktor skulle vara om man vill skapa väldigt många filmer
     * kommer samma kod köras lika många gånger
     */
    const createMovie = function(title, year, genres, cover, ratings){
        this.title = title;
        this.year = year;
        this.genres = genres;
        this.cover = cover;
        this.ratings = ratings;
    };

    /**
     * skapar en prototyp för alla filmer som beräknar avg rating.
     * Object.protytype istället för createMovie.prototype för att det finns hårdkodade filmer i filen
     * som är av typen Object och inte createMovie
    */
    Object.prototype.avgRating = function() {
        let totValue = 0;
        let avgRating;
        /**
         * räknar ut filmens totala rating
        */
        for (let i = 0; i < this.ratings.length; i++){
            totValue += this.ratings[i];
        }
        //dividerar totalen med antal ratings och får snittet
        avgRating = totValue/this.ratings.length;
        //returnerar snittet
        return avgRating;

    };

    //skapar en ny film med funktionen createMovie
    const newMovie = () => {
        //hämtar textfält för att mata in värden som argument
        let newTitle = document.getElementById("newTitle");
        let newYear = document.getElementById("newYear");
        let newGen = document.getElementById("newGenre");
        let newCover = document.getElementById("newCover");
        //array för att lagra genres
        let genArr = [];
        //variabel som filmen kommer lagras i
        let myMovie;

        //matar in genres i genre-arrayen
        (function () {
            genArr.push(newGen.value);
        })();

        //skapar en tom ratingsarray
        let rateArr = []

        //lagrar och skapar ny film i myMovie med hjälp av konstruktorn createMovie
        myMovie = new createMovie(newTitle.value, Number(newYear.value), genArr, newCover.value, rateArr);

        //lägger till den nya filmen i movies
        movies.push(myMovie);
        console.log(movies);
    }

    //funktion för att betygsätta film
    const rateMovie = () =>{
        //hämtar title och inputfält från DOM
        let title = document.getElementsByClassName("title");
        let movieRating = document.getElementsByClassName("movieRating");

        //hittar alla titlar i DOM
        for (let i = 0; i < title.length; i++){
            //hittar alla titlar i DB
            for (let j = 0; j < movies.length; j++) {
                //om en titel i DOMen är like med en i databasen pushar vi in värdet på titels inputfält
                if (title[i].innerHTML == movies[j].title && movieRating[i].value > 0) {
                    movies[j].ratings.push(Number(movieRating[i].value));
                    movieRating[i].value = "";
                }
            }
        }
    }

    //funktion för att visa alla filmer i Module.movies
    const getMovies = () => {
        //tömmer diven så det inte kommer upp fler filmer än vad som skall visas
        document.getElementById("movieList").innerHTML = "";

        //hämtar diven som är container för alla filmtitlar
        let movieList = document.getElementById("movieList").innerHTML = "";
        //loopar genom Module.movies och hämtar alla filmtitlar, ratings och omslag

        for (let i = 0; i < movies.length; i++){
            let titleT = document.createTextNode(movies[i].title);
            let ratingT;
            if (isNaN(movies[i].avgRating())) {
                ratingT = document.createTextNode("No rating");
            }
            else {
                ratingT = document.createTextNode(`Rating: ${movies[i].avgRating().toFixed(1)}`);
            }
            console.log(ratingT);
            let img = document.createElement("img");
            img.src = movies[i].cover;


            //skickar data till printfunktion
            printMovies(titleT, ratingT, img);
        }
        //kallar på funktion för att skapa rateknapp
        addRateButton();
    }

    //funktion för att hämta film med bäst rating
    const getTopRatedMovie = () => {
        //tömmer diven så det inte kommer upp fler filmer än vad som skall visas
        document.getElementById("movieList").innerHTML = "";

        //hämtar ett startvärde för att kunna fämföra
        let myRating = movies[0].avgRating();
        let titleT;
        let ratingT;
        let img = document.createElement("img");

        //loopar alla filmer och ser om snittrating på filmen [i] är högre än det föregående
        for (let i = 0; i < movies.length; i++) {
            /**
             * är snittet högre sätter vi filmen [i]'s rating som det nya "startvärdet"
             * sätter även värden på textnoder och sökväg till bild
            */
             if (movies[i].avgRating() > myRating){
                myRating = movies[i].avgRating();

                titleT = document.createTextNode(movies[i].title);
                if (isNaN(movies[i].avgRating())) {
                    ratingT = document.createTextNode("No rating");
                }
                else {
                    ratingT = document.createTextNode(`Rating: ${myRating.toFixed(1)}`);
                }
                img.src = movies[i].cover;
            }
        }

        //skickar data till printfunktion
        printMovies(titleT, ratingT, img);

        //kallar på funktion för att sätta ut  rateknapp
        addRateButton();
    }

    //funktion för att hämta film med sämst rating
    const getWorstRatedMovie = () => {
        //tömmer diven så det inte kommer upp fler filmer än vad som skall visas
        document.getElementById("movieList").innerHTML = "";

        //hämtar ett startvärde för att kunna fämföra
        let myRating = movies[0].avgRating();
        let titleT;
        let ratingT;
        let img = document.createElement("img");

        //loopar alla filmer och ser om snittrating på filmen [i] är lägre än det föregående
        for (let i = 0; i < movies.length; i++) {
            /**
             * är snittet lägre sätter vi filmen [i]'s rating som det nya "startvärdet"
             * sätter även värden på textnoder och sökväg till bild
             */
            if (movies[i].avgRating() < myRating){
                myRating = movies[i].avgRating();
                titleT = document.createTextNode(movies[i].title);
                if (isNaN(movies[i].avgRating())) {
                    ratingT = document.createTextNode("No rating");
                }
                else {
                    ratingT = document.createTextNode(`Rating: ${myRating.toFixed(1)}`);
                }
                img.src = movies[i].cover;
            }
        }

        //skickar data till printfunktion
        printMovies(titleT, ratingT, img);

        //kallar på funktion för att sätta ut  rateknapp
        addRateButton();
    }

    //funktion för att hämta film efter årtal
    const getMoviesByThisYear = () => {
        //tömmer diven så det inte kommer upp fler filmer än vad som skall visas
        document.getElementById("movieList").innerHTML = "";

        //hämtar inputfältet där årtal ska matas in
        let userYear = document.getElementById("year");

        //loopat genom alla filmer
        for (let i = 0; i < movies.length; i++){
            //ser över om filmens årtal stämmer överens med användarens input
            if (userYear.value == movies[i].year){
                //om det är true sparar vi variabler och skickar dem till utskrivningsfunktion
                let titleT = document.createTextNode(movies[i].title);
                let ratingT;
                if (isNaN(movies[i].avgRating())) {
                    ratingT = document.createTextNode("No rating");
                }
                else {
                    ratingT = document.createTextNode(`Rating: ${movies[i].avgRating().toFixed(1)}`);
                }
                let img = document.createElement("img");
                img.src = movies[i].cover;

                //skickar till printfunktion
                printMovies(titleT, ratingT, img);
            }
        }
        //kallar på funktion som skriver sätter ut rateknapp
        addRateButton();
    }

    //funktion för att hämta film efter genre
    const getMoviesByGenre = () => {
        //tömmer diven så det inte kommer upp fler filmer än vad som skall visas
        document.getElementById("movieList").innerHTML = "";

        //hämtar användarens input
        let userGenre = document.getElementById("genre");

        //loopar vi genom alla filmer
        for (let i = 0; i < movies.length; i++){
            //loopar genom filmen [i]s genre
            for (let j = 0; j < movies[i].genres.length; j++){
                //jämför user input med genres i movie och sparar resultat
                if (userGenre.value.toUpperCase() === movies[i].genres[j].toUpperCase()){
                    let titleT = document.createTextNode(movies[i].title);
                    let ratingT;
                    if (isNaN(movies[i].avgRating())) {
                        ratingT = document.createTextNode("No rating");
                    }
                    else {
                        ratingT = document.createTextNode(`Rating: ${movies[i].avgRating().toFixed(1)}`);
                    }
                    let img = document.createElement("img");
                    img.src = movies[i].cover;

                    //skickar till funtion för att printa
                    printMovies(titleT, ratingT, img);
                }
            }
        }
        //kallar på funktion som sätter ut rateknapp
        addRateButton();
    }

    //printar filmer
    const printMovies = (titleT, ratingT, img) => {
        let movieWrapper = document.createElement("div");
        let titleP = document.createElement("p");
        let ratingP = document.createElement("p");
        let ratingField = document.createElement("input");

        movieWrapper.setAttribute("class", "movieWrapper");
        titleP.setAttribute("class", "title");
        ratingField.setAttribute("class", "movieRating");
        ratingField.setAttribute("placeholder", "rate from 1-10");

        titleP.appendChild(titleT);
        ratingP.appendChild(ratingT);

        movieWrapper.appendChild(img);
        movieWrapper.appendChild(ratingField);
        movieWrapper.appendChild(titleP);
        movieWrapper.appendChild(ratingP);
        document.getElementById("movieList").appendChild(movieWrapper);
    }

    //sätter ut en rateknapp
    const addRateButton = () => {
        let movieList = document.getElementById("movieList");
        let rate = document.createElement("button");

        rate.setAttribute("id", "rateButton");
        rate.innerHTML = "Rate";
        rate.addEventListener('click', rateMovie);

        //om knappen redan finns tar vi först bort den innan vi lägger till en ny
        movieList.parentNode.removeChild(movieList.parentNode.childNodes[2]);
        movieList.parentNode.appendChild(rate);
    }

    document.getElementById("getMovies").addEventListener("click", getMovies);
    document.getElementById("bestMovie").addEventListener("click", getTopRatedMovie);
    document.getElementById("worstMovie").addEventListener("click", getWorstRatedMovie);
    document.getElementById("getMoviesByYear").addEventListener("click", getMoviesByThisYear);
    document.getElementById("submitMovie").addEventListener("click", newMovie);
    document.getElementById("getMoviesByGenre").addEventListener("click", getMoviesByGenre);

})();