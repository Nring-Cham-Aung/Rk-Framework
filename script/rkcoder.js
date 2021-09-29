var private_rk_vp_el_g = {};
const rkviewport = (el,callback,offset=0)=>{
    private_rk_vp_el_g[el]=false;
    function rk(){
        var elp = $(el)[0].getBoundingClientRect();
        var res = (
            elp.bottom>0+offset &&
            elp.top < (window.innerHeight || document.documentElement.clientHeight)-offset
        );
        if(private_rk_vp_el_g[el]!=res){
            callback($(el),res);
            private_rk_vp_el_g[el] = res;
        }
    }
    $(window).on('DOMContentLoaded load resize scroll', rk);
}
const rktoastmes = ({mes='Rk toast message!',position='bc',decoration='btn-secondary'})=>{
    const d_pos = {
        "ts":"top-0",
        "tc":"top-0 text-center",
        "te":"top-0 text-end",
        "ms":"bottom-50",
        "mc":"bottom-50 text-center",
        "me":"bottom-50 text-end",
        "bs":"bottom-0",
        "bc":"bottom-0 text-center",
        'be':"bottom-0 text-end",
    };

    const toastid ='rk_toast'+Math.random().toString().substr(2,20);
    var offsetval = "";
    var ani = "rk-fadezoom-up-vf";


    new Promise((res,rej)=>{
        const t_chack = new RegExp('^t');
        const b_chack = new RegExp('^b');
        if(t_chack.test(position)){
            offsetval = "top:5rem;";
            ani = "rk-fadedown-vf";
            res();
        }else if(b_chack.test(position)){
            offsetval = "top:-8rem;";
            ani = "rk-fadeup-vf";
            res()
        }else{res()}
    }).then(()=>{
        const ts = `<div id="${toastid}" class="w-100 position-fixed px-5 bg-dark ${d_pos[position]}" style="height:0;">
            <span class="btn ${decoration} position-relative ${ani}" style="${offsetval}">${mes}</span>
        </div>`;
        $('body').append(ts);
        setTimeout(() => {
            $('#'+toastid).fadeOut(500,()=>{
                $('#'+toastid).remove();
            });
        }, 3000);
    });
    
}
const rkalert = ({title = 'Alert',message = 'this is alert box!', okcallback = ()=>{}, cancelcallback = ()=>{},popup='rk-bounce-f',showcancel=false,yesno=false})=>{
    const elcancel = `<button type="button" class="btn btn-secondary me-2" onclick="private_rkalert_done(()=>rkremove('.rk_alt'),${cancelcallback})">
        <i class="bi bi-dash-circle"></i> ${yesno?'No':'Cancel'}
    </button>`;
    const alb = `<div class="rk_alt w-100 h-100 position-fixed top-0 p-3 rk-fadein-f" style="background-color:rgba(0,0,0,.5);">
        <div class="h-25"></div>
        <div class="card mx-auto col-xl-4 col-lg-5 col-md-6 col-sm-10 ${popup} bg-light">
            <ul class="card-header d-flex list-unstyled fw-bolder fs-4">
                <li class="me-2">${title}</li>
                <li>${showcancel? '<i class="bi bi-question-octagon text-danger"></i>':'<i class="bi bi-chat-quote text-primary"></i>'}</li>
                <li class="ms-auto btn btn-close" onclick="rkremove('.rk_alt')" ></li>
            </ul>
            <div class="card-body ms-5 fs-5">
                ${message}
            </div>
            <div class="text-end m-4">
                <button type="button" class="btn btn-primary me-2" onclick="private_rkalert_done(()=>rkremove('.rk_alt'),${okcallback})">
                    <i class="bi bi-check-circle"></i> ${yesno?'Yes':'Ok'}
                </button>
                ${showcancel? elcancel:''}
            </div>
        </div>
    </div>`;
    $('body').append(alb);
}
const rkremove=(el)=>{
    $(el).fadeOut(500,()=>{$(el).remove();});
}
const private_rkalert_done = (callback1,callback2)=>{
    callback1();
    callback2();
}
const rkprombox = ({title='',content='',placeholder='',gocallback = (v)=>{}})=>{
    const inpid ='rkinp'+Math.random().toString().substr(2,20);
    const promb = `<div class="rk_prombox w-100 h-100 position-fixed top-0 p-3 rk-fadein-f" style="background-color:rgba(0,0,0,.5);">
        <div class="h-25"></div>
        <div class="card mx-auto col-xl-4 col-lg-5 col-md-6 col-sm-10 rk-bounce-f bg-light">
            <ul class="card-header d-flex list-unstyled fw-bolder fs-4">
                <li><i class="bi bi-puzzle me-3 text-primary"></i></li>
                <li>${title}</li>
                <li class="ms-auto btn btn-close" onclick="rkremove('.rk_prombox')" ></li>
            </ul>
            <div class="card-body mx-3 fs-5">
                <p class="">${content}</p>
                <input type='text' id="${inpid}" class="form-control" placeholder="${placeholder}"  />
            </div>
            <div class="text-end m-4">
                <button type="button" class="btn btn-primary me-2" onclick="private_rkprombox_gone('${inpid}',${gocallback})">
                    Go <i class="bi bi-arrow-right-circle"></i>
                </button>
            </div>
        </div>
    </div>`;
    $('body').append(promb);
}
const private_rkprombox_gone=(inputid,callback)=>{
    const inpval = $('#'+inputid).val();
    if(inpval==''){
        $('#'+inputid).addClass('border-danger rk-shake-vf');
        $('#'+inputid).focus();
        setTimeout(() => {
            $('#'+inputid).removeClass('rk-shake-vf');
        }, 1000);
    }else{
        callback(inpval);
        rkremove('.rk_prombox');
    }
}
const rkcustombox=({boxcontent=`<div class="rk-fadezoom-up-vf container bg-light text-center py-5">Hello custom box<br><button class="btn btn-sm btn-secondary mt-5" onclick="rkremove('.rkcusbox')">close</button></div>`,})=>{
    const rkcusbox = `<div class="rkcusbox w-100 h-100 position-fixed top-0 p-3 rk-fadein-f" style="background-color:rgba(0,0,0,.5);">
        <div class="h-25"></div>
        ${boxcontent}
    </div>`;
    $('body').append(rkcusbox);
}
var private_rk_imageviewer_holder = [];
var private_rk_current_active_image_id = 'viewing'+Math.random().toString().substr(2,20);
var private_rk_clicked_image_src = '';
var private_rk_current_image_index = 0;
const private_rk_imageviewer = ()=>{
    private_rk_imageviewer_holder = [];
    $('.rk-img').each(function(i){
        var each_src = $(this).attr('src');
        private_rk_imageviewer_holder.push(each_src);
        if(each_src==private_rk_clicked_image_src){
            private_rk_current_image_index = i;
        }
    });
    
    const htmlel = `<div class="rk-image-viewer rk-fadein-vf h-100 w-100 position-fixed top-0 left-0 justify-content-center align-items-center d-flex" style="background-color: rgba(0, 0, 0, .8);">
        <div class="rk-gallery position-fixed">
            <img id="${private_rk_current_active_image_id}" class="position-fixed rk-fadezoom-up-vf" src="${private_rk_clicked_image_src}" alt="Preview">
        </div>
        <div class="position-fixed bottom-0 mb-2 me-5 pe-5">
            <i class="bi bi-chevron-bar-left fs-1 rkhover-text-white text-secondary btn me-5" onclick="private_rk_previous_image()"></i>
        </div>
        <div class="position-fixed bottom-0 mb-2 ms-5 ps-5">
            <i class="bi bi-chevron-bar-right fs-1 rkhover-text-white text-secondary btn ms-5" onclick="private_rk_next_image()"></i>
        </div>
        <i class="bi bi-x-circle position-fixed btn bottom-0 mb-2 rkhover-text-white text-secondary fs-1" onclick="rkremove('.rk-image-viewer')" ></i>
    </div>`;

    $('body').append(htmlel);
}
$('.rk-img').click(function(){
    private_rk_clicked_image_src = $(this).attr('src');
    private_rk_imageviewer();
});
const private_rk_next_image=()=>{
    var incomming_active_image_id = 'viewing'+Math.random().toString().substr(2,20);
    const new_imag_src = private_rk_incomming_image_src(true);
    const rk_new_image=`<img id="${incomming_active_image_id}" class="position-fixed rk-slide-income-r" src="${new_imag_src}" alt="Preview">`;
    $('.rk-gallery').append(rk_new_image);
    $('#'+private_rk_current_active_image_id).addClass('rk-slide-out-l');
    setTimeout(() => {
        $('#'+private_rk_current_active_image_id).remove();
        private_rk_current_active_image_id = incomming_active_image_id;
    }, 500);
}
const private_rk_previous_image=()=>{
    var incomming_active_image_id = 'viewing'+Math.random().toString().substr(2,20);
    const new_imag_src = private_rk_incomming_image_src(false);
    const rk_new_image=`<img id="${incomming_active_image_id}" class="position-fixed rk-slide-income-l" src="${new_imag_src}" alt="Preview">`;
    $('.rk-gallery').append(rk_new_image);
    $('#'+private_rk_current_active_image_id).addClass('rk-slide-out-r');
    setTimeout(() => {
        $('#'+private_rk_current_active_image_id).remove();
        private_rk_current_active_image_id = incomming_active_image_id;
    }, 500);
}
const private_rk_incomming_image_src = isnext=>{
    const total_img = private_rk_imageviewer_holder.length;
    if(isnext){
        if(total_img>private_rk_current_image_index+1){
            private_rk_current_image_index +=1;
            return private_rk_imageviewer_holder[private_rk_current_image_index];
        }else{
            private_rk_current_image_index=0;
            return private_rk_imageviewer_holder[0];
        }
    }else{
        if(private_rk_current_image_index>0){
            private_rk_current_image_index -=1;
            return private_rk_imageviewer_holder[private_rk_current_image_index];
        }else{
            private_rk_current_image_index = total_img-1;
            return private_rk_imageviewer_holder[private_rk_current_image_index];
        }
    }
}