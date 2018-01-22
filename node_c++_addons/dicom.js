
let myJson = {};
myJson.push({'123':12});
console.log(myJson);

function getDICOMModule() {
    try {
        return require('./build/Release/dicom.node');
      } catch (err) {
        return require('./build/Debug/dicom.node');
    }
}

const dicom = getDICOMModule();
const dicomPath = '/home/wangrui22/data/AB_CTA_01/DICOM7_000000.dcm';



// dicom.loadAsBuffer(dicomPath, function(err, dcm_info, buffer) {
//     if (err) {
//         console.log('load As buffer failed.');
//     } else {
//         console.log('load As buffer success.');
//         let header = JSON.parse(dcm_info);
//         console.log(header);
//     }
// });