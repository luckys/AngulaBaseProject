'use strict';

(function() {

  angular.module('edata.userManager')
    .factory('UserFactory', UserFactory)

    function UserFactory($http, md5) {

      var service = {
        make: make,
        getEmptyUser: getEmptyUser,
        getStatus: getStatus,
        getApiUrl: getApiUrl,
        getToken: getToken
      };

      return service;

      function make (attributes, id) {
          var user = {
            _id: 'USER_' + id,
            expireDate: attributes.expireDate,
            firstname: attributes.firstname,
            lastname: attributes.lastname,
            status: attributes.status,
          }
          return user;
        }

        function getEmptyUser () {
          var user = {
            expireDate: '',
            firstname: '',
            lastname: '',
            status: '',
          }
          return user;
        }

        function getStatus () {
          return ['Active', 'Blocked', 'Deleted'];
        }

        function getApiUrl () {
          return "https://sheltered-eyrie-45132.herokuapp.com/";
        }

       function getToken(users) {
         var api = this.getApiUrl()+'getToken';
         var data = {
           'hash': md5.createHash(JSON.stringify(users))
         };

         return $http.post(api, data).then(function (response) {
           return response.data;
         })
        }
      }
})();
