# ListenApiDemo

![Apache 2](https://img.shields.io/hexpm/l/plug.svg) 
![Build Status](https://travis-ci.com/ListenNotes/ListenApiDemo.svg?branch=master)

A simplified podcast search engine web app, using Django, React, and [Listen API](https://www.listennotes.com/api/).

Note: You can easily implement similar apps using no code tools like [Bubble](https://www.listennotes.com/integrations/bubble/) and [Retool](https://www.listennotes.com/integrations/retool/).

<a href="https://www.listennotes.com/api/"><img src="https://raw.githubusercontent.com/ListenNotes/ListenApiDemo/master/web/src/powered_by_listennotes.png" width="300" /></a>

## Overview

Your frontend code (e.g., Web, iOS, Android...) shouldn't talk to Listen API directly.
For Web, your users can inspect request headers in their web browsers to find your API key, 
if you use Ajax to hit Listen API endpoints directly.
For iOS / Android, you can't easily reset your API key, if you put API keys in the source code of your app. 
Once the app is in the hands of your users, you can't easily change the code or force users to upgrade.

Typically, you'll hit Listen API endpoints from your backend (e.g., Django, Rails, Nodejs, Cloudflare Workers...). 
So you can protect your API key and reset it if needed. 
Your frontend code will talk to your backend via GraphQL, RESTful APIs or the likes.

In this demo, we provide a reference Django implementation for a backend that talks to Listen API, 
and a ReactJs implementation for a web frontend that talks to the Django backend.

## Running the project

### [Backend (Django)](https://github.com/ListenNotes/ListenApiDemo/tree/master/backend)

The backend is a simple Django backend makes requests to the Listen API. To run it, from the `backend` directory:

1. Install requirements (it is recommended you do this in a virtualenv):

```
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

2. Start the django app with the environment variable LISTEN_API_KEY set to your Listen API key: 
   
```
LISTEN_API_KEY=YOUR_SECRET_KEY python manage.py runserver
```

[Where to get LISTEN_API_KEY](https://help.listennotes.com/en/articles/3416436-how-to-get-an-api-token-of-listen-notes-api)?


You can also use `LISTEN_API_TEST=1` to hit our API mock server for testing. You don't need to use an API key here.
   
```
LISTEN_API_TEST=1 python manage.py runserver
```


### [Web (React)](https://github.com/ListenNotes/ListenApiDemo/tree/master/web)

The web frontend is a React project that makes requests to the django backend. To run it, from the `web` directory:

1. Install requirements: 
   
```
yarn install
```

2. Start the React app with the environment variable REACT_APP_BACKEND_ROOT_URL set to your Django backend's base url:
   
```
REACT_APP_BACKEND_ROOT_URL=http://localhost:8000 yarn start
```

*On desktop*

![Desktop demo](https://github.com/wenbinf/ListenApiDemo/blob/master/resources/desktop.png)

*On mobile*

<img src="https://github.com/wenbinf/ListenApiDemo/blob/master/resources/mobile.png" alt="Mobile demo" width="300">
