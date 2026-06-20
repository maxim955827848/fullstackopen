# Exercise 0.4: New note diagram

Below is the sequence diagram depicting the process of creating a new note on the notes page.

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: User writes a note and clicks the Submit button

    browser->>server: POST [https://studies.cs.helsinki.fi/exampleapp/new_note](https://studies.cs.helsinki.fi/exampleapp/new_note)
    activate server
    Note over server: Server extracts the text, creates a new note object, and pushes it to the array
    server-->>browser: HTTP status code 302 (Found) - Redirect to /exampleapp/notes
    deactivate server

    browser->>server: GET [https://studies.cs.helsinki.fi/exampleapp/notes](https://studies.cs.helsinki.fi/exampleapp/notes)
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET [https://studies.cs.helsinki.fi/exampleapp/main.css](https://studies.cs.helsinki.fi/exampleapp/main.css)
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET [https://studies.cs.helsinki.fi/exampleapp/main.js](https://studies.cs.helsinki.fi/exampleapp/main.js)
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note over browser: The browser starts executing the JavaScript code that fetches the JSON data from the server

    browser->>server: GET [https://studies.cs.helsinki.fi/exampleapp/data.json](https://studies.cs.helsinki.fi/exampleapp/data.json)
    activate server
    server-->>browser: updated data.json array with the new note included
    deactivate server

    Note over browser: The browser executes the callback function and renders all notes using DOM manipulation