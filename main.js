if (Modernizr.draganddrop) {
  var dragSrcEl = null;
  function handleDragStart(e) {
    this.style.opacity = '0.4';  // this / e.target is the source node.

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;
  }

  function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
  }


  function handleDrop(e) {
    // this / e.target is current target element.

    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
     // Set the source column's HTML to the HTML of the column we dropped on.
     dragSrcEl.innerHTML = this.innerHTML;
     this.innerHTML = e.dataTransfer.getData('text/html');
     dragSrcEl.style.opacity = '1';
    }

    return false;
  }

  function handleDragEnd(e) {
    // this/e.target is the source node.

    [].forEach.call(cols, function (col) {
      col.classList.remove('over');
    });
  }

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

  var cols = document.querySelectorAll('li.entry');
  [].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false);
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
    col.addEventListener('click', editInPlace, true);
  });

  var savebuttons = document.querySelectorAll('.save');
  [].forEach.call(savebuttons, function(btn) {
    btn.addEventListener('click', saveField, false);
  });

  

} else {
  // Fallback to a library solution.
}