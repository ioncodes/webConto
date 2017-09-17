const MAP = [
	{ 
		min: 18,
		max: 24,
		value: new Decimal('0.00')
	},{ 
		min: 25,
		max: 34,
		value: new Decimal('0.07')
	},{
		min: 35,
		max: 44,
		value: new Decimal('0.1')
	},{
		min: 45,
		max: 54,
		value: new Decimal('0.15')
	},{
		min: 55,
		max: 65,
		value: new Decimal('0.18')
	}
];

const KOORDINATIONSABZUG = 24675;
const MINIMUM = 21150;
const MAXIMUM = 84600;
const RISIKOBEITRAG = new Decimal('0.06'); // zwischen 2% und 6%

class BVG {
	constructor(alter, monatslohn) {
		this.monatslohn = new Decimal(monatslohn);
		// find den prozentsatz für das alter
		for(let i = 0; i < MAP.length; i++) {
			if(alter >= MAP[i].min && alter <= MAP[i].max) {
				this.gestaffelteGutschrift = MAP[i].value;
				break;
			}
		}

		this.berechneBVG()
	}

	berechneBVG() {
		let monatslohn = this.monatslohn;
		let jahreslohn = monatslohn.times(12);
		if(jahreslohn > MINIMUM) {
			if(jahreslohn > MAXIMUM) {
				jahreslohn = new Decimal(MAXIMUM);
			}
			let versichert = jahreslohn.minus(KOORDINATIONSABZUG);
			let monatlichVersichert = versichert.div(12);
			let beitrag = new Decimal('0.0');
			let risikobeitrag = monatlichVersichert.times(RISIKOBEITRAG);
			beitrag = beitrag.plus(risikobeitrag);
			if(!this.gestaffelteGutschrift.equals(0.0)) {
				// gestaffelte gutschrift erst ab 25 jahren
				let gestaffelterbeitrag = monatlichVersichert.times(this.gestaffelteGutschrift);
				beitrag = beitrag.plus(gestaffelterbeitrag);
			}
			this.bvg = beitrag;
		} else {
			this.bvg = new Decimal('0.0');
		}
	}

	set bvg(bvg) {
		this._bvg = bvg;
	}

	get bvg() {
		return this._bvg;
	}
}