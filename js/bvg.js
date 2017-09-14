const MAP = [
	{ 
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

class BVG {
	constructor(alter) {
		for(let i = 0; i < MAP.length; i++) {
			if(alter >= MAP[i].min && alter <= MAP[i].max) {
				this.value = MAP[i].value;
				break;
			}
		}
	}

	get wert() {
		return this.value;
	}
}