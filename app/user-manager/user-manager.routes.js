'use strict';

(function () {

    angular.module('edata')
            .config(configure);

    configure.$inject = ['$routeProvider'];

    function configure($routeProvider, EGL_CONSTANTS) {
        $routeProvider.when('/newUser', {
          templateUrl: './app/user-manager/templates/create.view.html',
          controller: 'UserManagerController',
          controllerAs: 'vm'
        });
        $routeProvider.when('/editUser/:userId?', {
          templateUrl: './app/user-manager/templates/edit.view.html',
          controller: 'UserManagerController',
          controllerAs: 'vm'
        });
        $routeProvider.when('/userList', {
          templateUrl: './app/user-manager/templates/users.view.html',
          controller: 'UserManagerController',
          controllerAs: 'vm'
        });
    }
})();
