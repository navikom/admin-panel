export async function request(method, url, body, allHeaders = {}, debug = true) {
  let headers = Object.assign({}, allHeaders, {
    "Accept": "application/json",
    "Content-Type": "application/json"
  });

  const object = {method, headers};
  body && (object.body = JSON.stringify(body));
  if (debug) {
    console.log("REQUEST", url, method, body, headers);
  }
  const response = await fetch(url, object);
  if (debug) {
    console.log("RESPONSE", url, response);
  }
  if (!response.ok) {
    throw new Error("HTTP Error");
  }
  const json = await response.json();
  if (debug) {
    console.log("RESPONSE BODY", url, json);
  }
  return json;
}
