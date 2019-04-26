import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import EXIF from './exif';
import $ from 'jquery'; 
import firebase from './firebase.js';
import './Landing.css';


class FaceCapture extends React.Component { 
    clickInput = e => {
        e.preventDefault();
        document.getElementById('input').click();
    } 


  selectImage = input => {
    let imageView = document.getElementById('preview');

    const reader = new FileReader();

    reader.readAsDataURL(input.target.files[0]);

    reader.onload = function (e) {

        $("#facesContainer div").remove();

        const base64Image = e.target.result;

        //fixOrientention(base64Image,imageView);
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

        /*
        let dic = {'image_base64' : base64Image};

        facepp.detectFace(dic,success,failed);

        */

        //let imageData = facepp.dataURItoBlob(base64Image);
        const byteString = atob(base64Image.split(',')[1]);
        const mimeString = base64Image.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        let imageData = new Blob([ab], {type: mimeString});
        let attributes = 'gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus';
        let dataDic = {'image_file':imageData,'return_landmark':2,'return_attributes':attributes};


        const url = "https://api-us.faceplusplus.com/facepp/v3/detect";
        const formData = new FormData();
        formData.append('api_key','6zcDRWAnl78-csAxH_OR53WzJ87xHsfb');
        formData.append('api_secret','0_dzAPk2kZVbdiUvy_Tf0KXaGvkDRK8I');

        for (var key in dataDic){
            formData.append(key,dataDic[key]);
        }

        let success = e => {
            console.log(e);
            let darkCircles = e['faces'][0]['attributes']['skinstatus']['dark_circle'];
            let acne = e['faces'][0]['attributes']['skinstatus']['acne'];
            let stain = e['faces'][0]['attributes']['skinstatus']['stain'];
            let health = e['faces'][0]['attributes']['skinstatus']['health'];
            alert('dark circles: ' + darkCircles 
            + ' acne: ' + acne +
            ' stain: ' + stain + 
            ' health ' + health);        
            let imageView = document.getElementById('preview');
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            firebase.database().ref('test/' + today + '/Results/Face Scans').set({
              acne:acne,
              stain: stain,
              health:health
            });
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
                /*
                $('<div/>').css({
                    position: 'absolute',
                    top: faceY * scale + offsetY,
                    left: faceX * scale + offsetX,
                    height: faceH * scale,
                    width: faceW * scale,
                    border: '2px solid ' + borderColor,
                    transform: 'rotate(' + roll + 'deg)'
                }).appendTo($("#facesContainer")); */
            }
          }
          
        let failed =  e => {
            console.log(e);
            alert(JSON.stringify(e));
        }
        
        setTimeout(() => {
          $.ajax({
            url: url,
            type: 'POST',
            cache: false,
            async: false,
            data: formData,
            processData: false,
            contentType: false,
            timeout: 100000000000000,
          }).done(success).fail(failed);
        }, (1000));
    }
  }

  
  render() {
    return (
      <div className='face-capture-container'>
        <div className='align-self-center col-sm face-capture-container'>
          <h1>
            Take a picture and get instant results!
          </h1>
          <p className='w-75 mx-auto'>
            Pictures help us keep track of your skin health, capturing all the information we need visually. They serve as 
            progress pictures, that you can access yourself and see how your skin has changed. Our solution is unique as 
            it uses facial recognition to gather skin-health related data. It is highly important to frequently come back and
            take this visual assesment, as it allows us to use historical data to asses your progress and your currrent skincare
            routine. Below is a break down of this process:
          </p>
        </div>
        <div className="card-deck w-75 mx-auto" >
          <div className="card mb-2">
            <img className="mx-auto" src="./assets/img/selfie.png" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title text-primary">Upload a picture</h5>
              <p className="card-text">
              Select an image from your library, ensure that the picture shows your face clearly with proper lighting. 
              As you come back for more assesments, try to recreate the same angle and lighting for each photo you upload,
              we will always let you know if you need to retake a photo, and will always ask for permission before using your data!
              </p>
            </div>
          </div>
          <div className="card mb-2">
            <img className="mx-auto" src="./assets/img/facial-recognition.png" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title text-primary">Facial recognition scan</h5>
              <p className="card-text">Using the Face++ API, your uploaded picture will be scanned to get skin-health data.
              The scan will give us information related to the levels of acne, blemishes, dark circles, and general skin health.
              </p>
            </div>
          </div>
          <div className="card mb-2">
            <img className="mx-auto" src="./assets/img/cloud.png" alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title text-primary">Push to our database</h5>
              <p className="card-text">
              We will always ask for your permission before uploading your images to our database. It is important for us to store 
              this information as it allows us to look back on your skin health, and make better suggestions to your skincare routine.
              You will alwyas be in the driver's seat when it comes to what we store, as you have the ability to clear your data.
              </p>
            </div>
          </div>
        </div>
        <br/>
        <div className="mx-auto w-50">
          <p>
            Upload your own picture below, and press upload image once you're happy with the submission!
          </p>
          <div className="custom-file">
            <input id="inputGroupFile01" className="custom-file-input" type="file" accept="image/*" name="xaunz" onChange={this.selectImage}/>
            <label className="custom-file-label" for="inputGroupFile01">Choose file</label>
          </div>
        </div>
        <div id="facesContainer" className='media'>
          <img id="preview" className="border border-danger mw-100 mh-100 rounded mx-auto d-block"/>
        </div>
        <button type="button" class="btn btn-success mx-auto w-25">Upload image</button>
      </div>
    )
  } 
}
export default FaceCapture;