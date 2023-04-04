const basePath = '/api';

enum Resource {
   auth = 'auth',
   parishioner = 'parishioners',
}

export const ResourcePaths = new Proxy(Resource, {
   get: (target: typeof Resource, property: string) =>
      `${basePath}/${Reflect.get(target, property)}`,
});

export enum ApiParamField {
   fullName = 'full_name',
   christianName = 'christian_name',
   dateOfBaptism = 'date_of_baptism',
   dateOfFirstCommunication = 'date_of_first_communication',
   dateOfConfirmation = 'date_of_confirmation',
   dateOfWedding = 'date_of_wedding',
}
