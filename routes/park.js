const express = require("express");
const router = express.Router();
const connection = require("../conf");

router.get("/", (req, res) => {
  connection.query('SELECT * FROM park', (err, results) => {
      if (err) {
      res.status(500).send("Erreur lors de l'affichage des places de parkings");
      } else {
      res.json(results);
      };
  });
});



function search(res, req, next) {
  let searchTerm = req.query.search;
  let floor = req.query.floor;


  let query = 'SELECT floor, avaible FROM park';
  if(searchTerm != '' && floor != '' ) {
    query = `SELECT floor, avaible FROM park INNER JOIN user idUser = user_idUser WHERE avaible = ? AND floor = ? `
  }
  database.query(query, (err, req) => {
    if(err) {
      req.searchResult = results;
      req.searchTerm = "";
      req.floor = "";
      next();
    }

    req.searchTerm = searchTerm;
    req.floor = "";
    next();
  })
}

function searchUser(res, req, next) {
  let searchUser = req.query.search;
  let floor = req.query.floor;
  let numberPlace = req.query.numberPlace;

  let query = 'SELECT floor, place FROM park INNER JOIN user ON idUser = user_idUser'
  if(searchUser != '' && floor != '' && numberPlace != '') {
    query = `'SELECT floor, place FROM ONNER JOIN user ON idUser ='` + searchUser + `WHERE ` + floor + `= ?` + `AND ` + numberPlace + `= ?`;
  }

  database.query(query, (err, result) => {
    if(err) {
      req.searchResult = "";
      req.floor = "";
      req.numberPlace = "";
      next();
    }

    req.searchUser = result;
    req.floor = "";
    req.numberPlace = "";
    next();
  });
}

router.get('/localisation', searchUser, (req, res) => {
  let searchResult = req.searchResult;
  res.render('/page/localisation', {
    results: searchResult.length,
    searchUser: req.searchUser,
    floor: req.floor,
    numberPlace: req.numberPlace
  });
})

router.get('/page', search, (res, req) => {
  let searchResult = req.searchResult;
  res.render('/page/results', {
    results : searchResult.length,
    searchTerm: req.searchTerm,
    searchResult: searchResult
  });
})

router.put('/', (req, res) => {
  const avaible = req.body;
  const idPark = req.params.id;

  connection.query('UPDATE park SET ? WHERE avaible = ?', [avaible, idPark], err => {
    if(err) {
      res.status(500).send('Erreur lors de la modification de place de parking');
    } else {
      res.status(200);
    }
  })
})

router.delete('/', (req, res) => {

  const place = req.query.place

  connection.query(`DELETE FROM park INNER JOIN user ON idUser = user_idUser WHERE avaible = 'indisponible'`, [name], (err, results)  => {
    if (err) {
      res.status(500).send('Erreur lors de la suppression de la place de parking');
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;