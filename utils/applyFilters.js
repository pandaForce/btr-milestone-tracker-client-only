const applyFilters = (stockdata,filter_params, final_filter_set,total_filters_selected) => {
    console.log('applyFilters > final_filter_set: '+ JSON.stringify(final_filter_set) + ' | total_filters_selected : '+ total_filters_selected + ' | stockdata.length: ' + stockdata.length)
    var value_to_search
    const meetsFilterCriteria = (o) => {
        let record_meets_filter_criteria = true
        if(total_filters_selected == 0 ) {
            return true
        } else {
            for (const [key, value] of Object.entries(filter_params)) {
                    // console.log('# filters in this key : '+ final_filter_set[key].length)
                    if(final_filter_set[key].length > 0) {
                if( o[[filter_params[key][0]]]  != null  || o[[filter_params[key][0]]]  != undefined) {
                        // value_to_search = filter_params[key].length > 1 ? o[filter_params[key][0]][filter_params[key][1]] :  o[filter_params[key][0]]
                        value_to_search = filter_params[key].length > 3 ? o[filter_params[key][0]][filter_params[key][1]][filter_params[key][2]] : filter_params[key].length > 2 ? o[filter_params[key][0]][filter_params[key][1]] :  o[filter_params[key][0]]
                        const element_found = final_filter_set[key].find(element => element.sfname == value_to_search) ? true : false
                        // console.log('value_to_search: '+ value_to_search)
                        // console.log('element_found: '+ element_found)
                        record_meets_filter_criteria  = record_meets_filter_criteria && element_found
                    }
                    else {
                        record_meets_filter_criteria  = false
                    }
                }
            }
            return record_meets_filter_criteria
        }
    }
    return stockdata.filter( meetsFilterCriteria)
}

export default applyFilters