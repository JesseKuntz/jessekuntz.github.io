const KEYS_TO_NOTES = {
  'z': 'c1',
  'x': 'd1',
  'c': 'e1',
  'v': 'f1',
  'b': 'g1',
  'n': 'a1',
  'm': 'b1',
  's': 'cs1',
  'd': 'ds1',
  'g': 'fs1',
  'h': 'gs1',
  'j': 'as1',
  'Z': 'c2',
  'X': 'd2',
  'C': 'e2',
  'V': 'f2',
  'B': 'g2',
  'N': 'a2',
  'M': 'b2',
  'S': 'cs2',
  'D': 'ds2',
  'G': 'fs2',
  'H': 'gs2',
  'J': 'as2'
}

function playNote(key) {
  console.log(key);
  var audio = new Audio('notes/' + key + '.wav');
  audio.play();
  if (key.length > 2) {
    document.getElementById(key).src = 'images/black_key_pressed.gif';
  } else {
    document.getElementById(key).src = 'images/white_key_pressed.gif';
  }
}

function releaseNote(key) {
  if (key.length > 2) {
    document.getElementById(key).src = 'images/black_key.gif';
  } else {
    document.getElementById(key).src = 'images/white_key.gif';
  }
}

document.addEventListener('keypress', (event) => {
  note = KEYS_TO_NOTES[event.key];
  if (note != undefined) {
    playNote(note);
  } else {
    console.log('\'' + event.key + '\' not mapped to a note.');
  }
});

document.addEventListener('keyup', (event) => {
  note = KEYS_TO_NOTES[event.key];
  if (note != undefined) {
    releaseNote(note);
  } else {
    console.log('\'' + event.key + '\' not mapped to a note.');
  }
});
