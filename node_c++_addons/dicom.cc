#include <node.h>
#include <v8.h>
#include <string>
#include <iostream>
#include <sstream>

#include <dcmtk/config/osconfig.h>
#include <dcmtk/dcmdata/dcdatset.h>
#include <dcmtk/dcmdata/dcdicdir.h>
#include <dcmtk/dcmdata/dcpxitem.h>
#include <dcmtk/dcmdata/dctk.h>
#include <dcmtk/dcmimgle/dcmimage.h>
#include <dcmtk/dcmjpeg/djdecode.h>
#include <dcmtk/dcmdata/dcistrma.h>
#include <dcmtk/dcmdata/dcistrmb.h>

namespace dicom {

struct DcmInfo {
    std::string study_id;
    std::string series_id;
    std::string sop_id;
    std::string study_date;
    std::string study_time;
    std::string patient_id;
    std::string patient_name;
    std::string patient_sex;
    std::string patient_age;
    std::string modality;
    int width;
    int height;
    
    std::string toJSON() {
        std::stringstream ss;
        if (study_id.empty()) {
            ss  << "study_id: " << study_id;
        }
#define FILL_DCM_JSON(item) if (item.empty()) {\
    ss  << "; item: " << item;            \
};
        FILL_DCM_JSON(series_id);
        FILL_DCM_JSON(sop_id);
        FILL_DCM_JSON(study_date);
        FILL_DCM_JSON(study_time);
        FILL_DCM_JSON(patient_id);
        FILL_DCM_JSON(patient_name);
        FILL_DCM_JSON(patient_sex);
        FILL_DCM_JSON(patient_age);
        FILL_DCM_JSON(modality);
#undef FILL_DCM_JSON
        ss  << "; width: " << width; 
        ss  << "; height: " << height; 
        return ss.str();
    }
};

class DcmLoader {
public:
    static int load(const std::string& path, DcmInfo& info, unsigned char*& buffer) {
        DcmFileFormat file_format;
        if (file_format.loadFile(path.c_str()).bad()) {
            return -1;
        }

        DcmDataset* dataset = file_format.getDataset();
        OFString context;
        if (dataset->findAndGetOFString(DCM_StudyInstanceUID, context).good()) {
            info.study_id = context.c_str();
        }
        if (dataset->findAndGetOFString(DCM_SeriesInstanceUID, context).good()) {
            info.series_id = context.c_str();
        }
        if (dataset->findAndGetOFString(DCM_SOPInstanceUID, context).good()) {
            info.sop_id = context.c_str();
        }
        if (dataset->findAndGetOFString(DCM_StudyDate, context).good()) {
            info.study_date = context.c_str();
        }
        if (dataset->findAndGetOFString(DCM_StudyTime, context).good()) {
            info.study_time = context.c_str();
        }
        if (dataset->findAndGetOFString(DCM_PatientID, context).good()) {
            info.patient_id = context.c_str();
        }
        if (dataset->findAndGetOFString(DCM_Modality, context).good()) {
            info.modality = context.c_str();
        }
        if (dataset->findAndGetOFString(DCM_Columns, context).good()) {
            info.width = atoi(context.c_str());
        }
        if (dataset->findAndGetOFString(DCM_Rows, context).good()) {
            info.height = atoi(context.c_str());
        }
        if (info.width <=0 || info.height<=0) {
            return -1;
        }

        const unsigned char* img_buffer = nullptr;
        if (dataset->findAndGetUint8Array(DCM_PixelData, img_buffer).bad()) {
            return -1;
        }
        buffer = new unsigned char[info.width* info.height];
        memcpy(buffer, img_buffer, info.width*info.height);

        return 0;
    }
};

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Function;
using v8::Value;
using v8::Null;

std::string toStdString(Local<String> str) {
    String::Utf8Value utf8_val(str);
    return std::string(*utf8_val);
}

void dcm_load_buffer(const FunctionCallbackInfo<Value>& args) {
    std::cout << "IN DICOM load as buffer.\n";

    Isolate* isolate = args.GetIsolate();
    if (args.Length() != 2) {
        //auguments error
        return;
    }

    Local<String> arg0 = Local<String>::Cast(args[0]);
    const std::string dcm_path = toStdString(arg0);
    std::cout << "DICOM file: " << dcm_path << std::endl;
    Local<Function> cb = Local<Function>::Cast(args[1]);
    
    dicom::DcmInfo img_info;
    unsigned char* img_buffer = nullptr;
    if(0 != DcmLoader::load(dcm_path, img_info , img_buffer)) {
        std::cout << "load DICOM failed.";   
        const unsigned int argc = 3;
        Local<Value> argv[3];
        argv[0] = String::NewFromUtf8(isolate,"load DICOM failed ~~^oo^.");
        argv[1] = String::NewFromUtf8(isolate,"");
        argv[2] = Null(isolate);
        cb->Call(Null(isolate), argc, argv);
    } else {
        const unsigned int argc = 3;
        Local<Value> argv[3];
        argv[0] = Null(isolate);
        
        std::string info_json = img_info.toJSON();
        std::cout << info_json << std::endl;
        argv[1] = String::NewFromUtf8(isolate, info_json.c_str());
        argv[2] = Null(isolate);
        cb->Call(Null(isolate), argc, argv);
    }

    std::cout << "OUT DICOM load as buffer.\n";
};

void init(Local<Object> exports) {
    NODE_SET_METHOD(exports, "loadAsBuffer", dcm_load_buffer);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, init)

}