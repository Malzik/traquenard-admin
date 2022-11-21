class ClientError extends Error {
  constructor(data, status) {
    super(data);
    this.status = status;
    this.data = data;
  }
}

module.exports = ClientError;
