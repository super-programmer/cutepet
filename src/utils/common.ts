function tokenIsAvaliable(token:string) {
  const { timestamp, expires_in: expiresIn } = JSON.parse(token);
  const distance = (new Date().getTime() - timestamp) / 1000;
  console.log(distance,expiresIn,timestamp,new Date().getTime() - timestamp)
  return distance < expiresIn;
}

export default {
  tokenIsAvaliable
}
