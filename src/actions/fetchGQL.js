export default async (query, variables) => {
  return await (await fetch(
    "https://xxxxxxxxxxxxxxxx.appsync-api.us-west-2.amazonaws.com/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "xyz"
      },
      body: JSON.stringify({ query, variables })
    }
  )).json();
};
