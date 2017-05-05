//获取url中的各种参数

/**
 * 去掉字符串中所有空格
 * @param str {string}
 * @returns {string} 去掉空格后的新字符串
 */
function trimSpace(str) {
    return str.replace(/\s|&nbsp;/g, "").toString();
};

/**
 * 获得url传值
 * 例如getUrlParam("ID")
 * @param  paras {String}
 * @returns {String}
 */
function getUrlParam(paras) {
    var i, j;
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {};
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof(returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
};

/**
 * 获得hash传值
 * hash格式 path#!/path?pid=123&aid=13,与url参数格式相同，跟在#后
 * 例如getHashParam("aid")
 * @param  paras {String}
 * @returns {String}
 */
function getHashParam(paras) {
    var i, j;
    var hash = location.hash;
    var paraString = hash.substring(hash.indexOf("?") + 1, hash.length).split("&");
    var paraObj = {};
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof(returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
};


/**
 * 渐进增强，支持H5 history API的浏览器通过replaceState更改hash从而达到不产生历史记录的效果
 * @param hash
 */
function changeHash(hash){
    if(history.replaceState&&typeof history.replaceState == "function"){
        var href = location.href;
        //没有hash的先添上
        if(href.indexOf("#")<0){
            href = href + "#";
        }

        href = href.replace(/#[\w\W]*/,"#"+hash).replace("##","#");
        history.replaceState(null,"",href);
    }
    else{
        location.hash = hash;
    }
}


/**
 * 添加hash参数
 * @param param {String}
 * @param value {String}
 */
function addHashParam(param,value){
    removeHashParam(param);
    var hash = location.hash;
    var newParamStr = ((hash.indexOf("?")>=0)?"&":"?")+(param+"="+value);

    hash = hash + newParamStr;
    changeHash(hash);
};


/**
 * 移除hash参数
 * 例如removeHashParam("aid")
 * @param  param {String}
 * @returns {String}
 */
function removeHashParam(param){
    var hash = location.hash;
    //第一个replace：new RegExp("(?:(\\?)|\\&)"+param+"=[\\w]+([\\&]?)" $1是 ？ $2是 & ，不删除该参数前面的？和后面的&，
    //同时满足前面有？后面跟着&的情况用第二个replace解决
    //第三个replace：没有hash参数时删除无用的#和？
    hash = hash.replace(new RegExp("(?:(\\?)|\\&)"+param+"=[\\w]+([\\&]?)","g"),"$1$2").replace("?&","?").replace(/#\?$|#$|\?$/,"");

    changeHash(hash);
    return hash;
};

module.exports = {
    getUrlParam:getUrlParam,
    getHashParam:getHashParam,
    addHashParam:addHashParam,
    removeHashParam:removeHashParam,
};