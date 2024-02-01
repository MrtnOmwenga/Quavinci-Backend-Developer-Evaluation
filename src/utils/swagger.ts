interface Server {
    url: string;
}
    
interface Info {
    title: string;
    version: string;
}
    
interface Definition {
    openapi: string;
    info: Info;
    servers: Server[];
}
    
export const options: {
    definition: Definition;
    apis: string[];
} = {
    definition: {
    openapi: '3.0.0',
    info: {
        title: 'Quavinci API',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:3000',
        },
    ],
    },
    apis: ['./src/controllers/users.ts'],
};
    