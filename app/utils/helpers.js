exports.formatBody = (event) => {
  let source = event.Records ? 'sns' : 'http';
  let body = event.Records ? event.Records[0] : event.body;
  try {
    body = JSON.parse(body);
  } catch (err) {}
  return { source, body };
};
