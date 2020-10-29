var area = document.getElementById('area');
var list = document.querySelector('.list');

var xhr = new XMLHttpRequest();

xhr.open('get','https://data.epa.gov.tw/api/v1/aqx_p_02?limit=1000&api_key=9be7b239-557b-4c10-9775-78cadfc555e9&format=json',true);

xhr.send();

xhr.onload = function(){
    var Redata = JSON.parse(xhr.responseText);
    console.log(Redata);
    data = Redata.records;
}

var aqi = {
    A : {class:'green' , level : '良好'},
    B : {class:'yellow' , level : '普通'},
    C : {class:'orange' , level : '對敏感族群不健康'},
    D : {class:'red' , level : '對所有族群不健康'},
}

area.addEventListener('change',changeArea);

function changeArea(e){
    e.preventDefault();
        
    var tharea = e.target.value;
    var str = '';
    var PMdata = [];

    for(var i = 0 ; i < data.length ; i++){
        if (data[i].county === tharea){
            if(data[i].PM25 == ''){
                str += `<li><div class="card"><div class="card-body"><h5 class="card-title font-weight-bolder">${data[i].Site}</h5><h6 class="card-subtitle mb-3"> <strong>--目 前 暫 無 資 料--</strong></h6></div></div></li>`;
            }else if (data[i].PM25 < 15){
                str += `<li><div class="card">
                <div class="card-body"><h5 class="card-title font-weight-bolder">${data[i].Site}</h5> <h6 class="card-subtitle mb-3"><span class="${aqi.A.class}">空氣品質 : <strong>${aqi.A.level}</strong></span></h6>  PM2.5濃度 : <strong>${data[i].PM25}</strong>  μg/m<sup>3</sup>      <br><small>更新時間 : ${data[i].DataCreationDate}</small></div>
                </div></li>`; 
            }else if (data[i].PM25 > 15 && data[i].PM25 < 35){
                str += `<li><div class="card">
                <div class="card-body"><h5 class="card-title font-weight-bolder">${data[i].Site}</h5> <h6 class="card-subtitle mb-3"><span class=${aqi.B.class}>空氣品質 : <strong>${aqi.B.level}</strong></span></h6>   PM2.5濃度 : <strong>${data[i].PM25}</strong>  μg/m<sup>3</sup>        <br><small>更新時間 : ${data[i].DataCreationDate}</small></li>`;
            }else if (data[i].PM25 > 35 && data[i].PM25 < 65){
                str += `<li><div class="card">
                <div class="card-body"><h5 class="card-title font-weight-bolder">${data[i].Site}</h5> <h6 class="card-subtitle mb-3"><span class=${aqi.C.class}>空氣品質 : <strong>${aqi.C.level}</strong></span></h6>   PM2.5濃度 : <strong>${data[i].PM25}</strong>  μg/m<sup>3</sup>        <br><small>更新時間 : ${data[i].DataCreationDate}</small></li>`;
            }else if (data[i].PM25 > 65){
                str += `<li><div class="card">
                <div class="card-body"><h5 class="card-title font-weight-bolder">${data[i].Site}</h5> <h6 class="card-subtitle mb-3"><span class=${aqi.D.class}>空氣品質 : <strong>${aqi.D.level}</strong></span></h6>   PM2.5濃度 : <strong>${data[i].PM25}</strong>  μg/m<sup>3</sup>        <br><small>更新時間 : ${data[i].DataCreationDate}</small></li>`;
            }
         
        }
    }
    list.innerHTML = str;
}