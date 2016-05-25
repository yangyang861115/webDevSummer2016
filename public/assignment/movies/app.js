/**
 * Created by yangyang on 5/25/16.
 */
(function () {
    $(init);

    function init() {
        $.ajax({
            url: "http://www.omdbapi.com/?s=batman",
            success: renderMovies
        });
    }

    function renderMovies(response) {
        var table = $("<table class='table'>");
        for(var m in response.Search) {
            var movie = response.Search[m];
            //console.log(movie);
            var title = movie.Title;
            var imdbID = movie.imdbID;
            var poster = movie.Poster;

            var tr = $("<tr>");
            var td = $("<td>");
            td.append(imdbID);
            tr.append(td);
            td = $("<td>");
            td.append(title);
            tr.append(td);

            table.append(tr);
        }
        $("div.container").append(table);
    }
})();