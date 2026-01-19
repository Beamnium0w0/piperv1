let visitCount = Number(localStorage.getItem("visitCount")) || 0;
visitCount = visitCount + 1;
localStorage.setItem("visitCount", visitCount);
let saveMood = localStorage.getItem("moodIndex");
const moodText = document.getElementById("mood"); 
const message = document.getElementById("message"); 
const greetBtn = document.getElementById("greetBtn"); 
const moods = ["happy", "excited", "sleepy", "curious"]; 
const moodMessages = { 
   happy: [
      "yay! I'm so happy to see you!",
      "hi pookie i missed you!", 
      "what a beautiful day to be happy!"
   ],
   excited: [
      "woohoo! let's go on an adventure!",
      "i can't wait to see what's next!",
      "this is going to be so much fun!"
   ],
   sleepy: [
      "yawn... i'm feeling so sleepy...",
      "time for a nap, lets take one together?",
      "it's sleepy time...zzzzz..." 
   ],
   curious: [
      "hmm... that's interesting, tell me more!",
      "i wonder how that works...",
      "what do you think will happen next?"
   ]
};

const moodButtons = { 
   happy: "say hi", 
   excited: "let's go!",
   sleepy: "time to rest",
   curious: "tell me more"
};
let moodIndex = Number(saveMood) || 0;
let currentMood = moods[moodIndex % moods.length]; 
document.body.className = currentMood;
greetBtn.className = currentMood;   
greetBtn.textContent = moodButtons[currentMood];
moodText.textContent = "Mood: " + currentMood; 
if (visitCount === 1) { 
   message.textContent = "Hi, I'm Piper! Nice to meet you"; 
} else { 
   message.textContent = "Welcome back! You have visited " + visitCount + " times."; 
} 
greetBtn.addEventListener("click", () => { 
   moodIndex = moodIndex + 1;
   currentMood = moods[moodIndex % moods.length]; 
   document.body.className = currentMood; 
   greetBtn.className = currentMood;   
   greetBtn.textContent = moodButtons[currentMood]; 
   moodText.textContent = "Mood: " + currentMood; 
   const messages = moodMessages[currentMood]; 
   const randomIndex = Math.floor(Math.random() * messages.length); 
   message.textContent = messages[randomIndex]; 
   localStorage.setItem("moodIndex", moodIndex);
}); 
 window.initHabits(); 