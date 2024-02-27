const yt = "https://www.youtube.com";

let interval;

function speed_up() {
  const btn = document.getElementsByClassName("ytp-ad-skip-button-modern ytp-button")[0];
  let video = document.querySelector("video");
  if (btn && btn?.[0]) btn[0].click();
  if (video && !video.paused && video.duration < 20) {
    video.playbackRate = 16;
  } else {
    video.playbackRate = 1.5;
  }
  console.log("speeding up", "button: ", !!btn, " video: ", !!video);
}

chrome.runtime.onMessage.addListener(function (request, sender, callback) {
  console.log(request);
  if (request.state === "ON" && !interval) {
    interval = setInterval(speed_up, 1000);
  } else if (request.state === "OFF") {
    let video = document.querySelector("video");
    if (video) video.playbackRate = 1;
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }
  }
});

interval = setInterval(speed_up, 1000);
