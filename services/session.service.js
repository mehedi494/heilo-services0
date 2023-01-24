const { google } = require("googleapis");
const session = require("../model/Session");
const UserWallet = require("../model/UserWallate");
const user = require("../model/User");
const tempDB = require("../model/tempDB");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

const jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  GOOGLE_PRIVATE_KEY,
  SCOPES
);

const auth = new google.auth.GoogleAuth({
  keyFile: "fluted-sentry-326911-17a0711168e9.json",
  scopes: SCOPES,
});
const calendar = google.calendar({
  version: "v3",
  project: GOOGLE_PROJECT_NUMBER,
  auth: jwtClient,
});
exports.createSession = async (data) => {
  //create table for this data
  const result = new session(data);
  return await result.save();
};

exports.confirmSession = async (id, status) => {
  //update the session table
  //status will be true or false

  const updateSession = await session.updateOne(
    { _id: id },
    { status: status },
    { runValidators: true }
  );
  return updateSession;
};

exports.generateSessionLink = async (id, eventData) => {
  //get the session data form create session table and pass it by data variable
  //and create temporary link generate table in DB
  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  //console.log(makeid(5));
  const getTheSessionData = await session.findOne({ _id: id });

  let event = {
    summary: getTheSessionData.summary,
    location: getTheSessionData.location,
    description: "A chance to hear more about Google's developer products.",
    start: {
      dateTime: getTheSessionData.start_time,
      timeZone: getTheSessionData.timeZone,
    },
    end: {
      dateTime: getTheSessionData.end_time,
      timeZone: getTheSessionData.timeZone,
    },
    attendees: [],

    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
    conferenceData: {
      createRequest: {
        requestId: makeid(10),
        //conferenceSolutionKey: { type: "eventNamedHangout" },
      },
    },
  };

  console.log(event.conferenceData);
  await auth.getClient().then((auth) => {
    calendar.events.insert(
      {
        auth: auth,
        calendarId: GOOGLE_CALENDAR_ID,
        resource: event,
        conferenceDataVersion: 1,
      },
      function (err, event) {
        if (err) {
          console.log(err);
          return err;
        }
        eventData(event.data);
      }
    );
  });
};

exports.decrementBalance = async (id) => {
  const { studentId, teacherId } = await session.findOne({ _id: id });
  const { email } = await user.findOne({ _id: studentId });
  const { hourlyRate } = await user.findOne({ _id: teacherId });
  return await UserWallet.updateOne(
    { email },
    { $inc: { balance: -hourlyRate } }
  );
};

exports.allEvents = async (getAllEvents) => {
  calendar.events.list(
    {
      auth: auth,
      calendarId: GOOGLE_CALENDAR_ID,
      // timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (error, result) => {
      if (error) {
        getAllEvents(error.message);
      } else {
        // if (result.data.items.length) {
        //   getAllEvents(result.data.items);
        // } else {
        //   getAllEvents("No upcoming events found.");
        // }
        getAllEvents(result.data.items);
      }
    }
  );
};

exports.tempDb = async (data) => {
  const { teacherId } = await session.findOne({ _id: data.sessionId });
  const { hourlyRate } = await user.findOne({ _id: teacherId });
  const { sessionId, generated_link } = data;
  const tempData = {
    sessionId,
    order_money: hourlyRate,
    generated_link,
  };

  const result = new tempDB(tempData);
  return await result.save();
};
