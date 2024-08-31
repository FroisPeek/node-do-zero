import { fastify } from "fastify";
import { DataBaseMemory } from './database-memory.js';

const server = fastify();
const database = new DataBaseMemory();

server.get('/', () => {

    console.log(database.list())
    return 'Hello World';
})

server.get('/videos', (request) => {
    const search = request.query.search;

    const videos = database.list(search);
    
    return videos;
})

server.post('/videos', (request, response) => {
    const {title, description, duration} = request.body;

    database.create({
        title, 
        description, 
        duration
    });

    return response.status(201).send();
});

server.put('/videos/:id', (request, response) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body;

    database.update(videoId, {
        title, description, duration
    })

    return response.status(204).send();
})

server.delete('/videos/:id', (request, response) => {
    const videoId = request.params.id;

    database.delete(videoId);

    return response.status(204).send();
})

server.listen({
    port: 3333
});

