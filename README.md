# rutgerpronk.com API
This is the API for my personal website. It is a RESTful API built with NestJS and NodeMailer for sending emails.

## Installation
```bash
$ npm install
```

## Running

Copy the `.env.example` file to `.env` and fill in the required values.

```bash
# development
$ npm run dev

# production
$ npm run build
$ npm run prod
```

## Usage
The API is hosted on port 3000 and can be used by sending a POST request to the `/email` endpoint with the following body:
```json
{
  "senderName": "Example Name",
  "senderEmail": "example.email.com",
  "message": "Hello World!"
}
```
