function Message(topic, data, done) {
  this.topic = topic;
  this.data = data;
  this._done = done;
}

Message.prototype.ack = function() {
  this._done(true);
}

Message.prototype.nack = function() {
  this._done(false);
}


module.exports = Message;
