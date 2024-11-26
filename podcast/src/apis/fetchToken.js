export const fetchToken = async () => {
  const fetchToken = await fetch("http://localhost:8081/api/token", {
    method: "GET",
    credentials: "include",
  });
  const token = await fetchToken.json();
  return token.token;
};
