'use strict';

(function() {

  angular.module('edata.userManager')
    .service('UserManagerService', UserManagerService);


  function UserManagerService(PouchDBFactory, $location, UserFactory, uuid, md5, $http) {

    this.editUser = function(userId, vm) {
      if (userId !== undefined) {

        PouchDBFactory.findById(userId).then(function(data) {
          vm.user = data;
          vm.user.expireDate = new Date(data.expireDate)
        });
      }
    }

    this.updateUser = function(user) {
      PouchDBFactory.save(user);
      $location.path("/editUser/" + user._id);
    }

    this.saveUser = function(vm) {
      var user = UserFactory.make(vm.user, uuid.v4())
      PouchDBFactory.save(user);
      vm.user = UserFactory.getEmptyUser();
    }

    this.fetchUsers = function(vm) {
      PouchDBFactory.getAll().then(function (res) {
        res.rows.forEach(function (element) {
          vm.users.push(element.doc)
        })
      });
    }

    this.sendData = function(token, users) {
      var header = {
        headers: {'token': token}
      }

      $http.put(UserFactory.getApiUrl()+'user', JSON.stringify(users), header).then(function (response) {
        console.log(response.data)
      })
    }

    this.sendUsersToApi = function (users) {
      var self = this
      UserFactory.getToken(users).then(function (token) {
        self.sendData(token, users)
      })
    }

  }
})();
