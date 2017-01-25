angular.module('chatApp')
.controller('ModalInstanceCtrl', ModalInstanceCtrl);

ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'user'];

function ModalInstanceCtrl ($scope, $uibModalInstance, user){
    $scope.user = user;
    console.log("ModalInstanceController user: ", $scope.user.displayName);

    this.ok = function () {
        $uibModalInstance.close($scope.user);
    };

    this.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};