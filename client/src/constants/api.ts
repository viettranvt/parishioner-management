const basePath = '/api';

enum Resource {
   auth = 'auth',
   parishioner = 'parishioners',
}

export const ResourcePaths = new Proxy(Resource, {
   get: (target: typeof Resource, property: string) =>
      `${basePath}/${Reflect.get(target, property)}`,
});
