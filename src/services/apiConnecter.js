const URL = "http://localhost:8080";
const headers = {
    "Content-Type": "application/json"
}

const callFetch = (url,method="GET",body)=>{
    if(!!body){
        return fetch(`${URL}${url}`,{
            headers,
            method:method,
            body:JSON.stringify(body)
        })
        .then(res=>res.json())
        .catch(err=>err)
    }else{
        return fetch(`${URL}${url}`,{
            headers,
            method:method
        })
        .then(res=>res.json())
        .catch(err=>err)
    }
    
}

module.exports = {
    getAllShops :()=>{
        return callFetch("/shops");
    },
    addShopByURL:(url)=>{
        return callFetch("/shops","POST",{	shopUrl:url});
    },
    getShopImages:(shopId)=>{
        return callFetch("/shopImages/"+shopId,"GET");
    },
    productsInit:(shopId)=>{
        return callFetch("/productsInit/"+shopId,"POST",{});
    },
    getShopProducts:(shopId)=>{
        return callFetch(`/shops/${shopId}/products`,"GET");
    },
    changeProductStatus:(productId,body)=>{
        return callFetch(`/products/${productId}/changeStatus`,"POST",body);
    },
    getNotis:()=>{
        return callFetch("/notifications","GET");
    },
    markNoti:(notiId)=>{
        return callFetch("/notifications/"+notiId,"POST",{});
    }
}