// Pre-request script to get a value from json body, and a value from the headers
// grabbs "key" from json body, and "var_cookie" from header named "set-cookie"

pm.sendRequest({
    url: 'https://example.com/api',
    method: 'GET',
}, function (err, res) {
    if (err) {
        console.log(err);
    } else {
        let responseJson = res.json();
        if (responseJson.sst) {
            pm.variables.set("key_from_prereq", responseJson.key);
        } else {
            console.log("Key not found in the response");
        }

        // Accessing all headers
        let allHeaders = res.headers.all();
        let varCookieValue;

        // Iterating over all headers to find all Set-Cookie headers
        allHeaders.forEach(header => {
            if (header.key === 'Set-Cookie') {
                // Parsing the cookie string to find "var_cookie"
                let cookies = header.value.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    let cookie = cookies[i].trim();
                    if (cookie.startsWith("var_cookie=")) {
                        varCookieValue = cookie.substring("var_cookie=".length);
                        break;
                    }
                }
            }
        });

        // Setting the variable if the cookie value was found
        if (varCookieValue) {
            pm.variables.set("val_from_prereq", varCookieValue);
        } else {
            console.log("var_cookie not found in the Set-Cookie headers");
        }
    }
});

