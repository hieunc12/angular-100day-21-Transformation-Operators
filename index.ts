import {
  of,
  map,
  pipe,
  merge,
  delay,
  pluck,
  fromEvent,
  mapTo,
  reduce,
  toArray,
  interval,
  buffer,
  bufferTime,
  scan
} from 'rxjs';

const users = [
  {
    id: 'ddfe3653-1569-4f2f-b57f-bf9bae542662',
    username: 'tiepphan',
    firstname: 'tiep',
    lastname: 'phan',
    postCount: 5
  },
  {
    id: '34784716-019b-4868-86cd-02287e49c2d3',
    username: 'nartc',
    firstname: 'chau',
    lastname: 'tran',
    postCount: 22
  }
];

const usersVm = users.map(user => {
  return {
    ...user,
    fullname: `${user.firstname} ${user.lastname}`
  };
});

const observer = {
  next: value => console.log(value),
  error: err => console.error(err),
  complete: () => console.log('completed')
};

// map
const user$ = merge(
  of(users[0]).pipe(delay(2000)),
  of(users[1]).pipe(delay(4000))
);
user$.pipe(
  map(user => ({ ...user, fullname: `${user.firstname} ${user.lastname}` }))
);

// pluck
const params$ = of({ id: 123 });
const id$ = params$.pipe(pluck('id'));

// mapTo
merge(
  fromEvent(document, 'mouseenter').pipe(mapTo(true)),
  fromEvent(document, 'mouseleave').pipe(mapTo(false))
);

// reduce
const totalCount$ = merge(
  of(users[0]).pipe(delay(2000)),
  of(users[1]).pipe(delay(4000))
).pipe(reduce((acc, cur) => acc + cur.postCount, 0));

//toArray
const listUsers$ = merge(
  of(users[0]).pipe(delay(1000)),
  of(users[1]).pipe(delay(2000))
).pipe(toArray());

//buffer
const interval$ = interval(1000);
const click$ = fromEvent(document, 'click');

const buffer$ = interval$.pipe(buffer(click$));

const subscribe = buffer$;
//bufferTime
const bufferTime$ = interval$.pipe(bufferTime(1000));

const subscribe1 = bufferTime$;

//scan
totalCount$
  .pipe(scan((acc, cur) => acc + cur.postCount, 0))
  .subscribe(observer);
