# ListenApiDemo

![Apache 2](https://img.shields.io/hexpm/l/plug.svg) 
![Build Status](https://travis-ci.com/ListenNotes/ListenApiDemo.svg?branch=master)

A simplified podcast search engine web app, using Django, React, and [Listen API](https://www.listennotes.com/api/).

<a href="https://www.listennotes.com/api/"><img src="https://raw.githubusercontent.com/ListenNotes/ListenApiDemo/master/web/src/powered_by_listennotes.png" width="300" /></a>

## Running the project

### Backend (Django)

The backend is a simple Django backend makes requests to the Listen API. To run it, from the `backend` directory:

1. Install requirements (it is recommended you do this in a virtualenv): `pip install -r requirements.txt`
1. Start the django app with the environment variable RAPID_API_KEY set to your Listen API key: `RAPID_API_KEY=YOUR_SECRET_KEY python manage.py runserver`

[Where to get RAPID_API_KEY](https://rapidapi.com/listennotes/api/listennotes)?

### Web (React)

The web frontend is a React project that makes requests to the django backend. To run it, from the `web` directory:

1. Install requirements: `yarn install`
1. Start the React app: `yarn start`

*On desktop*

![Desktop demo](https://github.com/wenbinf/ListenApiDemo/blob/master/resources/desktop.png)

*On mobile*

<img src="https://github.com/wenbinf/ListenApiDemo/blob/master/resources/mobile.png" alt="Mobile demo" width="300">
