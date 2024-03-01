const yt_video_page = "https://www.youtube.com/watch";
let default_play;
let max_duration = 0;
let max_duration_src;
let current_page;
let interval;

function speed_up() {
  //DEFINITIONS
  const btn = document.getElementsByClassName("ytp-ad-skip-button-modern ytp-button")[0];
  let video = document.querySelector("video");
  console.log("max_duration: ", max_duration, "max_duration_src: ", max_duration_src, "video: ", video, "button: ", btn);
  //STORING VALUES
  if (video) {
    if (video.duration > max_duration) {
      max_duration = video.duration;
      max_duration_src = video.src;
    }
  }
  //SCENARIO 1
  if (btn) btn.click();
  //SCENARIO 2
  if (video && !video.paused && video.duration < 20) {
    video.playbackRate = 16;
  } else if (video && !video.paused && video.duration < max_duration) {
    video.playbackRate = 16;
  } else {
    video.playbackRate = 1.25;
  }
  console.log("speeding up", "button: ", !!btn, " video: ", !!video);
}

chrome.runtime.onMessage.addListener(function (request, sender, callback) {
  let page = document.location.href;
  const target_page = page.startsWith(yt_video_page);
  if (current_page !== target_page) {
    //reset
    max_duration = 0;
    max_duration_src = "";
    current_page = target_page;
  }
  let video = document.querySelector("video");

  if (target_page && request.state === "ON" && !interval) {
    interval = setInterval(speed_up, 1000);
  } else if (target_page && request.state === "OFF") {
    if (video) video.playbackRate = 1;
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }
  }
});

interval = setInterval(speed_up, 1000);
