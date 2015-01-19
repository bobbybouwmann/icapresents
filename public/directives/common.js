// public/directives/common.js

/**
 * Expose common directives
 */
(function(){

    angular.module('directives', [])
    
        .directive('redir', ['$http', function ($http) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.on('click', function (e) {
                        e.preventDefault();
                        $('.modal').modal('hide');
                        window.location = attrs.href;
                    });
                }
            };
        }])
        .directive('menuside', ['$http', function ($http) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.on('click', function (e) {
                        e.preventDefault();
                        $('body').toggleClass('menu-open');
                    })
                }
            };
        }])
        .directive('logout', ['$http', '$rootScope', function ($http, $rootScope) {
            return {
                restrict: 'A',
                link: function($scope, element, attrs) {
                    element.on('click', function (e) {
                        e.preventDefault();
                        $rootScope.loggedin = false;
                        $http.post('/logout');
                    });
                }
            };
        }])
        .directive('uploadimageform', ['$http', function ($http) {
            return {
                restrict: 'AEC',
                link: function ($scope, element, attrs) {
                    $("#imageform").submit(function(e) {
                        e.preventDefault();

                        var formData = new FormData($(this)[0]);

                        $.ajax({
                            url: "/upload",
                            type: "POST",
                            data: formData,
                            async: false,
                            success: function (data) {
                                var img = document.createElement('img');
                                img.setAttribute('src', 'http://localhost:3000/' + data.path.substring(7));
                                img.className = 'image image select-image';

                                $('#update-to-picture').html(img);
                                $('#imageModal').modal('hide');
                            },
                            cache: false,
                            contentType: false,
                            processData: false
                        });

                        return false;
                    });
                }
            };
        }])
        .directive('uploadbanner', ['$http', function ($http) {
            return {
                restrict: 'AEC',
                link: function ($scope, element, attrs) {
                    $('.bannerform').submit(function (e) {
                        e.preventDefault();

                        var formData = new FormData($(this)[0]);

                        $.ajax({
                            url: "/upload",
                            type: "POST",
                            data: formData,
                            async: false,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (data) {
                                var div = document.createElement('div');
                                div.className = 'image select-image project-banner-background';
                                div.style.backgroundImage = 'url("http://localhost:3000/' + data.path.substring(7) + '")';
                                div.style.backgroundSize = 'cover';
                                div.style.backgroundRepeat = 'no-repeat';
                                div.style.backgroundPosition = '50% 50%';
                                div.style.width = '100%';
                                div.style.height = '300px';

                                $('#update-to-picture').html(div);
                                $('#bannerModal').modal('hide');
                            }
                        });
                    });
                }
            };
        }])
        .directive('uploadlogo', ['$http', function ($http) {
            return {
                restrict: 'AEC',
                link: function ($scope, element, attrs) {
                    $('.logoform').submit(function (e) {
                        e.preventDefault();

                        var formData = new FormData($(this)[0]);

                        $.ajax({
                            url: "/upload",
                            type: "POST",
                            data: formData,
                            async: false,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (data) {
                                var div = document.createElement('div');
                                div.className = 'image select-image project-logo-background';
                                div.style.backgroundImage = 'url("http://localhost:3000/' + data.path.substring(7) + '")';
                                div.style.backgroundSize = 'cover';
                                div.style.backgroundRepeat = 'no-repeat';
                                div.style.backgroundPosition = '50% 50%';
                                div.style.borderRadius = '50%';
                                div.style.position = 'absolute';
                                div.style.margin = 0;
                                div.style.left = 'calc(50% - 100px)';
                                div.style.top = '-110px';
                                div.style.width = '200px';
                                div.style.height = '200px';

                                $('#update-to-picture').html(div);
                                $('#logoModal').modal('hide');
                            }
                        })

                        return false;
                    }); 
                }
            };
        }])
        .directive('uploadimageprofileform', ['$http', function ($http) {
            return {
                restrict: 'AEC',
                link: function ($scope, element, attrs) {
                    $("#imageform").submit(function(e) {
                        e.preventDefault();

                        var formData = new FormData($(this)[0]);

                        $.ajax({
                            url: "/upload",
                            type: "POST",
                            data: formData,
                            async: false,
                            success: function (data) {
                                var div = document.createElement('div');
                                div.className = 'image select-image profile-logo-background';
                                div.style.backgroundImage = 'url("http://localhost:3000/' + data.path.substring(7) + '")';
                                div.style.backgroundSize = 'cover';
                                div.style.backgroundRepeat = 'no-repeat';
                                div.style.backgroundPosition = '50% 50%';
                                div.style.borderRadius = '50%';
                                div.style.position = 'absolute';
                                div.style.margin = 0;
                                div.style.left = 'calc(50% - 100px)';
                                div.style.top = '150px';
                                div.style.width = '200px';
                                div.style.height = '200px';

                                $('#update-to-picture').html(div);
                                $('#imageModal').modal('hide');
                            },
                            cache: false,
                            contentType: false,
                            processData: false
                        });

                        return false;
                    });
                }
            };
        }])
        .directive('textform', ['$http', function ($http) {
            return {
                restrict: 'AEC',
                link: function ($scope, element, attrs) {
                    $('#edit').editable({
                        inlineMode: false,
                        placeholder: 'Start typing something awesome!',
                        toolbarFixed: false,
                        shortcuts: true,
                        minHeight: 200,
                        shortcutsAvailable: ['bold', 'italic', 'underline'],
                        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'sep', 'fontFamily', 'fontSize', 'sep', 'color', 'blockStyle', 'align', 'sep', 'insertOrderedList', 'insertUnorderedList', 'sep', 'selectAll', 'undo', 'redo', 'removeFormat', 'sep', 'insertHorizontalRule', 'table'],
                        fontList: {
                            "'Droid Serif', serif": "Droid Serif",
                            "'Roboto Slab', serif": "Roboto Slab",
                            "'Kameron', serif": "Kameron",
                            "'Roboto', sans-serif": "Roboto",
                            "'Source Sans Pro', sans-serif": "Source Sans Pro",
                            "'Raleway', sans-serif": "Raleway",
                            "'Cabin', sans-serif": "Cabin"
                        }
                    });
                }
            };
        }])
        .directive('simpletextform', ['$http', function ($http) {
            return {
                restrict: 'AEC',
                link: function ($scope, element, attrs) {
                    $('#simpleedit').editable({
                        inlineMode: true,
                        placeholder: 'Type your awesome project name!',
                        buttons: ['bold', 'italic', 'underline', 'fontFamily']
                    });
                }
            };
        }])
        .directive('simpledescriptionform', ['$http', function ($http) {
            return {
                restrict: 'AEC',
                link: function ($scope, element, attrs) {
                    $('#simpledescription').editable({
                        inlineMode: true,
                        placeholder: 'Type your awesome description!',
                        buttons: ['bold', 'italic', 'underline', 'fontFamily']
                    });
                }
            };
        }])
        .directive('firstnameform', ['$http', function ($http) {
            return {
                restrict: 'AEC',
                link: function ($scope, element, attrs) {
                    var unwatch = $scope.$watch('user', function (value) {
                        if (value) {
                            unwatch();

                            $('#firstnameedit').editable({
                                inlineMode: true,
                                plainPaste: true,
                                placeholder: 'Typ your firstname',
                                buttons: []
                            });

                            $("#firstnameedit").editable('setHTML', '<p>' + $scope.user.firstname + '</p>', false);
                            $("#firstnameedit").editable('checkPlaceholder');
                        }
                    });
                }
            };
        }])
        .directive('lastnameform', ['$http', function ($http) {
            return {
                restrict: 'AEC',
                link: function ($scope, element, attrs) {
                    var unwatch = $scope.$watch('user', function (value) {
                        if (value) {
                            unwatch();

                            $('#lastnameedit').editable({
                                inlineMode: true,
                                plainPaste: true,
                                placeholder: 'Typ your lastname',
                                buttons: []
                            });

                            $("#lastnameedit").editable('setHTML', '<p>' + $scope.user.lastname + '</p>', false);
                            $("#lastnameedit").editable('checkPlaceholder');
                        }
                    });
                }
            };
        }])
        .directive('bioform', ['$http', function ($http) {
            return {
                restrict: 'AEC',
                link: function ($scope, element, attrs) {
                    var unwatch = $scope.$watch('user', function (value) {
                        if (value) {
                            unwatch();

                            $('#bioedit').editable({
                                inlineMode: false,
                                placeholder: 'Typ your awesome bio here!',
                                toolbarFixed: false,
                                shortcuts: true,
                                minHeight: 200,
                                shortcutsAvailable: ['bold', 'italic', 'underline'],
                                buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'sep', 'fontFamily', 'fontSize', 'sep', 'color', 'blockStyle', 'align', 'sep', 'insertOrderedList', 'insertUnorderedList', 'sep', 'selectAll', 'undo', 'redo', 'removeFormat', 'sep', 'insertHorizontalRule', 'table']
                            });

                            $("#bioedit").editable('setHTML', $scope.user.bio, false);
                            $("#bioedit").editable('checkPlaceholder');
                        }
                    });
                }
            };
        }])
        .directive('uploadtextform', ['$http', function ($http) {
            return {
                restrict: 'AEC',
                link: function ($scope, element, attrs) {
                    $('#submittextform').click(function (e) {
                        e.preventDefault();

                        $('#update-to-text').html($('#edit').editable('getHTML', true, true));
                        $('#edit').editable('setHTML', '', false);
                        $('#textModal').modal('hide');

                        return false;
                    });
                }
            };
        }])
        .directive('uploadyoutubeform', ['$http', function ($http) {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    $('#submityoutubeform').click(function (e) {
                        e.preventDefault();

                        var youtubeLink, linkByUser = $('#youtubeinput').val();

                        if (linkByUser != '') {
                            if (linkByUser.indexOf('watch?v=') > -1) {
                                youtubeLink = '//www.youtube.com/embed/' + linkByUser.substr(linkByUser.indexOf('watch?v=') + 8, 11);
                            } else {
                                youtubeLink = linkByUser;
                            }

                            var html = '<div class="embed-container"><div class="actions"><a href="#" data-toggle="modal" data-target="#youtubeModal" class="update-to-youtube"><i class="fa fa-pencil-square-o"></i></a><a href="#" class="remove-youtube"><i class="fa fa-trash"></i></a></div><iframe src="' + youtubeLink + '" frameborder="0" allowfullscreen></iframe></div>';
                            
                            $('#update-to-youtube').html(html);
                            $('#youtubeModal').modal('hide');
                        }

                        $('#youtubeModal').modal('hide');

                        return false;
                    });
                }
            };
        }])
        .directive('saveproject', ['$http', '$location', function ($http, $location) {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    $('#save-project').on('click', function (e) {
                        e.preventDefault();

                        if ($('#simpleedit .froala-element p').text() == '') {
                            $('.error-title').show();
                            $('#simpleedit .fr-placeholder').css('color', '#e74c3c');
                            $('#simpleedit .froala-wrapper').css('borderBottom', '1px solid #e74c3c');
                        } else if ($('#projectsemester option:selected').val().length == '0') {
                            $('.error-semester').show();
                            $('#projectsemester').css('borderColor', '#e74c3c');
                        } else {
                            $('#simpleedit .fr-placeholder').css('color', '');
                            $('#simpleedit .froala-wrapper').css('borderBottom', '');
                            $('#projectsemester').css('borderColor', '');

                            var logo = $('.project-logo .project-logo-background').css('background-image');
                            logo = logo.replace('url(', '').replace(')', '');

                            var banner = $('.project-banner .project-banner-background').css('background-image');
                            banner = banner.replace('url(', '').replace(')', '');

                            $scope.formData.logo = logo;
                            $scope.formData.banner = banner;
                            $scope.formData.title = $('#simpleedit .froala-element p').text();
                            $scope.formData.description = $('#simpledescription .froala-element p').text();
                            $scope.formData.content = $('#project-content').html();
                            $scope.formData.semesterid = $('#projectsemester option:selected').val();
                            $scope.$apply();

                            $http.post('/api/projects', $scope.formData)
                                .success (function (data) {
                                    $location.path('/profile');
                                })
                                .error (function (data) {
                                    console.log("error: " + data);
                                });                        
                        }

                        return false;
                    });
                }
            };
        }])
        .directive('saveeditproject', ['$http', '$location', function ($http, $location) {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    $('#save-project').on('click', function (e) {
                        e.preventDefault();

                        if ($('#simpleedit .froala-element p').text() == '') {
                            $('.error-title').show();
                            $('#simpleedit .fr-placeholder').css('color', '#e74c3c');
                            $('#simpleedit .froala-wrapper').css('borderBottom', '1px solid #e74c3c');
                        } else {
                            var content = $('#project-content').html();
                            content = content.replace(new RegExp('src="images/uploads/'.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), 'src="localhost:3000/images/uploads/');

                            var logo = $('.project-logo-background').css('background-image');
                            logo = logo.replace('url(', '').replace(')', '');

                            var banner = $('.project-banner-background').css('background-image');
                            banner = banner.replace('url(', '').replace(')', '');

                            $scope.project.logo = logo;
                            $scope.project.banner = banner;
                            $scope.project.title = $('#simpleedit .froala-element p').text();
                            $scope.project.description = $('#simpledescription .froala-element p').text();
                            $scope.project.semesterid = $('#projectsemester option:selected').val();
                            $scope.project.content = $('#project-content').html();
                            $scope.$apply();

                            $http.put('/api/projects/' + $scope.project._id, $scope.project)
                                .success (function (data) {
                                    $location.path('/profile');
                                })
                                .error (function (data){
                                    console.log("error: " + data);
                                });
                        }

                        return false;
                    });
                }
            };
        }])
        .directive('deleteeditproject', ['$http', '$location', function ($http, $location) {
            return {
                restrict: 'AEC',
                link: function ($scope, element, attrs) {
                    $('#delete-project').on('click', function (e) {
                        e.preventDefault();

                        $http.delete('/api/projects/' + $scope.project._id)
                            .success (function (data) {
                                $location.path('/profile');
                            })
                            .error (function (data) {
                                console.log('error: ' + data);
                            });

                        return false;
                    });
                }
            };
        }])
        .directive('showcontent', ['$http', function ($http) {
            return {
                restrict: 'AEC',
                link: function (scope, element, attrs) {
                    var unwatch = scope.$watch('project', function (value) {
                        if (value) {
                            unwatch();

                            var content = scope.project.content.replace(new RegExp('src="images/uploads/'.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), 'src="/images/uploads/');
                            content = content.replace(new RegExp('contenteditable="true"'.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), 'contenteditable="false"');
                            content = content.replace(new RegExp('{{ project._id }}'.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), scope.project._id);
        
                            $(element).html(content);
                        }
                    });
                }
            };
        }])
        .directive('showeditcontent', ['$http', function ($http) {
            return {
                restrict: 'AEC',
                link: function (scope, element, attrs) {
                    var unwatch = scope.$watch('project', function (value) {
                        if (value) {
                            unwatch();

                            var content = scope.project.content.replace(new RegExp('src="images/uploads/'.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), 'src="/images/uploads/');
                            content = content.replace(new RegExp('formData'.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), 'project');

                            $(element).html(content);
                        }
                    });
                }
            };
        }])
        .directive('registeruser', ['$http', '$location', function ($http, $location) {
            return {
                restrict: 'AEC',
                link: function ($scope, element, attrs) {
                    $('#register-user').on('click', function (e) {
                        e.preventDefault();

                        $http.post('/signup', $scope.formData)
                            .success(function(data) {
                                if (jQuery.isEmptyObject(data)) {
                                    $('.modal').hide();
                                    $location.path('/profile');
                                }
                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                            });

                        return false;
                    });
                }
            };
        }])
        .directive('loginuser', ['$http', '$location', function ($http, $location) {
            return {
                restrict: 'AEC',
                link: function ($scope, element, attrs) {
                    $('#login-user').on('click', function (e) {
                        e.preventDefault();

                        $http.post('/login', $scope.formData)
                            .success(function(data) {
                                if (jQuery.isEmptyObject(data)) {
                                    $('.modal').hide();
                                    $location.path('/profile');
                                }
                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                            });

                        return false;
                    });
                }
            };
        }])
        .directive('saveportfolio', ['$http', '$location', function ($http, $location) {
            return {
                restrict: 'AEC',
                link: function ($scope, element, attrs) {
                    $('#save-portfolio').on('click', function (e) {
                        e.preventDefault();

                        var picture = $('.profile-logo-background').css('background-image');
                        picture = picture.replace('url(', '').replace(')', '');

                        $scope.user.profileid = $('.select-profile option:selected').val();
                        $scope.user.picture = picture
                        $scope.user.firstname = $("#firstnameedit").editable('getText');
                        $scope.user.lastname = $("#lastnameedit").editable('getText');
                        $scope.user.bio = $("#bioedit").editable('getHTML', true, true);

                        $http.put('/api/users/' + $scope.user._id, $scope.user)
                            .success (function (data) {
                                $location.path('/profile');
                            })
                            .error (function (data) {
                                console.log('error: ' + data);
                            })

                        return false;
                    });
                }
            };
        }])
        .directive('showbio', ['$http', function ($http) {
            return {
                restrict: 'AEC',
                link: function ($scope, element, attrs) {
                    var unwatch = $scope.$watch('user', function (value) {
                        if (value) {
                            unwatch();

                            $(element).html($scope.user.bio);
                        }
                    });
                }
            };
        }]);
})();
