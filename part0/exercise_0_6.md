# Exercise 0.6: New note in Single page app diagram

sequenceDiagram
    participant browser
    participant server

    Note over browser: User writes a note and clicks the Save button
    Note over browser: The JS code handles the submit event, adds the new note to the local array, and re-renders the UI immediately

    browser->>server: POST [https://studies.cs.helsinki.fi/exampleapp/new_note_spa](https://studies.cs.helsinki.fi/exampleapp/new_note_spa)
    activate server
    Note over server: Server receives the JSON data containing the note, validates it, and appends it to the array
    server-->>browser: HTTP status code 201 (Created) - JSON confirmation response
    deactivate server