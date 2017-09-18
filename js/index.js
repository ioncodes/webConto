var monatslohn = $('#monatslohn');
var alter = $('#alter');
var kinder = $('#kinder');
var cstatus = $('#status');
var result = $('#result');
var kinderliste = $('#kinderliste');
var childmodal = $('#childadd');
var kinderalter = $('#kinderalter');
var kindername = $('#name');
var childremmodal = $('#childrem');
var kinderlisterem = $('#kinderremliste');
var monate = $('#monate');
var risikobeitrag = $('#risikobeitrag');

var rmonatslohn = $('#rmonatslohn');
var rbruttolohn = $('#rbruttolohn');
var rkinderzulagen = $('#rkinderzulagen');
var rahv = $('#rahv');
var ralv = $('#ralv');
var rnbu = $('#rnbu');
var rabzuege = $('#rabzuege');
var rnettolohn = $('#rnettolohn');
var rbvg = $('#rbvg');

// füge ein neues Kind hinzu
function writeChild() {
	let _name = kindername.val();
	let failed = false;
	// Name darf nicht leer sein
	if(_name === '') {
		kindername.parent().removeClass('has-success');
		kindername.parent().addClass('has-danger');
		failed = true;
	} else {
		kindername.parent().addClass('has-success');
		kindername.parent().removeClass('has-danger');
	}
	let _alter = kinderalter.val();
	if(_alter > 0 && _alter <= 24) { 
		kinderalter.parent().addClass('has-success');
		kinderalter.parent().removeClass('has-danger');
		if(!failed) {
			// wenn das alter "korrekt" ist:
			kinderliste.find('tbody').append('<tr><th scope="row">' + kinder.val() + '</th><td>' + _name + '</td><td>'+ _alter +'</td></tr>');
			childmodal.modal('hide');
			kindername.val('');
			kinderalter.val(18);
			kinder.get(0).value++; // erhöhe die anzahl kinder
			kinderalter.parent().removeClass('has-success');
			kindername.parent().removeClass('has-success');
		}
	} else {
		kinderalter.parent().removeClass('has-success');
		kinderalter.parent().addClass('has-danger');
	}
}

// entferne ein Kind von der tabelle
function deleteChild() {
	if(kinder.val() > 0) {
		let fix = false;
		let remove;
		let child = $('#kinderremliste > a.list-group-item.active').text();
		for(let i = 0; i < kinderliste.find('tbody').children().length; i++) {
			let c = kinderliste.find('tbody').children().eq(i).children().eq(1);
			if(fix) {
				// fix the row index
				kinderliste.find('tbody').children().eq(i).children().eq(0).text(parseInt(kinderliste.find('tbody').children().eq(i).children().eq(0).text())-1);
			}
			if(c.text() === child) {
				remove = c.parent();
				fix = true;
			}
		}
		remove.remove();
		kinder.get(0).value--; // verringere die anzahl kinder
		childremmodal.modal('hide');
	}
}

// öffne das fenster
function addChild() {
	childmodal.modal();
}

// bereite das fenster vor um ein Kind zu löschen
function remChild() {
	kinderlisterem.empty();
	let childs = [];
	for(let i = 0; i < kinderliste.find('tbody').children().length; i++) {
		childs.push(kinderliste.find('tbody').children().eq(i).children().eq(1).text());
	}
	for(let i = 0; i < childs.length; i++) {
		kinderlisterem.append('<a href="#" onclick="select(this);" class="list-group-item list-group-item-action">'+childs[i]+'</a>');
	}
	childremmodal.modal();
}

// überprüfe die eingabe
function validate() {
	let failed = false;
	let _monatslohn = new Decimal(monatslohn.val());
	if(_monatslohn.isNaN() || _monatslohn.lessThanOrEqualTo(0)) {
		monatslohn.parent().removeClass('has-success');
		monatslohn.parent().addClass('has-danger');
		failed = true;
	} else {
		monatslohn.parent().removeClass('has-danger');
		monatslohn.parent().addClass('has-success');
	}
	let _alter = new Decimal(alter.val());
	if(_alter.isNaN() || _alter.lessThan(18) || _alter.greaterThan(100)) {
		alter.parent().removeClass('has-success');
		alter.parent().addClass('has-danger');
		failed = true;
	} else {
		alter.parent().removeClass('has-danger');
		alter.parent().addClass('has-success');
	}
	let _prozent = new Decimal(risikobeitrag.val());
	if(_prozent.greaterThanOrEqualTo(2.00) && _prozent.lessThanOrEqualTo(6.00)) {
		risikobeitrag.parent().removeClass('has-danger');
		risikobeitrag.parent().addClass('has-success');
	} else {
		risikobeitrag.parent().removeClass('has-success');
		risikobeitrag.parent().addClass('has-danger');
		failed = true;
	}
	kinder.parent().addClass('has-success'); // It should always be a success unless someone touches the HTML code.
	monate.parent().addClass('has-success'); // It should always be a success unless someone touches the HTML code.
	if(failed) {
		cstatus.text('Bitte überprüfen Sie das Formular.');
	} else {
		cstatus.text('Das Formular wurde erfolgreich überprüft.');
	}
	return failed;
}

// ruf die lohnabrechnung auf und setze die daten
function calculate() {
	let failed = validate();
	if(!failed) {
		let childs = [];
		for(let i = 0; i < kinderliste.find('tbody').children().length; i++) {
			childs.push(parseInt(kinderliste.find('tbody').children().eq(i).children().eq(2).text()));
		}
		let _monate = monate.val();
		let _risikoprozent = risikobeitrag.val();
		let lohnabrechnung = new Lohnabrechnung(monatslohn.val(), alter.val(), childs, _monate, _risikoprozent);
		rmonatslohn.val(lohnabrechnung.monatslohn);
		rkinderzulagen.val('+' + lohnabrechnung.kinderzulagen + ' (' + lohnabrechnung.kinder.length + ' Kinder)');
		rbruttolohn.val(lohnabrechnung.bruttolohn);
		// always times 100 to show the actual %
		rahv.val('-' + lohnabrechnung.ahv + ' (' + AHV.times(100) + '%)');
		ralv.val('-' + lohnabrechnung.alv + ' (' + ALV.times(100) + '%)');
		rnbu.val('-' + lohnabrechnung.nbu + ' (' + NBU.times(100) + '%)');
		rbvg.val('-' + lohnabrechnung.bvg.bvg + ' (' + lohnabrechnung.bvg.gestaffelteGutschrift.times(100) + '% & ' + RISIKOBEITRAG.times(100) + '%)')
		rabzuege.val('-' + lohnabrechnung.abzuege);
		rnettolohn.val(lohnabrechnung.nettolohn);
		result.modal();
	}
}

// event für das kinderremoval fenster. aktiviere selections und deaktiviere den rest
function select(element) {
	let l = $('.list-group-item');
	l.removeClass('active')
	l.addClass('list-group-item-action');
	element.classList.remove('list-group-item-action');
	element.classList.add('active');
}