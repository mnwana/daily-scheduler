var events = [];

var loadEvents = function () {
  // load events from local storage
  events = JSON.parse(localStorage.getItem("events"));
  // if nothing in localStorage, create a new object to track events for 24 hours
  if (!events) {
    events = [];
    for (var i = 0; i < 24; i++) {
      events.push("test text");
    }
  }
  // loop over array to populate schedule between 9 am and 5 pm
  for (var i = 0; i < events.length; i++) {
    if (i >= 0 && i < 18) {
      createEvent(i, events[i]);
    }
  }
};

var saveEvents = function () {
  // save events to local storage location
  localStorage.setItem("events", JSON.stringify(events));
};

var createEvent = function (eventHour, eventText) {
  // create elements that make up an event item
  var eventLi = $("<li>").addClass("time-block row col-12 mb-0 pt-1");
  var eventSpan = $("<span>")
    .addClass(
      "col-2 border-top border-right mb-0 border-3 border-grey rounded-0 hour"
    )
    .text(eventHour);
  var eventP = $("<p>").addClass("description col-9 mb-0 mr-0").text(eventText);
  var eventBtn = $("<button>").addClass("saveBtn col-1");
  var eventBtnSpan = $("<span>").addClass("oi oi-hard-drive");
  //   append button span to button
  // append hour p, and description p, and button element to parent
  eventBtn.append(eventBtnSpan);
  eventLi.append(eventSpan, eventP, eventBtn);
  // set color of event based on current time
    setEventStatus(eventLi);
  // append to ul list on the page
  $("#schedule").append(eventLi);
};

var setEventStatus = function (eventLi) {
  // get hour of event
  var currDate = moment();
  var hour = $(eventLi).find("span").text().trim();
  var time = moment(currDate, "L").set("hour", hour);

  // remove event status classes
  var eventLiP = $(eventLi).find("p");
  eventLiP.removeClass("present future past");
  // if event is in future hours, add future class (green)
  if (moment().diff(time, "minutes") <0) {
    $(eventLiP).addClass("future");
  }
  // else if event is in past hours add past class (grey)
  else if (moment().diff(time, "minutes") >= 60) {
    $(eventLiP).addClass("past");
  }
  //else event is in present hour add present class (red)
  else {
    $(eventLiP).addClass("present");
  }
};

$("#schedule").on("click", "p", function () {
    console.log("clicked");
    var text = $(this).text().trim();
    var textInput = $("<textarea>").addClass("form-control col-9").val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
  });

  $("#schedule").on("blur", "textarea", function () {
    var text = $(this).val().trim();
    var index = $(this).closest(".time-block").index();
    events[index].text = text;
    saveEvents();
    var eventP = $("<p>").addClass("description col-9 mb-0 mr-0").text(text);
    $(this).replaceWith(eventP);
    setEventStatus($(eventP).closest(".time-block"));
  });

// load schedule to initialize page
loadEvents();

// set interval to refresh event status every 15 minutes
