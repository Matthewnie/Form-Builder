function editInPlace(e){
  if(!e.target.classList.contains('static'))
    return true;

  var container = this;

  container.classList.add('editing');

  return false;
}

function saveField(e){
  e.preventDefault();

  var parent = this.parentNode.parentNode.parentNode;

  var field = parent.getElementsByClassName('type')[0];
  var value = field.getElementsByClassName('edit')[0].getElementsByTagName('select')[0];
  value = value.options[value.selectedIndex];
  field.getElementsByClassName('static')[0].innerHTML = value.text;

  field = parent.getElementsByClassName('name')[0];
  value = field.getElementsByClassName('edit')[0].getElementsByTagName('input')[0].value;
  field.getElementsByClassName('static')[0].innerHTML = value;

  field = parent.getElementsByClassName('title')[0];
  value = field.getElementsByClassName('edit')[0].getElementsByTagName('input')[0].value;
  field.getElementsByClassName('static')[0].innerHTML = value;

  field = parent.getElementsByClassName('required')[0];
  value = field.getElementsByClassName('edit')[0].getElementsByTagName('input')[0].checked;
  field.getElementsByClassName('static')[0].innerHTML = value ? 'Yes' : 'No';



  parent.classList.remove('editing');

  return false;
}

function newField(e){
  e.preventDefault();

  var parent = this.parentNode.parentNode;

  var field = parent.getElementsByClassName('type')[0];
  var value = field.getElementsByClassName('edit')[0].getElementsByTagName('select')[0];
  value = value.options[value.selectedIndex];
  field.getElementsByClassName('static')[0].innerHTML = value.text;

  field = parent.getElementsByClassName('name')[0];
  value = field.getElementsByClassName('edit')[0].getElementsByTagName('input')[0].value;
  field.getElementsByClassName('static')[0].innerHTML = value;

  field = parent.getElementsByClassName('title')[0];
  value = field.getElementsByClassName('edit')[0].getElementsByTagName('input')[0].value;
  field.getElementsByClassName('static')[0].innerHTML = value;

  field = parent.getElementsByClassName('required')[0];
  value = field.getElementsByClassName('edit')[0].getElementsByTagName('input')[0].checked;
  field.getElementsByClassName('static')[0].innerHTML = value ? 'Yes' : 'No';



  parent.classList.remove('editing');

  return false;
}

var cols = document.querySelectorAll('li.entry');
[].forEach.call(cols, function(col) {
  // col.addEventListener('dragstart', handleDragStart, false);
  // col.addEventListener('dragenter', handleDragEnter, false);
  // col.addEventListener('dragover', handleDragOver, false);
  // col.addEventListener('dragleave', handleDragLeave, false);
  // col.addEventListener('drop', handleDrop, false);
  // col.addEventListener('dragend', handleDragEnd, false);
  col.addEventListener('click', editInPlace, true);
});

var savebuttons = document.querySelectorAll('.save');
[].forEach.call(savebuttons, function(btn) {
  btn.addEventListener('click', saveField, false);
});

var newbuttons = document.querySelectorAll('.save');
[].forEach.call(newbuttons, function(btn) {
  btn.addEventListener('click', newField, false);
});

// } else {
//   // Fallback to a library solution.
// }

var el = document.getElementById('formeditor');
new Sortable(el, {
  filter: '.edit',
  draggable: '.entry'
});
