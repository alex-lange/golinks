## About
Super basic golinks implementation based on:
- https://iafisher.com/blog/2020/10/golinks
- https://github.com/nownabe/golink/

## Install Extension
Install the extension in the `chrome` dir via the "Load unpacked" option at chrome://extensions/ (with "Developer mode" enabled).

## Run Server Locally
Run with `pipenv`:
```
pipenv run python -m flask --app golinks run
```

## Configure
`links.json` should be of the form:
```
{
  <path>: { "url": <url> }
}
```

so for example, if you want a go/gh to redirect to https://github.com/, add this to the file:
```
{
  ...
  "gh": { "url": "https://github.com/" }
}
```
