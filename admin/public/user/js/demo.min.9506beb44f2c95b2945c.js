! function() {
    "use strict";
    
    angular.module("redeemar-app", ["app.constants", "ngRoute", "ngAnimate", "ngSanitize", "angular.mdl", "ml.chat", "ml.menu", "ml.svg-map", "ml.todo", "ui.select", "ngFileUpload", "ngWig", "pikaday", "ngPlaceholders", "ngTable", "uiGmapgoogle-maps", "gridshore.c3js.chart", "angularGrid", "LocalStorageModule" , "campaign-app", "inventory-app", "product-app", "logo-app", "repo-app", "promotion-app", "partnersetting-app", "video-app"])
}(),
function() {
    "use strict";
   

    function a(a,file_path) {
        var site_path=$("#site_path").val();        
        a.when("/", {
            templateUrl: site_path+"user/dashboard.html"
        }).when("/:folder/:tpl", {
            templateUrl: function(a) {          
                return site_path+"user/" + a.folder + "/" + a.tpl + ".html"
            }
        }).when("/:tpl", {
            templateUrl: function(a) {    
                return site_path+"user/" + a.tpl + ".html"
            }
        }).otherwise({
            redirectTo: "/"
        })
    }



    function b(a) {}
    angular.module("redeemar-app").config(["$routeProvider", a]).run(["$route", b])
}(),
function() {
    "use strict";

    function a(a, b) {
        a.APP = b
    }

    function b(a, b) {
        a.$on("$viewContentLoaded", function(a) {
            b(function() {
                var a = document.querySelector(".mdl-layout");
                a.classList.add("mdl-js-layout"), componentHandler.upgradeElement(a, "MaterialLayout")
            })
        })
    }

    function c(a) {
        a.configure({
            v: "3.17",
            libraries: "weather,geometry,visualization"
        })
    }
    angular.module("redeemar-app").run(["$rootScope", "APP", a]).run(["$rootScope", "$timeout", b]).config(["uiGmapGoogleMapApiProvider", c])
}(), angular.module("app.constants", []).constant("APP", {
        version: "1.0.0"
    }),
    function() {
        "use strict";
        function a(a,h) {
            a.onPikadaySelect = function(a, b, h) {
                var c = new Event("input");
                a._o.field.dispatchEvent(c)
            }            

            setInterval(function(){
                //alert("Hello")
                h.post("../admin/dashboard/checklogin").success(function(login_check){              
                    if(login_check!='login')
                    {         
                        window.location.href='../auth/login';
                    }       
                });
            },30000); 
             
           // h.post("../admin/dashboard/checklogin").success(function(login_response){
              //alert(login_response);
              //if(login_response=="logout")
              //{                ;
            //    window.location.href = "http://localhost/reedemer/admin/public/auth/login";
              //}
              
           // });         
           // alert("a");
           //$("#pp").html("uuu");
            // set path ../ for local and ../../ for server
            //a.d_path=site_path;
            var site_path=$("#site_path").val();
            h.post("../admin/dashboard/userdetails")
            .success(function (data) {                
                a.ReedemerDetails=data;
                a.site_path=site_path;
            });

            a.changepage = function(page){
                switch(page){
                    case 'settings':
                        var url = '#/settings/list';
                        window.location = url;
                        break;
                }
            };   
        } 

        angular.module("redeemar-app").controller("MainController", ["$scope","$http", a])
    }(),
    function() {
        "use strict";

        function a(a, b) {
            var c = function(a, b) {
                    return Math.floor(Math.random() * (b - a + 1)) + a
                },
                d = function(a, b, d) {
                    for (var e = [], f = 0; a > f; ++f) e.push(c(b, d));
                    return e
                },
                e = function(a, b, d) {
                    for (var e = [], f = 0; a > f; ++f)
                        if (e.length) {
                            var g = 10,
                                h = e[e.length - 1] - g,
                                i = e[e.length - 1] + g;
                            e.push(c(b > h ? b : h, i > d ? d : i))
                        } else e.push(c(b, d));
                    return e
                };
            b.chartData1 = d(75, 5, 200).join(), b.chartData2 = d(24, 5, 200).join(), b.chartData3 = d(20, 5, 200).join(), b.chartData4 = e(50, 10, 30).join(), b.chartData5 = e(18, 10, 30).join();
            var f = !1;
            a(function() {
                b.$broadcast("chat:receiveMessage", "I have a problem with an order, could you help me out?")
            }, 3e3), b.$on("chat:sendMessage", function() {
                f || (f = !0, a(function() {
                    b.$broadcast("chat:receiveMessage", "Thanks!")
                }, 2e3))
            })
        }
        angular.module("redeemar-app").controller("DashboardController", ["$timeout", "$scope", a])
    }(),
    function() {
        "use strict";

        function a(a, b) {
            a.todoService = new b(a)
        }
        angular.module("redeemar-app").controller("TodoController", ["$scope", "TodoService", a])
    }(),
    function() {
        "use strict";

        function a() {
            var a = document.querySelector("#p1"),
                b = document.querySelector("#p3");
            a.addEventListener("mdl-componentupgraded", function() {
                this.MaterialProgress.setProgress(44)
            }), b.addEventListener("mdl-componentupgraded", function() {
                this.MaterialProgress.setProgress(33), this.MaterialProgress.setBuffer(87)
            }), componentHandler.downgradeElements([a, b]), componentHandler.upgradeElement(a, "MaterialProgress"), componentHandler.upgradeElement(b, "MaterialProgress")
        }
        angular.module("redeemar-app").controller("LoadingController", a)
    }(),
    function() {
        "use strict";

        function a(a, b) {
            this.loadImages = function() {
                return b.get("js/demo/apis/gallery.json")
            }
        }

        function b(a) {
            return function(b, c) {
                a.enabled(!1, c)
            }
        }

        function c(a, b, c) {
            a.type = "", b.loadImages().then(function(b) {
                var c = b.data;
                a.images = c, a.searchTxt = "", a.$watch("searchTxt", function(b) {
                    b = b.toLowerCase(), a.images = c.filter(function(a) {
                        return -1 != a.title.toLowerCase().indexOf(b)
                    })
                }), a.showType = function(b) {
                    b = b.toLowerCase(), a.images = c.filter(function(a) {
                        return -1 != a.type.toLowerCase().indexOf(b)
                    })
                }, a.sortByLikes = function() {
                    a.images.sort(function(a, b) {
                        return b.likes - a.likes
                    })
                }, a.sortByWatch = function() {
                    a.images.sort(function(a, b) {
                        return b.watch - a.watch
                    })
                }, a.sortByTime = function() {
                    a.images.sort(function(a, b) {
                        return b.time - a.time
                    })
                }
            })
        }
        angular.module("redeemar-app").directive("disableAnimate", ["$animate", b]).service("imageService", ["$q", "$http", a]).controller("GalleryController", ["$scope", "imageService", "angularGridInstance", c])
    }(),
    function() {
        "use strict";

        function a(a) {
            a.person = {}, a.people = [{
                name: "Adam",
                email: "adam@email.com",
                age: 12,
                country: "United States"
            }, {
                name: "Amalie",
                email: "amalie@email.com",
                age: 12,
                country: "Argentina"
            }, {
                name: "Estefanía",
                email: "estefania@email.com",
                age: 21,
                country: "Argentina"
            }, {
                name: "Adrian",
                email: "adrian@email.com",
                age: 21,
                country: "Ecuador"
            }, {
                name: "Wladimir",
                email: "wladimir@email.com",
                age: 30,
                country: "Ecuador"
            }, {
                name: "Samantha",
                email: "samantha@email.com",
                age: 30,
                country: "United States"
            }, {
                name: "Nicole",
                email: "nicole@email.com",
                age: 43,
                country: "Colombia"
            }, {
                name: "Natasha",
                email: "natasha@email.com",
                age: 54,
                country: "Ecuador"
            }, {
                name: "Michael",
                email: "michael@email.com",
                age: 15,
                country: "Colombia"
            }, {
                name: "Nicolás",
                email: "nicolas@email.com",
                age: 43,
                country: "Colombia"
            }], a.availableColors = ["Red", "Green", "Blue", "Yellow", "Magenta", "Maroon", "Umbra", "Turquoise"], a.selectedState = "", a.states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        }
        angular.module("redeemar-app").controller("SelectController", ["$scope", a])
    }(),
    function() {
        "use strict";

        function a(a, b, c) {
            a.fileReaderSupported = void 0 !== window.FileReader && (void 0 === window.FileAPI || FileAPI.html5 !== !1), a.$watch("files", function() {
                a.upload(a.files)
            });
            var d = function(a) {
                    var b = parseInt(100 * a.loaded / a.total);
                    console.log("progress: " + b + "% " + a.config.file.name)
                },
                e = function(a, b, c, d) {
                    console.log("file " + d.file.name + "uploaded. Response: " + JSON.stringify(a))
                },
                f = function(a) {
                    g(a)
                },
                g = function(b) {
                    void 0 !== b && a.fileReaderSupported && b.type.indexOf("image") > -1 && c(function() {
                        var a = new FileReader;
                        a.readAsDataURL(b), a.onload = function(a) {
                            c(function() {
                                b.dataUrl = a.target.result
                            })
                        }
                    })
                };
            a.upload = function(a) {
                if (a && a.length)
                    for (var c = 0; c < a.length; c++) {
                        var f = a[c];
                        b.upload({
                            url: "#",
                            file: f
                        }).progress(d).success(e)
                    }
            }, a.$watch("files", function(b) {
                if (a.formUpload = !1, void 0 !== b && null !== b)
                    for (var c = 0; c < b.length; c++) a.errorMsg = void 0, f(b[c])
            })
        }
        angular.module("redeemar-app").controller("UploadController", ["$scope", "Upload", "$timeout", a])
    }(),
    function() {
        "use strict";

        function a(a) {
            a.text1 = "<h1>Lorem ipsum</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe maxime similique, ab voluptate dolorem incidunt, totam dolores illum eum ad quas odit. Magnam rerum doloribus vitae magni quasi molestias repellat.</p><ul><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus tempora explicabo fugit unde maxime alias.</li><li>Numquam, nihil. Fugiat aspernatur suscipit voluptatum dolorum nisi numquam, fugit at, saepe alias assumenda autem.</li><li>Iste dolore sed placeat aperiam alias modi repellat dolorem, temporibus odio adipisci obcaecati, est facere!</li><li>Quas totam itaque voluptatibus dolore ea reprehenderit ut quibusdam, odit beatae aliquam, deleniti unde tempora!</li><li>Rerum quis soluta, necessitatibus. Maxime repudiandae minus at eum, dicta deserunt dignissimos laborum doloribus. Vel.</li></ul><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis enim illum, iure cumque amet. Eos quisquam, nemo voluptates. Minima facilis, recusandae atque ullam illum quae iure impedit nihil dolorum hic?</p>"
        }
        angular.module("redeemar-app").controller("TextEditorController", ["$scope", a])
    }(),
    function() {
        "use strict";

        function a(a) {
            a.map = {
                center: {
                    latitude: 40.399516,
                    longitude: -22.703348
                },
                zoom: 2
            }, a.centerOn = function(b, c) {
                a.map.center = {
                    latitude: b,
                    longitude: c
                }
            };
            var b = [];
            b.push({
                id: 0,
                latitude: 52.369371,
                longitude: 4.894494,
                title: "Amsterdam"
            }), b.push({
                id: 1,
                latitude: 40.712942,
                longitude: -74.005774,
                title: "New York"
            }), b.push({
                id: 2,
                latitude: 41.385196,
                longitude: 2.173315,
                title: "Barcelona"
            }), b.push({
                id: 3,
                latitude: 37.764355,
                longitude: -122.451954,
                title: "San Francisco"
            }), a.markers = b
        }
        angular.module("redeemar-app").controller("ClickableMapController", ["$scope", a])
    }(),
    function() {
        "use strict";

        function a(a, b) {
            a.map = {
                center: {
                    latitude: 40.399516,
                    longitude: -22.703348
                },
                control: {},
                zoom: 2
            }, b.then(function(b) {
                a.searchFor = function(c) {
                    var d = new b.Geocoder;
                    d.geocode({
                        address: c
                    }, function(c, d) {
                        if (d == b.GeocoderStatus.OK) {
                            var e = c[0].geometry.location;
                            a.map.control.refresh({
                                latitude: e.lat(),
                                longitude: e.lng()
                            }), a.map.control.getGMap().setZoom(6)
                        }
                    })
                }
            })
        }
        angular.module("redeemar-app").controller("SearchableMapController", ["$scope", "uiGmapGoogleMapApi", a])
    }(),
    function() {
        "use strict";

        function a(a) {
            var b = !1;
            a.map = {
                center: {
                    latitude: 52.369371,
                    longitude: 4.894494
                },
                control: {},
                events: {
                    zoom_changed: function(c, d, e) {
                        if (b === !1) {
                            var f = a.getMapInstance().getZoom();
                            a.zoom_level = f
                        } else b = !1
                    }
                },
                zoom: 5
            }, a.update_zoom = function() {
                b = !0, a.getMapInstance().setZoom(parseInt(a.zoom_level))
            }, a.getMapInstance = function() {
                return a.map.control.getGMap()
            }
        }
        angular.module("redeemar-app").controller("ZoomableMapController", ["$scope", a])
    }(),
    function() {
        "use strict";

        function a(a) {
            a.map = {
                center: {
                    latitude: 52.369371,
                    longitude: 4.894494
                },
                control: {},
                zoom: 5
            }, a.options = {
                styles: [{
                    featureType: "all",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#ffffff"
                    }]
                }, {
                    featureType: "all",
                    elementType: "labels.text.stroke",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 13
                    }]
                }, {
                    featureType: "administrative",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#000000"
                    }]
                }, {
                    featureType: "administrative",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#144b53"
                    }, {
                        lightness: 14
                    }, {
                        weight: 1.4
                    }]
                }, {
                    featureType: "landscape",
                    elementType: "all",
                    stylers: [{
                        color: "#08304b"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [{
                        color: "#0c4152"
                    }, {
                        lightness: 5
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#000000"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#0b434f"
                    }, {
                        lightness: 25
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#000000"
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#0b3d51"
                    }, {
                        lightness: 16
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "geometry",
                    stylers: [{
                        color: "#000000"
                    }]
                }, {
                    featureType: "transit",
                    elementType: "all",
                    stylers: [{
                        color: "#146474"
                    }]
                }, {
                    featureType: "water",
                    elementType: "all",
                    stylers: [{
                        color: "#021019"
                    }]
                }]
            }
        }
        angular.module("redeemar-app").controller("StyledMapController", ["$scope", a])
    }(),

    function() {
        "use strict";

        function a(a) {
            a.map = {
                center: {
                    latitude: 40.399516,
                    longitude: -22.703348
                },
                zoom: 3
            }, a.centerOn = function(b, c) {
                a.map.center = {
                    latitude: b,
                    longitude: c
                }
            };
            var b = [];
            b.push({
                id: 0,
                latitude: 52.369371,
                longitude: 4.894494,
                title: "Amsterdam"
            }), b.push({
                id: 1,
                latitude: 40.712942,
                longitude: -74.005774,
                title: "New York"
            }), b.push({
                id: 2,
                latitude: 41.385196,
                longitude: 2.173315,
                title: "Barcelona"
            }), b.push({
                id: 3,
                latitude: 37.764355,
                longitude: -122.451954,
                title: "San Francisco"
            }), a.markers = b
        }
        angular.module("redeemar-app").controller("FullMapController", ["$scope", a])
    }(),
    function() {
        "use strict";

        function a(a) {
            var b = [];
            b.push("#4CAF50"), b.push("#2196F3"), b.push("#9c27b0"), b.push("#ff9800"), b.push("#F44336"), a.color_pattern = b.join()
        }
        angular.module("redeemar-app").controller("ChartsController", ["$scope", a])
    }(),
    
    function() {
        "use strict";

        function a(p) {
            return {
                restrict: 'A',
                link: function(a, b, c) {
                  var model = p(c.fileModel);
                  var modelSetter = model.assign;
                  
                  b.bind('change', function(){
                     a.$apply(function(){
                        modelSetter(a, b[0].files[0]);
                     });
                  });
                }
            }
        }
        angular.module("redeemar-app").directive("fileModel",["$parse",a])
    }(),
    function() {
        "use strict";

        function a(h) {

            this.uploadFileToUrl = function(file, uploadUrl, data){  
           // alert(file+'---'+uploadUrl+'---'+data);             
               var fd = new FormData();
               fd.append('file', file);              
               h.post(uploadUrl, fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined},
                  data:data
               })
            
               .success(function(response){   
              // alert("a");                   
                   var company_id =$("#company_id").val();
                   if(!company_id)
                   {
                       company_id=0;
                   }

                   var logo_text =$("#logo_text").val();                   
                   h.get("../admin/dashboard/addlogo/"+company_id+"/"+logo_text+"/"+response).success(function(response_back){
                       //alert(response_back.response);
                        if(response_back.response=="success")
                        {
                            var target_id=response_back.target_id;
                            var logo_id=response_back.logo_id;
                            
                            h.get("../admin/dashboard/vuforiarate/"+target_id+"/"+logo_id).success(function(target){
                                if(target.response=="success")
                                {
                                    var main_site_url=$("#main_site_url").val();
                                    
                                    var redirect_url=main_site_url+'/user/dashboard#/tables/logo';                                   
                                   // window.location.href = redirect_url; 

                                    $("#error_div").hide();
                                    $("#show_message").slideDown();
                                    $("#success_div").html("Data inserted successfully. <br />Please wait,we will redirect you to listing page.");
                                    $("#success_div").show();              

                                    setTimeout(function() { 
                                    window.location.href = redirect_url; 
                                    }, 5000);                                          
                                }
                            })   
                        }
                        if(response_back.response=="image_problem")
                        {
                            //$("#show_success_msg").hide();
                            //$("#image_error").show('500');
                            //$("#logo_text").val("");
                            //$("#company_id").val("");
                            //$("#logo_name").val("");     

                            $("#show_message").slideDown();
                            $("#error_div").html("Please upload only .jpg /.jpeg image.");
                            $("#error_div").show();
                            $("#success_div").hide();

                            $('#upload_button').prop('disabled', false);
                            $("#upload_button").text('Save');                                     

                        }

                        $('#upload_file').prop('disabled', false);
                        $("#upload_file").text('Save'); 
                        
                   })
               })
            
               .error(function(){
                alert("as");   
               // $("#show_error_msg").show();
               });
            }
        }
        angular.module("redeemar-app").service("fileUpload", ["$http", a])
    }(),
    function() {
        "use strict";

        function a() {
            return {
                restrict: "A",
                link: function(a, b, c) {
                    angular.forEach(b.children(), function(a) {
                        var b = angular.element(a),
                            c = b.attr("class").match(/mdl-color--(.*?)($|\s)/g)[0];
                        b.html(c), /-900 $/g.test(c) && b.after("<br/>")
                    })
                }
            }
        }
        angular.module("redeemar-app").directive("dynamicColor", a)
    }(),
    function() {
        "use strict";

        function a() {
            var site_path=$("#site_path").val();

            return {
                restrict: "E",
                templateUrl: site_path+"user/partials/header.html",
                replace: !0
            }
        }
        angular.module("redeemar-app").directive("mlHeader", a)
    }(),
    function() {
        "use strict";

        function a() {
            var site_path=$("#site_path").val();
            
            return {
                restrict: "E",
                templateUrl: site_path+"user/partials/sidebar.html",
                replace: !0
            }
        }
        angular.module("redeemar-app").directive("mlSidebar", a)
    }(),
    function() {
        "use strict";

        function a(a, b) {
            var c = this;
            c.getConversations = function() {
                return b.getConversations()
            }, a.conversations = [], a.currentConversation = {
                name: "Undefined",
                messages: []
            }, a.$on("chat:receiveMessage", function(c, d) {
                a.currentConversation.messages.push(b.prepareMessage(d, !1))
            }), a.switchConversation = function(b) {
                a.currentConversation = b
            }, a.sendMessage = function() {
                "" !== a.message && void 0 !== a.message && (a.currentConversation.messages.push(b.prepareMessage(a.message, !0)), a.message = "", a.$emit("chat:sendMessage"))
            }
        }

        function b(a, b, c) {
            function d(a, b) {
                return {
                    text: a,
                    datetime: moment().format(),
                    me: b
                }
            }

            function e() {
                var d = a.defer();
                return b.get(c.endpoint, {
                    cache: "true"
                }).then(function(a) {
                    d.resolve(a)
                }, function(a) {}), d.promise
            }
            return {
                prepareMessage: d,
                getConversations: e
            }
        }

        function c() {
            return {
                restrict: "EA",
                controller: "mlChatController",
                templateUrl: "../view/tpl/partials/chat-widget.html"
            }
        }

        function d() {
            function a(a, b, c, d) {
                d.getConversations().then(function(b) {
                    a.conversations = b.data, a.currentConversation = a.conversations[0]
                })
            }
            return {
                restrict: "EA",
                controller: "mlChatController",
                link: a
            }
        }

        function e() {
            function a(a) {
                return a && a.length ? moment(a).format("LLL") : void 0
            }
            return a
        }
        angular.module("ml.chat", []).constant("mlChatConfig", {
            endpoint: "js/demo/apis/chats.json"
        }).controller("mlChatController", ["$scope", "mlChatService", a]).factory("mlChatService", ["$q", "$http", "mlChatConfig", b]).directive("mlChatWidget", c).directive("mlChatApp", d).filter("mlChatDate", e)
    }(),
    function() {
        "use strict";
       
        function a(a, b, c, d, e) {
            var f = this;
            f.groups = [], f.items = [], f.closeOthers = function(c) {
                var d = angular.isDefined(b.closeOthers) ? a.$eval(b.closeOthers) : e.closeOthers;
                d && angular.forEach(f.groups, function(a) {
                    a !== c && (a.isOpen = !1)
                })
            }, f.inactivateOthers = function(a) {
                angular.forEach(f.items, function(b) {
                    b !== a && (b.isActive = !1)
                })
            }, f.addGroup = function(a) {
                a.isOpen = !0, f.groups.push(a)
            }, f.addItem = function(a) {
                f.items.push(a)
            }, f.isOpen = function(a) {
                var b = c.path().split("/")[1];
                return b == a
            }, f.isActive = function(a) {
                return c.path() == a.slice(1, a.length)
            }, f.setBreadcrumb = function(a) {
                d.pageTitle = a
            }
        }

        function b() {
            return {
                restrict: "EA",
                controller: "MenuController"
            }
        }

        function c() {
            var site_path=$("#site_path").val();
            function a(a, b, c, d) { 

                d.addItem(a), a.$watch("isActive", function(b) {
                    b && d.inactivateOthers(a)
                });
                var e = angular.element(b.children()[0]).attr("href");
                a.isActive = d.isActive(e), a.toggleActive = function() {

                    a.isActive || (a.isActive = !a.isActive);
                    var c = b.find("a").clone();
                    c.find("i").remove();
                    var e = c.text().trim();
                    d.setBreadcrumb("Dashboard" == e ? "" : e)
                }
            }
            return {

                require: "^mlMenu",
                restrict: "EA",
                transclude: !0,
                replace: !0,
                templateUrl: site_path+"user/_partials/menu-item.html",
                scope: {
                    isActive: "=?"
                },
                link: a
            }
        }

        function d() {
            var site_path=$("#site_path").val();
            function a(a, b, c, d) {
                d.addGroup(a), a.$watch("isOpen", function(b) {
                    b && d.closeOthers(a)
                }), a.isOpen = d.isOpen(c.path), a.toggleOpen = function() {
                    a.isOpen = !a.isOpen
                }
            }
            return {
                require: "^mlMenu",
                restrict: "EA",
                transclude: !0,
                replace: !0,
                templateUrl: site_path+"user/_partials/menu-group.html",
                scope: {
                    heading: "@",
                    path: "@",
                    isOpen: "=?"
                },
                controller: function() {
                    this.setHeading = function(a) {
                        this.heading = a
                    }
                },
                link: a
            }
        }

        function e() {
            function a(a, b, c, d, e) {
                d.setHeading(e(a, angular.noop))
            }
            return {
                restrict: "EA",
                transclude: !0,
                template: "",
                replace: !0,
                require: "^mlMenuGroup",
                link: a
            }
        }

        function f() {
            function a(a, b, c, d) {
                a.$watch(function() {
                    return d[c.mlMenuTransclude]
                }, function(a) {
                    a && (b.html(""), b.replaceWith(a))
                })
            }
            return {
                require: "^mlMenuGroup",
                link: a
            }
        }

        function g(a) {
            function b(b, c, d) {
                function e() {
                    c.removeClass("collapse").addClass("collapsing"), a.addClass(c, "in", {
                        to: {
                            height: c[0].scrollHeight + "px"
                        }
                    }).then(f)
                }

                function f() {
                    c.removeClass("collapsing"), c.css({
                        height: "auto"
                    })
                }

                function g() {
                    c.css({
                        height: c[0].scrollHeight + "px"
                    }).removeClass("collapse").addClass("collapsing"), a.removeClass(c, "in", {
                        to: {
                            height: "0"
                        }
                    }).then(h)
                }

                function h() {
                    c.css({
                        height: "0"
                    }), c.removeClass("collapsing"), c.addClass("collapse")
                }
                b.$watch(d.collapse, function(a) {
                    a ? g() : e()
                })
            }
            return {
                link: b
            }
        }
        angular.module("ml.menu", []).constant("menuConfig", {
            closeOthers: !0
        }).controller("MenuController", ["$scope", "$attrs", "$location", "$rootScope", "menuConfig", a]).directive("mlMenu", b).directive("mlMenuItem", c).directive("mlMenuGroup", d).directive("mlMenuGroupHeading", e).directive("mlMenuTransclude", f).directive("collapse", ["$animate", g])
    }(),
    function() {
        "use strict";

        function a(a) {
            function b(a, b) {
                return b.templateUrl || "some/path/default.html"
            }

            function c(b, c, d) {
                var e = c[0].querySelectorAll("path");
                angular.forEach(e, function(c, d) {
                    var e = angular.element(c);
                    e.attr("ml-svg-map-region", ""), e.attr("hover-region", "hoverRegion"), a(e)(b)
                })
            }
            return {
                restrict: "EA",
                templateUrl: b,
                link: c
            }
        }

        function b(a) {
            function b(b, c, d) {
                b.elementId = c.attr("id"), b.regionClick = function() {
                    alert(b.elementId)
                }, b.regionMouseOver = function() {
                    b.hoverRegion = b.elementId, c[0].parentNode.appendChild(c[0])
                }, c.attr("ng-click", "regionClick()"), c.attr("ng-attr-fill", "{{ elementId | mlSvgMapColor }}"), c.attr("ng-mouseover", "regionMouseOver()"), c.attr("ng-class", "{ active:hoverRegion == elementId }"), c.removeAttr("ml-svg-map-region"), a(c)(b)
            }
            return {
                restrict: "A",
                scope: {
                    hoverRegion: "="
                },
                link: b
            }
        }

        function c() {
            function a() {
                var a = Math.floor(200 * Math.random() + 50),
                    b = Math.floor(200 * Math.random() + 50),
                    c = Math.floor(200 * Math.random() + 50);
                return "rgba(" + a + "," + b + "," + c + ",1)"
            }
            return a
        }
        angular.module("ml.svg-map", []).directive("mlSvgMap", ["$compile", a]).directive("mlSvgMapRegion", ["$compile", b]).filter("mlSvgMapColor", c)
    }(),
    function() {
        "use strict";

        function a(a, b, c) {
            function d(d) {
                if (this.$scope = d, this.todoFilter = {}, this.activeFilter = 0, this.filters = [{
                        title: "All",
                        method: "all"
                    }, {
                        title: "Active",
                        method: "active"
                    }, {
                        title: "Completed",
                        method: "completed"
                    }], this.newTodo = {
                        title: "",
                        done: !1,
                        editing: !1
                    }, this.restore(), !a.get("todos")) {
                    var e = [];
                    e[0] = {
                        title: "Grow my mailing list",
                        done: !0
                    }, e[1] = {
                        title: "Create a killer SAAS business",
                        done: !1
                    }, e[2] = {
                        title: "Write autoresponder sequence",
                        done: !1
                    }, a.set("todos", e)
                }
                a.bind(this.$scope, "todos"), this.completedTodos = function() {
                    return c("filter")(this.$scope.todos, {
                        done: !1
                    })
                }, this.addTodo = function() {
                    "" !== this.todo.title && void 0 !== this.todo.title && (this.$scope.todos.push(this.todo), b.$broadcast("todos:count", this.count()), this.restore())
                }, this.updateTodo = function() {
                    this.restore()
                }
            }
            return d.prototype.saveTodo = function(a) {
                this.todo.editing ? this.updateTodo() : (this.addTodo(), this.$scope.$broadcast("focusTodoInput"))
            }, d.prototype.editTodo = function(a) {
                this.todo = a, this.todo.editing = !0, this.$scope.$broadcast("focusTodoInput")
            }, d.prototype.toggleDone = function(a) {
                a.done = !a.done, b.$broadcast("todos:count", this.count())
            }, d.prototype.clearCompleted = function() {
                this.$scope.todos = this.completedTodos(), this.restore()
            }, d.prototype.count = function() {
                return this.completedTodos().length
            }, d.prototype.restore = function() {
                this.todo = angular.copy(this.newTodo)
            }, d.prototype.filter = function(a) {
                "active" === a ? (this.activeFilter = 1, this.todoFilter = {
                    done: !1
                }) : "completed" === a ? (this.activeFilter = 2, this.todoFilter = {
                    done: !0
                }) : (this.activeFilter = 0, this.todoFilter = {})
            }, d
        }

        function b(a) {
            function b(b, c) {
                b.todoService = new a(b)
            }
            return {
                restrict: "EA",
                templateUrl: "../user/_partials/todo-widget.html",
                replace: !0,
                link: b
            }
        }

        function c() {
            return function(a, b, c) {
                a.$on(c.mlTodoFocus, function(a) {
                    b[0].focus()
                })
            }
        }
        angular.module("ml.todo", []).factory("TodoService", ["localStorageService", "$rootScope", "$filter", a]).directive("mlTodoWidget", ["TodoService", b]).directive("mlTodoFocus", c)
    }(),
    function() {
        "use strict";

        function a() {
            function a(a, b, c) {
                var d, e;
                if (d = c.bodyClass || "", e = "string" == typeof c.offset ? parseInt(c.offset.replace(/px;?/, "")) : 0, d) {
                    var f = document.getElementsByClassName(d),
                        g = f.length,
                        h = angular.element(f[g - 1]),
                        i = b[0].offsetTop,
                        j = b[0].clientWidth;
                    h.on("scroll", function() {
                        h[0].scrollTop > i - e + 30 ? b.css("position", "fixed").css("margin-top", 0).css("top", e + "px").css("max-width", j + "px") : b.css("position", "static")
                    })
                }
            }
            return {
                restrict: "A",
                link: a
            }
        }
        angular.module("redeemar-app").directive("mlSticky", a)
    }();

    angular.module("redeemar-app").factory("fileToUpload", ["$http", function(h){

      var fileUpload = {
        uploadNewFileToUrl: function(file, uploadUrl, data) {
        var promise = null;
         // alert("A");
        // console.log("uuuu");
          var fd = new FormData();
          fd.append('file', file);
          var postData = {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
            data:data
          };
          if ( !promise ) {
            // $http returns a promise, which has a then function, which also returns a promise
            promise = h.post(uploadUrl, file).success(function(response){          
               return response;
            }).error(function(){
              $("#show_error_msg").show();
            });
          }
          // Return the promise to the controller
          return promise;
        }
      };
      return fileUpload;
    }]);


    // angular.module('angular-img-cropper',[]).directive("imageCropper",  ['$document','$window', function($document,$window)
    // {
    //   return {
    //         scope: {
    //             image: "=",
    //             croppedImage:"=",
    //             cropWidth: "=",
    //             cropHeight: "=",
    //             keepAspect: "=",
    //             touchRadius: "="
    //         },
    //         restrict: "A",
    //         link: function (scope, element)
    //         {
    //             var crop;
    //             var __extends = __extends || function (d, b) {
    //                 for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    //                 function __() { this.constructor = d; }
    //                 __.prototype = b.prototype;
    //                 d.prototype = new __();
    //             };

    //             var Handle = (function () {
    //                 function Handle(x, y, radius) {
    //                     this.over = false;
    //                     this.drag = false;
    //                     this.position = new Point(x, y);
    //                     this.offset = new Point(0, 0);
    //                     this.radius = radius;
    //                 }
    //                 Handle.prototype.setDrag = function (value) {
    //                     this.drag = value;
    //                     this.setOver(value);
    //                 };
    //                 Handle.prototype.draw = function (ctx) {
    //                 };
    //                 Handle.prototype.setOver = function (over) {
    //                     this.over = over;
    //                 };
    //                 Handle.prototype.touchInBounds = function (x, y) {
    //                     return (x > this.position.x - this.radius && x < this.position.x + this.radius && y > this.position.y - this.radius && y < this.position.y + this.radius);
    //                 };
    //                 Handle.prototype.getPosition = function () {
    //                     return this.position;
    //                 };
    //                 Handle.prototype.setPosition = function (x, y) {
    //                     this.position.x = x;
    //                     this.position.y = y;
    //                 };
    //                 return Handle;
    //             })();
    //             var PointPool = (function () {
    //                 function PointPool(inst) {
    //                     this.borrowed = 0; //for debugging
    //                     PointPool.instance = this;
    //                     var prev = null;
    //                     for (var i = 0; i < inst; i++) {
    //                         if (i === 0) {
    //                             this.firstAvailable = new Point();
    //                             prev = this.firstAvailable;
    //                         }
    //                         else {
    //                             var p = new Point();
    //                             prev.setNext(p);
    //                             prev = p;
    //                         }
    //                     }
    //                 }
    //                 PointPool.prototype.borrow = function (x, y) {
    //                     if (this.firstAvailable == null) {
    //                         throw "Pool exhausted";
    //                     }
    //                     this.borrowed++;
    //                     var p = this.firstAvailable;
    //                     this.firstAvailable = p.getNext();
    //                     p.x = x;
    //                     p.y = y;
    //                     return p;
    //                 };
    //                 PointPool.prototype.returnPoint = function (p) {
    //                     this.borrowed--;
    //                     p.x = 0;
    //                     p.y = 0;
    //                     p.setNext(this.firstAvailable);
    //                     this.firstAvailable = p;
    //                 };
    //                 return PointPool;
    //             })();
    //             var CropService = (function () {
    //                 function CropService() {
    //                 }
    //                 CropService.init = function (canvas) {
    //                     this.canvas = canvas;
    //                     this.ctx = this.canvas.getContext("2d");
    //                 };
    //                 CropService.DEG2RAD = 0.0174532925;
    //                 return CropService;
    //             })();
    //             var DragMarker = (function (_super) {
    //                 __extends(DragMarker, _super);
    //                 function DragMarker(x, y, radius) {
    //                     _super.call(this, x, y, radius);
    //                     this.iconPoints = new Array();
    //                     this.scaledIconPoints = new Array();
    //                     this.getDragIconPoints(this.iconPoints, 1);
    //                     this.getDragIconPoints(this.scaledIconPoints, 1.2);
    //                 }
    //                 DragMarker.prototype.draw = function (ctx) {
    //                     if (this.over || this.drag) {
    //                         this.drawIcon(ctx, this.scaledIconPoints);
    //                     }
    //                     else {
    //                         this.drawIcon(ctx, this.iconPoints);
    //                     }
    //                 };
    //                 DragMarker.prototype.getDragIconPoints = function (arr, scale) {
    //                     var maxLength = 17 * scale;
    //                     var arrowWidth = 14 * scale;
    //                     var arrowLength = 8 * scale;
    //                     var connectorThroat = 4 * scale;
    //                     arr.push(PointPool.instance.borrow(-connectorThroat / 2, maxLength - arrowLength));
    //                     arr.push(PointPool.instance.borrow(-arrowWidth / 2, maxLength - arrowLength));
    //                     arr.push(PointPool.instance.borrow(0, maxLength));
    //                     arr.push(PointPool.instance.borrow(arrowWidth / 2, maxLength - arrowLength));
    //                     arr.push(PointPool.instance.borrow(connectorThroat / 2, maxLength - arrowLength));
    //                     arr.push(PointPool.instance.borrow(connectorThroat / 2, connectorThroat / 2));
    //                     arr.push(PointPool.instance.borrow(maxLength - arrowLength, connectorThroat / 2));
    //                     arr.push(PointPool.instance.borrow(maxLength - arrowLength, arrowWidth / 2));
    //                     arr.push(PointPool.instance.borrow(maxLength, 0));
    //                     arr.push(PointPool.instance.borrow(maxLength - arrowLength, -arrowWidth / 2));
    //                     arr.push(PointPool.instance.borrow(maxLength - arrowLength, -connectorThroat / 2));
    //                     arr.push(PointPool.instance.borrow(connectorThroat / 2, -connectorThroat / 2));
    //                     arr.push(PointPool.instance.borrow(connectorThroat / 2, -maxLength + arrowLength));
    //                     arr.push(PointPool.instance.borrow(arrowWidth / 2, -maxLength + arrowLength));
    //                     arr.push(PointPool.instance.borrow(0, -maxLength));
    //                     arr.push(PointPool.instance.borrow(-arrowWidth / 2, -maxLength + arrowLength));
    //                     arr.push(PointPool.instance.borrow(-connectorThroat / 2, -maxLength + arrowLength));
    //                     arr.push(PointPool.instance.borrow(-connectorThroat / 2, -connectorThroat / 2));
    //                     arr.push(PointPool.instance.borrow(-maxLength + arrowLength, -connectorThroat / 2));
    //                     arr.push(PointPool.instance.borrow(-maxLength + arrowLength, -arrowWidth / 2));
    //                     arr.push(PointPool.instance.borrow(-maxLength, 0));
    //                     arr.push(PointPool.instance.borrow(-maxLength + arrowLength, arrowWidth / 2));
    //                     arr.push(PointPool.instance.borrow(-maxLength + arrowLength, connectorThroat / 2));
    //                     arr.push(PointPool.instance.borrow(-connectorThroat / 2, connectorThroat / 2));
    //                 };
    //                 DragMarker.prototype.drawIcon = function (ctx, points) {
    //                     ctx.beginPath();
    //                     ctx.moveTo(points[0].x + this.position.x, points[0].y + this.position.y);
    //                     for (var k = 0; k < points.length; k++) {
    //                         var p = points[k];
    //                         ctx.lineTo(p.x + this.position.x, p.y + this.position.y);
    //                     }
    //                     ctx.closePath();
    //                     ctx.fillStyle = 'rgba(255,228,0,1)';
    //                     ctx.fill();
    //                 };
    //                 DragMarker.prototype.recalculatePosition = function (bounds) {
    //                     var c = bounds.getCentre();
    //                     this.setPosition(c.x, c.y);
    //                     PointPool.instance.returnPoint(c);
    //                 };
    //                 return DragMarker;
    //             })(Handle);
    //             var CornerMarker = (function (_super) {
    //                 __extends(CornerMarker, _super);
    //                 function CornerMarker(x, y, radius) {
    //                     _super.call(this, x, y, radius);
    //                 }
    //                 CornerMarker.prototype.drawCornerBorder = function (ctx) {
    //                     var sideLength = 10;
    //                     if (this.over || this.drag) {
    //                         sideLength = 12;
    //                     }
    //                     var hDirection = 1;
    //                     var vDirection = 1;
    //                     if (this.horizontalNeighbour.position.x < this.position.x) {
    //                         hDirection = -1;
    //                     }
    //                     if (this.verticalNeighbour.position.y < this.position.y) {
    //                         vDirection = -1;
    //                     }
    //                     ctx.beginPath();
    //                     ctx.lineJoin = "miter";
    //                     ctx.moveTo(this.position.x, this.position.y);
    //                     ctx.lineTo(this.position.x + (sideLength * hDirection), this.position.y);
    //                     ctx.lineTo(this.position.x + (sideLength * hDirection), this.position.y + (sideLength * vDirection));
    //                     ctx.lineTo(this.position.x, this.position.y + (sideLength * vDirection));
    //                     ctx.lineTo(this.position.x, this.position.y);
    //                     ctx.closePath();
    //                     ctx.lineWidth = 2;
    //                     ctx.strokeStyle = 'rgba(255,228,0,1)';
    //                     ctx.stroke();
    //                 };
    //                 CornerMarker.prototype.drawCornerFill = function (ctx) {
    //                     var sideLength = 10;
    //                     if (this.over || this.drag) {
    //                         sideLength = 12;
    //                     }
    //                     var hDirection = 1;
    //                     var vDirection = 1;
    //                     if (this.horizontalNeighbour.position.x < this.position.x) {
    //                         hDirection = -1;
    //                     }
    //                     if (this.verticalNeighbour.position.y < this.position.y) {
    //                         vDirection = -1;
    //                     }
    //                     ctx.beginPath();
    //                     ctx.moveTo(this.position.x, this.position.y);
    //                     ctx.lineTo(this.position.x + (sideLength * hDirection), this.position.y);
    //                     ctx.lineTo(this.position.x + (sideLength * hDirection), this.position.y + (sideLength * vDirection));
    //                     ctx.lineTo(this.position.x, this.position.y + (sideLength * vDirection));
    //                     ctx.lineTo(this.position.x, this.position.y);
    //                     ctx.closePath();
    //                     ctx.fillStyle = 'rgba(0,0,0,1)';
    //                     ctx.fill();
    //                 };
    //                 CornerMarker.prototype.moveX = function (x) {
    //                     this.setPosition(x, this.position.y);
    //                 };
    //                 CornerMarker.prototype.moveY = function (y) {
    //                     this.setPosition(this.position.x, y);
    //                 };
    //                 CornerMarker.prototype.move = function (x, y) {
    //                     this.setPosition(x, y);
    //                     this.verticalNeighbour.moveX(x);
    //                     this.horizontalNeighbour.moveY(y);
    //                 };
    //                 CornerMarker.prototype.addHorizontalNeighbour = function (neighbour) {
    //                     this.horizontalNeighbour = neighbour;
    //                 };
    //                 CornerMarker.prototype.addVerticalNeighbour = function (neighbour) {
    //                     this.verticalNeighbour = neighbour;
    //                 };
    //                 CornerMarker.prototype.getHorizontalNeighbour = function () {
    //                     return this.horizontalNeighbour;
    //                 };
    //                 CornerMarker.prototype.getVerticalNeighbour = function () {
    //                     return this.verticalNeighbour;
    //                 };
    //                 CornerMarker.prototype.draw = function (ctx) {
    //                     this.drawCornerFill(ctx);
    //                     this.drawCornerBorder(ctx);
    //                 };
    //                 return CornerMarker;
    //             })(Handle);
    //             var Bounds = (function () {
    //                 function Bounds(x, y, width, height) {
    //                     if (x === void 0) { x = 0; }
    //                     if (y === void 0) { y = 0; }
    //                     if (width === void 0) { width = 0; }
    //                     if (height === void 0) { height = 0; }
    //                     this.left = x;
    //                     this.right = x + width;
    //                     this.top = y;
    //                     this.bottom = y + height;
    //                 }
    //                 Bounds.prototype.getWidth = function () {
    //                     return this.right - this.left;
    //                 };
    //                 Bounds.prototype.getHeight = function () {
    //                     return this.bottom - this.top;
    //                 };
    //                 Bounds.prototype.getCentre = function () {
    //                     var w = this.getWidth();
    //                     var h = this.getHeight();
    //                     return PointPool.instance.borrow(this.left + (w / 2), this.top + (h / 2));
    //                 };
    //                 return Bounds;
    //             })();
    //             var Point = (function () {
    //                 function Point(x, y) {
    //                     if (x === void 0) { x = 0; }
    //                     if (y === void 0) { y = 0; }
    //                     this.x = x;
    //                     this.y = y;
    //                 }
    //                 Point.prototype.setNext = function (p) {
    //                     this.next = p;
    //                 };
    //                 Point.prototype.getNext = function () {
    //                     return this.next;
    //                 };
    //                 return Point;
    //             })();
    //             var CropTouch = (function () {
    //                 function CropTouch(x, y, id) {
    //                     if (x === void 0) { x = 0; }
    //                     if (y === void 0) { y = 0; }
    //                     if (id === void 0) { id = 0; }
    //                     this.id = 0;
    //                     this.x = x;
    //                     this.y = y;
    //                     this.id = id;
    //                 }
    //                 return CropTouch;
    //             })();
    //             var ImageCropper = (function () {
    //                 function ImageCropper(canvas, x, y, width, height, keepAspect, touchRadius) {
    //                     if (x === void 0) { x = 0; }
    //                     if (y === void 0) { y = 0; }
    //                     if (width === void 0) { width = 100; }
    //                     if (height === void 0) { height = 50; }
    //                     if (keepAspect === void 0) { keepAspect = true; }
    //                     if (touchRadius === void 0) { touchRadius = 20; }
    //                     this.keepAspect = false;
    //                     this.aspectRatio = 0;
    //                     this.currentDragTouches = new Array();
    //                     this.isMouseDown = false;
    //                     this.ratioW = 1;
    //                     this.ratioH = 1;
    //                     this.fileType = 'jpeg';
    //                     this.imageSet = false;
    //                     this.pointPool = new PointPool(200);
    //                     CropService.init(canvas);
    //                     this.buffer = document.createElement('canvas');
    //                     this.cropCanvas = document.createElement('canvas');
    //                     this.buffer.width = canvas.width;
    //                     this.buffer.height = canvas.height;
    //                     this.tl = new CornerMarker(x, y, touchRadius);
    //                     this.tr = new CornerMarker(x + width, y, touchRadius);
    //                     this.bl = new CornerMarker(x, y + height, touchRadius);
    //                     this.br = new CornerMarker(x + width, y + height, touchRadius);
    //                     this.tl.addHorizontalNeighbour(this.tr);
    //                     this.tl.addVerticalNeighbour(this.bl);
    //                     this.tr.addHorizontalNeighbour(this.tl);
    //                     this.tr.addVerticalNeighbour(this.br);
    //                     this.bl.addHorizontalNeighbour(this.br);
    //                     this.bl.addVerticalNeighbour(this.tl);
    //                     this.br.addHorizontalNeighbour(this.bl);
    //                     this.br.addVerticalNeighbour(this.tr);
    //                     this.markers = [this.tl, this.tr, this.bl, this.br];
    //                     this.center = new DragMarker(x + (width / 2), y + (height / 2), touchRadius);
    //                     this.canvas = canvas;
    //                     this.ctx = this.canvas.getContext("2d");
    //                     this.keepAspect = keepAspect;
    //                     this.aspectRatio = height / width;
    //                     this.draw(this.ctx);
    //                     this.croppedImage = new Image();
    //                     window.addEventListener('mousemove', this.onMouseMove.bind(this));
    //                     window.addEventListener('mouseup', this.onMouseUp.bind(this));
    //                     canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    //                     window.addEventListener('touchmove', this.onTouchMove.bind(this), false);
    //                     canvas.addEventListener('touchstart', this.onTouchStart.bind(this), false);
    //                     window.addEventListener('touchend', this.onTouchEnd.bind(this), false);
    //                 }
    //                 ImageCropper.prototype.resizeCanvas = function (width, height) {
    //                     this.canvas.width = width;
    //                     this.canvas.height = height;
    //                     this.buffer.width = width;
    //                     this.buffer.height = height;
    //                     this.draw(this.ctx);
    //                 };
    //                 ImageCropper.prototype.draw = function (ctx) {
    //                     var bounds = this.getBounds();
    //                     if (this.srcImage) {
    //                         ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    //                         var sourceAspect = this.srcImage.height / this.srcImage.width;
    //                         var canvasAspect = this.canvasHeight / this.canvasWidth;
    //                         var w = this.canvasWidth;
    //                         var h = this.canvasHeight;
    //                         if (canvasAspect > sourceAspect) {
    //                             w = this.canvasWidth;
    //                             h = this.canvasWidth * sourceAspect;
    //                         }
    //                         else {
    //                             h = this.canvasHeight;
    //                             w = this.canvasHeight / sourceAspect;
    //                         }
    //                         this.ratioW = w / this.srcImage.width;
    //                         this.ratioH = h / this.srcImage.height;
    //                         if (canvasAspect < sourceAspect) {
    //                             this.drawImageIOSFix(ctx, this.srcImage, 0, 0, this.srcImage.width, this.srcImage.height, this.buffer.width / 2 - w / 2, 0, w, h);
    //                         }
    //                         else {
    //                             this.drawImageIOSFix(ctx, this.srcImage, 0, 0, this.srcImage.width, this.srcImage.height, 0, this.buffer.height / 2 - h / 2, w, h);
    //                         }
    //                         this.buffer.getContext('2d').drawImage(this.canvas, 0, 0, this.canvasWidth, this.canvasHeight);
    //                         ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    //                         ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    //                         ctx.drawImage(this.buffer, bounds.left, bounds.top, Math.max(bounds.getWidth(), 1), Math.max(bounds.getHeight(), 1), bounds.left, bounds.top, bounds.getWidth(), bounds.getHeight());
    //                         var marker;
    //                         for (var i = 0; i < this.markers.length; i++) {
    //                             marker = this.markers[i];
    //                             marker.draw(ctx);
    //                         }
    //                         this.center.draw(ctx);
    //                         ctx.lineWidth = 2;
    //                         ctx.strokeStyle = 'rgba(255,228,0,1)';
    //                         ctx.strokeRect(bounds.left, bounds.top, bounds.getWidth(), bounds.getHeight());
    //                     }
    //                     else {
    //                         ctx.fillStyle = 'rgba(192,192,192,1)';
    //                         ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    //                     }
    //                 };
    //                 ImageCropper.prototype.dragCrop = function (x, y, marker) {
    //                     var bounds = this.getBounds();
    //                     var left = x - (bounds.getWidth() / 2);
    //                     var right = x + (bounds.getWidth() / 2);
    //                     var top = y - (bounds.getHeight() / 2);
    //                     var bottom = y + (bounds.getHeight() / 2);
    //                     if (right >= this.maxXClamp) {
    //                         x = this.maxXClamp - bounds.getWidth() / 2;
    //                     }
    //                     if (left <= this.minXClamp) {
    //                         x = bounds.getWidth() / 2 + this.minXClamp;
    //                     }
    //                     if (top < this.minYClamp) {
    //                         y = bounds.getHeight() / 2 + this.minYClamp;
    //                     }
    //                     if (bottom >= this.maxYClamp) {
    //                         y = this.maxYClamp - bounds.getHeight() / 2;
    //                     }
    //                     this.tl.moveX(x - (bounds.getWidth() / 2));
    //                     this.tl.moveY(y - (bounds.getHeight() / 2));
    //                     this.tr.moveX(x + (bounds.getWidth() / 2));
    //                     this.tr.moveY(y - (bounds.getHeight() / 2));
    //                     this.bl.moveX(x - (bounds.getWidth() / 2));
    //                     this.bl.moveY(y + (bounds.getHeight() / 2));
    //                     this.br.moveX(x + (bounds.getWidth() / 2));
    //                     this.br.moveY(y + (bounds.getHeight() / 2));
    //                     marker.setPosition(x, y);
    //                 };
    //                 ImageCropper.prototype.dragCorner = function (x, y, marker) {
    //                     var iX = 0;
    //                     var iY = 0;
    //                     var ax = 0;
    //                     var ay = 0;
    //                     var newHeight = 0;
    //                     var newWidth = 0;
    //                     var newY = 0;
    //                     var newX = 0;
    //                     var anchorMarker;
    //                     var fold = 0;
    //                     if (scope.keepAspect) {
    //                         anchorMarker = marker.getHorizontalNeighbour().getVerticalNeighbour();
    //                         ax = anchorMarker.getPosition().x;
    //                         ay = anchorMarker.getPosition().y;
    //                         if (x <= anchorMarker.getPosition().x) {
    //                             if (y <= anchorMarker.getPosition().y) {
    //                                 iX = ax - (100 / this.aspectRatio);
    //                                 iY = ay - (100 / this.aspectRatio * this.aspectRatio);
    //                                 fold = this.getSide(PointPool.instance.borrow(iX, iY), anchorMarker.getPosition(), PointPool.instance.borrow(x, y));
    //                                 if (fold > 0) {
    //                                     newHeight = Math.abs(anchorMarker.getPosition().y - y);
    //                                     newWidth = newHeight / this.aspectRatio;
    //                                     newY = anchorMarker.getPosition().y - newHeight;
    //                                     newX = anchorMarker.getPosition().x - newWidth;
    //                                     marker.move(newX, newY);
    //                                 }
    //                                 else if (fold < 0) {
    //                                     newWidth = Math.abs(anchorMarker.getPosition().x - x);
    //                                     newHeight = newWidth * this.aspectRatio;
    //                                     newY = anchorMarker.getPosition().y - newHeight;
    //                                     newX = anchorMarker.getPosition().x - newWidth;
    //                                     marker.move(newX, newY);
    //                                 }
    //                             }
    //                             else {
    //                                 iX = ax - (100 / this.aspectRatio);
    //                                 iY = ay + (100 / this.aspectRatio * this.aspectRatio);
    //                                 fold = this.getSide(PointPool.instance.borrow(iX, iY), anchorMarker.getPosition(), PointPool.instance.borrow(x, y));
    //                                 if (fold > 0) {
    //                                     newWidth = Math.abs(anchorMarker.getPosition().x - x);
    //                                     newHeight = newWidth * this.aspectRatio;
    //                                     newY = anchorMarker.getPosition().y + newHeight;
    //                                     newX = anchorMarker.getPosition().x - newWidth;
    //                                     marker.move(newX, newY);
    //                                 }
    //                                 else if (fold < 0) {
    //                                     newHeight = Math.abs(anchorMarker.getPosition().y - y);
    //                                     newWidth = newHeight / this.aspectRatio;
    //                                     newY = anchorMarker.getPosition().y + newHeight;
    //                                     newX = anchorMarker.getPosition().x - newWidth;
    //                                     marker.move(newX, newY);
    //                                 }
    //                             }
    //                         }
    //                         else {
    //                             if (y <= anchorMarker.getPosition().y) {
    //                                 iX = ax + (100 / this.aspectRatio);
    //                                 iY = ay - (100 / this.aspectRatio * this.aspectRatio);
    //                                 fold = this.getSide(PointPool.instance.borrow(iX, iY), anchorMarker.getPosition(), PointPool.instance.borrow(x, y));
    //                                 if (fold < 0) {
    //                                     newHeight = Math.abs(anchorMarker.getPosition().y - y);
    //                                     newWidth = newHeight / this.aspectRatio;
    //                                     newY = anchorMarker.getPosition().y - newHeight;
    //                                     newX = anchorMarker.getPosition().x + newWidth;
    //                                     marker.move(newX, newY);
    //                                 }
    //                                 else if (fold > 0) {
    //                                     newWidth = Math.abs(anchorMarker.getPosition().x - x);
    //                                     newHeight = newWidth * this.aspectRatio;
    //                                     newY = anchorMarker.getPosition().y - newHeight;
    //                                     newX = anchorMarker.getPosition().x + newWidth;
    //                                     marker.move(newX, newY);
    //                                 }
    //                             }
    //                             else {
    //                                 iX = ax + (100 / this.aspectRatio);
    //                                 iY = ay + (100 / this.aspectRatio * this.aspectRatio);
    //                                 fold = this.getSide(PointPool.instance.borrow(iX, iY), anchorMarker.getPosition(), PointPool.instance.borrow(x, y));
    //                                 if (fold < 0) {
    //                                     newWidth = Math.abs(anchorMarker.getPosition().x - x);
    //                                     newHeight = newWidth * this.aspectRatio;
    //                                     newY = anchorMarker.getPosition().y + newHeight;
    //                                     newX = anchorMarker.getPosition().x + newWidth;
    //                                     marker.move(newX, newY);
    //                                 }
    //                                 else if (fold > 0) {
    //                                     newHeight = Math.abs(anchorMarker.getPosition().y - y);
    //                                     newWidth = newHeight / this.aspectRatio;
    //                                     newY = anchorMarker.getPosition().y + newHeight;
    //                                     newX = anchorMarker.getPosition().x + newWidth;
    //                                     marker.move(newX, newY);
    //                                 }
    //                             }
    //                         }
    //                     }
    //                     else {
    //                         marker.move(x, y);
    //                     }
    //                     this.center.recalculatePosition(this.getBounds());
    //                 };
    //                 ImageCropper.prototype.getSide = function (a, b, c) {
    //                     var n = this.sign((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
    //                     //TODO move the return of the pools to outside of this function
    //                     PointPool.instance.returnPoint(a);
    //                     PointPool.instance.returnPoint(c);
    //                     return n;
    //                 };
    //                 ImageCropper.prototype.sign = function (x) {
    //                     if (+x === x) {
    //                         return (x === 0) ? x : (x > 0) ? 1 : -1;
    //                     }
    //                     return NaN;
    //                 };
    //                 ImageCropper.prototype.handleRelease = function (newCropTouch) {

    //                     if(newCropTouch==null)
    //                     {
    //                         console.log("Release null");
    //                         return;
    //                     }
    //                     var index = 0;
    //                     for (var k = 0; k < this.currentDragTouches.length; k++) {
    //                         if (newCropTouch.id == this.currentDragTouches[k].id) {
    //                             this.currentDragTouches[k].dragHandle.setDrag(false);
    //                             newCropTouch.dragHandle = null;
    //                             index = k;
    //                         }
    //                     }
    //                     this.currentDragTouches.splice(index, 1);
    //                     this.draw(this.ctx);
    //                 };
    //                 ImageCropper.prototype.handleMove = function (newCropTouch) {
    //                     var matched = false;
    //                     for (var k = 0; k < this.currentDragTouches.length; k++) {
    //                         if (newCropTouch.id == this.currentDragTouches[k].id && this.currentDragTouches[k].dragHandle != null) {
    //                             var dragTouch = this.currentDragTouches[k];
    //                             var clampedPositions = this.clampPosition(newCropTouch.x - dragTouch.dragHandle.offset.x, newCropTouch.y - dragTouch.dragHandle.offset.y);
    //                             newCropTouch.x = clampedPositions.x;
    //                             newCropTouch.y = clampedPositions.y;
    //                             PointPool.instance.returnPoint(clampedPositions);
    //                             if (dragTouch.dragHandle instanceof CornerMarker) {
    //                                 this.dragCorner(newCropTouch.x, newCropTouch.y, dragTouch.dragHandle);
    //                             }
    //                             else {
    //                                 this.dragCrop(newCropTouch.x, newCropTouch.y, dragTouch.dragHandle);
    //                             }
    //                             matched = true;
    //                             break;
    //                         }
    //                     }
    //                     if (!matched) {
    //                         for (var i = 0; i < this.markers.length; i++) {
    //                             var marker = this.markers[i];
    //                             if (marker.touchInBounds(newCropTouch.x, newCropTouch.y)) {
    //                                 newCropTouch.dragHandle = marker;
    //                                 this.currentDragTouches.push(newCropTouch);
    //                                 marker.setDrag(true);
    //                                 newCropTouch.dragHandle.offset.x = newCropTouch.x - newCropTouch.dragHandle.getPosition().x;
    //                                 newCropTouch.dragHandle.offset.y = newCropTouch.y - newCropTouch.dragHandle.getPosition().y;
    //                                 this.dragCorner(newCropTouch.x - newCropTouch.dragHandle.offset.x, newCropTouch.y - newCropTouch.dragHandle.offset.y, newCropTouch.dragHandle);
    //                                 break;
    //                             }
    //                         }
    //                         if (newCropTouch.dragHandle == null) {
    //                             if (this.center.touchInBounds(newCropTouch.x, newCropTouch.y)) {
    //                                 newCropTouch.dragHandle = this.center;
    //                                 this.currentDragTouches.push(newCropTouch);
    //                                 newCropTouch.dragHandle.setDrag(true);
    //                                 newCropTouch.dragHandle.offset.x = newCropTouch.x - newCropTouch.dragHandle.getPosition().x;
    //                                 newCropTouch.dragHandle.offset.y = newCropTouch.y - newCropTouch.dragHandle.getPosition().y;
    //                                 this.dragCrop(newCropTouch.x - newCropTouch.dragHandle.offset.x, newCropTouch.y - newCropTouch.dragHandle.offset.y, newCropTouch.dragHandle);
    //                             }
    //                         }
    //                     }
    //                 };
    //                 ImageCropper.prototype.updateClampBounds = function () {
    //                     var sourceAspect = this.srcImage.height / this.srcImage.width;
    //                     var canvasAspect = this.canvas.height / this.canvas.width;
    //                     var w = this.canvas.width;
    //                     var h = this.canvas.height;
    //                     if (canvasAspect > sourceAspect) {
    //                         w = this.canvas.width;
    //                         h = this.canvas.width * sourceAspect;
    //                     }
    //                     else {
    //                         h = this.canvas.height;
    //                         w = this.canvas.height / sourceAspect;
    //                     }
    //                     this.minXClamp = this.canvas.width / 2 - w / 2;
    //                     this.minYClamp = this.canvas.height / 2 - h / 2;
    //                     this.maxXClamp = this.canvas.width / 2 + w / 2;
    //                     this.maxYClamp = this.canvas.height / 2 + h / 2;
    //                 };
    //                 ImageCropper.prototype.clampPosition = function (x, y) {
    //                     if (x < this.minXClamp) {
    //                         x = this.minXClamp;
    //                     }
    //                     if (x > this.maxXClamp) {
    //                         x = this.maxXClamp;
    //                     }
    //                     if (y < this.minYClamp) {
    //                         y = this.minYClamp;
    //                     }
    //                     if (y > this.maxYClamp) {
    //                         y = this.maxYClamp;
    //                     }
    //                     return PointPool.instance.borrow(x, y);
    //                 };
    //                 ImageCropper.prototype.isImageSet = function () {
    //                     return this.imageSet;
    //                 };
    //                 ImageCropper.prototype.setImage = function (img) {
    //                     if (!img) {
    //                         throw "Image is null";
    //                     }
    //                     this.imageSet = true;
    //                     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //                     var bufferContext = this.buffer.getContext('2d');
    //                     bufferContext.clearRect(0, 0, this.buffer.width, this.buffer.height);
    //                     var splitName = img.src.split('.');
    //                     var fileType = splitName[1];
    //                     if (fileType == 'jpeg' || fileType == 'jpg') {
    //                         this.fileType = fileType;
    //                     }
    //                     this.srcImage = img;
    //                     this.updateClampBounds();
    //                     var sourceAspect = this.srcImage.height / this.srcImage.width;
    //                     var cropBounds = this.getBounds();
    //                     var cropAspect = cropBounds.getHeight() / cropBounds.getWidth();
    //                     var w = this.canvas.width;
    //                     var h = this.canvas.height;
    //                     this.canvasWidth = w;
    //                     this.canvasHeight = h;
    //                     var cX = this.canvas.width / 2;
    //                     var cY = this.canvas.height / 2;
    //                     var tlPos = PointPool.instance.borrow(cX - cropBounds.getWidth() / 2, cY + cropBounds.getHeight() / 2);
    //                     var trPos = PointPool.instance.borrow(cX + cropBounds.getWidth() / 2, cY + cropBounds.getHeight() / 2);
    //                     var blPos = PointPool.instance.borrow(cX - cropBounds.getWidth() / 2, cY - cropBounds.getHeight() / 2);
    //                     var brPos = PointPool.instance.borrow(cX + cropBounds.getWidth() / 2, cY - cropBounds.getHeight() / 2);
    //                     this.tl.setPosition(tlPos.x, tlPos.y);
    //                     this.tr.setPosition(trPos.x, trPos.y);
    //                     this.bl.setPosition(blPos.x, blPos.y);
    //                     this.br.setPosition(brPos.x, brPos.y);
    //                     PointPool.instance.returnPoint(tlPos);
    //                     PointPool.instance.returnPoint(trPos);
    //                     PointPool.instance.returnPoint(blPos);
    //                     PointPool.instance.returnPoint(brPos);
    //                     this.center.setPosition(cX, cY);
    //                     if (cropAspect > sourceAspect) {
    //                         var imageH = Math.min(w * sourceAspect, h);
    //                         if (cropBounds.getHeight() > imageH) {
    //                             var cropW = imageH / cropAspect;
    //                             tlPos = PointPool.instance.borrow(cX - cropW / 2, cY + imageH / 2);
    //                             trPos = PointPool.instance.borrow(cX + cropW / 2, cY + imageH / 2);
    //                             blPos = PointPool.instance.borrow(cX - cropW / 2, cY - imageH / 2);
    //                             brPos = PointPool.instance.borrow(cX + cropW / 2, cY - imageH / 2);
    //                             this.tl.setPosition(tlPos.x, tlPos.y);
    //                             this.tr.setPosition(trPos.x, trPos.y);
    //                             this.bl.setPosition(blPos.x, blPos.y);
    //                             this.br.setPosition(brPos.x, brPos.y);
    //                             PointPool.instance.returnPoint(tlPos);
    //                             PointPool.instance.returnPoint(trPos);
    //                             PointPool.instance.returnPoint(blPos);
    //                             PointPool.instance.returnPoint(brPos);
    //                         }
    //                     }
    //                     else if (cropAspect < sourceAspect) {
    //                         var imageW = Math.min(h / sourceAspect, w);
    //                         if (cropBounds.getWidth() > imageW) {
    //                             var cropH = imageW * cropAspect;
    //                             tlPos = PointPool.instance.borrow(cX - imageW / 2, cY + cropH / 2);
    //                             trPos = PointPool.instance.borrow(cX + imageW / 2, cY + cropH / 2);
    //                             blPos = PointPool.instance.borrow(cX - imageW / 2, cY - cropH / 2);
    //                             brPos = PointPool.instance.borrow(cX + imageW / 2, cY - cropH / 2);
    //                             this.tl.setPosition(tlPos.x, tlPos.y);
    //                             this.tr.setPosition(trPos.x, trPos.y);
    //                             this.bl.setPosition(blPos.x, blPos.y);
    //                             this.br.setPosition(brPos.x, brPos.y);
    //                             PointPool.instance.returnPoint(tlPos);
    //                             PointPool.instance.returnPoint(trPos);
    //                             PointPool.instance.returnPoint(blPos);
    //                             PointPool.instance.returnPoint(brPos);
    //                         }
    //                     }
    //                     this.vertSquashRatio = this.detectVerticalSquash(img);
    //                     this.draw(this.ctx);
    //                     var croppedImg = this.getCroppedImage(scope.cropWidth, scope.cropHeight);
    //                     scope.croppedImage = croppedImg.src;
                      
    //                 };
    //                 ImageCropper.prototype.getCroppedImage = function (fillWidth, fillHeight) {
    //                     var bounds = this.getBounds();
    //                     if (!this.srcImage) {
    //                         throw "Source image not set.";
    //                     }
    //                     if (fillWidth && fillHeight) {
    //                         var sourceAspect = this.srcImage.height / this.srcImage.width;
    //                         var canvasAspect = this.canvas.height / this.canvas.width;
    //                         var w = this.canvas.width;
    //                         var h = this.canvas.height;
    //                         if (canvasAspect > sourceAspect) {
    //                             w = this.canvas.width;
    //                             h = this.canvas.width * sourceAspect;
    //                         }
    //                         else if (canvasAspect < sourceAspect) {
    //                             h = this.canvas.height;
    //                             w = this.canvas.height / sourceAspect;
    //                         }
    //                         else {
    //                             h = this.canvas.height;
    //                             w = this.canvas.width;
    //                         }
    //                         this.ratioW = w / this.srcImage.width;
    //                         this.ratioH = h / this.srcImage.height;
    //                         this.cropCanvas.width = fillWidth;
    //                         this.cropCanvas.height = fillHeight;
    //                         var offsetH = (this.buffer.height - h) / 2 / this.ratioH;
    //                         var offsetW = (this.buffer.width - w) / 2 / this.ratioW;
    //                         var boundsMultiWidth = 1;
    //                         var boundsMultiHeight = 1;
    //                         if (this.ratioW < 1) {
    //                             boundsMultiWidth = this.ratioW;
    //                         }
    //                         if (this.ratioH < 1) {
    //                             boundsMultiHeight = this.ratioH;
    //                         }
    //                         this.drawImageIOSFix(this.cropCanvas.getContext('2d'), this.srcImage, Math.max(Math.round((bounds.left) / this.ratioW - offsetW), 0), Math.max(Math.round(bounds.top / this.ratioH - offsetH), 0), Math.max(Math.round(bounds.getWidth() / boundsMultiWidth), 1), Math.max(Math.round(bounds.getHeight() / boundsMultiHeight), 1), 0, 0, fillWidth, fillHeight);
    //                         this.croppedImage.width = fillWidth;
    //                         this.croppedImage.height = fillHeight;
    //                     }
    //                     else {
    //                         this.cropCanvas.width = Math.max(bounds.getWidth(), 1);
    //                         this.cropCanvas.height = Math.max(bounds.getHeight(), 1);
    //                         this.cropCanvas.getContext('2d').drawImage(this.buffer, bounds.left, bounds.top, Math.max(bounds.getWidth(), 1), Math.max(bounds.getHeight(), 1), 0, 0, bounds.getWidth(), bounds.getHeight());
    //                         this.croppedImage.width = this.cropCanvas.width;
    //                         this.croppedImage.height = this.cropCanvas.height;
    //                     }
    //                     this.croppedImage.src = this.cropCanvas.toDataURL("image/" + this.fileType);
    //                     return this.croppedImage;
    //                 };
    //                 ImageCropper.prototype.getBounds = function () {
    //                     var minX = Number.MAX_VALUE;
    //                     var minY = Number.MAX_VALUE;
    //                     var maxX = -Number.MAX_VALUE;
    //                     var maxY = -Number.MAX_VALUE;
    //                     for (var i = 0; i < this.markers.length; i++) {
    //                         var marker = this.markers[i];
    //                         if (marker.getPosition().x < minX) {
    //                             minX = marker.getPosition().x;
    //                         }
    //                         if (marker.getPosition().x > maxX) {
    //                             maxX = marker.getPosition().x;
    //                         }
    //                         if (marker.getPosition().y < minY) {
    //                             minY = marker.getPosition().y;
    //                         }
    //                         if (marker.getPosition().y > maxY) {
    //                             maxY = marker.getPosition().y;
    //                         }
    //                     }
    //                     var bounds = new Bounds();
    //                     bounds.left = minX;
    //                     bounds.right = maxX;
    //                     bounds.top = minY;
    //                     bounds.bottom = maxY;
    //                     return bounds;
    //                 };
    //                 ImageCropper.prototype.getMousePos = function (canvas, evt) {
    //                     var rect = canvas.getBoundingClientRect();
    //                     return PointPool.instance.borrow(evt.clientX - rect.left, evt.clientY - rect.top);
    //                 };
    //                 ImageCropper.prototype.getTouchPos = function (canvas, touch) {
    //                     var rect = canvas.getBoundingClientRect();
    //                     return PointPool.instance.borrow(touch.clientX - rect.left, touch.clientY - rect.top);
    //                 };
    //                 ImageCropper.prototype.onTouchMove = function (e) {
    //                     e.preventDefault();
    //                     if (e.touches.length >= 1) {
    //                         for (var i = 0; i < e.touches.length; i++) {
    //                             var touch = e.touches[i];
    //                             var touchPosition = this.getTouchPos(this.canvas, touch);
    //                             var cropTouch = new CropTouch(touchPosition.x, touchPosition.y, touch.identifier);
    //                             PointPool.instance.returnPoint(touchPosition);
    //                             this.move(cropTouch, e);
    //                         }
    //                     }
    //                     this.draw(this.ctx);
    //                 };
    //                 ImageCropper.prototype.onMouseMove = function (e) {
    //                     var mousePosition = this.getMousePos(this.canvas, e);
    //                     this.move(new CropTouch(mousePosition.x, mousePosition.y, 0), e);
    //                     var dragTouch = this.getDragTouchForID(0);
    //                     if (dragTouch) {
    //                         dragTouch.x = mousePosition.x;
    //                         dragTouch.y = mousePosition.y;
    //                     }
    //                     else {
    //                         dragTouch = new CropTouch(mousePosition.x, mousePosition.y, 0);
    //                     }
    //                     PointPool.instance.returnPoint(mousePosition);
    //                     this.drawCursors(dragTouch, e);
    //                     this.draw(this.ctx);
    //                 };
    //                 ImageCropper.prototype.move = function (cropTouch, e) {
    //                     if (this.isMouseDown) {
    //                         this.handleMove(cropTouch);
    //                     }
    //                 };
    //                 ImageCropper.prototype.getDragTouchForID = function (id) {
    //                     for (var i = 0; i < this.currentDragTouches.length; i++) {
    //                         if (id == this.currentDragTouches[i].id) {
    //                             return this.currentDragTouches[i];
    //                         }
    //                     }
    //                 };
    //                 ImageCropper.prototype.drawCursors = function (cropTouch, e) {
    //                     var cursorDrawn = false;
    //                     if (cropTouch != null) {
    //                         if (cropTouch.dragHandle == this.center) {
    //                             this.canvas.style.cursor = 'move';
    //                             cursorDrawn = true;
    //                         }
    //                         if (cropTouch.dragHandle != null && cropTouch.dragHandle instanceof CornerMarker) {
    //                             this.drawCornerCursor(cropTouch.dragHandle, cropTouch.dragHandle.getPosition().x, cropTouch.dragHandle.getPosition().y, e);
    //                             cursorDrawn = true;
    //                         }
    //                     }
    //                     var didDraw = false;
    //                     if (!cursorDrawn) {
    //                         for (var i = 0; i < this.markers.length; i++) {
    //                             didDraw = didDraw || this.drawCornerCursor(this.markers[i], cropTouch.x, cropTouch.y, e);
    //                         }
    //                         if (!didDraw) {
    //                             var el = e.target;
    //                             el.style.cursor = 'initial';
    //                         }
    //                     }
    //                     if (!didDraw && !cursorDrawn && this.center.touchInBounds(cropTouch.x, cropTouch.y)) {
    //                         this.center.setOver(true);
    //                         this.canvas.style.cursor = 'move';
    //                     }
    //                     else {
    //                         this.center.setOver(false);
    //                     }
    //                 };
    //                 ImageCropper.prototype.drawCornerCursor = function (marker, x, y, e) {
    //                     var el;
    //                     if (marker.touchInBounds(x, y)) {
    //                         marker.setOver(true);
    //                         if (marker.getHorizontalNeighbour().getPosition().x > marker.getPosition().x) {
    //                             if (marker.getVerticalNeighbour().getPosition().y > marker.getPosition().y) {
    //                                 el = e.target;
    //                                 el.style.cursor = 'nwse-resize';
    //                             }
    //                             else {
    //                                 el = e.target;
    //                                 el.style.cursor = 'nesw-resize';
    //                             }
    //                         }
    //                         else {
    //                             if (marker.getVerticalNeighbour().getPosition().y > marker.getPosition().y) {
    //                                 el = e.target;
    //                                 el.style.cursor = 'nesw-resize';
    //                             }
    //                             else {
    //                                 el = e.target;
    //                                 el.style.cursor = 'nwse-resize';
    //                             }
    //                         }
    //                         return true;
    //                     }
    //                     marker.setOver(false);
    //                     return false;
    //                 };
    //                 ImageCropper.prototype.onMouseDown = function (e) {
    //                     this.isMouseDown = true;
    //                 };
    //                 ImageCropper.prototype.onTouchStart = function (e) {
    //                     this.isMouseDown = true;
    //                 };
    //                 ImageCropper.prototype.onTouchEnd = function (e) {
    //                     for (var i = 0; i < e.changedTouches.length; i++) {
    //                         var touch = e.changedTouches[i];
    //                         var dragTouch = this.getDragTouchForID(touch.identifier);
    //                         if (dragTouch != null) {
    //                             if (dragTouch.dragHandle instanceof CornerMarker || dragTouch.dragHandle instanceof DragMarker) {
    //                                 dragTouch.dragHandle.setOver(false);
    //                             }
    //                             this.handleRelease(dragTouch);
    //                         }
    //                     }
    //                     if (this.currentDragTouches.length == 0) {
    //                         this.isMouseDown = false;
    //                     }
    //                      if (crop.isImageSet())
    //                     {
    //                       var img = this.getCroppedImage(scope.cropWidth, scope.cropHeight);
    //                       scope.croppedImage = img.src;
    //                       scope.$apply();
    //                     }
    //                 };
    //                 ImageCropper.prototype.onMouseUp = function (e) {
    //                     console.log("MouseUp");
    //                     this.handleRelease(new CropTouch(0, 0, 0));
    //                     if (this.currentDragTouches.length == 0) {
    //                         this.isMouseDown = false;
    //                     }
    //                 };
    //                 //http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
    //                 ImageCropper.prototype.drawImageIOSFix = function (ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    //                     // Works only if whole image is displayed:
    //                     // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
    //                     // The following works correct also when only a part of the image is displayed:
    //                     ctx.drawImage(img, sx * this.vertSquashRatio, sy * this.vertSquashRatio, sw * this.vertSquashRatio, sh * this.vertSquashRatio, dx, dy, dw, dh);
    //                 };
    //                 ImageCropper.prototype.detectVerticalSquash = function (img) {
    //                     var iw = img.naturalWidth, ih = img.naturalHeight;
    //                     var canvas = document.createElement('canvas');
    //                     canvas.width = 1;
    //                     canvas.height = ih;
    //                     var ctx = canvas.getContext('2d');
    //                     ctx.drawImage(img, 0, 0);
    //                     var data = ctx.getImageData(0, 0, 1, ih).data;
    //                     // search image edge pixel position in case it is squashed vertically.
    //                     var sy = 0;
    //                     var ey = ih;
    //                     var py = ih;
    //                     while (py > sy) {
    //                         var alpha = data[(py - 1) * 4 + 3];
    //                         if (alpha === 0) {
    //                             ey = py;
    //                         }
    //                         else {
    //                             sy = py;
    //                         }
    //                         py = (ey + sy) >> 1;
    //                     }
    //                     var ratio = (py / ih);
    //                     return (ratio === 0) ? 1 : ratio;
    //                 };
    //                 ImageCropper.prototype.onMouseDown = function (e) {
    //                     this.isMouseDown = true;
    //                 };
    //                 ImageCropper.prototype.onMouseUp = function (e) {
    //                     if (crop.isImageSet())
    //                     {
    //                         this.isMouseDown = false;
    //                         this.handleRelease(new CropTouch(0,0,0));
    //                         var img = this.getCroppedImage(scope.cropWidth, scope.cropHeight);
    //                         scope.croppedImage = img.src;
    //                         scope.$apply();
    //                     }
    //                 };

    //                 return ImageCropper;
    //             })();
    //             angular.element(document).ready(function()
    //             {
    //                 var el = angular.element(element[0]);
    //                 var canvas = el[0];
    //                 var width = scope.cropWidth;
    //                 var height = scope.cropHeight;
    //                 var keepAspect = scope.keepAspect;
    //                 var touchRadius = scope.touchRadius;
    //                 crop = new ImageCropper(canvas, canvas.width/2-width/2, canvas.height/2-height/2,width, height, keepAspect, touchRadius);

    //             });

    //             scope.$watch('image',
    //                 function( newValue ) {
    //                     if(newValue!=null) {
    //                         var imageObj = new Image();
    //                       imageObj.addEventListener("load", function () {
                                          
    //                         crop.setImage(imageObj);
    //                          var img = crop.getCroppedImage(scope.cropWidth, scope.cropHeight);
    //                         scope.croppedImage = img.src;
    //                         scope.$apply();
    //                         }, false);
    //                       imageObj.src = newValue;
                            
    //                     }
    //                 }
    //             );
    //         }
    //     };
    // }]);

    // angular.module('angular-img-cropper').directive("imgCropperFileread", ['$timeout',function ($timeout) {
    //     return {
    //         scope: {
    //             image: "="
    //         },
    //         link: function (scope, element, attributes) {
    //             element.bind("change", function (changeEvent) {
    //                 var reader = new FileReader();
    //                 reader.onload = function (loadEvent) {
    //                     $timeout(function () {
    //                         scope.image = loadEvent.target.result;
    //                     },0);
    //                 };
    //                 reader.readAsDataURL(changeEvent.target.files[0]);
    //             });
    //         }
    //     };
    // }]);

    angular.module("redeemar-app").controller('DashboardController',["$scope", "PlaceholderTextService", "ngTableParams", "$filter", "$http", "fileToUpload","$route",function (a, b, c, d, x, fu, r) { 
        window.location.href = "dashboard#/promotion/create";
    }]);

    