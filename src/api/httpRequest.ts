import { Headers, Body } from "interfaces/Request";
import { ErrorHandler } from "utils/ErrorHandler";
import { instanceOf } from "prop-types";

export async function request(method: string, url: string, allHeaders: Headers = {}, body?: Body, excludeHeaders?: string[], debug = true) {
  let headers = Object.assign({
    "Accept": "application/json",
    "Content-Type": "application/json",
  }, allHeaders);
  if(excludeHeaders) {
    excludeHeaders.forEach((key) => {
      headers[key] && delete headers[key];
    })
  }
  const object: RequestInit = { method, headers };
  body && (object.body = body instanceof FormData ? body : JSON.stringify(body));
  if (debug) {
    console.log("REQUEST", url, method, body, headers);
  }
  const response = await fetch(url, object);
  if (debug) {
    console.log("RESPONSE", url, response);
  }

  // if(!response.ok) {
  //   throw new ErrorHandler(response.statusText);
  // }
  try {
    const json = await response.json();

    if (debug) {
      console.log("RESPONSE BODY", url, json);
    }
    if (!response.ok) {
      throw new ErrorHandler(json.error ? json.error : "HTTP Error");
    }
    return json.data;
  } catch (err) {
    console.log('Fetch Error: ', err.message);
    throw new ErrorHandler(err.message);
  }

}
