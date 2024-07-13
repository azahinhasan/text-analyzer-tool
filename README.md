# Technology Used

- Node js
- Express js
- MongoDB
- Jest
- JWT
- Redis and more.

# Instruction to run and use this app

## Prerequisites

- Node version 18.19.0 or above.
- Install nodemon in global `npm install -g nodemon`
- Postman (suggested)

## How to run
- Clone this repo
- Go to `server` folder.
- Run this command for test case `npm run test`. 
- Run this command for running the app `npm run dev`.
- (Optional) You can modify config data from `.env` file or `./config/config.js` file.

#### By default app will run on `http://localhost:5003`.

## API instruction  

- `POST - /auth/sign-up`: Create a new user. Example:
   ```
  {
    "email":"test3@test.com",
    "password":"123456",
    "full_name":"test"
  }
  ```
- `GET - /auth/sign-in`: Sign in with new user.
  ```
  {
    "email":"test3@test.com",
    "password":"123456"
  }
  ```

  `p.s. blow APIs required authorization verification`

- `GET - /api/text`: Will return all created text and id.
- `POST - /api/text`: User can save new text. Ex:
    ```
    {
      "value":"Dummy text"
    }
  ```
- `PUT - /api/text/:text_id`: User can update text with this api [Note: User can only update his cerated text].
  ```
    {
      "value":"Dummy"
    }
  ```
- `DELETE - /api/text/:text_id`: User can delete text with this api [Note: User can only delete his cerated text].
- `GET - /api/text/:text_id`: User can get text by id [Note: If the text created by user response will return words,characters,sentences etc also other wise only text].
- `GET - /api/text/my`: Will return own text list with total words,characters,sentences etc.
- `GET - /api/text/paragraph-info/total-words?paragraph={text}`: Will return total words of given paragraph. <br/>API example: `/api/text/paragraph-info/total-words?paragraph=The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.`
- `GET - /api/text/paragraph-info/total-characters?paragraph={text}`: Will return total characters of given paragraph.
- `GET - /api/text/paragraph-info/total-sentences?paragraph={text}`: Will return total sentences of given paragraph.
- `GET - /api/text/paragraph-info/total-paragraphs?paragraph={text}`: Will return total paragraphs of given paragraph.
- `GET - /api/text/paragraph-info/longest-words?paragraph={text}`: Will return list of longest words of given paragraph.
  `p.s. above paragraph-info apis do not save any data into db`


## Impotent Note:
- To access text apis user need to get authorization verification first. For that user have to hit /auth/sign-in api with valid info. 
- After success full as response user will get a token. If user using any API development tool like Postman. Then they donn't have to do any other things they can hit text apis like api/text-GET. It will return data. Because after successful login  `token` storing into the session of app.
- For other tools or way user may be have to send `token` with `Authorization header`.Otherwise they will not able to access text apis.


# Some other info about the app
- This app caching data into `Redis` server.Caching active for text create,delete,update and get by id APIs.
- Throttling for text APIs is active. Set to 20 call from single IP in 10 mins. Changeable form `server/config/config.js` file.
- User can see his analysis report by calling GET-`/api/text/my` api.
- Basic authorization system added. By using of this system giving user permission.
- To run  `test` cases `npm run test` make sure port `5003` is not occupied by other process.changeable form `.env` file.
- Same goes to `npm run dev`. 
- Using morgan and winston for logs tracking.
