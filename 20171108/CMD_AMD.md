# CMD AMD 和JS 模模块化
AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。
这些规范都是为了JS的模块化开发而制定的。  
区别是： 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。  
即AMD会提前加载所有的依赖，而CMD是只有真正需要的时候才加载依赖。