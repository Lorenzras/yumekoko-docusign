# Docusign connect

## Setup with ngrok

1. Run command in terminal.

    ```js
    ngrok http 3000
    ```

2. Run server.

    ```js
    npm run dev
    ```

3. Copy https link from ngrok terminal, then apply it to .env file for clients depending on this server.

4. Modify docusign connect settings to reflect the ngrok's https link.

P.S. For production, adjust the webhook endpoint to the domain of the server.
