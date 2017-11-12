# HTTP状态码
## 100～199: 信息性状态码
http1.1协议引入的，表示信息性状态码。
### 100: continue
服务器收到请求的初始部分，请客户端继续请求，发送了100状态码后，服务器再收到请求后必须响应。
### 101: swithcing protocols
服务器需要根据客户端的制定，将协议切换成客户端制定的协议（Upgrade消息头中）  
### 102:processing

## 200～299 成功状态码  
服务器响应客户端的请求成功
### 200：ok
请求成功，body携带了请求的资源
### 201：created
用于创建服务器对象的请求（如PUT），在发送201之前需要创建好对象
### 202：accept
请求被接受，但是服务器还未执行任何动作，估计是服务器比较耗时的操作，先返回一个可能完成任务的时间给客户端
### 203：non-authoritative information 
实体首部的信息不实来自于源服务器，而是来自资源的一份副本。比如通过代理服务器访问源服务器，代理服务器做了一些修改（如修改了文档的编码）
### 204：no content
消息不包含body，主要用于浏览器不显示新文档的情况下更新（如刷新表单页面）
### 205:reset content
要求客户端充值文档
### 206:partial content
成功的执行了一部分

## 300～399 重定向状态码
服务器告诉客户端使用替代的位置来访问资源，或者提供一个替代的响应而不是资源的内容。这样浏览器可以默默的转入新的位置。
### 300 multiple choices  
客户端请求的资源有多个URl，需要用户选择
### 301 moved permanently
请求的URL被移除了，响应的location首部包含了资源现在的URL
### 302 found
和301类似，不同的是当前用新的url，之后的请求仍然用老的url
### 303 see other
告诉客户端应该用另一个url来获取资源
### 304 not modified 
如果客户端发送了一个带条件的 GET 请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码。304响应禁止包含消息体## 400~499 客户端错误状态码
### 305 use proxy  
通过代理来访问资源
## 400～499 服务器错误状态码
客户端的请求服务器无法处理
### 400 bad request  
客户端发送了一个错误的请求
### 401 unauthorized  
请求需要用户验证
### 402 payment required  
预留，目前没用
### 403 forbidden
请求被服务器拒绝了
### 404 not found
服务器无法找到请求的url
### 405 method not allowed
服务器不支持url中的方法（如有些服务器不支持PUT DELETE 方法）
### 406 not acceptable 
客户端指定了接受类型，但是服务器没有相匹配的资源
### 407 proxy authentication required 
和401类似，但是用于要求对资源进行认证的代理服务器
### 408 request timeout
服务器完成请求的时间过长（超时）
### 409 conflict
请求可能在资源上产生冲突
### 410 gone 
### 411 length required
### 412 precondition failed
### 413 request entity too large
### 414 request URI too long
### 415 unsupported media type
### 416 requested range not satisifiable
### 417 expextation failed

## 500~599 服务器错误状态码
客户端发送了有效请求，服务器自身出错了
### 500 internal server error
### 501 not implemented
### 502 bad gateway
### 503 service unavalible
### 504 gateway timeout
### 505 HTTP version not support



