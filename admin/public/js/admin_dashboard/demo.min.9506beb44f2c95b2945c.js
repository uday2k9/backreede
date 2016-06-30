! function() {
    "use strict";
    
    angular.module("redeemar-app", ["app.constants", "ngRoute", "ngAnimate", "ngSanitize", "angular.mdl", "ml.chat", "ml.menu", "ml.svg-map", "ml.todo", "ui.select", "ngFileUpload", "ngWig", "pikaday", "ngPlaceholders", "ngTable", "uiGmapgoogle-maps", "gridshore.c3js.chart", "angularGrid", "LocalStorageModule","angularUtils.directives.dirPagination", "partner-app"])
}(),
function() {
    "use strict";
   
    function a(a,file_path) {
        var site_path=$("#site_path").val();
        a.when("/", {
            templateUrl: site_path+"view/dashboard.html"
        }).when("/:folder/:tpl", {
            templateUrl: function(a) { 
                return site_path+"view/" + a.folder + "/" + a.tpl + ".html"
            }
        }).when("/:tpl", {
            templateUrl: function(a) {
                return site_path+"view/" + a.tpl + ".html"
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

            h.post("../admin/dashboard/userdetails")
            .success(function (data) {                
                a.ReedemerDetails=data;
            });  
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

        function a(a, b, c, d, x, fu,hb) {
            a.dataLength={filtered:[]};
            a.cnames = [];
            a.logo_details = [];
            a.currentPage = 0;
            a.pageSize = 5;

            a.width = 300;
            a.height = 300;
            
            var cat_id = $("#cat_id").val();
            a.all_logo_details=[];

            var site_path=$("#site_path").val();
            var update_id =$("#update_id").val();

            a.img_file_path =site_path;

           
            // Category, sub-cat listing
            $('#category_id').on('change',function(){
                var category_id = $(this).val();
                // var site_path=$("#site_path").val();           
                // alert(category_id);
                //return false;
                if(category_id){
                    $.ajax({
                        type:'GET',
                        url:'../admin/dashboard/subcategory/'+category_id,
                        //data:'parent_id='+category_id,
                        success:function(html){
                            //alert(site_path);
                             var new_html="<option value=''>----</option>";
                              for(var i=0; i<html.length; i++)
                              {
                                new_html+="<option value='"+html[i].id+"'>"+html[i].cat_name+"</option>";
                              }
                            //alert(JSON.stringify(new_html,null,4));
                            $('#subcat_id').html(new_html);
                        }

                    }); 
                }else{
                    $('#subcat_id').html('<option value="">Select state first</option>'); 
                }
            });

           
            // show all uploaded logo in admin panel           
            x.post("../admin/dashboard/logo").success(function(data_response){              
                a.logo_details = data_response;                
                a.file_path=site_path; 
            });
            setTimeout(function() { 
                x.get("../cron/updaterating").success(function(data_new){
                        x.post("../admin/dashboard/logo").success(function(data_value){       
                        a.logo_details = data_value;                
                        a.file_path=site_path;
                    });
                });
            }, 10000);

            // show all uploaded logo in admin panel 
            if($("#cat_id").val())
            {
                var new_cat_id = $("#cat_id").val();
            }
           
            a.new_cat_id=new_cat_id;
            a.category_details = {};
            x.post("../admin/dashboard/category",update_id).success(function(category_data_response){              
                a.category_details = category_data_response;                
                a.file_path=site_path; 
                a.cat_id=cat_id;                
            });

            x.get("../admin/dashboard/allcategory").success(function(category_data_drop){              
                a.category_drop = category_data_drop;   
            });


          
            a.update_category=function(itemId,itemStatus){
               x.get("../admin/dashboard/categoryupdate/"+itemId+"/"+itemStatus).success(function(response){
                  a.status=response;                 
                  window.location.reload();             
               })
            }


            a.add_category=function(){                
               a.show_success_msg=false; 
               a.show_error_msg=false; 

               var new_cat_id_u=$("#cat_id").val();
               var parent_id=$("#parent_id").val();
               
               a.category.parent_id = parent_id;
              
               $('#add_category').prop('disabled', true);
               $("#add_category").text('Saving..');              
               x.post("../admin/dashboard/storecategory", a.category).success(function(response){
                
                  if(response=="success")
                  {                    
                    var main_site_url=$("#main_site_url").val();                                    
                    var redirect_url=main_site_url+'/admin/dashboard#/tables/category_list'; 

                    $("#error_div").hide();
                    $("#show_message").slideDown();
                    $("#success_div").html("Data inserted successfully. <br />Please wait,we will redirect you to listing page.");
                    $("#success_div").show();              

                    setTimeout(function() { 
                    window.location.href = redirect_url; 
                    }, 5000);
                  }                 
                  else
                  {
                      $("#error_div").hide();
                      $("#show_message").slideDown();
                      $("#error_div").html("Please insert all field.");
                      $("#error_div").show();
                      $("#success_div").hide();

                      $('#add_reedemer').prop('disabled', false);
                      $("#add_reedemer").text('Save user');     
                  }
               })
            }

            a.category_edit=function(itemId){
              $("#update_id").val(itemId);              
              var main_site_url=$("#main_site_url").val(); 
              var edit_url=main_site_url+'/admin/dashboard#/tables/category_edit/';    
              window.location.href = edit_url;             
            }

            a.edit_category=function(){              
              var main_site_url=$('#main_site_url').val();   
              var cat_name=$('#cat_name').val();
             
              //alert("V");
              //return false;
              a.cat_details= [{
                                'cat_name':cat_name,
                                'id':update_id
                              }];             
             // alert(JSON.stringify(a.cat_details,null,4));
             // return false;
              x.post(main_site_url+"/admin/dashboard/editcategory",a.cat_details).success(function(response){
                var main_site_url=$("#main_site_url").val();                              
                var redirect_url=main_site_url+'/admin/dashboard#/tables/category_list';
                
                //alert(JSON.stringify(response,null,4));
                //return false;
                if(response=='success')
                {
                  $("#update_id").val('');                  
                  $("#error_div").hide();
                  $("#show_message").slideDown();
                  $("#success_div").html("Data updated successfully. <br />Please wait,we will reload this page.");
                  $("#success_div").show(); 


                  setTimeout(function() {
                    window.location.href = redirect_url; 
                  }, 5000);
                }
                else if(response=='invalid_id')
                {
                  $("#error_div").hide();
                  $("#show_message").slideDown();
                  $("#error_div").html("Error occoure! Please try again.");
                  $("#error_div").show();
                  $("#success_div").hide();

                  setTimeout(function() { 
                    window.location.href = redirect_url; 
                  }, 2000);
                }
                else
                {
                  $("#error_div").hide();
                  $("#show_message").slideDown();
                  $("#error_div").html("Please insert all field.");
                  $("#error_div").show();
                  $("#success_div").hide(); 
                }
                
              });
            }

            a.delete_category=function(itemId){ 
             if(confirm("Are you sure?"))
             {
                var main_site_url=$('#main_site_url').val();

                $(".delete_row").hide();
                $("td#row_"+itemId).parent()
                .replaceWith('<tr><td colspan="5" class="center"><img src="'+main_site_url+'/images/loader.gif" /></td></tr>');               
                x.get(site_path+"admin/dashboard/deletecategory/"+itemId).success(function(response){
               //  alert(response);
                  if(response=='success')
                  {                   
                    $("#error_div").hide();
                    $("#show_message").slideDown();
                    $("#success_div").html("Data deleted successfully. <br />Please wait,we will reload this page.");
                    $("#success_div").show();              

                    setTimeout(function() { 
                      window.location.reload(); 
                    }, 5000);                                 
                  }
                  if(response=='subcat_exists')
                  { 
                    $("#error_div").hide();
                    $("#show_message").slideDown();
                    $("#error_div").html("Please remove all sub category under this category before delete this.");
                    $("#error_div").show();
                    $("#success_div").hide(); 
                    setTimeout(function() { 
                      window.location.reload(); 
                    }, 5000); 
                  }
                  if(response=='error')
                  { 
                    $("#error_div").hide();
                    $("#show_message").slideDown();
                    $("#error_div").html("Upable to delete category now. <br/> Please try after some time.");
                    $("#error_div").show();
                    $("#success_div").hide(); 
                    setTimeout(function() { 
                      window.location.reload(); 
                    }, 5000); 
                  }
               })
             }
            }
            $("#pre").hide();
            $("#crop_it_again").hide();
            a.set_cat_id = function(cat_id){
               // alert(cat_id);
               // return false;
              //a.dir_id=dir_id;
              $("#cat_id").val(cat_id);
               // x.get("../directory/category/"+dir_id).success(function(response){
                 // alert(JSON.stringify(response, null, 4)); 
               //   a.repo_details=response
                  //a.file_path=site_path
               // });
                // alert(cat_id);
                 a.cat_details= [{                               
                                'parent_id':cat_id,
                                'sub_cat':1
                              }]; 

                             // alert(JSON.stringify(a.cat_details, null, 4)); 
                              //return false;
                 x.post("../admin/dashboard/category",a.cat_details).success(function(category_data_response){              
                    // alert(JSON.stringify(category_data_response, null, 4)); 
                //     return false;
                     a.category_details = category_data_response;                
                     a.file_path=site_path; 
                     a.cat_id=cat_id;
                 });
            }; 

            a.back_cat=function(){   

               // var main_site_url=$('#main_site_url').val();       
               // var redirect_url=main_site_url+'/admin/dashboard#/tables/category_list';
               // alert(redirect_url)         ;
               // $("#cat_id").val('');
               // window.location.href=redirect_url;   
              // history.back();
              // window.location.reload();   
             //hb.history.back();
            }

            function readFile(input) {
              if (input.files && input.files[0]) {
                      var reader = new FileReader();
                      
                      reader.onload = function (e) {
                        $uploadCrop.croppie('bind', {
                          url: e.target.result
                        });
                        $('.upload-demo').addClass('ready');
                      }
                      
                     reader.readAsDataURL(input.files[0]);


                  }
                  else {
                    swal("Sorry - you're browser doesn't support the FileReader API");
                }
            }

             function OnGetFile (e) {
          
            e.stopPropagation();
            e.preventDefault();
            var file = null;
            if (e.dataTransfer) {// file drag and drop
              file = e.dataTransfer.files[0] || null;
            } else if ($("#logo_name")[0].files) {// file upload
              file = $("#logo_name")[0].files[0] || null;
            }
            if (!file) {
              return;
            }

            var reader = new FileReader();
            reader.readAsDataURL(file, "UTF-8");
            reader.onload = function (e) {
             // $("#filename").html("Result: '"+ file.name +"' ("+ e.target.result.length +" B)");
              // $("#result").val(e.target.result);

            $("#upload-demo").hide();
            $("#img_data").empty();
            $("#img_data").show();
            $("#img_data").append("<img id='image_src' src='"+e.target.result+"' style='width:200px;height:200px'>");
            $("#crop_it").hide();
            $("#crop_it_again").show();
            };
            reader.onerror = function (e) {
              console.log(e.target.error);

             // $("#result").val(e.target.error);
            };
          }

          function OnGetFile1 (e) {
          
            e.stopPropagation();
            e.preventDefault();
            var file = null;
            if (e.dataTransfer) {// file drag and drop
              file = e.dataTransfer.files[0] || null;
            } else if ($("#logo_name")[0].files) {// file upload
              file = $("#logo_name")[0].files[0] || null;
            }
            if (!file) {
              return;
            }

            var reader = new FileReader();
            reader.readAsDataURL(file, "UTF-8");
            reader.onload = function (e) {
             // $("#filename").html("Result: '"+ file.name +"' ("+ e.target.result.length +" B)");
              // $("#result").val(e.target.result);

           
            $("#img_data").empty();
             $("#img_data").hide();
            $("#img_data").append("<img id='image_src' src='"+e.target.result+"' style='width:200px;height:200px'>");
            $("#crop_it").show();
            $("#crop_it_again").hide();
            };
            reader.onerror = function (e) {
              console.log(e.target.error);

             // $("#result").val(e.target.error);
            };
          }



            function changeHeightWidth(input){
                var file, img;
                if ((file = input.files[0])) {
                    img = new Image();
                    img.onload = function () {
                        alert(this.width + " " + this.height);
                        console.log("this.width :: "+this.width+"  this.height :: "+this.height);
                        if(this.width == this.height){
                            a.width = 460;
                            a.height = 460;
                        } else if(this.width > this.height){
                            a.width = 460;
                            a.height = 323;
                        } else {
                            a.width = 200;
                            a.height = 360;
                        }
                    };
                }
                $("#pre").show();
                readFile(input); 
            }

            var $uploadCrop = $('#upload-demo').croppie({
                enableExif: true,
                viewport: {
                    width: a.width,
                    height: a.height,
                    type: 'square'
                },
                boundary: {
                    width: 500,
                    height: 500
                },
            });

             $('#logo_name').on('change', function () { 
                $("#upload-demo").show();
                $("#img_data").empty();
                 changeHeightWidth(this);  
                 $("#cp_it").click();    
                // readFile(this); 

            });

             $("#crop_it").click(function(){
               $("#crop_it").hide();
               $("#crop_it_again").show();
                
                $uploadCrop.croppie('result', {
                type: 'canvas',
                size: 'viewport'
                }).then(function (resp) {
                    $("#upload-demo").hide();
                    $("#img_data").empty();
                    $("#img_data").show();
                    $("#img_data").append("<img id='image_src' src='"+resp+"' style='width:200px;height:200px'>");
                });

             });

             $("#crop_it_again").click(function(){
                $("#upload-demo").show();
                $("#img_data").empty();
                $("#crop_it").show();
               $("#crop_it_again").hide();
                // $('#upload-demo').empty();
             });


             $("#use_original").on("click",OnGetFile);
             $("#cp_it").on("click",OnGetFile1);
   
                  
            // Upload logo by admin
            a.uploadFile = function(){
                var file = a.myFile;
                $('#upload_file').prop('disabled', false);
                $("#upload_file").text('Saving..');
              
                // validation to enter company name,search text and logo
                if($("#company_name").val()=='')
                {
                    $("#error_div").hide();
                    $("#show_message").slideDown();
                    $("#error_div").html("Please insert company name.");
                    $("#error_div").show();
                    $("#success_div").hide();

                    $('#upload_file').prop('disabled', false);
                    $("#upload_file").text('Save');
                    return false;
                }
                if($("#logo_text").val()=='')
                {
                    $("#error_div").hide();
                    $("#show_message").slideDown();
                    $("#error_div").html("Please insert search text.");
                    $("#error_div").show();
                    $("#success_div").hide();

                    $('#upload_file').prop('disabled', false);
                    $("#upload_file").text('Save');
                    return false;
                }
                if($("#category_id").val()=='')
                {
                    $("#error_div").hide();
                    $("#show_message").slideDown();
                    $("#error_div").html("Please select a category.");
                    $("#error_div").show();
                    $("#success_div").hide();

                    $('#upload_file').prop('disabled', false);
                    $("#upload_file").text('Save');
                    return false;
                }
                if($("#logo_name").val()=='')
                {
                    $("#error_div").hide();
                    $("#show_message").slideDown();
                    $("#error_div").html("Please upload a logo.");
                    $("#error_div").show();
                    $("#success_div").hide();

                    $('#upload_file').prop('disabled', false);
                    $("#upload_file").text('Save');
                    return false;
                }
                

                var ext = $('#logo_name').val().split('.').pop().toLowerCase();
                var file_size = $('#logo_name')[0].files[0].size;

                if($.inArray(ext, ['jpg','jpeg','png','gif']) == -1) {
                    $("#show_message").slideDown();
                    $("#error_div").html("Please upload only .jpg /.jpeg /.png /.gif image.");
                    $("#error_div").show();
                    $("#success_div").hide();

                    $('#upload_file').prop('disabled', false);
                    $("#upload_file").text('Save');
                    return false;
                }
                if(file_size>2097152) { 
                    $("#show_message").slideDown();
                    $("#error_div").html("Please upload only .jpg /.jpeg /.png /.gif image within 2MB");
                    $("#error_div").show();
                    $("#success_div").hide();

                    $('#upload_file').prop('disabled', false);
                    $("#upload_file").text('Save');
                    return false;
                }
                // End validation

                var contact_email = $("#contact_email").val();
                var category_id = $("#category_id").val();
                var subcat_id = $("#subcat_id").val();
                var logo_text = $("#logo_text").val();   
                var contact_email = $("#contact_email").val();
                var main_site_url = $("#main_site_url").val(); 
                var company_name = $("#company_name").val();
                var first_name = $("#first_name").val();
                var last_name = $("#last_name").val();
                var address = $("#address").val();
                var postal_code = $("#postal_code").val();
                var web_address = $("#web_address").val();
                var image_data = $("#image_src").attr("src");

                a.all_logo_details= [{
                    'logo_text':logo_text,
                    'image_name':file.name,
                    'category_id':category_id,
                    'subcat_id':subcat_id,                    
                    'contact_email':contact_email,
                    'company_name':company_name,
                    'first_name':first_name,
                    'last_name':last_name,
                    'address':address,
                    'postal_code':postal_code,
                    'web_address':web_address,
                    'image_data' : image_data,
                    'image_type' : file.type
                }];
                x.post("../admin/dashboard/addlogo",a.all_logo_details).success(function(response_back){
  
                       //alert(response_back.response);
                        if(response_back.response=="success")
                        {
                            var target_id=response_back.target_id;
                            var logo_id=response_back.logo_id;
                            
                           // alert(target_id);
                            h.get("../admin/dashboard/vuforiarate/"+target_id+"/"+logo_id+"/"+contact_email).success(function(target){
                               // alert("a");
                                if(target.response=="success")
                                {
                                    var main_site_url=$("#main_site_url").val();
                                    var redirect_url=main_site_url+'/admin/dashboard#/tables/logo';                                                                         

                                    $("#error_div").hide();
                                    $("#show_message").slideDown();
                                    $("#success_div").html("Data inserted successfully. <br />Please wait,we will redirect you to listing page.");
                                    $("#success_div").show();              
                                    //alert(redirect_url);
                                   // return false;
                                    setTimeout(function() { 
                                        window.location.href = redirect_url; 
                                    }, 5000);   
                                }
                           })   
                        }
                        if(response_back.response=="image_problem")
                        {
                            $("#error_div").hide();
                            $("#show_message").slideDown();
                            $("#error_div").html("Unable to upload your image. Please try with a diffrent image.<br> We will reload this page shortly.");
                            $("#error_div").show();
                            $("#success_div").hide();

                            setTimeout(function() { 
                            //window.location.href = redirect_url; 
                                window.location.reload();
                            }, 5000);                                      

                        }

                        //$('#upload_file').prop('disabled', false);
                        //$("#upload_file").text('Save');
                        
                   });

 
                    //fu.uploadFileToUrl(file, uploadUrl, a.Redeemer );
    };

            a.add_reedemer=function(){                
           //     alert(JSON.stringify(a.Redeemer, null, 4));
               if($("#company_name").val()=='')
               {
                    $("#error_div").hide();
                    $("#show_message").slideDown();
                    $("#error_div").html("Please insert company name.");
                    $("#error_div").show();
                    $("#success_div").hide();

                    $('#add_reedemer').prop('disabled', false);
                    $("#add_reedemer").text('Save user');  

                    return false;
               }
               else if($("#company_name").val()=='')
               {
                    $("#error_div").hide();
                    $("#show_message").slideDown();
                    $("#error_div").html("Please insert address.");
                    $("#error_div").show();
                    $("#success_div").hide();

                    $('#add_reedemer').prop('disabled', false);
                    $("#add_reedemer").text('Save user');  

                    return false;
               }
               else if($("#postal_code").val()=='')
               {
                    $("#error_div").hide();
                    $("#show_message").slideDown();
                    $("#error_div").html("Please insert address.");
                    $("#error_div").show();
                    $("#success_div").hide();

                    $('#add_reedemer').prop('disabled', false);
                    $("#add_reedemer").text('Save user');  

                    return false;
               }
               a.show_success_msg=false; 
               a.show_error_msg=false; 
               // var category_id = $("#category_id").val();
               // if($("#subcat_id").val()!='')
               // {
               //      var subcat_id = $("#subcat_id").val();
               // }
               // else
               // {
               //      var subcat_id = null;
               // }              
              
               

               // a.Redeemer.category_id = category_id;
               // a.Redeemer.subcat_id = subcat_id;
               var url=$("#web_address").val();              

               var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
                if (!re.test(url)) { 
                    $("#error_div").hide();
                    $("#show_message").slideDown();
                    $("#error_div").html("Invalid web address.");
                    $("#error_div").show();
                    $("#success_div").hide();

                    $('#add_reedemer').prop('disabled', false);
                    $("#add_reedemer").text('Save user');   
                    return false;
                }


              
               //return false;
              // $('#add_reedemer').prop('disabled', true);
               //$("#add_reedemer").text('Saving..'); 
              // alert(JSON.stringify(a.Redeemer,null,4));
              // return false;

               x.post("../admin/dashboard/storereedemer", a.Redeemer).success(function(response){
                 // $('#add_reedemer').prop('disabled', false);
                 // $("#add_reedemer").text('Save'); 
                  //alert(JSON.stringify(response, null, 4));
                  //return false;
                  if(response=="success")
                  {                    
                    var main_site_url=$("#main_site_url").val();                                    
                    var redirect_url=main_site_url+'/admin/dashboard#/tables/list'; 

                    $("#error_div").hide();
                    $("#show_message").slideDown();
                    $("#success_div").html("Data inserted successfully. <br />Please wait,we will redirect you to listing page.");
                    $("#success_div").show();              

                    setTimeout(function() { 
                    window.location.href = redirect_url; 
                    }, 5000);
                  }
                  else if(response=="email_exists")
                  {
                    $("#error_div").hide();
                    $("#show_message").slideDown();
                    $("#error_div").html("Email already exists.Please try with diffrent email.");
                    $("#error_div").show();
                    $("#success_div").hide();

                    $('#add_reedemer').prop('disabled', false);
                    $("#add_reedemer").text('Save user');     
                  }
                  else if(response=="already_company_exists")
                  {
                    $("#error_div").hide();
                    $("#show_message").slideDown();
                    $("#error_div").html("Company already exists.");
                    $("#error_div").show();
                    $("#success_div").hide();

                    $('#add_reedemer').prop('disabled', false);
                    $("#add_reedemer").text('Save user');     
                  }
                  else
                  {
                      $("#error_div").hide();
                      $("#show_message").slideDown();
                      $("#error_div").html("Please insert all field.");
                      $("#error_div").show();
                      $("#success_div").hide();

                      $('#add_reedemer').prop('disabled', false);
                      $("#add_reedemer").text('Save user');     
                  }
               })
            }



            a.view_item=function(itemId){ 
                var main_site_url=$("#main_site_url").val();
                var url_link=main_site_url+'/admin/dashboard#/tables/view/';   

                window.location.href = url_link;  

                //x.post("../admin/dashboard/storereedemer", a.Redeemer).success(function(response){

                //});
            } 
            a.cancel_redirect=function(folder_name){ 
                var main_site_url=$("#main_site_url").val();
                $("#update_id").val(''); 
                var redirect_url=main_site_url+'/admin/dashboard#/'+folder_name+'/list';
                
                window.location.href = redirect_url; 
            } 

            a.cancel_category=function(folder_name){ 
                var main_site_url=$("#main_site_url").val();
                $("#update_id").val(''); 
                var redirect_url=main_site_url+'/admin/dashboard#/'+folder_name+'/category_list';
                
                window.location.href = redirect_url; 
            } 

            a.update_status=function(itemId,itemStatus){ 

               x.get("../admin/dashboard/statusupdate/"+itemId+"/"+itemStatus).success(function(response){
                  a.status=response;                 
                  window.location.reload();             
               })
            }

            a.delete_reedemer=function(itemId){ 
             if(confirm("Are you sure?"))
             {   
                var main_site_url=$('#main_site_url').val();

                $(".delete_row").hide();              
                $("td#row_"+itemId).parent()
                .replaceWith('<tr><td colspan="5" class="center"><img src="'+site_path+'/images/loader.gif" /></td></tr>');               
               
               x.get("../admin/dashboard/deletereedemer/"+itemId).success(function(response){
                  window.location.reload();             
               })
             }
            }

            // a.redirect_edit=function(itemId){            
            //   $("#update_id").val(itemId);              
            //   var main_site_url=$("#main_site_url").val(); 
            //   var edit_url=main_site_url+'/admin/dashboard#/tables/edit/';    
            //   window.location.href = edit_url;             
            // }


            // a.edit_redeemar=function(){
            //   var main_site_url=$('#main_site_url').val();   
            //   var company_name=$('#company_name').val();
            //   var web_address=$('#web_address').val();
            //   var email=$('#email').val();          
            //   var address=$('#address').val();              ;
            //   var first_name=$('#first_name').val();              
            //   var last_name=$('#last_name').val();              
            //   var zipcode=$('#zipcode').val();              

            //   a.inventory_details= [{
            //                         'company_name':company_name,
            //                         'web_address':web_address,
            //                         'email':email,
            //                         'address':address,
            //                         'first_name':first_name,
            //                         'last_name':last_name,
            //                         'zipcode':zipcode,
            //                         'id':update_id
            //                       }]; 
            // // alert(JSON.stringify(a.inventory_details,null,4));
            // // return false;
            //   x.post(main_site_url+"/admin/dashboard/editredeemar",a.inventory_details).success(function(response){
            //     var main_site_url=$("#main_site_url").val();                              
            //     var redirect_url=main_site_url+'/admin/dashboard#/tables/list';
                
            //     if(response=='success')
            //     {
            //       $("#update_id").val('');
            //       //return false;
            //       $("#error_div").hide();
            //       $("#show_message").slideDown();
            //       $("#success_div").html("Data updated successfully. <br />Please wait,we will reload this page.");
            //       $("#success_div").show(); 


            //       setTimeout(function() { 
            //        // window.location.reload();
            //         window.location.href = redirect_url; 
            //       }, 5000);
            //     }
            //     else if(response=='invalid_id')
            //     {
            //       $("#error_div").hide();
            //       $("#show_message").slideDown();
            //       $("#error_div").html("Error occoure! Please try again.");
            //       $("#error_div").show();
            //       $("#success_div").hide();

            //       setTimeout(function() { 
            //         window.location.href = redirect_url; 
            //       }, 2000);
            //     }
            //     else
            //     {
            //       $("#error_div").hide();
            //       $("#show_message").slideDown();
            //       $("#error_div").html("Please insert all field.");
            //       $("#error_div").show();
            //       $("#success_div").hide(); 
            //     }
                
            //   });
            // }


            a.delete_logo=function(itemId){              
             if(confirm("Are you sure?"))
             {      
               $("#logo_"+itemId)
             .replaceWith('<tr class="msg_remove"><td colspan="5" class="center">Removing ...</td></tr>');
             x.get("../admin/dashboard/deletelogo/"+itemId).success(function(response){                  
                  $("#logo_"+itemId).hide('500');  
                  $("#msg_div").show('500');
                  $(".msg_remove").hide('500');
               })
             }
            }

            // a.redeemar_details= [{
            //     'start_date':c_s_date,
            //     'end_date':c_e_date,
            //     'campaign_name':c_name,
            //     'id':update_id
            // }];

            // alert(JSON.stringify(a.redeemar_details,null,4));
            // return false;
            var site_path=$("#site_path").val();               
            x.post("../admin/dashboard/show",update_id).success(function(response){
            for (var e = [], f = response.length-1, g = 1; f >= g; g++) e.push({                
                    company_name: response[g].company_name,
                    email: response[g].email,
                    approve: response[g].approve,
                    id: response[g].id 
                                       
                });
                a.redeemar_details = response  ;
               // alert(JSON.stringify(a.redeemar_details,null,4));
                a.cnames = response;
                a.file_path = site_path;
                var site_image_path=$('#site_image_path').val();
                $("#spinner_icon").attr("src", site_image_path+'../../../images/spinner.gif')
                $("#pp2").show();
                $("#pp").hide();
            }) 
        }

        angular.module("redeemar-app").controller("ReedemerController", ["$scope", "PlaceholderTextService", "ngTableParams", "$filter", "$http", "fileUpload","$window", a])
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
               var fd = new FormData();
               fd.append('file', file);              
               h.post(uploadUrl, fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined},
                  data:data
               })
            
               .success(function(response){
                  var contact_email=$("#contact_email").val();
                  var category_id=$("#category_id").val();
                  var subcat_id=$("#subcat_id").val();
                  var logo_text =$("#logo_text").val();   
                  var contact_email=$("#contact_email").val();
                  var main_site_url=$("#main_site_url").val(); 

                  var company_name=$("#company_name").val();
                  var first_name=$("#first_name").val();
                  var last_name=$("#last_name").val();
                  var address=$("#address").val();
                  var postal_code=$("#postal_code").val();
                  var web_address=$("#web_address").val();



                    a.all_logo_details= [{
                        'logo_text':logo_text,
                        'image_name':response,
                        'category_id':category_id,
                        'subcat_id':subcat_id,                    
                        'contact_email':contact_email,
                        'company_name':company_name,
                        'first_name':first_name,
                        'last_name':last_name,
                        'address':address,
                        'postal_code':postal_code,
                        'web_address':web_address
                    }];

                 // a.all_logo_details.category_id=category_id;
                 // a.all_logo_details.subcat_id=subcat_id;

                //  alert(category_id+"---"+subcat_id);
                // alert(JSON.stringify(a.all_logo_details,null,4));
                // return false;

                                 
                   h.post("../admin/dashboard/addlogo",a.all_logo_details).success(function(response_back){
                       //alert(response_back.response);
                        if(response_back.response=="success")
                        {
                            var target_id=response_back.target_id;
                            var logo_id=response_back.logo_id;
                            
                           // alert(target_id);
                            h.get("../admin/dashboard/vuforiarate/"+target_id+"/"+logo_id+"/"+contact_email).success(function(target){
                               // alert("a");
                                if(target.response=="success")
                                {
                                    var main_site_url=$("#main_site_url").val();
                                    var redirect_url=main_site_url+'/admin/dashboard#/tables/logo';                                                                         

                                    $("#error_div").hide();
                                    $("#show_message").slideDown();
                                    $("#success_div").html("Data inserted successfully. <br />Please wait,we will redirect you to listing page.");
                                    $("#success_div").show();              
                                    //alert(redirect_url);
                                   // return false;
                                    setTimeout(function() { 
                                        window.location.href = redirect_url; 
                                    }, 5000);   
                                }
                           })   
                        }
                        if(response_back.response=="image_problem")
                        {
                            //alert("a")
                            // $("#show_success_msg").hide();
                            // $("#image_error").show('500');
                            // $("#logo_text").val("");
                            // $("#company_id").val("");
                            // $("#logo_name").val("");    


                            $("#error_div").hide();
                            $("#show_message").slideDown();
                            $("#error_div").html("Unable to upload your image. Please try with a diffrent image.<br> We will reload this page shortly.");
                            $("#error_div").show();
                            $("#success_div").hide();

                            setTimeout(function() { 
                            //window.location.href = redirect_url; 
                                window.location.reload();
                            }, 5000);                                      

                        }

                        //$('#upload_file').prop('disabled', false);
                        //$("#upload_file").text('Save');
                        
                   })
               })
            
               .error(function(){
                $("#show_error_msg").show();
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
                templateUrl: site_path+"view/partials/header.html",
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
                templateUrl: site_path+"view/partials/sidebar.html",
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
                templateUrl: site_path+"view/tpl/partials/menu-item.html",
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
                templateUrl: site_path+"view/tpl/partials/menu-group.html",
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
                templateUrl: "../view/tpl/partials/todo-widget.html",
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