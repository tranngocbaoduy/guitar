let obj = {}

obj.get = (url, postData) => {
    return window.jQuery.when(window.jQuery.ajax({
        method: "GET",
        url: url,
        data: postData,
        dataType: "json"
      }))
      .done((rs) => {
          console.log(rs)
      });
}


export default obj;