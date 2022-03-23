import statement from "./statement";

const plays = JSON.parse(
    '{  "hamlet": {"name": "Hamlet", "type": "tragedy"},  "as−like": {"name": "As You Like It", "type": "comedy"},  "othello": {"name": "Othello", "type": "tragedy"}  }',
);

const invoices = JSON.parse(
    '[  {  "customer": "BigCo",  "performances": [  {  "playID": "hamlet",  "audience": 55  },  {  "playID": "as−like",  "audience": 35  },  {  "playID": "othello",  "audience": 40  }  ]  }  ]',
);

console.log(statement(invoices[0], plays));
