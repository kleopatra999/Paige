var Page = require('../../lib/page'),
    Form = require('../../lib/components/form'),
    bescribe = require('../../bescribe'),
    expect = require('chai').expect,
    config;

config = {
  address: 'http://localhost:8282',
  webdriver: {
    address: 'http://localhost:4444/wd/hub',
    config: {
      platform: 'MAC',
      browserName: 'firefox'
    }
  }
};

bescribe('Form Component', config, function(context, describe, it) {
  describe('#fillInText', function() {
    it('enters data into the text field', function() {
      var page = Page.extend({
        pageRoot: '/form.html',
        forms: {
          textForm: {
            context: '#text-form',
            submit: '.submit',
            inputs: {
              term: '#term'
            }
          }
        }
      }).with(Form);

      context.Page.build()
      .redirectTo(page)
      .enterInformation('textForm', {
        term: 'Behance'
      })
      .find('#term')
      .getAttribute('value').then(function(value) {
        expect(value).to.equal('Behance');
      });
    });
  });

  describe('#fillInSelect', function() {
    it('selects the option with the specified value', function() {
      var page = Page.extend({
        pageRoot: '/form.html',
        forms: {
          selectForm: {
            context: '#select-form',
            submit: '.submit',
            inputs: {
              select: {
                selector: '#select',
                type: 'select'
              }
            }
          }
        }
      }).with(Form);

      context.Page.build()
      .redirectTo(page)
      .enterInformation('selectForm', {
        select: '2'
      })
      .find('#select')
      .getAttribute('value').then(function(value) {
        expect(value).to.equal('2');
      });
    });
  });

  describe('#fillInRadio', function() {
    it('clicks the radio with the specified value', function() {
      var page = Page.extend({
        pageRoot: '/form.html',
        forms: {
          radioForm: {
            context: '#radio-form',
            submit: '.submit',
            inputs: {
              rGroup: {
                selector: '[name=r-group]',
                type: 'radio'
              }
            }
          }
        }
      }).with(Form);

      context.Page.build()
      .redirectTo(page)
      .enterInformation('radioForm', {
        rGroup: 2
      })
      .runOnPage(function() {
        return document.querySelector('#radio-2').checked;
      }).then(function(checked) {
        expect(checked).to.be['true'];
      });
    });
  });

  describe('#fillInCheckbox', function() {
    return it('clicks the checkbox with the specified value', function() {
      var page = Page.extend({
        pageRoot: '/form.html',
        forms: {
          checkboxForm: {
            context: '#checkbox-form',
            submit: '.submit',
            inputs: {
              checkbox3: {
                selector: '#checkbox-3',
                type: 'checkbox'
              }
            }
          }
        }
      }).with(Form);

      context.Page.build()
      .redirectTo(page)
      .enterInformation('checkboxForm', {
        checkbox3: 3
      })
      .runOnPage(function() {
        return document.querySelector('#checkbox-3').checked;
      })
      .then(function(checked) {
        expect(checked).to.be['true'];
      });
    });
  });

  describe('#submitForm', function() {
    it('submits the form using the registerd submit button', function() {
      var page = Page.extend({
        pageRoot: '/form.html',
        forms: {
          textForm: {
            context: '#text-form',
            submit: '.submit',
            inputs: {
              term: '#term'
            }
          }
        }
      }).with(Form);

      context.Page.build()
      .redirectTo(page)
      .enterInformation('textForm', {
        term: 'Behance'
      })
      .submitForm('textForm')
      .whenDisplayed('.success');
    });
  });
});
