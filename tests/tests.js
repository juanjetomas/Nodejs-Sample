var assert = require("assert");
var request = require('supertest');
empresas = require(__dirname+"/../app.js");
app = require('../app.js');

describe('Empresas', function(){
    describe('Carga', function(){
        it('Carga el fichero app.js', function(){
            assert(empresas, "Correcto");
        });
    });
});

describe( "PUT añade comentario", function() {
	it('Introduce un comentario', function (done) {
	request(app)
		.put('/addcomment/Trevenque/Vergonzoso/')
		.expect('Content-Type', /json/)
		.expect(200,done);
	});
});

describe( "GET lista empresas", function() {
	it('Obtiene la lista de empresas', function (done) {
	request(app)
		.get('/companies')
		.expect('Content-Type', /json/)
		.expect(200,done);
	});
});
