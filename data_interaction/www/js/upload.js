function upload(oFile) {
    Array.from(oFile.files).forEach(file => {
        let fileReader = new FileReader();
        let interface = '/upload';
        if(-1 != file.type.search('image')) {
            fileReader.readAsDataURL(file);
            interface = '/upload_base64';
        } else {
            fileReader.readAsText(file);
        }
        
        fileReader.onload = function () {
            console.log('read success');
            let xhr = new XMLHttpRequest();
            xhr.upload.onerror = function (err) {
                console.log(`ajax error:${err}`);
            };
            xhr.upload.onload = function () {
                console.log('upload done.')
            }
            // xhr.upload.onprogress = function (ev) {
            //     console.log(ev.total + ' ' + ev.loaded);
            // }
            // xhr.upload.onloadend = function (err) {
            //     console.log(`upload end:${err}`);
            // }

            let formData = new FormData();
            //readerFile.result 存储了读取的结果
            //console.log(this.result);
            if (interface == '/upload_base64') {
                formData.append('file', this.result);
            } else {
                formData.append('file', this.result);
            }
            
            xhr.open('POST', interface, true);
            xhr.send(formData);

            xhr.onreadystatechange = function (data) {
                if (xhr.readyState == 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 404) {
                        console.log('upload success.');
                    } else {
                        console.log("upload failed.");
                    }
                }
            }
        }
        fileReader.onerror = function () {
            console.log('read failed.');
        }
    });
}

function uploadBatch(oFile) {
    let xhr = new XMLHttpRequest();
    xhr.upload.onerror = function (err) {
        console.log(`ajax error:${err}`);
    };
    xhr.upload.onload = function () {
        console.log('upload done.')
    }
    // xhr.upload.onprogress = function (ev) {
    //     console.log(ev.total + ' ' + ev.loaded);
    // }
    // xhr.upload.onloadend = function (err) {
    //     console.log(`upload end:${err}`);
    // }

    let formData = new FormData();
    //readerFile.result 存储了读取的结果
    Array.from(oFile.files).forEach(file=>{
        formData.append('file', file);
    })

    xhr.open('POST', '/upload', true);
    xhr.send(formData);

    xhr.onreadystatechange = function (data) {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 404) {
                console.log('upload success.');
            } else {
                console.log("upload failed.");
            }
        }
    }
}