import React from 'react';
import EXIF from './exif';
import $ from 'jquery'; 

class FaceCapture extends React.Component { 
    clickInput = e => {
        alert("lol");
        alert(e);
        e.preventDefault();
        document.getElementById('input').click();
    } 


  selectImage = input => {
    let imageView = document.getElementById('preview');

    const reader = new FileReader();

    reader.readAsDataURL(input.target.files[0]);

    reader.onload = function (e) {

        //移除之前的人脸框
        $("#facesContainer div").remove();

        //图片的base64数据
        const base64Image = e.target.result;

        //显示图片
        //修复显示方向不对问题
        //fixOrientention(base64Image,imageView);
        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement('canvas');

            const initSize = image.src.length;

            let width = image.naturalWidth;
            let height = image.naturalHeight;

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 旋转图片操作
            EXIF.getData(image, function () {
                const orientation = EXIF.getTag(this, 'Orientation');
                console.log(`orientation:${orientation}`);
                switch (orientation) {
                    // 正常状态
                    case 1:
                        console.log('旋转0°');
                        canvas.height = height;
                        canvas.width = width;
                        ctx.drawImage(image, 0, 0, width, height);
                        break;
                    // 旋转90度
                    case 6:
                        console.log('旋转90°');
                        canvas.height = width;
                        canvas.width = height;
                        ctx.rotate(Math.PI / 2);
                        ctx.translate(0, -height);
                        ctx.drawImage(image, 0, 0, width, height);
                        break;
                    // 旋转180°
                    case 3:
                        console.log('旋转180°');
                        canvas.height = height;
                        canvas.width = width;
                        ctx.rotate(Math.PI);
                        ctx.translate(-width, -height);
                        ctx.drawImage(image, 0, 0, width, height);
                        break;
                    // 旋转270°
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
        //base64方式上传图片
        let dic = {'image_base64' : base64Image};

        facepp.detectFace(dic,success,failed);

        */

        // 以二进制的方式上传图片
        // 将base64转为二进制
        //let imageData = facepp.dataURItoBlob(base64Image);
        const byteString = atob(base64Image.split(',')[1]);
        const mimeString = base64Image.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        let imageData = new Blob([ab], {type: mimeString});
        //根据个人需求填写的参数,这里全部写上了,包括年龄性别等,详情看官方文档
        let attributes = 'gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus';
        //上传图片,获取结果
        let dataDic = {'image_file':imageData,'return_landmark':2,'return_attributes':attributes};


        //调用接口，检测人脸
        const url = "https://api-us.faceplusplus.com/facepp/v3/detect";
        const formData = new FormData();

        formData.append('api_key','6zcDRWAnl78-csAxH_OR53WzJ87xHsfb');
        formData.append('api_secret','0_dzAPk2kZVbdiUvy_Tf0KXaGvkDRK8I');

        for (var key in dataDic){//遍历拼接
            formData.append(key,dataDic[key]);
        }

        let success = e => {
            console.log(e);
            let textView = document.getElementById('text');
            alert('dark circles: ' + e['faces'][0]['attributes']['skinstatus']['dark_circle'] 
            + ' acne: ' + e['faces'][0]['attributes']['skinstatus']['acne'] +
            ' stain: ' + e['faces'][0]['attributes']['skinstatus']['stain'] + 
            ' health ' + e['faces'][0]['attributes']['skinstatus']['health']);
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
          
        let failed =  e => {
            console.log(e);
            for (var k in e) {
                //alert(k);
            }
            alert(JSON.stringify(e));
            let textView = document.getElementById('text');
            textView.innerText = JSON.stringify(e);
        }
        
        alert(url);
        $.ajax({
            url: url,
            type: 'POST',
            cache: false,
            async: false,
            data: formData,
            processData: false,
            contentType: false,
            timeout: 100000000000000,//20秒超时时间
        }).done(success).fail(failed);
    }
  }

  
  render() {
    return (
      <body>
        <div className="container">
            <button className="btn" onclick={this.clickInput}>Select Image</button>
            <input id="input" className="form-control" type="file" accept="image/*" name="xaunz" onChange={this.selectImage}/>
            <div id="facesContainer">
                <img id="preview" />
            </div>
            <textarea id="text" readonly="readonly"></textarea>
        </div>
        <div className="container">
            <div className="special card card-nav-tabs text-center">
                <div className="card-header card-header-danger">
                    Your results
                </div>
                <div className="card-body">
                    <h4 className="card-title">Breakdown of values:</h4>
                    <p className="card-text" id="new"></p>
                </div>
                <div className="card-footer text-muted">
                </div>
            </div>
        </div>
      </body>
    )
  } 
}
export default FaceCapture;