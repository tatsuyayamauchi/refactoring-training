import createStatementData from "./createStatementData";

const plays = JSON.parse(
    '{  "hamlet": {"name": "Hamlet", "type": "tragedy"},  "as−like": {"name": "As You Like It", "type": "comedy"},  "othello": {"name": "Othello", "type": "tragedy"}  }',
);

const invoices = JSON.parse(
    '[  {  "customer": "BigCo",  "performances": [  {  "playID": "hamlet",  "audience": 55  },  {  "playID": "as−like",  "audience": 35  },  {  "playID": "othello",  "audience": 40  }  ]  }  ]',
);

function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;
    for (let pref of data.performances) {
        result += `  ${pref.play.name}: ${usd(pref.amount)} (${
            pref.audience
        } seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;
}

function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {
    let result = `<h1>Statement for ${data.customer}</h1>\n`;
    result += `<table>\n`;
    result += `<tr><th>play</th><th>seats</th><th>cost</th></tr>\n`;

    for (let pref of data.performances) {
        result += `  <tr><td>${pref.play.name}</td><td>${pref.audience}</td>)\n`;
        result += `<td>${usd(data.totalAmount)}</td></tr>)\n`;
    }
    result += `</table>\n`;
    result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
    return result;
}

function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(aNumber / 100);
}
