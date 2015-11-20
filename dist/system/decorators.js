System.register(['aurelia-metadata'], function (_export) {
  'use strict';

  var metadata, ValidationMetadata, ValidationPropertyMetadata;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  _export('ensure', ensure);

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function ensure(setupStep) {
    return function (target, propertyName) {
      var validationMetadata = metadata.getOrCreateOwn(ValidationMetadata.metadataKey, ValidationMetadata, target);
      var property = validationMetadata.getOrCreateProperty(propertyName);
      property.addSetupStep(setupStep);
    };
  }

  return {
    setters: [function (_aureliaMetadata) {
      metadata = _aureliaMetadata.metadata;
    }],
    execute: function () {
      ValidationMetadata = (function () {
        _createClass(ValidationMetadata, null, [{
          key: 'metadataKey',
          value: 'aurelia:validation',
          enumerable: true
        }]);

        function ValidationMetadata() {
          _classCallCheck(this, ValidationMetadata);

          this.properties = [];
        }

        ValidationMetadata.prototype.getOrCreateProperty = function getOrCreateProperty(propertyName) {
          var property = this.properties.find(function (x) {
            return x.propertyName === propertyName;
          });
          if (property === undefined) {
            property = new ValidationPropertyMetadata(propertyName);
            this.properties.push(property);
          }
          return property;
        };

        ValidationMetadata.prototype.setup = function setup(validation) {
          this.properties.forEach(function (property) {
            property.setup(validation);
          });
        };

        return ValidationMetadata;
      })();

      _export('ValidationMetadata', ValidationMetadata);

      ValidationPropertyMetadata = (function () {
        function ValidationPropertyMetadata(propertyName) {
          _classCallCheck(this, ValidationPropertyMetadata);

          this.propertyName = propertyName;
          this.setupSteps = [];
        }

        ValidationPropertyMetadata.prototype.addSetupStep = function addSetupStep(setupStep) {
          this.setupSteps.push(setupStep);
        };

        ValidationPropertyMetadata.prototype.setup = function setup(validation) {
          validation.ensure(this.propertyName);
          this.setupSteps.forEach(function (setupStep) {
            setupStep(validation);
          });
        };

        return ValidationPropertyMetadata;
      })();
    }
  };
});