import { EventEmitter, Injectable } from '@angular/core';
import { Comment } from '../model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  model: EventEmitter<{ action: string, data: any }>;
  url: string;

  constructor() {
    this.model = new EventEmitter();
    this.url = '/comment';
  }

  list(filter?: { [key: string]: any }) {

    const data = [{
      user: {
        name: 'Mito Code',
        id: 135
      },
      flightId: 666,
      date: '2022-05-31',
      comment: "My first comment 1.0",
      id: 1
    },
    {
      user: {
        name: 'Mario Code',
        id: 136
      },
      flightId: 666,
      date: '2022-05-31',
      comment: "Not agree comment 1.1",
      id: 1
    },
    {
      user: {
        name: 'Mito Code',
        id: 135
      },
      flightId: 897,
      comment: "My first comment 1.1",
      id: 1
    },
    {
      user: {
        name: 'Mito Code',
        id: 135
      },
      flightId: 897,
      comment: "My first comment 1.1",
      id: 1
    },
    {
      user: {
        name: 'Mito Code',
        id: 135
      },
      flightId: 897,
      comment: "My first comment 1.1",
      id: 1
    },
    {
      user: {
        name: 'Mito Code',
        id: 135
      },
      flightId: 897,
      comment: "My first comment 1.1",
      id: 1
    },
    {
      user: {
        name: 'Mito Code',
        id: 135
      },
      flightId: 897,
      comment: "My first comment 1.1",
      id: 1
    },
    {
      user: {
        name: 'Mito Code',
        id: 135
      },
      flightId: 897,
      comment: "My first comment 1.1",
      id: 1
    },
    {
      user: {
        name: 'Mito Code',
        id: 135
      },
      flightId: 897,
      comment: "My first comment 1.1",
      id: 1
    },
    {
      user: {
        name: 'Mito Code',
        id: 135
      },
      flightId: 897,
      comment: "My first comment 1.1",
      id: 1
    },
    {
      user: {
        name: 'Mito Code',
        id: 135
      },
      flightId: 897,
      comment: "My first comment 1.1",
      id: 1
    },
    {
      user: {
        name: 'Mito Code',
        id: 135
      },
      flightId: 897,
      comment: "My first comment 1.1",
      id: 1
    },
    {
      user: {
        name: 'Mito Code',
        id: 135
      },
      flightId: 897,
      comment: "My first comment 1.1",
      id: 1
    },
    {
      user: {
        name: 'Matp Code',
        id: 135
      },
      flightId: 111,
      comment: "My first comment 1.1",
      id: 1
    }];

    const flightId = filter && filter['flightId'];
    const list = flightId ? data.filter(item => item.flightId === parseInt(flightId)) : data;

    this.model.emit({
      action: 'list',
      data: list
    });

    /*fetch(this.url)
      .then(response => response.json())
      .then(response => this.model.emit({ action: 'list', data: response.data }))
      .catch(error => this.model.emit({ action: 'error', data: 'Not loaded data' }));*/
  }

  select(id: number) {
    console.log('select', id);
    this.model.emit({
      action: 'select',
      data: {
        user: {
          name: 'Mito Code',
          id: 135
        },
        flightId: 303,
        comment: "My first comment 1.0",
        id
      }
    });

    /*
    fetch(`${this.url}/${id}`)
      .then(response => response.json())
      .then(response => this.model.emit({ action: 'list', data: response.data }))
      .catch(error => this.model.emit({ action: 'error', data: 'Not loaded data' }));*/
  }

  update(comment: Comment) {
    console.log('update', comment);
    this.model.emit({
      action: 'update',
      data: {
        user: {
          name: 'Mito Code',
          id: 135
        },
        flightId: 666,
        comment: "My first comment 1.0",
        id: 1
      }
    });
  }

  create(comment: Comment) {
    console.log('create', comment);
    this.model.emit({
      action: 'create',
      data: {
        user: {
          name: 'Mito Code',
          id: 135
        },
        flightId: 666,
        comment: "My first comment 1.0",
        id: 1
      }
    });
  }

  save(comment: Comment) {
    return comment.id ?
      this.update(comment) :
      this.create(comment);
  }

  delete(id: number) {
    this.model.emit({
      action: 'delete',
      data: {
        user: {
          name: 'Mito Code',
          id: 135
        },
        flightId: 303,
        comment: "My first comment 1.0",
        id
      }
    });
  }
}
