module.exports = _pusher => {
  const ping = async data => {
    _pusher.trigger('location', data?.room || 'ping', data);
  };

  const notify = async data => {
    _pusher.trigger('geofence', 'exit', data);
  };

  return {
    ping,
    notify
  };
};
