# BE 
### API URL : https://anywherefitness-lambda.herokuapp.com
### API Endpoints

| Method | URL                           | Description                                                                                                                                           |
| ------ | ----------------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------                                                                                      
| POST   | /register        | Register clients/instructors sent in the `request body`  Return created users. |

| POST   | /login        | Login clients/instructors sent in the `request body` |

| GET  | /users/classes       | Get all available classes as long as user is login|

| POST  | /users/classes       | Instructors can add classes  |

| PUT  | /users/classes       | Instructors can update classes|

| DELETE  | /users/classes       | Instructors delete classes|