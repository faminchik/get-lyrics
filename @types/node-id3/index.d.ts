declare module 'node-id3' {
    type Methods = {
        update(first: { [key: string]: any }, second: string): boolean;
    };
    const nodeID3: Methods;

    export = nodeID3;
}
