const SELECTORS = {
  form: '.form',
  feedbackArea: '.form__feedback'
};
class OfflineForm {
  constructor(element) {
    this.form = element;
    this.id = element.id;
    this.formData = [];
    this.action = element.action;
    this.data = {};
    this.dataArray = [];
    this.feedbackArea = this.form.querySelector(SELECTORS.feedbackArea);
    this.form.addEventListener('submit', e => this.handleSubmit(e));
    window.addEventListener('online', () => this.checkStorage());
    window.addEventListener('load', () => this.checkStorage());
  }
  handleSubmit(e) {
    // check network status on form submit

    e.preventDefault();
    this.getFormData();
    if (!navigator.onLine) {
      // user is offline, store data locally
      const stored = this.storeData();
      let message = '<strong>Vous êtes actuellement hors ligne.</strong>';
      if (stored) {
        message += 'Vos données seront stockés en local et envoyer dès que vous serez de retour en ligne.';
        this.form.reset();
      }
      this.resetFeedback();
      this.feedbackArea.innerHTML = message;
    } else {
      // user is online, send data to server
      this.sendData();
    }
  }
  storeData() {
    // save data in localStorage

    if (typeof Storage !== 'undefined') {
      const entry = {
        data: this.data
      };
      localStorage.setItem(this.id, JSON.stringify(entry));
      return true;
    }
    return false;
  }
  sendData() {
    // send ajax call to server

    axios.post('response_insert.php', this.data).then(response => {
      console.log(this.data);
      this.handleResponse(response);
    }).catch(error => {
      console.warn(error.response.data);
    });

    //console.log(this.data);

    // $.ajax({
    //         type: "POST",
    //         dataType: "json",
    //         url: "response_insert.php",
    //         data: {results: this.data},
    //         contentType: "application/json; charset=utf-8",
    //         success: function(data){
    //           localStorage.removeItem(this.id);
    //           this.form.reset();
    //           this.feedbackArea.classList.add(`success`);
    //           this.feedbackArea.textContent = '👍 Successfully sent. Thank you!';
    //         },
    //         error: function(e){
    //             console.log(this.data);
    //         }
    // });

  }
  handleResponse(response) {
    // handle server response

    this.resetFeedback();
    if (response.status === 200) {
      console.log('success');
      // on success
      localStorage.removeItem(this.id);
      this.form.reset();
      this.feedbackArea.classList.add(`success`);
      this.feedbackArea.textContent = '👍 Le formulaire a été envoyé avec succès. Merci!';
    } else {
      // failure
      this.feedbackArea.textContent = '👎 Ce formulaire contien des erreurs, merci de valider !';
    }
  }
  checkStorage() {
    // check if we have saved data in localStorage

    if (typeof Storage !== 'undefined') {
      const item = localStorage.getItem(this.id);
      const entry = item && JSON.parse(item);
      if (entry) {
        // discard submissions older than one day
        //const now = new Date().getTime();
        //const day = 24 * 60 * 60 * 1000;
        //if (now - day > entry.time) {
          //localStorage.removeItem(this.id);
          //return;
        //}

        // we have saved form data, try to submit it 
        //this.data = entry.data;
        this.sendData();
      }
    }
  }
  getFormData() {
    // simple parser, get form data as object

    let field;
    let i;
    const dataLine = {};
    if (typeof this.form === 'object' && this.form.nodeName === 'FORM') {
      const len = this.form.elements.length;
      for (i = 0; i < len; i += 1) {
        field = this.form.elements[i];
        if (field.name && !field.disabled && field.type !== 'file' && field.type !== 'reset' && field.type !== 'submit') {
          dataLine[field.name] = field.value || '';
        }
      }
    }
    this.formData.push(dataLine);
    this.data = this.formData;

    console.log(this.data);
  }
  resetFeedback() {
    this.feedbackArea.classList.remove(`success`);
    this.feedbackArea.innerHTML = '';
  }
}

// init
Array.from(document.querySelectorAll(SELECTORS.form)).forEach(form => {
  new OfflineForm(form);
});