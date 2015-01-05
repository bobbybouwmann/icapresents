// public/directives/common.js

/**
 * Expose common directives
 */
(function(){
    angular.module('common-directives', [])
        .directive('redir', ['$http', function ($http) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.on('click', function (e) {
                        e.preventDefault();
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
        .directive('menusideright', ['$http', function ($http) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.on('click', function (e) {
                        e.preventDefault();
                        $('body').toggleClass('menu-open-right');
                    })
                }
            };
        }])
        .directive('logout', ['$http', function ($http) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.on('click', function (e) {
                        e.preventDefault();
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
                                img.setAttribute('className', "image select-image");

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
                        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'sep', 'fontFamily', 'fontSize', 'sep', 'color', 'blockStyle', 'align', 'sep', 'insertOrderedList', 'insertUnorderedList', 'sep', 'selectAll', 'undo', 'redo', 'removeFormat', 'sep', 'insertHorizontalRule', 'table']
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
                        buttons: ['bold', 'italic', 'underline', 'fontFamily']
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

                        if (linkByUser.indexOf('watch?v=') > -1) {
                            youtubeLink = '//www.youtube.com/embed/' + linkByUser.substr(linkByUser.indexOf('watch?v=') + 8);
                        } else {
                            youtubeLink = linkByUser;
                        }

                        console.log(youtubeLink);

                        var html = '<div class="embed-container"><iframe src="' + youtubeLink + '" frameborder="0" allowfullscreen></iframe></div>';
                        
                        $('#update-to-youtube').html(html);
                        $('#youtubeModal').modal('hide');

                        return false;
                    });
                }
            };
        }])
        .directive('updatecontent', ['$http', function ($http) {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    $('#save-project').on('click', function (e) {
                        e.preventDefault();

                        $scope.formData.banner = $('.header-image .image img').attr('src');
                        console.log('Logo: ' + $('.project-logo .image img').attr('src'));
                        $scope.formData.logo = $('.project-logo .image img').attr('src');
                        $scope.formData.title = $('#simpleedit .froala-element p').text();
                        $scope.formData.content = $('#project-content').html();
                        $scope.formData.semesterid = $('#projectsemester option:selected').val();
                        $scope.$apply();

                        $http.post('/api/projects', $scope.formData)
                            .success (function (data) {
                                console.log(data);
                            })
                            .error (function (data) {
                                console.log("error: " + data);
                            });                        

                        return false;
                    });
                }
            };
        }])
        .directive('updateeditcontent', ['$http', '$location', function ($http, $location) {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    $('#save-project').on('click', function (e) {
                        e.preventDefault();

                        var content = $('#project-content').html();
                        content = content.replace(new RegExp('src="images/uploads/'.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), 'src="localhost:3000/images/uploads/');

                        $scope.project.banner = $('.header-image .image img').attr('src');
                        $scope.project.logo = $('.project-logo .image img').attr('src');
                        $scope.project.title = $('#simpleedit .froala-element p').text();
                        $scope.project.semesterid = $('#projectsemester option:selected').val();
                        $scope.project.content = $('#project-content').html();
                        $scope.$apply();

                        console.log($scope.project);

                        $http.put('/api/projects/' + $scope.project._id, $scope.project)
                            .success (function (data) {
                                $location.path('/projects');
                            })
                            .error (function (data){
                                console.log("error: " + data);
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
        }]);
})();
