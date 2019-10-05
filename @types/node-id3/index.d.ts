declare module 'node-id3' {
    type Methods = {
        update(tags: { [key: string]: any }, path: string): boolean;
    };
    const nodeID3: Methods;

    export = nodeID3;
}
