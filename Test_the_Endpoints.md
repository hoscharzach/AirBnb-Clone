Navigate to: [ http://localhost:8000/api/csrf/restore ]

# signup
```js
fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({
    email: 'name@email.com',
    username: 'NewName',
    password: 'NewPassword'
  })
}).then(res => res.json()).then(data => console.log(data));
```

# login
```js
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({ credential: 'name@email.com', password: 'NewPassword' })
}).then(res => res.json()).then(data => console.log(data));
```

# logout
```js
fetch('/api/session', {
  method: 'DELETE',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  }
}).then(res => res.json()).then(data => console.log(data));
```
