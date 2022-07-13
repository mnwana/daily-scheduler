var events = [];

var loadEvents = function () {
  // load events from local storage
  events = JSON.parse(localStorage.getItem("events"));
  // if nothing in localStorage, create a new object to track events for 24 hours
  if (!events) {
    events = [];
    for (var i = 0; i < 24; i++) {
      events.push("");
    }
  }
  // loop over array to populate schedule between 9 am and 5 pm
  for (var i = 0; i < events.length; i++) {
    if (i > 8 && i < 18) {
      createEvent(i, events[i]);
    }
  }
};

var saveEvents = function () {
  // save events to local storage location
  localStorage.setItem("events", events);
};

var createEvent = function (eventHour, eventText) {
  // create elements that make up an event item
  var eventLi = $("<li>").addClass("list-group-item");
  var eventSpan = $("<span>")
    .addClass(
      "col-2 border-top border-right mb-0 border-3 border-grey rounded-0 hour"
    )
    .text(eventHour);
  var eventP = $("<p>").addClass("description col-9 mb-0 mr-0").text(eventText);
  var eventBtn = $("<button>").addClass("saveBtn col-1");
  var eventBtnSpan = $("<span>").addClass("saveBtn col-1");
  //   append button span to button
  // append hour p, and description p, and button element to parent
  eventBtn.append(eventBtnSpan);
  eventLi.append(eventSpan, eventP, eventBtn);
  // set color of event based on current time
    setEventStatus(eventHour,eventLi);
};

var setEventStatus = function (eventHour,eventLi) {
  // get time of event
  // remove event status classes
  // if event is in past hours, add past class
  // else if event is in present hour add present class
  //else if event is in future hour add future class
};

// load schedule to initialize page
loadEvents();

// set interval to refresh event status every 15 minutes
