import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Setting from './components/Setting';
import Analytics from './components/Analytics';
import './App.css';

/*
const FACE_HOST_CN = "https://api-cn.faceplusplus.com/";
const FACE_HOST_US = "https://api-us.faceplusplus.com/";

const FACE_FACEPP = "facepp/v3/";
const FACE_DETECT = FACE_FACEPP + "detect";
const FACE_COMPARE = FACE_FACEPP + "compare";
const FACE_SEARCH = FACE_FACEPP + "search";

// facetoken
const FACETOEKN = FACE_FACEPP + "face/";
const FACETOEKN_ANALYZE = FACETOEKN + "analyze";
const FACETOEKN_SET_USERID = FACETOEKN + "setuserid";
const FACETOEKN_GET_DETAIL = FACETOEKN + "getdetail";

//faceSet
const FACESET = FACE_FACEPP + "faceset/";
const FACESET_CREATE = FACESET + "create";
const FACESET_ADDFACE = FACESET + "addface";
const FACESET_REMOVE_FACE = FACESET + "removeface";
const FACESET_ADDFACE_ASYNC = FACESET + "async/addface";
const FACESET_REMOVE_FACE_ASYNC = FACESET + "async/removeface";
const FACEAET_TASK_QUERY = FACESET + "async/task_status";
const FACESET_UPDATE = FACESET + "update";
const FACESET_GET_DETAIL = FACESET + "getdetail";
const FACESET_GET_FACESETS = FACESET + "getfacesets";
const FACESET_DELETE = FACESET + "delete";


const HUMANBODY_DETECT = "humanbodypp/v1/detect";
const HUMANBODY_SEGMENT = "humanbodypp/v2/segment";
const HUMANBODY_SKELETON = "humanbodypp/v1/skeleton";
const HUMANBODY_GESTURE = "humanbodypp/beta/gesture";

const IMAGE_MERGEFACE = "imagepp/v1/mergeface";


const FACE_BEAUTY ="facepp/beta/beautify";

const OCR_CN = "cardpp/";
const OCR_IDCARD = OCR_CN + "v1/ocridcard";
const OCR_DRIVER_LICENSE = OCR_CN + "v2/ocrdriverlicense";
const OCR_VEHICLE_LICENSE = OCR_CN + "v1/ocrvehiclelicense";
const OCR_BNAKCARD = OCR_CN + "v1/ocrbankcard";

const IMAGE_CN = "imagepp/";
const IMAGE_Plate  = IMAGE_CN + "v1/licenseplate";
const IMAGE_Object = IMAGE_CN + "beta/detectsceneandobject";
const IMAGE_Text = IMAGE_CN + "v1/recognizetext";



function FACEPP(apikey, apisecret, isChina) {

    if (apikey == null || apisecret == null){
        alert('apikey 或 apisecret 不能为空');
        console.log('apikey or apisecret can not be null');
    }

    this.apikey = apikey;
    this.apisecret = apisecret;
    this.isChina = isChina;
    alert(apikey)
    alert(apisecret)
    this.baseurl = FACE_HOST_US;
    alert(this.baseurl)
    //人脸检测
    this.detectFace = function (param,success, failed) {

        var url = this.baseurl + FACE_DETECT;

        this.request(url,param,success, failed);
    };
    this.request = function (url, dic, success, failed) {

      const formData = new FormData();

      formData.append('api_key',this.apikey);
      formData.append('api_secret',this.apisecret);

      for (var key in dic){
          formData.append(key,dic[key]);
      }

      $.ajax({
          url: url,
          type: 'POST',
          cache: false,
          data: formData,
          processData: false,
          contentType: false,
          timeout: 20000,
      }).done(success).fail(failed);
    }
} */

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div id="appContainer" className="appContainer">
            <div className="mainNav">
              <Navbar />
							<Switch>
								<Route path='/camera'/>
								<Route path='/analytics' component= { Analytics }/>
								<Route path='/setting' component= { Setting }/>
							</Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

class FaceCapture extends Component { 
  clickInput() {
    document.getElementById('input').click();
  }/*

  selectImage(input){
    alert("hel");
    let imageView = document.getElementById('preview');

    const reader = new FileReader();

    reader.readAsDataURL(input.files[0]);

    reader.onload = function (e) {

        $("#facesContainer div").remove();

        const base64Image = e.target.result;


        fixOrientention(base64Image,imageView);

        let imageData = facepp.dataURItoBlob(base64Image);
        let attributes = 'gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus';
        let dataDic = {'image_file':imageData,'return_landmark':2,'return_attributes':attributes};


        facepp.detectFace(dataDic,success,failed);
    }
  }

  success(e){
    console.log(e);
    let textView = document.getElementById('text');
    textView.innerText = JSON.stringify(e,null,"\t");

    let imageView = document.getElementById('preview');

    const faces = e.faces;

    for (const index in faces){
        const face = faces[index];
        const face_rectangle = face.face_rectangle;

        var roll = face.attributes.headpose.roll_angle;

        var gender = face.attributes.gender.value;

        const borderColor = (gender == 'Male') ? 'blue' : 'red';

        console.log('人脸框颜色：' + borderColor);

        var faceX = face_rectangle.left;
        var faceY = face_rectangle.top;
        var faceW = face_rectangle.width;
        var faceH = face_rectangle.height;

        var width = 320;
        var height = 320;

        var imageW = imageView.width;
        var imageH = imageView.height;

        var naturalWidth = imageView.naturalWidth;
        var naturalHeight = imageView.naturalHeight;

        console.log('container尺寸' + width + '----' +  height);
        console.log('img尺寸' + imageW + '----' + imageH);
        console.log('图片实际尺寸' + naturalWidth + '----' + imageH);

        const scale = imageW / naturalWidth;

        console.log('scale > ' + scale);

        const offsetX = (width - imageW)*0.5;
        const offsetY = (height - imageH)*0.5;

        console.log('offsetX：' + offsetX + 'offsetY' + offsetY);

        $('<div/>').css({
            position: 'absolute',
            top: faceY * scale + offsetY,
            left: faceX * scale + offsetX,
            height: faceH * scale,
            width: faceW * scale,
            border: '2px solid ' + borderColor,
            transform: 'rotate(' + roll + 'deg)'
        }).appendTo($("#facesContainer"));
    }
  }

  failed(e){
    console.log(e);
    let textView = document.getElementById('text');
    textView.innerText = JSON.stringify(e);
  }

  fixOrientention(base64Image,imageView) {
    const image = new Image();

    image.onload = () => {
        const canvas = document.createElement('canvas');

        const initSize = image.src.length;

        let width = image.naturalWidth;
        let height = image.naturalHeight;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        EXIF.getData(image, function () {
            const orientation = EXIF.getTag(this, 'Orientation');
            console.log(`orientation:${orientation}`);
            switch (orientation) {
                case 1:
                    console.log('旋转0°');
                    canvas.height = height;
                    canvas.width = width;
                    ctx.drawImage(image, 0, 0, width, height);
                    break;
                case 6:
                    console.log('旋转90°');
                    canvas.height = width;
                    canvas.width = height;
                    ctx.rotate(Math.PI / 2);
                    ctx.translate(0, -height);
                    ctx.drawImage(image, 0, 0, width, height);
                    break;
                case 3:
                    console.log('旋转180°');
                    canvas.height = height;
                    canvas.width = width;
                    ctx.rotate(Math.PI);
                    ctx.translate(-width, -height);
                    ctx.drawImage(image, 0, 0, width, height);
                    break;
                case 8:
                    console.log('旋转270°');
                    canvas.height = width;
                    canvas.width = height;
                    ctx.rotate(-Math.PI / 2);
                    ctx.translate(-width, 0);
                    ctx.drawImage(image, 0, 0, width, height);
                    break;

                default:
                    console.log('default 旋转0°');
                    canvas.height = height;
                    canvas.width = width;
                    ctx.drawImage(image, 0, 0, width, height);
                    break;
            }
        });

        var newBase64 = canvas.toDataURL('image/jpeg', 1.0);
        imageView.src = newBase64;
    };
    image.src = base64Image;
  } */

  render() {
    return (
      <body>
        <div className="container">
            <div className="button" onclick={this.clickInput}>Select Image</div>

            <input id="input" type="file" accept="image/*" name="xaunz" onchange="selectImage(this)"/>

            <div id="facesContainer">
                <img id="preview" />
            </div>

            <textarea id="text" readonly="readonly"></textarea>
        </div>
      </body>
    )
  }
}


export default App;