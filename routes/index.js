var _ = require('underscore');

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
  }
];

exports.index = function(req, res) {
  var names = companies.map(function(p) { return p.name; });
  res.render('index', { companies: names })
};

exports.company = function(req, res) {
  var comments = _(companies).detect(function (p) {
    return p.name == req.params.name;
  }).comments;
  res.json(comments);
}

exports.addComment = function(req, res) {
  var company = _(companies).detect(function(p) {
    return p.name == req.body.name;
  });

  company.comments.push(req.body.comment);

  console.log('Nuevo comentario para ' + company.name + ': ' + req.body.comment);

  res.json({status: 'ok' });
}
