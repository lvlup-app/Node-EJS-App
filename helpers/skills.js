const db = require('../config/db');

exports.showSkills = (req, res) => {
  let sql = `SELECT * FROM skills WHERE user_ID = ${req.session.passport.user}`;

  db.query(sql, (err, result) => {
    if(err) throw err;
    res.render('overview', {result: result, page: 'overview'});
  })
};

exports.createSkill = (req, res) => {
  // edit existing skill
  if(req.body.skillID){
    let sql = `UPDATE skills
                SET name = '${req.body.skill}', curr_lvl = ${req.body.currLvl}, max_lvl = ${req.body.maxLvl}
                WHERE ID = ${req.body.skillID}`;

    db.query(sql, (err) => {
      if(err) throw err;
    });
  }
  // create new skill
  else if(req.body.skill != ''){
    let sql = `INSERT INTO skills (name, curr_lvl, max_lvl, user_ID)
                VALUES ('${req.body.skill}', ${req.body.currLvl}, ${req.body.maxLvl}, ${req.session.passport.user})`;

    db.query(sql, (err) => {
      if(err) throw err;
    });
  }

  res.redirect('/profile/edit');
};

exports.addSkill = (req, res) => {
  res.render('editSkills', {result: false, page: 'profile'});
};

exports.editSkill = (req, res) => {
  let sql = `SELECT ID, name, curr_lvl, max_lvl
              FROM skills
              WHERE ID = ${req.params.id}`;

  db.query(sql, (err, result) => {
    if(err) throw (err);
    res.render('editSkills', {result: result, page: 'profile'});
  });
};

exports.deleteSkill = (req, res) => {
  let sql = `DELETE FROM skills WHERE ID = ${req.params.id}`;
  
  db.query(sql, (err) => {
    if(err) throw err;
    res.redirect('/profile/edit');
  });
};

module.exports = exports;