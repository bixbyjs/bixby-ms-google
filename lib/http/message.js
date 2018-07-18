function Message(topic, data, onack) {
  this.topic = topic;
  this.data = data;
  this._onack = onack;
}

Message.prototype.ack = function() {
  this._onack(true);
}

Message.prototype.nack = function() {
  this._onack(false);
}


module.exports = Message;
