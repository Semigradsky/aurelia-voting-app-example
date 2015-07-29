import { ValidateCustomAttributeViewStrategy } from 'aurelia-validation';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-validation', config => config.useViewStrategy(ValidateCustomAttributeViewStrategy.TWBootstrapAppendToInput));

  aurelia.start().then(x => x.setRoot());
}
