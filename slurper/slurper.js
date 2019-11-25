const leboncoin = require('leboncoin-api');
const fs = require('fs');

var search = new leboncoin.Search()
    .setPage(1)
    .setCategory("ventes_immobilieres")
    .addSearchExtra("price", {min: 150000, max: 350000}) // will add a range of price
    .setSort({
        "sort_by": "date",
        "sort_order": "desc"
    })

search.run().then(function (data) {
    data.results.forEach(element => {
        console.log(element)
        fs.writeFile("./to_process/" + element.id, JSON.stringify(element), function(err) {
            if(err) {
                return console.log("FAILED TO SAVE " + element.link);
            }        
            console.log(element.id + " was saved");
        }); 
    });
}, function (err) {
    console.error(err);
});    