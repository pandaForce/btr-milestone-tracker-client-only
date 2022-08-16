import lifecycle_stages from './lifecycle_stages'
// const stages_on_or_after_final_claim = ['Final', 'Settlement', 'Advertised', 'Leased']
const  stages_on_or_after_final_claim = lifecycle_stages.slice(lifecycle_stages.indexOf('Final'))
console.log('lifecycle_stages: ' + lifecycle_stages)

const IsFinalCalledUp = (value) =>{
    return stages_on_or_after_final_claim.indexOf(value) > -1 ? true : false
 }

export default IsFinalCalledUp