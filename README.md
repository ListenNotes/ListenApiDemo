# ListenApiDemo

![Apache 2](https://img.shields.io/hexpm/l/plug.svg) 
![Build Status](https://travis-ci.com/ListenNotes/ListenApiDemo.svg?branch=master)

A simplified podcast search engine web app, using Django, React, and [Listen API](https://www.listennotes.com/api/)

## Running the project

### Backend (Django)

The backend is a simple Django backend makes requests to the Listen API. To run it, from the `backend` directory:

1. Install requirements (it is recommended you do this in a virtualenv): `pip install -r requirements.txt`
1. Start the django app with the environment variable MASHAPE_KEY set to your Listen API key: `MASHAPE_KEY=YOUR_SECRET_KEY python manage.py runserver`

[Where to get MASHAPE_KEY](https://market.mashape.com/listennotes/listennotes)?

### Web (React)

The web frontend is a React project that makes requests to the django backend. To run it, from the `web` directory:

1. Install requirements: `yarn install`
1. Start the React app: `yarn start`

*On desktop*

![Desktop demo](https://github.com/wenbinf/ListenApiDemo/blob/master/resources/desktop.png)

*On mobile*

<img src="https://github.com/wenbinf/ListenApiDemo/blob/master/resources/mobile.png" alt="Mobile demo" width="300">
