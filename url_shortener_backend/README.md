# URL shortener
URL service for shortening URLs

## Environment:
- Python version: 3.7
- Django version: 3.0.6
- Django REST framework version: 3.11.0


## Data:
Example of a url JSON object
```
{
   "original": "https://www.google.com/search?client=firefox-b-d&q=connect+sharepoint+to+oracle+database"
}
```


## Users
POST request to `/api/urls/`:
- creates a new url shortening data record
- expects a valid url object as its body payload, except that it does not have an id property; you can assume that the given object is always valid
- adds the given object to the collection and assigns a unique integer id to it
- the response code is 201 and the response body is the created record, including its unique id

GET request to `/api/urls/`:
- the response code is 200
- the response body is an array of matching records, ordered by their ids in increasing order

GET request to `/api/urls/<id>/`:
- returns a record with the given id
- if the matching record exists, the response code is 200 and the response body is the matching object
- if there is no record in the collection with the given id, the response code is 404

DELETE request to `/api/urls/<id>/`:
- deletes the record with the given id from the collection
- if matching record existed, the response code is 204
- if there was no record in the collection with the given id, the response code is 404


## Running Locally
Make sure you have Python 3.7 [installed locally](http://install.python-guide.org). 

```sh
# Install pip & virtualenv 
$ pip3 install virtualenv
$ virtualenv env

# Activate Virtual enviorment and create dependencies
$ source env/bin/activate
$ pip3 install -r requirements.txt

# Create model then make migrations
$ python3 manage.py makemigrations api
$ python3 manage.py migrate

# delete previous migrations so as to redo migrations
$ python3 manage.py migrate api zero 

# run app
$ python3 manage.py runserver

For python deployment your app should now be running on [127.0.0.1:8000](http://127.0.0.1:8000/) or 
[localhost:8000](localhost:8000/) 
```

Alternatively, one can execute commands from the make file or run the run.sh script

```sh
# Setup & Run app
./run.sh

# Run tests
./test.sh  