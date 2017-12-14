{
    "targets": [
        {
            "target_name": "helloworld",
            "sources": ["helloworld.cc"]
        },
        {
            "target_name": "dicom",
            "sources": ["dicom.cc"],
            "include_dirs": ["/usr/local/include"],
            "link_settings": {
                "libraries": ["-ldcmdata", "-ldcmimage", "-ldcmnet", "-loflog", "-lofstd"],
                "ldflags:": ["-L/usr/local/lib"]
            },
            "cflags": ["-std=c++11"]
        }
    ]
}