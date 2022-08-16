import lifecycle_stages from './lifecycle_stages'

// const calculateCompletePctg = (initial_pctg, statusdev, milestone) =>{
const calculateCompletePctg = (statusdev, milestone) =>{
    if(lifecycle_stages.indexOf(milestone ? milestone : statusdev) > -1) {
        // return ( ( ( lifecycle_stages.indexOf(milestone ? milestone : statusdev) / lifecycle_stages.length ) + (initial_pctg ) ) / 2)
        return   ( [ lifecycle_stages.indexOf(milestone ? milestone : statusdev) + 1] / lifecycle_stages.length )   
    }
    else {
        // return initial_pctg / 2
        return 0
    }
}

export default calculateCompletePctg
