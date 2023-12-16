This is a express server which will accept todo and log.

in future:
1. You will able to store todo in db
2. fetch todo from api
3. will have a stream to listen last 5 todos
4. will have one api to fetch all todo present in db
5. one api to delete note by id

Steps:

create docker container

> docker build -f Dockerfile.dev -t todo-express-docker .

run docker app

> docker run -p 3000:3000 todo-express-docker