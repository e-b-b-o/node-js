import url from "url";

const urlString = "https://www.google.com/search?q=hello+world";

// url Object

const urlObj = new URL(urlString);

//url format

console.log(url.format(urlObj));

//import.meta.url fileURl

console.log(import.meta.url);

//  fileUrl to path

console.log(url.fileURLToPath(import.meta.url));

// URLSearchParams

const params = new URLSearchParams(urlObj.search);

params.append("limit", "5");
params.delete("limit");
console.log(params);

console.log(params.get("q"));
