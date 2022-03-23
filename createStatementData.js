export default function createStatementData(invoice, plays) {
    let result = {};
    result.customer = invoice.customer;
    result.performance = invoice.aPerformances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result;

    function enrichPerformance(aPerformance) {
        const calculator = createPerformanceCalculator(
            aPerformance,
            playFor(aPerformance),
        );
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function totalAmount(data) {
        return data.performance.reduce((total, p) => total + p.amount, 0);
    }

    function totalVolumeCredits(data) {
        return data.performances.reduce(
            (total, p) => total + p.totalVolumeCredits,
            0,
        );
    }
}

function createPerformanceCalculator(aPerformance, aPlay) {
    switch (this.play.type) {
        case "tragedy":
            return new TragedyCalculator(aPerformance, aPlay);
        case "comedy":
            return new ComedyCalculator(aPerformance, aPlay);
        default:
            throw new Error(`unknown play type: ${this.play.type}`);
    }
}

class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        thie.play = aPlay;
    }

    get amount() {
        throw new Error(`サブクラスの責務`);
    }

    get volumeCredits() {
        return Math.max(thie.performance.audience - 30, 0);
    }
}

class TragedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (aPerformance.audience - 30);
        }
        return result;
    }
}
class ComedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 30000;
        if (this.performance.audience > 20) {
            result += 1000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result;
    }

    get volumeCredits() {
        return super.volumeCredits + Math.floor(this.performance.audience / 5);
    }
}
