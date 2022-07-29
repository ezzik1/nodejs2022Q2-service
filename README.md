# Containerization

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop/)
- For Windows WSL and install one of the Linux distributions [Instruction](https://docs.microsoft.com/en-en/windows/wsl/install) and install nodejs

## Downloading

```
git clone {repository URL}
```

## Running docker

Run docker

For Windows, you need to run the Linux distribution via wsl and go to the directory with the task.
For Linux / Mac, you need to go through the command line to the directory with the task.

Then type on the command line:

```
npm run docker:build
```

## Testing

After application running enter in the terminal:

```
docker ps
```

To get name of the existing container
Then enter:

```
docker exec -it <container name> /bin/sh
```

In the container terminal, enter:

```
npm run test
```

## Scan

After stopping containers, you can run scripts to scan for vulnerabilities:

```
npm run docker:scan:app
```

```
npm run docker:scan:db
```


**In tests, one of the cases will be invalid. Sorry, I couldn't pull the changes to the test cases from the main template**
[This fix](https://github.com/rolling-scopes-school/nodejs-course-template/commit/8472c46bdf94be7ce2fb7a9667cdb8e65e3ef3d5)
