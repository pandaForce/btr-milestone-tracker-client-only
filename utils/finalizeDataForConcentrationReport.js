const  finalizeDataForConcentrationReport = (stockdata, calculation_type, total_lots, cumulative_lots) => {
    console.log('inside finalizeDataForConcentrationReport | stockdata.length : ' + stockdata.length)

    const total_lots_by_tranche = {}
    const total_cumulative_lots_by_tranche = {}

    stockdata.forEach((a) => {
            a.projectdata.forEach((b) => {
                let prev_value = 0
                    b.stagedata.forEach((c) => {
                        if(c.tranchename != null){
                            if(calculation_type == 'count') {
                                /* cumulative lots by stage*/
                                c.tranchedata.cumulativelots = prev_value + c.tranchedata.totallots 
                                prev_value = c.tranchedata.cumulativelots
                                /* total lots by tranche*/
                                 if(total_lots_by_tranche[c.tranchename])  {
                                    total_lots_by_tranche[c.tranchename] = total_lots_by_tranche[c.tranchename] + c.tranchedata.totallots 
                                 } else {
                                    total_lots_by_tranche [c.tranchename] = c.tranchedata.totallots 
                                 }
                            } else if (calculation_type == 'pctg') {
                                c.tranchedata.pctglots = c.tranchedata.totallots / total_lots[c.tranchename]
                                c.tranchedata.cumulativepctg = c.tranchedata.cumulativelots / cumulative_lots[c.tranchename]
                            }
                        }
                    })
            })
    })

    /* cumulative total lots by tranche*/
    for (const [key, value] of Object.entries(total_lots_by_tranche)) {
        total_cumulative_lots_by_tranche[key] = key == '1' ? value : total_cumulative_lots_by_tranche[[parseInt(key)-1]] + value
    }

    // console.log('stockdata: '  + JSON.stringify(stockdata))
    // console.log('total_lots_by_tranche: '+ JSON.stringify(total_lots_by_tranche))
    // console.log('total_cumulative_lots_by_tranche: '+ JSON.stringify(total_cumulative_lots_by_tranche))

    const return_object = {}

    if (calculation_type == 'count') {
        return_object['stockdata'] = stockdata
        return_object['total_lots_by_tranche'] = total_lots_by_tranche 
        return_object['total_cumulative_lots_by_tranche'] =  total_cumulative_lots_by_tranche
    } else if (calculation_type == 'pctg') {
        return_object['stockdata'] = stockdata
    }
    
    return return_object

}

export default finalizeDataForConcentrationReport