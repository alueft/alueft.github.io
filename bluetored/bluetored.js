var n = 1500;
var offset_int = 2;
var int2str = {};
var str2int = {};
var all = "";
var trans = {};
var hist = [];
var histind = -1;
var wrap = 80;

var get_next = function(idx) {
  var totval = 0;
  for (var prop in trans[idx]) {
    if (trans[idx].hasOwnProperty(prop)) {
      totval += trans[idx][prop];
    }
  }
  if (totval === 0)
    return 0;
  var chosenval = Math.floor(Math.random() * totval);
  var val = 0;
  for (var prop in trans[idx]) {
    if (trans[idx].hasOwnProperty(prop)) {
      val += trans[idx][prop];
      if (val > chosenval) {
        return parseInt(prop);
      }
    }
  }
  return -1;
};

var kmp_init = function(p, fail) {
  for (var i = 0, j = -1, m = p.length; ; i++, j++) {
    fail[i] = j; if (i === m) return;
    while (j >= 0 && p.charAt(i) != p.charAt(j)) j = fail[j];
  }
};

var kmp_match = function(t, p) {
  var n = t.length, m = p.length;
  var fail = new Array(m+1);
  kmp_init(p, fail);
  for (var i = 0, j = 0; ; i++, j++) {
    if (j === m) return true;
    if (i === n) return false;
    while (j >= 0 && t.charAt(i) != p.charAt(j)) j = fail[j];
  }
  return false;
};

var gen = function() {
  while (true) {
    var prev_word = "~";
    var word = "~";
    var first = true;
    var out = "";
    do {
      var temp = word;
      word = int2str[get_next(str2int[prev_word]*n + str2int[word])];
      prev_word = temp;
      if (!first && word !== "~" && word !== "$") {
        out += " ";
      }
      first = false;
      if (word !== "~" && word !== "$") {
        out += word;
      }
    }
    while (word !== "~" && word !== "$");
    if (!kmp_match(all,out)) {
      var out2 = out;
      out = "";
      var ind = 0, ind2 = 0;
      while (ind < out2.length) {
        while (ind2 < out2.length && (ind2-ind < wrap || out2[ind2] !== ' ')) {
          ind2++;
        }
        if (out !== "") {
          out += "<br>";
        }
        out += out2.substr(ind,ind2-ind);
        ind = ind2+1;
        ind2 += 2;
      }
      document.getElementById("lyric").innerHTML = out;
      histind++;
      if (histind === hist.length) {
        hist.push(out);
      }
      else {
        hist[histind] = out;
      }
      break;
    }
  }
};

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var response = JSON.parse(this.responseText);
    trans = response[0];
    str2int = response[1];
    all = response[2];
    for (var prop in str2int) {
      if (str2int.hasOwnProperty(prop)) {
        int2str[str2int[prop]] = prop;
      }
    }
  gen();
  }
};
xmlhttp.open("GET", "data.json", true);
xmlhttp.send();

var histb = function() {
  if (histind > 0) {
    histind--;
    document.getElementById("lyric").innerHTML = hist[histind];
  }
};

var histf = function() {
  if (histind >= 0 && histind+1 < hist.length) {
    histind++;
    document.getElementById("lyric").innerHTML = hist[histind];
  }
};

document.body.addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    gen();
  }
  else if (e.keyCode === 66) {
    histb();
  }
  else if (e.keyCode === 70) {
    histf();
  }
});

document.getElementById("lyric").addEventListener("click", function() {
  var node = document.getElementById("lyric");
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
  }
  else if (window.getSelection) {
    var range = document.createRange();
    range.selectNodeContents(node);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
});
