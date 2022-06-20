- [API](#api)
	- [Sign up](#sign-up)
		- [Parameters](#parameters)
		- [Responses](#responses)
	- [Login](#login)
		- [Parameters](#parameters-1)
		- [Responses](#responses-1)
	- [Get User's Information](#get-users-information)
		- [Parameters](#parameters-2)
		- [Responses](#responses-2)

## API

### Sign up

| Method | Path           |
| ------ | -------------- |
| `POST` | `users/signup` |

#### Parameters

* `username` `(string: <required>)` - Name of user.
* `password` `(string: <required>)` - Encrypted password of user.
* `email` `(string: <optional>)` - Email of user.
* `phoneNumber` `(string: <optional>)` - Phone number of user.

#### Responses
* `success` `(bool)` - True/False. 
* `message` `(string: <success>)` - If success, return "註冊成功". 
* `err` `(string: <not success>)` - Error message. 

---

### Login

| Method | Path          |
| ------ | ------------- |
| `POST` | `users/login` |

#### Parameters

* `username` `(string: <required>)` - Name of the user.
* `password` `(string: <required>)` - Password of user.

#### Responses

* `success` `(bool)` - True/False.
* `userId` `(string: <success>)` - Id of the user.
* `err` `(string: <not success>)` - Error message.

---

### Get User's Information

| Method | Path                   |
| ------ | ---------------------- |
| `POST` | `users/getInformation` |

#### Parameters

* `userId` `(string: <required>)` - Id of the user. 

#### Responses

* `success` `(bool)` - True/False.
* `err` `(string: <not success>)` - Error message.
* `userInformation` `(json: <success>)` - The user information.
  * `username` `(string)` - Name of the user.
  * `email` `(string)` - Email of the user.
  * `phoneNumber` `(string)` - Phone number of the user.