const initializeFilterSet = (filterparams) => {
    const tempMap = {}
    for (const [key, value] of Object.entries(filterparams)) {
      // tempMap[key] = {}
      tempMap[key] = []
    }
      return tempMap
}

export default initializeFilterSet