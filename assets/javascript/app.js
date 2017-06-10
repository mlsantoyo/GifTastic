var movies = ["True Romance", "Pulp Fiction", "Bad Lieutenant", "Goodfellas"];

function displayGif() {
      var movie = $(this).attr("data-movie");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var gifs = $("<img>");
            gifs.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(gifs);
            console.log(gifs);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    };



 
    function renderButtons() {
       $("#buttons-view").empty();

       for (var i = 0; i < movies.length; i++) {
        var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("movie");
          // Adding a data-attribute
          a.attr("data-movie", movies[i]);
          // Providing the initial button text
          a.text(movies[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

// This function handles events where a movie button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();
        // Adding movie from the textbox to our array
        movies.push(movie);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".movie", displayGif);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      
      