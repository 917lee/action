

const errorMap = {
    'NotAllowedError': '摄像头已被禁用，请在当前浏览器设置中开启后重试',
    'AbortError': '硬件问题，导致无法访问摄像头',
    'NotFoundError': '未检测到可用摄像头',
    'NotReadableError': '操作系统上某个硬件、浏览器或者网页层面发生错误，导致无法访问摄像头',
    'OverConstrainedError': '未检测到可用摄像头',
    'SecurityError': '摄像头已被禁用，请在系统设置或者浏览器设置中开启后重试',
    'TypeError': '类型错误，未检测到可用摄像头'
};
class FaceDetection {
    constructor(options) {
        this.options = Object.assign({
            matchedScore: 0.9,
            mediaSize: {
                width: 320,
                height: 240,
            }
        }, options);

        this.mediaStreamTrack = null; // 摄像头媒体流

        this.videoEl = document.querySelector('#videoEl'); // 视频区域
        this.canvasImgEl = document.querySelector('#canvasImg'); // 图片绘制区域
        this.retryBtnEl = document.querySelector('#retry');
        this.tryBtnEl = document.querySelector('#try');
        this.compareBtnEl = document.querySelector('#compare');
        this.alertEl = document.querySelector('.d-alert');
        this.sAlertHtml = `<div class="alert alert-success" role="alert">
                            人脸识别成功，已签到
                          </div>`
        this.fAlertHtml = `<div class="alert alert-danger" role="alert">
                            人脸识别失败，请重新选择
                          </div>`
        this.listEl = document.querySelector('.list1'); // 学生信息列表
        this.init();
    }

    init() {
        this.resize();
        this.initDetection();
        this.bindEvents();
    }

    // 设置相关容器大小
    resize() {
        const tmp = [this.videoEl, this.canvasImgEl];
        for (let i = 0; i < tmp.length; i++) {
            tmp[i].width = this.options.mediaSize.width;
            tmp[i].height = this.options.mediaSize.height;
        }
        // const wraperEl = document.querySelector('.wraper');
        // wraperEl.style.width = `${this.options.mediaSize.width}px`;
        // wraperEl.style.height = `${this.options.mediaSize.height}px`;
    }

    // 初始化人脸识别
    async initDetection() {
        const mediaOpt = {
            video: true
        };
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            this.mediaStreamTrack = await navigator.mediaDevices.getUserMedia(mediaOpt)
                .catch(this.mediaErrorCallback);
        } else if (navigator.webkitGetUserMedia) {
            this.mediaStreamTrack = await navigator.webkitGetUserMedia(mediaOpt)
                .catch(this.mediaErrorCallback);
        } else if (navigator.mozGetUserMedia) {
            this.mediaStreamTrack = await navigator.mozGetUserMedia(mediaOpt)
                .catch(this.mediaErrorCallback);
        } else if (navigator.getUserMedia) {
            this.mediaStreamTrack = await navigator.getUserMedia(mediaOpt)
                .catch(this.mediaErrorCallback);
        }
        this.initVideo();
    }

    // 人脸识别弹框的相关事件绑定
    bindEvents() {
        this.tryBtnEl.onclick = () => {
            this.videoEl.pause();
            this.canvasImgEl.getContext('2d').drawImage(this.videoEl, 0, 0, this.canvasImgEl.width, this.canvasImgEl.height);
            this.showEl(this.canvasImgEl).showEl(this.retryBtnEl).showEl(this.compareBtnEl);
        };
        // "重新选择" 按钮
        this.retryBtnEl.onclick = () => {
            if (this.videoEl.paused || this.videoEl.ended) {
                // 获取当前视频流中的图像，并通过 canvas 绘制出来
                this.canvasImgEl.getContext('2d').drawImage(this.videoEl, 0, 0, this.canvasImgEl.width, this.canvasImgEl.height);
                this.hideEl(this.canvasImgEl).hideEl(this.retryBtnEl).hideEl(this.compareBtnEl);
                this.videoEl.play();
            }
        };
        // "开始验证" 按钮
        this.compareBtnEl.onclick = () => {
            // 将绘制的图像转化成 图片的 base64 编码
            let image = this.canvasImgEl.toDataURL('image/png');
            image = image.replace('data:image/png;base64,', '');
            let apis = new api();
            // console.log('image',typeof image);
            let params = {
                value: image
            }
            // console.log( 'params', params);
            apis.image_base64(params).then((data) => {
                console.log('compare', data);
                if (data.tof) {
                    this.hideEl(this.canvasImgEl).hideEl(this.retryBtnEl).hideEl(this.compareBtnEl);
                    this.innerHtml(this.alertEl, this.sAlertHtml);
                    this.appendHtml(this.listEl, `<li class="list-group-item list-group-item-success">
                                                        ${data.uid}已到
                                                        </li>`)
                    this.videoEl.play();
                } else {
                    this.innerHtml(this.alertEl, this.fAlertHtml);
                }
            })
        };
    }

    // 初始化视频流
    initVideo(stream) {
        this.videoEl.srcObject = this.mediaStreamTrack;
    }

    // 获取媒体流错误处理
    mediaErrorCallback(error) {
        if (errorMap[error.name]) {
            alert(errorMap[error.name]);
        }
    }

    showEl(el) {
        el.style.visibility = 'visible';
        return this;
    }

    hideEl(el) {
        el.style.visibility = 'hidden';
        return this;
    }

    innerHtml(el, html) {
        el.innerHTML = html;
    }

    appendHtml(element, html) {
        element.insertAdjacentHTML('beforeend', html);
    }
}

const findScore = (json, find) => {
    for (let i in json) {
        if (i === find){
            return json[i];
        }else if (typeof json[i] === "object") {
            if (findScore(json[i], find) !== undefined) {
                return findScore(json[i], find);
            }
        }
    }
}

let fd = new FaceDetection();

fd.init();