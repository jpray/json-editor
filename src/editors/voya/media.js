//checkbox

JSONEditor.defaults.editors.media = JSONEditor.AbstractEditor.extend({
  setValue: function(value,initial) {
    this.value = value;
    this.input.value = this.value;
    this.onChange();
  },
  register: function() {
    this._super();
    if(!this.input) return;
    this.input.setAttribute('name',this.formname);
  },
  unregister: function() {
    this._super();
    if(!this.input) return;
    this.input.removeAttribute('name');
  },
  getNumColumns: function() {
    return Math.min(12,Math.max(this.getTitle().length/7,2));
  },
  build: function() {
    var self = this;
    if(!this.options.compact) {
      this.label = this.header = this.theme.getCheckboxLabel(this.getTitle());
    }
    if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);
    if(this.options.compact) this.container.className += ' compact';
    debugger;


    //this.input = this.theme.getCheckbox();
    this.input_type = 'text';
    this.input = this.theme.getFormInputField(this.input_type);


    this.control = this.theme.getFormControl(this.label, this.input, this.description);

    if(this.schema.readOnly || this.schema.readonly) {
      this.always_disabled = true;
      this.input.disabled = true;
    }

    this.input.addEventListener('change',function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.value = this.value;
      self.onChange(self.value);
    });

    this.container.appendChild(this.control);
    this.container.appendChild(this.linkToMediaLibrary())
  },

  linkToMediaLibrary: function() {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = '' +
    '<a target="_blank" href="/admin/content/media">Media Library</a>' + 
    '<div class="json-editor__media-help">' + 
    'For now, go to the Media Library, click the the image you want, get the node ID from the url and enter it here.  Improvements to this interface are in the works. : )' + 
    '</div>';
    return wrapper;
  },

  enable: function() {
    if(!this.always_disabled) {
      this.input.disabled = false;
    }
    this._super();
  },
  disable: function() {
    this.input.disabled = true;
    this._super();
  },
  destroy: function() {
    if(this.label && this.label.parentNode) this.label.parentNode.removeChild(this.label);
    if(this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description);
    if(this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input);
    this._super();
  }
});
