angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };

        // Form data for the login modal
        $scope.loginData = {};
        $scope.isExpanded = false;
        $scope.hasHeaderFabLeft = false;
        $scope.hasHeaderFabRight = false;

        var navIcons = document.getElementsByClassName('ion-navicon');
        for (var i = 0; i < navIcons.length; i++) {
            navIcons.addEventListener('click', function () {
                this.classList.toggle('active');
            });
        }

        ////////////////////////////////////////
        // Layout Methods
        ////////////////////////////////////////

        $scope.hideNavBar = function () {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
        };

        $scope.showNavBar = function () {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
        };

        $scope.noHeader = function () {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }
        };

        $scope.setExpanded = function (bool) {
            $scope.isExpanded = bool;
        };

        $scope.setHeaderFab = function (location) {
            var hasHeaderFabLeft = false;
            var hasHeaderFabRight = false;

            switch (location) {
                case 'left':
                    hasHeaderFabLeft = true;
                    break;
                case 'right':
                    hasHeaderFabRight = true;
                    break;
            }

            $scope.hasHeaderFabLeft = hasHeaderFabLeft;
            $scope.hasHeaderFabRight = hasHeaderFabRight;
        };

        $scope.hasHeader = function () {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (!content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }

        };

        $scope.hideHeader = function () {
            $scope.hideNavBar();
            $scope.noHeader();
        };

        $scope.showHeader = function () {
            $scope.showNavBar();
            $scope.hasHeader();
        };

        $scope.clearFabs = function () {
            var fabs = document.getElementsByClassName('button-fab');
            if (fabs.length && fabs.length > 1) {
                fabs[0].remove();
            }
        };
    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    })

    .controller('LoginCtrl', function ($scope, $timeout, $stateParams, ionicMaterialInk) {
        $scope.$parent.clearFabs();
        $timeout(function () {
            $scope.$parent.hideHeader();
        }, 0);
        ionicMaterialInk.displayEffect();
    })

    .controller('FriendsCtrl', function ($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.$parent.setHeaderFab('left');

        // Delay expansion
        $timeout(function () {
            $scope.isExpanded = true;
            $scope.$parent.setExpanded(true);
        }, 300);

        // Set Motion
        ionicMaterialMotion.fadeSlideInRight();

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('ProfileCtrl', function ($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function () {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function () {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('ActivityCtrl', function ($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab('right');

        $timeout(function () {
            ionicMaterialMotion.fadeSlideIn({
                selector: '.animate-fade-slide-in .item'
            });
        }, 200);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();
    })

    .controller('GalleryCtrl', function ($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(false);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
            selector: '.push-down'
        });
        ionicMaterialMotion.fadeSlideInRight({
            selector: '.animate-fade-slide-in .item'
        });

    })

    .controller('AddIdeaCtrl', function ($scope, $stateParams, $http, $state, $timeout) {

        $scope.data = {};

        $scope.submitIdea = function () {

            var data = {
                appbundle_idea: {
                    description: $scope.data.description,
                    price: $scope.data.price,
                    category: 1,
                    status: 1,
                    author: $scope.data.author
                }
            };
            $http.post('http://idea.andrey.ekreative.com/app_dev.php/api/idea/add', data).success(function (data) {
                console.log(data);
                $state.go('app.ideas');
            });
        }

    })

    .controller('IdeasCtrl', function ($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $http, $ionicLoading) {

        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(false);

        $scope.data = {};
        $scope.ideas = [];
        $scope.show = false;

        $scope.$on('$stateChangeSuccess', function () {
            //$ionicLoading.show({
            //    template: '<div class="loader"><svg class="circular"&gt;&lt;circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"</svg></div>'
            //});
            $ionicLoading.show();
            $scope.show = false;

            $http.get('http://idea.andrey.ekreative.com/app_dev.php/api/idea/list').
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.ideas = data;
                    console.log(data);

                    $scope.show = true;

                    // Activate ink for controller
                    ionicMaterialInk.displayEffect();

                    ionicMaterialMotion.pushDown({
                        selector: '.push-down'
                    });
                    ionicMaterialMotion.fadeSlideInRight({
                        selector: '.animate-fade-slide-in .item'
                    });

                    $ionicLoading.hide();
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log(data);
                    $ionicLoading.hide();
                });

        });

        $scope.addLike = function (idea) {
            $http.post('http://idea.andrey.ekreative.com/app_dev.php/api/idea/'+idea.id+'/like', {}).success(function (data) {
                idea.likes = idea.likes+1;
            });
        };

        $scope.addDislike = function (idea) {
            $http.post('http://idea.andrey.ekreative.com/app_dev.php/api/idea/'+idea.id+'/dislike', {}).success(function (data) {
                idea.dislikes = idea.dislikes+1;
            });
        };

    })

    .controller('IdeaCtrl', function ($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http, $ionicLoading) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);


        $scope.$on('$stateChangeSuccess', function () {
            //$ionicLoading.show({
            //    template: '<div class="loader"><svg class="circular"&gt;&lt;circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"</svg></div>'
            //});
            $ionicLoading.show();

            $scope.show = false;

            $http.get('http://idea.andrey.ekreative.com/app_dev.php/api/idea/item/' + $stateParams.ideaId).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.idea = data;

                    console.log(data);

                    $scope.show = true;

                    // Set Motion
                    $timeout(function () {
                        ionicMaterialMotion.slideUp({
                            selector: '.slide-up'
                        });
                    }, 300);

                    $timeout(function () {
                        ionicMaterialMotion.fadeSlideInRight({
                            startVelocity: 3000
                        });
                    }, 700);

                    // Set Ink
                    ionicMaterialInk.displayEffect();
                    $ionicLoading.hide();

                    $http.get('http://idea.andrey.ekreative.com/app_dev.php/api/idea/' + $stateParams.ideaId + '/comment/list').
                        success(function (data, status, headers, config) {
                            $scope.comments = data;
                        }).
                        error(function (data, status, headers, config) {
                        });

                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log(data);
                    $ionicLoading.hide();
                });

        })

    })

    .controller('AddCommentCtrl', function ($scope, $stateParams, $http, $state) {

        $scope.data = {};

        $scope.submitComment = function () {

            var data = {
                appbundle_comment: {
                    text: $scope.data.text,
                    author: $scope.data.author,
                    idea: $stateParams.ideaId
                }
            };
            $http.post('http://idea.andrey.ekreative.com/app_dev.php/api/idea/'+$stateParams.ideaId+'/comment/add', data).success(function (data) {
                console.log(data);
                $state.go('app.idea',{'ideaId': $stateParams.ideaId});
            });
        }

    });
