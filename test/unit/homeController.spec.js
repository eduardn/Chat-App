describe("testing home controller", function () {
    beforeEach(module('ui.router'));
    beforeEach(module('firebase'));
    beforeEach(module('chatApp'));
    var $controller;
    var config = {
        apiKey: "AIzaSyD_4mJEqBj73LNaSakhTmJyusbNumAXPsM",
        authDomain: "mirc-67e54.firebaseapp.com",
        databaseURL: "https://mirc-67e54.firebaseio.com",
        storageBucket: "mirc-67e54.appspot.com",
        messagingSenderId: "94467643559"
    };
    firebase.initializeApp(config);
    var scope, location, httpBackend, state, stateParams, loginService, fb;

    beforeEach(inject(function (_$controller_, _$rootScope_, _$location_, _$injector_, _$state_, _$stateParams_, _loginService_) {
        $controller = _$controller_;
        scope = _$rootScope_;
        location = _$location_;
        state = _$state_;
        httpBackend = _$injector_.get('$httpBackend');
        stateParams = _$stateParams_;
        loginService = _loginService_;
        // _$localStorage_ = _$localStorage_;
        httpBackend
            .whenGET(/index\/.*\//)
            .respond(200, {});

    }));

    describe("check controller is initialized", function () {
        it("checks variables to be defined", function () {
            var homeController = $controller('HomeController', {
                $scope: scope,
                $state: state,
                $stateParams: stateParams,
                loginService: loginService
            });
            expect(scope.login).toBeDefined();

        });
        it('check if login is defined', function () {
            var homeController = $controller('HomeController', {
                $scope: scope,
                $state: state,
                $stateParams: stateParams,
                loginService: loginService
            });
            expect(scope.login).toBeDefined();
        })


    });

    // describe('check login', function () {
    //
    //
    //
    //     it("should login", function () {
    //
    //         var parent = $rootScope;
    //         var child = parent.$new();
    //
    //         parent.salutation = "Hello";
    //         console.log(scope);
    //         expect(scope.username).toEqual('ancutza_draguta');
    //     });
    // })

});