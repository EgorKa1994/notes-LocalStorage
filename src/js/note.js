export default class Note {
  constructor() {
    this.data = [];
    this.form = document.querySelector('form');
    this.inputTitle = document.querySelector('#title');
    this.inputContain = document.querySelector('#contain');
    this.noteList = document.querySelector('#noteList');
    this.toDoList = document.querySelector('#toDoList');
    this.noteDescription = document.querySelector('#noteDescription');
    this.oneNoteContent = document.querySelector('#oneNoteContent');
    this.idCounter = 0;
    this.noteId;
    this.noteEditor = document.querySelector('.contentEditor');
    this.removeButton = document.querySelector('#removeBtn');
    this.editButtom = document.querySelector('#editBtn');

    this._init();
  }

  _init() {
    this.form.addEventListener('submit', this._handleSubmit.bind(this));

    this.noteList.addEventListener('click', this._handleChoosenNote.bind(this));

    this.removeButton.addEventListener(
      'click',
      this._handleRemovingOfNote.bind(this)
    );
  }

  _handleRemovingOfNote() {
    this.oneNoteContent.innerHTML = '';
    this.data.forEach((item, index) => {
      if (this.noteId == item.id) {
        this.data.splice(index, 1);
        console.log(this.data);
      }
    });
    this._checkEmptinessOfNoteDescription();
    this._createNoteList(this.data);
  }

  _resetForm(form) {
    form.reset();

    // Найдём все скрытые поля в форме и сбросим их значение
    [...form.querySelectorAll('[type="hidden"]')].forEach((input) => {
      input.value = '';
    });
  }

  _handleSubmit(e) {
    e.preventDefault();
    let timeData = this._getDate();
    this.data.push({
      title: this.inputTitle.value,
      content: this.inputContain.value,
      time: timeData,
      id: this.idCounter,
    });
    ++this.idCounter;

    this._createNoteList(this.data);

    this._checkEmptinessOfNoteDescription();

    this._resetForm(this.form);
    $('#formModal').modal('hide');
    $('#exampleModal').modal('hide');
  }

  _checkEmptinessOfNoteDescription() {
    if (!this.oneNoteContent.innerHTML) {
      this.noteEditor.classList.add('invisible');
    } else {
      this.noteEditor.classList.remove('invisible');
    }
  }

  _handleChoosenNote(e) {
    this.oneNoteContent.innerHTML = '';
    let arrOfNotes = this.noteList.querySelectorAll('li');
    arrOfNotes.forEach((item) => {
      item.classList.remove('active');
    });
    if (!e.target.hasAttribute('id')) {
      this.noteId = e.target.parentNode.getAttribute('id');
    } else {
      this.noteId = e.target.getAttribute('id');
    }
    console.log(this.noteId);
    let choosenLi = document.getElementById(this.noteId);
    choosenLi.classList.add('active');
    let contentOfChoosenNote = [];
    this.data.forEach((item, index) => {
      if (this.noteId == item.id) {
        contentOfChoosenNote.push(this.data[index].content);
        contentOfChoosenNote.push(this.data[index].time);
      }
    });

    this._createOneNoteContent(this.oneNoteContent, contentOfChoosenNote);

    this._checkEmptinessOfNoteDescription();
  }

  _createOneNoteContent(elem, noteData) {
    let divForTime = document.createElement('div');
    let pForContent = document.createElement('p');

    pForContent.textContent = noteData[0];
    divForTime.textContent = noteData[1];

    elem.append(divForTime);
    elem.append(pForContent);
  }

  _createNoteList(curData) {
    this.oneNoteContent.innerHTML = '';
    this.noteList.innerHTML = '';
    curData.forEach((item) => {
      this.noteList.append(this._createOneNote(item));
    });

    let height = this.toDoList.offsetHeight;
    this.noteDescription.style.height = height;
  }

  _createOneNote(note) {
    let newLi = document.createElement('li');
    let newH3 = document.createElement('h3');
    let timeDiv = document.createElement('div');
    newH3.textContent = note.title;
    timeDiv.textContent = note.time;
    newLi.append(newH3);
    newLi.append(timeDiv);
    newLi.setAttribute('id', note.id);

    // newLi.addEventListener('click', this._handleChoosenNote.bind(this));

    return newLi;
  }

  _parseNumber(num) {
    let parsedNum = num;

    if (parsedNum < 10) {
      return '0' + parsedNum;
    } else {
      return parsedNum;
    }
  }

  _getDate() {
    let now = new Date();

    let month = this._parseNumber(now.getMonth());
    let year = now.getFullYear();
    let day = this._parseNumber(now.getDate());

    let hours = this._parseNumber(now.getHours());
    let minutes = this._parseNumber(now.getMinutes());

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
}
