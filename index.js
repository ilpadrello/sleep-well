const { exec } = require("child_process");
const { exit } = require("process");

data = {
  nightwakens: 0,
  minutes: 5,
  args: process.argv.slice(2),
};

for (let index = 0; index < data.args.length; index++) {
  const element = data.args[index];
  switch (element) {
    case "--minutes":
      let newMinutes = data.args[index + 1];
      if (newMinutes < 5) {
        console.log("You cannot set minutes to less then 5");
        exit();
      }
      data.minutes = newMinutes;
      ++index;
      break;
    default:
      break;
  }
}

function gotosleep() {
  exec(
    "rundll32.exe powrprof.dll, SetSuspendState Sleep",
    (error, datas, getter) => {
      data.nightwakens++;
      console.log("going to sleep time: ", data.nightwakens);
      if (error) {
        console.log("error:", error.message);
      }
      if (getter) {
        console.log("data", datas);
        return;
      }
      console.log("data", datas);
    }
  );
}

console.log(data);
setInterval(gotosleep, 1000 * 60 * data.minutes);
gotosleep();
//"rundll32.exe powrprof.dll, SetSuspendState Sleep"
