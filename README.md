# Node.js Crash Course

## Project Overview

This repository represents my learning journey through a foundational Node.js crash course. It contains a collection of practical code examples demonstrating the core built-in modules that come with Node.js. By exploring these files, I have learned how to interact with the file system, handle asynchronous events, build HTTP servers from scratch, and understand the core environment Node.js operates in. 

This project does not rely on heavy external frameworks like Express.js, but rather focuses entirely on the native APIs provided by Node.js to build a strong foundation in backend development.

## Topics Covered

* **Crypto (`cryptoDemo.js`)**: Hashing passwords and encrypting/decrypting sensitive data.
* **Events (`eventsDemo.js`)**: Custom event-driven architecture using `EventEmitter`.
* **File System (`fsDemo.js`)**: Reading, writing, and appending to files asynchronously using Promises.
* **Operating System (`osDemo.js`)**: Interacting with the underlying host OS to retrieve system information.
* **Path (`pathDemo.js`)**: Constructing and parsing file and directory paths across different operating systems.
* **Process (`processDemo.js`)**: Accessing information about the currently running Node.js process and environment variables.
* **HTTP & Web Servers (`server.js`, `server2.js`)**: Building custom web servers, handling routing, serving HTML files, and creating a JSON REST API.
* **URL (`urlDemo.js`)**: Parsing URL strings and working with query parameters.

---

## Detailed Topic Explanations

### 1. Crypto (`cryptoDemo.js`)
* **Concept:** The `crypto` module provides cryptographic functionality. It includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.
* **Why it matters:** Security is paramount in backend development. You need to hash user passwords before storing them in a database and encrypt sensitive data transmitted over the network.
* **APIs Used:**
  * `crypto.createHash()`: Creates a hash object (e.g., SHA-256) used to generate cryptographic hashes.
  * `crypto.randomBytes()`: Generates cryptographically strong pseudo-random data.
  * `crypto.createCipheriv()` & `crypto.createDecipheriv()`: Creates objects to encrypt and decrypt data using algorithms like AES-256.
* **Project Example:** The code demonstrates symmetric encryption where a secret message is encrypted using AES-256-CBC, converting it into an unreadable hex string, and then decrypted back into UTF-8 text using the same generated key and initialization vector (IV).
* **Real-world Use Cases:** Storing passwords safely, creating secure authentication tokens (like JWTs), and encrypting database fields containing private user information.

### 2. Events (`eventsDemo.js`)
* **Concept:** Node.js is fundamentally built around an asynchronous, event-driven architecture. Certain objects (called "emitters") periodically emit named events that cause function objects ("listeners") to be called.
* **Why it matters:** It allows you to write non-blocking, decoupled code. Instead of functions waiting for something to finish, they can trigger an event when done, and other parts of the application can listen and react accordingly.
* **APIs Used:**
  * `EventEmitter`: The core class providing the `on()` method to register a listener and the `emit()` method to trigger an event.
* **Project Example:** We create an instance of `EventEmitter` and register "greet" and "goodbye" listeners. When we emit these events, the corresponding handler functions are executed. It also demonstrates how to listen for standard `error` events to prevent the application from crashing.
* **Real-world Use Cases:** Handling streams of data (like reading a large file or network requests), building real-time chat applications, and implementing custom publish-subscribe patterns.

### 3. File System (`fsDemo.js`)
* **Concept:** The `fs` (File System) module enables interacting with the file system in a way modeled on standard POSIX functions.
* **Why it matters:** Backend servers constantly need to interact with files—whether it's writing logs, uploading images, reading configuration files, or saving user-generated content.
* **APIs Used:**
  * `fs/promises`: The modern, Promise-based version of the file system module.
  * `fs.readFile()`: Reads the entire contents of a file.
  * `fs.writeFile()`: Writes data to a file, replacing the file if it already exists.
  * `fs.appendFile()`: Asynchronously appends data to a file, creating the file if it does not yet exist.
* **Project Example:** The code showcases modern `async/await` syntax to cleanly read from, write to, and append lines to a `test.txt` file without blocking the main thread.
* **Real-world Use Cases:** Generating PDF reports, processing CSV uploads, writing server access logs, and reading local JSON configuration files.

### 4. Operating System (`osDemo.js`)
* **Concept:** The `os` module provides operating system-related utility methods and properties.
* **Why it matters:** Sometimes a Node application needs to know the environment it is running in—such as checking available memory before starting a heavy computation or getting user paths to save local app data.
* **APIs Used:**
  * `os.userInfo()`: Returns information about the currently effective user.
  * `os.totalmem()` & `os.freemem()`: Returns total and free system memory in bytes.
* **Project Example:** The script logs the current user's profile and system memory details to the console.
* **Real-world Use Cases:** Writing cross-platform CLI tools, building system monitoring dashboards, and managing server resource allocation.

### 5. Path (`pathDemo.js`)
* **Concept:** The `path` module provides utilities for working with file and directory paths.
* **Why it matters:** Different operating systems use different path separators (e.g., `\` on Windows, `/` on Linux/macOS). The `path` module ensures your code dynamically constructs the correct paths, preventing cross-platform bugs.
* **APIs Used:**
  * `path.basename()`, `dirname()`, `extname()`: Extracts the file name, directory, and extension from a path string.
  * `path.join()`: Joins all given path segments together using the platform-specific separator.
  * `path.resolve()`: Resolves a sequence of paths or path segments into an absolute path.
* **Project Example:** The code extracts parts of a file path and demonstrates how to construct safe absolute paths using `__dirname` and `__filename` (adapted for ES Modules using `url.fileURLToPath`).
* **Real-world Use Cases:** Serving static assets from a specific directory, securely resolving user uploads folder paths, and navigating project structures dynamically.

### 6. Process (`processDemo.js`)
* **Concept:** The `process` object is a global that provides information about, and control over, the current Node.js process.
* **Why it matters:** It is the primary way to interact with the environment running your application.
* **APIs Used:**
  * `process.argv`: An array containing the command-line arguments passed when the Node.js process was launched.
  * `process.env`: An object containing the user environment variables.
  * `process.pid`: The process ID.
  * `process.cwd()`: Returns the current working directory of the Node.js process.
  * `process.exit()`: Instructs Node.js to terminate the process synchronously.
* **Project Example:** The script logs process metadata and demonstrates intercepting the `exit` event to run cleanup code right before the application stops.
* **Real-world Use Cases:** Accessing secrets (API keys, database URLs) via environment variables (`process.env.DB_PASS`), parsing command-line flags in CLI tools, and gracefully shutting down database connections on exit.

### 7. HTTP Servers (`server.js`, `server2.js`)
* **Concept:** The `http` module allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP), allowing you to create full-fledged web and API servers.
* **Why it matters:** This is the foundation of backend web development. Understanding how to handle incoming requests, read headers, and send back responses is crucial before adopting frameworks like Express.
* **APIs Used:**
  * `http.createServer()`: Creates a new HTTP server instance.
  * `req.url` & `req.method`: Used to determine what the client is asking for (Routing).
  * `res.writeHead()`, `res.setHeader()`, `res.end()`: Methods to construct and send the HTTP response back to the client.
* **Project Example:**
  * `server.js`: Demonstrates serving static HTML files based on basic GET routes (`/` and `/about`).
  * `server2.js`: Demonstrates building a REST API. It manually implements a custom `logger` and `jsonMiddleware`. It handles GET requests to fetch users and POST requests, demonstrating how to parse incoming data chunks into JSON.
* **Real-world Use Cases:** Building RESTful APIs, handling webhooks from third-party services, and serving web applications.

### 8. URL (`urlDemo.js`)
* **Concept:** The `url` module provides utilities for URL resolution and parsing.
* **Why it matters:** Backend applications constantly need to interpret URLs to understand client requests, especially query parameters (e.g., `?limit=10&sort=desc`).
* **APIs Used:**
  * `new URL()`: Creates a new URL object.
  * `URLSearchParams`: An API to read and mutate the query string of a URL.
* **Project Example:** The script breaks down a complex URL and uses `URLSearchParams` to programmatically add (`append()`), remove (`delete()`), and retrieve (`get()`) query parameters.
* **Real-world Use Cases:** Parsing pagination parameters from API requests, building callback URLs for OAuth flows, and validating external links.

---

## Code Review Findings

As part of writing this documentation, a thorough code review was performed on the repository. The following issues were identified and refactored to align with modern Node.js best practices, ensuring the code is fully functional while preserving the original learning objectives.

### Bugs Discovered & Fixed
* **`processDemo.js`**: `process.cwd` is a method, not a property. Logging `process.cwd` resulted in logging the function reference itself (`[Function: cwd]`) rather than the actual working directory string.
  * **Fix:** Updated the code to properly invoke the function: `console.log(process.cwd());`.
* **Typos**:
  * **`eventsDemo.js`**: Changed the console log from "An error accured" to "An error occurred".
  * **`server.js`**: Fixed the server startup log from "Server runninng" to "Server running".

### Refactoring & Improvements
* **Dead Code Removal (`utils.js`)**: Identified an entirely empty, unused `utils.js` file and safely removed it to clean up the project structure.
* **Unused Imports Cleaned Up**: Modern JavaScript linters and best practices mandate removing unused modules to reduce clutter. The following imports were removed:
  * **`cryptoDemo.js`**: Removed `{ randomBytes }` from the import statement as `randomBytes` was being called via the `crypto` object (`crypto.randomBytes`) rather than directly.
  * **`server.js`**: Removed the `log` import from the `console` module, as standard `console.log` is globally available and sufficient. Removed the `{ createServer }` named import because `http.createServer` was being utilized instead.
  * **`urlDemo.js`**: Removed `{ fileURLToPath }` named import as the method was being accessed via `url.fileURLToPath()`.

### Corrected Code Examples
Here is an example of the corrected implementation in `processDemo.js`:

```javascript
// Before
console.log(process.cwd);

// After
console.log(process.cwd());
```

And the cleaned up imports in `server.js`:
```javascript
// Before
import { log } from "console";
import http, { createServer } from "http";
import fs from "fs/promises";

// After
import http from "http";
import fs from "fs/promises";
```

---

## Key Backend Concepts Learned

Through building these examples, several universal backend concepts were demonstrated:

1. **Non-blocking I/O**: Node.js is single-threaded. By using asynchronous methods (like `fs/promises`) and event listeners, the server can handle thousands of concurrent requests without freezing up while waiting for a file to read or a database to query.
2. **Event-Driven Architecture**: The flow of the application is determined by events (like a new HTTP request coming in or an error being thrown).
3. **Routing**: Taking an incoming URL (e.g., `/api/users`) and an HTTP Method (e.g., `GET` vs `POST`) and determining which specific block of code (handler) should process it.
4. **Middleware**: Functions that run in the middle of a request/response cycle. As seen in `server2.js`, we built simple middleware to log requests and automatically attach JSON headers before the final route handler takes over.
5. **Streams and Buffers**: Handling POST data in chunks rather than trying to load a massive payload into memory all at once.

## Project Takeaways

The most important takeaway from this course is that while modern frameworks magically handle a lot of heavy lifting, they are all built on top of these fundamental Node.js modules. Understanding the native `http` module clarifies exactly what Express is doing under the hood. Understanding `fs` and `path` is critical for secure file uploads, and knowing how `process.env` works is non-negotiable for deploying secure, configuration-driven applications.

## Conclusion

Node.js contains many additional built-in modules and advanced topics (like Streams, Worker Threads, and the Cluster module) that were not covered in this repository. 

However, the topics covered here represent some of the most important Node.js fundamentals and provide a strong foundation for backend development. The next natural step in this learning journey is moving into **Express.js**, where these core Node.js fundamentals will be used behind the scenes to build more structured, scalable, and production-ready applications with significantly less boilerplate code.
