const stages_on_or_after_build_settlement = ['Settlement', 'Advertised', 'Leased']

const IsSettlementCalledUp = (value) =>{
    return stages_on_or_after_build_settlement.indexOf(value) > -1 ? true : false
 }

export default IsSettlementCalledUp