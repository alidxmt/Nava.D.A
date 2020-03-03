function pr(a,b) {console.log(a,b)};
var EWord = [];
var ECode = 0;
var DefineState = {'task':'','value':''};
function NavaBoardDo(LocalDefineState) {
    TASKS.text(': '+DefineState.task+' '+DefineState.value)
         .attr('fill','darkblue');
    switch (LocalDefineState.task) {
        case 'color':
            d3.select('#navaboard-rect').style('fill',LocalDefineState.value);        
            break;
        case 'nava':
            play(360,0.1);
            break;
        case 'play':
            play(LocalDefineState.value,0.1);
        break;
        default:
            TASKS.text(': '+DefineState.task+' '+DefineState.value+'!')
                 .attr('fill','red')
            break;
    }
}
document.body.onkeydown = function(e){
    ECode=e.keyCode;
    if (!(ECode==13)&!(ECode==32)) {
        EWord.push(e.key);
    }
    else {
            let InteredTaskOrValue = 'task';
            if (ECode==13) {InteredTaskOrValue='value'};
            DefineState[InteredTaskOrValue]='';
            for (let index = 0; index < EWord.length; index++) {
                DefineState[InteredTaskOrValue] = DefineState[InteredTaskOrValue]+EWord[index];            
            }
            EWord = [];
            if (ECode==13) {NavaBoardDo(DefineState)};
        }    
};
Start_Nava = false;
Coord =[];
Nava_Note = [];
const MAIN_DIV = d3.select('#main-div');
const MAIN_SVG = MAIN_DIV.append('svg')
                            .attr('id','main-svg');                  
const NAVABOARD_BASE = MAIN_SVG.append('g')
                                    .attr('id','navaboard-base-g')
const NAVABOARD_BASE_board = NAVABOARD_BASE.append('rect')
                                    .attr('id','navaboard-base-rect')
                                    .attr('fill','gray')
const NAVAINFO = NAVABOARD_BASE.append('text')
                                    .attr('id','NavaInfo')
                                    .attr('x',40)
                                    .attr('y',40)
                                    .attr('opacity',.4)
                                    .text('+ 0000:0.00')
                                    .attr('fill','gray')
const TASKS = NAVABOARD_BASE.append('text')
                                    .attr('id','NavaInfoTask')
                                    .attr('x',40)
                                    .attr('y',140)
                                    .text(': ')
                                    .attr('fill','darkblue')
const NAVABOARD_SURFACE = MAIN_SVG.append('g')
                                    .attr('id','navaboard-surface-g');
var TSNaghmeFal = [];
var TSnewNavaT = [];    
var cnt = 0;
var NoteToPlayT = [];
const NAVABOARD = NAVABOARD_SURFACE.append('rect')
                            .attr('id','navaboard-rect')
                            .attr('opacity',0)
                            .on('touchstart',function(){
                                
                                Start_Nava = true;
                                event.preventDefault();
                                Coord = [event.touches[0].clientX,event.touches[0].clientY];
                                play(Coord[0]*1,(0.001*(parseInt(Coord[1]))))                                                      
                            })
                            .on('touchend',function(){
                                Start_Nava = true;
                                Coord = d3.mouse(this);
                                NAVAINFO.text('+ 0000:0.00');                                                                                  
                                play(0,0)
                            })
                            .on('touchmove',function(){
                                Start_Nava = true;
                                Coord = [event.touches[0].clientX,event.touches[0].clientY];
                                play(Coord[0]*1,(0.001*(parseInt(Coord[1]))))
                                if (Start_Nava==true) {
                                    let circle_ID_toremove = 'circle'+Coord[0]+'-'+Coord[1]+parseInt(1000*Math.random());   
                                    NAVABOARD_BASE.append('circle')
                                                        .attr('id',circle_ID_toremove)
                                                        .attr('cx',Coord[0])
                                                        .attr('cy',Coord[1])
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
                                                        .attr('opacity',.04)
                                                        .duration(3000)
                                    NAVABOARD_BASE.select("#"+circle_ID_toremove).transition().delay(4000).remove();
                                    let NavaInfoText = '+ '+(Coord[0]*1+':'+(0.001*(parseInt(Coord[1]))).toFixed(2));   
                                    NAVAINFO.text(NavaInfoText);                                                                                  
                                    Nava_Note.push(Coord);
                                }                               
                            })
                            .on("mousedown", function() {
                                Start_Nava = true;
                                Coord = d3.mouse(this);
                                play(Coord[0]*1,(0.001*(parseInt(Coord[1]))))    
                                let CoordClick = d3.mouse(this);
                            })
                            .on("mouseup", function() {
                                Start_Nava = false;
                                Coord = d3.mouse(this);
                                NAVAINFO.text('+ 0000:0.00');                                                                                  
                                play(0,0)
                            })
                            .on("mousemove", function() {
                                if (Start_Nava==true) {
                                    Coord = d3.mouse(this);
                                    play(Coord[0]*1,(0.001*(parseInt(Coord[1]))))
                                    let circle_ID_toremove = 'circle'+Coord[0]+'-'+Coord[1]+parseInt(1000*Math.random());   
                                    NAVABOARD_BASE.append('circle')
                                                        .attr('id',circle_ID_toremove)
                                                        .attr('cx',Coord[0])
                                                        .attr('cy',Coord[1])
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
                                                        .attr('opacity',.04)
                                                        .duration(3000)
                                    NAVABOARD_BASE.select("#"+circle_ID_toremove).transition().delay(4000).remove();
                                    let NavaInfoText = '+ '+(Coord[0]*1+':'+(0.001*(parseInt(Coord[1]))).toFixed(2));   
                                    NAVAINFO.text(NavaInfoText);
                                    Nava_Note.push(Coord);
                                }
                            });


