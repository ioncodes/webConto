const AHV = new Decimal('0.05125');
const ALV = new Decimal('0.011');
const NBU = new Decimal('0.0145');

class Lohnabrechnung {
	constructor(monatslohn, alter, kinder) {
		this.monatslohn = new Decimal(monatslohn);
		this.kinder = kinder;
		this.bvg = new BVG(alter, monatslohn);

		this.berechneBruttolohn();
		this.berechneNettolohn();
	}

	// berechne kinderzulagen und bruttolohn
	berechneBruttolohn() {
		let kinderzulagen = new Decimal('0.0');
		for(let i = 0; i < this.kinder.length; i++) {
			let alter = this.kinder[i];
			if(alter > 16 && alter < 25) {
				kinderzulagen = kinderzulagen.plus('250');
			} else if(alter >= 25) {
				console.log('child is over 25');
				continue; // just in case...
			} else {
				kinderzulagen = kinderzulagen.plus('200');
			}
		}
		this.kinderzulagen = kinderzulagen;
		this.bruttolohn = this.monatslohn.plus(this.kinderzulagen);
	}

	// berechne abzüge und nettolohn
	berechneNettolohn() {
		let nettolohn = this.bruttolohn;
		this.ahv = this.bruttolohn.times(AHV);
		this.alv = this.bruttolohn.times(ALV);
		this.nbu = this.bruttolohn.times(NBU);
		this.abzuege = this.ahv.plus(this.alv).plus(this.nbu).plus(this.bvg.bvg);
		nettolohn = nettolohn.minus(this.abzuege);
		// todo: BVG here; Ric sagt ist nicht möglich!
		this.nettolohn = nettolohn;
	}

	get monatslohn() {
		return this._monatslohn;
	}

	set monatslohn(monatslohn) {
		this._monatslohn = monatslohn;
	}

	get kinder() {
		return this._kinder;
	}

	set kinder(kinder) {
		this._kinder = kinder;
	}

	get bruttolohn() {
		return this._bruttolohn;
	}

	set bruttolohn(bruttolohn) {
		this._bruttolohn = bruttolohn;
	}

	get kinderzulagen() {
		return this._kinderzulagen;
	}

	set kinderzulagen(kinderzulagen) {
		this._kinderzulagen = kinderzulagen;
	}

	get ahv() {
		return this._ahv;
	}

	set ahv(ahv) {
		this._ahv = ahv;
	}

	get alv() {
		return this._alv;
	}

	set alv(alv) {
		this._alv = alv;
	}

	get nbu() {
		return this._nbu;
	}

	set nbu(nbu) {
		this._nbu = nbu;
	}

	get abzuege() {
		return this._abzuege;
	}

	set abzuege(abzuege) {
		this._abzuege = abzuege;
	}

	get nettolohn() {
		return this._nettolohn;
	}

	set nettolohn(nettolohn) {
		this._nettolohn = nettolohn;
	}

	get bvg() {
		return this._bvg;
	}

	set bvg(bvg) {
		this._bvg = bvg;
	}
}