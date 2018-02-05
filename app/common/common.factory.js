(function() {
  'use strict';

  angular.module('edata.common')
    .factory("PouchDBFactory", PouchDBFactory)

  function PouchDBFactory(pouchDB) {

    var db = createDatabase();

    var service = {
      createDatabase: createDatabase,
      findById: findById,
      getAll: getAll,
      save: save
    };

    return service;

    function createDatabase(name = 'db1') {
      return pouchDB(name);
    }

    function findById(id) {
      return db.get(id, function(err, doc) {
        if (err) {
          return console.log(err);
        } else {
          return doc;
        }
      });
    }

    function getAll() {
      return db.allDocs({include_docs: true}, function(err, doc) {
        if (err) {
          return console.log(err);
        } else {
          return doc;
        }
      });
    }

    function save(doc) {
      db.put(doc, function(err, doc) {
        if (err) {
          return console.log(err);
        } else {
          console.log("Document created Successfully");
        }
      });
    }
  }
})();
