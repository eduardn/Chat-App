describe("testing home controller", function(){
    beforeEach(module('chatApp'));
    var $controller;
    var scope;

    beforeEach(inject(function(_$controller_, _$rootScope_, _$location_, _$injector_){
        $controller = _$controller_;
        scope = _$rootScope_;
        location = _$location_;
        httpBackend = _$injector_.get('$httpBackend');


        httpBackend
            .whenGET(/index\/.*\//)
            .respond(200, {});

    }));

    describe("check controller is initialized", function(){

        it("checks variables to be defined",  function(){
            var homeController = $controller('HomeController',{$scope: scope});
            expect(scope.name).toBeDefined();
        });

    });

})