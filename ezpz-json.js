$.extend(FormSerializer.patterns, {
  validate: /^[a-z][a-z0-9_-]*(?:\[(?:\d*|[a-z0-9_-]+)\])*$/i,
  key:      /[a-z0-9_-]+|(?=\[\])/gi,
  named:    /^[a-z0-9_-]+$/i
});

// $.fn.serializeObject = function() {
//   var self = this,
//       json = {},
//       push_counters = {},
//       patterns = {
//           "validate": /^[a-zA-Z][a-zA-Z0-9_-]*(?:\[(?:\d*|[a-zA-Z0-9_-]+)\])*$/,
//           "key":      /[a-zA-Z0-9_-]+|(?=\[\])/g,
//           "push":     /^$/,
//           "fixed":    /^\d+$/,
//           "named":    /^[a-zA-Z0-9_-]+$/
//       };


//   this.build = function(base, key, value){
//       base[key] = value;
//       return base;
//   };

//   this.push_counter = function(key){
//       if(push_counters[key] === undefined){
//           push_counters[key] = 0;
//       }
//       return push_counters[key]++;
//   };

//   $.each($(this).serializeArray(), function() {
//     // skip invalid keys
//     if(!patterns.validate.test(this.name)){
//       return;
//     }

//     var k,
//       keys = this.name.match(patterns.key),
//       merge = this.value,
//       reverse_key = this.name;

//     while((k = keys.pop()) !== undefined) {
//       // adjust reverse_key
//       reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

//       // push
//       if(k.match(patterns.push)){
//           merge = self.build([], self.push_counter(reverse_key), merge);
//       }

//       // fixed
//       else if(k.match(patterns.fixed)){
//           merge = self.build([], k, merge);
//       }

//       // named
//       else if(k.match(patterns.named)){
//           merge = self.build({}, k, merge);
//       }
//     }

//     json = $.extend(true, json, merge);
//   });

//   return json;
// };

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
    parseSeriesInfo(results.series);
    parseGameInfo(results.games);
  }
};

var download = function() {
  var contents = $('#contents-form').serializeObject();
  console.log(contents);
  $('#download-contents').text(JSON.stringify(contents));
  return false;
}

var parseSeriesInfo = function(series) {
  var myDiv = $('#series-inputs');
  var htmlContents = '';

  // Series Name
  htmlContents = '<label for="series-name">Series Name: </label>';
  htmlContents += '<input name="series[series-name]" id="series-name" type="text" value="' + series['series-name'] + '">';
  htmlContents += '<br />';

  // Series CSS File
  htmlContents += '<label for="series-css">CSS Filename: </label>';
  htmlContents += '<input name="series[series-css]" id="series-css" type="text" value="' + series['series-css'] + '">';
  htmlContents += '<br />';

  // Series Logo Filename
  htmlContents += '<label for="series-logo">Logo Filename: </label>';
  htmlContents += '<input name="series[series-logo]" id="series-logo" type="text" value="' + series['series-logo'] + '">';
  htmlContents += '<br />';

  // Series Has Timeline
  htmlContents += '<label for="has-timeline">Has Timeline: </label>';
  htmlContents += '<input name="series[has-timeline]" id="has-timeline" type="checkbox" checked="';
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
      htmlContents += '<label for=' + itemId + '>Entry ' + i + '</label><input name="series[timeline][]" value="' + t + '">';
      htmlContents += '<br />';
    });
  }

  myDiv.html(htmlContents);
}

var generateRelease = function(release) {
  var htmlContents = '';
  htmlContents += '<fieldset>';

  // Release
  htmlContents += '<legend><input type="text" name="games[][releases][][release]" value="';
  if (release && release['release']) {
    htmlContents += release['release'];
  }
  htmlContents += '"></legend>';

  // Release Date
  htmlContents += ' <label>Release Date:</label><input type="text" name="games[][releases][][release-date]" value="';
  if (release && release['release-date']) {
    htmlContents += release['release-date'];
  }
  htmlContents += '"><br />';

  // Release Accuracy
  htmlContents += ' <label>Release Accuracy:</label><input type="text" name="games[][releases][][release-accuracy]" value="';
  if (release && release['release-accuracy']) {
    htmlContents += release['release-accuracy'];
  }
  htmlContents += '"><br />';

  // Console
  htmlContents += ' <label>Console:</label><input type="text" name="games[][releases][][console]" value="';
  if (release && release['console']) {
    htmlContents += release['console'];
  }
  htmlContents += '"><br />';

  htmlContents += '</fieldset>';
  return htmlContents;
}

var generateCatGoal = function(goal) {
  var htmlContents = '';

  htmlContents += '<label>Goal:</label><input type="text" name="games[][categories][][cat-goals][]" value="';
  if (goal) {
    htmlContents += goal;
  }
  htmlContents += '">';

  return htmlContents;
}

var generateCategory = function(cat) {
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
  var htmlContents = '';
  htmlContents += '<fieldset>';

  // cat-name
  htmlContents += '<legend><input type="text" name="games[][categories][][cat-name]" value="';
  if (cat && cat['cat-name']) {
    htmlContents += cat['cat-name'];
  }
  htmlContents += '"></legend>';

  // Estimate
  htmlContents += '<label>Estimate</label><input type="text" name="games[][categories][][cat-estimate]" value="';
  if (cat && cat['cat-estimate']) {
    htmlContents += cat['cat-estimate'];
  }
  htmlContents += '"><br />';

  // Is Timeline
  htmlContents += '<label>Is Timeline:</label><input type="checkbox" name="games[][categories][][is-timeline]" ';
  if (cat && cat['is-timeline']) {
    htmlContents += 'checked="checked"';
  }
  htmlContents += '"><br />';

  // Goals

  htmlContents += '</fieldset>';
  return htmlContents;
}

var generateGame = function(game) {
  var htmlContents = '';
  htmlContents += '<fieldset>';

  // Name
  htmlContents += '<legend><input type="text" name="games[][name]" value="';
  if (game && game['name']) {
    htmlContents += game['name'];
  }
  htmlContents += '"></legend>';

  // Shortcode
  htmlContents += '<label>Short Code:</label><input type="text" name="games[][shortcode]" value="';
  if (game && game['shortcode']) {
    htmlContents += game['shortcode'];
  }
  htmlContents += '"><br />';

  // Is Licenced
  htmlContents += '<label>Is Licenced:</label><input type="checkbox" name="games[][is-licenced]" ';
  if (game && game['is-licenced']) {
    htmlContents += 'checked="checked"';
  }
  htmlContents += '"><br />';

  // Is Timeline
  htmlContents += '<label>Is Timeline:</label><input type="checkbox" name="games[][is-timeline]" ';
  if (game && game['is-timeline']) {
    htmlContents += 'checked="checked"';
  }
  htmlContents += '"><br />';

  // Timeline Position
  htmlContents += '<label>Timeline Position:</label><input type="text" name="games[][timeline-position]" value="';
  if (game && game['timeline-position']) {
    htmlContents += game['timeline-position'];
  }
  htmlContents += '"><br />';

  // Releases
  htmlContents += '<fieldset><legend>Releases</legend>';
  if (game && game['releases']) {
    game['releases'].forEach(function (r, i) {
      htmlContents += generateRelease(r);
    });
  }
  htmlContents += '</fieldset>';

  // // Categories
  // htmlContents += '<fieldset><legend>Categories</legend>';
  // if (game && game['categories']) {
  //   game['categories'].forEach(function (c, i) {
  //     htmlContents += generateCategory(c);
  //   });
  // }
  // htmlContents += '</fieldset>';

  htmlContents += '</fieldset>';

  return htmlContents;
}

var parseGameInfo = function(games) {
  var myDiv = $('#games-inputs');
  var htmlContents = '';

  games.forEach(function (g, i) {
    htmlContents += generateGame(g);
  });

  myDiv.html(htmlContents);
}
