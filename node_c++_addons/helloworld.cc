#include <node/node.h>


namespace demo {
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
void HelloWorld(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    args.GetReturnValue().Set(String::NewFromUtf8(isolate,"helloworld"));
}

void init(Local<Object> exports) {
    NODE_SET_METHOD(exports, "helloworld", HelloWorld);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, init);

}