var events = [];

var loadSchedule = function (){
    // if nothing in localStorage, create a new object to track all task status arrays

    //loop over object properties

    // then loop over sub-array
    createEvent(itemParams);
};

var createEvent = function(itemPrams){
    // create elements that make up an event item
    // append hour p, and description p, and button element to parent
    // set color of event based on current time
    setEventStatus(eventEl);
};

var setEventStatus = function(eventEl){
    // get time of event

    // remove event status classes

    // if event is in past hours, add past class

    // else if event is in present hour add present class

    //else if event is in future hour add future class
};

var saveEvents = function (){
    // save events to local storage location
};

// load schedule to initialize page
loadSchedule();

// set interval to refresh event status every 15 minutes