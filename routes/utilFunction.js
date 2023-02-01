function googleScholarIdDetails(id)
{
    let url = "http://localhost:8000/google/googlescholar/" + id;

    let settings = { method: "Get" };
    result = {};

    fetch(url, settings)
        .then(res => res.json())
        .then((json) => {
            // do something with JSON
                result[list[i]] = { "h_index" : json.get('h_index'),
                    "i10_index" : json.get("i10_index"),
                    "citations" : json.get("citations")
            }
        });
    return result;
}
function scopusIdDetails(id)
{
    let url = "" + id;

    let settings = { method: "Get" };
    result = {};

    fetch(url, settings)
        .then(res => res.json())
        .then((json) => {
            // do something with JSON
                result[list[i]] = { "h_index" : json.get('h_index'),
                    "i10_index" : json.get("i10_index"),
                    "citations" : json.get("citations")
            }
        });
    return result;
}