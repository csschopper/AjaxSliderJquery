var xhr=new Array;
 var maxlimit=new Array;
 var total_margin=0;
(function($){
//     var elems = $([]);
//    $(window).bind('resize.nafslider', function(){
//        if (!elems.length) return; //no need to continue if elems in empty.
//        // Do something with elems here.
//    });
 $.fn.nafslider = function(options) {
    // elems = elems.add(this);

 //alert(elems.length);
var abcout=0;
 //var xhr;
  var childlength;
  var parentwidth;
  var totalwidth;
  var defaults = {
    slide: true,
    autoplay: false,
    child: 'li',
    firstchildwidth: '',
    nexttext: 'NEXT',
    prevtext: 'PREVIOUS',
    emptyloader: 'EMPTY',
    minslide: 1,
    objid: "",
    ajaxurl: "ajaxdata.php"
  };
  var options = $.extend(defaults, options);

var getfinalval  =  function (obj) {

if(options.firstchildwidth==''){
options.firstchildwidth =   obj.find(options.child).eq(0).innerWidth();
}
total_margin=parseInt(obj.find(options.child).eq(0).css('margin-right').replace(/px/gi,""))*parseInt(childlength);

parentwidth=obj.width();
}
var sleep = function(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


var getajaxdata= function (obj,newchild,nextprev){
  //  $('body').prepend('<div>-------'+objid+'---</div><br>'); 

    if(xhr[objid])
    xhr[objid].abort();
var nextprevajax=nextprev;
var ctid='';
var setlimit=0;
var setlimitnew='';
 if(nextprevajax==''){
   nextprevajax='next';
 }
 //  $('.prd-sec').prepend('<div>---click----||'+maxlimit[objid]+'--'+objid+'------'+newchild+'---</div><br>');    
    var dataString = 'licount='+newchild+'&minlimit='+maxlimit[objid]+'&nextprev='+nextprevajax+'&objid='+objid;
    xhr[objid] = $.ajax({
    type: "GET",
    url: options.ajaxurl,
    dataType: 'json',

    data: dataString,
    success: function(data, textStatus, XMLHttpRequest){
    //  alert(data);
    var dsend=new Array();
   // var i=0;
     //$('body').prepend("+++++++++++"+childlength+"++++++++++++++++"); 

     
      if(nextprev==''){
    var newli=parseInt(childlength)-parseInt(newchild);
    $.each(data, function (bb) {

    obj.find(options.child+".emptyclass").eq(0).html(data[bb].htm).removeClass('emptyclass');
   ctid=data[bb].objid;
maxlimit[data[bb].objid]++;
setlimit=data[bb].setlimit;
setlimitnew=data[bb].licounts;
     // $('.prd-sec').prepend('<div>!!---click----||'+maxlimit[ctid]+'--'+ctid+'------'+newchild+'---</div><br>');   
    })

    }else if(nextprev=='next')
    {  
    var nextlength=childlength;
   // var i=0;
    $.each(data, function (bb) {
     //   sleep(100*i);
    nextlength=parseInt(nextlength)-parseInt(1);
    obj.find(options.child).eq(nextlength).html(data[bb].htm);  
    maxlimit[data[bb].objid]++;
       ctid=data[bb].objid;
       setlimit=data[bb].setlimit;
setlimitnew=data[bb].licounts;
   // i++;
 //   $('body').prepend("+++++++++++"+new Date()+"++++++++++++++++<br>"); 
    })

    }else if(nextprev=='prev')
    {  
    var prevlength=0;
    $.each(data, function (bb) {
        
   
    obj.find(options.child).eq(prevlength).html(data[bb].htm);  
     prevlength=parseInt(prevlength)+parseInt(1);
        maxlimit[data[bb].objid]--; 
           ctid=data[bb].objid;
           setlimit=data[bb].setlimit;
setlimitnew=data[bb].licounts;
    })

    }
        if(parseInt(setlimit)==1)
        {
        maxlimit[ctid]=setlimitnew;
        }
    //dsend[i]=data[bb].htm;
 
  /*  childlength=obj.find(options.child).length;
    getfinalval(obj);
    findmargin(obj);*/

   // return "sdfsdf23545";
  //   $('.prd-sec').prepend('<div>!!---click----||'+maxlimit[ctid]+'--'+ctid+'------'+newchild+'---</div><br>');     
    }
    //error:function(XMLHttpRequest, textStatus, errorThrown){alert(textStatus); alert(errorThrown);}
    });	

}
var removechild = function (obj){
childlength=parseInt(childlength)-parseInt(1);
// alert(rightmatgin+' ddd '+leftmargin+' '+childlength);
getfinalval(obj);

obj.find(options.child).eq(childlength).remove();    



}
var findmargin = function (obj){
  // alert(); 

totalwidth=parseInt(parseInt(options.firstchildwidth)*parseInt(childlength))+parseInt(total_margin);

//$('body').prepend('<div>---firstchildwidth----'+options.firstchildwidth+'---<br>---childlength----'+childlength+'</div><br>');
//$('body').prepend('<div>---totalwidth----'+totalwidth+'---<br>---parentwidth----'+parentwidth+'<br>---total_margin----'+total_margin+'</div><br>');
// $('body').prepend('<br>||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||<br>');

if(totalwidth > parentwidth)
{  
    
var temptotalwidth=parseInt(totalwidth)-parseInt(total_margin);
if(temptotalwidth <= parentwidth)
{
totalwidth=temptotalwidth;     
}

var removechild=0;    
while(totalwidth > parentwidth)
{
removechild++
totalwidth=parseInt(totalwidth)-parseInt(options.firstchildwidth);
}
    

total_margin=parseInt(parentwidth)-parseInt(totalwidth); 




for(var i=0;i < removechild;i++)
{

    if(childlength > 1){
            childlength=parseInt(childlength)-parseInt(1);

 obj.find(options.child).eq(childlength).remove(); 
 maxlimit[objid]--; }    
}
var equalvalue=parseInt(totalwidth)+parseInt(total_margin);
if(equalvalue==parentwidth)
{
total_margin=parseInt(total_margin)-parseInt(childlength);      
}
//var perchildmargin=Math.floor(parseInt(total_margin)/parseInt(childlength));
var perchildmargin=Math.floor(parseInt(total_margin)/parseInt(childlength));
// $('body').prepend('<div>---perchildmargin = '+perchildmargin+'----total_margin = '+total_margin+'----removechild = '+removechild+'----totalwidth = '+totalwidth+'----parentwidth = '+parentwidth+'----equalvalue = '+equalvalue+'</div><br>');
 // $('body').prepend('----------------------------------------------------');
obj.find(options.child).css('margin-right',perchildmargin+"px");  

//childlength=obj.find(options.child).length;
//getfinalval(obj);
//findmargin(obj);
}else if(totalwidth < parentwidth)
{
   // $('body').prepend('----total_margin = '+total_margin);
    
   // totalwidth=parseInt(totalwidth)+parseInt(options.firstchildwidth)-parseInt(total_margin);
totalwidth=parseInt(totalwidth)-parseInt(total_margin);


var tempmargin=parseInt(parentwidth)-parseInt(totalwidth);
if(tempmargin < options.firstchildwidth)
{
total_margin=tempmargin;

}
else{
var newchild=0;
while(totalwidth <= parentwidth){
newchild++;
totalwidth=parseInt(totalwidth)+parseInt(options.firstchildwidth);

//$('body').prepend('<div>---totalwidth----'+totalwidth+'---'+i+'<br>---parentwidth----'+parentwidth+'</div><br>'); 
 
}
newchild=parseInt(newchild)-parseInt(1);
totalwidth=parseInt(totalwidth)-parseInt(options.firstchildwidth);
childlength=parseInt(childlength)-parseInt(obj.find(options.child+".emptyclass").length);
obj.find(options.child+".emptyclass").remove();
  
for(var i=0;i<newchild;i++){
  obj.append('<'+options.child+' class="emptyclass">'+options.emptyloader+'</'+options.child+'>'); 
}
childlength=parseInt(newchild)+parseInt(childlength);
getajaxdata(obj,newchild,'');
total_margin=parseInt(parentwidth)-parseInt(totalwidth);
}
//$('body').prepend('<div>nafes!!!!!!---totalwidth----'+totalwidth+'---<br>---parentwidth----'+parentwidth+'<br>---total_margin----'+total_margin+' !!!!!!!!!!</div><br>');
var equalvalue=parseInt(totalwidth)+parseInt(total_margin);
if(equalvalue==parentwidth)
{
total_margin=parseInt(total_margin)-parseInt(childlength);      
}
var perchildmargin=Math.floor(parseInt(total_margin)/parseInt(childlength));
obj.find(options.child).css('margin-right',perchildmargin+"px"); 




} 

}
     

   // $window = $(window);
return this.each(function() {
var obj= $(this);
objid=obj.attr('id');
//$window.resize(function(){
childlength=obj.find(options.child).length;
maxlimit[objid]=childlength;
getfinalval(obj);
findmargin(obj);
if(options.slide || childlength<=options.minslide)
{
    var nextclass=objid+'_nextslide';
    var prevclass=objid+'_prevslide';
    $("."+nextclass).remove();
        $("."+prevclass).remove();
    $('<a href="javascript:void(0)" class="'+nextclass+'" >'+options.nexttext+'</a>').insertAfter(obj);  
    $('<a href="javascript:void(0)" class="'+prevclass+'" >'+options.prevtext+'</a>').insertBefore(obj); 
    
    $("."+nextclass).click(function(){
//$('body').prepend('<div>---click----'+nextclass+'--------------</div><br>');
var cid=$(this).attr('class').split("_")
obj= $("#"+cid[0]);
objid=obj.attr('id');
var nextlength=parseInt(childlength)-parseInt(1);
for(var i=nextlength;i>=0;i--)
{
obj.find(options.child).eq(i).html(options.emptyloader);  
//maxlimit[objid]++;
}
getajaxdata(obj,childlength,'next');
    })
    $("."+prevclass).click(function(){
//$('body').prepend('<div>---click----'+prevclass+'--------------</div><br>');
var cid=$(this).attr('class').split("_")
obj= $("#"+cid[0]);
objid=obj.attr('id');

for(var i=0;i<childlength;i++)
{


obj.find(options.child).eq(i).html(options.emptyloader);  

}
//maxlimit[objid]=maxlimit[objid]-childlength;
getajaxdata(obj,childlength,'prev');
    })
  
//$('body').prepend('<div>---slide----'+options.slide+'--------------</div><br>');
}else if(!options.slide || childlength > options.minslide)
{
   var nextclass=objid+'_nextslide';
    var prevclass=objid+'_prevslide';
    $("."+nextclass).remove();
    $("."+prevclass).remove();
}
//findmargin(obj);
//$('body').prepend('<div>---childlength----'+childlength+'---<br>---firstchildwidth----'+options.firstchildwidth+'---<br>---firstchildmargin_left----'+options.firstchildmargin_left+'---<br>---firstchildmargin_right----'+options.firstchildmargin_right+'---<br>' + parentwidth +" !!!  "+obj.attr('id')+ '--------------</div><br>');


 // });
  });

 };

   
})(jQuery);