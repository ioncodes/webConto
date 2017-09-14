const AHV = new Decimal('0.0512');
const ALV = new Decimal('0.0110');
const NBU = new Decimal('0.0145');

class Lohnabrechnung {
	constructor(monatslohn, alter, kinder) {
		this.monatslohn = monatslohn;
		this.kinder = kinder;
		this.bvg = new BVG(alter);

		this.berechneBruttolohn();
		this.berechneNettolohn();
	}

	berechneBruttolohn() {
		let bruttolohn = new Decimal('0.0');
		for(let i = 0; i < this.kinder.length; i++) {
			let alter = this.kinder[i];
			if(alter > 16 && alter < 25) {
				bruttolohn.add(250);
			} else if(alter >= 25) {
				continue; // just in case...
			} else {
				bruttolohn.add(200);
			}
		}
		this.bruttolohn = bruttolohn;
	}

	berechneNettolohn() {
		let nettolohn = this.bruttolohn;
		nettolohn.minus(this.bruttolohn * AHV);
		nettolohn.minus(this.bruttolohn * ALV);
		nettolohn.minus(this.bruttolohn * NBU);
		// todo: BVG here
		this.nettolohn = nettolohn;
	}
}