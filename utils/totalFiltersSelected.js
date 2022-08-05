const totalFiltersSelected = (final_filter_set) => {

    let  total_keys = 0
    for (const [key, value] of Object.entries(final_filter_set)) {
         total_keys+=Object.keys(final_filter_set[key]).length
    }
      return total_keys
}

export default totalFiltersSelected