# ListenApiDemo
A simplified podcast search engine web app, using Django, React, and Listen API

## Running the project

### Django

The backend is a simple Django backend makes requests to the Listen API. To run it:

1. Install requirements (it is recommended you do this in a virtualenv): `pip install -r requirements.txt`
1. Add your Listen API key (from Mashape) to a new file called `secrets.py`: `echo MASHAPE_KEY = \"{YOUR SECRET KEY}\" > secrets.py`
1. Start the django app: `python manage.py runserver`
