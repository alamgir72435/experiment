const { Publisher }  = require('@binarybunon/common');

class TestEventPublisher extends Publisher {
  subject = 'test-event';
}

module.exports = { TestEventPublisher }