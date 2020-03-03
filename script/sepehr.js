class NavaSepehr {
    constructor (NavaSepehrName,NavaSepehrWidth,NavaSepehrHeight,NavaSepehrRatio) {
        let _this = this;
        this._WindowInnerWidth = "";
        this._WindowInnerHeidth="";
        this._name=NavaSepehrName;
        this._Width=NavaSepehrWidth;
        this._Height=NavaSepehrHeight;
        this._Ratio=NavaSepehrRatio;   
        window.addEventListener('resize', function() {
            _this._WindowInnerWidth=window.innerWidth;
            _this._WindowInnerHeidth=window.innerHeight;
        })
    }
    static info() {
        return 'Sepehr, helps you to create and present an app inside of your page. It receives Width, Height and Ratio'
    }
}
var audiocnts = [];
class Navasaz {
    static StaticNode = 0;  
    constructor () {
        this._PlayInfo="";
        this._AudioContext=new AudioContext;
        audiocnts.push(this._AudioContext)
        this._Amplitude=this._AudioContext.createGain();
        this._Oscillator = null;
        this._isPlaying=false;
        Navasaz.StaticNode = Navasaz.StaticNode + 1;
        this._Node = Navasaz.StaticNode;
    }
    static info() {
        return 'Navasaz is a Nava node, an oscillator'
    }    
    decrease_time(decreaseTime) {
        this._Amplitude.gain.exponentialRampToValueAtTime(0.00001,this._AudioContext.currentTime+decreaseTime);
    }
    play(Lfreq, Lgain) {
        if (!(this._isPlaying || !this._isPlaying)) {
            this._Oscillator.frequency.setValueAtTime(Lfreq, this._AudioContext.currentTime);
            this._Amplitude.gain.value = Lgain;
        }
        else {
            this._Amplitude.connect(this._AudioContext.destination);
            this._Amplitude.gain.value = Lgain;
            this._Oscillator = this._AudioContext.createOscillator();
            this._Oscillator.type = 'sine';
            this._Oscillator.frequency.value = Lfreq;
            this._Oscillator.connect(this._Amplitude);
            this._Oscillator.start();
            this._isPlaying = true;
        }
        this._PlayInfo = 'Freq:'+(Lfreq.toString()).padStart(4, '0') +', Ampl:'+ (Lgain.toString()).padStart(4, '0')+'';
        return this._PlayInfo;
    }
    Play_NavaNote(LNavaNote) {
        
        this._Amplitude.connect(this._AudioContext.destination);
        this._Amplitude.gain.value = 0;
        this._Oscillator = this._AudioContext.createOscillator();
        this._Oscillator.type = 'sine';
        this._Oscillator.frequency.value = 0;
        this._Oscillator.frequency.setValueAtTime((LNavaNote.frequency), this._AudioContext.currentTime+LNavaNote.time/1000);
        this._Amplitude.gain.setValueAtTime(LNavaNote.amplitude, this._AudioContext.currentTime+LNavaNote.time/1000);
        this.decrease_time(LNavaNote.decreaseTime);
        this._Oscillator.connect(this._Amplitude);
        this._Oscillator.start();
        this._isPlaying = true;
        this._Oscillator.stop(this._AudioContext.currentTime+LNavaNote.time/1000+LNavaNote.decreaseTime)
    }
}
class drawNote {
    constructor (NavaArraytoDraw) {
        this._data = NavaArraytoDraw;
    }
    static info() {
        return 'it draws circle on the NavaBoard and it show the place of the note on board'
    }
    draw() {
        for (let index = 0; index < this._data.length; index++) {     
            this.oneCircle(this._data[index]);       
        }
    }
    oneCircle(LNavaNote) {

        setTimeout(function() {
            NAVABOARD_BASE.append('circle')
                .attr('cx',LNavaNote.frequency)
                .attr('cy',1000*LNavaNote.amplitude)
                .attr('opacity',1)
                .attr('fill','rgb('+73+','+80+','+100+')')
                .attr('r',0)
                .transition()
                .attr('fill','rgb('+173+','+180+','+200+')')
                .attr('r',10)
                .duration(400)
                .attr('opacity',1)
                .transition()
                .attr('fill','rgb('+73+','+80+','+100+')')
                .attr('r',0)
                .attr('opacity',.4)
                .duration(LNavaNote.decreaseTime*600)
            let strFreq = "000"+LNavaNote.frequency.toString();
            let NavaInfoText = '+ '+strFreq.substring(strFreq.length -4)+':'+LNavaNote.amplitude;   
            NAVAINFO.text(NavaInfoText)
            document.getElementById('resultQuery').innerHTML = LNavaNote.frequency/30;
            }, LNavaNote.time);

    }
}
class NavaNote {
    constructor() {
        this.frequency = null;
        this.parentnoteFreq = null;
        this.index = null;
        this.shape = null;
        this.amplitude = null;
        this.duration = null;
        this.decreaseTime = null;
        this.time = null;
        this.gah = null;
        this.nava = null;
        this.scope = null;        
        let intvl = (document.getElementById('input-query').value).split(' ');
        this.intervals = intvl;
        this.makeArandomNote();
    }
    static info() {
        return 'frequency, shape,amplitude,duration,decreaseTime(how long till its sound ends),time(play after currentTime of the start),gah(musical structure of intervals, sequences),scope(min and max frequencies), nava(related sequences)'
    }
    makeArandomNote(_interval=this.intervals) {
        this.frequency = 30*((_interval[parseInt((Math.random()*_interval.length-.001))]));
        this.parentnoteFreq = 360;
        this.index = this.frequency / this.parentnoteFreq;
        this.shape = 'sine';
        let _ammpp = function() {let __ammpp = (parseInt(Math.random()*100)/100); if (__ammpp<.1 || __ammpp>1) {__ammpp=.1}; return __ammpp }
        this.amplitude = _ammpp();
        this.duration = 1;
        this.decreaseTime = 12+parseInt(Math.random()*100)/10;
        this.time = Math.random()*2000;
        this.gah = null;
        this.nava = null;
        this.scope = null;
    }
}
class Naghme {
    constructor (Lname) {
        this._name = Lname;
        this._defaultnavasaz = new Navasaz;
        this._navasaz = [];
        this._navasaz.push(this._defaultnavasaz)
        this._data = [];
        this._defaultData = new NavaNote;
        this._data.push(this._defaultData);
        this._lenght=null;
    }
    static info() {
        return 'Naghme performs a sequence of notes, using Navasaz'
    }
    getData(NavaNaghme) {
        this._data = NavaNaghme;
        this._lenght = NavaNaghme.length;
    }
    play_naghme() {
        for (let index = 0; index < this._data.length; index++) {
            var newNavasaz = new Navasaz;            
            newNavasaz.Play_NavaNote(this._data[index]);       
        }
    }
}
var BenavazStatus = (-1);
var BenavazAdd = (1);
myNV=[];
function BeNavazAdd() { 
    if (BenavazStatus==1) {
        for (let index = 0; index < 1; index++) {   
            myNV[BenavazAdd] = setTimeout(function() {                
                    let NaghmeFal = [];
                    for (let indexIn = 0; indexIn < parseInt(2+Math.random()*1); indexIn++) {
                        let NoteToPlay = new NavaNote;
                        NaghmeFal.push(NoteToPlay)
                    }
                    let newNava = new Naghme('Naghme');    
                    newNava.getData(NaghmeFal);
                    newNava.play_naghme();
                    let dNoteNava = new drawNote(NaghmeFal);
                    dNoteNava.draw()
                    if (BenavazStatus==1) {
                        setTimeout(() => {
                            if (BenavazAdd==4) {
                                audiocnts=[];
                                BenavazAdd = 0;
                            }
                            else {
                                BenavazAdd += 1;
                            }
                            BeNavazAdd();
                        }, 2000*BenavazAdd);                        
                    }    
               }, 2000*index);
        }
    }
    else {       
        for (let index = 0; index < audiocnts.length; index++) {
            audiocnts[index].suspend();            
        }
        audiocnts = [];
        NAVAINFO.text('+ 0000:0.00');
    }
}
function BeNavaz() {   
    BenavazStatus = BenavazStatus*(-1);
    BeNavazAdd();
}