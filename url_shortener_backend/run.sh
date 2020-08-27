# Install pip & virtualenv 
pip3 install virtualenv
virtualenv env

# Activate Virtual enviorment and create dependencies
source env/bin/activate
pip3 install -r requirements.txt

# Create model then make migrations
python3 manage.py makemigrations api
python3 manage.py migrate

# run app
python3 manage.py runserver