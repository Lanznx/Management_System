- [API](#api)
	- [Sign up](#sign-up)
		- [Parameters](#parameters)
		- [Responses](#responses)
	- [Login](#login)
		- [Parameters](#parameters-1)
		- [Responses](#responses-1)

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