function Message(topic, data, done) {
  this.topic = topic;
  this.data = data;
  this._done = done;
}

Message.prototype.ack = function() {
  console.log('ACK!');
  this._done(true);
}

Message.prototype.nack = function() {
  console.log('NACK!')
  this._done(false);
}


module.exports = Message;
