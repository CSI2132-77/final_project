# final_project
Repository link: https://github.com/CSI2132-77/final_project

## SETUP
1. clone repo with
```bash
git clone https://github.com/CSI2132-77/final_project.git
```
2. set up Backend
```bash
# create venv
python -m venv ./backend/.venv
# start the virtual env
source ./backend/.venv/bin/activate
# install deps
pip install -r ./requirements.txt
```
3. set up Frontend
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

## Start Project
1. Run backend in one terminal tab
```bash
cd ./backend
fastapi dev
```
2. Run frontend in another terminal tab
```bash
cd ./frontend
npm run dev
```

Backend runs on port **8000**, see debug docs at http://localhost:8000/docs

Frontend runs on port **3000**, see it at http://localhost:3000