var oscillator = null;
var isPlaying = false;
var context = new AudioContext();
var volume = context.createGain();
function dec(decreaseTime) {
    volume.gain.exponentialRampToValueAtTime(0.00001,context.currentTime+decreaseTime)
}
function makectn() {
        volume.connect(context.destination);
        oscillator = context.createOscillator();
        oscillator.type = 'sine';
        volume.gain.setValueAtTime(1, context.currentTime);
        oscillator.frequency.setValueAtTime(90, context.currentTime);
        oscillator.connect(volume);
        oscillator.start();
}
makectn();

function play(Lfreq, Lgain) {
    
        volume.gain.setValueAtTime(Lgain, context.currentTime);
        oscillator.frequency.value = Lfreq;
}


