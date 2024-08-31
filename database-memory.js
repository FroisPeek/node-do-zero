import { randomUUID } from 'node:crypto';

export class DataBaseMemory {
    #videos = new Map()

    list() {
        return Array.from(this.#videos.entries()).map((videoArray) => {
            const id = videoArray[0]
            const data = videoArray[1]

            return { id, ...data };
        })
    }

    create(video) {
        const videoId = randomUUID() // vai gerar um ramdom id para o video a ser criado;
        // UUID - Unique Universal ID

        this.#videos.set(videoId, video)
    }

    update(id, video){
        this.#videos.set(id, video)
    }

    delete(id){
        this.#videos.delete(id)
    }
}
