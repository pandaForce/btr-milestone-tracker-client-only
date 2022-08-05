const mergeFilters = (filter_params, filter_set_init, filteritems,  filter_set) => {
    for (const [key, value] of Object.entries(filter_params)) {
        if(filteritems[key]) { 
                filteritems[key].forEach(fi => {
                    filter_set_init[key].push(fi)
                })
            }
        if(filter_set[key]) { 
            if(filter_set[key].length>0){
                filter_set[key].forEach(fs => {
                    filter_set_init[key].push(fs)
                })
            }                     
        }
    }
    
    return filter_set_init
}

export default mergeFilters