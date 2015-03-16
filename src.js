// use require.js for amd load this plugin
require(["jquery"], function() {
    /*
     -------------------------------------------------------
     Description: Mixpanel events tracking jQuery plugin
     Author: lukas.borawski@gmail.com
     Data: v.0.1 - pre release.
     -------------------------------------------------------
     */
    // mixpanel detect
    if (typeof mixpanel != 'undefined') {
        // start tracking
        $(document).on({
            // document click events
            click: function(e) {
                // set elements for not tracking
                var notTrack = {
                    inputs: [
                        'input[type="hidden"], input[type="radio"]'
                    ]
                };
                // get elements to track
                var t = $(e.target).not(notTrack.inputs[0]),
                    _t = t.parents('[data-mixpanel]');
                // checking referrer
                if (typeof t.data('mixpanel') !== 'undefined' || typeof _t.data('mixpanel') !== 'undefined') {
                    // set operator
                    var $t;
                    // get target selector track data
                    var $t_data_node = t.data('mixpanel');
                    // checking target selector
                    /* jshint ignore:start */
                    typeof $t_data_node !== 'undefined' ? $t = t : $t = _t;
                    /* jshint ignore:end */
                    // get tag name for links tracking
                    var _tag = $t.prop("tagName").toLowerCase();
                    // get event data content
                    var $event = $t.data('mixpanel');
                    // event structure separation
                    var $event_name = $event.split(":")[0].replace(/\_/g, ' '),
                        $event_attr = $event.split(":")[1],
                        $event_dplct = $event.split(":")[2];
                    // tracking local methods
                    var mixpanelTrack = {
                        straight : function($method) {
                            // event attribute
                            var attr = {
                                Attribute: $event_attr
                            };
                            // set event attribute
                            /* jshint ignore:start */
                            typeof $event_dplct === 'undefined' ? attr = null : attr = attr;
                            /* jshint ignore:end */
                            // set special method for links tracking
                            // -----------------------------------------------------
                            mixpanel.track_links = function(parent, selector, event_name, properties) {
                                // set event elements
                                properties = properties || {};
                                parent = parent || document.body;
                                parent = $(parent);
                                // get target destination
                                var new_tab = selector.which === 2 || selector.metaKey || selector.target === '_blank';
                                // get target url
                                var url = selector.prop("href");
                                // direct url callback
                                function callback() {
                                    if (new_tab) {
                                        return;
                                    }
                                    window.location = url;
                                }
                                // prevention before opening in a new tab
                                if (!new_tab) {
                                    e.preventDefault();
                                    setTimeout(callback, 300);
                                }
                                // default mixpanel tracking method
                                mixpanel.track(event_name, properties, callback);
                            };
                            // -----------------------------------------------------
                            // tracking call function depd on target type
                            var mixpanelTrackCall = function() {
                                /* jshint ignore:start */
                                return $method === "links" ?
                                    mixpanel.track_links(document.body, $t, $event_name, attr) :
                                    mixpanel.track($event_name, attr);
                                /* jshint ignore:end */
                            }
                            // event duplication
                            var dplct;
                            // set event duplication source
                            /* jshint ignore:start */
                            typeof $event_dplct === 'undefined' ? dplct = false : dplct = true;
                            // set event dupliaction variable
                            dplct === true ? $event_dplct = $event.split(":")[2] : $event_dplct = $event.split(":")[1];
                            /* jshint ignore:end */
                            // track event depd on duplication property
                            if ($event_dplct === "track_once") {
                                // set local storage object for event duplication depd
                                if (localStorage) {
                                    // get local storage event note
                                    var event = localStorage.getItem($event_name);
                                    // fire up tracking function depd on local storage object exist
                                    if (event === null) {
                                        mixpanelTrackCall();
                                        localStorage.setItem($event_name, "Mix Panel");
                                    } else {
                                        return false;
                                    }
                                } else {
                                    console.log('Local Storage is not available. The single event has not been saved.');
                                    // tranck once event crash
                                    return false;
                                }
                            } else if ($event_dplct === "track_always") {
                                mixpanelTrackCall();
                            }
                        }
                    };
                    // event segments proper setup
                    if (typeof $event_attr !== "undefined" || (typeof $event_attr !== "undefined" && typeof $event_dplct !== "undefined")) {
                        // sending an events to Mixpanel
                        switch (true) {
                            default :
                                /* jshint ignore:start */
                                _tag === "a" || _tag === "A" ? mixpanelTrack.straight("links") : mixpanelTrack.straight("regular");
                                /* jshint ignore:end */
                                break;
                            case $t.hasClass("yourClassName") :
                                break;
                        }
                    } else {
                        console.log('Mixpanel data attribute have bad structure.');
                        // app crash
                        return false;
                    }
                }
            }
        });
    } else {
        console.log('Error: Mixpanel is undefined!');
        // app crash
        return false;
    }
});