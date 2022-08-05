const filterAlreadyAdded = (filter_set_for_category,sfname) => {
    var filter_location = -1
    filter_set_for_category.forEach( (f, i)  => {
        filter_location = f.sfname == sfname ? i : filter_location
        return 
    })
      return filter_location
}

export default filterAlreadyAdded