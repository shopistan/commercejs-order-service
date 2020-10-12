module.exports = (connection, name, schema) => {
  return () => {
    let model;
    try {
      model = connection.model(name, schema);
      return model;
    } catch (err) {
      model = connection.model(name);
      return model;
    }
  };
};
