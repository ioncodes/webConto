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

function writeChild() {
	let _name = kindername.val();
	let failed = false;
	if(_name === '') { // replace with regex
		kindername.parent().removeClass('has-success');
		kindername.parent().addClass('has-danger');
		failed = true;
	} else {
		kindername.parent().addClass('has-success');
		kindername.parent().removeClass('has-danger');
	}
	let _alter = kinderalter.val();
	if(_alter >= 18 && _alter <= 100) { 
		kinderalter.parent().addClass('has-success');
		kinderalter.parent().removeClass('has-danger');
		if(!failed) {
			kinderliste.find('tbody').append('<tr><th scope="row">' + kinder.val() + '</th><td>' + _name + '</td><td>'+ _alter +'</td></tr>');
			childmodal.modal('hide');
			kindername.val('');
			kinderalter.val(18);
			kinder.get(0).value++;
			kinderalter.parent().removeClass('has-success');
			kindername.parent().removeClass('has-success');
		}
	} else {
		kinderalter.parent().removeClass('has-success');
		kinderalter.parent().addClass('has-danger');
	}
}

function deleteChild() {
	if(kinder.val() > 0) {
		kinder.get(0).value--;
	}
}

function addChild() {
	childmodal.modal();
}

function remChild() {
	kinderlisterem.empty();
	let childs = [];
	for(let i = 0; i < kinderliste.find('tbody').children().length; i++) {
		childs.push(kinderliste.find('tbody').children().eq(i).children().eq(1).text());
	}
	for(let i = 0; i < childs.length; i++) {
		kinderlisterem.append('<a href="#" onclick="select(this)" class="list-group-item list-group-item-action">'+childs[i]+'</a>');
	}
	childremmodal.modal();
}

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
	kinder.parent().addClass('has-success'); // It should always be a success unless someone touches the HTML code.
	if(failed) {
		cstatus.text('Bitte überprüfen Sie das Formular.');
	} else {
		cstatus.text('Das Formular wurde erfolgreich überprüft.');
	}
	return failed;
}

function calculate() {
	let failed = validate();
	if(!failed) {
		// todo: implement this
		// let lohnabrechung = new Lohnabrechung(...);
		result.modal();
	}
}

function select(element) {
	let childs = [];
	for(let i = 0; i < kinderliste.find('tbody').children().length; i++) {
		childs.push(kinderliste.find('tbody').children().eq(i).children().eq(1).text());
	}
	for(let i = 0; i < childs.length; i++) {
		if(element.classList.contains('active')) {
			element.classList.remove('active');
			element.classList.add('list-group-item-action');
		} else if(element.text === childs[i]) { 
			element.classList.remove('list-group-item-action');
			element.classList.add('active');
		}
	}
}