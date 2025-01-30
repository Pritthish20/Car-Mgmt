---
title: Car-Mgmt
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.23"

---

# Car-Mgmt

Base URLs:

# Authentication

# User

## POST Signup

POST /api/v1/user/signup

> Body Parameters

```json
{
  "name": "test1",
  "email": "test1@gmail.com",
  "password": "1234"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» name|body|string| yes |none|
|» email|body|string| yes |none|
|» password|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Login

POST /api/v1/user/login

> Body Parameters

```json
{
  "name": "test1",
  "email": "test1@gmail.com",
  "password": "1234"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» name|body|string| yes |none|
|» email|body|string| yes |none|
|» password|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Logout

POST /api/v1/user/logout

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Products

## POST Create

POST /api/v1/cars/create

> Body Parameters

```json
{
  "title": "Tesla Model S",
  "description": "A luxury electric sedan with top performance and cutting-edge technology.",
  "tags": {
    "car_type": "Sedan",
    "company": "Tesla",
    "dealer": "Tesla Authorized Dealer"
  },
  "images": [
    "https://res.cloudinary.com/demo/image/upload/v1700000000/car1.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1700000001/car2.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1700000002/car3.jpg"
  ]
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» title|body|string| yes |none|
|» description|body|string| yes |none|
|» tags|body|object| yes |none|
|»» car_type|body|string| yes |none|
|»» company|body|string| yes |none|
|»» dealer|body|string| yes |none|
|» images|body|[string]| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## PUT Update

PUT /api/v1/cars/update/6799cf4d41ac8b961c0c3479

> Body Parameters

```json
{
  "description": "A reliable and fuel-efficient sedan with modern design and safety features. An Upgraded one",
  "images": [
    "https://res.cloudinary.com/demo/image/upload/v1700002000/corolla1.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1700002000/corolla2.jpg"
  ]
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» description|body|string| yes |none|
|» images|body|[string]| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET All

GET /api/v1/cars/all

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Specific

GET /api/v1/cars/6799cf4d41ac8b961c0c3479

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## DELETE Delete

DELETE /api/v1/cars/delete/6799cf4d41ac8b961c0c3479

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Uploads

POST /api/v1/upload

> Body Parameters

```yaml
images: string

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» images|body|string(binary)| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|


