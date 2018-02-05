'use strict';

(function() {

  angular.module('edata.userManager', ['angular-uuid', 'angular-md5'])
    .controller('UserManagerController', UserManagerController);

  UserManagerController.$inject = ['UserFactory', 'UserManagerService', 'PouchDBFactory', '$routeParams'];

  function UserManagerController(UserFactory, UserManagerService, PouchDBFactory, $routeParams) {
    var vm = this;

    vm.userStatus = UserFactory.getStatus();

    vm.users = [];
    vm.statusFilter = '';

    vm.submitForm = function(form) {
      if (form.$invalid) {
        return;
      }

      UserManagerService.saveUser(vm);
    }

    UserManagerService.editUser($routeParams.userId, vm);

    vm.updateForm = function(form) {
      if (form.$invalid) {
        return;
      }

      UserManagerService.updateUser(vm.user);
    }

    vm.sendUsersToApi = function () {
      UserManagerService.sendUsersToApi(vm.users)
    }

    UserManagerService.fetchUsers(vm);
  }
})();
