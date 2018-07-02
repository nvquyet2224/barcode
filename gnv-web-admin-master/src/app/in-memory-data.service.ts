import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 11, username: 'admin', email: 'admin@gmail.com', password: '1' },
      { id: 12, username: 'narco', email: 'narco@gmail.com', password: '123456' },
      { id: 13, username: 'bombasto', email: 'bombasto@gmail.com', password: '123456' },
      { id: 14, username: 'celeritas', email: 'celeritas@gmail.com', password: '123456' },
      { id: 15, username: 'magneta', email: 'magneta@gmail.com', password: '123456' },
      { id: 16, username: 'rubberMan', email: 'rubberMan@gmail.com', password: '123456' },
      { id: 17, username: 'dynama', email: 'dynama@gmail.com', password: '123456' },
      { id: 19, username: 'magma', email: 'magma@gmail.com', password: '123456' },
      { id: 20, username: 'tornado', email: 'tornado@gmail.com', password: '123456' }
    ];
    return {users};
  }
}
