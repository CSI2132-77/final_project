# final_project

Repository link: https://github.com/CSI2132-77/final_project

## SETUP

1. clone repo with
```bash
git clone https://github.com/CSI2132-77/final_project.git
```

## Start Project with Docker

```bash
# start docker desktop before running below commands
# from root
docker-compose down -v # wipes DB in container
docker-compose up --build # rebuilds Frontend/Backend/DB
```

## Start Project (Altnernative)

1. set up Backend
```bash
# create venv
python -m venv ./backend/.venv
# start the virtual env
source ./backend/.venv/bin/activate
# install deps
pip install -r ./requirements.txt
```

2. set up Frontend
```bash
# Install NVM if not alread
sudo apt update
sudo apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh |
# install Node v22.14.0 (in use in this repo)
nvm install --lts
nvm use 22.14.0
# go into frotnend folder and install packages
cd ./frontend
npm i --verbose
```

3. Run database in one terminal tab
```bash
# Start postgreSQL
sudo service postgresql start && sudo service postgresql status
# Login to the database as hotel_admin user
psql -U hotel_admin -d hotel_management
```

4. Run backend in one terminal tab
```bash
cd ./backend
fastapi dev
```

5. Run frontend in another terminal tab
```bash
cd ./frontend
npm run dev
```

Backend runs on port **8000**, see it at http://localhost:8000

Frontend runs on port **3000**, see it at http://localhost:3000