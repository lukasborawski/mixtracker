// use require.js for amd load this plugin
require(["jquery"], function() {
    /*
     -------------------------------------------------------
     Description: Mixpanel events tracking jQuery plugin
     Author: lukas.borawski@gmail.com
     Data: v.0.1 - pre release.
     -------------------------------------------------------
     DIRECTED CLICK EVENT
     -------------------------------------------------------
     */
    // mixpanel detect
    if (typeof mixpanel != 'undefined') {
        // start tracking
        $(document).on('click', '[data-mixpanel], *[data-mixpanel]', function(e) {
            // get event object
            var $e = $(e.target);
            // set elements for not tracking
            var notTrack = {
                inputs: [
                    'input[type="hidden"], input[type="radio"]'
                ]
            };
            // get elements to track
            var  t = $e.not(notTrack.inputs[0]),
                _t = t.parents('[data-mixpanel]');
            // checking referrer data attribute bool
            if (typeof t.data('mixpanel') !== 'undefined' || typeof _t.data('mixpanel') !== 'undefined') {
                // set operator
                var $t;
                // get target selector data attribute
                var $t_data_node = t.data('mixpanel');
                // checking target selector
                /* jshint ignore:start // notation added to avoid jshint error */
                typeof $t_data_node !== 'undefined' ? $t = t : $t = _t;
                /* jshint ignore:end */
                // get object tag name for links tracking
                var _tag = $t.prop("tagName").toLowerCase();
                // get target selector proper data attribute
                var $event = $t.data('mixpanel');
                // event structure separation
                var $event_name = $event.split(":")[0].replace(/\_/g, ' '),
                    $event_attr = $event.split(":")[1],
                    $event_dplct = $event.split(":")[2];
                // local tracking methods
                var mixpanelTrack = {
                    // 01. tracking straight method
                    straight : function($method) {
                        // set event attribute
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
                            // set method structure
                            properties = properties || {};
                            parent = parent || document.body;
                            parent = $(parent);
                            // get new tab target destination
                            var new_tab = selector.which === 2 || selector.metaKey || selector.target === '_blank';
                            // get target url property
                            var url = selector.prop("href");
                            // direct url callback
                            function callback() {
                                if (new_tab || e.isDefaultPrevented) {
                                    return;
                                } else {
                                    e.preventDefault();
                                    // time delay for window location change
                                    setTimeout(function() {
                                        window.location = url;
                                    }, 300);
                                }
                            }
                            // default mixpanel tracking method with link callback
                            mixpanel.track(event_name, properties, callback());
                        };
                        // -----------------------------------------------------
                        // tracking function depd on event object type
                        var mixpanelTrackCall = function() {
                            /* jshint ignore:start */
                            return $method === "links" ?
                                mixpanel.track_links(document.body, $t, $event_name, attr) :
                                mixpanel.track($event_name, attr);
                            /* jshint ignore:end */
                        }
                        // set number of event replication variable
                        var dplct;
                        // check number of event replication bool
                        /* jshint ignore:start */
                        typeof $event_dplct === 'undefined' ? dplct = false : dplct = true;
                        // get number of event replication source
                        dplct === true ? $event_dplct = $event.split(":")[2] : $event_dplct = $event.split(":")[1];
                        /* jshint ignore:end */
                        // track event depd on event replication type/number
                        if ($event_dplct === "track_once") {
                            // set local storage object
                            // browser local storage availability check
                            if (localStorage) {
                                // get local storage event note
                                var event = localStorage.getItem($event_name);
                                // fire up tracking function once
                                if (event === null) {
                                    mixpanelTrackCall();
                                    localStorage.setItem($event_name, "Mix Panel");
                                } else {
                                    return false;
                                }
                            } else {
                                console.log('Error: Local Storage is not available. The single event has not been saved.');
                                // event storing crash
                                return false;
                            }
                        } else if ($event_dplct === "track_always") {
                            // fire up tracking function always
                            mixpanelTrackCall();
                        }
                    }
                };
                // event segments proper setup check
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
                    console.log('Error: Mixpanel data attribute have bad structure.');
                    // app crash
                    return false;
                }
            }
        });
    } else {
        console.log('Error: Mixpanel is undefined!');
        // app crash
        return false;
    }
});
