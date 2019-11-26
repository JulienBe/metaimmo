const leboncoin = require('leboncoin-api')
const fs = require('fs')
const path = "./to_process/"

executeSearch(getSearch(1))

function getSearch(page) {
    return new leboncoin.Search()
        .setPage(page)
        .setCategory("ventes_immobilieres")
        .addSearchExtra("price", { min: 150000, max: 350000 }) // will add a range of price
        .setSort({
            "sort_by": "date",
            "sort_order": "desc"
        })
}

function executeSearch(search) {
    search.run().then(function (data) {
        data.results.forEach(element => {
            fs.writeFile(path + element.id, JSON.stringify(element), function (err) {
                if (err) {
                    console.log("FAILED TO SAVE " + element.link + " assuming that's the last new one");
                    return
                }
            })
        })
        if (data.nbResult != 0)
            executeSearch(getSearch(data.page + 1))
    }, function (err) {
        console.error(err);
    })
}