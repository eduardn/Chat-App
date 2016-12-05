describe("testing index controller", function() {
    beforeEach(module('chatApp'));

    var $controller;
    var scope;
    var location, byDateFilter;
    var $filter, $compile;

    beforeEach(inject(function(_$controller_, _$rootScope_, _$location_, _$injector_, $filter, $compile) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        scope = _$rootScope_;
        location = _$location_;
        createFilter = $filter;

        scope = _$rootScope_.$new();

        // Compile some HTML that uses the directive
        element = $compile('<create-room></create-room>')(scope);

    }));


    describe("check controller is initialized", function() {
        it("checks name to exist", inject(function($controller) {
            var indexController = $controller('ChatController', { $scope: scope });
            console.log('check if directive exists');
            expect(element).toBeDefined();
            console.log('it exists');
        }));
    })

});