var assert = require("assert");
empresas = require(__dirname+"/../app.js");

describe('Empresas', function(){
    describe('Carga', function(){
        it('Carga el fichero app.js', function(){
            assert(empresas, "Correcto");
        });
    });
});
