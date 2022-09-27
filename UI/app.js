Dropzone.autoDiscover=false;
function init(){
    let dz=new Dropzone('#dropzone',{
        url:"/",
        maxFiles:1,
        addRemovelLinks:true,
        dictDefaultMessage:"some message",
        autoProcessQueue:false
    });
    dz.on("addedfile",function(){
        if(dz.files[1]!=null){
            dz.removeFile(dz.files[0]);
        }
    });
    dz.on("complete",function(file){
        let imageData=file.dataURL;
        var url = "http://127.0.0.1:5000/classify_image";
        $.post(url,{
            image_data: imageData
 },function(data,status){
            if(!data || data.length==0){
                $("#resultHolder").hide();
                $("#divClassTable").hide();
                $("#error").show();
                return;
            }
            if(data){
                $("#error").hide();
                $("#resultHolder").show();
                $("#divClassTable").hide();
                document.getElementById('resultHolder').innerText="Prediction is: "+data[0];
            }
            
        });
    });
    $("#submitBtn").on('click',function(e){
        dz.processQueue();
    });
}
$(document).ready(function(){
    console.log("ready");
    $("#error").hide();
    $("#resultHolder").hide();
    $("#divClassTable").hide();
    init()
})