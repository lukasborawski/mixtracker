# Mixpanel events tracker
Simple jQuery plugin for tracking Mixpanel events. Most current version: ~~[0.1](https://github.com/lukasborawski/mixtracker/tree/version/0.1 "mixtracker") / develop branch.~~

---
### What is Mixpanel?


[Mixpanel](https://mixpanel.com/ "Mixpanel") is very advanced analytics platform for mobile and the web.

**From the official site:**
Mixpanel's power lies in giving you the ability to learn more from your data by being able to ask increasingly important and complex questions. Most analytics products limit insights to basic trend lines, showing for example "number of homepage visits" over time. Mixpanel goes further by enabling you to ask more of your data.

---

### The plugin
Plugin will helps you with setting and tracking all activity from Mixpanel events created on your website. Usage is very simple, the only thing that u need to do is add src file to your repository and set HTML data attributes with track events.

**Plugin requires jQuery and browser localStorage.**
More about: [jQuery](http://jquery.com/ "jQuery") and [localStorage](http://www.w3schools.com/html/html5_webstorage.asp "localStorage").

Also remember to install on your page Mixpanel library loading [script](https://mixpanel.com/help/reference/javascript "Mixpanel JS").

---

### Setup

**Types of event notations**

As before was mentioned the events are built as a HTML data attributes. They have some specyfic structure, segmentation. To use them u need to follow this structure.

So, how the data attributes are built?

```html
data-mixpanel="clicked_Tracking_Button:attribute:track_always"
```

**Segments structure**

Element | Code | Description | Required
------- | --------- | ------- | ------ |
name      | `clicked_Tracking_Button` | This is the name of your event to track, this data will be saved in your app panel on [Mixpanel](https://mixpanel.com/ "Mixpanel"). | yes
attribute       | `attribute` | This is additional attribute that you cen store for each event that you'r tracking. Also as an event name will be saved. | no
type   | `track_always` or `track_once` | This part of event notation is responsible for quantity of storing this event. If you will use `track_once` notation the plugin will send to Mixpanel this event only one time. Thereby you will notice that user do something, for example visit some part of your site/app. Using `track_always` notation you will notice how many times your user clicked for example menu button. This types of events will be stored each time when user will triggered this tracking element. | yes

**Examples**

```html
<button type="button" data-mixpanel="clicked_Tracking_Button:attribute:track_always">mixpanel</button>
```

In this example to your panel will be send event which is called *clicked_Tracking_Button* with attribute *attribute* and it will be tracked always when user will triggered this button.

```html
<button type="button" data-mixpanel="clicked_Tracking_Button:track_always">mixpanel</button>
```

In this example to your panel will be send event wich is called *clicked_Tracking_Button* without any attribute and it will be tracked always when user will triggered this button.

```html
<button type="button" data-mixpanel="clicked_Tracking_Button:track_once">mixpanel</button>
```

In this example to your panel will be send event wich is called *clicked_Tracking_Button* without any attribute and it will be tracked only one time when user will triggered this button.

---

**Note**: The plugin useing browser localStorage to save event tracking types. So, when user will clear browser cache with ofcourse localStorage the `track_once` events will be stored in your Mixpanel again. Remember that this is not data base solution, so in that point it have some minus.












