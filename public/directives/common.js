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
                                var div = document.createElement('div');
                                div.className = 'image';

                                var img = document.createElement('img');
                                img.setAttribute('src', data.path.substring(7));

                                div.appendChild(img);

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

                        $scope.formData.content = $('#project-content').html();
                        $scope.$apply();

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

                            var content = scope.project.content.replace(new RegExp('images/uploads/'.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), '/images/uploads/');
                            $(element).html(content);
                        }
                    });
                }
            };
        }]);    
})();
