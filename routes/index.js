var _ = require('underscore');
var assert = require('assert');

// TODO: This shoul be read from a database
var companies = [
  {
    name: 'Trevenque',
    comments: [
      'Buena atmósfera laboral.',
      'Amplio aparcamiento.',
      'Trato ligeramente denigrante.']
  },
  {
    name: 'Pademobile',
    comments: [
      'Sueldo muy bajo',
      'Amplia agenda de contactos']
  },
  {
    name: 'Manolos S.L.',
    comments: [
      'Decepcionante. Mi trabajo consistía en cortar carne.',]
  },

  {
    name: 'OtraEmpresa S.L.',
    comments: []
  }
];

module.exports.companiesshare = companies;

exports.index = function(req, res) {
  var names = companies.map(function(p) { return p.name; });
  assert(names, "Colección de nombres de empresas");
  res.render('index', { companies: names })
};

exports.company = function(req, res) {
  var comments = _(companies).detect(function (p) {
    return p.name == req.params.name;
  }).comments;
  if(comments.length==0){
    comments.push("Aún no hay ningún comentario sobre esta empresa. ¡Ánimate a valorarla!")
  }
  assert(comments.length!=0, "Si no hay comentarios se debe mostrar un mensaje invitando a añadirlos.")

  console.log('Comentarios leídos correctamente.');
  res.json(comments);
}

exports.addComment = function(req, res) {
  var company = _(companies).detect(function(p) {
    return p.name == req.body.name;
  });

  var numComments = company.comments.length;
  company.comments.push(req.body.comment);
  assert(numComments+1 === company.comments.length, "El comentario no se ha añadido correctamente");

  console.log('Nuevo comentario para ' + company.name + ': ' + req.body.comment);

  res.json({status: 'ok' });
}
