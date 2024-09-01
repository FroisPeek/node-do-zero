import { fastify } from "fastify";
import { DataBasePostgres } from "./database-postgres.js";

const server = fastify();
const database = new DataBasePostgres();

server.get('/', () => {
    return 'Hello World';
})

server.get('/videos', async (request) => {
    const search = request.query.search;

    const videos = await database.list(search);
    
    return videos;
})

server.post('/videos', async (request, response) => {
    const {title, description, duration} = request.body;

    await database.create({
        title, 
        description, 
        duration
    });

    return response.status(201).send();
});

server.put('/videos/:id', async (request, response) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body;

    await database.update(videoId, {
        title, description, duration
    })

    return response.status(204).send();
})

server.delete('/videos/:id', async (request, response) => {
    const videoId = request.params.id;

    await database.delete(videoId);

    return response.status(204).send();
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
});

