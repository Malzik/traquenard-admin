class ClientError extends Error {
  constructor(props, status) {
    super(props);
    this.status = status;
  }
}

module.exports = ClientError;
