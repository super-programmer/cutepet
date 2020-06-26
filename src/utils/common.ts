function tokenIsAvaliable(token:string) {
  const { timestamp, expires_in: expiresIn } = JSON.parse(token);
  const distance = (new Date().getTime() - timestamp) / 1000;

  return distance < expiresIn;
}

export default {
  tokenIsAvaliable
}
