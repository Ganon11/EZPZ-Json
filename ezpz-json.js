$(document).ready(function() {
  //$('#config').change(configChanged);
});

var configChanged = function() {
  var file = document.getElementById('config').files[0];

  var reader = new FileReader();
  reader.onload = readFile;

  reader.readAsText(file);
};

var readFile = function(e) {
  var file = e.target.result;
  var results;
  if (file && file.length) {
    results = JSON.parse(file);
    console.log(results);
    parseSeriesInfo(results.series);
    parseGameInfo(results.games);
  }
};

var parseSeriesInfo = function(series) {
  var myDiv = $('#series-inputs');
  var htmlContents = '';

  // Series Name
  htmlContents = '<label for="series-name">Series Name: </label>';
  htmlContents += '<input name="series-name" id="series-name" type="text" value="' + series['series-name'] + '">';
  htmlContents += '<br />';

  // Series CSS File
  htmlContents += '<label for="series-css">CSS Filename: </label>';
  htmlContents += '<input name="series-css" id="series-css" type="text" value="' + series['series-css'] + '">';
  htmlContents += '<br />';

  // Series Logo Filename
  htmlContents += '<label for="series-logo">Logo Filename: </label>';
  htmlContents += '<input name="series-logo" id="series-logo" type="text" value="' + series['series-logo'] + '">';
  htmlContents += '<br />';

  // Series Has Timeline
  htmlContents += '<label for="series-has-timeline">Has Timeline: </label>';
  htmlContents += '<input name="series-has-timeline" id="series-has-timeline" type="checkbox" checked="';
  if (series['has-timeline']) {
    htmlContents += 'checked';
  }
  htmlContents += '">';
  htmlContents += '<br />';

  // Timeline Entries
  htmlContents += '<fieldset><legend>Timeline</legend>';
  if (series['timeline']) {
    series['timeline'].forEach(function(t, i) {
      var itemId = 'timeline_' + i;
      htmlContents += '<label for=' + itemId + '>Entry ' + i + '</label><input name="timeline[]" value="' + t + '">';
      htmlContents += '<br />';
    });
  }

  myDiv.html(htmlContents);
}

var parseGameInfo = function(games) {
  var myDiv = $('#games-inputs');
  var htmlContents = '';

  games.forEach(function (g, i) {
    // {
    //   "name": "The Legend of Zelda",
    //   "shortcode": "tloz",
    //   "is-licenced": true,
    //   "is-timeline": true,
    //   "timeline-position": 2.7,
    //   "releases": [
    //     {
    //       "release": "NES",
    //       "release-date": "1986-02-21T00:00:000Z",
    //       "release-accuracy": "day",
    //       "console": "NES"
    //     },
    //   ],
    //   "categories": [
    //     {
    //       "cat-name": "Normal Completion",
    //       "cat-estimate": 4,
    //       "cat-goals": [
    //         "Level 1",
    //         "Level 2",
    //         "Level 3",
    //         "Level 4",
    //         "Level 5",
    //         "Level 6",
    //         "Level 7",
    //         "Level 8",
    //         "Level 9"
    //       ]
    //     },
    //     {
    //       "cat-name": "Second Quest",
    //       "cat-estimate": 6,
    //       "cat-goals": [
    //         "Level 1",
    //         "Level 2",
    //         "Level 3",
    //         "Level 4",
    //         "Level 5",
    //         "Level 6",
    //         "Level 7",
    //         "Level 8",
    //         "Level 9"
    //       ],
    //       "is-timeline": false
    //     }
    //   ]
    // },
    htmlContents += '<fieldset><legend><input type="text" name="games[].name" value="' + g['name'] + '"></legend>';
    htmlContents += '</fieldset>'
  });

  myDiv.html(htmlContents);
}
